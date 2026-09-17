import type { ExtractionPins } from "./contracts";

const preferredIds = [
  "hips", "torso", "head", "shoulder_l", "elbow_l", "hand_l",
  "shoulder_r", "elbow_r", "hand_r", "hip_l", "knee_l", "foot_l",
  "hip_r", "knee_r", "foot_r", "tail",
];

export function buildExtractionPrompt(hint = "", pins: ExtractionPins = {}): string {
  const required = pins.requiredIds?.length ? pins.requiredIds.join(", ") : preferredIds.join(", ");
  const anchors = pins.anchors?.map((a) => `${a.id}@${a.x ?? "?"},${a.y ?? "?"}±${a.tolerance ?? 0.08}`).join("; ") || "none";
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

export function buildRegionalPrompt(regionId: string, hint = "", pins: ExtractionPins = {}): string {
  return `${buildExtractionPrompt(hint, pins)}\nRe-evaluate only region ${regionId}. Preserve all valid global anatomy and repair the weak/occluded region without inventing missing parts.`;
}
