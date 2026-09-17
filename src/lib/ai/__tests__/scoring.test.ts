import assert from "node:assert/strict";
import test from "node:test";
import type { CanonicalCandidate } from "../contracts";
import { scoreCandidate } from "../scoring";

function make(ids: string[], providerId = "test"): CanonicalCandidate {
  return { providerId, model: "fixture", name: "fixture", kind: "humanoid", joints: ids.map((id, i) => ({ id, label: id, parentId: i ? ids[i - 1] : null, x: 0.2 + i * 0.1, y: 0.5, thickness: 0.05, minAngle: -90, maxAngle: 90, zIndex: i })) };
}

test("required pins improve score when present", () => {
  const pins = { requiredIds: ["hips", "knee_l"], anchors: [{ id: "hips", x: 0.2, y: 0.5, tolerance: 0.01 }] };
  const full = scoreCandidate(make(["hips", "knee_l"]), pins);
  const partial = scoreCandidate(make(["hips"]), pins);
  assert.ok(full.total > partial.total);
  assert.equal(full.coverage, 1);
});

test("agreement ignores the candidate itself", () => {
  const candidate = make(["hips", "knee_l"]);
  const score = scoreCandidate(candidate, {}, [candidate]);
  assert.equal(score.agreement, 0);
});

test("agreement measures independent peer consensus", () => {
  const candidate = make(["hips", "knee_l"]);
  const peer = make(["hips", "knee_l"], "peer");
  const score = scoreCandidate(candidate, {}, [candidate, peer]);
  assert.equal(score.agreement, 1);
});
