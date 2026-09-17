import { figureBBox } from "./image";
import { jointsFromSpecs, specsFor } from "./templates";
import type { Joint, SkeletonKind } from "./types";

function inMask(mask: Uint8Array, width: number, height: number, x: number, y: number) {
  const ix = Math.round(x);
  const iy = Math.round(y);
  if (ix < 0 || iy < 0 || ix >= width || iy >= height) return false;
  return mask[iy * width + ix] === 1;
}

function centroid(
  mask: Uint8Array,
  width: number,
  height: number,
  test: (x: number, y: number) => boolean,
) {
  let sx = 0;
  let sy = 0;
  let n = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!mask[y * width + x]) continue;
      if (!test(x, y)) continue;
      sx += x;
      sy += y;
      n++;
    }
  }
  if (!n) return null;
  return { x: sx / n, y: sy / n };
}

function extremum(
  mask: Uint8Array,
  width: number,
  height: number,
  score: (x: number, y: number) => number,
) {
  let best = -Infinity;
  let px = width / 2;
  let py = height / 2;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!mask[y * width + x]) continue;
      const s = score(x, y);
      if (s > best) {
        best = s;
        px = x;
        py = y;
      }
    }
  }
  return { x: px, y: py };
}

function localWidth(
  mask: Uint8Array,
  width: number,
  height: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  let left = 0;
  let right = 0;
  for (let t = 1; t < 240; t++) {
    if (!inMask(mask, width, height, mx + nx * t, my + ny * t)) break;
    right = t;
  }
  for (let t = 1; t < 240; t++) {
    if (!inMask(mask, width, height, mx - nx * t, my - ny * t)) break;
    left = t;
  }
  return Math.max(6, (left + right) / 2);
}

function lerp(a: { x: number; y: number }, b: { x: number; y: number }, t: number) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

export function placeFromSilhouette(
  mask: Uint8Array,
  width: number,
  height: number,
  kind: SkeletonKind,
): Joint[] {
  const bbox = figureBBox(mask, width, height);
  const joints = jointsFromSpecs(specsFor(kind), bbox);
  if (kind === "quadruped" || kind === "bird" || kind === "simple") {
    refineThickness(joints, mask, width, height);
    return joints;
  }

  const top = bbox.y + bbox.h * 0.16;
  const head =
    centroid(mask, width, height, (_x, y) => y <= top) ??
    { x: bbox.x + bbox.w * 0.5, y: bbox.y + bbox.h * 0.12 };
  const hips =
    centroid(
      mask,
      width,
      height,
      (x, y) =>
        y >= bbox.y + bbox.h * 0.46 &&
        y <= bbox.y + bbox.h * 0.6 &&
        x >= bbox.x + bbox.w * 0.3 &&
        x <= bbox.x + bbox.w * 0.7,
    ) ?? { x: bbox.x + bbox.w * 0.5, y: bbox.y + bbox.h * 0.52 };
  const torso = lerp(head, hips, 0.45);
  const handL = extremum(mask, width, height, (x, y) => -x - y * 0.15);
  const handR = extremum(mask, width, height, (x, y) => x - y * 0.15);
  const footL = extremum(mask, width, height, (x, y) => y - x * 0.35);
  const footR = extremum(mask, width, height, (x, y) => y + x * 0.35);
  const shoulderL = {
    x: torso.x - bbox.w * 0.16,
    y: torso.y + bbox.h * 0.02,
  };
  const shoulderR = {
    x: torso.x + bbox.w * 0.16,
    y: torso.y + bbox.h * 0.02,
  };
  const elbowL = lerp(shoulderL, handL, 0.52);
  const elbowR = lerp(shoulderR, handR, 0.52);
  const hipL = { x: hips.x - bbox.w * 0.08, y: hips.y + bbox.h * 0.02 };
  const hipR = { x: hips.x + bbox.w * 0.08, y: hips.y + bbox.h * 0.02 };
  const kneeL = lerp(hipL, footL, 0.52);
  const kneeR = lerp(hipR, footR, 0.52);
  const tail = { x: hips.x + bbox.w * 0.08, y: hips.y + bbox.h * 0.12 };

  const byId: Record<string, { x: number; y: number }> = {
    hips,
    torso,
    head,
    shoulder_l: shoulderL,
    elbow_l: elbowL,
    hand_l: handL,
    shoulder_r: shoulderR,
    elbow_r: elbowR,
    hand_r: handR,
    hip_l: hipL,
    knee_l: kneeL,
    foot_l: footL,
    hip_r: hipR,
    knee_r: kneeR,
    foot_r: footR,
    tail,
  };

  for (const joint of joints) {
    const p = byId[joint.id];
    if (!p) continue;
    joint.x = clamp(p.x, 2, width - 3);
    joint.y = clamp(p.y, 2, height - 3);
  }

  refineThickness(joints, mask, width, height);
  return joints;
}

function refineThickness(joints: Joint[], mask: Uint8Array, width: number, height: number) {
  const map = new Map(joints.map((j) => [j.id, j]));
  for (const joint of joints) {
    const parent = joint.parentId ? map.get(joint.parentId) : null;
    if (!parent) continue;
    const w = localWidth(mask, width, height, parent.x, parent.y, joint.x, joint.y);
    joint.thickness = Math.max(6, Math.min(joint.thickness * 1.6, w * 1.05));
  }
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function applyAiJoints(
  raw: Array<{
    id: string;
    label?: string;
    parent?: string | null;
    x: number;
    y: number;
    thickness?: number;
    min_angle?: number;
    max_angle?: number;
    z_index?: number;
  }>,
  width: number,
  height: number,
  fallback: Joint[],
): Joint[] {
  if (!raw.length) return fallback;
  const short = Math.min(width, height);
  const seen = new Set<string>();
  const joints: Joint[] = [];
  for (const item of raw) {
    const id = String(item.id || "").trim().replace(/\s+/g, "_");
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const x = item.x <= 1 && item.x >= 0 ? item.x * width : item.x;
    const y = item.y <= 1 && item.y >= 0 ? item.y * height : item.y;
    const parent = item.parent === id ? null : (item.parent ?? null);
    joints.push({
      id,
      label: item.label?.trim() || id.replace(/_/g, " "),
      parentId: parent ? String(parent) : null,
      x: clamp(x, 1, width - 2),
      y: clamp(y, 1, height - 2),
      thickness: Math.max(6, (item.thickness ?? 0.05) <= 1 ? (item.thickness ?? 0.05) * short : (item.thickness ?? 12)),
      minAngle: item.min_angle ?? -45,
      maxAngle: item.max_angle ?? 45,
      zIndex: item.z_index ?? joints.length,
    });
  }
  const ids = new Set(joints.map((j) => j.id));
  for (const joint of joints) {
    if (joint.parentId && !ids.has(joint.parentId)) joint.parentId = null;
  }
  if (!joints.some((j) => !j.parentId) && joints[0]) joints[0].parentId = null;
  return joints.length ? joints : fallback;
}
