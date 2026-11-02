import fs from "node:fs";
import path from "node:path";

export const IGNORED_DIRS = new Set([
  "node_modules", ".git", ".pixi", ".devenv", ".vscode", ".idea", "dist", "build",
  "target", ".turbo", ".next", ".output", "coverage", ".cache", "tmp", "temp", "vendor",
  "fixtures", "__fixtures__", // jeux de test : bruit pour les graphes d'appels / recherches (un scope DANS un dossier fixtures reste exploré)
]);

export const CODE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
export const MAX_FILE_BYTES = 2 * 1024 * 1024;

/** Racine du workspace : le dossier (ou un parent, ou un enfant direct) qui contient `pixi.toml`. */
export function detectRoot(start: string): string | undefined {
  let dir = path.resolve(start);
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(dir, "pixi.toml"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  try {
    const child = fs.readdirSync(start, { withFileTypes: true }).find((e) => e.isDirectory() && !IGNORED_DIRS.has(e.name) && fs.existsSync(path.join(start, e.name, "pixi.toml")));
    if (child) return path.join(start, child.name);
  } catch {
    /* dossier illisible : pas de détection */
  }
  return undefined;
}

/** Ordre : variable d'environnement (forçage) → dossier de lancement → racines MCP fournies par le client (setRoot). */
export let ROOT = process.env.METIS_WORKSPACE_ROOT ? path.resolve(process.env.METIS_WORKSPACE_ROOT) : (detectRoot(process.cwd()) ?? process.cwd());
export const setRoot = (dir: string): void => {
  ROOT = path.resolve(dir);
};
