import fs from "node:fs";
import path from "node:path";
import { resolveInRoot } from "./fs-utils.js";

export interface Pkg {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

const hasDeps = (dir: string): boolean => {
  try {
    const p: Pkg = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"));
    return Object.keys({ ...p.dependencies, ...p.devDependencies }).length > 0;
  } catch {
    return false;
  }
};

/**
 * Dossier (relatif au workspace) du package.json d'un repo : le repo lui-même ou son `src/`.
 * Quand les deux existent (api-aerial, api-car…), on prend celui qui porte les dépendances (en pratique `src/`).
 */
export function pkgDir(repo: string): string {
  const candidates = ["src", ""]
    .map((sub) => path.posix.join(repo.replace(/\\/g, "/"), sub))
    .filter((rel) => fs.existsSync(path.join(resolveInRoot(rel), "package.json")));
  if (!candidates.length) throw new Error(`Pas de package.json dans ${repo} ni ${repo}/src`);
  return candidates.find((rel) => hasDeps(resolveInRoot(rel))) ?? candidates[0];
}

export function readPkg(rel: string): Pkg {
  return JSON.parse(fs.readFileSync(path.join(resolveInRoot(rel), "package.json"), "utf8"));
}

/** Chemins relatifs au repo → relatifs au dossier du package (hors du package : écartés). */
export function relativeToPkg(repo: string, files: string[]): string[] {
  const base = resolveInRoot(pkgDir(repo));
  return files
    .map((f) => path.relative(base, path.resolve(resolveInRoot(repo), f)).split(path.sep).join("/"))
    .filter((f) => !f.startsWith(".."));
}

const RISKY = /--fix\b|lint-staged|db:migrate|sequelize-cli|\bmigrate\b|db:seed|db:drop|db:create|\bseed\b|\brm\s+-rf\b|\bdrop\b/i;

/** Texte des scripts qu'exécuterait `npm run <name>` (références `npm run x` suivies, variantes `name:*` de run-script-os incluses). */
function expandScript(scripts: Record<string, string>, name: string, seen = new Set<string>(), depth = 0): string {
  if (seen.has(name) || depth > 4) return "";
  seen.add(name);
  const own = Object.entries(scripts).filter(([k]) => k === name || k.startsWith(`${name}:`));
  return own
    .map(([, v]) => {
      const refs = [...v.matchAll(/(?:npm|pnpm|yarn|bun)\s+run\s+([\w:.-]+)/g)].map((m) => expandScript(scripts, m[1], seen, depth + 1));
      return [v, ...refs].join(" ");
    })
    .join(" ");
}

/** Raison pour laquelle lancer ce script est dangereux (écriture de code, migration de base…), sinon undefined. */
export function scriptRisk(pkg: Pkg, name: string): string | undefined {
  const text = expandScript(pkg.scripts ?? {}, name);
  const hit = RISKY.exec(text);
  return hit ? `le script "${name}" déclenche « ${hit[0]} »` : undefined;
}
