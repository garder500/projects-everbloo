import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { resolveInRoot } from "./fs-utils.js";
import { pkgDir, readPkg, scriptRisk } from "./pkg.js";
import { redact } from "./redact.js";

/**
 * Binaires autorisés par défaut. Ce n'est PAS un bac à sable : `npm`/`node`/`bun` exécutent du code du projet.
 * Le but est d'éviter les erreurs (rm, git push, scripts qui migrent la base), pas de contenir un acteur malveillant.
 */
const ALLOWED = new Set(["pixi", "npm", "pnpm", "yarn", "bun", "node", "tsc", "eslint", "prettier", "jest", "vitest", "git", "echo", "ls", "cat", "dir", "type", "where", "findstr"]);
const GIT_READONLY = new Set(["status", "diff", "log", "show", "rev-parse", "blame", "ls-files", "describe", "shortlog", "reflog", "rev-list", "cat-file", "ls-tree", "grep", "diff-tree", "merge-base", "name-rev", "ls-remote"]);
/** Sous-commandes git à double usage : lecture seule tant que l'argument n'écrit pas (ex. `branch -d`, `stash drop`). */
const GIT_CONDITIONAL: Record<string, RegExp> = {
  branch: /^branch(\s+(-a|-r|-v|-vv|--list|--show-current|--contains|--merged|--no-merged|--all|--remotes|--verbose)\b[^;&|]*)*\s*$/,
  stash: /^stash\s+(list|show)\b/,
  remote: /^remote(\s+(-v|show\b.*|get-url\b.*))?\s*$/,
  config: /^config\s+(--get\b|--get-all\b|--list\b|-l\b)/,
  tag: /^tag(\s+(-l|--list)\b.*)?\s*$/,
};
const EVAL_FLAGS = /(^|\s)(-e|-p|--eval|--print|-r|--require|--import)(\s|=|$)/;
const PM_SCRIPT = /^(npm|pnpm|yarn|bun)\s+(?:run\s+)?([\w:.-]+)/;

export interface RunResult {
  code: number;
  timedOut: boolean;
  output: string;
  logFile: string;
}

export function checkAllowed(cmd: string, cwd = "."): void {
  const trimmed = cmd.trim();
  const [bin, sub] = trimmed.split(/\s+/);
  if (!ALLOWED.has(bin)) throw new Error(`Commande "${bin}" non autorisée par défaut ; passer unsafe=true si c'est voulu.`);
  if (bin === "git") {
    const rest = trimmed.replace(/^git\s+(-C\s+\S+\s+)?/, "");
    const cond = GIT_CONDITIONAL[rest.split(/\s+/)[0]];
    if (!GIT_READONLY.has(rest.split(/\s+/)[0]) && !(cond && cond.test(rest))) {
      throw new Error(`git ${sub} peut modifier le repo ; passer unsafe=true si c'est voulu (lecture seule autorisée : status, diff, log, show, blame, branch -a/--list/--show-current, stash list, remote -v, config --get, tag -l…).`);
    }
  }
  if ((bin === "node" || bin === "bun") && EVAL_FLAGS.test(trimmed)) throw new Error(`${bin} avec -e/--eval/--print/--require exécute du code arbitraire ; passer unsafe=true si c'est voulu.`);
  const script = PM_SCRIPT.exec(trimmed);
  if (script && !["install", "i", "ci", "add", "remove", "exec", "x", "dlx"].includes(script[2])) {
    try {
      const risk = scriptRisk(readPkg(pkgDir(cwd)), script[2]);
      if (risk) throw new Error(`${risk} ; passer unsafe=true si c'est voulu.`);
    } catch (e) {
      if ((e as Error).message.includes("unsafe=true")) throw e; // pas de package.json : rien à vérifier
    }
  }
}

export function run(cmd: string, cwdRel = ".", timeoutMs = 120_000): RunResult {
  const r = spawnSync(cmd, { cwd: resolveInRoot(cwdRel), shell: true, encoding: "utf8", timeout: timeoutMs, maxBuffer: 32 * 1024 * 1024 });
  // Les avertissements CRLF de git (« LF will be replaced by CRLF ») reviennent à chaque appel et ne servent à rien.
  const output = redact(`${r.stdout ?? ""}${r.stderr ?? ""}`)
    .split("\n")
    .filter((l) => !/^warning: in the working copy of .* will be replaced by/.test(l))
    .join("\n");
  const logFile = path.join(os.tmpdir(), `dev-agent-mcp-log-${Date.now()}.log`);
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
  return [...head, ...more, ...(tail.length ? ["--- dernières lignes du log ---", ...tail] : [])].join("\n");
}

/** Résumé d'une sortie eslint `-f unix` : erreurs avec fichier:ligne (les warnings ne sont que comptés), puis le total. */
export function summarizeLint(output: string, maxLines = 25): string {
  const lines = output.split(/\r?\n/).filter((l) => l.trim());
  const errors = lines.filter((l) => /\[Error\//.test(l));
  const warnings = lines.filter((l) => /\[Warning\//.test(l)).length;
  const total = lines.find((l) => /\d+ problems?/.test(l));
  const shown = errors.slice(0, maxLines).map((l) => l.replace(/^.*[\\/]src[\\/]/, "").slice(0, 220));
  const more = errors.length > shown.length ? [`… ${errors.length - shown.length} erreur(s) de plus`] : [];
  return [...shown, ...more, `${errors.length} erreur(s), ${warnings} warning(s)${total ? ` — ${total.trim()}` : ""}`].join("\n");
}

export function execSummary(cmd: string, cwd: string, maxLines: number, timeoutMs?: number, summarizer: (out: string, max: number) => string = summarize): { ok: boolean; text: string } {
  const r = run(cmd, cwd, timeoutMs);
  const ok = r.code === 0 && !r.timedOut;
  const lines = r.output.split(/\r?\n/).filter((l) => l.trim());
  const body = ok
    ? [...(lines.length > maxLines ? [`… ${lines.length - maxLines} ligne(s) plus haut (voir log complet)`] : []), ...lines.slice(-maxLines)].join("\n")
    : summarizer(r.output, maxLines);
  const status = r.timedOut ? "TIMEOUT" : ok ? "OK" : `ÉCHEC (code ${r.code})`;
  return { ok, text: `$ ${cmd}  [${cwd}]\n${status}\n${body}\nlog complet: ${r.logFile}` };
}
