import { buildFigureMask, loadHtmlImage, readImageData } from "./image";
import type { BackgroundKey, CutPart, Joint } from "./types";
import { ensureSmoothMask } from "./mask-utils";

type Segment = {
  joint: Joint;
  ax: number;
  ay: number;
  bx: number;
  by: number;
  radius: number;
  x?: number;
  y?: number;
  /** Explicitly marks terminal/leaf geometry; omitted legacy callers remain articulated. */
  leaf?: boolean;
  isHip?: boolean;
  legStarts?: Joint[];
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
};

type OwnershipSegment = Omit<Segment, "joint"> & { joint?: Joint };

function childrenOf(id: string, joints: Joint[]) {
  return joints.filter((j) => j.parentId === id);
}

function sourceMask(image: ImageData, bg: BackgroundKey) {
  let mask = buildFigureMask(image, bg);
  let fgCount = 0;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i]) fgCount++;
  }
  
  // Improvement: Check for figure presence more aggressively if initial background detection fails
  if (fgCount < image.width * image.height * 0.005) {
    // Try a simpler background detection or a fallback to transparency
    const fallbackMask = buildFigureMask(image, { r: 0, g: 0, b: 0, threshold: 20, lift: false });
    let fallbackFgCount = 0;
    for (let i = 0; i < fallbackMask.length; i++) {
      if (fallbackMask[i]) fallbackFgCount++;
    }
    
    if (fallbackFgCount > fgCount) {
        mask = fallbackMask;
        fgCount = fallbackFgCount;
    }
  }

  // If still very little detected, assume the whole canvas is the figure
  if (fgCount < image.width * image.height * 0.005) {
    mask.fill(1);
  }
  return mask;
}

function pointSegmentDistanceSquared(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
  const abx = bx - ax;
  const aby = by - ay;
  const apx = px - ax;
  const apy = py - ay;
  const ab2 = abx * abx + aby * aby;
  const t = ab2 === 0 ? 0 : Math.max(0, Math.min(1, (apx * abx + apy * aby) / ab2));
  const cx = ax + abx * t;
  const cy = ay + aby * t;
  const dx = px - cx;
  const dy = py - cy;
  return dx * dx + dy * dy;
}

function segmentProjection(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) return 0;
  return ((px - ax) * dx + (py - ay) * dy) / lengthSquared;
}

export function buildCutSegments(joints: Joint[]): Segment[] {
  return joints.map((joint) => {
    const kids = childrenOf(joint.id, joints);

    // Check if this joint represents the hips / pelvis
    const isHipRoot =
      joint.id === "hips" ||
      (joint.id.includes("hip") && !joint.parentId) ||
      joint.id === "pelvis" ||
      joint.label.toLowerCase().includes("hip");

    if (isHipRoot) {
      // Find leg start joints: hip_l, hip_r or children representing left/right leg starts
      const legStarts = kids.filter(
        (k) =>
          k.id.includes("hip_") ||
          k.id.includes("thigh") ||
          k.id.includes("leg") ||
          k.label.toLowerCase().includes("hip") ||
          k.label.toLowerCase().includes("thigh") ||
          k.label.toLowerCase().includes("leg"),
      );
      const actualLegStarts =
        legStarts.length > 0
          ? legStarts
          : kids.filter((k) => !k.id.includes("spine") && !k.id.includes("chest") && !k.id.includes("torso"));

      const spineKid = kids.find((k) => k.id.includes("spine") || k.id.includes("chest") || k.id.includes("torso"));
      const bx = spineKid ? spineKid.x : joint.x;
      const by = spineKid ? spineKid.y : joint.y;

      let minX = joint.x - joint.thickness;
      let maxX = joint.x + joint.thickness;
      let minY = joint.y - joint.thickness;
      let maxY = joint.y + joint.thickness;

      for (const leg of actualLegStarts) {
        minX = Math.min(minX, leg.x - leg.thickness);
        maxX = Math.max(maxX, leg.x + leg.thickness);
        minY = Math.min(minY, leg.y - leg.thickness);
        maxY = Math.max(maxY, leg.y + leg.thickness);
      }

      return {
        joint,
        ax: joint.x,
        ay: joint.y,
        bx,
        by,
        radius: Math.max(10, joint.thickness * 1.2),
        leaf: false,
        isHip: true,
        legStarts: actualLegStarts,
        minX,
        maxX,
        minY,
        maxY,
      };
    }

    if (kids.length === 1) {
      const child = kids[0]!;
      return { joint, ax: joint.x, ay: joint.y, bx: child.x, by: child.y, radius: Math.max(6, joint.thickness), leaf: false };
    }
    if (kids.length > 1) {
      const bx = kids.reduce((sum, child) => sum + child.x, joint.x) / (kids.length + 1);
      const by = kids.reduce((sum, child) => sum + child.y, joint.y) / (kids.length + 1);
      return { joint, ax: joint.x, ay: joint.y, bx, by, radius: Math.max(8, joint.thickness * 1.15), leaf: false };
    }

    const parent = joint.parentId ? joints.find((j) => j.id === joint.parentId) : null;
    if (parent) {
      const dx = joint.x - parent.x;
      const dy = joint.y - parent.y;
      const len = Math.hypot(dx, dy) || 1;
      const extension = Math.max(8, Math.min(28, len * 0.32));
      return {
        joint,
        ax: joint.x,
        ay: joint.y,
        bx: joint.x + (dx / len) * extension,
        by: joint.y + (dy / len) * extension,
        radius: Math.max(8, joint.thickness),
        leaf: true,
      };
    }
    return { joint, ax: joint.x, ay: joint.y, bx: joint.x, by: joint.y, radius: Math.max(8, joint.thickness), leaf: true };
  });
}

type OwnershipSeed = { x: number; y: number; owner?: number };

export function buildGeodesicOwnership(mask: Uint8Array, width: number, height: number, seeds: OwnershipSeed[]) {
  const owner = new Int16Array(width * height);
  owner.fill(-1);
  if (!seeds.length) return owner;
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;
  const sourceSeeds = seeds.map((seed, index) => ({ ...seed, owner: seed.owner ?? index }));
  for (const seed of sourceSeeds) {
    let sx = Math.max(0, Math.min(width - 1, Math.round(seed.x)));
    let sy = Math.max(0, Math.min(height - 1, Math.round(seed.y)));
    if (!mask[sy * width + sx]) {
      let found = false;
      for (let radius = 1; radius <= Math.max(width, height) && !found; radius++) {
        const minX = Math.max(0, sx - radius);
        const maxX = Math.min(width - 1, sx + radius);
        const minY = Math.max(0, sy - radius);
        const maxY = Math.min(height - 1, sy + radius);
        for (let y = minY; y <= maxY && !found; y++) {
          for (let x = minX; x <= maxX; x++) {
            if (!mask[y * width + x]) continue;
            sx = x; sy = y; found = true; break;
          }
        }
      }
    }
    const index = sy * width + sx;
    if (!mask[index] || owner[index] !== -1) continue;
    owner[index] = seed.owner;
    queue[tail++] = index;
  }
  const neighbors = [-1, 1, -width, width];
  while (head < tail) {
    const index = queue[head++]!;
    const x = index % width;
    const y = Math.floor(index / width);
    for (const delta of neighbors) {
      const next = index + delta;
      if (next < 0 || next >= owner.length) continue;
      if (delta === -1 && x === 0) continue;
      if (delta === 1 && x === width - 1) continue;
      if (delta === -width && y === 0) continue;
      if (delta === width && y === height - 1) continue;
      if (!mask[next] || owner[next] !== -1) continue;
      owner[next] = owner[index]!;
      queue[tail++] = next;
    }
  }
  for (let i = 0; i < owner.length; i++) {
    if (!mask[i] || owner[i] !== -1) continue;
    const x = i % width;
    const y = Math.floor(i / width);
    let bestOwner = sourceSeeds[0]!.owner!;
    let bestDistance = Infinity;
    for (const seed of sourceSeeds) {
      const dx = x - seed.x;
      const dy = y - seed.y;
      const distance = dx * dx + dy * dy;
      if (distance < bestDistance) { bestDistance = distance; bestOwner = seed.owner!; }
    }
    owner[i] = bestOwner;
  }
  return owner;
}

/**
 * Partition the complete foreground silhouette using the bone as a directional
 * boundary, rather than deleting everything outside a fixed-width capsule.
 *
 * The projection gate keeps proximal torso pixels with the parent/root while
 * allowing an articulated part to claim its entire visible silhouette width.
 * A distance score still resolves overlaps between neighboring bones. There is
 * deliberately no distal radius cutoff: artwork is the authority on the part's
 * visible shape, while the skeleton only establishes where that shape belongs.
 */
export function buildConstrainedOwnership(
  mask: Uint8Array,
  width: number,
  height: number,
  segments: OwnershipSegment[],
  rootOwner = 0,
) {
  const owner = new Int16Array(width * height);
  owner.fill(-1);
  if (!segments.length) return owner;

  for (let i = 0; i < owner.length; i++) {
    if (!mask[i]) continue;
    const x = i % width;
    const y = Math.floor(i / width);
    let best = rootOwner;
    let bestScore = Infinity;

    for (let partIndex = 0; partIndex < segments.length; partIndex++) {
      const segment = segments[partIndex]!;
      const projection = segmentProjection(x, y, segment.ax, segment.ay, segment.bx, segment.by);
      const isRoot = partIndex === rootOwner;
      const proximalLimit = segment.leaf === true ? -0.3 : isRoot ? -0.15 : 0.12;
      // Keep a generous directional corridor so irregular artwork can extend
      // beyond the nominal bone endpoint without being dropped from the part.
      const distalLimit = 1.7;
      if (projection < proximalLimit || projection > distalLimit) continue;

      const distance = Math.sqrt(pointSegmentDistanceSquared(x, y, segment.ax, segment.ay, segment.bx, segment.by));
      const widthScale = Math.max(6, segment.radius);
      const projectionPenalty = projection < 0 ? Math.abs(projection) * 2 : Math.max(0, projection - 1) * 1.5;
      const score = distance / widthScale + projectionPenalty;
      if (score < bestScore) {
        bestScore = score;
        best = partIndex;
      }
    }
    if (bestScore === Infinity) {
      let minDist = Infinity;
      for (let partIndex = 0; partIndex < segments.length; partIndex++) {
        const seg = segments[partIndex]!;
        const d = pointSegmentDistanceSquared(x, y, seg.ax, seg.ay, seg.bx, seg.by);
        if (d < minDist) {
          minDist = d;
          best = partIndex;
        }
      }
    }
    owner[i] = best;
  }
  return owner;
}

function overlapMask(mask: Uint8Array, width: number, height: number, joint: Joint, radius: number) {
  const result = new Uint8Array(width * height);
  const r2 = radius * radius;
  const minX = Math.max(0, Math.floor(joint.x - radius));
  const maxX = Math.min(width - 1, Math.ceil(joint.x + radius));
  const minY = Math.max(0, Math.floor(joint.y - radius));
  const maxY = Math.min(height - 1, Math.ceil(joint.y + radius));
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (!mask[y * width + x]) continue;
      const dx = x - joint.x;
      const dy = y - joint.y;
      if (dx * dx + dy * dy <= r2) result[y * width + x] = 1;
    }
  }
  return result;
}

function boundsForPart(owner: Int16Array, mask: Uint8Array, overlap: Uint8Array, partIndex: number, width: number, height: number) {
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let i = 0; i < owner.length; i++) {
    if (!mask[i] || (owner[i] !== partIndex && !overlap[i])) continue;
    const x = i % width;
    const y = Math.floor(i / width);
    minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
  }
  return maxX < minX ? null : { minX, minY, maxX, maxY };
}

function maskToCanvas(alpha: Uint8Array, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");
  const img = ctx.createImageData(width, height);
  for (let i = 0; i < alpha.length; i++) {
    const d = i * 4;
    img.data[d] = 255;
    img.data[d + 1] = 255;
    img.data[d + 2] = 255;
    img.data[d + 3] = alpha[i] ? 255 : 0;
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

function renderAttachmentRaw(
  image: ImageData,
  cropMinX: number,
  cropMinY: number,
  cw: number,
  ch: number,
) {
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");
  const out = ctx.createImageData(cw, ch);
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const sx = cropMinX + x;
      const sy = cropMinY + y;
      const src = (sy * image.width + sx) * 4;
      const dst = (y * cw + x) * 4;
      out.data[dst] = image.data[src] ?? 0;
      out.data[dst + 1] = image.data[src + 1] ?? 0;
      out.data[dst + 2] = image.data[src + 2] ?? 0;
      out.data[dst + 3] = image.data[src + 3] ?? 0; // Raw alpha
    }
  }
  ctx.putImageData(out, 0, 0);
  return canvas;
}

function renderAttachmentFromMask(
  image: ImageData,
  cropMinX: number,
  cropMinY: number,
  cw: number,
  ch: number,
  alpha: Uint8Array,
) {
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");
  const out = ctx.createImageData(cw, ch);
  let pixelCount = 0;
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const m = alpha[y * cw + x];
      if (!m) continue;
      const sx = cropMinX + x;
      const sy = cropMinY + y;
      const src = (sy * image.width + sx) * 4;
      const dst = (y * cw + x) * 4;
      out.data[dst] = image.data[src] ?? 0;
      out.data[dst + 1] = image.data[src + 1] ?? 0;
      out.data[dst + 2] = image.data[src + 2] ?? 0;
      out.data[dst + 3] = Math.min(image.data[src + 3] ?? 0, m ? 255 : 0);
      pixelCount++;
    }
  }
  ctx.putImageData(out, 0, 0);
  return { canvas, pixelCount };
}

function estimatePartConfidence(
  joint: Joint,
  pixelCount: number,
  cropWidth: number,
  cropHeight: number,
  thickness: number,
) {
  const density = pixelCount / Math.max(1, cropWidth * cropHeight);
  const expectedArea = Math.max(1, thickness * thickness * 2.5);
  const sizeScore = Math.min(1, pixelCount / expectedArea);
  const densityScore = density > 0.08 && density < 0.85 ? 1 : 0.5;
  return Math.max(0, Math.min(1, sizeScore * densityScore));
}

export async function cutParts(sourceDataUrl: string, joints: Joint[], bg: BackgroundKey): Promise<CutPart[]> {
  const img = await loadHtmlImage(sourceDataUrl);
  const image = readImageData(img);
  const { width, height } = image;
  const mask = sourceMask(image, bg);
  const segments = buildCutSegments(joints);
  if (!segments.length) return [];
  const rootIndex = segments.findIndex((s) => !s.joint.parentId);
  const rootOwner = rootIndex >= 0 ? rootIndex : 0;
  const owner = buildConstrainedOwnership(mask, width, height, segments, rootOwner);
  const overlaps = new Map<string, Uint8Array>();
  for (const joint of joints) overlaps.set(joint.id, overlapMask(mask, width, height, joint, Math.max(12, joint.thickness * 1.6)));

  const parts: CutPart[] = [];
  for (let partIndex = 0; partIndex < segments.length; partIndex++) {
    const segment = segments[partIndex]!;
    const joint = segment.joint;
    const overlap = overlaps.get(joint.id) ?? new Uint8Array(width * height);
    const boundsOverlap = new Uint8Array(width * height);
    const kids = childrenOf(joint.id, joints);
    for (let i = 0; i < boundsOverlap.length; i++) if (overlap[i]) boundsOverlap[i] = 1;
    for (const child of kids) {
      const childOverlap = overlaps.get(child.id);
      if (!childOverlap) continue;
      for (let i = 0; i < boundsOverlap.length; i++) if (childOverlap[i]) boundsOverlap[i] = 1;
    }
    if (segment.isHip && segment.legStarts) {
      for (const leg of segment.legStarts) {
        const legOverlap = overlaps.get(leg.id);
        if (!legOverlap) continue;
        for (let i = 0; i < boundsOverlap.length; i++) if (legOverlap[i]) boundsOverlap[i] = 1;
      }
    }
    const bounds = boundsForPart(owner, mask, boundsOverlap, partIndex, width, height);

    let cropMinX = bounds ? Math.max(0, bounds.minX - 4) : 0;
    let cropMinY = bounds ? Math.max(0, bounds.minY - 4) : 0;
    let cropMaxX = bounds ? Math.min(width - 1, bounds.maxX + 4) : 0;
    let cropMaxY = bounds ? Math.min(height - 1, bounds.maxY + 4) : 0;
    let cw = bounds ? cropMaxX - cropMinX + 1 : 0;
    let ch = bounds ? cropMaxY - cropMinY + 1 : 0;

    let alpha = new Uint8Array(cw * ch);
    if (bounds && cw > 0 && ch > 0) {
      for (let y = 0; y < ch; y++) {
        for (let x = 0; x < cw; x++) {
          const sx = cropMinX + x;
          const sy = cropMinY + y;
          const srcIndex = sy * width + sx;
          const isOwned = owner[srcIndex] === partIndex;
          let isOverlap = overlap[srcIndex] === 1;
          if (!isOverlap) {
            for (const child of kids) {
              if ((overlaps.get(child.id)?.[srcIndex] ?? 0) === 1) {
                isOverlap = true;
                break;
              }
            }
          }

          // Initial part geometric guarantee:
          // 1. Joint circle itself (socket circle)
          const dJointCenterSq = (sx - joint.x) ** 2 + (sy - joint.y) ** 2;
          const jointR = joint.thickness;
          const inJointCircle = dJointCenterSq <= jointR * jointR;

          // 2. Joints filled with curved lines between them (smooth capsule / corridor)
          let inCurvedBridge = false;
          if (!segment.leaf && (segment.ax !== segment.bx || segment.ay !== segment.by)) {
            const dLineSq = pointSegmentDistanceSquared(sx, sy, segment.ax, segment.ay, segment.bx, segment.by);
            const rBridge = segment.radius;
            if (dLineSq <= rBridge * rBridge) {
              inCurvedBridge = true;
            }
          }

          // 3. For hip: must contain hip circle and both leg start circles, plus curved connection
          let inHipStructure = false;
          if (segment.isHip && segment.legStarts) {
            for (const leg of segment.legStarts) {
              const dLegSq = (sx - leg.x) ** 2 + (sy - leg.y) ** 2;
              if (dLegSq <= leg.thickness * leg.thickness) {
                inHipStructure = true;
                break;
              }
              const dHipLegSq = pointSegmentDistanceSquared(sx, sy, joint.x, joint.y, leg.x, leg.y);
              const rAvg = (joint.thickness + leg.thickness) * 0.55;
              if (dHipLegSq <= rAvg * rAvg) {
                inHipStructure = true;
                break;
              }
            }
          }

          if (
            mask[srcIndex] &&
            (isOwned || isOverlap || inJointCircle || inCurvedBridge || inHipStructure)
          ) {
            alpha[y * cw + x] = 255;
          }
        }
      }
      // Apply smooth edge pass to eliminate 1px hangs and ensure actually smooth paths
      alpha = ensureSmoothMask(alpha, cw, ch, joint.x - cropMinX, joint.y - cropMinY);
    }

    let rendered = bounds && cw > 0 && ch > 0
      ? renderAttachmentFromMask(image, cropMinX, cropMinY, cw, ch, alpha)
      : { canvas: document.createElement("canvas"), pixelCount: 0 };
    let rgbCanvas = rendered.canvas;
    let pixelCount = rendered.pixelCount;

    // Guaranteed fallback: if part has fewer than 8 pixels, extract capsule/disc around bone and pivot
    if (pixelCount < 8) {
      const r = Math.max(16, Math.round(joint.thickness * 1.6));
      cropMinX = Math.max(0, Math.floor(Math.min(segment.ax, segment.bx) - r));
      cropMinY = Math.max(0, Math.floor(Math.min(segment.ay, segment.by) - r));
      cropMaxX = Math.min(width - 1, Math.ceil(Math.max(segment.ax, segment.bx) + r));
      cropMaxY = Math.min(height - 1, Math.ceil(Math.max(segment.ay, segment.by) + r));
      cw = cropMaxX - cropMinX + 1;
      ch = cropMaxY - cropMinY + 1;
      alpha = new Uint8Array(cw * ch);

      for (let y = 0; y < ch; y++) {
        for (let x = 0; x < cw; x++) {
          const sx = cropMinX + x;
          const sy = cropMinY + y;
          const d2 = pointSegmentDistanceSquared(sx, sy, segment.ax, segment.ay, segment.bx, segment.by);
          if (d2 <= r * r && mask[sy * width + sx]) {
            alpha[y * cw + x] = 255;
          }
        }
      }
      rendered = renderAttachmentFromMask(image, cropMinX, cropMinY, cw, ch, alpha);
      rgbCanvas = rendered.canvas;
      pixelCount = rendered.pixelCount;

      if (pixelCount < 4) {
        for (let y = 0; y < ch; y++) {
          for (let x = 0; x < cw; x++) {
            const sx = cropMinX + x;
            const sy = cropMinY + y;
            const d2 = pointSegmentDistanceSquared(sx, sy, segment.ax, segment.ay, segment.bx, segment.by);
            if (d2 <= r * r) {
              alpha[y * cw + x] = 255;
            }
          }
        }
        rendered = renderAttachmentFromMask(image, cropMinX, cropMinY, cw, ch, alpha);
        rgbCanvas = rendered.canvas;
        pixelCount = rendered.pixelCount;
      }
    }

    if (pixelCount < 1 || cw < 1 || ch < 1) continue;
    
    const alphaCanvas = maskToCanvas(alpha, cw, ch);
    const rawCanvas = renderAttachmentRaw(image, cropMinX, cropMinY, cw, ch);

    parts.push({
      id: joint.id,
      boneId: joint.id,
      label: joint.label,
      parentBoneId: joint.parentId,
      role: "main",
      dataUrl: rgbCanvas.toDataURL("image/png"),
      baseDataUrl: rawCanvas.toDataURL("image/png"),
      width: cw,
      height: ch,
      cropX: cropMinX,
      cropY: cropMinY,
      pivotX: joint.x,
      pivotY: joint.y,
      localPivotX: joint.x - cropMinX,
      localPivotY: joint.y - cropMinY,
      zIndex: joint.zIndex,
      minAngle: joint.minAngle,
      maxAngle: joint.maxAngle,
      thickness: joint.thickness,
      pixelCount,
      mask: {
        bboxX: cropMinX,
        bboxY: cropMinY,
        width: cw,
        height: ch,
        alphaPngDataUrl: alphaCanvas.toDataURL("image/png"),
        source: "auto",
        confidence: estimatePartConfidence(joint, pixelCount, cw, ch, joint.thickness),
        pixelMask: new Uint8Array(alpha),
      },
      sourceVersion: 0,
      repaired: false,
    });
  }
  return parts;
}
