import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { ROOT } from "./config.js";
import { resolveInRoot } from "./fs-utils.js";
import { addedLines } from "./extras.js";
import { formatMemories, memoryRecall } from "./memory.js";

/** trimEnd uniquement : un trim() mangerait l'espace de tête de la première ligne de `status --short`. */
const git = (repo: string, ...args: string[]) =>
  execFileSync("git", args, { cwd: resolveInRoot(repo), encoding: "utf8", maxBuffer: 16 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] }).trimEnd();

const attempt = (repo: string, ...args: string[]): string => {
  try {
    return git(repo, ...args);
  } catch {
    return "";
  }
};

const BASES = ["development", "main", "master"];

/** Dépôts git du workspace : la racine et les sous-dossiers qui ont leur propre .git. */
function repos(): string[] {
  const subs = fs.readdirSync(ROOT, { withFileTypes: true }).filter((e) => e.isDirectory() && fs.existsSync(path.join(ROOT, e.name, ".git"))).map((e) => e.name);
  return [".", ...subs];
}

/** Pourquoi tel choix : commits (et MR !123) dont le message parle du sujet + décisions mémorisées. Sans `repo` : tous les dépôts du workspace. */
export function decisionLog(topic: string, repo?: string, limit = 10): string {
  if (!topic.trim()) throw new Error("topic vide");
  const grep = topic.split(/\s+/).flatMap((w) => ["--grep", w]);
  const searched = repo ? [repo] : repos();
  const sections = searched
    .map((r) => [r, attempt(r, "log", "-i", "--all-match", ...grep, `-n${limit}`, "--date=short", "--format=%h %ad %an | %s")] as const)
    .filter(([, commits]) => commits);
  const mems = memoryRecall(topic).filter((m) => m.kind === "decision" || m.kind === "pitfall");
  return [
    `Commits (${repo ?? `${searched.length} dépôts cherchés`}):`,
    sections.map(([r, c]) => `[${r}]\n${c}`).join("\n") || "  (aucun)",
    "",
    "Décisions/pièges mémorisés:",
    mems.length ? formatMemories(mems) : "  (aucun)",
  ].join("\n");
}

/** Reprise après coupure : branche, commits propres, fichiers touchés, non commité, TODO ajoutés. */
export function taskContext(repo: string): string {
  const branch = git(repo, "branch", "--show-current");
  const onBase = BASES.includes(branch);
  const base = onBase ? undefined : BASES.find((b) => attempt(repo, "rev-parse", "--verify", `origin/${b}`));
  const range = base ? `origin/${base}..HEAD` : undefined;
  const total = range ? Number(attempt(repo, "rev-list", "--count", range)) || 0 : 0;
  const commits = (range ? attempt(repo, "log", range, "--format=%h %s", "-n20") : "") || attempt(repo, "log", "--format=%h %s", "-n5");
  const files = (base ? attempt(repo, "diff", "--name-status", `origin/${base}...HEAD`) : "").split("\n").filter(Boolean);
  const dirty = attempt(repo, "status", "--short").split("\n").filter(Boolean);
  const todos = addedLines(repo).filter(([, , t]) => /\b(TODO|FIXME)\b/.test(t)).map(([f, n, t]) => `  ${f}:${n}: ${t.trim().slice(0, 100)}`);
  const shown = commits ? commits.split("\n").length : 0;
  return [
    `branche: ${branch}${base ? ` (base : ${base})` : onBase ? " (branche de base : pas de comparaison)" : ""}`,
    `commits ${range ? `propres à la branche (${total}${total > shown ? `, ${shown} affichés` : ""})` : "récents"}:\n${commits || "  (aucun)"}`,
    base ? `fichiers touchés par la branche (${files.length}):\n${files.slice(0, 30).map((f) => `  ${f}`).join("\n") || "  (aucun)"}${files.length > 30 ? `\n  … ${files.length - 30} de plus` : ""}` : "fichiers touchés par la branche: n/a",
    `non commité (${dirty.length}):\n${dirty.slice(0, 20).map((f) => `  ${f}`).join("\n") || "  (propre)"}${dirty.length > 20 ? `\n  … ${dirty.length - 20} de plus` : ""}`,
    todos.length ? `TODO/FIXME ajoutés non commités:\n${todos.join("\n")}` : "Aucun TODO/FIXME ajouté dans le diff en cours.",
  ].join("\n");
}
