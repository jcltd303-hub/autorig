import assert from "node:assert/strict";
import test from "node:test";
import type { AnyAiProvider, ExtractionRequest } from "../contracts";
import { runExtractionPipeline } from "../pipeline";

const payload = JSON.stringify({ name: "fixture", kind: "simple", joints: [{ id: "root", label: "Root", parent: null, x: 0.5, y: 0.5, thickness: 0.08, min_angle: -30, max_angle: 30, z_index: 0 }] });
const request: ExtractionRequest = { imageDataUrl: "data:image/png;base64,AAAA", policy: { maxAttempts: 2, minScore: 0.1 } };

function provider(id: string, fail: boolean): AnyAiProvider {
  return { id, kind: "vision", model: "fixture", available: () => true, analyze: async () => { if (fail) throw new Error("fixture failure"); return { text: payload, providerId: id, model: "fixture" }; } };
}

test("pipeline falls back after provider failure and records the attempt", async () => {
  const result = await runExtractionPipeline(request, [provider("bad", true), provider("good", false)]);
  assert.equal(result.candidate.providerId, "good");
  assert.equal(result.diagnostic.finalStatus, "fallback");
  assert.equal(result.diagnostic.attempts[0].status, "error");
  assert.equal(result.diagnostic.attempts[1].status, "ok");
  assert.equal(result.diagnostic.retries, 1);
});

test("registry is patched to only use gemini provider", async () => {
  const { createProviderRegistry } = await import("../providers");
  const registry = createProviderRegistry();
  assert.equal(registry.length, 1);
  assert.equal(registry[0].id, "gemini");
});
