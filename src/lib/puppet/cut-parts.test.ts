import assert from "node:assert/strict";
import test from "node:test";
import { buildCutSegments, buildGeodesicOwnership, buildConstrainedOwnership } from "./cut-parts";
import { applyMaskEdits, ensureSmoothMask } from "./mask-utils";
import { buildFigureMask, detectBackground } from "./image";
const g = globalThis as typeof globalThis & { ImageData?: any };

if (!g.ImageData) {
  class TestImageData {
    data: Uint8ClampedArray;
    width: number;
    height: number;
    constructor(data: Uint8ClampedArray, width: number, height: number) {
      this.data = data;
      this.width = width;
      this.height = height;
    }
  }
  g.ImageData = TestImageData as any;
}

const ImageDataCtor = g.ImageData!;

test("cut segments run from each joint toward its child", () => {
  const joints = [
    { id: "root", label: "Root", parentId: null, x: 10, y: 10, thickness: 12, minAngle: -45, maxAngle: 45, zIndex: 0 },
    { id: "hand", label: "Hand", parentId: "root", x: 30, y: 10, thickness: 8, minAngle: -45, maxAngle: 45, zIndex: 1 },
  ];
  const segments = buildCutSegments(joints);
  assert.equal(segments[0]?.ax, 10);
  assert.equal(segments[0]?.bx, 30);
});

test("leaf cut segment extends distally beyond its own joint", () => {
  const joints = [
    { id: "root", label: "Root", parentId: null, x: 10, y: 10, thickness: 12, minAngle: -45, maxAngle: 45, zIndex: 0 },
    { id: "hand", label: "Hand", parentId: "root", x: 30, y: 10, thickness: 8, minAngle: -45, maxAngle: 45, zIndex: 1 },
  ];
  const segments = buildCutSegments(joints);
  assert.equal(segments[1]?.leaf, true);
  assert.ok((segments[1]?.bx ?? 0) > 30);
});

test("geodesic ownership stays inside connected foreground instead of crossing background gaps", () => {
  const width = 7;
  const height = 3;
  const mask = new Uint8Array(width * height);
  for (let x = 0; x < width; x++) mask[width + x] = 1;
  mask[width + 3] = 0;
  const owner = buildGeodesicOwnership(mask, width, height, [
    { x: 1, y: 1, owner: 0 },
    { x: 5, y: 1, owner: 1 },
  ]);
  assert.equal(owner[width + 1], 0);
  assert.equal(owner[width + 5], 1);
  assert.equal(owner[width + 3], -1);
});

test("constrained ownership leaves a torso center with the root instead of a distal limb", () => {
  const width = 21;
  const height = 9;
  const mask = new Uint8Array(width * height).fill(1);
  const owner = buildConstrainedOwnership(mask, width, height, [
    { ax: 10, ay: 1, bx: 10, by: 8, radius: 5 },
    { ax: 10, ay: 4, bx: 20, by: 4, radius: 4 },
  ], 0);
  assert.equal(owner[4 * width + 10], 0);
});

test("constrained ownership gives an articulated limb enough corridor to retain its full width", () => {
  const width = 21;
  const height = 11;
  const mask = new Uint8Array(width * height).fill(1);
  const owner = buildConstrainedOwnership(mask, width, height, [
    { ax: 10, ay: 5, bx: 10, by: 5, radius: 5 },
    { ax: 10, ay: 5, bx: 20, by: 5, radius: 4 },
  ], 0);
  assert.equal(owner[5 * width + 18], 1);
});

test("broad irregular limb artwork is owned even when it extends well beyond the bone corridor", () => {
  const width = 31;
  const height = 15;
  const mask = new Uint8Array(width * height).fill(1);
  const owner = buildConstrainedOwnership(mask, width, height, [
    { ax: 5, ay: 7, bx: 5, by: 7, radius: 4 },
    { ax: 5, ay: 7, bx: 20, by: 7, radius: 4 },
  ], 0);
  assert.equal(owner[7 * width + 25], 1);
});

test("leaf ownership stays distal and does not reclaim distant torso pixels", () => {
  const width = 31;
  const height = 11;
  const mask = new Uint8Array(width * height).fill(1);
  const owner = buildConstrainedOwnership(mask, width, height, [
    { ax: 5, ay: 5, bx: 5, by: 5, radius: 6 },
    { ax: 20, ay: 5, bx: 28, by: 5, radius: 4, leaf: true },
  ], 0);
  assert.equal(owner[5 * width + 10], 0);
  assert.equal(owner[5 * width + 26], 1);
});

test("transparent corners disable color background lifting", () => {
  const width = 5;
  const height = 5;
  const data = new Uint8ClampedArray(width * height * 4).fill(255);
  data[3] = 0;
  const image = new ImageDataCtor(data, width, height) as ImageData;
  const bg = detectBackground(image);
  assert.equal(bg.lift, false);
});

test("background-colored artwork inside a solid background is preserved", () => {
  const width = 7;
  const height = 7;
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    data[i * 4] = 245;
    data[i * 4 + 1] = 245;
    data[i * 4 + 2] = 245;
    data[i * 4 + 3] = 255;
  }
  const center = (3 * width + 3) * 4;
  data[center] = 30;
  data[center + 1] = 30;
  data[center + 2] = 30;
  const image = new ImageDataCtor(data, width, height) as ImageData;
  const mask = buildFigureMask(image, { r: 245, g: 245, b: 245, threshold: 1, lift: true });
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
  assert.equal(repaired[4 * width + 5], 0);
});

test("hips segment bounds and geometry group the hip circle and both leg start circles", () => {
  const joints = [
    { id: "hips", parentId: null, x: 50, y: 50, thickness: 15, label: "Hips" },
    { id: "hip_l", parentId: "hips", x: 40, y: 60, thickness: 12, label: "Left Hip" },
    { id: "hip_r", parentId: "hips", x: 60, y: 60, thickness: 12, label: "Right Hip" },
    { id: "knee_l", parentId: "hip_l", x: 40, y: 80, thickness: 10, label: "Left Knee" },
    { id: "knee_r", parentId: "hip_r", x: 60, y: 80, thickness: 10, label: "Right Knee" },
  ];
  const segs = buildCutSegments(joints);
  const hipSeg = segs.find((s) => s.joint.id === "hips");
  assert.ok(hipSeg, "hips segment should exist");

  // Hips segment should span from above the hip joint down past the leg start circles
  assert.ok(hipSeg.minX !== undefined && hipSeg.minX <= 40 - 12, "hips segment contains left hip circle");
  assert.ok(hipSeg.maxX !== undefined && hipSeg.maxX >= 60 + 12, "hips segment contains right hip circle");
  assert.ok(hipSeg.maxY !== undefined && hipSeg.maxY >= 60 + 12, "hips segment contains bottom of leg start circles");
  assert.ok(hipSeg.isHip, "hip segment is marked as hip");
  assert.equal(hipSeg.legStarts?.length, 2, "hip segment has 2 leg starts");
});

test("ensureSmoothMask completely purges 1px hangs and fills 1px holes", () => {
  const width = 11;
  const height = 11;
  const mask = new Uint8Array(width * height);

  // Create a 5x5 solid square in the center
  for (let y = 3; y <= 7; y++) {
    for (let x = 3; x <= 7; x++) {
      mask[y * width + x] = 255;
    }
  }

  // Add 1px hang / spur sticking out from (5, 7) down to (5, 8) and (5, 9)
  mask[8 * width + 5] = 255;
  mask[9 * width + 5] = 255; // 1px hang whisker tip!

  // Add a 1px pinhole in the center (5, 5)
  mask[5 * width + 5] = 0;

  const smoothed = ensureSmoothMask(mask, width, height, 5, 5);

  // 1px hang at (5, 9) must be purged (0)
  assert.equal(smoothed[9 * width + 5], 0, "1px hang whisker tip must be purged");

  // 1px pinhole at (5, 5) must be filled (255)
  assert.equal(smoothed[5 * width + 5], 255, "1px interior pinhole must be filled");
});

