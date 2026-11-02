import fs from "node:fs";
import path from "node:path";

export const IGNORED_DIRS = new Set([
  "node_modules", ".git", ".pixi", ".devenv", ".vscode", ".idea", "dist", "build",
  "target", ".turbo", ".next", ".output", "coverage", ".cache", "tmp", "temp", "vendor",
  "fixtures", "__fixtures__", // jeux de test : bruit pour les graphes d'appels / recherches (un scope DANS un dossier fixtures reste exploré)
]);

export const CODE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
export const MAX_FILE_BYTES = 2 * 1024 * 1024;

const MARKERS = ["pixi.toml", "devenv.nix", "devenv.yaml", ".dev-agent"];
const isProject = (dir: string) => [".git", "package.json", path.join("src", "package.json")].some((m) => fs.existsSync(path.join(dir, m)));
const subDirs = (dir: string): string[] => {
  try {
    return fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory() && !IGNORED_DIRS.has(e.name) && !e.name.startsWith(".")).map((e) => path.join(dir, e.name));
  } catch {
    return [];
  }
};

/** Un workspace = un marqueur d'outillage (pixi, devenv, .dev-agent) OU un dossier regroupant au moins 2 projets (multi-repo). Aucun outil n'est requis. */
const isWorkspace = (dir: string): boolean => MARKERS.some((m) => fs.existsSync(path.join(dir, m))) || subDirs(dir).filter(isProject).length >= 2;

/** Racine du workspace : le dossier de lancement, un parent ou un enfant direct qui est un workspace ; à défaut, le dossier de lancement. */
export function detectRoot(start: string): string | undefined {
  let dir = path.resolve(start);
  if (isWorkspace(dir)) return dir;
  const child = subDirs(dir).find(isWorkspace); // lancé depuis le parent du workspace
  if (child) return child;
  for (let i = 0; i < 5; i++) {
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
    if (isWorkspace(dir)) return dir;
  }
  return undefined;
}

/** Ordre : variable d'environnement (forçage) → dossier de lancement → racines MCP fournies par le client (setRoot). */
export let ROOT = process.env.METIS_WORKSPACE_ROOT ? path.resolve(process.env.METIS_WORKSPACE_ROOT) : (detectRoot(process.cwd()) ?? process.cwd());
export const setRoot = (dir: string): void => {
  ROOT = path.resolve(dir);
};
