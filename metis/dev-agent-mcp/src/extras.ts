import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { resolveInRoot, toRel, truncate, walkFiles } from "./fs-utils.js";
import { isTestFile } from "./impact.js";
import { hasSecret } from "./redact.js";

const git = (repo: string, ...args: string[]) =>
  execFileSync("git", args, { cwd: resolveInRoot(repo), encoding: "utf8", maxBuffer: 32 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });

export interface ReadReq { path: string; start?: number; end?: number }

/** Plusieurs lectures (fichier entier ou plage de lignes) en un appel, budget total plafonné. */
export function batchRead(reads: ReadReq[], budget = 12000): string {
  let left = budget;
  return reads
    .map(({ path: p, start, end }) => {
      try {
        const lines = fs.readFileSync(resolveInRoot(p), "utf8").split(/\r?\n/);
        const from = Math.max(1, start ?? 1);
        const to = Math.min(lines.length, end ?? lines.length);
        let body = lines.slice(from - 1, to).map((l, i) => `${from + i}\t${l}`).join("\n");
        if (body.length > left) body = `${body.slice(0, Math.max(0, left))}\n… [budget atteint, relire avec start/end]`;
        left -= body.length;
        return `── ${p}:${from}-${to}\n${body}`;
      } catch (e) {
        return `── ${p}: ${(e as Error).message}`;
      }
    })
    .join("\n");
}

export function fileDiffSince(ref: string, repo = "."): string {
  if (!/^[\w./~^@{}-]+$/.test(ref)) throw new Error("ref invalide");
  return [`changements depuis ${ref}:`, git(repo, "diff", "--name-status", ref).trim() || "(aucun)", "", git(repo, "diff", "--stat", ref).trim()].join("\n");
}

/** Tests qui référencent un symbole (mot entier) ou importent un fichier (par son nom de base). */
export function findTestsFor(target: string, scope = "."): string {
  const isPath = /[\\/]/.test(target) || /\.\w+$/.test(target);
  const needle = isPath ? path.basename(target).replace(/\.\w+$/, "") : target;
  const re = new RegExp(`\\b${needle.replace(/[$.]/g, "\\$&")}\\b`);
  const hits: string[] = [];
  for (const f of walkFiles(resolveInRoot(scope))) {
    const rel = toRel(f);
    if (!isTestFile(rel)) continue;
    const lines = fs.readFileSync(f, "utf8").split(/\r?\n/);
    const idx = lines.findIndex((l) => re.test(l));
    if (idx >= 0) hits.push(`${rel}:${idx + 1}: ${lines[idx].trim().slice(0, 140)}`);
  }
  return hits.slice(0, 30).join("\n") || `Aucun test ne référence "${needle}"`;
}

/** Lignes ajoutées du diff (indexé + non indexé) : [fichier, n° de ligne, texte]. */
export function addedLines(repo: string): [string, number, string][] {
  const out: [string, number, string][] = [];
  for (const diff of [git(repo, "diff", "-U0"), git(repo, "diff", "--cached", "-U0")]) {
    let file = "";
    let n = 0;
    for (const l of diff.split("\n")) {
      if (l.startsWith("+++ ")) file = l.slice(6);
      else if (l.startsWith("@@")) n = Number(/\+(\d+)/.exec(l)?.[1] ?? 0) - 1;
      else if (l.startsWith("+")) out.push([file, ++n, l.slice(1)]);
    }
  }
  return out;
}

export function secretScan(repo = "."): string {
  const found = addedLines(repo).filter(([, , t]) => hasSecret(t)).map(([f, n]) => `${f}:${n}: secret probable (valeur masquée)`);
  return found.length ? `✗ ${found.length} secret(s) probable(s) dans le diff:\n${found.join("\n")}` : "✓ Aucun secret détecté dans le diff.";
}

const REVIEW_RULES: [RegExp, string][] = [
  [/(:\s*any\b|\bas any\b|<any>)/, "type any"],
  [/catch\s*(\([^)]*\))?\s*\{\s*\}/, "erreur avalée (catch vide)"],
  [/\.catch\(\s*\(\)\s*=>\s*(\{\s*\})?\s*\)/, "erreur avalée (.catch vide)"],
  [/console\.(log|debug)\(/, "console.log laissé"],
  [/\b(describe|it|test)\.only\(/, ".only oublié dans un test"],
  [/\b(TODO|FIXME|XXX)\b/, "TODO/FIXME ajouté"],
  [/(log|console)\S*\(.*\b(password|token|card|iban|secret)\b/i, "log potentiellement sensible"],
];

/** Checklist automatique sur les lignes ajoutées du diff. */
export function reviewDiff(repo = "."): string {
  const findings = addedLines(repo).flatMap(([f, n, t]) => [
    ...REVIEW_RULES.filter(([re]) => re.test(t)).map(([, label]) => `${f}:${n}: ${label}`),
    ...(hasSecret(t) ? [`${f}:${n}: secret probable`] : []),
  ]);
  return findings.length ? truncate(`${findings.length} point(s) à vérifier:\n${findings.join("\n")}`) : "✓ Rien à signaler sur les lignes ajoutées.";
}

const ENTRY_RULES: [RegExp, string][] = [
  [/@(Route|Controller)\(\s*["'`]([^"'`]*)/, "route (controller)"],
  [/@(Get|Post|Put|Patch|Delete)\(\s*["'`]?([^"'`)]*)/, "endpoint"],
  [/\b(?:router|app)\.(get|post|put|patch|delete)\(\s*["'`]([^"'`]+)/, "route express"],
  [/\b(?:cron\.schedule|schedule(?:Job)?)\(\s*["'`]([^"'`]+)/, "job planifié"],
  [/\.(?:process|consume|subscribe)\(\s*["'`]([^"'`]+)/, "handler d'événement"],
];

export function listEntrypoints(scope = "."): string {
  const out: string[] = [];
  for (const f of walkFiles(resolveInRoot(scope))) {
    const rel = toRel(f);
    if (isTestFile(rel)) continue;
    fs.readFileSync(f, "utf8").split(/\r?\n/).forEach((l, i) => {
      const rule = ENTRY_RULES.find(([re]) => re.test(l));
      if (rule) out.push(`${rel}:${i + 1}: [${rule[1]}] ${l.trim().slice(0, 120)}`);
    });
    if (out.length >= 200) break;
  }
  return truncate(out.join("\n") || "Aucun point d'entrée détecté", 10000);
}
