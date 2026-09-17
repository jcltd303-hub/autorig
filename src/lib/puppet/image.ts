import type { BackgroundKey } from "./types";

export function loadHtmlImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read that image"));
    img.src = src;
  });
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the file"));
    reader.readAsDataURL(file);
  });
}

export async function prepareSource(src: string, maxSide = 1024): Promise<{ dataUrl: string; width: number; height: number }> {
  const img = await loadHtmlImage(src);
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");
  ctx.drawImage(img, 0, 0, width, height);
  return { dataUrl: canvas.toDataURL("image/png"), width, height };
}

export async function jpegForVision(src: string, maxSide = 768): Promise<string> {
  const img = await loadHtmlImage(src);
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.72);
}

export function readImageData(img: HTMLImageElement): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is unavailable");
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height);
}

function colorDist(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function detectBackground(image: ImageData): BackgroundKey {
  const { width, height, data } = image;
  const pts: Array<[number, number]> = [
    [2, 2], [width - 3, 2], [2, height - 3], [width - 3, height - 3],
    [Math.floor(width / 2), 2], [Math.floor(width / 2), height - 3],
    [2, Math.floor(height / 2)], [width - 3, Math.floor(height / 2)],
    [Math.floor(width * 0.25), 2], [Math.floor(width * 0.75), 2],
  ];
  const samples: number[][] = [];
  let hasTransparentSample = false;
  for (const [x, y] of pts) {
    const i = (y * width + x) * 4;
    const alpha = data[i + 3] ?? 0;
    hasTransparentSample ||= alpha < 12;
    samples.push([data[i] ?? 0, data[i + 1] ?? 0, data[i + 2] ?? 0]);
  }
  if (hasTransparentSample) return { r: 0, g: 0, b: 0, threshold: 0, lift: false };
  const med = [0, 1, 2].map((c) => {
    const v = samples.map((s) => s[c] ?? 0).sort((a, b) => a - b);
    return v[Math.floor(v.length / 2)] ?? 0;
  });
  let maxDist = 0;
  for (const s of samples) maxDist = Math.max(maxDist, colorDist(s[0] ?? 0, s[1] ?? 0, s[2] ?? 0, med[0], med[1], med[2]));
  const threshold = Math.max(30, maxDist + 20);
  const maskCount = countFigurePixels(image, { r: med[0], g: med[1], b: med[2], threshold, lift: true });
  const ratio = maskCount / (width * height);
  return { r: med[0], g: med[1], b: med[2], threshold, lift: ratio > 0.04 && ratio < 0.88 };
}

export function isBackground(image: ImageData, x: number, y: number, bg: BackgroundKey) {
  if (!bg.lift) return false;
  if (x < 0 || y < 0 || x >= image.width || y >= image.height) return true;
  const i = (y * image.width + x) * 4;
  const a = image.data[i + 3] ?? 0;
  if (a < 12) return true;
  return colorDist(image.data[i] ?? 0, image.data[i + 1] ?? 0, image.data[i + 2] ?? 0, bg.r, bg.g, bg.b) < bg.threshold;
}

/**
 * Build a silhouette without globally deleting pixels merely because their
 * RGB value resembles the background. Background removal is edge-connected:
 * only background-colored pixels reachable from the canvas border are lifted.
 * This keeps dark eyes, outlines, shadows and other artwork intact even when
 * they are the same color as the studio background.
 */
export function buildFigureMask(image: ImageData, bg: BackgroundKey): Uint8Array {
  const { width, height, data } = image;
  const mask = new Uint8Array(width * height);
  const background = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  const canBeBackground = (index: number) => {
    const a = data[index * 4 + 3] ?? 0;
    if (a < 12) return true;
    if (!bg.lift) return false;
    return colorDist(
      data[index * 4] ?? 0,
      data[index * 4 + 1] ?? 0,
      data[index * 4 + 2] ?? 0,
      bg.r,
      bg.g,
      bg.b,
    ) < bg.threshold;
  };

  const seed = (index: number) => {
    if (background[index] || !canBeBackground(index)) return;
    background[index] = 1;
    queue[tail++] = index;
  };

  for (let x = 0; x < width; x++) {
    seed(x);
    seed((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y++) {
    seed(y * width);
    seed(y * width + width - 1);
  }

  while (head < tail) {
    const index = queue[head++]!;
    const x = index % width;
    const y = Math.floor(index / width);
    const neighbors = [index - 1, index + 1, index - width, index + width];
    for (const next of neighbors) {
      if (next < 0 || next >= width * height) continue;
      if (next === index - 1 && x === 0) continue;
      if (next === index + 1 && x === width - 1) continue;
      if (next === index - width && y === 0) continue;
      if (next === index + width && y === height - 1) continue;
      if (!background[next]) seed(next);
    }
  }

  for (let i = 0; i < width * height; i++) {
    const alpha = data[i * 4 + 3] ?? 0;
    if (alpha >= 12 && !background[i]) mask[i] = 1;
  }
  return mask;
}

function countFigurePixels(image: ImageData, bg: BackgroundKey) {
  let n = 0;
  const { data, width, height } = image;
  for (let i = 0; i < width * height; i++) {
    const a = data[i * 4 + 3] ?? 0;
    if (a < 12) continue;
    if (bg.lift && colorDist(data[i * 4] ?? 0, data[i * 4 + 1] ?? 0, data[i * 4 + 2] ?? 0, bg.r, bg.g, bg.b) < bg.threshold) continue;
    n++;
  }
  return n;
}

export function figureBBox(mask: Uint8Array, width: number, height: number) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!mask[y * width + x]) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < minX) return { x: 0, y: 0, w: width, h: height };
  const pad = 4;
  const x = Math.max(0, minX - pad);
  const y = Math.max(0, minY - pad);
  const w = Math.min(width - x, maxX - minX + pad * 2);
  const h = Math.min(height - y, maxY - minY + pad * 2);
  return { x, y, w, h };
}

export function contain(imgW: number, imgH: number, boxW: number, boxH: number) {
  const s = Math.min(boxW / imgW, boxH / imgH);
  const w = imgW * s;
  const h = imgH * s;
  return { x: (boxW - w) / 2, y: (boxH - h) / 2, w, h, s };
}
