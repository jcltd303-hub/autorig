import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { n as newDiagnostic, t as extractJson } from "./diagnostics-Cmky3siG.mjs";
import { a as object, i as number, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
import { t as GoogleGenAI } from "../_libs/@google/genai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/puppet-ai-C7gXK9SH.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/Puppet/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function finite(value) {
	return Number.isFinite(value);
}
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
function validateCandidate(candidate) {
	const issues = [];
	const ids = /* @__PURE__ */ new Set();
	for (const joint of candidate.joints) {
		if (ids.has(joint.id)) issues.push({
			code: "duplicate-id",
			message: `Duplicate joint id ${joint.id}`,
			jointId: joint.id,
			severity: "error"
		});
		ids.add(joint.id);
		if (![
			joint.x,
			joint.y,
			joint.thickness,
			joint.minAngle,
			joint.maxAngle,
			joint.zIndex
		].every(finite)) issues.push({
			code: "non-finite",
			message: `Non-finite geometry for ${joint.id}`,
			jointId: joint.id,
			severity: "error"
		});
		if (joint.x < 0 || joint.x > 1 || joint.y < 0 || joint.y > 1) issues.push({
			code: "out-of-range",
			message: `Joint ${joint.id} lies outside image`,
			jointId: joint.id,
			severity: "error"
		});
		if (joint.thickness <= 0 || joint.thickness > .5) issues.push({
			code: "bad-thickness",
			message: `Invalid thickness for ${joint.id}`,
			jointId: joint.id,
			severity: "warning"
		});
		if (joint.minAngle > joint.maxAngle) issues.push({
			code: "angle-range",
			message: `Invalid angle range for ${joint.id}`,
			jointId: joint.id,
			severity: "error"
		});
		if (joint.parentId === joint.id) issues.push({
			code: "self-parent",
			message: `Joint ${joint.id} parents itself`,
			jointId: joint.id,
			severity: "error"
		});
	}
	for (const joint of candidate.joints) if (joint.parentId && !ids.has(joint.parentId)) issues.push({
		code: "missing-parent",
		message: `Missing parent ${joint.parentId}`,
		jointId: joint.id,
		severity: "error"
	});
	for (const joint of candidate.joints) {
		const seen = /* @__PURE__ */ new Set();
		let current = joint;
		while (current?.parentId) {
			if (seen.has(current.id)) {
				issues.push({
					code: "cycle",
					message: `Parent cycle reaches ${current.id}`,
					jointId: joint.id,
					severity: "error"
				});
				break;
			}
			seen.add(current.id);
			current = candidate.joints.find((j) => j.id === current.parentId);
			if (!current) break;
		}
	}
	return issues;
}
function repairCandidate(candidate) {
	const repairs = [];
	const ids = /* @__PURE__ */ new Set();
	const joints = candidate.joints.map((joint, index) => {
		let id = joint.id.trim() || `joint_${index + 1}`;
		if (ids.has(id)) {
			id = `${id}_${index + 1}`;
			repairs.push(`renamed duplicate joint to ${id}`);
		}
		ids.add(id);
		const repaired = {
			...joint,
			id,
			x: clamp(joint.x, 0, 1),
			y: clamp(joint.y, 0, 1),
			thickness: clamp(joint.thickness, .001, .5),
			minAngle: Math.min(joint.minAngle, joint.maxAngle),
			maxAngle: Math.max(joint.minAngle, joint.maxAngle),
			zIndex: Number.isFinite(joint.zIndex) ? joint.zIndex : index
		};
		if (repaired.x !== joint.x || repaired.y !== joint.y) repairs.push(`clamped ${id} into normalized image bounds`);
		if (repaired.minAngle !== joint.minAngle || repaired.maxAngle !== joint.maxAngle) repairs.push(`normalized angle range for ${id}`);
		return repaired;
	});
	const validIds = new Set(joints.map((j) => j.id));
	for (const joint of joints) {
		if (joint.parentId && !validIds.has(joint.parentId)) {
			joint.parentId = null;
			repairs.push(`removed missing parent from ${joint.id}`);
		}
		if (joint.parentId === joint.id) {
			joint.parentId = null;
			repairs.push(`removed self-parent from ${joint.id}`);
		}
	}
	return {
		candidate: {
			...candidate,
			joints
		},
		repairs
	};
}
function mergeCandidates(candidates) {
	if (!candidates.length) throw new Error("Cannot merge zero candidates");
	const base = candidates[0];
	const joints = [...new Set(candidates.flatMap((c) => c.joints.map((j) => j.id)))].map((id) => {
		const present = candidates.flatMap((c) => c.joints.filter((j) => j.id === id));
		const x = present.reduce((s, j) => s + j.x, 0) / present.length;
		const y = present.reduce((s, j) => s + j.y, 0) / present.length;
		return {
			...present[0],
			x,
			y
		};
	});
	return {
		...base,
		joints
	};
}
var preferredIds$1 = [
	"hips",
	"torso",
	"head",
	"shoulder_l",
	"elbow_l",
	"hand_l",
	"shoulder_r",
	"elbow_r",
	"hand_r",
	"hip_l",
	"knee_l",
	"foot_l",
	"hip_r",
	"knee_r",
	"foot_r",
	"tail"
];
function buildExtractionPrompt(hint = "", pins = {}) {
	const required = pins.requiredIds?.length ? pins.requiredIds.join(", ") : preferredIds$1.join(", ");
	const anchors = pins.anchors?.map((a) => `${a.id}@${a.x ?? "?"},${a.y ?? "?"}±${a.tolerance ?? .08}`).join("; ") || "none";
	const graph = pins.graph?.map((g) => `${g.parentId ?? "ROOT"}->${g.childId}`).join(", ") || "none";
	const semanticHint = (pins.semanticHint ?? hint) || "none";
	return `You are extracting a 2D cutout-puppet skeleton from one reference image. Return ONLY JSON.
Coordinates are normalized 0..1, origin top-left. Do not invent anatomy that is not visible.
Put each joint on the real anatomical hinge/attachment point, not at the middle of a limb.
Keep parent links anatomically meaningful and acyclic. Use the requested IDs when the anatomy exists.
Required/preferred IDs: ${required}
Pinned anchors: ${anchors}
Pinned graph constraints: ${graph}
Orientation: ${pins.orientation ?? "unknown"}. Scale: ${pins.scale ?? "unknown"}.
Visibility hints: ${JSON.stringify(pins.visibility ?? {})}
Semantic hint: ${semanticHint}
thickness is a fraction of the image short side, usually 0.03..0.14.
min_angle/max_angle are degrees relative to the photographed rest pose.
z_index is draw order, lower first.

Schema:
{
  "name": string,
  "kind": "humanoid" | "tailed" | "quadruped" | "bird" | "simple" | "creature",
  "joints": [{
    "id": string,
    "label": string,
    "parent": string | null,
    "x": number,
    "y": number,
    "thickness": number,
    "min_angle": number,
    "max_angle": number,
    "z_index": number
  }]
}`;
}
function buildRegionalPrompt(regionId, hint = "", pins = {}) {
	return `${buildExtractionPrompt(hint, pins)}\nRe-evaluate only region ${regionId}. Preserve all valid global anatomy and repair the weak/occluded region without inventing missing parts.`;
}
var canonicalJointSchema = object({
	id: string().min(1).max(80),
	label: string().min(1).max(120),
	parentId: string().min(1).max(80).nullable(),
	x: number().finite(),
	y: number().finite(),
	thickness: number().finite(),
	minAngle: number().finite(),
	maxAngle: number().finite(),
	zIndex: number().finite()
});
object({
	name: string().min(1).max(160),
	kind: _enum([
		"humanoid",
		"tailed",
		"quadruped",
		"bird",
		"simple",
		"creature"
	]),
	joints: array(canonicalJointSchema).min(1).max(128)
});
var modelCandidateEnvelopeSchema = object({
	name: string().min(1).max(160).catch("puppet_figure"),
	kind: _enum([
		"humanoid",
		"tailed",
		"quadruped",
		"bird",
		"simple",
		"creature"
	]).catch("humanoid"),
	joints: array(object({
		id: string().min(1),
		label: string().min(1).optional().transform((v) => v ?? "joint"),
		parent: string().nullable().optional().transform((v) => v ?? null),
		x: number(),
		y: number(),
		thickness: number().optional().default(.06),
		min_angle: number().optional().default(-45),
		max_angle: number().optional().default(45),
		z_index: number().optional().default(1)
	})).min(1).max(128)
});
function getGeminiClient() {
	const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
	if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");
	return new GoogleGenAI({
		apiKey,
		httpOptions: { headers: { "User-Agent": "aistudio-build" } }
	});
}
function parseDataUrl(dataUrl) {
	const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/s);
	if (!match) throw new Error("imageDataUrl must be a base64 data URL");
	return {
		mime: match[1],
		base64: match[2]
	};
}
function createGeminiProvider(model = process.env.GEMINI_VISION_MODEL || "gemini-3.8-flash") {
	return {
		id: "gemini",
		kind: "vision",
		model,
		available: () => Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
		analyze: async (request, prompt) => {
			const ai = getGeminiClient();
			const { mime, base64 } = parseDataUrl(request.imageDataUrl);
			const text = (await ai.models.generateContent({
				model,
				contents: [{ inlineData: {
					mimeType: mime,
					data: base64
				} }, { text: prompt }],
				config: {
					temperature: .1,
					responseMimeType: "application/json",
					maxOutputTokens: 8192
				}
			})).text ?? "";
			if (!text) throw new Error("Gemini returned an empty response");
			return {
				text,
				providerId: "gemini",
				model
			};
		}
	};
}
async function geminiChat(messages, maxTokens = 4096, model = process.env.GEMINI_TEXT_MODEL || "gemini-3.8-flash") {
	try {
		const ai = getGeminiClient();
		const promptText = messages.map((m) => m.content).join("\n\n");
		const text = (await ai.models.generateContent({
			model,
			contents: promptText,
			config: {
				temperature: .2,
				responseMimeType: "application/json",
				maxOutputTokens: maxTokens
			}
		})).text ?? "";
		if (!text) return {
			ok: false,
			error: "Gemini returned empty response"
		};
		return {
			ok: true,
			text
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Gemini chat failed"
		};
	}
}
async function geminiImage(prompt, model = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image-preview") {
	try {
		const response = await getGeminiClient().models.generateContent({
			model,
			contents: { parts: [{ text: prompt }] },
			config: { imageConfig: { aspectRatio: "3:4" } }
		});
		for (const candidate of response.candidates ?? []) for (const part of candidate.content?.parts ?? []) if (part.inlineData?.data) return {
			ok: true,
			dataUrl: `data:${part.inlineData.mimeType || "image/jpeg"};base64,${part.inlineData.data}`
		};
		return {
			ok: false,
			error: "Gemini returned no image"
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Gemini image generation failed"
		};
	}
}
async function geminiEditImage(prompt, imageDataUrl, model = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image-preview") {
	try {
		const ai = getGeminiClient();
		const { mime, base64 } = parseDataUrl(imageDataUrl);
		const response = await ai.models.generateContent({
			model,
			contents: { parts: [{ inlineData: {
				data: base64,
				mimeType: mime
			} }, { text: `Edit this figure: ${prompt}. Keep it isolated with whole body unoccluded and limbs visible on a clean background suitable for puppet rigging.` }] }
		});
		for (const candidate of response.candidates ?? []) for (const part of candidate.content?.parts ?? []) if (part.inlineData?.data) return {
			ok: true,
			dataUrl: `data:${part.inlineData.mimeType || "image/jpeg"};base64,${part.inlineData.data}`
		};
		return {
			ok: false,
			error: "Gemini returned no edited image"
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Gemini image edit failed"
		};
	}
}
function createProviderRegistry() {
	return [createGeminiProvider()];
}
function resolveProviders(policy = {}) {
	const registry = createProviderRegistry().filter((provider) => provider.available());
	const configured = [
		policy.primaryProvider,
		...policy.fallbackProviders ?? [],
		...policy.ensembleProviders ?? []
	].filter(Boolean);
	if (!configured.length) return registry;
	const filtered = configured.map((id) => registry.find((provider) => provider.id === id)).filter((provider) => Boolean(provider));
	return filtered.length ? filtered : registry;
}
var preferredIds = [
	"hips",
	"torso",
	"head",
	"shoulder_l",
	"elbow_l",
	"hand_l",
	"shoulder_r",
	"elbow_r",
	"hand_r",
	"hip_l",
	"knee_l",
	"foot_l",
	"hip_r",
	"knee_r",
	"foot_r",
	"tail"
];
function clamp01(value) {
	return Math.max(0, Math.min(1, value));
}
function scoreCandidate(candidate, pins = {}, peers = []) {
	const issues = validateCandidate(candidate);
	const errors = issues.filter((i) => i.severity === "error").length;
	const schema = clamp01(1 - errors / Math.max(4, candidate.joints.length));
	const required = pins.requiredIds?.length ? pins.requiredIds : preferredIds.filter((id) => candidate.kind === "humanoid" || candidate.kind === "tailed");
	const present = new Set(candidate.joints.map((j) => j.id));
	const coverage = required.length ? required.filter((id) => present.has(id)).length / required.length : 1;
	const graph = pins.graph?.length ? pins.graph.filter((g) => candidate.joints.some((j) => j.id === g.childId && j.parentId === g.parentId)).length / pins.graph.length : 1;
	const coordinates = candidate.joints.filter((j) => j.x >= 0 && j.x <= 1 && j.y >= 0 && j.y <= 1 && j.thickness > 0 && j.thickness <= .5 && j.minAngle <= j.maxAngle).length / Math.max(1, candidate.joints.length);
	const anchors = pins.anchors ?? [];
	const pinHits = anchors.length ? anchors.filter((a) => {
		const j = candidate.joints.find((item) => item.id === a.id);
		if (!j || a.x == null || a.y == null) return false;
		const tolerance = a.tolerance ?? .08;
		return Math.hypot(j.x - a.x, j.y - a.y) <= tolerance;
	}).length / anchors.length : 1;
	const duplicates = clamp01(1 - candidate.joints.reduce((count, a, index) => count + candidate.joints.slice(index + 1).filter((b) => Math.hypot(a.x - b.x, a.y - b.y) < .012).length, 0) / Math.max(3, candidate.joints.length));
	const independentPeers = peers.filter((peer) => peer !== candidate && peer.providerId !== candidate.providerId);
	const agreement = independentPeers.length ? clamp01(independentPeers.reduce((sum, peer) => sum + overlapAgreement(candidate, peer), 0) / independentPeers.length) : 0;
	return {
		total: .2 * schema + .2 * coverage + .15 * graph + .15 * coordinates + .15 * pinHits + .05 * duplicates + .1 * agreement,
		schema,
		coverage,
		graph,
		coordinates,
		pins: pinHits,
		duplicates,
		agreement,
		issues
	};
}
function overlapAgreement(a, b) {
	const byId = new Map(b.joints.map((j) => [j.id, j]));
	const shared = a.joints.filter((j) => byId.has(j.id));
	if (!shared.length) return 0;
	return shared.reduce((sum, j) => {
		const other = byId.get(j.id);
		return sum + clamp01(1 - Math.hypot(j.x - other.x, j.y - other.y) / .15);
	}, 0) / shared.length;
}
function normalize(raw, provider) {
	const parsed = modelCandidateEnvelopeSchema.parse(raw);
	return {
		providerId: provider.id,
		model: provider.model,
		name: parsed.name,
		kind: parsed.kind,
		joints: parsed.joints.map((joint) => ({
			id: joint.id,
			label: joint.label,
			parentId: joint.parent,
			x: joint.x,
			y: joint.y,
			thickness: joint.thickness,
			minAngle: joint.min_angle,
			maxAngle: joint.max_angle,
			zIndex: joint.z_index
		}))
	};
}
async function attempt(provider, request, prompt, diagnostic) {
	const started = Date.now();
	try {
		const result = await provider.analyze(request, prompt);
		const repaired = repairCandidate(normalize(extractJson(result.text), provider));
		diagnostic.repairs.push(...repaired.repairs.map((repair) => `${provider.id}: ${repair}`));
		return {
			candidate: repaired.candidate,
			latencyMs: Date.now() - started
		};
	} catch (error) {
		const errMsg = error instanceof Error ? error.message : "Unknown provider error";
		console.error(`AI Extraction attempt failed on ${provider.id} (${provider.model}):`, errMsg);
		diagnostic.attempts.push({
			providerId: provider.id,
			model: provider.model,
			kind: provider.kind,
			latencyMs: Date.now() - started,
			status: "error",
			error: errMsg
		});
		return null;
	}
}
async function runExtractionPipeline(request, providerOverride) {
	const pins = request.pins ?? {};
	const providers = providerOverride ?? resolveProviders(request.policy);
	const diagnostic = newDiagnostic(request.imageDataUrl, pins.requiredIds?.length ?? 0, pins.anchors?.length ?? 0, pins.regions?.length ?? 0);
	if (!providers.length) throw new Error("Gemini AI is not configured. Please set GEMINI_API_KEY.");
	const maxAttempts = Math.max(1, request.policy?.maxAttempts ?? providers.length);
	const minScore = request.policy?.minScore ?? .58;
	const candidates = [];
	let usedProviderFallback = false;
	for (const provider of providers.slice(0, maxAttempts)) {
		const result = await attempt(provider, request, buildExtractionPrompt(request.hint, pins), diagnostic);
		if (!result) {
			diagnostic.retries++;
			usedProviderFallback = true;
			continue;
		}
		const score = scoreCandidate(result.candidate, pins, candidates);
		diagnostic.attempts.push({
			providerId: provider.id,
			model: provider.model,
			kind: provider.kind,
			latencyMs: result.latencyMs,
			status: "ok",
			score
		});
		candidates.push(result.candidate);
		if (score.total >= minScore && !request.policy?.enableEnsemble) break;
	}
	if (!candidates.length) {
		diagnostic.finalStatus = "failed";
		const lastError = diagnostic.attempts[diagnostic.attempts.length - 1]?.error;
		throw new Error(lastError ? `AI extraction failed: ${lastError}` : "All configured AI extraction providers failed");
	}
	const ranked = candidates.map((candidate) => ({
		candidate,
		score: scoreCandidate(candidate, pins, candidates)
	})).sort((a, b) => b.score.total - a.score.total);
	let best = ranked[0].candidate;
	let bestScore = ranked[0].score;
	if ((request.policy?.enableRegionalRetry ?? true) && pins.regions?.length && bestScore.total < minScore) for (const region of pins.regions.filter((r) => (r.priority ?? 0) > 0).slice(0, 3)) {
		const provider = providers[0];
		diagnostic.retries++;
		const result = await attempt(provider, request, buildRegionalPrompt(region.id, request.hint, pins), diagnostic);
		if (!result) continue;
		const score = scoreCandidate(result.candidate, pins, candidates);
		diagnostic.attempts.push({
			providerId: provider.id,
			model: provider.model,
			kind: provider.kind,
			latencyMs: result.latencyMs,
			status: "ok",
			score
		});
		candidates.push(result.candidate);
		if (score.total > bestScore.total) {
			best = result.candidate;
			bestScore = score;
		}
	}
	if ((request.policy?.enableEnsemble ?? false) && candidates.length > 1) {
		const merged = repairCandidate(mergeCandidates(candidates)).candidate;
		const mergedScore = scoreCandidate(merged, pins, candidates);
		if (mergedScore.total >= bestScore.total) {
			best = merged;
			bestScore = mergedScore;
		}
	}
	diagnostic.finalStatus = usedProviderFallback ? "fallback" : "success";
	return {
		candidate: best,
		score: bestScore,
		diagnostic
	};
}
var analyzeFigure_createServerFn_handler = createServerRpc({
	id: "a19ca5e08b5ab708fca8cab79e2c687689dd09bb80d72155b160f3f612d9359e",
	name: "analyzeFigure",
	filename: "src/lib/ai/puppet-ai.ts"
}, (opts) => analyzeFigure.__executeServer(opts));
var analyzeFigure = createServerFn({ method: "POST" }).validator((input) => input).handler(analyzeFigure_createServerFn_handler, async ({ data }) => {
	try {
		const result = await runExtractionPipeline(data);
		return {
			ok: true,
			text: JSON.stringify({
				name: result.candidate.name,
				kind: result.candidate.kind,
				joints: result.candidate.joints.map((j) => ({
					id: j.id,
					label: j.label,
					parent: j.parentId,
					x: j.x,
					y: j.y,
					thickness: j.thickness,
					min_angle: j.minAngle,
					max_angle: j.maxAngle,
					z_index: j.zIndex
				}))
			})
		};
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : "AI extraction failed"
		};
	}
});
var composeAnimation_createServerFn_handler = createServerRpc({
	id: "9234637ad8fb2b46fe76b02cf7f7a6da3338d782e4dac953cd3ca4bfed99579e",
	name: "composeAnimation",
	filename: "src/lib/ai/puppet-ai.ts"
}, (opts) => composeAnimation.__executeServer(opts));
var composeAnimation = createServerFn({ method: "POST" }).validator((input) => input).handler(composeAnimation_createServerFn_handler, async ({ data }) => {
	const list = data.joints.map((j) => `- ${j.id} (${j.label}) range ${j.minAngle}..${j.maxAngle}`).join("\n");
	return geminiChat([{
		role: "user",
		content: `You are a 2D puppet animator. Create an animation for: ${JSON.stringify(data.prompt)}\nAvailable joints:\n${list}\n\nReturn ONLY JSON:\n{\n  "id": string,\n  "name": string,\n  "duration": number,\n  "loop": boolean,\n  "tracks": { "<joint_id>": [ { "t": number, "angle": number, "ease": "sine" | "linear" | "quad-out" | "quad-in" } ] }\n}\nRules: t is 0–1; duration 0.4–4 seconds; stay inside each joint range; 3–8 keys per moving track; walk/run loops and opposes arms vs legs.`
	}], 1800);
});
var conjureFigure_createServerFn_handler = createServerRpc({
	id: "462cf28b778bc6a360ff5f6c317b7727b02a18c86766a0d4c52addb9e86307be",
	name: "conjureFigure",
	filename: "src/lib/ai/puppet-ai.ts"
}, (opts) => conjureFigure.__executeServer(opts));
var conjureFigure = createServerFn({ method: "POST" }).validator((input) => input).handler(conjureFigure_createServerFn_handler, async ({ data }) => {
	return geminiImage(`Full-body standing figure of ${data.prompt}, filling the frame from head to toe, front-facing, feet slightly apart, both arms held away from the torso so every limb is unoccluded and fully visible, isolated on a perfectly even flat dark charcoal studio backdrop the color of #1c1916, no floor, no cast shadow, no props, even museum lighting, photoreal photograph of a crafted puppet, figurine, or paper figure, 3:4 portrait.`);
});
var editFigureImage_createServerFn_handler = createServerRpc({
	id: "5e685ba558231b0ef858c8f19a474219213c1390f893af741df4d401b3f3be89",
	name: "editFigureImage",
	filename: "src/lib/ai/puppet-ai.ts"
}, (opts) => editFigureImage.__executeServer(opts));
var editFigureImage = createServerFn({ method: "POST" }).validator((input) => input).handler(editFigureImage_createServerFn_handler, async ({ data }) => {
	return geminiEditImage(data.prompt, data.imageDataUrl);
});
//#endregion
export { analyzeFigure_createServerFn_handler, composeAnimation_createServerFn_handler, conjureFigure_createServerFn_handler, editFigureImage_createServerFn_handler };
