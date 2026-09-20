import { useEffect, useRef, useState } from "react";
import {
  Download,
  FolderOpen,
  Pause,
  Pin,
  Play,
  RotateCcw,
  Scissors,
  Sparkles,
  Trash2,
  Wand2,
  Paintbrush,
  Ghost,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { PRESET_MOTIONS } from "@/lib/puppet/animate";
import { useStudio } from "@/lib/puppet/store";
import { KIND_LABEL, SAMPLES } from "@/lib/puppet/templates";
import { STEPS, type Joint, type SkeletonKind } from "@/lib/puppet/types";
import { toYaml } from "@/lib/puppet/yaml";
import { buildArchive, downloadBlob } from "@/lib/puppet/zip";
import { cn } from "@/lib/utils";
import { PartTiles, StageCanvas } from "./stage-canvas";
import { AiImageModal } from "./ai-image-modal";
import { BrushEditor } from "./brush-editor";

function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="11" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="11" r="1.4" fill="currentColor" />
      <path d="M16 15.4V26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 21h8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PlaybackClock() {
  const playing = useStudio((s) => s.playing);
  const speed = useStudio((s) => s.speed);
  const activeAnimId = useStudio((s) => s.activeAnimId);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = ((now - last) / 1000) * useStudio.getState().speed;
      last = now;
      const state = useStudio.getState();
      const current = state.animations.find((a) => a.id === state.activeAnimId);
      if (!current) return;
      let next = state.time + dt;
      if (next >= current.duration) {
        if (current.loop) next = next % current.duration;
        else {
          state.setTime(current.duration);
          state.setPlaying(false);
          return;
        }
      }
      state.setTime(next);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, speed, activeAnimId]);

  return null;
}

export function StudioApp() {
  const step = useStudio((s) => s.step);
  const source = useStudio((s) => s.source);
  const busy = useStudio((s) => s.busy);
  const error = useStudio((s) => s.error);
  const setStep = useStudio((s) => s.setStep);
  const loadFile = useStudio((s) => s.loadFile);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiModalTab, setAiModalTab] = useState<"create" | "edit">("create");

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const onResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const state = useStudio.getState();
      if (e.code === "Space" && state.step === "motion" && state.source) {
        e.preventDefault();
        state.setPlaying(!state.playing);
      }
      if ((e.key === "Delete" || e.key === "Backspace") && state.step === "bones" && state.selectedId) {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        state.deleteJoint(state.selectedId);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className={cn(
        "flex min-h-dvh flex-col bg-bg text-fg",
        source && step !== "figure" && "h-dvh overflow-hidden",
      )}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) void loadFile(file);
      }}
    >
      <PlaybackClock />
      <Toaster theme="dark" position="bottom-center" />
      <header className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 md:px-6">
        <button
          type="button"
          className="flex items-center gap-2.5 text-fg"
          onClick={() => useStudio.getState().reset()}
        >
          <Mark className="size-7 text-accent" />
          <span className="font-display text-2xl font-medium tracking-tight">Marionette</span>
        </button>
        <p className="hidden text-sm text-muted md:block">Cut any picture into a stringed figure.</p>
        <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto md:justify-center">
          {STEPS.map((item) => {
            const active = item.id === step;
            const locked = item.id !== "figure" && !source;
            return (
              <button
                key={item.id}
                type="button"
                disabled={locked}
                onClick={() => setStep(item.id)}
                className={cn(
                  "flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150",
                  active ? "bg-elevated text-fg" : "text-muted hover:text-fg",
                  locked && "opacity-40",
                )}
              >
                <span className="font-mono text-xs text-subtle">{item.numeral}</span>
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setAiModalTab(source ? "edit" : "create");
              setAiModalOpen(true);
            }}
            className="flex items-center gap-1.5 border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-accent-fg"
          >
            <Sparkles className="size-4" />
            <span className="hidden sm:inline">AI Studio</span>
            <span className="sm:hidden">AI</span>
          </Button>
        </div>
      </header>

      {error ? (
        <div className="border-b border-border bg-elevated px-4 py-2 text-sm text-danger md:px-6">{error}</div>
      ) : null}

      <main className="relative flex min-h-0 flex-1 flex-col">
        {step === "figure" || !source ? <FigureStep /> : <Workbench />}
        {busy ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-bg/70">
            <div className="size-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            <p className="font-display text-2xl italic text-ivory">{busy}</p>
          </div>
        ) : null}
      </main>

      <AiImageModal
        open={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        defaultTab={aiModalTab}
      />
    </div>
  );
}

function FigureStep() {
  const loadFile = useStudio((s) => s.loadFile);
  const loadSample = useStudio((s) => s.loadSample);
  const conjure = useStudio((s) => s.conjure);
  const prompt = useStudio((s) => s.conjurePrompt);
  const setPrompt = useStudio((s) => s.setConjurePrompt);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-10 md:px-8 md:py-16">
      <div className="max-w-xl space-y-3">
        <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">Workshop</p>
        <h1 className="font-display text-4xl leading-tight font-medium tracking-tight text-balance md:text-6xl">
          A figure. Pins. Paper. Strings.
        </h1>
        <p className="max-w-md text-pretty text-muted">
          Drop a character, let the bench find its hinges, cut overlapping transparent parts, and
          export a labeled archive with a YAML rig — pivots, stop ranges, poses, and animation tracks.
        </p>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex min-h-44 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-10 text-center transition-colors duration-150 hover:border-pin hover:bg-elevated"
      >
        <FolderOpen className="size-6 text-muted" />
        <span className="font-display text-2xl">Drop a figure here</span>
        <span className="text-sm text-muted">PNG, JPG, or WebP. Front-facing, limbs unoccluded works best.</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void loadFile(file);
          }}
        />
      </button>

      <div className="grid gap-4 sm:grid-cols-3">
        {SAMPLES.map((sample) => (
          <button
            key={sample.id}
            type="button"
            onClick={() => void loadSample(sample.src, sample.name, sample.kind)}
            className="group overflow-hidden rounded-xl bg-surface text-left shadow-border"
          >
            <div className="aspect-figure overflow-hidden bg-elevated">
              <img
                src={sample.src}
                alt={sample.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-1 p-3">
              <span className="font-display text-xl">{sample.name}</span>
              <span className="text-sm text-muted">{sample.blurb}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3.5 rounded-xl border border-border bg-surface p-5 shadow-border">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-accent" />
            <Label htmlFor="conjure" className="font-display text-lg text-fg">
              Create figure with Gemini
            </Label>
          </div>
          <Badge variant="outline" className="text-xs font-mono border-accent/40 text-accent">
            gemini-3.1-flash-image-preview
          </Badge>
        </div>
        <p className="text-sm text-muted">
          Describe any character, creature, or puppet. Gemini will generate a full-body isolated figure ready for string rigging.
        </p>
        <div className="flex flex-wrap gap-1.5 pb-1">
          {[
            "Steampunk brass automaton",
            "Origami paper warrior",
            "Stained-glass fairy",
            "Tin rabbit in waistcoat",
            "Porcelain ballerina",
          ].map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setPrompt(style)}
              className="rounded-md border border-border bg-elevated/60 px-2.5 py-1 text-xs text-muted hover:bg-elevated hover:text-fg transition-colors"
            >
              {style}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="conjure"
            value={prompt}
            placeholder="e.g. A clockwork clockmaker with brass spectacles and gears"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void conjure();
            }}
            className="flex-1"
          />
          <Button onClick={() => void conjure()} className="shrink-0 gap-2">
            <Sparkles className="size-4" />
            Create Figure
          </Button>
        </div>
      </div>
    </div>
  );
}

function Workbench() {
  const step = useStudio((s) => s.step);
  const attachments = useStudio((s) => s.attachments);
  return (
    <div className="grid h-full min-h-0 flex-1 grid-cols-[auto_1fr_auto] p-4 gap-4 overflow-auto">
      <aside className="flex flex-col gap-2">
        {step === "bones" ? <BonesInspectorSidebar /> : null}
      </aside>
      <section className="flex min-h-0 flex-col gap-3 overflow-auto">
        <div className="min-h-0 flex-1 rounded-xl bg-surface border border-border">
          <StageCanvas mode={step === "bones" ? "bones" : "puppet"} />
        </div>
        {step === "parts" || step === "archive" ? <PartTiles attachments={attachments} /> : null}
        {step === "motion" ? <Timeline /> : null}
      </section>
      <aside className="h-full w-80">
        <ScrollArea className="h-full rounded-xl border border-border bg-surface">
          <div className="flex flex-col gap-5 p-4">
            {step === "bones" ? <BonesInspector /> : null}
            {step === "parts" ? <PartsInspector /> : null}
            {step === "motion" ? <MotionInspector /> : null}
            {step === "archive" ? <ArchiveInspector /> : null}
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}

function BonesInspectorSidebar() {
  const pinMode = useStudio((s) => s.pinMode);
  return (
      <div className="flex flex-col gap-2">
        <Button 
          variant="outline" 
          className="size-11 p-0 flex items-center justify-center" 
          onClick={() => useStudio.getState().setPinMode(pinMode === "pin" ? "adjust" : "pin")}
          title={pinMode === "pin" ? "Done pinning" : "Place bones"}
        >
          <Pin className="size-5" />
        </Button>
        <Button 
          variant="outline" 
          className="size-11 p-0 flex items-center justify-center" 
          onClick={() => void useStudio.getState().autoPin()}
          title="Auto-pin"
        >
          <RotateCcw className="size-5" />
        </Button>
        <Button 
          className="size-11 p-0 flex items-center justify-center" 
          onClick={() => void useStudio.getState().askGrokToPin()}
          title="Ask Gemini to pin"
        >
          <Wand2 className="size-5" />
        </Button>
      </div>
  );
}

function BonesInspector() {
  const kind = useStudio((s) => s.kind);
  const joints = useStudio((s) => s.joints);
  const selectedId = useStudio((s) => s.selectedId);
  const pinMode = useStudio((s) => s.pinMode);
  const pinIndex = useStudio((s) => s.pinIndex);
  const busy = useStudio((s) => s.busy);
  const selected = joints.find((j) => j.id === selectedId) ?? null;
  const next = joints[pinIndex];

  return (
    <>
      <div className="space-y-1">
        <h2 className="font-display text-2xl">Bones</h2>
        <p className="text-sm text-pretty text-muted">
          Drag pins onto hinges. Or walk the skeleton by placing each joint in order.
        </p>
      </div>
      <div className="space-y-2">
        <Label>Skeleton</Label>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(KIND_LABEL) as SkeletonKind[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => useStudio.getState().setKind(k)}
              className={cn(
                "size-11 rounded-lg flex items-center justify-center text-xs",
                k === kind ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
              )}
              title={KIND_LABEL[k]}
            >
              {KIND_LABEL[k].slice(0, 2)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-elevated/40 p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-fg flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-accent" />
            Edit Figure with Gemini
          </span>
          <Badge variant="outline" className="text-[10px] font-mono border-accent/30 text-accent py-0">
            gemini-3.1-flash-image-preview
          </Badge>
        </div>
        <p className="text-xs text-muted">
          Modify the costume, accessories, or materials of this figure.
        </p>
        <div className="flex flex-wrap gap-1">
          {[
            "Add crown & cape",
            "Steampunk goggles & gears",
            "Dragon wings",
            "Weathered bronze",
          ].map((quick) => (
            <button
              key={quick}
              type="button"
              onClick={() => useStudio.getState().setEditPrompt(quick)}
              className="rounded border border-border bg-elevated px-2 py-0.5 text-[11px] text-muted hover:text-fg"
            >
              {quick}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          <Input
            value={useStudio((s) => s.editPrompt)}
            onChange={(e) => useStudio.getState().setEditPrompt(e.target.value)}
            placeholder="e.g. Add golden crown & wings..."
            className="h-8 text-xs"
            onKeyDown={(e) => {
              if (e.key === "Enter") void useStudio.getState().editImage();
            }}
          />
          <Button
            size="sm"
            className="size-8 shrink-0 p-0 flex items-center justify-center"
            disabled={!useStudio((s) => s.editPrompt).trim()}
            onClick={() => void useStudio.getState().editImage()}
            title="Edit Figure"
          >
            <Wand2 className="size-4" />
          </Button>
        </div>
      </div>

      {pinMode === "pin" && next ? (
        <p className="rounded-md bg-elevated px-3 py-2 text-sm text-ivory">
          Click the <span className="font-medium">{next.label}</span>
        </p>
      ) : null}
      {selected ? <JointFields joint={selected} /> : <p className="text-sm text-muted">Select a pin to edit its range.</p>}
      <Button
        onClick={() => void useStudio.getState().cutPaper()}
        disabled={busy !== null}
        className="gap-2"
      >
        <Scissors className="size-4" />
        {busy?.includes("Cutting") ? "Cutting paper..." : "Cut paper"}
      </Button>
    </>
  );
}

function JointFields({ joint }: { joint: Joint }) {
  const j = useStudio((s) => s.joints.find((x) => x.id === joint.id));
  const update = useStudio((s) => s.updateJoint);
  if (!j) return null;
  return (
    <div className="space-y-3 rounded-lg bg-elevated p-3 shadow-border">
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium">{j.label}</p>
        <button
          type="button"
          className="flex size-11 items-center justify-center text-muted hover:text-danger"
          onClick={() => useStudio.getState().deleteJoint(j.id)}
          aria-label="Remove joint"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
      <Field label="Min angle" value={j.minAngle} min={-180} max={180} onChange={(v) => update(j.id, { minAngle: v })} />
      <Field label="Max angle" value={j.maxAngle} min={-180} max={180} onChange={(v) => update(j.id, { maxAngle: v })} />
      <Field label="Thickness" value={Math.round(j.thickness)} min={4} max={80} onChange={(v) => update(j.id, { thickness: v })} />
      <Button variant="outline" size="sm" className="w-full" onClick={() => useStudio.getState().toggleSweep(j.id)}>
        Sweep range of motion
      </Button>
    </div>
  );
}

function Field({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="font-mono text-xs tabular-nums text-muted">{value}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={1} onValueChange={(v) => onChange(v[0] ?? value)} />
    </div>
  );
}

function PartsInspector() {
  const attachments = useStudio((s) => s.attachments);
  const needReview = useStudio((s) => s.attachmentsNeedReview);
  const selectedId = useStudio((s) => s.selectedId);
  const busy = useStudio((s) => s.busy);

  return (
    <>
      <div className="space-y-1">
        <h2 className="font-display text-2xl">Parts</h2>
        <p className="text-sm text-pretty text-muted">
          Each limb is a transparent paper layer with extra paper over the parent pivot, so the hinge stays
          covered through motion.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {needReview ? (
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30">Pins moved — recut</Badge>
            <Button
              size="sm"
              variant="outline"
              className="h-6 text-[10px]"
              onClick={() => useStudio.getState().setAttachmentsNeedReview(false)}
            >
              Mark Reviewed
            </Button>
          </div>
        ) : (
          <Badge>{attachments.length} cutout layers</Badge>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => void useStudio.getState().cutPaper()}
          disabled={busy !== null}
          className="flex-1 gap-2"
        >
          <Scissors className="size-4" />
          {busy?.includes("Cutting") ? "Cutting..." : attachments.length ? "Recut parts" : "Cut paper"}
        </Button>
        {attachments.length > 0 ? (
          <Button variant="outline" onClick={() => useStudio.getState().setStep("motion")}>
            Motion
          </Button>
        ) : null}
      </div>

      {attachments.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-6 text-center space-y-2">
          <Scissors className="mx-auto size-8 text-muted" />
          <p className="text-sm font-medium text-fg">No paper parts cut yet</p>
          <p className="text-xs text-muted">
            Click "Cut paper" above to partition your figure into articulated limbs.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Limb Layers</p>
          <div className="grid grid-cols-2 gap-2">
            {attachments.map((part) => {
              const isSelected = selectedId === part.boneId;
              return (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => useStudio.getState().setSelected(part.boneId)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border p-2 text-left transition-all",
                    isSelected
                      ? "border-accent bg-accent/15 ring-1 ring-accent"
                      : "border-border bg-elevated/60 hover:bg-elevated text-muted hover:text-fg"
                  )}
                >
                  <div className="checker-tile relative flex aspect-square w-full items-center justify-center overflow-hidden rounded bg-black/10">
                    <img src={part.dataUrl} alt={part.label} className="h-full w-full object-contain p-1" />
                    {part.repaired && (
                      <div className="absolute top-1 right-1 bg-emerald-500/80 size-2 rounded-full" title="Mask repaired" />
                    )}
                  </div>
                  <div className="w-full truncate text-center">
                    <span className="block truncate text-xs font-medium text-fg">{part.label}</span>
                    <span className="text-[10px] text-muted">{part.width}×{part.height}px</span>
                    <div
                      className={cn(
                        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-fg",
                        "size-8 mt-1 cursor-pointer flex items-center justify-center"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        useStudio.getState().setBrush({ enabled: true, attachmentId: part.id });
                      }}
                      role="button"
                      title="Edit Mask"
                    >
                      <Paintbrush className="size-4" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      <BrushEditor />
    </>
  );
}

function MotionInspector() {
  const prompt = useStudio((s) => s.motionPrompt);
  const setPrompt = useStudio((s) => s.setMotionPrompt);
  const animations = useStudio((s) => s.animations);
  const active = useStudio((s) => s.activeAnimId);
  const playing = useStudio((s) => s.playing);
  const speed = useStudio((s) => s.speed);

  return (
    <>
      <div className="space-y-1">
        <h2 className="font-display text-2xl">Motion</h2>
        <p className="text-sm text-pretty text-muted">
          Preset cycles, or prompt a walk, hunt, spawn — anything the joints can bear.
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {PRESET_MOTIONS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => useStudio.getState().playPreset(m.id)}
            className={cn(
              "h-9 rounded-full px-3 text-xs",
              active === m.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="motion">Direct with a prompt</Label>
        <Textarea
          id="motion"
          value={prompt}
          placeholder="hunting stalk, then a pounce"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button className="w-full" onClick={() => void useStudio.getState().askGrokToDirect()}>
          <Wand2 />
          Direct the puppet
        </Button>
      </div>
      <Button variant="secondary" className="w-full" onClick={() => useStudio.getState().setPlaying(!playing)}>
        {playing ? <Pause /> : <Play className="ml-0.5" />}
        {playing ? "Pause" : "Play"}
      </Button>
      <Field
        label="Speed"
        value={Math.round(speed * 100)}
        min={40}
        max={200}
        onChange={(v) => useStudio.getState().setSpeed(v / 100)}
      />
      {animations.length ? (
        <ul className="space-y-1 text-sm">
          {animations.map((anim) => (
            <li key={anim.id}>
              <button
                type="button"
                className={cn("w-full rounded-md px-2 py-2 text-left", anim.id === active ? "bg-elevated" : "text-muted")}
                onClick={() =>
                  useStudio.setState({ activeAnimId: anim.id, time: 0, playing: true, step: "motion" })
                }
              >
                {anim.name}
                <span className="ml-2 font-mono text-xs tabular-nums text-subtle">{anim.duration.toFixed(2)}s</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <Button variant="outline" onClick={() => useStudio.getState().setStep("archive")}>
        Pack the archive
      </Button>
    </>
  );
}

function Timeline() {
  const time = useStudio((s) => s.time);
  const animations = useStudio((s) => s.animations);
  const active = useStudio((s) => s.activeAnimId);
  const onionSkinning = useStudio((s) => s.onionSkinning);
  const anim = animations.find((a) => a.id === active);
  if (!anim) return null;
  return (
    <div className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2 shadow-border">
      <Button
        variant={onionSkinning ? "default" : "ghost"}
        size="icon"
        className="size-8"
        onClick={() => useStudio.getState().toggleOnionSkinning()}
        title="Toggle onion skinning"
      >
        <Ghost className="size-4" />
      </Button>
      <span className="font-mono text-xs tabular-nums text-muted">
        {time.toFixed(2)} / {anim.duration.toFixed(2)}s
      </span>
      <Slider
        value={[Math.min(anim.duration, time)]}
        min={0}
        max={anim.duration}
        step={0.01}
        onValueChange={(v) => {
          useStudio.getState().setPlaying(false);
          useStudio.getState().setTime(v[0] ?? 0);
        }}
      />
    </div>
  );
}

function ArchiveInspector() {
  const source = useStudio((s) => s.source);
  const joints = useStudio((s) => s.joints);
  const attachments = useStudio((s) => s.attachments);
  const animations = useStudio((s) => s.animations);
  const name = source?.name ?? "puppet";

  async function download() {
    if (!source) return;
    if (!attachments.length) await useStudio.getState().cutPaper();
    const state = useStudio.getState();
    if (!state.source || !state.attachments.length) {
      toast.error("Cut parts before packing");
      return;
    }
    const { blob, filename } = await buildArchive(state.source, state.joints, state.attachments, state.animations);
    downloadBlob(blob, filename);
    toast.success("Archive packed");
  }

  function copyYaml() {
    if (!source) return;
    void navigator.clipboard.writeText(toYaml(source, joints, attachments, animations));
    toast.success("YAML copied");
  }

  const yaml = source ? toYaml(source, joints, attachments, animations) : "";

  return (
    <>
      <div className="space-y-1">
        <h2 className="font-display text-2xl">Archive</h2>
        <p className="text-sm text-pretty text-muted">
          A zip of labeled transparent parts plus YAML that names every rotation point, stop, pose,
          and track.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="puppet-name">Name</Label>
        <Input id="puppet-name" value={name} onChange={(e) => useStudio.getState().setName(e.target.value)} />
      </div>
      <Button className="w-full" onClick={() => void download()}>
        <Download />
        Download puppet zip
      </Button>
      <Button variant="outline" className="w-full" onClick={copyYaml}>
        Copy YAML
      </Button>
      <Separator />
      <pre className="max-h-80 overflow-auto rounded-md bg-elevated p-3 font-mono text-xs leading-relaxed text-muted">
        {yaml}
      </pre>
    </>
  );
}
