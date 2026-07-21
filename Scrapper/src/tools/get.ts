import { z } from "zod";
import { fetchUrl } from "../lib/fetcher.js";
import { extractTitle, htmlToText } from "../lib/html.js";
import { getProvider } from "../providers/registry.js";
import { amadeusProvider } from "../providers/amadeus/index.js";

export const getInputSchema = {
  url: z.string().describe("URL or path to fetch"),
  source: z
    .enum(["web", "amadeus"])
    .optional()
    .describe('Source: "web" (default) or "amadeus" (authenticated portal / local cache)'),
  format: z
    .enum(["text", "html", "markdown"])
    .optional()
    .describe("Output format: markdown (default for amadeus), text, or html"),
  max_chars: z
    .number()
    .int()
    .min(500)
    .max(100_000)
    .optional()
    .describe("Maximum characters to return (default: 15000)"),
};

export type GetInput = {
  url: string;
  source?: "web" | "amadeus";
  format?: "text" | "html" | "markdown";
  max_chars?: number;
};

export async function runGet(input: GetInput): Promise<string> {
  const source = input.source ?? "web";
  const maxChars = input.max_chars ?? 15_000;

  if (source === "amadeus") {
    const url = amadeusProvider.normalizeUrl(input.url);
    const format = input.format ?? "markdown";
    const doc = await getProvider("amadeus").get(url, { format, maxChars });
    return JSON.stringify(doc, null, 2);
  }

  const url = input.url.startsWith("http") ? input.url : `https://${input.url}`;
  const { html, finalUrl, status } = await fetchUrl(url);
  const title = extractTitle(html);
  const format = input.format ?? "text";

  if (format === "html") {
    return JSON.stringify({ url: finalUrl, status, title, html }, null, 2);
  }

  let content = htmlToText(html);
  const truncated = content.length > maxChars;
  if (truncated) content = content.slice(0, maxChars) + "…";

  return JSON.stringify(
    { url: finalUrl, status, title, truncated, content, fromCache: false },
    null,
    2,
  );
}
