import type { ExtractionRequest, ProviderResult, VisionProvider } from "./contracts";

export type ChatResult = { ok: true; text: string } | { ok: false; error: string };

export async function xaiChat(messages: unknown[], maxTokens: number, model = process.env.XAI_TEXT_MODEL || "grok-4.5"): Promise<ChatResult> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false, error: "AI is not available in this environment" };
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: maxTokens }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, error: `xAI API error ${res.status}${body ? `: ${body.slice(0, 180)}` : ""}` };
  }
  const json = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
  return { ok: true, text: json.choices?.[0]?.message?.content ?? "" };
}

export async function xaiImage(prompt: string): Promise<{ ok: true; dataUrl: string } | { ok: false; error: string }> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false, error: "AI is not available in this environment" };
  const res = await fetch("https://api.x.ai/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: process.env.XAI_IMAGE_MODEL || "grok-imagine-image-quality", prompt, n: 1, resolution: "1k", response_format: "b64_json" }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, error: `Imagine error ${res.status}${body ? `: ${body.slice(0, 180)}` : ""}` };
  }
  const json = await res.json() as { data?: Array<{ b64_json?: string; url?: string }> };
  const first = json.data?.[0];
  if (first?.b64_json) return { ok: true, dataUrl: `data:image/png;base64,${first.b64_json}` };
  if (first?.url) {
    const img = await fetch(first.url);
    if (!img.ok) return { ok: false, error: `Imagine image download error ${img.status}` };
    const buf = Buffer.from(await img.arrayBuffer());
    return { ok: true, dataUrl: `data:${img.headers.get("content-type") || "image/png"};base64,${buf.toString("base64")}` };
  }
  return { ok: false, error: "Imagine returned no image" };
}

async function requestXai(model: string, request: ExtractionRequest, prompt: string): Promise<ProviderResult> {
  const result = await xaiChat([{ role: "user", content: [
    { type: "image_url", image_url: { url: request.imageDataUrl, detail: "high" } },
    { type: "text", text: prompt },
  ] }], 2400, model);
  if (!result.ok) throw new Error(result.error);
  if (!result.text) throw new Error("xAI returned an empty response");
  return { text: result.text, providerId: "xai", model };
}

export function createXaiProvider(model = process.env.XAI_VISION_MODEL || "grok-4.5"): VisionProvider {
  return { id: "xai", kind: "vision", model, available: () => Boolean(process.env.XAI_API_KEY), analyze: (request, prompt) => requestXai(model, request, prompt) };
}
