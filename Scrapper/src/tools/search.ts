import { search as ddgSearch } from "duck-duck-scrape";
import { z } from "zod";
import { getProvider } from "../providers/registry.js";

export const searchInputSchema = {
  query: z.string().min(1).describe("Search query"),
  source: z
    .enum(["web", "amadeus"])
    .optional()
    .describe('Documentation source: "web" (default) or "amadeus" (local mirror)'),
  max_results: z
    .number()
    .int()
    .min(1)
    .max(20)
    .optional()
    .describe("Maximum number of results (default: 5)"),
};

export type SearchInput = {
  query: string;
  source?: "web" | "amadeus";
  max_results?: number;
};

export async function runSearch(input: SearchInput): Promise<string> {
  const limit = input.max_results ?? 5;
  const source = input.source ?? "web";

  if (source === "amadeus") {
    const provider = getProvider("amadeus");
    const results = await provider.search(input.query, limit);
    return JSON.stringify({ query: input.query, source, count: results.length, results }, null, 2);
  }

  const results = await ddgSearch(input.query, { safeSearch: 0 });
  const items = (results.results ?? []).slice(0, limit).map((item, index) => ({
    rank: index + 1,
    title: item.title,
    url: item.url,
    description: item.description,
  }));

  return JSON.stringify(
    { query: input.query, source, count: items.length, results: items },
    null,
    2,
  );
}
