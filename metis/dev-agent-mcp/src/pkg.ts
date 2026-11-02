import fs from "node:fs";
import path from "node:path";
import { resolveInRoot } from "./fs-utils.js";

/** Dossier (relatif au workspace) qui contient le package.json d'un repo : le repo lui-même ou son `src/`. */
export function pkgDir(repo: string): string {
  for (const sub of ["", "src"]) {
    const rel = path.posix.join(repo.replace(/\\/g, "/"), sub);
    if (fs.existsSync(path.join(resolveInRoot(rel), "package.json"))) return rel;
  }
  throw new Error(`Pas de package.json dans ${repo} ni ${repo}/src`);
}

/** Chemins relatifs au repo → relatifs au dossier du package (hors du package : écartés). */
export function relativeToPkg(repo: string, files: string[]): string[] {
  const base = resolveInRoot(pkgDir(repo));
  return files
    .map((f) => path.relative(base, path.resolve(resolveInRoot(repo), f)).split(path.sep).join("/"))
    .filter((f) => !f.startsWith(".."));
}
