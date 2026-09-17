import fs from "node:fs";
import path from "node:path";
import { defaultConfig } from "../config.js";

export interface FileSliceResult {
  filePath: string;
  repoName: string;
  totalLines: number;
  startLine: number;
  endLine: number;
  content: string;
  isTruncated: boolean;
}

export function readFileSlice(options: {
  relativeOrAbsolutePath: string;
  startLine?: number;
  endLine?: number;
  repoName?: string;
  workspaceRoot?: string;
}): FileSliceResult {
  const rootDir = options.workspaceRoot || defaultConfig.workspaceRoot;
  let fullPath = options.relativeOrAbsolutePath;

  if (!path.isAbsolute(fullPath)) {
    if (options.repoName) {
      fullPath = path.join(rootDir, options.repoName, options.relativeOrAbsolutePath);
    } else {
      fullPath = path.join(rootDir, options.relativeOrAbsolutePath);
    }
  }

  // Safety check: ensure file path is inside workspace or subdirectories
  const resolved = path.resolve(fullPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Le fichier n'existe pas : ${resolved}`);
  }

  const stat = fs.statSync(resolved);
  if (stat.isDirectory()) {
    throw new Error(`Le chemin spécifié est un dossier, pas un fichier : ${resolved}`);
  }

  const rawContent = fs.readFileSync(resolved, "utf-8");
  const lines = rawContent.split(/\r?\n/);
  const totalLines = lines.length;

  const start = Math.max(1, options.startLine || 1);
  const end = Math.min(totalLines, options.endLine || Math.min(totalLines, start + 200 - 1));

  const selectedLines = lines.slice(start - 1, end);
  const numberedContent = selectedLines
    .map((line, idx) => `${start + idx}: ${line}`)
    .join("\n");

  const relFromRoot = path.relative(rootDir, resolved);
  const detectedRepo = relFromRoot.split(path.sep)[0] || "root";

  return {
    filePath: relFromRoot,
    repoName: options.repoName || detectedRepo,
    totalLines,
    startLine: start,
    endLine: end,
    content: numberedContent,
    isTruncated: end < totalLines,
  };
}
