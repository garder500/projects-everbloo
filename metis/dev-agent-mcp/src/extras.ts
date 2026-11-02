import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { resolveInRoot, toRel, truncate, walkFiles } from "./fs-utils.js";
import { buildGraph, isTestFile } from "./impact.js";
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
  const escaped = needle.replace(/[$.]/g, "\\$&");
  // Un fichier est « référencé » par un import/require de son nom (« addresses » seul matcherait le verbe anglais) ;
  // un symbole, par le mot entier.
  const re = isPath ? new RegExp(`["'\`][^"'\`\\n]*\\b${escaped}(\\.\\w+)?["'\`]`) : new RegExp(`\\b${escaped}\\b`);
  const hits: string[] = [];
  const direct = new Set<string>();
  for (const f of walkFiles(resolveInRoot(scope))) {
    const rel = toRel(f);
    if (!isTestFile(rel)) continue;
    const lines = fs.readFileSync(f, "utf8").split(/\r?\n/);
    const idx = lines.findIndex((l) => re.test(l));
    if (idx >= 0) {
      direct.add(rel);
      hits.push(`${rel}:${idx + 1}: ${lines[idx].trim().slice(0, 140)}`);
    }
  }
  // Pour un fichier : les tests qui n'importent que ses utilisateurs (ex. un modèle testé via un service) comptent aussi.
  const indirect: string[] = [];
  const abs = isPath ? resolveInRoot(target) : "";
  if (isPath && fs.existsSync(abs) && fs.statSync(abs).isFile()) {
    const start = toRel(abs);
    const { importers } = buildGraph(start.split("/")[0]);
    const dist = new Map<string, number>([[start, 0]]);
    let frontier = [start];
    for (let d = 1; d <= 3 && frontier.length; d++) {
      frontier = frontier.flatMap((f) => [...(importers.get(f) ?? [])]).filter((f) => !dist.has(f));
      frontier.forEach((f) => dist.set(f, d));
    }
    for (const [f, d] of dist) if (d > 0 && isTestFile(f) && !direct.has(f)) indirect.push(`${f} (via dépendants, distance ${d})`);
  }
  const parts = [
    hits.length ? `Tests qui ${isPath ? "importent ce fichier" : "référencent ce symbole"} (${hits.length}):\n${hits.slice(0, 30).join("\n")}` : undefined,
    indirect.length ? `Tests atteints via les dépendants du fichier (${indirect.length}, cohérent avec impact_analysis):\n${indirect.slice(0, 30).join("\n")}` : undefined,
  ].filter(Boolean);
  return parts.join("\n") || `Aucun test ne référence "${needle}" (ni directement ni via ses dépendants)`;
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

const scanned = (lines: [string, number, string][]) => `${lines.length} ligne(s) ajoutée(s) analysée(s) dans ${new Set(lines.map(([f]) => f)).size} fichier(s)`;

export function secretScan(repo = "."): string {
  const added = addedLines(repo);
  const found = added.filter(([, , t]) => hasSecret(t)).map(([f, n]) => `${f}:${n}: secret probable (valeur masquée)`);
  return found.length ? `✗ ${found.length} secret(s) probable(s) dans le diff (${scanned(added)}):\n${found.join("\n")}` : `✓ Aucun secret détecté (${scanned(added)}).`;
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
  const added = addedLines(repo);
  const findings = added.flatMap(([f, n, t]) => [
    ...REVIEW_RULES.filter(([re]) => re.test(t)).map(([, label]) => `${f}:${n}: ${label}`),
    ...(hasSecret(t) ? [`${f}:${n}: secret probable`] : []),
  ]);
  return findings.length ? truncate(`${findings.length} point(s) à vérifier (${scanned(added)}):\n${findings.join("\n")}`) : `✓ Rien à signaler (${scanned(added)}).`;
}

const ENTRY_RULES: [RegExp, string][] = [
  [/@(Route|Controller)\(\s*["'`]([^"'`]*)/, "route (controller)"],
  [/@(Get|Post|Put|Patch|Delete)\(\s*["'`]?([^"'`)]*)/, "endpoint"],
  [/\b(?:router|app)\.(get|post|put|patch|delete)\(\s*["'`]([^"'`]+)/, "route express"],
  [/\b(?:cron\.schedule|schedule(?:Job)?)\(\s*["'`]([^"'`]+)/, "job planifié"],
  [/\.(?:process|consume|subscribe)\(\s*["'`]([^"'`]+)/, "handler d'événement"],
];

/** `filter` : sous-chaîne (insensible à la casse) cherchée dans la ligne ou le chemin, pour ne garder que les routes du sujet. */
export function listEntrypoints(scope = ".", filter?: string): string {
  const out: string[] = [];
  const perFile = new Map<string, number>();
  const needle = filter?.toLowerCase();
  let total = 0;
  for (const f of walkFiles(resolveInRoot(scope))) {
    const rel = toRel(f);
    if (isTestFile(rel)) continue;
    fs.readFileSync(f, "utf8").split(/\r?\n/).forEach((l, i) => {
      const rule = ENTRY_RULES.find(([re]) => re.test(l));
      // `${…}` = gabarit de génération de code (commands/generate…), pas une vraie route
      if (!rule || l.includes("${") || (needle && !l.toLowerCase().includes(needle) && !rel.toLowerCase().includes(needle))) return;
      total++;
      perFile.set(rel, (perFile.get(rel) ?? 0) + 1);
      if (out.length < 200) out.push(`${rel}:${i + 1}: [${rule[1]}] ${l.trim().slice(0, 120)}`);
    });
  }
  // Sans filtre et trop de résultats : un index par fichier vaut mieux qu'une liste tronquée.
  if (!needle && total > 60) {
    const files = [...perFile].sort((a, b) => b[1] - a[1]);
    return truncate(`${total} point(s) d'entrée dans ${files.length} fichier(s) — trop pour tout lister, utiliser filter ou un scope plus précis.\n${files.slice(0, 60).map(([f, n]) => `  ${f} (${n})`).join("\n")}${files.length > 60 ? `\n  … ${files.length - 60} fichier(s) de plus` : ""}`, 10000);
  }
  const more = total > out.length ? `\n… ${total - out.length} de plus (affiner scope ou filter)` : "";
  return truncate(`${total} point(s) d'entrée${filter ? ` pour "${filter}"` : ""}\n${out.join("\n") || "Aucun point d'entrée détecté"}${more}`, 10000);
}
