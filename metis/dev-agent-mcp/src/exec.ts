import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { resolveInRoot } from "./fs-utils.js";
import { redact } from "./redact.js";

/** Binaires autorisés par défaut ; le reste exige unsafe=true (effets de bord possibles). */
const ALLOWED = new Set(["pixi", "npm", "npx", "pnpm", "yarn", "bun", "node", "tsc", "eslint", "prettier", "jest", "vitest", "git", "ls", "cat", "echo"]);
const GIT_READONLY = new Set(["status", "diff", "log", "show", "branch", "rev-parse", "blame", "ls-files"]);

export interface RunResult {
  code: number;
  timedOut: boolean;
  output: string;
  logFile: string;
}

export function checkAllowed(cmd: string): void {
  const [bin, sub] = cmd.trim().split(/\s+/);
  if (!ALLOWED.has(bin)) throw new Error(`Commande "${bin}" non autorisée par défaut ; passer unsafe=true si c'est voulu.`);
  if (bin === "git" && !GIT_READONLY.has(sub)) throw new Error(`git ${sub} modifie potentiellement le repo ; passer unsafe=true si c'est voulu.`);
}

export function run(cmd: string, cwdRel = ".", timeoutMs = 120_000): RunResult {
  const r = spawnSync(cmd, { cwd: resolveInRoot(cwdRel), shell: true, encoding: "utf8", timeout: timeoutMs, maxBuffer: 32 * 1024 * 1024 });
  const output = redact(`${r.stdout ?? ""}${r.stderr ?? ""}`);
  const logFile = path.join(os.tmpdir(), `dev-agent-mcp-${Date.now()}.log`);
  fs.writeFileSync(logFile, output);
  return { code: r.status ?? -1, timedOut: r.error?.message.includes("ETIMEDOUT") ?? false, output, logFile };
}

const SIGNAL = /\b(error|fail(ed|ure)?|✕|✖|●|exception|assert|expected|received|cannot|not found|TS\d{4})\b|^\s*at .*\(.*:\d+:\d+\)/i;

/** Garde les lignes parlantes (erreurs, échecs) dédupliquées, plus la fin du log. */
export function summarize(output: string, maxLines = 40): string {
  const lines = output.split(/\r?\n/);
  const seen = new Set<string>();
  const signal: string[] = [];
  for (const l of lines) {
    const key = l.trim();
    if (key && SIGNAL.test(l) && !seen.has(key)) {
      seen.add(key);
      signal.push(l.trimEnd().slice(0, 240));
    }
  }
  const tail = lines.filter((l) => l.trim()).slice(-8).filter((l) => !seen.has(l.trim()));
  const head = signal.slice(0, maxLines);
  const more = signal.length > head.length ? [`… ${signal.length - head.length} lignes d'erreur de plus`] : [];
  return [...head, ...more, "--- fin du log ---", ...tail].join("\n");
}

export function execSummary(cmd: string, cwd: string, maxLines: number, timeoutMs?: number): { ok: boolean; text: string } {
  const r = run(cmd, cwd, timeoutMs);
  const body = r.code === 0 && !r.timedOut ? r.output.split(/\r?\n/).filter((l) => l.trim()).slice(-Math.min(maxLines, 10)).join("\n") : summarize(r.output, maxLines);
  const status = r.timedOut ? "TIMEOUT" : r.code === 0 ? "OK" : `ÉCHEC (code ${r.code})`;
  return { ok: r.code === 0 && !r.timedOut, text: `$ ${cmd}  [${cwd}]\n${status}\n${body}\nlog complet: ${r.logFile}` };
}
