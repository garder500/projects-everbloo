import fs from "node:fs";
import path from "node:path";

export const IGNORED_DIRS = new Set([
  "node_modules", ".git", ".pixi", ".devenv", ".vscode", ".idea", "dist", "build",
  "target", ".turbo", ".next", ".output", "coverage", ".cache", "tmp", "temp", "vendor",
]);

export const CODE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
export const MAX_FILE_BYTES = 2 * 1024 * 1024;

function findRoot(): string {
  if (process.env.METIS_WORKSPACE_ROOT) return path.resolve(process.env.METIS_WORKSPACE_ROOT);
  let dir = process.cwd();
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(dir, "pixi.toml"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

export const ROOT = findRoot();
