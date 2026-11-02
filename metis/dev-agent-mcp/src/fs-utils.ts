import fs from "node:fs";
import path from "node:path";
import { CODE_EXTS, IGNORED_DIRS, MAX_FILE_BYTES, ROOT } from "./config.js";

/** Résout un chemin relatif au workspace ; refuse toute sortie du workspace. */
export function resolveInRoot(rel: string): string {
  const abs = path.resolve(ROOT, rel);
  const back = path.relative(ROOT, abs);
  if (back.startsWith("..") || path.isAbsolute(back)) throw new Error(`Chemin hors workspace : ${rel}`);
  return abs;
}

export const toRel = (abs: string): string => path.relative(ROOT, abs).split(path.sep).join("/");

export function* walkFiles(dir: string, exts: Set<string> = CODE_EXTS): Generator<string> {
  let entries: fs.Dirent[];
  try {
    if (fs.statSync(dir).isFile()) {
      // scope = un fichier : on le traite seul plutôt que de répondre « rien trouvé ».
      if (exts.has(path.extname(dir).toLowerCase())) yield dir;
      return;
    }
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (!IGNORED_DIRS.has(e.name) && !e.name.startsWith(".")) yield* walkFiles(path.join(dir, e.name), exts);
    } else if (e.isFile() && exts.has(path.extname(e.name).toLowerCase())) {
      const full = path.join(dir, e.name);
      try {
        if (fs.statSync(full).size <= MAX_FILE_BYTES) yield full;
      } catch {
        /* fichier disparu */
      }
    }
  }
}

/** Message d'erreur sans chemin absolu de la machine (ENOENT, etc.). */
export function errorText(e: unknown): string {
  const raw = e instanceof Error ? e.message : String(e);
  const code = (e as { code?: string })?.code;
  const clean = raw.split(ROOT + path.sep).join("").split(ROOT).join("<workspace>");
  return code === "ENOENT" ? `Fichier ou dossier introuvable (${clean.replace(/^ENOENT: no such file or directory, \w+ /, "").replace(/['"]/g, "")})` : clean;
}

export function truncate(text: string, max = 8000): string {
  return text.length <= max ? text : `${text.slice(0, max)}\n… [tronqué, ${text.length - max} caractères en moins ; affiner la requête]`;
}
