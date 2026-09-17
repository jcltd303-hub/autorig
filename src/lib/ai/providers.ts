import type { AnyAiProvider, ExtractionRequest } from "./contracts";
import { createGeminiProvider } from "./gemini-provider";

export function createProviderRegistry(): AnyAiProvider[] {
  return [createGeminiProvider()];
}

export function resolveProviders(policy: ExtractionRequest["policy"] = {}): AnyAiProvider[] {
  const registry = createProviderRegistry().filter((provider) => provider.available());
  const configured = [policy.primaryProvider, ...(policy.fallbackProviders ?? []), ...(policy.ensembleProviders ?? [])].filter(Boolean) as string[];
  if (!configured.length) return registry;
  const filtered = configured.map((id) => registry.find((provider) => provider.id === id)).filter((provider): provider is AnyAiProvider => Boolean(provider));
  return filtered.length ? filtered : registry;
}
