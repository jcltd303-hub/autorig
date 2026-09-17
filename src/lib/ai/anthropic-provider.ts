import type { ExtractionRequest, ProviderResult, VisionProvider } from "./contracts";

function parts(dataUrl: string) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/s);
  if (!match) throw new Error("imageDataUrl must be a base64 data URL");
  return { mime: match[1], base64: match[2] };
}

export function createAnthropicProvider(model = process.env.ANTHROPIC_VISION_MODEL || "claude-sonnet-4-5"): VisionProvider {
  return {
    id: "anthropic", kind: "vision", model,
    available: () => Boolean(process.env.ANTHROPIC_API_KEY),
    analyze: async (request: ExtractionRequest, prompt: string): Promise<ProviderResult> => {
      const key = process.env.ANTHROPIC_API_KEY;
      if (!key) throw new Error("ANTHROPIC_API_KEY is not configured");
      const { mime, base64 } = parts(request.imageDataUrl);
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model, max_tokens: 2400, temperature: 0.1, messages: [{ role: "user", content: [
          { type: "image", source: { type: "base64", media_type: mime, data: base64 } }, { type: "text", text: prompt },
        ] }] }),
      });
      if (!res.ok) throw new Error(`Anthropic API error ${res.status}`);
      const json = await res.json() as { content?: Array<{ type?: string; text?: string }> };
      const text = json.content?.filter((p) => p.type === "text").map((p) => p.text ?? "").join("") ?? "";
      if (!text) throw new Error("Anthropic returned an empty response");
      return { text, providerId: "anthropic", model };
    },
  };
}
