import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { amadeusProvider } from "./index.js";
import type { CrawlReport } from "../types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URLS_FILE = path.resolve(__dirname, "../../../sources/amadeus/urls.json");

export async function loadAmadeusUrls(): Promise<string[]> {
  const raw = await readFile(URLS_FILE, "utf-8");
  const urls = JSON.parse(raw) as string[];
  return urls.filter((u) => typeof u === "string" && u.startsWith("http"));
}

export async function crawlAmadeus(options: {
  urls?: string[];
  force?: boolean;
}): Promise<CrawlReport> {
  const urls = options.urls?.length ? options.urls : await loadAmadeusUrls();
  if (urls.length === 0) {
    throw new Error(
      "No URLs to crawl. Add URLs to sources/amadeus/urls.json or pass --url.",
    );
  }
  const normalized = urls.map((u) => amadeusProvider.normalizeUrl(u));
  return amadeusProvider.crawl(normalized, options.force ?? false);
}
