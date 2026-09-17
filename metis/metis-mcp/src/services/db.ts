import { Database } from "bun:sqlite";
import fs from "node:fs";
import path from "node:path";
import { defaultConfig } from "../config.js";

let dbInstance: Database | null = null;

export interface DbFileRecord {
  id: number;
  repo: string;
  relative_path: string;
  full_path: string;
  mtime: number;
  size: number;
  hash: string | null;
}

export interface DbSymbolRecord {
  id?: number;
  file_id: number;
  name: string;
  kind: string;
  signature: string;
  line_start: number;
  line_end: number;
  is_exported: number;
}

export function getDatabasePath(workspaceRoot: string = defaultConfig.workspaceRoot): string {
  const dir = path.join(workspaceRoot, ".metis-mcp");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    const gitignorePath = path.join(dir, ".gitignore");
    if (!fs.existsSync(gitignorePath)) {
      fs.writeFileSync(gitignorePath, "*\n");
    }
  }
  return path.join(dir, "index.db");
}

export function getDb(workspaceRoot: string = defaultConfig.workspaceRoot): Database {
  if (dbInstance) return dbInstance;

  const dbPath = getDatabasePath(workspaceRoot);
  dbInstance = new Database(dbPath);

  // Enable WAL mode for high performance
  dbInstance.exec("PRAGMA journal_mode = WAL;");
  dbInstance.exec("PRAGMA synchronous = NORMAL;");
  dbInstance.exec("PRAGMA foreign_keys = ON;");

  initSchema(dbInstance);

  return dbInstance;
}

function initSchema(db: Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      repo TEXT NOT NULL,
      relative_path TEXT NOT NULL UNIQUE,
      full_path TEXT NOT NULL,
      mtime INTEGER NOT NULL,
      size INTEGER NOT NULL,
      hash TEXT
    );

    CREATE TABLE IF NOT EXISTS symbols (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      kind TEXT NOT NULL,
      signature TEXT NOT NULL,
      line_start INTEGER NOT NULL,
      line_end INTEGER NOT NULL,
      is_exported INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY(file_id) REFERENCES files(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_symbols_name ON symbols(name COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_symbols_kind ON symbols(kind);
    CREATE INDEX IF NOT EXISTS idx_symbols_file_id ON symbols(file_id);
    CREATE INDEX IF NOT EXISTS idx_files_repo ON files(repo);
    CREATE INDEX IF NOT EXISTS idx_files_path ON files(relative_path);

    CREATE VIRTUAL TABLE IF NOT EXISTS code_fts USING fts5(
      relative_path UNINDEXED,
      repo UNINDEXED,
      content,
      tokenize = 'unicode61'
    );
  `);
}

export function closeDb() {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}
