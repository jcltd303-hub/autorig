import { useEffect, useRef } from "react";
import { contain, loadHtmlImage } from "@/lib/puppet/image";
import { useStudio } from "@/lib/puppet/store";
import type { Attachment, Joint } from "@/lib/puppet/types";
import { cn } from "@/lib/utils";

const imageCache = new Map<string, HTMLImageElement>();

async function cached(src: string) {
  const hit = imageCache.get(src);
  if (hit && hit.complete) return hit;
  const img = await loadHtmlImage(src);
  imageCache.set(src, img);
  return img;
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
  const attachments = useStudio((s) => s.attachments);
  const setSelected = useStudio((s) => s.setSelected);
  const moveJoint = useStudio((s) => s.moveJoint);
  const placeNextPin = useStudio((s) => s.placeNextPin);
  const fitRef = useRef({ x: 0, y: 0, w: 0, h: 0, s: 1 });
  const dragRef = useRef<string | null>(null);

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
          );
        } else {
          const byId = new Map(state.joints.map((j) => [j.id, j]));
          const ordered = [...state.attachments].sort((a, b) => a.zIndex - b.zIndex);
          for (const attachment of ordered) {
            const joint = byId.get(attachment.boneId);
            if (!joint) continue;
            try {
              const img = await cached(attachment.dataUrl);
              if (dead) return;
              ctx.save();
              applyChain(ctx, joint, byId, angles);
              ctx.drawImage(img, attachment.cropX, attachment.cropY);
              if (state.step === "parts" && state.selectedId === attachment.boneId) {
                ctx.fillStyle = "#e05a47";
                ctx.beginPath();
                ctx.arc(joint.x, joint.y, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 2;
                ctx.stroke();
              }
              ctx.restore();
            } catch {
              /* skip */
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
  }, [source, joints, selectedId, pinMode, pinIndex, attachments, mode]);

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

  function hitJoint(x: number, y: number) {
    const fit = fitRef.current;
    const r = 14 / fit.s;
    let best: Joint | null = null;
    let bestD = r;
    for (const joint of joints) {
      const d = Math.hypot(joint.x - x, joint.y - y);
      if (d <= bestD) {
        bestD = d;
        best = joint;
      }
    }
    return best;
  }

  return (
    <div ref={wrapRef} className="relative h-full min-h-72 w-full overflow-hidden rounded-lg bg-surface">
      <canvas
        ref={canvasRef}
        className="block h-full w-full touch-none"
        onPointerDown={(e) => {
          if (mode !== "bones" || !source) return;
          const p = imagePoint(e);
          if (!p) return;
          (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
          if (pinMode === "pin") {
            placeNextPin(p.x, p.y);
            return;
          }
          const hit = hitJoint(p.x, p.y);
          if (hit) {
            setSelected(hit.id);
            dragRef.current = hit.id;
          } else {
            setSelected(null);
          }
        }}
        onPointerMove={(e) => {
          if (!dragRef.current) return;
          const p = imagePoint(e);
          if (!p) return;
          moveJoint(dragRef.current, p.x, p.y);
        }}
        onPointerUp={() => {
          dragRef.current = null;
        }}
      />
    </div>
  );
}

function drawBones(
  ctx: CanvasRenderingContext2D,
  joints: Joint[],
  selectedId: string | null,
  pinId: string | null,
) {
  const byId = new Map(joints.map((j) => [j.id, j]));
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  for (const joint of joints) {
    if (!joint.parentId) continue;
    const parent = byId.get(joint.parentId);
    if (!parent) continue;
    ctx.strokeStyle = "rgba(217, 210, 197, 0.55)";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(parent.x, parent.y);
    ctx.lineTo(joint.x, joint.y);
    ctx.stroke();
  }
  for (const joint of joints) {
    const selected = joint.id === selectedId;
    const pin = joint.id === pinId;
    ctx.beginPath();
    ctx.arc(joint.x, joint.y, selected || pin ? 7.5 : 5.5, 0, Math.PI * 2);
    ctx.fillStyle = pin ? "#f1ece4" : selected ? "#d9d2c5" : "#c4b8a5";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#0d0c0b";
    ctx.stroke();
    if (selected || pin) {
      ctx.font = "600 13px Outfit, sans-serif";
      ctx.fillStyle = "#f1ece4";
      ctx.strokeStyle = "rgba(13,12,11,0.7)";
      ctx.lineWidth = 3;
      ctx.strokeText(joint.label, joint.x + 10, joint.y - 10);
      ctx.fillText(joint.label, joint.x + 10, joint.y - 10);
    }
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
          <div className="checker-tile relative aspect-square overflow-hidden rounded-sm">
            <img src={part.dataUrl} alt={part.label} className="h-full w-full object-contain" />
          </div>
          <span className={selectedId === part.boneId ? "truncate text-xs text-fg" : "truncate text-xs text-muted"}>
            {part.label}
          </span>
        </button>
      ))}
    </div>
  );
}
