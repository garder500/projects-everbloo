import path from "node:path";
import { execFileSync } from "node:child_process";
import { resolveInRoot } from "./fs-utils.js";

/** Exécute git dans le dossier du fichier (le bon sous-repo est trouvé automatiquement). */
function gitFor(rel: string, ...args: string[]): { out: string; base: string } {
  const abs = resolveInRoot(rel);
  const out = execFileSync("git", ["-C", path.dirname(abs), ...args.map((a) => (a === "{file}" ? path.basename(abs) : a))], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });
  return { out, base: path.basename(abs) };
}

const mrRefs = (s: string): string[] => [...new Set(s.match(/!\d+/g) ?? [])];

/** Pourquoi ces lignes existent : commits (message, auteur, MR) qui les ont introduites. */
export function blameWhy(rel: string, start: number, end = start): string {
  const { out } = gitFor(rel, "blame", "-L", `${start},${end}`, "--porcelain", "--", "{file}");
  const hashes = [...new Set(out.split("\n").filter((l) => /^[0-9a-f]{40} /.test(l)).map((l) => l.slice(0, 40)))];
  return hashes
    .slice(0, 5)
    .map((h) => {
      try {
        const { out: msg } = gitFor(rel, "show", "-s", "--date=short", "--format=%h %ad %an%n%s%n%n%b", h);
        const refs = mrRefs(msg);
        return `${msg.trim().slice(0, 600)}${refs.length ? `\nMR liées: ${refs.join(", ")}` : ""}`;
      } catch {
        return `${h.slice(0, 8)} (commit introuvable)`;
      }
    })
    .join("\n---\n");
}

export function relatedHistory(rel: string, limit = 10): string {
  const { out } = gitFor(rel, "log", "--follow", `-n${limit}`, "--date=short", "--format=%h %ad %an | %s", "--", "{file}");
  return out.trim() || "Aucun historique"; // les refs MR (!123) figurent déjà dans les sujets
}
