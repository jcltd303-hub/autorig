import { createServerFn } from "@tanstack/react-start";
import { runExtractionPipeline } from "./pipeline";
import { extractJson } from "./diagnostics";
import { geminiChat, geminiImage, geminiEditImage } from "./gemini-provider";

export { extractJson };

type ChatOk = { ok: true; text: string };
type ChatErr = { ok: false; error: string };

type AnalyzeInput = {
  imageDataUrl: string;
  hint?: string;
  pins?: {
    requiredIds?: string[];
    anchors?: Array<{ id: string; x?: number; y?: number; tolerance?: number; required?: boolean }>;
    regions?: Array<{ id: string; x: number; y: number; width: number; height: number; priority?: number }>;
    graph?: Array<{ childId: string; parentId: string | null }>;
    orientation?: "front" | "back" | "left" | "right" | "unknown";
    scale?: "full-body" | "cropped" | "unknown";
    visibility?: Record<string, "visible" | "occluded" | "unknown">;
    semanticHint?: string;
  };
  policy?: {
    primaryProvider?: string;
    fallbackProviders?: string[];
    ensembleProviders?: string[];
    maxAttempts?: number;
    enableRegionalRetry?: boolean;
    enableEnsemble?: boolean;
    minScore?: number;
    consensusThreshold?: number;
  };
};

export const analyzeFigure = createServerFn({ method: "POST" })
  .validator((input: AnalyzeInput) => input)
  .handler(async ({ data }) => {
    try {
      const result = await runExtractionPipeline(data);
      return {
        ok: true as const,
        text: JSON.stringify({
          name: result.candidate.name,
          kind: result.candidate.kind,
          joints: result.candidate.joints.map((j) => ({
            id: j.id,
            label: j.label,
            parent: j.parentId,
            x: j.x,
            y: j.y,
            thickness: j.thickness,
            min_angle: j.minAngle,
            max_angle: j.maxAngle,
            z_index: j.zIndex,
          })),
        }),
      } satisfies ChatOk;
    } catch (error) {
      return { ok: false as const, error: error instanceof Error ? error.message : "AI extraction failed" } satisfies ChatErr;
    }
  });

export const composeAnimation = createServerFn({ method: "POST" })
  .validator((input: { prompt: string; joints: Array<{ id: string; label: string; minAngle: number; maxAngle: number }> }) => input)
  .handler(async ({ data }) => {
    const list = data.joints.map((j) => `- ${j.id} (${j.label}) range ${j.minAngle}..${j.maxAngle}`).join("\n");
    const prompt = `You are a 2D puppet animator. Create an animation for: ${JSON.stringify(data.prompt)}\nAvailable joints:\n${list}\n\nReturn ONLY JSON:\n{\n  "id": string,\n  "name": string,\n  "duration": number,\n  "loop": boolean,\n  "tracks": { "<joint_id>": [ { "t": number, "angle": number, "ease": "sine" | "linear" | "quad-out" | "quad-in" } ] }\n}\nRules: t is 0–1; duration 0.4–4 seconds; stay inside each joint range; 3–8 keys per moving track; walk/run loops and opposes arms vs legs.`;
    return geminiChat([{ role: "user", content: prompt }], 1800);
  });

export const conjureFigure = createServerFn({ method: "POST" })
  .validator((input: { prompt: string }) => input)
  .handler(async ({ data }) => {
    const prompt = `Full-body standing figure of ${data.prompt}, filling the frame from head to toe, front-facing, feet slightly apart, both arms held away from the torso so every limb is unoccluded and fully visible, isolated on a perfectly even flat dark charcoal studio backdrop the color of #1c1916, no floor, no cast shadow, no props, even museum lighting, photoreal photograph of a crafted puppet, figurine, or paper figure, 3:4 portrait.`;
    return geminiImage(prompt);
  });

export const editFigureImage = createServerFn({ method: "POST" })
  .validator((input: { prompt: string; imageDataUrl: string }) => input)
  .handler(async ({ data }) => {
    return geminiEditImage(data.prompt, data.imageDataUrl);
  });
