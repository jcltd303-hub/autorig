import assert from "node:assert/strict";
import test from "node:test";
import { presetAnimation } from "./animate";
import type { Joint } from "./types";

const joints: Joint[] = [
  { id: "torso", label: "Torso", parentId: null, x: 0, y: 0, thickness: 12, minAngle: -90, maxAngle: 90, zIndex: 0 },
  { id: "shoulder_r", label: "Right shoulder", parentId: "torso", x: 10, y: 0, thickness: 8, minAngle: -90, maxAngle: 90, zIndex: 1 },
  { id: "elbow_r", label: "Right elbow", parentId: "shoulder_r", x: 20, y: 0, thickness: 7, minAngle: -120, maxAngle: 120, zIndex: 2 },
];

test("bend preset is a first-class movement diagnostic", () => {
  const anim = presetAnimation("bend", joints);
  assert.equal(anim.id, "bend");
  assert.equal(anim.name, "Bend test");
  assert.ok(anim.tracks.torso?.length);
  assert.ok(anim.tracks.shoulder_r?.length);
});
