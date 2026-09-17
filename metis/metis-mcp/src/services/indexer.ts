import fs from "node:fs";
import path from "node:path";
import { defaultConfig } from "../config.js";
import { getDb, DbFileRecord } from "./db.js";
import { parseSourceSymbols } from "./ast-parser.js";

export interface IndexStats {
  filesIndexed: number;
  filesSkipped: number;
  filesDeleted: number;
  symbolsIndexed: number;
  durationMs: number;
}

let isIndexing = false;
let lastIndexedTime = 0;
const REINDEX_COOLDOWN_MS = 15000; // 15 seconds cooldown for automatic fast check

export function ensureWorkspaceIndexed(
  workspaceRoot: string = defaultConfig.workspaceRoot,
  force: boolean = false
): IndexStats {
  const now = Date.now();
  if (!force && now - lastIndexedTime < REINDEX_COOLDOWN_MS) {
    return {
      filesIndexed: 0,
      filesSkipped: 0,
      filesDeleted: 0,
      symbolsIndexed: 0,
      durationMs: 0,
    };
  }

  if (isIndexing) {
    return {
      filesIndexed: 0,
      filesSkipped: 0,
      filesDeleted: 0,
      symbolsIndexed: 0,
      durationMs: 0,
    };
  }

  isIndexing = true;
  const startTime = Date.now();

  try {
    const db = getDb(workspaceRoot);
    let filesIndexed = 0;
    let filesSkipped = 0;
    let filesDeleted = 0;
    let symbolsIndexed = 0;

    if (force) {
      db.exec("DELETE FROM symbols;");
      db.exec("DELETE FROM files;");
      db.exec("DELETE FROM code_fts;");
    }

    // Get all currently known files in database
    const existingRows = db
      .query("SELECT id, relative_path, mtime, size FROM files")
      .all() as { id: number; relative_path: string; mtime: number; size: number }[];

    const existingMap = new Map<string, { id: number; mtime: number; size: number }>();
    for (const row of existingRows) {
      existingMap.set(row.relative_path, row);
    }

    const seenPaths = new Set<string>();

    // Prepared statements for batch performance
    const insertFileStmt = db.prepare(
      "INSERT INTO files (repo, relative_path, full_path, mtime, size, hash) VALUES (?, ?, ?, ?, ?, NULL) RETURNING id"
    );
    const updateFileStmt = db.prepare(
      "UPDATE files SET mtime = ?, size = ? WHERE id = ?"
    );
    const deleteSymbolsStmt = db.prepare("DELETE FROM symbols WHERE file_id = ?");
    const insertSymbolStmt = db.prepare(
      "INSERT INTO symbols (file_id, name, kind, signature, line_start, line_end, is_exported) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    const deleteFtsStmt = db.prepare("DELETE FROM code_fts WHERE relative_path = ?");
    const insertFtsStmt = db.prepare(
      "INSERT INTO code_fts (relative_path, repo, content) VALUES (?, ?, ?)"
    );
    const deleteFileStmt = db.prepare("DELETE FROM files WHERE id = ?");

    const batchIndex = db.transaction((filesToProcess: { fullPath: string; relPath: string; repo: string; mtime: number; size: number; existingId?: number }[]) => {
      for (const item of filesToProcess) {
        let fileId: number;

        try {
          const content = fs.readFileSync(item.fullPath, "utf-8");

          if (item.existingId) {
            fileId = item.existingId;
            updateFileStmt.run(item.mtime, item.size, fileId);
            deleteSymbolsStmt.run(fileId);
            deleteFtsStmt.run(item.relPath);
          } else {
            const res = insertFileStmt.get(
              item.repo,
              item.relPath,
              item.fullPath,
              item.mtime,
              item.size
            ) as { id: number };
            fileId = res.id;
          }

          // Parse AST Symbols
          const symbols = parseSourceSymbols(item.fullPath, content);
          for (const s of symbols) {
            insertSymbolStmt.run(
              fileId,
              s.name,
              s.kind,
              s.signature,
              s.lineStart,
              s.lineEnd,
              s.isExported ? 1 : 0
            );
            symbolsIndexed++;
          }

          // Insert FTS text
          insertFtsStmt.run(item.relPath, item.repo, content);
          filesIndexed++;
        } catch {
          // ignore unreadable files
        }
      }
    });

    const toProcess: { fullPath: string; relPath: string; repo: string; mtime: number; size: number; existingId?: number }[] = [];

    function walk(currentDir: string, currentRepo: string) {
      let entries: fs.Dirent[] = [];
      try {
        entries = fs.readdirSync(currentDir, { withFileTypes: true });
      } catch {
        return;
      }

      for (const entry of entries) {
        if (
          entry.name.startsWith(".") ||
          entry.name === ".metis-mcp" ||
          defaultConfig.ignoredFolders.includes(entry.name)
        ) {
          continue;
        }

        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          const repoName = currentRepo || entry.name;
          walk(fullPath, repoName);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (defaultConfig.textExtensions.has(ext)) {
            const relPath = path.relative(workspaceRoot, fullPath);
            seenPaths.add(relPath);

            try {
              const stats = fs.statSync(fullPath);
              if (stats.size > defaultConfig.maxFileSizeBytes) {
                continue;
              }

              const mtime = Math.floor(stats.mtimeMs);
              const size = stats.size;
              const existing = existingMap.get(relPath);

              if (existing) {
                if (existing.mtime === mtime && existing.size === size) {
                  filesSkipped++;
                  continue;
                }
                toProcess.push({
                  fullPath,
                  relPath,
                  repo: currentRepo || "root",
                  mtime,
                  size,
                  existingId: existing.id,
                });
              } else {
                toProcess.push({
                  fullPath,
                  relPath,
                  repo: currentRepo || "root",
                  mtime,
                  size,
                });
              }
            } catch {}
          }
        }
      }
    }

    walk(workspaceRoot, "");

    // Run batch transaction for modified/new files
    if (toProcess.length > 0) {
      batchIndex(toProcess);
    }

    // Clean up deleted files
    const deleteTx = db.transaction(() => {
      for (const [relPath, rec] of existingMap.entries()) {
        if (!seenPaths.has(relPath)) {
          deleteSymbolsStmt.run(rec.id);
          deleteFtsStmt.run(relPath);
          deleteFileStmt.run(rec.id);
          filesDeleted++;
        }
      }
    });
    deleteTx();

    lastIndexedTime = Date.now();

    return {
      filesIndexed,
      filesSkipped,
      filesDeleted,
      symbolsIndexed,
      durationMs: Date.now() - startTime,
    };
  } finally {
    isIndexing = false;
  }
}
