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

    // Terminal / leaf joint (hands, feet, head top, tail tip, etc.)
    const parent = joint.parentId ? joints.find((j) => j.id === joint.parentId) : null;
    if (parent) {
      const dx = joint.x - parent.x;
      const dy = joint.y - parent.y;
      const len = Math.hypot(dx, dy) || 1;
      // Project the limb forward in the direction of the extremity
      const extension = Math.max(20, Math.min(80, len * 0.8));
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
 * Partition the complete unmasked figure image without discarding non-joint regions.
 *
 * Every single pixel belonging to the figure mask is assigned to exactly one base part,
 * following the unmasked image contours between joints.
 * Terminal parts (hands, feet, head top) trace the edges from the wrist/ankle joint outward
 * to enclose all remaining extremities and details.
 * Only areas inside joints (and their overlapping rotation sockets) are duplicated between
 * connected parts so puppets rotate cleanly without gaps.
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
      const isLeaf = segment.leaf === true;
      const isRoot = partIndex === rootOwner;

      // Projection along bone vector ax->bx (0 = at joint A, 1 = at joint/target B)
      const projection = segmentProjection(x, y, segment.ax, segment.ay, segment.bx, segment.by);

      // Proximal gate: don't let child limbs steal pixels behind their parent joint
      // For leaf parts (hands, feet), anything beyond the wrist/ankle (proj >= 0) is freely claimed.
      const proximalLimit = isLeaf ? -0.1 : isRoot ? -0.3 : 0.05;
      if (projection < proximalLimit) continue;

      const distSq = pointSegmentDistanceSquared(x, y, segment.ax, segment.ay, segment.bx, segment.by);
      const distance = Math.sqrt(distSq);
      const widthScale = Math.max(6, segment.radius);

      // Terminal leaf parts (hands, feet) extend to the absolute boundary of the silhouette
      // without penalty for projecting past the bone tip.
      let projectionPenalty = 0;
      if (projection < 0) {
        projectionPenalty = Math.abs(projection) * 2.5;
      } else if (!isLeaf && projection > 1) {
        projectionPenalty = (projection - 1) * 2.0;
      }

      // Bonus for leaf extremities to ensure fingers, toes, shoes, hats are securely held
      const leafBonus = isLeaf && projection >= 0 ? 0.8 : 1.0;
      const score = (distance / widthScale + projectionPenalty) * leafBonus;

      if (score < bestScore) {
        bestScore = score;
        best = partIndex;
      }
    }

    // Comprehensive fallback: every unmasked pixel MUST belong to a part
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

export function getCurvedRadiusAtAngle(joint: Joint, angle: number): number {
  const baseR = Math.max(8, joint.thickness) * 1.5;
  if (!joint.radialOffsets || joint.radialOffsets.length !== 8) {
    return baseR;
  }
  let a = angle;
  if (a < 0) a += Math.PI * 2;
  a = a % (Math.PI * 2);

  const angleStep = Math.PI / 4;
  const index1 = Math.floor(a / angleStep) % 8;
  const index2 = (index1 + 1) % 8;
  const t = (a - index1 * angleStep) / angleStep;

  // Cosine interpolation for perfect smooth transitions between control points
  const mu = (1 - Math.cos(t * Math.PI)) / 2;
  const r1 = baseR * (joint.radialOffsets[index1] ?? 1.0);
  const r2 = baseR * (joint.radialOffsets[index2] ?? 1.0);
  return r1 * (1 - mu) + r2 * mu;
}

function overlapMask(mask: Uint8Array, width: number, height: number, joint: Joint, radius: number) {
  const result = new Uint8Array(width * height);
  const hasRadialOffsets = joint.radialOffsets && joint.radialOffsets.length === 8;
  const baseR = hasRadialOffsets ? Math.max(8, joint.thickness) * 1.5 : radius;
  
  let maxR = baseR;
  if (hasRadialOffsets && joint.radialOffsets) {
    for (let i = 0; i < 8; i++) {
      const r = Math.max(8, joint.thickness) * 1.5 * (joint.radialOffsets[i] ?? 1.0);
      if (r > maxR) maxR = r;
    }
  }

  const minX = Math.max(0, Math.floor(joint.x - maxR));
  const maxX = Math.min(width - 1, Math.ceil(joint.x + maxR));
  const minY = Math.max(0, Math.floor(joint.y - maxR));
  const maxY = Math.min(height - 1, Math.ceil(joint.y + maxR));

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (!mask[y * width + x]) continue;
      const dx = x - joint.x;
      const dy = y - joint.y;
      const d = Math.hypot(dx, dy);

      if (hasRadialOffsets) {
        const angle = Math.atan2(dy, dx);
        const allowedRadius = getCurvedRadiusAtAngle(joint, angle);
        if (d <= allowedRadius) {
          result[y * width + x] = 1;
        }
      } else {
        if (d <= radius) {
          result[y * width + x] = 1;
        }
      }
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
  for (const joint of joints) {
    // Only duplicate the circular socket area inside the joint itself
    // Radius matches joint thickness (socket radius)
    const socketRadius = Math.max(8, joint.thickness * 1.15);
    overlaps.set(joint.id, overlapMask(mask, width, height, joint, socketRadius));
  }

  const parts: CutPart[] = [];
  for (let partIndex = 0; partIndex < segments.length; partIndex++) {
    const segment = segments[partIndex]!;
    const joint = segment.joint;
    const overlap = overlaps.get(joint.id) ?? new Uint8Array(width * height);
    const boundsOverlap = new Uint8Array(width * height);
    const kids = childrenOf(joint.id, joints);

    // Duplicate ONLY within the joint sockets connecting this part to its parent and immediate children
    for (let i = 0; i < boundsOverlap.length; i++) {
      if (overlap[i]) boundsOverlap[i] = 1;
    }
    for (const child of kids) {
      const childOverlap = overlaps.get(child.id);
      if (!childOverlap) continue;
      for (let i = 0; i < boundsOverlap.length; i++) {
        if (childOverlap[i]) boundsOverlap[i] = 1;
      }
    }
    if (segment.isHip && segment.legStarts) {
      for (const leg of segment.legStarts) {
        const legOverlap = overlaps.get(leg.id);
        if (!legOverlap) continue;
        for (let i = 0; i < boundsOverlap.length; i++) {
          if (legOverlap[i]) boundsOverlap[i] = 1;
        }
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

          // Only unmasked image pixels are included
          if (!mask[srcIndex]) continue;

          // Pixel is part of this segment if it is owned by this part
          const isOwned = owner[srcIndex] === partIndex;

          // Or if it falls within the duplicated joint socket zone (proximal socket at joint, or distal child socket)
          let isJointSocketOverlap = overlap[srcIndex] === 1;
          if (!isJointSocketOverlap) {
            for (const child of kids) {
              if ((overlaps.get(child.id)?.[srcIndex] ?? 0) === 1) {
                isJointSocketOverlap = true;
                break;
              }
            }
          }
          if (!isJointSocketOverlap && segment.isHip && segment.legStarts) {
            for (const leg of segment.legStarts) {
              if ((overlaps.get(leg.id)?.[srcIndex] ?? 0) === 1) {
                isJointSocketOverlap = true;
                break;
              }
            }
          }

          if (isOwned || isJointSocketOverlap) {
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
