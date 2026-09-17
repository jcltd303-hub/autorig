import { GoogleGenAI } from "@google/genai";
import type { ExtractionRequest, ProviderResult, VisionProvider } from "./contracts";

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

function parseDataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/s);
  if (!match) throw new Error("imageDataUrl must be a base64 data URL");
  return { mime: match[1], base64: match[2] };
}

export function createGeminiProvider(model = process.env.GEMINI_VISION_MODEL || "gemini-3.8-flash"): VisionProvider {
  return {
    id: "gemini",
    kind: "vision",
    model,
    available: () => Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
    analyze: async (request: ExtractionRequest, prompt: string): Promise<ProviderResult> => {
      const ai = getGeminiClient();
      const { mime, base64 } = parseDataUrl(request.imageDataUrl);

      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            inlineData: {
              mimeType: mime,
              data: base64,
            },
          },
          {
            text: prompt,
          },
        ],
        config: {
          temperature: 0.1,
          responseMimeType: "application/json",
          maxOutputTokens: 8192,
        },
      });

      const text = response.text ?? "";
      if (!text) throw new Error("Gemini returned an empty response");
      return { text, providerId: "gemini", model };
    },
  };
}

export async function geminiChat(
  messages: Array<{ role: string; content: string }>,
  maxTokens = 4096,
  model = process.env.GEMINI_TEXT_MODEL || "gemini-3.8-flash"
): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
  try {
    const ai = getGeminiClient();
    const promptText = messages.map((m) => m.content).join("\n\n");
    const response = await ai.models.generateContent({
      model,
      contents: promptText,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
        maxOutputTokens: maxTokens,
      },
    });

    const text = response.text ?? "";
    if (!text) return { ok: false, error: "Gemini returned empty response" };
    return { ok: true, text };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Gemini chat failed" };
  }
}

export async function geminiImage(
  prompt: string,
  model = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image-preview"
): Promise<{ ok: true; dataUrl: string } | { ok: false; error: string }> {
  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4",
        },
      },
    });

    for (const candidate of response.candidates ?? []) {
      for (const part of candidate.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || "image/jpeg";
          return { ok: true, dataUrl: `data:${mime};base64,${part.inlineData.data}` };
        }
      }
    }

    return { ok: false, error: "Gemini returned no image" };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Gemini image generation failed" };
  }
}

export async function geminiEditImage(
  prompt: string,
  imageDataUrl: string,
  model = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image-preview"
): Promise<{ ok: true; dataUrl: string } | { ok: false; error: string }> {
  try {
    const ai = getGeminiClient();
    const { mime, base64 } = parseDataUrl(imageDataUrl);

    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64,
              mimeType: mime,
            },
          },
          {
            text: `Edit this figure: ${prompt}. Keep it isolated with whole body unoccluded and limbs visible on a clean background suitable for puppet rigging.`,
          },
        ],
      },
    });

    for (const candidate of response.candidates ?? []) {
      for (const part of candidate.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const resMime = part.inlineData.mimeType || "image/jpeg";
          return { ok: true, dataUrl: `data:${resMime};base64,${part.inlineData.data}` };
        }
      }
    }

    return { ok: false, error: "Gemini returned no edited image" };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Gemini image edit failed" };
  }
}
