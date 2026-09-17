import fs from "node:fs";
import path from "node:path";
import { defaultConfig } from "../config.js";
import { getDb } from "./db.js";
import { ensureWorkspaceIndexed } from "./indexer.js";

export interface SearchHit {
  repoName: string;
  filePath: string;
  fullPath: string;
  lineNumber: number;
  lineContent: string;
  contextBefore?: string[];
  contextAfter?: string[];
}

export interface SearchOptions {
  query: string;
  isRegex?: boolean;
  caseSensitive?: boolean;
  repoFilter?: string[];
  fileExtensions?: string[];
  maxResults?: number;
  contextLines?: number;
  workspaceRoot?: string;
}

export function searchCode(options: SearchOptions): { totalMatches: number; hits: SearchHit[]; truncated: boolean } {
  const rootDir = options.workspaceRoot || defaultConfig.workspaceRoot;
  const maxResults = options.maxResults || 50;
  const contextLines = options.contextLines || 0;
  const hits: SearchHit[] = [];

  // Ensure index is ready
  ensureWorkspaceIndexed(rootDir);

  const db = getDb(rootDir);

  let regex: RegExp;
  try {
    const flags = options.caseSensitive ? "g" : "gi";
    if (options.isRegex) {
      regex = new RegExp(options.query, flags);
    } else {
      const escaped = options.query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      regex = new RegExp(escaped, flags);
    }
  } catch (err: any) {
    throw new Error(`Expression régulière invalide : ${err?.message}`);
  }

  const targetExtensions = options.fileExtensions
    ? new Set(options.fileExtensions.map((e) => (e.startsWith(".") ? e.toLowerCase() : `.${e.toLowerCase()}`)))
    : null;

  // 1. Candidate file selection via FTS5 if query is simple, or scanning DB files
  let candidateFilesSql = `
    SELECT f.relative_path, f.repo, f.full_path 
    FROM files f
    WHERE 1=1
  `;
  const params: any[] = [];

  if (options.repoFilter && options.repoFilter.length > 0) {
    const placeholders = options.repoFilter.map(() => "?").join(",");
    candidateFilesSql += ` AND f.repo IN (${placeholders})`;
    params.push(...options.repoFilter);
  }

  // If query is literal and alphanumeric, leverage FTS5 ranking
  const cleanFtsTerm = options.query.replace(/[^a-zA-Z0-9_]/g, " ").trim();
  if (!options.isRegex && cleanFtsTerm.length >= 2) {
    const ftsTokens = cleanFtsTerm.split(/\s+/).filter(Boolean);
    if (ftsTokens.length > 0) {
      const ftsQuery = ftsTokens.map(t => `"${t}"`).join(" AND ");
      candidateFilesSql = `
        SELECT f.relative_path, f.repo, f.full_path
        FROM code_fts fts
        JOIN files f ON f.relative_path = fts.relative_path
        WHERE code_fts MATCH ?
      `;
      params.unshift(ftsQuery);
      if (options.repoFilter && options.repoFilter.length > 0) {
        const placeholders = options.repoFilter.map(() => "?").join(",");
        candidateFilesSql += ` AND f.repo IN (${placeholders})`;
      }
      candidateFilesSql += ` LIMIT 300`;
    }
  }

  const candidateFiles = db.query(candidateFilesSql).all(...params) as {
    relative_path: string;
    repo: string;
    full_path: string;
  }[];

  for (const item of candidateFiles) {
    if (hits.length >= maxResults) break;

    const ext = path.extname(item.relative_path).toLowerCase();
    if (targetExtensions && !targetExtensions.has(ext)) {
      continue;
    }

    try {
      if (!fs.existsSync(item.full_path)) continue;
      const content = fs.readFileSync(item.full_path, "utf-8");
      const lines = content.split(/\r?\n/);

      for (let i = 0; i < lines.length; i++) {
        if (hits.length >= maxResults) break;
        const line = lines[i];
        regex.lastIndex = 0;

        if (regex.test(line)) {
          const hit: SearchHit = {
            repoName: item.repo || "root",
            filePath: item.relative_path,
            fullPath: item.full_path,
            lineNumber: i + 1,
            lineContent: line.trimEnd(),
          };

          if (contextLines > 0) {
            hit.contextBefore = lines.slice(Math.max(0, i - contextLines), i);
            hit.contextAfter = lines.slice(i + 1, Math.min(lines.length, i + 1 + contextLines));
          }

          hits.push(hit);
        }
      }
    } catch {}
  }

  return {
    totalMatches: hits.length,
    hits,
    truncated: hits.length >= maxResults,
  };
}
