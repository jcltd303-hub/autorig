import type { AnyAiProvider, CanonicalCandidate, ExtractionRequest, PipelineResult } from "./contracts";
import { extractJson, newDiagnostic } from "./diagnostics";
import { repairCandidate, mergeCandidates } from "./geometry";
import { buildExtractionPrompt, buildRegionalPrompt } from "./prompts";
import { modelCandidateEnvelopeSchema } from "./schemas";
import { resolveProviders } from "./providers";
import { scoreCandidate } from "./scoring";

function normalize(raw: unknown, provider: AnyAiProvider): CanonicalCandidate {
  const parsed = modelCandidateEnvelopeSchema.parse(raw);
  return { providerId: provider.id, model: provider.model, name: parsed.name, kind: parsed.kind, joints: parsed.joints.map((joint) => ({ id: joint.id, label: joint.label, parentId: joint.parent, x: joint.x, y: joint.y, thickness: joint.thickness, minAngle: joint.min_angle, maxAngle: joint.max_angle, zIndex: joint.z_index })) };
}

async function attempt(provider: AnyAiProvider, request: ExtractionRequest, prompt: string, diagnostic: ReturnType<typeof newDiagnostic>) {
  const started = Date.now();
  try {
    const result = await provider.analyze(request, prompt);
    const candidate = normalize(extractJson(result.text), provider);
    const repaired = repairCandidate(candidate);
    diagnostic.repairs.push(...repaired.repairs.map((repair) => `${provider.id}: ${repair}`));
    return { candidate: repaired.candidate, latencyMs: Date.now() - started };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown provider error";
    console.error(`AI Extraction attempt failed on ${provider.id} (${provider.model}):`, errMsg);
    diagnostic.attempts.push({ providerId: provider.id, model: provider.model, kind: provider.kind, latencyMs: Date.now() - started, status: "error", error: errMsg });
    return null;
  }
}

export async function runExtractionPipeline(request: ExtractionRequest, providerOverride?: AnyAiProvider[]): Promise<PipelineResult> {
  const pins = request.pins ?? {};
  const providers = providerOverride ?? resolveProviders(request.policy);
  const diagnostic = newDiagnostic(request.imageDataUrl, pins.requiredIds?.length ?? 0, pins.anchors?.length ?? 0, pins.regions?.length ?? 0);
  if (!providers.length) throw new Error("Gemini AI is not configured. Please set GEMINI_API_KEY.");
  const maxAttempts = Math.max(1, request.policy?.maxAttempts ?? providers.length);
  const minScore = request.policy?.minScore ?? 0.58;
  const candidates: CanonicalCandidate[] = [];
  let usedProviderFallback = false;

  for (const provider of providers.slice(0, maxAttempts)) {
    const result = await attempt(provider, request, buildExtractionPrompt(request.hint, pins), diagnostic);
    if (!result) { diagnostic.retries++; usedProviderFallback = true; continue; }
    const score = scoreCandidate(result.candidate, pins, candidates);
    diagnostic.attempts.push({ providerId: provider.id, model: provider.model, kind: provider.kind, latencyMs: result.latencyMs, status: "ok", score });
    candidates.push(result.candidate);
    if (score.total >= minScore && !request.policy?.enableEnsemble) break;
  }

  if (!candidates.length) {
    diagnostic.finalStatus = "failed";
    const lastError = diagnostic.attempts[diagnostic.attempts.length - 1]?.error;
    throw new Error(lastError ? `AI extraction failed: ${lastError}` : "All configured AI extraction providers failed");
  }
  const ranked = candidates.map((candidate) => ({ candidate, score: scoreCandidate(candidate, pins, candidates) })).sort((a, b) => b.score.total - a.score.total);
  let best = ranked[0].candidate;
  let bestScore = ranked[0].score;

  if ((request.policy?.enableRegionalRetry ?? true) && pins.regions?.length && bestScore.total < minScore) {
    for (const region of pins.regions.filter((r) => (r.priority ?? 0) > 0).slice(0, 3)) {
      const provider = providers[0];
      diagnostic.retries++;
      const result = await attempt(provider, request, buildRegionalPrompt(region.id, request.hint, pins), diagnostic);
      if (!result) continue;
      const score = scoreCandidate(result.candidate, pins, candidates);
      diagnostic.attempts.push({ providerId: provider.id, model: provider.model, kind: provider.kind, latencyMs: result.latencyMs, status: "ok", score });
      candidates.push(result.candidate);
      if (score.total > bestScore.total) { best = result.candidate; bestScore = score; }
    }
  }

  if ((request.policy?.enableEnsemble ?? false) && candidates.length > 1) {
    const merged = repairCandidate(mergeCandidates(candidates)).candidate;
    const mergedScore = scoreCandidate(merged, pins, candidates);
    if (mergedScore.total >= bestScore.total) { best = merged; bestScore = mergedScore; }
  }
  diagnostic.finalStatus = usedProviderFallback ? "fallback" : "success";
  return { candidate: best, score: bestScore, diagnostic };
}
