export type MaskEditMode = "add" | "erase";

export type MaskEdit = {
  x: number;
  y: number;
  radius: number;
  mode: MaskEditMode;
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
      for (let x = minX; x <= maxX; x++) {
        const dx = x - edit.x;
        const dy = y - edit.y;
        if (dx * dx + dy * dy > radiusSquared) continue;
        result[y * width + x] = edit.mode === "add" ? 255 : 0;
      }
    }
  }
  return result;
}
