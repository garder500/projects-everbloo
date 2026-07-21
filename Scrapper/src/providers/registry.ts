import type { DocumentProvider } from "./types.js";
import { amadeusProvider } from "./amadeus/index.js";

const providers = new Map<string, DocumentProvider>([
  [amadeusProvider.id, amadeusProvider],
]);

export function getProvider(source: string): DocumentProvider {
  const provider = providers.get(source);
  if (!provider) {
    throw new Error(`Unknown documentation source: ${source}. Available: ${[...providers.keys()].join(", ")}`);
  }
  return provider;
}

export function listProviders(): string[] {
  return [...providers.keys()];
}

export { amadeusProvider };
