import { create } from "zustand";
import { analyzeFigure, composeAnimation, conjureFigure, editFigureImage, extractJson } from "@/lib/ai/puppet-ai";
import { anglesAt, presetAnimation, normalizeAiAnimation } from "./animate";
import { cutParts } from "./cut-parts";
import {
  buildFigureMask,
  detectBackground,
  fileToDataUrl,
  jpegForVision,
  loadHtmlImage,
  prepareSource,
  readImageData,
} from "./image";
import { applyAiJoints, placeFromSilhouette } from "./silhouette";
import { KIND_LABEL } from "./templates";
import type {
  AnimationDef,
  Attachment,
  PartMask,
  BackgroundKey,
  Joint,
  SkeletonKind,
  SourceFigure,
  StudioStep,
  BrushState,
} from "./types";

type PinMode = "adjust" | "pin";

type StudioState = {
  step: StudioStep;
  source: SourceFigure | null;
  bg: BackgroundKey | null;
  kind: SkeletonKind;
  joints: Joint[];
  selectedId: string | null;
  pinMode: PinMode;
  pinIndex: number;
  attachments: Attachment[];
  attachmentsNeedReview: boolean;
  partDraftVersion: number;
  jointVersion: number;
  brush: BrushState;
  onionSkinning: boolean;
  animations: AnimationDef[];
  activeAnimId: string | null;
  playing: boolean;
  time: number;
  speed: number;
  sweepId: string | null;
  busy: string | null;
  error: string | null;
  conjurePrompt: string;
  editPrompt: string;
  motionPrompt: string;
  setStep: (step: StudioStep) => void;
  setKind: (kind: SkeletonKind) => void;
  setName: (name: string) => void;
  setConjurePrompt: (v: string) => void;
  setEditPrompt: (v: string) => void;
  setMotionPrompt: (v: string) => void;
  setSelected: (id: string | null) => void;
  setPinMode: (mode: PinMode) => void;
  moveJoint: (id: string, x: number, y: number) => void;
  updateJoint: (id: string, patch: Partial<Joint>) => void;
  deleteJoint: (id: string) => void;
  needsRecut: () => boolean;
  loadFile: (file: File) => Promise<void>;
  loadDataUrl: (dataUrl: string, name: string, kind?: SkeletonKind) => Promise<void>;
  loadSample: (src: string, name: string, kind: SkeletonKind) => Promise<void>;
  tryExample: (src: string, name: string, kind: SkeletonKind) => Promise<void>;
  conjure: () => Promise<void>;
  editImage: () => Promise<void>;
  autoPin: () => Promise<void>;
  askGrokToPin: () => Promise<void>;
  placeNextPin: (x: number, y: number) => void;
  cutPaper: () => Promise<void>;
  playPreset: (id: string) => void;
  askGrokToDirect: () => Promise<void>;
  setPlaying: (playing: boolean) => void;
  setTime: (time: number) => void;
  setSpeed: (speed: number) => void;
  toggleOnionSkinning: () => void;
  setBrush: (brush: Partial<BrushState>) => void;
  updateAttachmentMask: (attachmentId: string, newMask: PartMask | Uint8Array) => void;
  saveAttachmentCut: (
    attachmentId: string,
    maskArray: Uint8Array,
    cutDataUrl: string,
    alphaPngDataUrl: string,
    pixelCount: number,
  ) => void;
  setAttachmentsNeedReview: (need: boolean) => void;
  toggleSweep: (id: string | null) => void;
  currentAngles: () => Record<string, number>;
  reset: () => void;
};

const blankBg: BackgroundKey = { r: 28, g: 25, b: 22, threshold: 36, lift: true };
const decodeCache = new Map<string, { source: SourceFigure; bg: BackgroundKey; mask: Uint8Array }>();

async function decodeFigure(dataUrl: string, name: string): Promise<{
  source: SourceFigure;
  bg: BackgroundKey;
  mask: Uint8Array;
}> {
  if (decodeCache.has(dataUrl)) return decodeCache.get(dataUrl)!;
  const prepared = await prepareSource(dataUrl);
  const img = await loadHtmlImage(prepared.dataUrl);
  const imageData = readImageData(img);
  const bg = detectBackground(imageData);
  const mask = buildFigureMask(imageData, bg);
  const result = {
    source: { dataUrl: prepared.dataUrl, width: prepared.width, height: prepared.height, name },
    bg,
    mask,
  };
  decodeCache.set(dataUrl, result);
  return result;
}

export const useStudio = create<StudioState>((set, get) => ({
  step: "figure",
  source: null,
  bg: null,
  kind: "humanoid",
  joints: [],
  selectedId: null,
  pinMode: "adjust",
  pinIndex: 0,
  attachments: [],
  attachmentsNeedReview: false,
  partDraftVersion: 0,
  jointVersion: 0,
  brush: {
    mode: "add",
    radius: 20,
    opacity: 1,
    enabled: false,
    attachmentId: null,
  },
  onionSkinning: false,
  animations: [],
  activeAnimId: null,
  playing: false,
  time: 0,
  speed: 1,
  sweepId: null,
  busy: null,
  error: null,
  conjurePrompt: "",
  editPrompt: "",
  motionPrompt: "",
  setStep: (step) => {
    set({ step, error: null });
    if (step === "parts" && get().source && get().joints.length) {
      if (!get().attachments.length && !get().busy) {
        void get().cutPaper();
      }
    }
  },
  setKind: (kind) => {
    const { source, bg } = get();
    set({ kind });
    if (!source) return;
    void (async () => {
      const img = await loadHtmlImage(source.dataUrl);
      const imageData = readImageData(img);
      const key = bg ?? detectBackground(imageData);
      const mask = buildFigureMask(imageData, key);
      const joints = placeFromSilhouette(mask, source.width, source.height, kind);
      set({ 
        joints, 
        attachments: [], 
        attachmentsNeedReview: false, 
        jointVersion: get().jointVersion + 1,
        partDraftVersion: 0,
        selectedId: joints[0]?.id ?? null 
      });
    })();
  },
  setName: (name) => {
    const source = get().source;
    if (!source) return;
    set({ source: { ...source, name } });
  },
  setConjurePrompt: (v) => set({ conjurePrompt: v }),
  setEditPrompt: (v) => set({ editPrompt: v }),
  setMotionPrompt: (v) => set({ motionPrompt: v }),
  setSelected: (id) => set({ selectedId: id }),
  setPinMode: (mode) => set({ pinMode: mode, pinIndex: 0 }),
  moveJoint: (id, x, y) => {
    const { source } = get();
    if (!source) return;
    set({
      joints: get().joints.map((j) =>
        j.id === id
          ? {
              ...j,
              x: Math.max(1, Math.min(source.width - 2, x)),
              y: Math.max(1, Math.min(source.height - 2, y)),
            }
          : j,
      ),
      jointVersion: get().jointVersion + 1,
      attachmentsNeedReview: get().attachments.length > 0,
    });
  },
  updateJoint: (id, patch) => {
    const { jointVersion, attachments } = get();
    set({
      joints: get().joints.map((j) => (j.id === id ? { ...j, ...patch } : j)),
      jointVersion: jointVersion + 1,
      attachmentsNeedReview: attachments.length > 0,
    });
  },
  deleteJoint: (id) => {
    const { selectedId, jointVersion, attachments } = get();
    set({
      joints: get()
        .joints.filter((j) => j.id !== id)
        .map((j) => (j.parentId === id ? { ...j, parentId: null } : j)),
      selectedId: selectedId === id ? null : selectedId,
      attachments: attachments.filter((attachment) => attachment.boneId !== id),
      jointVersion: jointVersion + 1,
      attachmentsNeedReview: attachments.length > 0,
    });
  },
  loadFile: async (file) => {
    const dataUrl = await fileToDataUrl(file);
    const name = file.name.replace(/\.[^.]+$/, "") || "Figure";
    await get().loadDataUrl(dataUrl, name);
  },
  loadDataUrl: async (dataUrl, name, kind) => {
    set({ busy: "Preparing the figure", error: null });
    try {
      const { source, bg, mask } = await decodeFigure(dataUrl, name);
      const usedKind = kind ?? get().kind;
      const joints = placeFromSilhouette(mask, source.width, source.height, usedKind);
      set({
        source,
        bg,
        kind: usedKind,
        joints,
        selectedId: joints[0]?.id ?? null,
        attachments: [],
        attachmentsNeedReview: false,
        jointVersion: 1,
        partDraftVersion: 0,
        animations: [],
        activeAnimId: null,
        playing: false,
        time: 0,
        step: "bones",
        busy: null,
        pinMode: "adjust",
        pinIndex: 0,
      });
    } catch (err) {
      set({ busy: null, error: err instanceof Error ? err.message : "Could not load the figure" });
    }
  },
  loadSample: async (src, name, kind) => {
    set({ busy: "Opening the example", error: null, kind });
    try {
      const img = await loadHtmlImage(src);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas is unavailable");
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      await get().loadDataUrl(dataUrl, name, kind);
      const state = get();
    } catch (err) {
      set({ busy: null, error: err instanceof Error ? err.message : "Could not open the example" });
    }
  },
  tryExample: async (src, name, kind) => {
    await get().loadSample(src, name, kind);
  },
  conjure: async () => {
    const prompt = get().conjurePrompt.trim();
    if (!prompt) {
      set({ error: "Describe the figure first" });
      return;
    }
    set({ busy: "Conjuring a figure", error: null });
    try {
      const result = await conjureFigure({ data: { prompt } });
      if (!result.ok) {
        set({ busy: null, error: result.error });
        return;
      }
      await get().loadDataUrl(result.dataUrl, prompt.slice(0, 42), get().kind);
    } catch (err) {
      set({ busy: null, error: err instanceof Error ? err.message : "Conjure failed" });
    }
  },
  editImage: async () => {
    const { source, editPrompt, kind } = get();
    if (!source) return;
    const prompt = editPrompt.trim();
    if (!prompt) {
      set({ error: "Describe the image edit first" });
      return;
    }
    set({ busy: "Editing figure with Gemini", error: null });
    try {
      const result = await editFigureImage({
        data: {
          prompt,
          imageDataUrl: source.dataUrl,
        },
      });
      if (!result.ok) {
        set({ busy: null, error: result.error });
        return;
      }
      await get().loadDataUrl(result.dataUrl, `${source.name} (edited)`, kind);
      set({ editPrompt: "" });
    } catch (err) {
      set({ busy: null, error: err instanceof Error ? err.message : "Image edit failed" });
    }
  },
  autoPin: async () => {
    const { source, bg, kind } = get();
    if (!source) {
      set({ error: "Load a figure first" });
      return;
    }
    set({ busy: "Auto-pinning skeleton...", error: null });
    try {
      const img = await loadHtmlImage(source.dataUrl);
      const imageData = readImageData(img);
      const key = bg ?? detectBackground(imageData);
      const mask = buildFigureMask(imageData, key);
      const joints = placeFromSilhouette(mask, source.width, source.height, kind);
      set({ 
        joints, 
        selectedId: joints[0]?.id ?? null, 
        jointVersion: get().jointVersion + 1,
        attachmentsNeedReview: true,
        bg: key,
        busy: null,
      });
    } catch (e) {
      set({ busy: null, error: e instanceof Error ? e.message : "Auto-pin failed" });
    }
  },
  askGrokToPin: async () => {
    const { source, kind } = get();
    if (!source) return;
    set({ busy: "Reading the figure", error: null });
    try {
      const vision = await jpegForVision(source.dataUrl);
      const result = await analyzeFigure({
        data: { imageDataUrl: vision, hint: `Prefer a ${kind} skeleton.` },
      });
      if (!result.ok) {
        set({ busy: null, error: result.error });
        return;
      }
      const parsed = extractJson(result.text) as {
        name?: string;
        kind?: string;
        joints?: Array<{
          id: string;
          label?: string;
          parent?: string | null;
          x: number;
          y: number;
          thickness?: number;
          min_angle?: number;
          max_angle?: number;
          z_index?: number;
        }>;
      };
      const fallback = get().joints;
      const joints = applyAiJoints(parsed.joints ?? [], source.width, source.height, fallback);
      const nextKind =
        parsed.kind && parsed.kind in KIND_LABEL ? (parsed.kind as SkeletonKind) : kind;
      set({
        joints,
        selectedId: joints[0]?.id ?? null,
        jointVersion: get().jointVersion + 1,
        attachmentsNeedReview: get().attachments.length > 0,
        busy: null,
        source: parsed.name ? { ...source, name: parsed.name } : source,
        kind: nextKind,
      });
    } catch (err) {
      set({ busy: null, error: err instanceof Error ? err.message : "Could not read the figure" });
    }
  },
  placeNextPin: (x, y) => {
    const { joints, pinIndex, source } = get();
    if (!source || !joints.length) return;
    const joint = joints[pinIndex];
    if (!joint) {
      set({ pinMode: "adjust" });
      return;
    }
    get().moveJoint(joint.id, x, y);
    const next = pinIndex + 1;
    set({
      pinIndex: next,
      selectedId: joint.id,
      pinMode: next >= joints.length ? "adjust" : "pin",
    });
  },
  cutPaper: async () => {
    const draftVersion = get().jointVersion;
    const { source, joints, bg, attachments, partDraftVersion } = get();
    if (!source || !joints.length) return;

    // Optimization: If parts already cut and joints haven't changed, just move to next step
    if (attachments.length && partDraftVersion === draftVersion) {
      set({ step: "parts" });
      return;
    }

    set({ busy: "Cutting paper into parts...", error: null });
    try {
      let activeBg = bg;
      if (!activeBg) {
        try {
          const img = await loadHtmlImage(source.dataUrl);
          const imageData = readImageData(img);
          activeBg = detectBackground(imageData);
        } catch {
          activeBg = blankBg;
        }
      }
      
      const parts = await cutParts(source.dataUrl, joints, activeBg ?? blankBg);
      if (!parts.length) {
        throw new Error("No parts could be cut from the silhouette. Please check pin placements.");
      }
      
      const animations = get().animations.length
        ? get().animations
        : [presetAnimation("idle", joints), presetAnimation("walk", joints)];
      
      set({
        attachments: parts.map((p) => {
          // Preserve mask/repair state if exists
          const existing = attachments.find(a => a.id === p.id);
          return existing ? { ...p, mask: existing.mask, sourceVersion: existing.sourceVersion, repaired: existing.repaired } : { ...p, sourceVersion: 0, repaired: false };
        }),
        attachmentsNeedReview: false, // Resetting review flag since we just did a fresh cut
        partDraftVersion: draftVersion,
        busy: null,
        animations,
        activeAnimId: get().activeAnimId ?? animations[0]?.id ?? null,
        step: "parts",
        bg: activeBg,
      });
    } catch (err) {
      set({ busy: null, error: err instanceof Error ? err.message : "Cut failed" });
    }
  },
  playPreset: (id) => {
    const anim = presetAnimation(id, get().joints);
    const existing = get().animations.filter((a) => a.id !== anim.id);
    set({
      animations: [...existing, anim],
      activeAnimId: anim.id,
      playing: true,
      time: 0,
      step: "motion",
    });
  },
  askGrokToDirect: async () => {
    const prompt = get().motionPrompt.trim();
    const { joints } = get();
    if (!prompt) {
      set({ error: "Describe the motion first" });
      return;
    }
    if (!joints.length) return;
    set({ busy: "Directing the puppet", error: null });
    try {
      const result = await composeAnimation({
        data: {
          prompt,
          joints: joints.map((j) => ({
            id: j.id,
            label: j.label,
            minAngle: j.minAngle,
            maxAngle: j.maxAngle,
          })),
        },
      });
      if (!result.ok) {
        set({ busy: null, error: result.error });
        return;
      }
      const parsed = extractJson(result.text) as Parameters<typeof normalizeAiAnimation>[0];
      const anim = normalizeAiAnimation(parsed, joints, prompt);
      const existing = get().animations.filter((a) => a.id !== anim.id);
      set({
        animations: [...existing, anim],
        activeAnimId: anim.id,
        playing: true,
        time: 0,
        busy: null,
        step: "motion",
      });
    } catch (err) {
      set({ busy: null, error: err instanceof Error ? err.message : "Could not direct the puppet" });
    }
  },
  setPlaying: (playing) => set({ playing }),
  setTime: (time) => set({ time }),
  setSpeed: (speed) => set({ speed }),
  toggleOnionSkinning: () => set((s) => ({ onionSkinning: !s.onionSkinning })),
  setBrush: (brush) => set((s) => ({ brush: { ...s.brush, ...brush } })),
  updateAttachmentMask: (attachmentId, newMask) => {
    set((s) => ({
      attachments: s.attachments.map((a) => {
        if (a.id !== attachmentId) return a;
        const isPartMask = typeof newMask === "object" && newMask !== null && "bboxX" in newMask;
        const updatedMask: PartMask = isPartMask
          ? (newMask as PartMask)
          : { ...a.mask, pixelMask: newMask as Uint8Array };
        return {
          ...a,
          mask: updatedMask,
          repaired: true,
          sourceVersion: a.sourceVersion + 1,
        };
      }),
    }));
  },
  saveAttachmentCut: (attachmentId, maskArray, cutDataUrl, alphaPngDataUrl, pixelCount) => {
    set((s) => ({
      attachments: s.attachments.map((a) => {
        if (a.id !== attachmentId) return a;
        return {
          ...a,
          dataUrl: cutDataUrl,
          pixelCount,
          repaired: true,
          sourceVersion: a.sourceVersion + 1,
          mask: {
            ...a.mask,
            alphaPngDataUrl,
            pixelMask: new Uint8Array(maskArray),
            source: "edited",
          },
        };
      }),
      attachmentsNeedReview: false,
    }));
  },
  setAttachmentsNeedReview: (need) => set({ attachmentsNeedReview: need }),
  toggleSweep: (id) => set({ sweepId: get().sweepId === id ? null : id, playing: false }),
  currentAngles: () => {
    const { joints, animations, activeAnimId, time } = get();
    const anim = animations.find((a) => a.id === activeAnimId) ?? null;
    return anglesAt(joints, anim, time);
  },
  reset: () => {
    decodeCache.clear();
    set({
      step: "figure",
      source: null,
      bg: null,
      joints: [],
      selectedId: null,
      attachments: [],
      attachmentsNeedReview: false,
      partDraftVersion: 0,
      jointVersion: 0,
      animations: [],
      activeAnimId: null,
      playing: false,
      time: 0,
      busy: null,
      error: null,
      sweepId: null,
      brush: { mode: "add", radius: 20, opacity: 1, enabled: false, attachmentId: null },
    });
  },
    needsRecut: () => {
      const { attachments, attachmentsNeedReview, partDraftVersion, jointVersion } = get();
      return !!attachments.length && (attachmentsNeedReview || partDraftVersion !== jointVersion);
    },
}));
