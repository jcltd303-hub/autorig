import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useStudio } from "@/lib/puppet/store";
import {
  applyMaskEdits,
  MaskEdit,
  MaskEditMode,
  CrosshairPoint,
  snapToCrosshairsAndCircles,
  cleanDanglingPixels,
  applySocketCap,
  ensureSmoothMask,
  SnapResult,
} from "@/lib/puppet/mask-utils";
import { loadHtmlImage } from "@/lib/puppet/image";
import { getCurvedRadiusAtAngle } from "@/lib/puppet/cut-parts";
import { clearImageCache } from "@/components/studio/stage-canvas";
import { toast } from "sonner";
import {
  Paintbrush,
  Eraser,
  Undo2,
  Redo2,
  RotateCcw,
  Check,
  X,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Magnet,
  Maximize2,
  ShieldAlert,
  Wand2,
} from "lucide-react";

export function BrushEditor() {
  const { brush, attachments, source, joints, saveAttachmentCut, setBrush } = useStudio();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const attachment = attachments.find((a) => a.id === brush.attachmentId);

  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<MaskEditMode>("add");
  const [radius, setRadius] = useState<number>(brush.radius || 18);
  const [zoom, setZoom] = useState<number>(2.5);
  const [snapEnabled, setSnapEnabled] = useState<boolean>(true);
  const [showCrosshairs, setShowCrosshairs] = useState<boolean>(true);
  const [history, setHistory] = useState<Uint8Array[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [snapStatus, setSnapStatus] = useState<SnapResult | null>(null);

  const [brushCursor, setBrushCursor] = useState<{
    x: number;
    y: number;
    radius: number;
    mode: MaskEditMode;
  } | null>(null);

  const baseImgRef = useRef<HTMLImageElement | null>(null);
  const activeMaskRef = useRef<Uint8Array | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Compute rotation points (parent pivot + child joint pivots) for this attachment
  const crosshairPoints: CrosshairPoint[] = useMemo(() => {
    if (!attachment) return [];
    const points: CrosshairPoint[] = [];

    // 1. Primary rotation point (parent pivot hinge)
    const p1Thickness = Math.max(8, attachment.thickness || 20);
    const parentJoint = joints.find((j) => j.id === attachment.boneId);
    points.push({
      x: attachment.localPivotX,
      y: attachment.localPivotY,
      radii: [
        Math.round(p1Thickness * 0.5),
        Math.round(p1Thickness),
        Math.round(p1Thickness * 1.5),
      ],
      label: "Hinge Pivot",
      isParent: true,
      joint: parentJoint,
    });

    // 2. Child rotation points (distal hinges, e.g. elbow, knee, wrist)
    const childJoints = joints.filter((j) => j.parentId === attachment.boneId);
    for (const cj of childJoints) {
      const childLocalX = cj.x - attachment.cropX;
      const childLocalY = cj.y - attachment.cropY;
      const cThickness = Math.max(8, cj.thickness || 16);
      points.push({
        x: childLocalX,
        y: childLocalY,
        radii: [
          Math.round(cThickness * 0.5),
          Math.round(cThickness),
          Math.round(cThickness * 1.5),
        ],
        label: cj.label || "Distal Hinge",
        isParent: false,
        joint: cj,
      });
    }

    return points;
  }, [attachment, joints]);

  // Compute optimal scale between crosshairs
  const computeCrosshairFitScale = useCallback(() => {
    if (!attachment || !containerRef.current) return 3.0;
    const rect = containerRef.current.getBoundingClientRect();
    const viewW = Math.max(300, rect.width - 64);
    const viewH = Math.max(300, rect.height - 64);

    if (crosshairPoints.length >= 2) {
      // Scale between both crosshairs
      const p1 = crosshairPoints[0];
      const p2 = crosshairPoints[1];
      const maxR = Math.max(p1.radii[2] || 25, p2.radii[2] || 25);
      const minX = Math.min(p1.x, p2.x) - maxR * 1.4;
      const maxX = Math.max(p1.x, p2.x) + maxR * 1.4;
      const minY = Math.min(p1.y, p2.y) - maxR * 1.4;
      const maxY = Math.max(p1.y, p2.y) + maxR * 1.4;
      const spanW = Math.max(40, maxX - minX);
      const spanH = Math.max(40, maxY - minY);

      const targetScale = Math.min(viewW / spanW, viewH / spanH);
      return Math.min(7.0, Math.max(1.8, Number(targetScale.toFixed(2))));
    } else if (crosshairPoints.length === 1) {
      // Scale appropriately for single crosshair & part
      const p1 = crosshairPoints[0];
      const radiusMargin = Math.max(p1.radii[2] * 2.2, attachment.width * 0.5, attachment.height * 0.5);
      const span = radiusMargin * 2;
      const targetScale = Math.min(viewW / span, viewH / span);
      return Math.min(7.0, Math.max(2.2, Number(targetScale.toFixed(2))));
    } else {
      const targetScale = Math.min(viewW / attachment.width, viewH / attachment.height);
      return Math.min(6.0, Math.max(1.5, Number(targetScale.toFixed(2))));
    }
  }, [attachment, crosshairPoints]);

  // Redraw the base mask canvas (pixel-level mask)
  const renderMaskCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const baseImg = baseImgRef.current;
    const mask = activeMaskRef.current;
    if (!canvas || !baseImg || !mask || !attachment) return;

    const { width: w, height: h } = attachment;
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Draw crisp dark checkerboard pattern
    const tileSize = 10;
    for (let y = 0; y < h; y += tileSize) {
      for (let x = 0; x < w; x += tileSize) {
        ctx.fillStyle =
          (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0
            ? "#141414"
            : "#202020";
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
    // mask[i] > 0: KEPT (vivid original color)
    // mask[i] === 0: CUT OUT (ghosted translucent red wash)
    for (let i = 0; i < mask.length; i++) {
      const m = mask[i];
      const idx = i * 4;
      const origA = d[idx + 3];
      if (origA === 0) continue;

      if (m === 0) {
        d[idx] = Math.min(255, Math.floor(d[idx] * 0.4 + 175));
        d[idx + 1] = Math.floor(d[idx + 1] * 0.22);
        d[idx + 2] = Math.floor(d[idx + 2] * 0.22);
        d[idx + 3] = Math.floor(origA * 0.38);
      }
    }
    offCtx.putImageData(imgData, 0, 0);

    // 3. Draw onto main mask canvas
    ctx.drawImage(offscreen, 0, 0);
  }, [attachment]);

  // Redraw the crisp high-resolution overlay canvas (1px crosshairs, concentric circles, snap markers)
  const renderOverlayCanvas = useCallback(() => {
    const overlay = overlayCanvasRef.current;
    if (!overlay || !attachment) return;

    const displayW = Math.round(attachment.width * zoom);
    const displayH = Math.round(attachment.height * zoom);

    if (overlay.width !== displayW || overlay.height !== displayH) {
      overlay.width = displayW;
      overlay.height = displayH;
    }

    const ctx = overlay.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, displayW, displayH);

    // 1. Draw 1px crosshairs & concentric circles at rotation points
    if (showCrosshairs) {
      for (const pt of crosshairPoints) {
        const sx = pt.x * zoom;
        const sy = pt.y * zoom;
        const r1 = pt.radii[0] * zoom;
        const r2 = pt.radii[1] * zoom;
        const r3 = pt.radii[2] * zoom;
        const crossExtent = r3 + 14;

        ctx.save();
        ctx.lineWidth = 1;

        // Outer concentric circle (overlap zone: 1.5x) - curved if radialOffsets are defined
        ctx.beginPath();
        if (pt.joint && pt.joint.radialOffsets && pt.joint.radialOffsets.length === 8) {
          const points: { x: number; y: number }[] = [];
          for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const r = pt.radii[1] * 1.5 * zoom * (pt.joint.radialOffsets[i] ?? 1.0);
            points.push({
              x: sx + r * Math.cos(angle),
              y: sy + r * Math.sin(angle),
            });
          }
          const lastPt = points[7];
          const firstPt = points[0];
          ctx.moveTo((lastPt.x + firstPt.x) / 2, (lastPt.y + firstPt.y) / 2);
          for (let i = 0; i < 8; i++) {
            const p = points[i];
            const next = points[(i + 1) % 8];
            ctx.quadraticCurveTo(p.x, p.y, (p.x + next.x) / 2, (p.y + next.y) / 2);
          }
          ctx.closePath();
        } else {
          ctx.arc(sx, sy, r3, 0, Math.PI * 2);
        }

        // Translucent background fill
        ctx.fillStyle = pt.isParent ? "rgba(99, 246, 255, 0.05)" : "rgba(255, 209, 102, 0.03)";
        ctx.fill();

        ctx.strokeStyle = "rgba(99, 246, 255, 0.35)";
        ctx.setLineDash([3, 3]);
        ctx.stroke();

        // Middle concentric circle (hinge socket line: 1.0x thickness)
        ctx.beginPath();
        ctx.arc(sx, sy, r2, 0, Math.PI * 2);
        ctx.strokeStyle = pt.isParent ? "#63f6ff" : "#ffd166";
        ctx.setLineDash([]);
        ctx.stroke();

        // Inner core circle (0.5x)
        ctx.beginPath();
        ctx.arc(sx, sy, r1, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.stroke();

        // 8 points and guide lines
        if (pt.joint) {
          const offsets = pt.joint.radialOffsets || [1, 1, 1, 1, 1, 1, 1, 1];
          for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const r = pt.radii[1] * 1.5 * zoom * (offsets[i] ?? 1.0);
            const hx = sx + r * Math.cos(angle);
            const hy = sy + r * Math.sin(angle);

            // Radial guide line
            ctx.beginPath();
            ctx.moveTo(sx + r1 * Math.cos(angle), sy + r1 * Math.sin(angle));
            ctx.lineTo(hx, hy);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
            ctx.setLineDash([2, 2]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Dot handle
            ctx.beginPath();
            ctx.arc(hx, hy, 3.0, 0, Math.PI * 2);
            ctx.fillStyle = "#ff5f9e";
            ctx.fill();
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Crisp 1px horizontal and vertical crosshairs
        ctx.beginPath();
        ctx.moveTo(Math.round(sx - crossExtent) + 0.5, Math.round(sy) + 0.5);
        ctx.lineTo(Math.round(sx + crossExtent) + 0.5, Math.round(sy) + 0.5);
        ctx.moveTo(Math.round(sx) + 0.5, Math.round(sy - crossExtent) + 0.5);
        ctx.lineTo(Math.round(sx) + 0.5, Math.round(sy + crossExtent) + 0.5);
        ctx.strokeStyle = pt.isParent ? "rgba(99, 246, 255, 0.85)" : "rgba(255, 209, 102, 0.85)";
        ctx.stroke();

        // Center reticle point
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = pt.isParent ? "#63f6ff" : "#ffd166";
        ctx.fill();
        ctx.strokeStyle = "#000000";
        ctx.stroke();

        // Label with radius info
        ctx.font = "600 11px Outfit, sans-serif";
        ctx.fillStyle = pt.isParent ? "#63f6ff" : "#ffd166";
        ctx.strokeStyle = "rgba(0,0,0,0.8)";
        ctx.lineWidth = 3;
        const text = `${pt.label} (R:${pt.radii[1]}px)`;
        ctx.strokeText(text, sx + crossExtent + 4, sy + 3);
        ctx.fillText(text, sx + crossExtent + 4, sy + 3);

        ctx.restore();
      }
    }

    // 2. Active Snap Visual Feedback (highlights snapped circle or axis in vibrant glow)
    if (snapStatus?.snapped && snapStatus.targetPoint) {
      const pt = snapStatus.targetPoint;
      const sx = pt.x * zoom;
      const sy = pt.y * zoom;

      ctx.save();
      if (snapStatus.type === "circle" && snapStatus.targetRadius) {
        const sr = snapStatus.targetRadius * zoom;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.strokeStyle = "#ffe600";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#ffe600";
        ctx.shadowBlur = 8;
        ctx.stroke();
      } else if (snapStatus.type === "axis") {
        ctx.beginPath();
        if (Math.abs(snapStatus.x - pt.x) < 0.01) {
          ctx.moveTo(Math.round(sx) + 0.5, 0);
          ctx.lineTo(Math.round(sx) + 0.5, displayH);
        } else {
          ctx.moveTo(0, Math.round(sy) + 0.5);
          ctx.lineTo(displayW, Math.round(sy) + 0.5);
        }
        ctx.strokeStyle = "#ffe600";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw snap target reticle
      const snapScreenX = snapStatus.x * zoom;
      const snapScreenY = snapStatus.y * zoom;
      ctx.beginPath();
      ctx.arc(snapScreenX, snapScreenY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffe600";
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    }

    // 3. Brush cursor ring
    if (brushCursor) {
      const bx = brushCursor.x * zoom;
      const by = brushCursor.y * zoom;
      const br = brushCursor.radius * zoom;

      ctx.save();
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.strokeStyle = brushCursor.mode === "add" ? "#63f6ff" : "#ff5f9e";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = brushCursor.mode === "add" ? "#63f6ff" : "#ff5f9e";
      ctx.beginPath();
      ctx.arc(bx, by, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, [attachment, zoom, showCrosshairs, crosshairPoints, snapStatus, brushCursor]);

  // Load images and initialize mask
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
        let baseImg: HTMLImageElement;
        if (attachment.baseDataUrl) {
          baseImg = await loadHtmlImage(attachment.baseDataUrl);
        } else if (source?.dataUrl) {
          const srcImg = await loadHtmlImage(source.dataUrl);
          const c = document.createElement("canvas");
          c.width = w;
          c.height = h;
          const cCtx = c.getContext("2d");
          if (cCtx) {
            cCtx.drawImage(srcImg, attachment.cropX, attachment.cropY, w, h, 0, 0, w, h);
            baseImg = await loadHtmlImage(c.toDataURL("image/png"));
          } else {
            baseImg = await loadHtmlImage(attachment.dataUrl);
          }
        } else {
          baseImg = await loadHtmlImage(attachment.dataUrl);
        }

        if (isCancelled) return;
        baseImgRef.current = baseImg;

        let initialMask: Uint8Array;
        if (attachment.mask.pixelMask && attachment.mask.pixelMask.length === w * h) {
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

        // Auto-scale between crosshairs
        const idealScale = computeCrosshairFitScale();
        setZoom(idealScale);

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
  }, [brush.enabled, brush.attachmentId, attachment, source?.dataUrl, computeCrosshairFitScale]);

  // Center scroll position on crosshairs after loading
  useEffect(() => {
    if (!isLoading && containerRef.current && crosshairPoints.length > 0 && attachment) {
      const container = containerRef.current;
      let targetX = attachment.width / 2;
      let targetY = attachment.height / 2;

      if (crosshairPoints.length >= 2) {
        targetX = (crosshairPoints[0].x + crosshairPoints[1].x) / 2;
        targetY = (crosshairPoints[0].y + crosshairPoints[1].y) / 2;
      } else if (crosshairPoints.length === 1) {
        targetX = crosshairPoints[0].x;
        targetY = crosshairPoints[0].y;
      }

      const screenX = targetX * zoom;
      const screenY = targetY * zoom;
      container.scrollLeft = screenX - container.clientWidth / 2;
      container.scrollTop = screenY - container.clientHeight / 2;
    }
  }, [isLoading, zoom, crosshairPoints, attachment]);

  // Redraw canvases
  useEffect(() => {
    if (!isLoading && activeMaskRef.current && baseImgRef.current) {
      renderMaskCanvas();
      renderOverlayCanvas();
    }
  }, [isLoading, renderMaskCanvas, renderOverlayCanvas]);

  // Coordinate resolution with precision snapping
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const overlay = overlayCanvasRef.current;
    if (!overlay || !attachment) return null;
    const rect = overlay.getBoundingClientRect();
    const rawX = (e.clientX - rect.left) / zoom;
    const rawY = (e.clientY - rect.top) / zoom;

    // Apply 1px crosshair circle & axis snapping if enabled
    if (snapEnabled && crosshairPoints.length > 0) {
      const snap = snapToCrosshairsAndCircles(rawX, rawY, crosshairPoints, 12 / zoom);
      return {
        x: snap.snapped ? snap.x : rawX,
        y: snap.snapped ? snap.y : rawY,
        snap,
      };
    }

    return { x: rawX, y: rawY, snap: { x: rawX, y: rawY, snapped: false } as SnapResult };
  };

  // Pointer interactions for drawing
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    if (!coords || !attachment || !activeMaskRef.current) return;

    // Toggle Brush Mode on Click: if snapped to a joint circle, toggle between fill and remove
    if (snapEnabled && coords.snap && coords.snap.snapped && coords.snap.type === "circle" && coords.snap.targetRadius) {
      const targetPoint = coords.snap.targetPoint;
      const r = coords.snap.targetRadius;
      const cx = targetPoint.x;
      const cy = targetPoint.y;
      
      if (targetPoint) {
        const joint = targetPoint.joint;
        const isOuterCircle = targetPoint.radii[2] === r;
        const hasOffsets = isOuterCircle && joint && joint.radialOffsets && joint.radialOffsets.length === 8;
        
        const mask = activeMaskRef.current;
        const w = attachment.width;
        const h = attachment.height;
        
        let filledCount = 0;
        let totalCount = 0;
        
        // Bounding box for calculation
        let maxR = r;
        if (hasOffsets && joint && joint.radialOffsets) {
          for (let i = 0; i < 8; i++) {
            const offR = Math.max(8, joint.thickness) * 1.5 * (joint.radialOffsets[i] ?? 1.0);
            if (offR > maxR) maxR = offR;
          }
        }
        
        const minX = Math.max(0, Math.floor(cx - maxR));
        const maxX = Math.min(w - 1, Math.ceil(cx + maxR));
        const minY = Math.max(0, Math.floor(cy - maxR));
        const maxY = Math.min(h - 1, Math.ceil(cy + maxR));
        
        const isInside = (px: number, py: number) => {
          const dx = px - cx;
          const dy = py - cy;
          const dist = Math.hypot(dx, dy);
          if (hasOffsets && joint) {
            const angle = Math.atan2(dy, dx);
            const allowedRadius = getCurvedRadiusAtAngle(joint, angle);
            return dist <= allowedRadius;
          } else {
            return dist <= r;
          }
        };
        
        for (let y = minY; y <= maxY; y++) {
          for (let x = minX; x <= maxX; x++) {
            if (isInside(x, y)) {
              totalCount++;
              if (mask[y * w + x] > 128) {
                filledCount++;
              }
            }
          }
        }
        
        // Count filled pixels outside the circle to support a 3-click cycle
        let outsideFilled = 0;
        for (let y = 0; y < h; y++) {
          const rowOffset = y * w;
          for (let x = 0; x < w; x++) {
            if (mask[rowOffset + x] > 128 && !isInside(x, y)) {
              outsideFilled++;
            }
          }
        }

        const insideRatio = filledCount / Math.max(1, totalCount);
        const nextMask = new Uint8Array(mask);

        if (insideRatio < 0.45) {
          // Click 1: Fill inside the circle
          for (let y = minY; y <= maxY; y++) {
            const rowOffset = y * w;
            for (let x = minX; x <= maxX; x++) {
              if (isInside(x, y)) {
                nextMask[rowOffset + x] = 255;
              }
            }
          }
        } else if (outsideFilled > 15) {
          // Click 2 (or 3rd state if clicked when filled): Remove outside of circles
          for (let y = 0; y < h; y++) {
            const rowOffset = y * w;
            for (let x = 0; x < w; x++) {
              if (!isInside(x, y)) {
                nextMask[rowOffset + x] = 0;
              }
            }
          }
        } else {
          // Click 3: Remove inside the circle
          for (let y = minY; y <= maxY; y++) {
            const rowOffset = y * w;
            for (let x = minX; x <= maxX; x++) {
              if (isInside(x, y)) {
                nextMask[rowOffset + x] = 0;
              }
            }
          }
        }
        
        activeMaskRef.current = nextMask;
        renderMaskCanvas();
        renderOverlayCanvas();
        
        // Push to history
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(new Uint8Array(nextMask));
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        
        setIsDrawing(false);
        return;
      }
    }

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDrawing(true);
    lastPosRef.current = { x: coords.x, y: coords.y };
    setSnapStatus(coords.snap);

    const edits: MaskEdit[] = [{ x: coords.x, y: coords.y, radius, mode }];
    const nextMask = applyMaskEdits(activeMaskRef.current, attachment.width, attachment.height, edits);
    activeMaskRef.current = nextMask;
    setBrushCursor({ x: coords.x, y: coords.y, radius, mode });
    renderMaskCanvas();
    renderOverlayCanvas();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    if (!coords || !attachment) return;

    setBrushCursor({ x: coords.x, y: coords.y, radius, mode });
    setSnapStatus(coords.snap);

    if (!isDrawing || !activeMaskRef.current) {
      renderOverlayCanvas();
      return;
    }

    const last = lastPosRef.current ?? { x: coords.x, y: coords.y };
    const dist = Math.hypot(coords.x - last.x, coords.y - last.y);
    const stepSize = Math.max(1, radius * 0.25);
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
      const nextMask = applyMaskEdits(activeMaskRef.current, attachment.width, attachment.height, edits);
      activeMaskRef.current = nextMask;
      lastPosRef.current = { x: coords.x, y: coords.y };
      renderMaskCanvas();
      renderOverlayCanvas();
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

    if (activeMaskRef.current) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(new Uint8Array(activeMaskRef.current));
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handlePointerLeave = () => {
    setBrushCursor(null);
    setSnapStatus(null);
    if (!isDrawing) {
      renderOverlayCanvas();
    }
  };

  // Wheel zoom anchored to cursor
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    const nextZoom = Math.min(8.0, Math.max(0.75, Number((zoom * factor).toFixed(2))));
    setZoom(nextZoom);
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const nextIdx = historyIndex - 1;
    const prevMask = new Uint8Array(history[nextIdx]);
    activeMaskRef.current = prevMask;
    setHistoryIndex(nextIdx);
    renderMaskCanvas();
    renderOverlayCanvas();
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    const nextIdx = historyIndex + 1;
    const nextMask = new Uint8Array(history[nextIdx]);
    activeMaskRef.current = nextMask;
    setHistoryIndex(nextIdx);
    renderMaskCanvas();
    renderOverlayCanvas();
  };

  const handleReset = () => {
    if (history.length === 0) return;
    const initial = new Uint8Array(history[0]);
    activeMaskRef.current = initial;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(initial);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    renderMaskCanvas();
    renderOverlayCanvas();
  };

  // --- SMART SHAPING ACTIONS ---

  // 1. Purge isolated dangling debris and specks
  const handleCleanDanglingPixels = () => {
    if (!attachment || !activeMaskRef.current) return;
    const { cleanedMask, removedPixels } = cleanDanglingPixels(
      activeMaskRef.current,
      attachment.width,
      attachment.height,
      attachment.localPivotX,
      attachment.localPivotY,
      40,
    );

    if (removedPixels === 0) {
      toast.info("No dangling debris detected on this part");
      return;
    }

    activeMaskRef.current = cleanedMask;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(cleanedMask);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    renderMaskCanvas();
    renderOverlayCanvas();
    toast.success(`Cleaned ${removedPixels} dangling pixels from cut!`);
  };

  // 2. Add smooth socket cap at the rotation hinge
  const handleAddSocketCap = () => {
    if (!attachment || !activeMaskRef.current) return;
    const radius = Math.round(attachment.thickness || 20);
    const newMask = applySocketCap(
      activeMaskRef.current,
      attachment.width,
      attachment.height,
      attachment.localPivotX,
      attachment.localPivotY,
      radius,
      "add",
    );

    activeMaskRef.current = newMask;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newMask);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    renderMaskCanvas();
    renderOverlayCanvas();
    toast.success(`Applied circular socket cap (R:${radius}px) at hinge`);
  };

  // 3. Trim hinge excess outside socket circle
  const handleTrimHingeExcess = () => {
    if (!attachment || !activeMaskRef.current) return;
    const radius = Math.round(attachment.thickness || 20);
    const newMask = applySocketCap(
      activeMaskRef.current,
      attachment.width,
      attachment.height,
      attachment.localPivotX,
      attachment.localPivotY,
      radius,
      "trim_outside",
    );

    activeMaskRef.current = newMask;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newMask);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    renderMaskCanvas();
    renderOverlayCanvas();
    toast.success("Trimmed jagged hinge excess outside socket circle");
  };

  // 4. Smooth contour edges (purge 1px spurs & ensure actually smooth paths)
  const handleSmoothContour = () => {
    if (!attachment || !activeMaskRef.current) return;
    const newMask = ensureSmoothMask(
      activeMaskRef.current,
      attachment.width,
      attachment.height,
      attachment.localPivotX,
      attachment.localPivotY,
    );
    activeMaskRef.current = newMask;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newMask);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    renderMaskCanvas();
    renderOverlayCanvas();
    toast.success("Contour smoothed: eliminated 1px hangs & irregular edges");
  };

  // Save changes & close with mandatory pre-save smoothing pass
  const handleSave = () => {
    if (!attachment || !baseImgRef.current || !activeMaskRef.current) return;
    const baseImg = baseImgRef.current;
    const { width: w, height: h } = attachment;

    // Run smoothing pass before brush save that ensures path is smooth, not 1px hangs but actually smooth
    const currentMask = ensureSmoothMask(
      activeMaskRef.current,
      w,
      h,
      attachment.localPivotX,
      attachment.localPivotY,
    );
    activeMaskRef.current = currentMask;

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
        d[idx + 3] = 0;
      } else {
        d[idx + 3] = Math.min(d[idx + 3] || 255, m);
        if (d[idx + 3] > 8) pixelCount++;
      }
    }
    cutCtx.putImageData(imgData, 0, 0);
    const cutDataUrl = cutCanvas.toDataURL("image/png");

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

    clearImageCache(attachment.dataUrl);
    saveAttachmentCut(attachment.id, currentMask, cutDataUrl, alphaPngDataUrl, pixelCount);
    setBrush({ enabled: false, attachmentId: null });
    toast.success(`Smoothed & saved refined mask for ${attachment.label}`);
  };

  const handleClose = () => {
    setBrush({ enabled: false, attachmentId: null });
  };

  if (!brush.enabled || !attachment) return null;

  const displayWidth = Math.round(attachment.width * zoom);
  const displayHeight = Math.round(attachment.height * zoom);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-0 sm:p-2 animate-in fade-in duration-200 select-none">
      <div className="bg-[#0a0a0a] border border-[#222] rounded-none sm:rounded-xl shadow-2xl w-full max-w-6xl flex flex-col h-full sm:h-[97vh] overflow-hidden text-[#f5f5f5]">
        {/* Header */}
        <div className="px-4 py-1.5 border-b border-[#222] flex items-center justify-between bg-[#111] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded-md bg-[#63f6ff]/10 text-[#63f6ff]">
              <Crosshair className="size-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold tracking-tight text-white">
                Precision Brush: {attachment.label}
              </span>
              <span className="text-[10px] font-mono text-[#a3a3a3] bg-[#1a1a1a] px-1.5 py-0.2 rounded border border-[#2b2b2b]">
                {attachment.width}×{attachment.height}px
              </span>
              <span className="text-[10px] text-[#777] hidden md:inline">
                • Click joint circles to Fill/Remove/Trim
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-[#a3a3a3] hover:text-white p-1 rounded-md hover:bg-[#222] transition-colors"
            title="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Primary Controls Toolbar */}
        <div className="px-4 py-1.5 border-b border-[#222] flex flex-wrap items-center justify-between gap-1.5 bg-[#141414] shrink-0">
          {/* Brush / Eraser */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMode("add")}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                mode === "add"
                  ? "bg-[#63f6ff] border-[#63f6ff] text-[#031012] shadow-md shadow-[#63f6ff]/20"
                  : "bg-[#1f1f1f] border-[#333] text-[#a3a3a3] hover:text-white"
              }`}
              title="Paint to add pixels back"
            >
              <Paintbrush className="size-3" />
              Brush (Add)
            </button>
            <button
              onClick={() => setMode("erase")}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                mode === "erase"
                  ? "bg-[#ff5f9e] border-[#ff5f9e] text-white shadow-md shadow-[#ff5f9e]/20"
                  : "bg-[#1f1f1f] border-[#333] text-[#a3a3a3] hover:text-white"
              }`}
              title="Erase to cut out dangling debris"
            >
              <Eraser className="size-3" />
              Eraser (Cut)
            </button>
          </div>

          {/* Brush Size */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#1a1a1a] rounded-md border border-[#2b2b2b]">
            <span className="text-xs text-[#a3a3a3] font-medium whitespace-nowrap">
              Radius: {radius}px
            </span>
            <input
              type="range"
              min={3}
              max={56}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-16 sm:w-24 h-1 accent-[#63f6ff] cursor-pointer"
            />
          </div>

          {/* Snapping & Crosshairs Toggles */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSnapEnabled(!snapEnabled)}
              className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all border ${
                snapEnabled
                  ? "bg-[#ffe600]/15 border-[#ffe600]/50 text-[#ffe600]"
                  : "bg-[#1a1a1a] border-[#333] text-[#888] hover:text-white"
              }`}
              title="Snap brush and cut strokes to rotation point circles and axes"
            >
              <Magnet className="size-3" />
              Snap {snapEnabled ? "ON" : "OFF"}
            </button>

            <button
              onClick={() => setShowCrosshairs(!showCrosshairs)}
              className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all border ${
                showCrosshairs
                  ? "bg-[#63f6ff]/15 border-[#63f6ff]/40 text-[#63f6ff]"
                  : "bg-[#1a1a1a] border-[#333] text-[#888] hover:text-white"
              }`}
              title="Toggle 1px rotation point crosshairs and concentric circles"
            >
              <Crosshair className="size-3" />
              Crosshairs
            </button>
          </div>

          {/* Scale & Zoom Controls */}
          <div className="flex items-center gap-1 bg-[#1a1a1a] px-1.5 py-0.5 rounded-md border border-[#2b2b2b]">
            <button
              onClick={() => setZoom(Math.max(0.75, Number((zoom - 0.5).toFixed(1))))}
              className="p-0.5 rounded text-[#a3a3a3] hover:text-white hover:bg-[#282828]"
              title="Zoom Out"
            >
              <ZoomOut className="size-3" />
            </button>
            <span className="text-[11px] font-mono font-medium text-white px-0.5">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(Math.min(8.0, Number((zoom + 0.5).toFixed(1))))}
              className="p-0.5 rounded text-[#a3a3a3] hover:text-white hover:bg-[#282828]"
              title="Zoom In"
            >
              <ZoomIn className="size-3" />
            </button>
            <button
              onClick={() => setZoom(computeCrosshairFitScale())}
              className="px-1.5 py-0.2 text-[10px] rounded bg-[#282828] text-[#a3a3a3] hover:text-white ml-0.5 font-medium"
              title="Scale between both rotation crosshairs"
            >
              Fit
            </button>
          </div>

          {/* History */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1 rounded-md border border-[#333] bg-[#1a1a1a] text-[#f5f5f5] hover:bg-[#282828] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="size-3.5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1 rounded-md border border-[#333] bg-[#1a1a1a] text-[#f5f5f5] hover:bg-[#282828] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="size-3.5" />
            </button>
            <button
              onClick={handleReset}
              className="p-1 rounded-md border border-[#333] bg-[#1a1a1a] text-[#f5f5f5] hover:bg-[#282828] transition-colors"
              title="Reset to Original Cut"
            >
              <RotateCcw className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Smart Shaping & Debris Bar */}
        <div className="px-4 py-1 border-b border-[#222] flex flex-wrap items-center justify-between gap-1.5 bg-[#0e0e0e] shrink-0 text-[11px]">
          <div className="flex items-center gap-1 text-[#a3a3a3]">
            <Sparkles className="size-3 text-[#63f6ff]" />
            <span className="font-medium text-white">Smart Shaping:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCleanDanglingPixels}
              className="px-2 py-0.5 rounded bg-[#231a28] hover:bg-[#34243d] text-[#ff80bf] border border-[#ff80bf]/30 flex items-center gap-1 font-medium transition-colors cursor-pointer"
              title="Purge isolated dangling debris and disconnected scraps"
            >
              <Wand2 className="size-3" />
              Clean Debris
            </button>

            <button
              onClick={handleAddSocketCap}
              className="px-2 py-0.5 rounded bg-[#16272b] hover:bg-[#203a40] text-[#63f6ff] border border-[#63f6ff]/30 flex items-center gap-1 font-medium transition-colors cursor-pointer"
              title="Generate a clean circular hinge socket cap at rotation point"
            >
              <ShieldAlert className="size-3" />
              Round Cap
            </button>

            <button
              onClick={handleTrimHingeExcess}
              className="px-2 py-0.5 rounded bg-[#24211a] hover:bg-[#332f24] text-[#ffd166] border border-[#ffd166]/30 flex items-center gap-1 font-medium transition-colors cursor-pointer"
              title="Trim jagged pixels outside rotation socket radius"
            >
              <Maximize2 className="size-3" />
              Trim Excess
            </button>

            <button
              onClick={handleSmoothContour}
              className="px-2 py-0.5 rounded bg-[#1c1c1c] hover:bg-[#282828] text-[#e0e0e0] border border-[#383838] flex items-center gap-1 font-medium transition-colors cursor-pointer"
              title="Eliminate 1px jagged spurs along cut boundaries"
            >
              Smooth
            </button>
          </div>
        </div>

        {/* Main Canvas Viewport Area */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          className="flex-1 min-h-0 bg-[#080808] overflow-auto flex items-center justify-center p-3 relative"
        >
          {isLoading ? (
            <div className="flex flex-col items-center gap-3 text-muted">
              <div className="size-8 border-2 border-[#63f6ff] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs">Loading figure part and rotation hinges...</span>
            </div>
          ) : (
            <div
              className="relative shadow-2xl rounded border border-[#2b2b2b] bg-[#141414] overflow-hidden"
              style={{
                width: `${displayWidth}px`,
                height: `${displayHeight}px`,
                minWidth: `${displayWidth}px`,
                minHeight: `${displayHeight}px`,
              }}
            >
              {/* Pixel Mask Canvas (renders image & cut texture) */}
              <canvas
                ref={canvasRef}
                style={{
                  width: `${displayWidth}px`,
                  height: `${displayHeight}px`,
                  imageRendering: "pixelated",
                  display: "block",
                  position: "absolute",
                  left: 0,
                  top: 0,
                }}
              />

              {/* Crisp 1px Screen Overlay Canvas (crosshairs, circles, snap highlights) */}
              <canvas
                ref={overlayCanvasRef}
                style={{
                  width: `${displayWidth}px`,
                  height: `${displayHeight}px`,
                  display: "block",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  cursor: "crosshair",
                  pointerEvents: "auto",
                  touchAction: "none",
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
        <div className="px-4 py-1.5 border-t border-[#222] flex flex-wrap items-center justify-between gap-2 bg-[#111] shrink-0 text-[11px]">
          <div className="flex items-center gap-2.5 text-xs text-[#a3a3a3]">
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-[#63f6ff]" />
              <strong>Hinge:</strong> {attachment.localPivotX},{attachment.localPivotY} ({attachment.thickness}px)
            </span>
            {crosshairPoints.length >= 2 && (
              <span className="flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-[#ffd166]" />
                <strong>Distal:</strong> {Math.round(crosshairPoints[1].x)},{Math.round(crosshairPoints[1].y)}
              </span>
            )}
            {snapStatus?.snapped && (
              <span className="px-1.5 py-0.2 rounded bg-[#ffe600]/15 text-[#ffe600] border border-[#ffe600]/30 font-mono text-[10px] animate-pulse">
                SNAPPED
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={handleClose}
              className="px-3 py-1 rounded-md text-xs font-medium border border-[#333] bg-[#181818] text-[#a3a3a3] hover:text-white hover:bg-[#222] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-3.5 py-1 rounded-md text-xs font-bold bg-[#63f6ff] hover:bg-[#51e7ef] text-[#031012] shadow-md shadow-[#63f6ff]/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="size-3.5 stroke-[2.5]" />
              Save Cut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
