import path from "node:path";
import { defaultConfig } from "../config.js";
import { getDb } from "./db.js";
import { ensureWorkspaceIndexed } from "./indexer.js";

export type SymbolKind = "function" | "class" | "interface" | "type" | "enum" | "variable" | "export" | "all";

export interface SymbolDefinition {
  name: string;
  kind: "function" | "class" | "interface" | "type" | "enum" | "variable" | "export" | "other";
  signature: string;
  repoName: string;
  filePath: string;
  fullPath: string;
  lineNumber: number;
  lineEnd?: number;
  isExported?: boolean;
}

export interface FindSymbolsOptions {
  symbolName: string;
  kind?: SymbolKind;
  repoFilter?: string[];
  maxResults?: number;
  workspaceRoot?: string;
}

export function findSymbols(options: FindSymbolsOptions): { symbols: SymbolDefinition[]; total: number } {
  const rootDir = options.workspaceRoot || defaultConfig.workspaceRoot;
  const maxResults = options.maxResults || 50;
  const targetSymbol = options.symbolName ? options.symbolName.trim() : "*";
  const kindFilter = options.kind || "all";

  // Ensure workspace is indexed
  ensureWorkspaceIndexed(rootDir);

  const db = getDb(rootDir);

  let querySql = `
    SELECT 
      s.name,
      s.kind,
      s.signature,
      s.line_start,
      s.line_end,
      s.is_exported,
      f.repo,
      f.relative_path,
      f.full_path
    FROM symbols s
    JOIN files f ON s.file_id = f.id
    WHERE 1=1
  `;

  const params: any[] = [];

  // Filter by symbol name
  if (targetSymbol !== "*") {
    // Exact match or contains
    querySql += ` AND (s.name = ? COLLATE NOCASE OR s.name LIKE ?)`;
    params.push(targetSymbol, `%${targetSymbol}%`);
  }

  // Filter by kind
  if (kindFilter !== "all") {
    querySql += ` AND s.kind = ?`;
    params.push(kindFilter);
  }

  // Filter by repo
  if (options.repoFilter && options.repoFilter.length > 0) {
    const placeholders = options.repoFilter.map(() => "?").join(",");
    querySql += ` AND f.repo IN (${placeholders})`;
    params.push(...options.repoFilter);
  }

  // Exact matches first, then shorter names, then limit
  querySql += `
    ORDER BY 
      CASE WHEN LOWER(s.name) = LOWER(?) THEN 0 ELSE 1 END,
      LENGTH(s.name) ASC,
      s.is_exported DESC
    LIMIT ?
  `;
  params.push(targetSymbol, maxResults);

  const rows = db.query(querySql).all(...params) as any[];

  const symbols: SymbolDefinition[] = rows.map((r) => ({
    name: r.name,
    kind: r.kind,
    signature: r.signature,
    repoName: r.repo || "root",
    filePath: r.relative_path,
    fullPath: r.full_path,
    lineNumber: r.line_start,
    lineEnd: r.line_end,
    isExported: Boolean(r.is_exported),
  }));

  return {
    symbols,
    total: symbols.length,
  };
}
