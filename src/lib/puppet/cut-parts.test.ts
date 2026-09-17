import assert from "node:assert/strict";
import test from "node:test";
import { applyMaskEdits, buildCutSegments, buildGeodesicOwnership, buildConstrainedOwnership } from "./cut-parts";
import { buildFigureMask, detectBackground } from "./image";
const g = globalThis as typeof globalThis & { ImageData?: any };

if (!g.ImageData) {
  class TestImageData {
    data: Uint8ClampedArray;
    width: number;
    height: number;
    colorSpace = "srgb";

    constructor(data: Uint8ClampedArray, width: number, height: number) {
      this.data = data;
      this.width = width;
      this.height = height;
    }
  }

  g.ImageData = TestImageData;
}
const joints = [
  { id: "shoulder_r", label: "Right shoulder", parentId: null, x: 50, y: 50, thickness: 16, minAngle: -70, maxAngle: 70, zIndex: 2 },
  { id: "elbow_r", label: "Right elbow", parentId: "shoulder_r", x: 90, y: 50, thickness: 12, minAngle: -110, maxAngle: 110, zIndex: 3 },
  { id: "wrist_r", label: "Right wrist", parentId: "elbow_r", x: 125, y: 55, thickness: 10, minAngle: -90, maxAngle: 90, zIndex: 4 },
] as const;

test("cut segments run from each joint toward its child", () => {
  const segments = buildCutSegments([...joints]);
  assert.equal(segments[0]?.joint.id, "shoulder_r");
  assert.equal(segments[0]?.bx, 90);
  assert.equal(segments[1]?.joint.id, "elbow_r");
  assert.equal(segments[1]?.bx, 125);
  assert.equal(segments[0]?.leaf, false);
});

test("leaf cut segment extends distally beyond its own joint", () => {
  const segments = buildCutSegments([...joints]);
  const leaf = segments[2]!;
  assert.equal(leaf.joint.id, "wrist_r");
  assert.equal(leaf.leaf, true);
  assert.ok(leaf.bx > leaf.ax);
});

test("geodesic ownership stays inside connected foreground instead of crossing background gaps", () => {
  const width = 7;
  const height = 3;
  const mask = new Uint8Array([
    1, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 1,
  ]);
  const owner = buildGeodesicOwnership(mask, width, height, [
    { x: 1, y: 1, owner: 0 },
    { x: 5, y: 1, owner: 1 },
  ]);
  assert.equal(owner[1 * width + 1], 0);
  assert.equal(owner[1 * width + 5], 1);
  assert.equal(owner[1 * width + 3], -1);
});

test("constrained ownership leaves a torso center with the root instead of a distal limb", () => {
  const width = 14;
  const height = 9;
  const mask = new Uint8Array(width * height).fill(1);
  const owner = buildConstrainedOwnership(mask, width, height, [
    { x: 5, y: 4, ax: 5, ay: 4, bx: 5, by: 8, radius: 3, leaf: false },
    { x: 9, y: 1, ax: 9, ay: 1, bx: 10, by: 0, radius: 2, leaf: true },
  ], 0);
  assert.equal(owner[4 * width + 5], 0);
  assert.equal(owner[4 * width + 9], 0);
});

test("constrained ownership gives an articulated limb enough corridor to retain its full width", () => {
  const width = 16;
  const height = 11;
  const mask = new Uint8Array(width * height).fill(1);
  const owner = buildConstrainedOwnership(mask, width, height, [
    { x: 2, y: 5, ax: 2, ay: 5, bx: 12, by: 5, radius: 4, leaf: false },
    { x: 12, y: 5, ax: 12, ay: 5, bx: 14, by: 5, radius: 3, leaf: true },
  ], 0);
  assert.equal(owner[2 * width + 10], 0);
  assert.equal(owner[4 * width + 8], 0);
});

test("broad irregular limb artwork is owned even when it extends well beyond the bone corridor", () => {
  const width = 25;
  const height = 21;
  const mask = new Uint8Array(width * height).fill(0);
  for (let y = 5; y <= 15; y++) {
    for (let x = 2; x <= 22; x++) {
      const bulge = Math.max(0, 5 - Math.abs(x - 12) * 0.18);
      if (Math.abs(y - 10) <= bulge) mask[y * width + x] = 1;
    }
  }
  const owner = buildConstrainedOwnership(mask, width, height, [
    { x: 2, y: 10, ax: 2, ay: 10, bx: 12, by: 10, radius: 4, leaf: false },
    { x: 12, y: 10, ax: 12, ay: 10, bx: 22, by: 10, radius: 4, leaf: true },
  ], 0);
  assert.equal(owner[7 * width + 18], 1);
  assert.equal(owner[13 * width + 18], 1);
  assert.equal(owner[10 * width + 20], 1);
});

test("leaf ownership stays distal and does not reclaim distant torso pixels", () => {
  const width = 18;
  const height = 14;
  const mask = new Uint8Array(width * height).fill(1);
  const owner = buildConstrainedOwnership(mask, width, height, [
    { x: 0, y: 0, ax: 0, ay: 0, bx: 0, by: 0, radius: 8, leaf: false },
    { x: 10, y: 5, ax: 10, ay: 5, bx: 12, by: 5, radius: 3, leaf: true },
  ], 0);
  assert.equal(owner[5 * width + 5], 0);
});

test("transparent corners disable color background lifting", () => {
  const width = 5;
  const height = 5;
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    data[i * 4] = 0;
    data[i * 4 + 1] = 0;
    data[i * 4 + 2] = 0;
    data[i * 4 + 3] = 255;
  }
  data[0] = 255;
  data[1] = 255;
  data[2] = 255;
  data[3] = 0;
  const image = new ImageData(data, width, height);
  const bg = detectBackground(image);
  assert.equal(bg.lift, false);
});

test("background-colored artwork inside a solid background is preserved", () => {
  const width = 5;
  const height = 5;
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    data[i * 4] = 30;
    data[i * 4 + 1] = 30;
    data[i * 4 + 2] = 30;
    data[i * 4 + 3] = 255;
  }
  const center = (2 * width + 2) * 4;
  data[center] = 30;
  data[center + 1] = 30;
  data[center + 2] = 30;
  const image = new ImageData(data, width, height);
  const mask = buildFigureMask(image, { r: 30, g: 30, b: 30, threshold: 1, lift: false });
  assert.equal(mask[center / 4], 1);
});

test("attachment mask edits can add and erase localized repair strokes", () => {
  const width = 9;
  const height = 9;
  const alpha = new Uint8Array(width * height);
  alpha[4 * width + 4] = 255;

  const repaired = applyMaskEdits(alpha, width, height, [
    { x: 6, y: 4, radius: 1.5, mode: "add" },
    { x: 4, y: 4, radius: 1, mode: "erase" },
  ]);

  assert.equal(repaired[4 * width + 4], 0);
  assert.equal(repaired[4 * width + 6], 255);
  assert.equal(repaired[4 * width + 5], 255);
});
