export type MaskEditMode = "add" | "erase";

export type MaskEdit = {
  x: number;
  y: number;
  radius: number;
  mode: MaskEditMode;
};

export type CrosshairPoint = {
  x: number;
  y: number;
  radii: number[];
  label?: string;
  isParent?: boolean;
  joint?: any;
};

export type SnapResult = {
  x: number;
  y: number;
  snapped: boolean;
  type?: "center" | "circle" | "axis";
  targetPoint?: CrosshairPoint;
  targetRadius?: number;
};

/**
 * Apply localized, non-destructive repair strokes to an attachment alpha mask.
 * The input mask is never mutated, so callers can retain an undo snapshot.
 */
export function applyMaskEdits(
  mask: Uint8Array,
  width: number,
  height: number,
  edits: MaskEdit[],
): Uint8Array {
  if (mask.length !== width * height) {
    throw new Error("Mask dimensions do not match the supplied pixel buffer");
  }
  const result = new Uint8Array(mask);
  for (const edit of edits) {
    const radius = Math.max(0, edit.radius);
    if (!Number.isFinite(edit.x) || !Number.isFinite(edit.y) || !Number.isFinite(radius)) continue;
    const minX = Math.max(0, Math.floor(edit.x - radius));
    const maxX = Math.min(width - 1, Math.ceil(edit.x + radius));
    const minY = Math.max(0, Math.floor(edit.y - radius));
    const maxY = Math.min(height - 1, Math.ceil(edit.y + radius));
    const radiusSquared = radius * radius;
    for (let y = minY; y <= maxY; y++) {
      const rowOffset = y * width;
      for (let x = minX; x <= maxX; x++) {
        const dx = x - edit.x;
        const dy = y - edit.y;
        if (dx * dx + dy * dy > radiusSquared) continue;
        result[rowOffset + x] = edit.mode === "add" ? 255 : 0;
      }
    }
  }
  return result;
}

/**
 * Snap a point (x, y) to nearby crosshairs, concentric circle radii, or crosshair axes.
 */
export function snapToCrosshairsAndCircles(
  x: number,
  y: number,
  points: CrosshairPoint[],
  threshold: number = 10,
): SnapResult {
  if (!points.length || threshold <= 0) return { x, y, snapped: false };

  let bestDist = threshold;
  let bestSnap: SnapResult = { x, y, snapped: false };

  for (const pt of points) {
    const dCenter = Math.hypot(x - pt.x, y - pt.y);

    // 1. Center snap
    if (dCenter < bestDist) {
      bestDist = dCenter;
      bestSnap = {
        x: pt.x,
        y: pt.y,
        snapped: true,
        type: "center",
        targetPoint: pt,
      };
    }

    // 2. Concentric circle snap
    for (const r of pt.radii) {
      if (r <= 0) continue;
      const dCircle = Math.abs(dCenter - r);
      if (dCircle < bestDist && dCenter > 0.5) {
        bestDist = dCircle;
        let angle = Math.atan2(y - pt.y, x - pt.x);
        // Subtle 15-degree angle snap when close to standard angles
        const deg = (angle * 180) / Math.PI;
        const snappedDeg = Math.round(deg / 15) * 15;
        if (Math.abs(deg - snappedDeg) < 3.5) {
          angle = (snappedDeg * Math.PI) / 180;
        }

        bestSnap = {
          x: pt.x + r * Math.cos(angle),
          y: pt.y + r * Math.sin(angle),
          snapped: true,
          type: "circle",
          targetPoint: pt,
          targetRadius: r,
        };
      }
    }

    // 3. Crosshair axis snap (within outer circle range)
    const maxR = Math.max(...pt.radii, 30) * 1.5;
    if (Math.abs(x - pt.x) <= maxR && Math.abs(y - pt.y) <= maxR) {
      const dX = Math.abs(x - pt.x);
      if (dX < bestDist) {
        bestDist = dX;
        bestSnap = {
          x: pt.x,
          y,
          snapped: true,
          type: "axis",
          targetPoint: pt,
        };
      }
      const dY = Math.abs(y - pt.y);
      if (dY < bestDist) {
        bestDist = dY;
        bestSnap = {
          x,
          y: pt.y,
          snapped: true,
          type: "axis",
          targetPoint: pt,
        };
      }
    }
  }

  return bestSnap;
}

/**
 * Clean isolated dangling pixel specks and floating fragments from the mask.
 * Uses connected component analysis to preserve the main body and purge debris.
 */
export function cleanDanglingPixels(
  mask: Uint8Array,
  width: number,
  height: number,
  anchorX?: number,
  anchorY?: number,
  minSizeThreshold: number = 45,
): { cleanedMask: Uint8Array; removedPixels: number } {
  const len = width * height;
  const result = new Uint8Array(mask);
  const visited = new Uint8Array(len);

  const components: Array<{ pixels: number[]; touchesAnchor: boolean; size: number }> = [];

  const anchorIdx =
    anchorX !== undefined && anchorY !== undefined && anchorX >= 0 && anchorX < width && anchorY >= 0 && anchorY < height
      ? Math.floor(anchorY) * width + Math.floor(anchorX)
      : -1;

  for (let i = 0; i < len; i++) {
    if (result[i] === 0 || visited[i]) continue;

    // BFS 8-way connected component
    const queue: number[] = [i];
    visited[i] = 1;
    const pixels: number[] = [];
    let touchesAnchor = false;

    let head = 0;
    while (head < queue.length) {
      const curr = queue[head++];
      pixels.push(curr);
      const cx = curr % width;
      const cy = Math.floor(curr / width);

      if (anchorIdx >= 0) {
        const ax = anchorIdx % width;
        const ay = Math.floor(anchorIdx / width);
        if (Math.hypot(cx - ax, cy - ay) <= 15) {
          touchesAnchor = true;
        }
      }

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          const nIdx = ny * width + nx;
          if (result[nIdx] > 0 && !visited[nIdx]) {
            visited[nIdx] = 1;
            queue.push(nIdx);
          }
        }
      }
    }

    components.push({ pixels, touchesAnchor, size: pixels.length });
  }

  if (components.length <= 1) {
    return { cleanedMask: result, removedPixels: 0 };
  }

  // Find the primary component (either the one touching the anchor, or the largest)
  let mainComponent = components.find((c) => c.touchesAnchor);
  if (!mainComponent) {
    mainComponent = components.reduce((max, c) => (c.size > max.size ? c : max), components[0]);
  }

  let removedPixels = 0;
  for (const comp of components) {
    if (comp === mainComponent) continue;
    // Only prune tiny floating dust specks (< 12px) that are not part of any garment or extremity
    if (comp.size < Math.min(12, minSizeThreshold)) {
      for (const idx of comp.pixels) {
        result[idx] = 0;
        removedPixels++;
      }
    }
  }

  return { cleanedMask: result, removedPixels };
}

/**
 * Smart socket cap shaper: creates or trims a smooth circular hinge cap at the rotation point.
 */
export function applySocketCap(
  mask: Uint8Array,
  width: number,
  height: number,
  cx: number,
  cy: number,
  radius: number,
  mode: "add" | "trim_outside",
): Uint8Array {
  const result = new Uint8Array(mask);
  const rSquared = radius * radius;

  if (mode === "add") {
    const minX = Math.max(0, Math.floor(cx - radius));
    const maxX = Math.min(width - 1, Math.ceil(cx + radius));
    const minY = Math.max(0, Math.floor(cy - radius));
    const maxY = Math.min(height - 1, Math.ceil(cy + radius));

    for (let y = minY; y <= maxY; y++) {
      const rowOffset = y * width;
      for (let x = minX; x <= maxX; x++) {
        const dx = x - cx;
        const dy = y - cy;
        if (dx * dx + dy * dy <= rSquared) {
          result[rowOffset + x] = 255;
        }
      }
    }
  } else if (mode === "trim_outside") {
    // Trims any pixels in the immediate hinge neighborhood (within radius * 1.5) that fall outside the cap radius
    const searchR = radius * 1.4;
    const searchRSquared = searchR * searchR;
    const minX = Math.max(0, Math.floor(cx - searchR));
    const maxX = Math.min(width - 1, Math.ceil(cx + searchR));
    const minY = Math.max(0, Math.floor(cy - searchR));
    const maxY = Math.min(height - 1, Math.ceil(cy + searchR));

    for (let y = minY; y <= maxY; y++) {
      const rowOffset = y * width;
      for (let x = minX; x <= maxX; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const distSq = dx * dx + dy * dy;
        if (distSq <= searchRSquared && distSq > rSquared) {
          result[rowOffset + x] = 0;
        }
      }
    }
  }

  return result;
}

/**
 * Smooth cut mask edges to remove 1px spurs, hang whiskers, and fill 1px holes.
 */
export function smoothMaskEdges(mask: Uint8Array, width: number, height: number): Uint8Array {
  return ensureSmoothMask(mask, width, height);
}

/**
 * Comprehensive smoothing pass before brush save.
 * Purges all 1px hangs, spurs, whiskers, pinholes, and pixelation staircases,
 * ensuring the resulting mask path is organically smooth and free of any 1px artifacts.
 */
export function ensureSmoothMask(
  mask: Uint8Array,
  width: number,
  height: number,
  anchorX?: number,
  anchorY?: number,
): Uint8Array {
  // 1. Initial cleanup of small floating debris (< 25px) if an anchor is provided
  let working = new Uint8Array(mask);
  if (anchorX !== undefined && anchorY !== undefined) {
    const cleaned = cleanDanglingPixels(working, width, height, anchorX, anchorY, 25);
    working = cleaned.cleanedMask;
  }

  // 2. Multi-pass topological pruning of 1px hangs, dangling whiskers, and filling pinholes
  for (let pass = 0; pass < 3; pass++) {
    const next = new Uint8Array(working);
    for (let y = 1; y < height - 1; y++) {
      const row = y * width;
      for (let x = 1; x < width - 1; x++) {
        const idx = row + x;
        const val = working[idx];

        // 4 cardinal neighbors
        const nU = working[idx - width] > 0 ? 1 : 0;
        const nD = working[idx + width] > 0 ? 1 : 0;
        const nL = working[idx - 1] > 0 ? 1 : 0;
        const nR = working[idx + 1] > 0 ? 1 : 0;
        const nCard = nU + nD + nL + nR;

        // 4 diagonal neighbors
        const nUL = working[idx - width - 1] > 0 ? 1 : 0;
        const nUR = working[idx - width + 1] > 0 ? 1 : 0;
        const nDL = working[idx + width - 1] > 0 ? 1 : 0;
        const nDR = working[idx + width + 1] > 0 ? 1 : 0;
        const nTotal = nCard + nUL + nUR + nDL + nDR;

        if (val > 0) {
          // 1px hang / spur conditions:
          // a) 0 cardinal neighbors (completely detached or diagonal-only hang)
          // b) 1 cardinal neighbor and <= 2 total 8-neighbors (1px tip / whisker)
          // c) <= 2 total neighbors (thin filament tip)
          if (nCard === 0 || (nCard === 1 && nTotal <= 2) || nTotal <= 2) {
            next[idx] = 0;
          }
          // d) Sharp corner hang: 2 perpendicular cardinal neighbors but no corner diagonal neighbor
          else if (nCard === 2 && nTotal === 2) {
            next[idx] = 0;
          }
        } else {
          // Fill 1px pinholes & narrow indentations
          if (nCard >= 3 || nTotal >= 7) {
            next[idx] = 255;
          }
        }
      }
    }
    working = next;
  }

  // 3. Circular curvature relaxation filter (5x5 circular kernel)
  // Eliminates 1px staircase patterns along boundaries to produce genuinely smooth curved paths
  const smoothed = new Uint8Array(working);
  const rKernelSq = 2.2 * 2.2;

  for (let y = 2; y < height - 2; y++) {
    const row = y * width;
    for (let x = 2; x < width - 2; x++) {
      const idx = row + x;
      // Check if boundary pixel
      let fg3x3 = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (working[(y + dy) * width + (x + dx)] > 0) fg3x3++;
        }
      }
      // Pure interior or exterior: skip
      if (fg3x3 === 0 || fg3x3 === 9) {
        smoothed[idx] = working[idx];
        continue;
      }

      // Compute circular distance-weighted density
      let weightSum = 0;
      let valSum = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const dSq = dx * dx + dy * dy;
          if (dSq > rKernelSq) continue;
          const w = 1 - dSq / (rKernelSq + 0.6);
          weightSum += w;
          if (working[(y + dy) * width + (x + dx)] > 0) {
            valSum += w;
          }
        }
      }
      const density = valSum / Math.max(0.001, weightSum);
      smoothed[idx] = density >= 0.48 ? 255 : 0;
    }
  }

  // 4. Final sweep to catch any secondary 1px whiskers produced by curvature relaxation
  const finalResult = new Uint8Array(smoothed);
  for (let y = 1; y < height - 1; y++) {
    const row = y * width;
    for (let x = 1; x < width - 1; x++) {
      const idx = row + x;
      if (smoothed[idx] > 0) {
        let n8 = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            if (smoothed[(y + dy) * width + (x + dx)] > 0) n8++;
          }
        }
        if (n8 <= 2) {
          finalResult[idx] = 0;
        }
      }
    }
  }

  return finalResult;
}

