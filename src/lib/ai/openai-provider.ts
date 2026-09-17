import type { ExtractionRequest, ProviderResult, VisionProvider } from "./contracts";

export function createOpenAiProvider(model = process.env.OPENAI_VISION_MODEL || "gpt-4.1"): VisionProvider {
  return {
    id: "openai", kind: "vision", model,
    available: () => Boolean(process.env.OPENAI_API_KEY),
    analyze: async (request: ExtractionRequest, prompt: string): Promise<ProviderResult> => {
      const key = process.env.OPENAI_API_KEY;
      if (!key) throw new Error("OPENAI_API_KEY is not configured");
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ model, temperature: 0.1, max_tokens: 2400, messages: [{ role: "user", content: [
          { type: "image_url", image_url: { url: request.imageDataUrl, detail: "high" } }, { type: "text", text: prompt },
        ] }] }),
      });
      if (!res.ok) throw new Error(`OpenAI API error ${res.status}`);
      const json = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
      const text = json.choices?.[0]?.message?.content ?? "";
      if (!text) throw new Error("OpenAI returned an empty response");
      return { text, providerId: "openai", model };
    },
  };
}
