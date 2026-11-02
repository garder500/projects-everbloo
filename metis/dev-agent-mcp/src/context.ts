import { execFileSync } from "node:child_process";
import { resolveInRoot } from "./fs-utils.js";
import { addedLines } from "./extras.js";
import { formatMemories, memoryRecall } from "./memory.js";

const git = (repo: string, ...args: string[]) => execFileSync("git", args, { cwd: resolveInRoot(repo), encoding: "utf8", maxBuffer: 16 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] }).trim();

/** Pourquoi tel choix : commits (et MR !123) dont le message parle du sujet + décisions mémorisées. */
export function decisionLog(topic: string, repo = ".", limit = 10): string {
  if (!topic.trim()) throw new Error("topic vide");
  const commits = git(repo, "log", "-i", "--all-match", ...topic.split(/\s+/).flatMap((w) => ["--grep", w]), `-n${limit}`, "--date=short", "--format=%h %ad %an | %s").trim();
  const mems = memoryRecall(topic).filter((m) => m.kind === "decision" || m.kind === "pitfall");
  return [`Commits (${repo}):`, commits || "  (aucun)", "", "Décisions/pièges mémorisés:", mems.length ? formatMemories(mems) : "  (aucun)"].join("\n");
}

/** Reprise après coupure : branche, commits propres à la branche, fichiers touchés, TODO restants dans le diff. */
export function taskContext(repo: string): string {
  const branch = git(repo, "branch", "--show-current");
  const base = ["development", "main", "master"].find((b) => {
    try {
      git(repo, "rev-parse", "--verify", `origin/${b}`);
      return branch !== b;
    } catch {
      return false;
    }
  });
  const range = base ? `origin/${base}..HEAD` : "HEAD~5..HEAD";
  const commits = git(repo, "log", range, "--format=%h %s", "-n20");
  const files = git(repo, "diff", "--name-status", base ? `origin/${base}...HEAD` : "HEAD~5").split("\n").filter(Boolean);
  const dirty = git(repo, "status", "--short").split("\n").filter(Boolean);
  const todos = addedLines(repo).filter(([, , t]) => /\b(TODO|FIXME)\b/.test(t)).map(([f, n, t]) => `  ${f}:${n}: ${t.trim().slice(0, 100)}`);
  return [
    `branche: ${branch}${base ? ` (base: ${base})` : ""}`,
    `commits de la branche (${commits ? commits.split("\n").length : 0}):\n${commits || "  (aucun)"}`,
    `fichiers touchés par la branche (${files.length}):\n${files.slice(0, 30).map((f) => `  ${f}`).join("\n") || "  (aucun)"}${files.length > 30 ? `\n  … ${files.length - 30} de plus` : ""}`,
    `non commité (${dirty.length}):\n${dirty.slice(0, 20).map((f) => `  ${f}`).join("\n") || "  (propre)"}`,
    todos.length ? `TODO/FIXME ajoutés non commités:\n${todos.join("\n")}` : "Aucun TODO/FIXME ajouté dans le diff en cours.",
  ].join("\n");
}
