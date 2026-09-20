import React, { useRef, useEffect, useState, useCallback } from "react";
import { useStudio } from "@/lib/puppet/store";
import { applyMaskEdits, MaskEdit, MaskEditMode } from "@/lib/puppet/mask-utils";
import { loadHtmlImage } from "@/lib/puppet/image";
import {
  Paintbrush,
  Eraser,
  Undo2,
  Redo2,
  RotateCcw,
  Check,
  X,
  Sparkles,
} from "lucide-react";

export function BrushEditor() {
  const { brush, attachments, source, saveAttachmentCut, setBrush } = useStudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const attachment = attachments.find((a) => a.id === brush.attachmentId);

  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<MaskEditMode>("add");
  const [radius, setRadius] = useState<number>(brush.radius || 20);
  const [history, setHistory] = useState<Uint8Array[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushCursor, setBrushCursor] = useState<{
    x: number;
    y: number;
    radius: number;
    mode: MaskEditMode;
  } | null>(null);

  const baseImgRef = useRef<HTMLImageElement | null>(null);
  const activeMaskRef = useRef<Uint8Array | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Redraw canvas with base image + mask overlay
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const baseImg = baseImgRef.current;
    const mask = activeMaskRef.current;
    if (!canvas || !baseImg || !mask || !attachment) return;

    const { width: w, height: h } = attachment;
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Draw crisp dark checkerboard pattern background
    const tileSize = 12;
    for (let y = 0; y < h; y += tileSize) {
      for (let x = 0; x < w; x += tileSize) {
        ctx.fillStyle =
          (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0
            ? "#151515"
            : "#222222";
        ctx.fillRect(x, y, tileSize, tileSize);
      }
    }

    // 2. Offscreen composite of base image with mask tinting
    const offscreen = document.createElement("canvas");
    offscreen.width = w;
    offscreen.height = h;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    offCtx.drawImage(baseImg, 0, 0, w, h);
    const imgData = offCtx.getImageData(0, 0, w, h);
    const d = imgData.data;

    // Mask visualization:
    // mask[i] > 0: KEPT (this is the cut part). Full vivid original color!
    // mask[i] === 0: CUT OUT. Soft dimmed translucent red wash so the user sees
    // where the rest of the figure is, making it easy to brush pixels back!
    for (let i = 0; i < mask.length; i++) {
      const m = mask[i];
      const idx = i * 4;
      const origA = d[idx + 3];
      if (origA === 0) continue;

      if (m === 0) {
        // Ghosted red wash for cut-away pixels
        d[idx] = Math.min(255, Math.floor(d[idx] * 0.4 + 160));
        d[idx + 1] = Math.floor(d[idx + 1] * 0.25);
        d[idx + 2] = Math.floor(d[idx + 2] * 0.25);
        d[idx + 3] = Math.floor(origA * 0.35);
      }
      // If m > 0, leave full original color and opacity intact
    }
    offCtx.putImageData(imgData, 0, 0);

    // 3. Draw composited figure onto main canvas
    ctx.drawImage(offscreen, 0, 0);

    // 4. Draw brush cursor ring if pointer is over canvas
    if (brushCursor) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(brushCursor.x, brushCursor.y, brushCursor.radius, 0, Math.PI * 2);
      ctx.strokeStyle = brushCursor.mode === "add" ? "#63f6ff" : "#ff5f9e";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = brushCursor.mode === "add" ? "#63f6ff" : "#ff5f9e";
      ctx.beginPath();
      ctx.arc(brushCursor.x, brushCursor.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, [attachment, brushCursor]);

  // Load base image and initial mask when modal opens
  useEffect(() => {
    if (!brush.enabled || !attachment) {
      baseImgRef.current = null;
      activeMaskRef.current = null;
      setHistory([]);
      setHistoryIndex(-1);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);

    async function initialize() {
      if (!attachment) return;
      const { width: w, height: h } = attachment;

      try {
        // Step 1: Resolve the base image (raw unmasked figure crop)
        let baseImg: HTMLImageElement;
        if (attachment.baseDataUrl) {
          baseImg = await loadHtmlImage(attachment.baseDataUrl);
        } else if (source?.dataUrl) {
          // Crop base figure directly from full source image
          const srcImg = await loadHtmlImage(source.dataUrl);
          const c = document.createElement("canvas");
          c.width = w;
          c.height = h;
          const cCtx = c.getContext("2d");
          if (cCtx) {
            cCtx.drawImage(
              srcImg,
              attachment.cropX,
              attachment.cropY,
              w,
              h,
              0,
              0,
              w,
              h,
            );
            baseImg = await loadHtmlImage(c.toDataURL("image/png"));
          } else {
            baseImg = await loadHtmlImage(attachment.dataUrl);
          }
        } else {
          baseImg = await loadHtmlImage(attachment.dataUrl);
        }

        if (isCancelled) return;
        baseImgRef.current = baseImg;

        // Step 2: Resolve the mask array
        let initialMask: Uint8Array;
        if (
          attachment.mask.pixelMask &&
          attachment.mask.pixelMask.length === w * h
        ) {
          initialMask = new Uint8Array(attachment.mask.pixelMask);
        } else if (attachment.mask.alphaPngDataUrl) {
          const alphaImg = await loadHtmlImage(attachment.mask.alphaPngDataUrl);
          const c = document.createElement("canvas");
          c.width = w;
          c.height = h;
          const cCtx = c.getContext("2d");
          if (cCtx) {
            cCtx.drawImage(alphaImg, 0, 0);
            const imgData = cCtx.getImageData(0, 0, w, h);
            initialMask = new Uint8Array(w * h);
            for (let i = 0; i < initialMask.length; i++) {
              initialMask[i] = imgData.data[i * 4 + 3];
            }
          } else {
            initialMask = new Uint8Array(w * h).fill(255);
          }
        } else {
          initialMask = new Uint8Array(w * h).fill(255);
        }

        if (isCancelled) return;
        activeMaskRef.current = initialMask;
        setHistory([initialMask]);
        setHistoryIndex(0);
        setIsLoading(false);
      } catch (err) {
        console.error("BrushEditor: Failed to load part images", err);
        if (!isCancelled) setIsLoading(false);
      }
    }

    void initialize();

    return () => {
      isCancelled = true;
    };
  }, [brush.enabled, brush.attachmentId, attachment, source?.dataUrl]);

  // Redraw when ready or cursor moves
  useEffect(() => {
    if (!isLoading && activeMaskRef.current && baseImgRef.current) {
      renderCanvas();
    }
  }, [isLoading, renderCanvas]);

  // Get canvas-local coordinates scaled to actual mask pixels
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !attachment) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = attachment.width / rect.width;
    const scaleY = attachment.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  // Brush stroke processing
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    if (!coords || !attachment || !activeMaskRef.current) return;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDrawing(true);
    lastPosRef.current = coords;

    // Apply first dot
    const edits: MaskEdit[] = [{ x: coords.x, y: coords.y, radius, mode }];
    const nextMask = applyMaskEdits(
      activeMaskRef.current,
      attachment.width,
      attachment.height,
      edits,
    );
    activeMaskRef.current = nextMask;
    setBrushCursor({ x: coords.x, y: coords.y, radius, mode });
    renderCanvas();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    if (!coords || !attachment) return;

    setBrushCursor({ x: coords.x, y: coords.y, radius, mode });

    if (!isDrawing || !activeMaskRef.current) {
      renderCanvas();
      return;
    }

    const last = lastPosRef.current ?? coords;
    const dist = Math.hypot(coords.x - last.x, coords.y - last.y);
    const stepSize = Math.max(1, radius * 0.3);
    const steps = Math.ceil(dist / stepSize);

    const edits: MaskEdit[] = [];
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      edits.push({
        x: last.x + (coords.x - last.x) * t,
        y: last.y + (coords.y - last.y) * t,
        radius,
        mode,
      });
    }

    if (edits.length > 0) {
      const nextMask = applyMaskEdits(
        activeMaskRef.current,
        attachment.width,
        attachment.height,
        edits,
      );
      activeMaskRef.current = nextMask;
      lastPosRef.current = coords;
      renderCanvas();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPosRef.current = null;

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    // Save stroke to history
    if (activeMaskRef.current) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(new Uint8Array(activeMaskRef.current));
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handlePointerLeave = () => {
    setBrushCursor(null);
    if (!isDrawing) {
      renderCanvas();
    }
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const nextIdx = historyIndex - 1;
    const prevMask = new Uint8Array(history[nextIdx]);
    activeMaskRef.current = prevMask;
    setHistoryIndex(nextIdx);
    renderCanvas();
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    const nextIdx = historyIndex + 1;
    const nextMask = new Uint8Array(history[nextIdx]);
    activeMaskRef.current = nextMask;
    setHistoryIndex(nextIdx);
    renderCanvas();
  };

  const handleReset = () => {
    if (history.length === 0) return;
    const initial = new Uint8Array(history[0]);
    activeMaskRef.current = initial;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(initial);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    renderCanvas();
  };

  // Close without saving
  const handleClose = () => {
    setBrush({ enabled: false, attachmentId: null });
  };

  // APPLY & SAVE CUT
  const handleSave = () => {
    if (!attachment || !baseImgRef.current || !activeMaskRef.current) return;
    const baseImg = baseImgRef.current;
    const currentMask = activeMaskRef.current;
    const { width: w, height: h } = attachment;

    // 1. Generate cut image dataUrl (RGBA with alpha mask)
    const cutCanvas = document.createElement("canvas");
    cutCanvas.width = w;
    cutCanvas.height = h;
    const cutCtx = cutCanvas.getContext("2d");
    if (!cutCtx) return;

    cutCtx.drawImage(baseImg, 0, 0, w, h);
    const imgData = cutCtx.getImageData(0, 0, w, h);
    const d = imgData.data;
    let pixelCount = 0;

    for (let i = 0; i < currentMask.length; i++) {
      const m = currentMask[i];
      const idx = i * 4;
      if (m === 0) {
        d[idx + 3] = 0; // Cut out! Transparent!
      } else {
        d[idx + 3] = Math.min(d[idx + 3] || 255, m);
        if (d[idx + 3] > 8) pixelCount++;
      }
    }
    cutCtx.putImageData(imgData, 0, 0);
    const cutDataUrl = cutCanvas.toDataURL("image/png");

    // 2. Generate alphaPngDataUrl
    const alphaCanvas = document.createElement("canvas");
    alphaCanvas.width = w;
    alphaCanvas.height = h;
    const alphaCtx = alphaCanvas.getContext("2d");
    if (!alphaCtx) return;

    const alphaImg = alphaCtx.createImageData(w, h);
    for (let i = 0; i < currentMask.length; i++) {
      const idx = i * 4;
      alphaImg.data[idx] = 255;
      alphaImg.data[idx + 1] = 255;
      alphaImg.data[idx + 2] = 255;
      alphaImg.data[idx + 3] = currentMask[i] ? 255 : 0;
    }
    alphaCtx.putImageData(alphaImg, 0, 0);
    const alphaPngDataUrl = alphaCanvas.toDataURL("image/png");

    // 3. Save directly to store
    saveAttachmentCut(
      attachment.id,
      currentMask,
      cutDataUrl,
      alphaPngDataUrl,
      pixelCount,
    );

    // 4. Close brush editor
    setBrush({ enabled: false, attachmentId: null });
  };

  if (!brush.enabled || !attachment) return null;

  // Compute suitable display size for canvas
  const aspect = attachment.width / Math.max(1, attachment.height);
  let displayWidth = Math.max(260, Math.min(480, attachment.width * 2));
  let displayHeight = Math.round(displayWidth / aspect);
  if (displayHeight > 420) {
    displayHeight = 420;
    displayWidth = Math.round(displayHeight * aspect);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#0c0c0c] border border-[#2a2a2a] rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[92vh] overflow-hidden text-[#f5f5f5]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#222] flex items-center justify-between bg-[#111]">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-medium tracking-tight text-white">
              Edit Mask: {attachment.label}
            </span>
            <span className="text-xs font-mono text-[#a3a3a3] bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#333]">
              {attachment.width}×{attachment.height}px
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-[#a3a3a3] hover:text-white p-1 rounded-md hover:bg-[#222] transition-colors"
            title="Cancel & Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-5 py-3 border-b border-[#222] flex flex-wrap items-center justify-between gap-3 bg-[#141414]">
          {/* Tool Modes */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("add")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                mode === "add"
                  ? "bg-[#63f6ff] border-[#63f6ff] text-[#031012] shadow-md shadow-[#63f6ff]/20"
                  : "bg-[#1f1f1f] border-[#333] text-[#a3a3a3] hover:text-white"
              }`}
              title="Paint to add figure pixels back"
            >
              <Paintbrush className="size-3.5" />
              Brush (Add)
            </button>
            <button
              onClick={() => setMode("erase")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                mode === "erase"
                  ? "bg-[#ff5f9e] border-[#ff5f9e] text-white shadow-md shadow-[#ff5f9e]/20"
                  : "bg-[#1f1f1f] border-[#333] text-[#a3a3a3] hover:text-white"
              }`}
              title="Erase to cut out unwanted pixels"
            >
              <Eraser className="size-3.5" />
              Eraser (Cut)
            </button>
          </div>

          {/* Brush Size Slider */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-[#a3a3a3] font-medium whitespace-nowrap">
              Size: {radius}px
            </span>
            <input
              type="range"
              min={3}
              max={64}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-24 sm:w-32 accent-[#63f6ff] cursor-pointer"
            />
          </div>

          {/* History Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded-md border border-[#333] bg-[#1a1a1a] text-[#f5f5f5] hover:bg-[#282828] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="size-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 rounded-md border border-[#333] bg-[#1a1a1a] text-[#f5f5f5] hover:bg-[#282828] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="size-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-md border border-[#333] bg-[#1a1a1a] text-[#f5f5f5] hover:bg-[#282828] transition-colors ml-1"
              title="Reset to Original Cut"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 min-h-[300px] flex items-center justify-center p-6 bg-[#080808] overflow-auto select-none relative">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3 text-muted">
              <div className="size-8 border-2 border-[#63f6ff] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs">Loading figure part...</span>
            </div>
          ) : (
            <div className="relative border border-[#333] rounded-lg overflow-hidden shadow-2xl bg-[#141414]">
              <canvas
                ref={canvasRef}
                style={{
                  width: `${displayWidth}px`,
                  height: `${displayHeight}px`,
                  cursor: "crosshair",
                  imageRendering: "pixelated",
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[#222] flex flex-wrap items-center justify-between gap-3 bg-[#111]">
          <div className="flex items-center gap-2 text-xs text-[#a3a3a3]">
            <Sparkles className="size-3.5 text-[#63f6ff]" />
            <span>
              <strong className="text-white font-medium">Brush (cyan)</strong>{" "}
              restores silhouette •{" "}
              <strong className="text-[#ff5f9e] font-medium">
                Eraser (pink)
              </strong>{" "}
              cuts away
            </span>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-[#333] bg-[#181818] text-[#a3a3a3] hover:text-white hover:bg-[#222] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-lg text-sm font-bold bg-[#63f6ff] hover:bg-[#51e7ef] text-[#031012] shadow-lg shadow-[#63f6ff]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Check className="size-4 stroke-[2.5]" />
              Apply &amp; Save Cut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
