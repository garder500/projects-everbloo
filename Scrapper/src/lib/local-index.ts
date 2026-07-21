import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DOCS_ROOT = path.resolve(__dirname, "../../docs");

export interface IndexEntry {
  url: string;
  title: string;
  path: string;
  excerpt: string;
  scraped_at: string;
}

export interface LocalIndex {
  source: string;
  updated_at: string;
  entries: IndexEntry[];
}

export function docsDir(source: string): string {
  return path.join(DOCS_ROOT, source);
}

export function indexPath(source: string): string {
  return path.join(docsDir(source), "index.json");
}

export async function loadIndex(source: string): Promise<LocalIndex> {
  try {
    const raw = await readFile(indexPath(source), "utf-8");
    return JSON.parse(raw) as LocalIndex;
  } catch {
    return { source, updated_at: new Date().toISOString(), entries: [] };
  }
}

export async function saveIndex(index: LocalIndex): Promise<void> {
  await mkdir(docsDir(index.source), { recursive: true });
  index.updated_at = new Date().toISOString();
  await writeFile(indexPath(index.source), JSON.stringify(index, null, 2), "utf-8");
}

export function upsertEntry(index: LocalIndex, entry: IndexEntry): void {
  const i = index.entries.findIndex((e) => e.url === entry.url);
  if (i >= 0) index.entries[i] = entry;
  else index.entries.push(entry);
}

export function searchIndex(
  index: LocalIndex,
  query: string,
  limit: number,
): IndexEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const scored = index.entries
    .map((entry) => {
      const haystack = `${entry.title} ${entry.excerpt} ${entry.url}`.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (haystack.includes(term)) score += 1;
        if (entry.title.toLowerCase().includes(term)) score += 2;
      }
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ entry }) => entry);
}

export function urlToSlug(url: string): string {
  const parsed = new URL(url);
  let slug = parsed.pathname.replace(/^\/+|\/+$/g, "").replace(/\//g, "-");
  if (!slug) slug = "index";
  if (parsed.search) {
    slug += parsed.search.replace(/[^a-zA-Z0-9]+/g, "-");
  }
  return slug.slice(0, 120) || "page";
}

export function excerptFromMarkdown(content: string, maxLen = 200): string {
  const body = content.replace(/^---[\s\S]*?---\n/, "").trim();
  const flat = body.replace(/\s+/g, " ");
  return flat.length > maxLen ? flat.slice(0, maxLen) + "…" : flat;
}
