import type { Joint } from "./types";
import { buildConstrainedOwnership, buildCutSegments } from "./cut-parts";

type Segment = ReturnType<typeof buildCutSegments>[number];

export type Affine = { a: number; b: number; c: number; d: number; e: number; f: number };

const IDENTITY: Affine = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

/** Composes two affine transforms so that combined(p) === m1(m2(p)) (m2 applied first). */
function multiply(m1: Affine, m2: Affine): Affine {
  return {
    a: m1.a * m2.a + m1.c * m2.b,
    b: m1.b * m2.a + m1.d * m2.b,
    c: m1.a * m2.c + m1.c * m2.d,
    d: m1.b * m2.c + m1.d * m2.d,
    e: m1.a * m2.e + m1.c * m2.f + m1.e,
    f: m1.b * m2.e + m1.d * m2.f + m1.f,
  };
}

/** translate(x,y) * rotate(angleRad) * translate(-x,-y), matching canvas ctx.rotate()'s orientation. */
function rotateAround(x: number, y: number, angleRad: number): Affine {
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  return {
    a: cos,
    b: sin,
    c: -sin,
    d: cos,
    e: x - (cos * x - sin * y),
    f: y - (sin * x + cos * y),
  };
}

function apply(m: Affine, x: number, y: number): [number, number] {
  return [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f];
}

function chainOf(joint: Joint, byId: Map<string, Joint>): Joint[] {
  const chain: Joint[] = [];
  const guard = new Set<string>();
  let cur: Joint | undefined = joint;
  while (cur && !guard.has(cur.id)) {
    guard.add(cur.id);
    chain.push(cur);
    cur = cur.parentId ? byId.get(cur.parentId) : undefined;
  }
  chain.reverse();
  return chain;
}

/**
 * For every joint, computes:
 *  - `own`: the full forward-kinematics transform through the chain, including the joint's
 *    own rotation (matches what the old rigid cutout renderer applied to that joint's layer).
 *  - `parent`: the same chain transform with the joint's own rotation left out (i.e. the frame
 *    of its immediate parent). Pixels near the hinge blend toward this instead of snapping.
 */
export function computeChainTransforms(joints: Joint[], angles: Record<string, number>) {
  const byId = new Map(joints.map((j) => [j.id, j]));
  const own = new Map<string, Affine>();
  const parent = new Map<string, Affine>();
  for (const joint of joints) {
    const chain = chainOf(joint, byId);
    let m = IDENTITY;
    let parentM = IDENTITY;
    for (let i = 0; i < chain.length; i++) {
      const j = chain[i]!;
      const rad = ((angles[j.id] ?? 0) * Math.PI) / 180;
      const step = rotateAround(j.x, j.y, rad);
      if (i < chain.length - 1) {
        m = multiply(m, step);
        parentM = multiply(parentM, step);
      } else {
        parentM = m; // snapshot the chain before this joint's own rotation is folded in
        m = multiply(m, step);
      }
    }
    own.set(joint.id, m);
    parent.set(joint.id, parentM);
  }
  return { own, parent };
}

export type SkinRig = {
  width: number;
  height: number;
  /** Per source-pixel index: which bone segment owns it (-1 = not part of the figure). */
  owner: Int16Array;
  segments: Segment[];
  /** Per source-pixel index: how much of its OWN joint's rotation to use, vs. its parent's. */
  weightOwn: Float32Array;
};

const BLEND_ZONE = 0.32;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0 || 1)));
  return t * t * (3 - 2 * t);
}

/**
 * Builds a rig from the same bone segments/ownership `cut-parts.ts` uses to cut layered
 * paper dolls, but instead of duplicating pixels into rigid overlapping layers, records a
 * continuous 0..1 blend weight per pixel so the renderer can bend smoothly across each hinge.
 */
export function buildSkinRig(mask: Uint8Array, width: number, height: number, joints: Joint[]): SkinRig {
  const segments = buildCutSegments(joints);
  const rootIndex = segments.findIndex((s) => !s.joint.parentId);
  const rootOwner = rootIndex >= 0 ? rootIndex : 0;
  const owner = buildConstrainedOwnership(mask, width, height, segments, rootOwner);
  const weightOwn = new Float32Array(width * height);

  for (let i = 0; i < owner.length; i++) {
    const segIndex = owner[i];
    if (segIndex < 0) continue;
    const seg = segments[segIndex];
    if (!seg || !seg.joint.parentId) {
      weightOwn[i] = 1;
      continue;
    }
    const x = i % width;
    const y = (i / width) | 0;
    const dx = seg.bx - seg.ax;
    const dy = seg.by - seg.ay;
    const len2 = dx * dx + dy * dy || 1;
    const t = ((x - seg.ax) * dx + (y - seg.ay) * dy) / len2;
    weightOwn[i] = smoothstep(0, BLEND_ZONE, t);
  }

  return { width, height, owner, segments, weightOwn };
}

/**
 * Remaps every figure pixel directly from the untouched source image for the given pose,
 * blending each pixel between its bone's own rotation and its parent bone's rotation as it
 * nears the hinge. The limb curves through the joint instead of two rigid cutout layers
 * snapping past each other with an overlap patch hiding the seam.
 *
 * This is a forward (source -> destination) pixel splat, which is cheap enough to redo every
 * animation frame but can leave 1px seams where a joint stretches pixels apart; a single
 * neighbor-average dilation pass closes those without smearing the whole image.
 */
export function renderSkinnedFrame(
  source: ImageData,
  rig: SkinRig,
  joints: Joint[],
  angles: Record<string, number>,
): ImageData {
  const { width, height, owner, segments, weightOwn } = rig;
  const out = new ImageData(width, height);
  const outData = out.data;
  const srcData = source.data;
  const { own, parent } = computeChainTransforms(joints, angles);
  const coverage = new Uint8Array(width * height);

  for (let i = 0; i < owner.length; i++) {
    const segIndex = owner[i];
    if (segIndex < 0) continue;
    const seg = segments[segIndex];
    if (!seg) continue;
    const a = srcData[i * 4 + 3];
    if (!a) continue;

    const x = i % width;
    const y = (i / width) | 0;
    const mOwn = own.get(seg.joint.id) ?? IDENTITY;
    const mParent = parent.get(seg.joint.id) ?? mOwn;
    const w = weightOwn[i]!;
    const [ox, oy] = apply(mOwn, x, y);
    const [px, py] = apply(mParent, x, y);
    const dx = ox * w + px * (1 - w);
    const dy = oy * w + py * (1 - w);
    const dix = Math.round(dx);
    const diy = Math.round(dy);
    if (dix < 0 || diy < 0 || dix >= width || diy >= height) continue;

    const di = diy * width + dix;
    const so = i * 4;
    const doo = di * 4;
    outData[doo] = srcData[so]!;
    outData[doo + 1] = srcData[so + 1]!;
    outData[doo + 2] = srcData[so + 2]!;
    outData[doo + 3] = a;
    coverage[di] = 1;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (coverage[i] || outData[i * 4 + 3]) continue;
      let rs = 0;
      let gs = 0;
      let bs = 0;
      let as = 0;
      let n = 0;
      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          if (!ox && !oy) continue;
          const nx = x + ox;
          const ny = y + oy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const ni = ny * width + nx;
          const na = outData[ni * 4 + 3];
          if (!na) continue;
          rs += outData[ni * 4]!;
          gs += outData[ni * 4 + 1]!;
          bs += outData[ni * 4 + 2]!;
          as += na;
          n++;
        }
      }
      if (n >= 3) {
        const di = i * 4;
        outData[di] = rs / n;
        outData[di + 1] = gs / n;
        outData[di + 2] = bs / n;
        outData[di + 3] = as / n;
      }
    }
  }

  return out;
}
