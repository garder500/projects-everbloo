import fs from "node:fs";
import path from "node:path";
import { defaultConfig } from "../config.js";
import { getDb } from "./db.js";
import { ensureWorkspaceIndexed } from "./indexer.js";
import { expandQueryWithSynonyms } from "./synonyms.js";

export interface SemanticSearchResult {
  repoName: string;
  filePath: string;
  fullPath: string;
  score: number;
  snippet: string;
  matchedTerms: string[];
  matchedSymbols?: string[];
}

export function semanticSearch(options: {
  query: string;
  repoFilter?: string[];
  limit?: number;
  workspaceRoot?: string;
}): { results: SemanticSearchResult[]; totalScanned: number; expandedTerms: string[] } {
  const rootDir = options.workspaceRoot || defaultConfig.workspaceRoot;
  const limit = options.limit || 15;

  // Ensure index is ready
  ensureWorkspaceIndexed(rootDir);

  const db = getDb(rootDir);

  const rawQuery = options.query.trim();
  if (!rawQuery) {
    return { results: [], totalScanned: 0, expandedTerms: [] };
  }

  // 1. Expand query with domain synonyms (FR / EN)
  const expandedTerms = expandQueryWithSynonyms(rawQuery);
  const origTerms = rawQuery
    .toLowerCase()
    .split(/[\s,._\-/]+/)
    .filter((t) => t.length > 1);

  const resultMap = new Map<
    string,
    {
      repoName: string;
      filePath: string;
      fullPath: string;
      score: number;
      matchedTerms: Set<string>;
      matchedSymbols: Set<string>;
    }
  >();

  function getOrInit(relPath: string, repo: string, fullPath: string) {
    let item = resultMap.get(relPath);
    if (!item) {
      item = {
        repoName: repo || "root",
        filePath: relPath,
        fullPath,
        score: 0,
        matchedTerms: new Set(),
        matchedSymbols: new Set(),
      };
      resultMap.set(relPath, item);
    }
    return item;
  }

  // 2. Score via matching Symbols in AST (Very high weight)
  for (const term of expandedTerms) {
    if (term.length < 2) continue;

    let symbolSql = `
      SELECT s.name, s.kind, s.signature, f.relative_path, f.repo, f.full_path
      FROM symbols s
      JOIN files f ON s.file_id = f.id
      WHERE (s.name LIKE ? OR s.signature LIKE ?)
    `;
    const params: any[] = [`%${term}%`, `%${term}%`];

    if (options.repoFilter && options.repoFilter.length > 0) {
      const placeholders = options.repoFilter.map(() => "?").join(",");
      symbolSql += ` AND f.repo IN (${placeholders})`;
      params.push(...options.repoFilter);
    }

    symbolSql += ` LIMIT 50`;

    const symRows = db.query(symbolSql).all(...params) as any[];
    for (const r of symRows) {
      const entry = getOrInit(r.relative_path, r.repo, r.full_path);
      const isOriginal = origTerms.includes(term.toLowerCase());
      const weight = isOriginal ? 40 : 25;

      entry.score += weight;
      entry.matchedTerms.add(term);
      entry.matchedSymbols.add(`${r.name} (${r.kind})`);
    }
  }

  // 3. Score via File Paths & Names
  for (const term of expandedTerms) {
    if (term.length < 2) continue;

    let fileSql = `
      SELECT f.relative_path, f.repo, f.full_path
      FROM files f
      WHERE f.relative_path LIKE ?
    `;
    const params: any[] = [`%${term}%`];

    if (options.repoFilter && options.repoFilter.length > 0) {
      const placeholders = options.repoFilter.map(() => "?").join(",");
      fileSql += ` AND f.repo IN (${placeholders})`;
      params.push(...options.repoFilter);
    }

    fileSql += ` LIMIT 50`;

    const fileRows = db.query(fileSql).all(...params) as any[];
    for (const r of fileRows) {
      const entry = getOrInit(r.relative_path, r.repo, r.full_path);
      const isOriginal = origTerms.includes(term.toLowerCase());
      entry.score += isOriginal ? 30 : 15;
      entry.matchedTerms.add(term);
    }
  }

  // 4. Score via Full-Text Search (FTS5)
  const ftsSearchTerms = expandedTerms.slice(0, 10);
  for (const term of ftsSearchTerms) {
    const clean = term.replace(/[^a-zA-Z0-9_]/g, "").trim();
    if (clean.length < 3) continue;

    let ftsSql = `
      SELECT fts.relative_path, fts.repo, f.full_path
      FROM code_fts fts
      JOIN files f ON f.relative_path = fts.relative_path
      WHERE code_fts MATCH ?
    `;
    const params: any[] = [`"${clean}"`];

    if (options.repoFilter && options.repoFilter.length > 0) {
      const placeholders = options.repoFilter.map(() => "?").join(",");
      ftsSql += ` AND f.repo IN (${placeholders})`;
      params.push(...options.repoFilter);
    }

    ftsSql += ` LIMIT 40`;

    try {
      const ftsRows = db.query(ftsSql).all(...params) as any[];
      for (const r of ftsRows) {
        const entry = getOrInit(r.relative_path, r.repo, r.full_path);
        const isOriginal = origTerms.includes(term.toLowerCase());
        entry.score += isOriginal ? 10 : 5;
        entry.matchedTerms.add(term);
      }
    } catch {}
  }

  // 5. Multi-term bonus
  for (const entry of resultMap.values()) {
    if (entry.matchedTerms.size > 1) {
      entry.score += entry.matchedTerms.size * 15;
    }
  }

  // 6. Generate Snippets and format output
  const sorted = Array.from(resultMap.values()).sort((a, b) => b.score - a.score);

  const results: SemanticSearchResult[] = [];
  for (const item of sorted.slice(0, limit)) {
    let snippet = "";
    try {
      if (fs.existsSync(item.fullPath)) {
        const content = fs.readFileSync(item.fullPath, "utf-8");
        const termsArray = Array.from(item.matchedTerms);
        let bestPos = -1;

        for (const t of termsArray) {
          const pos = content.toLowerCase().indexOf(t.toLowerCase());
          if (pos !== -1) {
            bestPos = pos;
            break;
          }
        }

        if (bestPos !== -1) {
          const start = Math.max(0, bestPos - 80);
          const end = Math.min(content.length, bestPos + 180);
          snippet = content.substring(start, end).replace(/\r?\n/g, " ").trim();
          if (start > 0) snippet = "..." + snippet;
          if (end < content.length) snippet = snippet + "...";
        }
      }
    } catch {}

    results.push({
      repoName: item.repoName,
      filePath: item.filePath,
      fullPath: item.fullPath,
      score: item.score,
      snippet,
      matchedTerms: Array.from(item.matchedTerms),
      matchedSymbols: item.matchedSymbols.size > 0 ? Array.from(item.matchedSymbols) : undefined,
    });
  }

  const totalScanned = (db.query("SELECT COUNT(*) as cnt FROM files").get() as any)?.cnt || 0;

  return {
    results,
    totalScanned,
    expandedTerms,
  };
}
