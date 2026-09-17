import assert from "node:assert/strict";
import test from "node:test";
import type { CanonicalCandidate } from "../contracts";
import { repairCandidate, validateCandidate } from "../geometry";

const candidate: CanonicalCandidate = {
  providerId: "test", model: "fixture", name: "test", kind: "humanoid",
  joints: [
    { id: "hips", label: "Hips", parentId: null, x: 0.5, y: 0.6, thickness: 0.08, minAngle: -20, maxAngle: 20, zIndex: 0 },
    { id: "knee_l", label: "Left knee", parentId: "hips", x: 0.45, y: 1.2, thickness: 0.05, minAngle: 30, maxAngle: -30, zIndex: 1 },
  ],
};

test("validateCandidate detects range and bounds defects", () => {
  const issues = validateCandidate(candidate);
  assert.ok(issues.some((i) => i.code === "out-of-range"));
  assert.ok(issues.some((i) => i.code === "angle-range"));
});

test("repairCandidate clamps geometry without inventing joints", () => {
  const result = repairCandidate(candidate);
  assert.equal(result.candidate.joints.length, 2);
  assert.equal(result.candidate.joints[1].y, 1);
  assert.equal(result.candidate.joints[1].minAngle, -30);
  assert.equal(result.candidate.joints[1].maxAngle, 30);
  assert.ok(result.repairs.length > 0);
});
