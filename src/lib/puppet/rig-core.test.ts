import { describe, expect, it } from "vitest";
import { buildRigDocument } from "./yaml";
import { detectBackground } from "./image";

describe("rig export", () => {
  it("derives attachment local pivots from the current bone", () => {
    const doc = buildRigDocument(
      { dataUrl: "", width: 100, height: 100, name: "test" },
      [{ id: "arm", label: "Arm", parentId: null, x: 42, y: 37, thickness: 10, minAngle: -45, maxAngle: 45, zIndex: 1 }],
      [{ id: "part", boneId: "arm", label: "Arm", parentBoneId: null, role: "main", dataUrl: "", width: 30, height: 40, cropX: 20, cropY: 10, pivotX: 0, pivotY: 0, localPivotX: 999, localPivotY: 999, zIndex: 1, minAngle: -45, maxAngle: 45, thickness: 10, pixelCount: 10, mask: { bboxX: 0, bboxY: 0, width: 30, height: 40, alphaPngDataUrl: "", source: "auto", confidence: 1 } }],
      [],
    );
    expect(doc.attachments[0].local_pivot).toEqual({ x: 22, y: 27 });
  });

  it("rejects attachments that reference a deleted bone", () => {
    expect(() => buildRigDocument(
      { dataUrl: "", width: 10, height: 10, name: "test" },
      [],
      [{ id: "orphan", boneId: "missing", label: "Orphan", parentBoneId: null, role: "main", dataUrl: "", width: 1, height: 1, cropX: 0, cropY: 0, pivotX: 0, pivotY: 0, localPivotX: 0, localPivotY: 0, zIndex: 0, minAngle: -1, maxAngle: 1, thickness: 1, pixelCount: 1, mask: { bboxX: 0, bboxY: 0, width: 1, height: 1, alphaPngDataUrl: "", source: "auto", confidence: 1 } }],
      [],
    )).toThrow(/missing bone/);
  });
});

describe("background detection", () => {
  it("uses a bounded threshold derived from a border strip", () => {
    const width = 20;
    const height = 20;
    const data = new Uint8ClampedArray(width * height * 4);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        data[i] = 100;
        data[i + 1] = 110;
        data[i + 2] = 120;
        data[i + 3] = 255;
      }
    }
    const image = { width, height, data } as ImageData;
    const bg = detectBackground(image);
    expect(bg.threshold).toBeGreaterThanOrEqual(18);
    expect(bg.threshold).toBeLessThanOrEqual(52);
  });
});
