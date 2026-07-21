import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { extractTitle } from "../../lib/html.js";
import {
  docsDir,
  excerptFromMarkdown,
  loadIndex,
  saveIndex,
  upsertEntry,
  urlToSlug,
} from "../../lib/local-index.js";
import { buildFrontmatter, htmlToMarkdown } from "../../lib/markdown.js";
import type { CrawlReport, DocumentContent, DocumentProvider, SearchResult, SessionStatus } from "../types.js";
import { AmadeusClient } from "./client.js";
import { AMADEUS_DEVELOPERS } from "./config.js";
import { fetchAmadeusSoapDocs } from "./soap-docs.js";
import type { SoapDocsReport } from "./types.js";

const SOURCE = "amadeus";

export class AmadeusProvider implements DocumentProvider {
  id = SOURCE;
  private client: AmadeusClient | null = null;

  private async getClient(): Promise<AmadeusClient> {
    if (!this.client) {
      this.client = await AmadeusClient.create();
    }
    return this.client;
  }

  async login(force = false): Promise<SessionStatus> {
    const client = await this.getClient();
    const result = await client.login(force);
    const saved = await import("../../lib/session-store.js").then((m) =>
      m.loadAmadeusSession(),
    );
    return {
      authenticated: result.authenticated,
      message: result.message,
      savedAt: saved?.savedAt,
    };
  }

  async fetchSoapDocs(options?: {
    discoverOnly?: boolean;
    force?: boolean;
    limit?: number;
    pageSize?: number;
  }): Promise<SoapDocsReport> {
    return fetchAmadeusSoapDocs(options);
  }

  async crawl(urls: string[], force = false): Promise<CrawlReport> {
    const client = await this.getClient();
    await client.login();

    const index = await loadIndex(SOURCE);
    const report: CrawlReport = {
      source: SOURCE,
      total: urls.length,
      succeeded: 0,
      failed: 0,
      results: [],
    };

    await mkdir(docsDir(SOURCE), { recursive: true });

    for (const url of urls) {
      try {
        const slug = urlToSlug(url);
        const filePath = path.join(docsDir(SOURCE), `${slug}.md`);

        if (!force) {
          try {
            await access(filePath);
            report.succeeded += 1;
            report.results.push({ url, path: filePath });
            continue;
          } catch {
            // not cached
          }
        }

        const { html, finalUrl, status } = await client.fetchAuthenticated(url);
        if (status >= 400) {
          throw new Error(`HTTP ${status}`);
        }

        const title = extractTitle(html) ?? slug;
        const markdown = htmlToMarkdown(html);
        const scrapedAt = new Date().toISOString();
        const body = buildFrontmatter({
          url: finalUrl,
          title,
          scraped_at: scrapedAt,
          source: SOURCE,
        }) + markdown;

        await writeFile(filePath, body, "utf-8");

        upsertEntry(index, {
          url: finalUrl,
          title,
          path: filePath,
          excerpt: excerptFromMarkdown(markdown),
          scraped_at: scrapedAt,
        });

        report.succeeded += 1;
        report.results.push({ url: finalUrl, path: filePath });
      } catch (error) {
        report.failed += 1;
        report.results.push({
          url,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    await saveIndex(index);
    return report;
  }

  async search(query: string, limit: number): Promise<SearchResult[]> {
    const index = await loadIndex(SOURCE);
    const { searchIndex } = await import("../../lib/local-index.js");
    const entries = searchIndex(index, query, limit);
    return entries.map((entry, i) => ({
      rank: i + 1,
      title: entry.title,
      url: entry.url,
      description: entry.excerpt,
      path: entry.path,
    }));
  }

  async get(
    url: string,
    options?: { format?: "text" | "html" | "markdown"; maxChars?: number },
  ): Promise<DocumentContent> {
    const format = options?.format ?? "markdown";
    const maxChars = options?.maxChars ?? 15_000;
    const index = await loadIndex(SOURCE);
    const entry = index.entries.find((e) => e.url === url);

    if (entry?.path) {
      try {
        const raw = await readFile(entry.path, "utf-8");
        return this.formatDocument(url, raw, format, maxChars, true, entry.title);
      } catch {
        // fall through to live fetch
      }
    }

    const client = await this.getClient();
    const { html, finalUrl } = await client.fetchAuthenticated(url);

    if (format === "html") {
      return {
        url: finalUrl,
        title: extractTitle(html),
        content: html,
        format: "html",
        fromCache: false,
      };
    }

    const markdown = htmlToMarkdown(html);
    const title = extractTitle(html);
    return this.formatDocument(finalUrl, markdown, format, maxChars, false, title);
  }

  private formatDocument(
    url: string,
    raw: string,
    format: "text" | "html" | "markdown",
    maxChars: number,
    fromCache: boolean,
    title?: string,
  ): DocumentContent {
    let content = raw.replace(/^---[\s\S]*?---\n/, "").trim();

    if (format === "text") {
      content = content.replace(/[#*`[\]()]/g, " ").replace(/\s+/g, " ").trim();
    }

    if (content.length > maxChars) {
      content = content.slice(0, maxChars) + "…";
    }

    return {
      url,
      title,
      content,
      format: format === "markdown" ? "markdown" : format === "html" ? "html" : "text",
      fromCache,
    };
  }

  normalizeUrl(url: string): string {
    if (url.startsWith("http")) return url;
    return `${AMADEUS_DEVELOPERS}${url.startsWith("/") ? "" : "/"}${url}`;
  }
}

export const amadeusProvider = new AmadeusProvider();
