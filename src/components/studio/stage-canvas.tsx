import { useEffect, useRef, useState } from "react";
import { contain, loadHtmlImage, buildFigureMask, readImageData } from "@/lib/puppet/image";
import { useStudio } from "@/lib/puppet/store";
import { anglesAt } from "@/lib/puppet/animate";
import { buildSkinRig, renderSkinnedFrame, type SkinRig } from "@/lib/puppet/skin-render";
import type { Attachment, BackgroundKey, Joint } from "@/lib/puppet/types";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";

export const imageCache = new Map<string, HTMLImageElement>();

export function clearImageCache(src?: string) {
  if (src) {
    imageCache.delete(src);
  } else {
    imageCache.clear();
  }
}

async function cached(src: string) {
  const hit = imageCache.get(src);
  if (hit && hit.complete) return hit;
  const img = await loadHtmlImage(src);
  imageCache.set(src, img);
  return img;
}

// Cache for the pixel-bend skinning rig: rebuilding it (silhouette + bone ownership) is
// too expensive to redo every animation frame, so it's only recomputed when the source
// image or the joint layout actually changes.
let skinRigEntry: { key: string; rig: SkinRig; sourceImageData: ImageData } | null = null;
let skinCanvas: HTMLCanvasElement | null = null;

async function ensureSkinRig(
  source: { dataUrl: string; width: number; height: number },
  bg: BackgroundKey | null,
  joints: Joint[],
  jointVersion: number,
) {
  const key = `${source.dataUrl}|${jointVersion}|${joints.length}`;
  if (skinRigEntry && skinRigEntry.key === key) return skinRigEntry;
  const img = await cached(source.dataUrl);
  const sourceImageData = readImageData(img);
  const mask = buildFigureMask(sourceImageData, bg ?? { r: 0, g: 0, b: 0, threshold: 0, lift: false });
  const rig = buildSkinRig(mask, source.width, source.height, joints);
  skinRigEntry = { key, rig, sourceImageData };
  return skinRigEntry;
}

function chainOf(joint: Joint, byId: Map<string, Joint>) {
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

function applyChain(
  ctx: CanvasRenderingContext2D,
  joint: Joint,
  byId: Map<string, Joint>,
  angles: Record<string, number>,
) {
  for (const j of chainOf(joint, byId)) {
    const a = ((angles[j.id] ?? 0) * Math.PI) / 180;
    ctx.translate(j.x, j.y);
    ctx.rotate(a);
    ctx.translate(-j.x, -j.y);
  }
}

function paintChecker(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#161412";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#1e1b18";
  const size = 14;
  for (let y = 0; y < h; y += size) {
    for (let x = 0; x < w; x += size) {
      if (((x / size) | 0) % 2 === ((y / size) | 0) % 2) ctx.fillRect(x, y, size, size);
    }
  }
}

export function StageCanvas({ mode }: { mode: "bones" | "puppet" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const source = useStudio((s) => s.source);
  const joints = useStudio((s) => s.joints);
  const selectedId = useStudio((s) => s.selectedId);
  const pinMode = useStudio((s) => s.pinMode);
  const pinIndex = useStudio((s) => s.pinIndex);
  const pinHandleAngle = useStudio((s) => s.pinHandleAngle);
  const attachments = useStudio((s) => s.attachments);
  const setSelected = useStudio((s) => s.setSelected);
  const moveJoint = useStudio((s) => s.moveJoint);
  const updateJoint = useStudio((s) => s.updateJoint);
  const placeNextPin = useStudio((s) => s.placeNextPin);
  const setPinHandleAngle = useStudio((s) => s.setPinHandleAngle);
  const fitRef = useRef({ x: 0, y: 0, w: 0, h: 0, s: 1 });
  const dragRef = useRef<
    | { type: "move"; jointId: string }
    | { type: "resize"; jointId: string; centerX: number; centerY: number }
    | { type: "radialOffset"; jointId: string; pointIndex: number; centerX: number; centerY: number }
    | { type: "pinAngle"; jointId: string }
    | null
  >(null);
  const [canvasCursor, setCanvasCursor] = useState<string>("default");
  const [activeResizeId, setActiveResizeId] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || !source) return;
    let dead = false;
    let raf = 0;
    let drawing = false;

    const draw = async () => {
      if (dead || drawing) return;
      drawing = true;
      try {
        const rect = wrap.getBoundingClientRect();
        const cssW = Math.max(1, rect.width);
        const cssH = Math.max(1, rect.height);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
          canvas.width = Math.round(cssW * dpr);
          canvas.height = Math.round(cssH * dpr);
          canvas.style.width = `${cssW}px`;
          canvas.style.height = `${cssH}px`;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        paintChecker(ctx, cssW, cssH);

        const fit = contain(source.width, source.height, cssW, cssH);
        fitRef.current = fit;
        ctx.save();
        ctx.translate(fit.x, fit.y);
        ctx.scale(fit.s, fit.s);

        const state = useStudio.getState();
        const angles = state.currentAngles();
        if (state.sweepId) {
          const joint = state.joints.find((j) => j.id === state.sweepId);
          if (joint) {
            const t = (performance.now() / 1400) % 2;
            const u = t < 1 ? t : 2 - t;
            angles[joint.id] = joint.minAngle + (joint.maxAngle - joint.minAngle) * u;
          }
        }

        if (state.onionSkinning && state.activeAnimId && mode === "puppet") {
          const anim = state.animations.find((a) => a.id === state.activeAnimId);
          if (anim) {
            const prevTime = Math.max(0, state.time - 0.1);
            const nextTime = Math.min(anim.duration, state.time + 0.1);
            const prevAngles = anglesAt(state.joints, anim, prevTime);
            const nextAngles = anglesAt(state.joints, anim, nextTime);
            const byId = new Map(state.joints.map((j) => [j.id, j]));
            const ordered = [...state.attachments].sort((a, b) => a.zIndex - b.zIndex);
            ctx.globalAlpha = 0.2;
            for (const angles of [prevAngles, nextAngles]) {
              for (const attachment of ordered) {
                const joint = byId.get(attachment.boneId);
                if (!joint) continue;
                try {
                  const img = await cached(attachment.dataUrl);
                  if (dead) return;
                  ctx.save();
                  applyChain(ctx, joint, byId, angles);
                  ctx.drawImage(img, attachment.cropX, attachment.cropY);
                  ctx.restore();
                } catch { /* skip */ }
              }
            }
            ctx.globalAlpha = 1.0;
          }
        }

        if (mode === "bones" || !state.attachments.length) {
          try {
            const img = await cached(source.dataUrl);
            if (dead) return;
            ctx.drawImage(img, 0, 0, source.width, source.height);
          } catch {
            /* skip */
          }
          drawBones(
            ctx,
            state.joints,
            state.selectedId,
            state.pinMode === "pin" ? (state.joints[state.pinIndex]?.id ?? null) : null,
            activeResizeId,
          );
          if (mode === "bones" && state.selectedId) {
            const sel = state.joints.find((j) => j.id === state.selectedId);
            if (sel) {
              drawRotationHandle(ctx, sel, state.pinHandleAngle, dragRef.current?.type === "pinAngle");
            }
          }
        } else {
          const byId = new Map(state.joints.map((j) => [j.id, j]));
          const ordered = [...state.attachments].sort((a, b) => a.zIndex - b.zIndex);

          if (state.pixelBend) {
            try {
              const { rig, sourceImageData } = await ensureSkinRig(state.source!, state.bg, state.joints, state.jointVersion);
              const warped = renderSkinnedFrame(sourceImageData, rig, state.joints, angles);
              if (!skinCanvas || skinCanvas.width !== warped.width || skinCanvas.height !== warped.height) {
                skinCanvas = document.createElement("canvas");
                skinCanvas.width = warped.width;
                skinCanvas.height = warped.height;
              }
              const sctx = skinCanvas.getContext("2d");
              if (sctx) {
                sctx.putImageData(warped, 0, 0);
                ctx.drawImage(skinCanvas, 0, 0);
              }
            } catch {
              /* rig not ready yet (e.g. mid-rebuild) — skip this frame's puppet draw */
            }
          } else {
            for (const attachment of ordered) {
              const joint = byId.get(attachment.boneId);
              if (!joint) continue;
              try {
                const img = await cached(attachment.dataUrl);
                if (dead) return;
                ctx.save();
                applyChain(ctx, joint, byId, angles);
                ctx.drawImage(img, attachment.cropX, attachment.cropY);
                ctx.restore();
              } catch {
                /* skip */
              }
            }
          }

          if (state.step === "parts" && state.selectedId) {
            const joint = byId.get(state.selectedId);
            if (joint) {
              ctx.save();
              applyChain(ctx, joint, byId, angles);
              drawRotationCrosshair(
                ctx,
                joint.x,
                joint.y,
                joint.thickness,
                true,
                false,
                activeResizeId === joint.id,
                joint.label,
                joint,
              );
              ctx.restore();
            }
          }
        }

        ctx.restore();
      } finally {
        drawing = false;
      }
    };

    const loop = () => {
      void draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => void draw());
    ro.observe(wrap);
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [source, joints, selectedId, pinMode, pinIndex, attachments, mode, activeResizeId]);

  function imagePoint(e: React.PointerEvent) {
    const canvas = canvasRef.current;
    if (!canvas || !source) return null;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const fit = fitRef.current;
    return {
      x: (px - fit.x) / fit.s,
      y: (py - fit.y) / fit.s,
    };
  }

  function hitJoint(x: number, y: number): { joint: Joint; type: "move" | "resize" } | null {
    const fit = fitRef.current;
    const s = fit.s || 1;

    // Check currently selected joint first for responsive handling
    if (selectedId) {
      const sel = joints.find((j) => j.id === selectedId);
      if (sel) {
        const d = Math.hypot(sel.x - x, sel.y - y);
        const centerHitR = Math.max(14 / s, Math.min(20, sel.thickness * 0.4));
        if (d <= centerHitR) {
          return { joint: sel, type: "move" };
        }
        // Draggable circle zone: within socket circle radius range
        const socketR = sel.thickness;
        const minRim = Math.max(8 / s, socketR * 0.45);
        const maxRim = Math.max(socketR * 1.5 + 14 / s, 36 / s);
        if (d >= minRim && d <= maxRim) {
          return { joint: sel, type: "resize" };
        }
      }
    }

    let bestMove: { joint: Joint; dist: number } | null = null;
    let bestResize: { joint: Joint; dist: number } | null = null;

    for (const joint of joints) {
      const d = Math.hypot(joint.x - x, joint.y - y);
      const centerHitR = Math.max(14 / s, Math.min(20, joint.thickness * 0.4));
      if (d <= centerHitR) {
        if (!bestMove || d < bestMove.dist) {
          bestMove = { joint, dist: d };
        }
      } else {
        const socketR = joint.thickness;
        const minRim = Math.max(8 / s, socketR * 0.45);
        const maxRim = Math.max(socketR * 1.5 + 14 / s, 36 / s);
        if (d >= minRim && d <= maxRim) {
          const rimDist = Math.abs(d - socketR);
          if (!bestResize || rimDist < bestResize.dist) {
            bestResize = { joint, dist: rimDist };
          }
        }
      }
    }

    if (bestMove) return { joint: bestMove.joint, type: "move" };
    if (bestResize) return { joint: bestResize.joint, type: "resize" };
    return null;
  }

  function hitPinHandle(x: number, y: number): Joint | null {
    if (!selectedId) return null;
    const sel = joints.find((j) => j.id === selectedId);
    if (!sel) return null;
    const fit = fitRef.current;
    const s = fit.s || 1;
    const rad = (pinHandleAngle * Math.PI) / 180;
    const len = Math.max(34, sel.thickness * 2.2);
    const hx = sel.x + len * Math.sin(rad);
    const hy = sel.y - len * Math.cos(rad);
    const d = Math.hypot(hx - x, hy - y);
    return d <= 14 / s ? sel : null;
  }

  return (
    <div ref={wrapRef} className="relative h-full min-h-72 w-full overflow-hidden rounded-lg bg-surface">
      <canvas
        ref={canvasRef}
        style={{ cursor: canvasCursor }}
        className="block h-full w-full touch-none"
        onPointerDown={(e) => {
          if (mode !== "bones" || !source) return;
          const p = imagePoint(e);
          if (!p) return;
          (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);

          // 0. The rotation-range handle on the selected joint takes priority over
          // placing/moving pins, so it can be aimed right after (or well after) a pin drop.
          const handleJoint = hitPinHandle(p.x, p.y);
          if (handleJoint) {
            dragRef.current = { type: "pinAngle", jointId: handleJoint.id };
            return;
          }

          if (pinMode === "pin") {
            placeNextPin(p.x, p.y);
            return;
          }

          // 1. Check if we hit any of the 8 radial handles of the selected joint first
          if (selectedId) {
            const sel = joints.find((j) => j.id === selectedId);
            if (sel) {
              const offsets = sel.radialOffsets || [1, 1, 1, 1, 1, 1, 1, 1];
              const fit = fitRef.current;
              const s = fit.s || 1;
              const t = Math.max(8, sel.thickness);
              for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI) / 4;
                const r = t * 1.5 * (offsets[i] ?? 1.0);
                const hx = sel.x + r * Math.cos(angle);
                const hy = sel.y + r * Math.sin(angle);
                const d = Math.hypot(hx - p.x, hy - p.y);
                if (d <= 12 / s) {
                  dragRef.current = {
                    type: "radialOffset",
                    jointId: sel.id,
                    pointIndex: i,
                    centerX: sel.x,
                    centerY: sel.y,
                  };
                  setActiveResizeId(null);
                  return;
                }
              }
            }
          }

          // 2. Otherwise fall back to standard joint move/resize
          const hit = hitJoint(p.x, p.y);
          if (hit) {
            setSelected(hit.joint.id);
            if (hit.type === "resize") {
              dragRef.current = {
                type: "resize",
                jointId: hit.joint.id,
                centerX: hit.joint.x,
                centerY: hit.joint.y,
              };
              setActiveResizeId(hit.joint.id);
            } else {
              dragRef.current = {
                type: "move",
                jointId: hit.joint.id,
              };
              setActiveResizeId(null);
            }
          } else {
            setSelected(null);
            setActiveResizeId(null);
          }
        }}
        onPointerMove={(e) => {
          const p = imagePoint(e);
          if (!p) return;

          if (dragRef.current) {
            if (dragRef.current.type === "move") {
              moveJoint(dragRef.current.jointId, p.x, p.y);
            } else if (dragRef.current.type === "resize") {
              const d = Math.hypot(p.x - dragRef.current.centerX, p.y - dragRef.current.centerY);
              const newThickness = Math.max(6, Math.min(180, Math.round(d)));
              updateJoint(dragRef.current.jointId, { thickness: newThickness });
            } else if (dragRef.current.type === "radialOffset") {
              const jointId = dragRef.current.jointId;
              const idx = dragRef.current.pointIndex;
              const joint = joints.find((j) => j.id === jointId);
              if (joint) {
                const angle = (idx * Math.PI) / 4;
                const dx = p.x - joint.x;
                const dy = p.y - joint.y;
                const projD = dx * Math.cos(angle) + dy * Math.sin(angle);
                const baseR = Math.max(8, joint.thickness) * 1.5;
                const mult = Math.max(0.15, Math.min(3.5, projD / baseR));
                const currentOffsets = joint.radialOffsets ? [...joint.radialOffsets] : [1, 1, 1, 1, 1, 1, 1, 1];
                currentOffsets[idx] = Number(mult.toFixed(3));
                updateJoint(jointId, { radialOffsets: currentOffsets });
              }
            } else if (dragRef.current.type === "pinAngle") {
              const joint = joints.find((j) => j.id === dragRef.current!.jointId);
              if (joint) {
                const dx = p.x - joint.x;
                const dy = p.y - joint.y;
                let deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
                if (deg > 180) deg -= 360;
                if (deg < -180) deg += 360;
                setPinHandleAngle(Math.round(deg));
              }
            }
            return;
          }

          if (mode === "bones" && pinMode !== "pin") {
            let hoverRadial = false;
            if (selectedId) {
              const sel = joints.find((j) => j.id === selectedId);
              if (sel) {
                const offsets = sel.radialOffsets || [1, 1, 1, 1, 1, 1, 1, 1];
                const fit = fitRef.current;
                const s = fit.s || 1;
                const t = Math.max(8, sel.thickness);
                for (let i = 0; i < 8; i++) {
                  const angle = (i * Math.PI) / 4;
                  const r = t * 1.5 * (offsets[i] ?? 1.0);
                  const hx = sel.x + r * Math.cos(angle);
                  const hy = sel.y + r * Math.sin(angle);
                  const d = Math.hypot(hx - p.x, hy - p.y);
                  if (d <= 12 / s) {
                    hoverRadial = true;
                    break;
                  }
                }
              }
            }

            if (hoverRadial) {
              setCanvasCursor("pointer");
            } else if (hitPinHandle(p.x, p.y)) {
              setCanvasCursor("grab");
            } else {
              const hit = hitJoint(p.x, p.y);
              if (hit) {
                setCanvasCursor(hit.type === "resize" ? "ew-resize" : "move");
              } else {
                setCanvasCursor("default");
              }
            }
          } else {
            setCanvasCursor(pinMode === "pin" ? "crosshair" : "default");
          }
        }}
        onPointerUp={() => {
          dragRef.current = null;
          setActiveResizeId(null);
        }}
      />
    </div>
  );
}

function drawRotationHandle(
  ctx: CanvasRenderingContext2D,
  joint: Joint,
  angleDeg: number,
  dragging: boolean,
) {
  const rad = (angleDeg * Math.PI) / 180;
  const len = Math.max(34, joint.thickness * 2.2);
  const hx = joint.x + len * Math.sin(rad);
  const hy = joint.y - len * Math.cos(rad);

  ctx.save();

  // Stop-range arc: shows how far minAngle..maxAngle currently sweeps from rest (up).
  const r = len * 0.62;
  ctx.beginPath();
  ctx.arc(joint.x, joint.y, r, -Math.PI / 2 + (joint.minAngle * Math.PI) / 180, -Math.PI / 2 + (joint.maxAngle * Math.PI) / 180);
  ctx.strokeStyle = "rgba(124, 255, 178, 0.45)";
  ctx.lineWidth = 3;
  ctx.setLineDash([]);
  ctx.stroke();

  // Handle arm
  ctx.beginPath();
  ctx.moveTo(joint.x, joint.y);
  ctx.lineTo(hx, hy);
  ctx.strokeStyle = dragging ? "#ffc53d" : "#7CFFB2";
  ctx.lineWidth = dragging ? 2.5 : 1.6;
  ctx.stroke();

  // Handle tip
  ctx.beginPath();
  ctx.arc(hx, hy, dragging ? 7 : 5.5, 0, Math.PI * 2);
  ctx.fillStyle = dragging ? "#ffc53d" : "#7CFFB2";
  ctx.fill();
  ctx.strokeStyle = "#0d0c0b";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.font = "600 11px Outfit, sans-serif";
  ctx.fillStyle = dragging ? "#ffc53d" : "#7CFFB2";
  ctx.strokeStyle = "rgba(13,12,11,0.9)";
  ctx.lineWidth = 3;
  const label = `${Math.round(angleDeg)}° — drag to aim, then Set Min/Max`;
  ctx.strokeText(label, hx + 8, hy - 6);
  ctx.fillText(label, hx + 8, hy - 6);

  ctx.restore();
}

function drawRotationCrosshair(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  thickness: number,
  isSelected: boolean,
  isPin: boolean,
  isResizing: boolean = false,
  label?: string,
  joint?: Joint,
) {
  const t = Math.max(8, thickness);
  const r1 = Math.round(t * 0.5);
  const r2 = Math.round(t);
  const r3 = Math.round(t * 1.5);
  const crossExtent = r3 + 8;

  ctx.save();
  ctx.lineWidth = 1;

  // 1. Concentric shapes with 1px crisp strokes
  // Outer circle (overlap margin): 1.5x thickness (rendered curved if 8 points exist)
  ctx.beginPath();
  if (joint && joint.radialOffsets && joint.radialOffsets.length === 8) {
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const r = t * 1.5 * (joint.radialOffsets[i] ?? 1.0);
      points.push({
        x: x + r * Math.cos(angle),
        y: y + r * Math.sin(angle),
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
    ctx.arc(x, y, r3, 0, Math.PI * 2);
  }
  
  // Fill on point adjust: translucent neon fill inside curved region
  ctx.fillStyle = isSelected
    ? "rgba(99, 246, 255, 0.08)"
    : "rgba(241, 236, 228, 0.03)";
  ctx.fill();

  ctx.strokeStyle = isSelected
    ? "rgba(99, 246, 255, 0.45)"
    : "rgba(241, 236, 228, 0.2)";
  ctx.setLineDash([3, 3]);
  ctx.stroke();

  // Middle circle (joint socket / cut line): 1.0x thickness - Draggable for size change!
  ctx.beginPath();
  ctx.arc(x, y, r2, 0, Math.PI * 2);
  ctx.strokeStyle = isResizing
    ? "#ffc53d"
    : isSelected
    ? "#63f6ff"
    : isPin
    ? "#ff5f9e"
    : "rgba(241, 236, 228, 0.6)";
  ctx.lineWidth = isResizing ? 2.5 : isSelected ? 1.8 : 1.0;
  ctx.setLineDash([]);
  ctx.stroke();

  // Inner core circle: 0.5x thickness
  ctx.beginPath();
  ctx.arc(x, y, r1, 0, Math.PI * 2);
  ctx.strokeStyle = isSelected
    ? "rgba(99, 246, 255, 0.65)"
    : "rgba(241, 236, 228, 0.3)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // 2. 1px crosshairs extending horizontally and vertically through rotation point
  ctx.beginPath();
  // Horizontal crosshair
  ctx.moveTo(x - crossExtent, y);
  ctx.lineTo(x + crossExtent, y);
  // Vertical crosshair
  ctx.moveTo(x, y - crossExtent);
  ctx.lineTo(x, y + crossExtent);
  ctx.strokeStyle = isSelected
    ? "rgba(99, 246, 255, 0.9)"
    : isPin
    ? "rgba(255, 95, 158, 0.9)"
    : "rgba(241, 236, 228, 0.65)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // 3. Central rotation pivot pin (draggable for moving position)
  ctx.beginPath();
  ctx.arc(x, y, isSelected || isPin ? 4 : 3, 0, Math.PI * 2);
  ctx.fillStyle = isSelected ? "#63f6ff" : isPin ? "#ff5f9e" : "#f1ece4";
  ctx.fill();
  ctx.strokeStyle = "#0d0c0b";
  ctx.lineWidth = 1;
  ctx.stroke();

  // 4. Draggable resize handles on the middle socket circle
  if (isSelected || isResizing) {
    const handleAngles = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
    for (let i = 0; i < handleAngles.length; i++) {
      const a = handleAngles[i];
      const hx = x + r2 * Math.cos(a);
      const hy = y + r2 * Math.sin(a);
      ctx.beginPath();
      ctx.arc(hx, hy, i === 0 ? 5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = isResizing ? "#ffc53d" : "#63f6ff";
      ctx.fill();
      ctx.strokeStyle = "#0d0c0b";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }

  // 5. Draw 8 customizable points along the outer curve for selection
  if (isSelected && joint) {
    const offsets = joint.radialOffsets || [1, 1, 1, 1, 1, 1, 1, 1];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const r = t * 1.5 * (offsets[i] ?? 1.0);
      const hx = x + r * Math.cos(angle);
      const hy = y + r * Math.sin(angle);

      // Radial guideline dashed line
      ctx.beginPath();
      ctx.moveTo(x + r1 * Math.cos(angle), y + r1 * Math.sin(angle));
      ctx.lineTo(hx, hy);
      ctx.strokeStyle = "rgba(99, 246, 255, 0.35)";
      ctx.setLineDash([2, 2]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Control Handle circle
      ctx.beginPath();
      ctx.arc(hx, hy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ff5f9e"; // Vivid hot pink handle
      ctx.fill();
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }

  // 6. Dynamic label with live radius
  if (label && (isSelected || isPin || isResizing)) {
    ctx.font = "600 12px Outfit, sans-serif";
    ctx.fillStyle = isResizing ? "#ffc53d" : isSelected ? "#63f6ff" : "#f1ece4";
    ctx.strokeStyle = "rgba(13,12,11,0.9)";
    ctx.lineWidth = 3;
    const text = isResizing
      ? `${label} • R: ${r2}px (drag circle to resize)`
      : `${label} (R: ${r2}px)`;
    ctx.strokeText(text, x + crossExtent + 6, y - 4);
    ctx.fillText(text, x + crossExtent + 6, y - 4);
  }

  ctx.restore();
}

function drawBones(
  ctx: CanvasRenderingContext2D,
  joints: Joint[],
  selectedId: string | null,
  pinId: string | null,
  activeResizeId: string | null = null,
) {
  // Respecting "No bones etc anywhere":
  // We draw the pristine rotation crosshairs with draggable concentric joint circles,
  // without cluttering bone linkage sticks across the character artwork.
  for (const joint of joints) {
    const selected = joint.id === selectedId;
    const pin = joint.id === pinId;
    const isResizing = joint.id === activeResizeId;
    drawRotationCrosshair(
      ctx,
      joint.x,
      joint.y,
      joint.thickness,
      selected,
      pin,
      isResizing,
      joint.label,
      joint,
    );
  }
}

export function PartTiles({ attachments }: { attachments: Attachment[] }) {
  const selectedId = useStudio((s) => s.selectedId);
  if (!attachments.length) return null;
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {attachments.map((part) => (
        <button
          key={part.id}
          type="button"
          onClick={() => useStudio.getState().setSelected(part.boneId)}
          className={cn(
            "flex w-24 shrink-0 flex-col gap-1 rounded-md bg-elevated p-1.5 text-left shadow-border transition-all",
            selectedId === part.boneId ? "ring-2 ring-accent" : "hover:bg-elevated/80"
          )}
        >
          <div className="checker-tile relative aspect-square overflow-hidden rounded-sm group">
            <img src={part.dataUrl} alt={part.label} className="h-full w-full object-contain" />
            <div
              className="absolute bottom-1 right-1 p-1 rounded bg-black/70 hover:bg-accent text-white opacity-80 hover:opacity-100 transition-all cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                useStudio.getState().setBrush({ enabled: true, attachmentId: part.id });
              }}
              title={`Edit mask for ${part.label}`}
              role="button"
            >
              <Paintbrush className="size-3" />
            </div>
          </div>
          <span className={selectedId === part.boneId ? "truncate text-xs text-fg" : "truncate text-xs text-muted"}>
            {part.label}
          </span>
        </button>
      ))}
    </div>
  );
}
