import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CODE_EXTS, IGNORED_DIRS, ROOT } from "./config.js";
import { resolveInRoot, toRel, truncate, walkFiles } from "./fs-utils.js";
import { findItem, outline, type OutlineItem } from "./outline.js";
import { redact } from "./redact.js";
import { checkAllowed, execSummary } from "./exec.js";
import { runTests, verifyChange } from "./verify.js";
import { forPath, formatMemories, memoryRecall, memorySave } from "./memory.js";
import { dependencyGraph, impactAnalysis } from "./impact.js";
import { batchRead, fileDiffSince, findTestsFor, listEntrypoints, reviewDiff, secretScan } from "./extras.js";
import { planCheck, riskZones } from "./risk.js";
import { pkgDir } from "./pkg.js";

/** Pièges connus de la zone, injectés quand l'agent ouvre un fichier concerné. */
const withPitfalls = (rel: string, body: string): string => {
  const known = forPath(rel, "pitfall");
  return known.length ? `${body}

⚠ Pièges connus:
${formatMemories(known)}` : body;
};

const text = (s: string) => ({ content: [{ type: "text" as const, text: truncate(redact(s)) }] });
const fail = (e: unknown) => ({ isError: true, content: [{ type: "text" as const, text: e instanceof Error ? e.message : String(e) }] });
const guard = <A>(fn: (a: A) => string) => async (a: A) => {
  try {
    return text(fn(a));
  } catch (e) {
    return fail(e);
  }
};

const readText = (abs: string) => fs.readFileSync(abs, "utf8");
const fmt = (it: OutlineItem) => `${it.exported ? "export " : ""}${it.kind} ${it.name} [${it.start}-${it.end}] ${it.signature}`;

export function projectOverview(): string {
  const out: string[] = [`Workspace: ${ROOT}`];
  const pixi = path.join(ROOT, "pixi.toml");
  if (fs.existsSync(pixi)) {
    const section = readText(pixi).split(/^\[tasks\]/m)[1]?.split(/^\[/m)[0] ?? "";
    const tasks = [...section.matchAll(/^([\w-]+)\s*=/gm)].map((m) => m[1]);
    if (tasks.length) out.push(`pixi run <${tasks.join("|")}>`);
  }
  for (const e of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (!e.isDirectory() || IGNORED_DIRS.has(e.name) || e.name.startsWith(".")) continue;
    let pkgPath: string;
    try {
      pkgPath = path.join(resolveInRoot(pkgDir(e.name)), "package.json");
    } catch {
      continue;
    }
    try {
      const pkg = JSON.parse(readText(pkgPath));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const stack = ["tsoa", "express", "fastify", "@nestjs/core", "sequelize", "pg", "mysql2", "react", "vue", "next", "vite", "jest", "vitest", "mocha"].filter((d) => d in deps);
      const scripts = ["dev", "start", "build", "test", "lint", "typecheck"].filter((s) => pkg.scripts?.[s]);
      out.push(`- ${e.name}: ${pkg.name ?? ""} | stack: ${stack.join(", ") || "?"} | scripts: ${scripts.join(", ") || "-"}`);
    } catch {
      out.push(`- ${e.name}: package.json illisible`);
    }
  }
  return out.join("\n");
}

export function repoMap(rel = ".", depth = 2): string {
  const lines: string[] = [];
  const walk = (dir: string, level: number, indent: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name));
    for (const e of entries) {
      if (lines.length >= 300) return;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (IGNORED_DIRS.has(e.name) || e.name.startsWith(".")) continue;
        const count = [...walkFiles(full)].length;
        // Dossier massif (migrations, fichiers générés) : résumé seulement, pour ne pas noyer le reste de l'arbre.
        const bulky = count > 40;
        lines.push(`${indent}${e.name}/ (${count} fichiers de code${bulky ? ", non détaillé : cibler ce dossier avec path" : ""})`);
        if (level < depth && !bulky) walk(full, level + 1, indent + "  ");
      } else if (CODE_EXTS.has(path.extname(e.name))) {
        const exported = outline(full, readText(full)).filter((i) => i.exported).map((i) => i.name);
        lines.push(`${indent}${e.name}${exported.length ? `: ${exported.slice(0, 6).join(", ")}${exported.length > 6 ? ", …" : ""}` : ""}`);
      }
    }
  };
  walk(resolveInRoot(rel), 1, "");
  return lines.join("\n") || "(vide)";
}

export function readOutline(rel: string): string {
  const abs = resolveInRoot(rel);
  return outline(abs, readText(abs))
    .flatMap((i) => [fmt(i), ...(i.children ?? []).map((c) => `  ${fmt(c)}`)])
    .join("\n");
}

export function readSymbol(rel: string, symbol: string): string {
  const abs = resolveInRoot(rel);
  const content = readText(abs);
  const item = findItem(outline(abs, content), symbol);
  if (!item) throw new Error(`Symbole "${symbol}" introuvable dans ${rel}. Utiliser read_outline.`);
  const lines = content.split(/\r?\n/).slice(item.start - 1, item.end);
  return `${rel}:${item.start}-${item.end}\n${lines.map((l, i) => `${item.start + i}\t${l}`).join("\n")}`;
}

interface Hit { file: string; line: number; ctx: string[] }

function scan(re: RegExp, scope: string, max: number, context: number): { hits: Hit[]; total: number } {
  const hits: Hit[] = [];
  let total = 0;
  for (const file of walkFiles(resolveInRoot(scope))) {
    const lines = readText(file).split(/\r?\n/);
    lines.forEach((l, i) => {
      if (!re.test(l)) return;
      total++;
      if (hits.length < max) {
        hits.push({ file: toRel(file), line: i + 1, ctx: lines.slice(Math.max(0, i - context), i + context + 1) });
      }
    });
  }
  return { hits, total };
}

function formatHits({ hits, total }: { hits: Hit[]; total: number }, compact: boolean): string {
  const byFile = new Map<string, Hit[]>();
  hits.forEach((h) => byFile.set(h.file, [...(byFile.get(h.file) ?? []), h]));
  const out = [...byFile].map(([f, hs]) =>
    `${f}\n${hs.map((h) => (compact ? `  ${h.line}: ${h.ctx[0]?.trim()}` : `  ${h.line}:\n${h.ctx.map((c) => `    ${c}`).join("\n")}`)).join("\n")}`,
  );
  if (total > hits.length) out.push(`… ${total - hits.length} résultats de plus (max atteint)`);
  return out.join("\n") || "Aucun résultat";
}

/** `symbol` = identifiant (`AddressesService`) ou forme pointée (`AddressesService.update`) pour éviter le bruit des noms courants. */
export function findReferences(symbol: string, scope = ".", max = 40): string {
  if (!/^[\w$]+(\.[\w$]+)*$/.test(symbol)) throw new Error("symbol doit être un identifiant, éventuellement pointé (Classe.méthode)");
  const re = new RegExp(`\\b${symbol.replace(/\$/g, "\\$").replace(/\./g, "\\s*\\.\\s*")}\\b`);
  const result = scan(re, scope, max, 1);
  const noisy = !symbol.includes(".") && result.total > 100;
  return `${result.total} occurrence(s) de "${symbol}"${noisy ? " — nom très courant : viser Classe.méthode ou restreindre scope" : ""}\n${formatHits(result, result.hits.length > 30)}`;
}

export function searchCode(pattern: string, scope = ".", max = 50): string {
  return formatHits(scan(new RegExp(pattern), scope, max, 0), true);
}

/** trimEnd uniquement : un trim() mangerait l'espace de tête de la première ligne de `status --short`. */
const git = (cwd: string, ...args: string[]) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trimEnd();

export function gitContext(repo?: string): string {
  if (!repo) {
    const subs = fs.readdirSync(ROOT, { withFileTypes: true }).filter((e) => e.isDirectory() && fs.existsSync(path.join(ROOT, e.name, ".git")));
    return [".", ...subs.map((s) => s.name)]
      .map((r) => {
        try {
          const cwd = path.join(ROOT, r);
          return `${r}: ${git(cwd, "branch", "--show-current")} | ${git(cwd, "status", "--short").split("\n").filter(Boolean).length} fichiers modifiés`;
        } catch {
          return `${r}: git indisponible`;
        }
      })
      .join("\n");
  }
  const cwd = resolveInRoot(repo);
  return [
    `branche: ${git(cwd, "branch", "--show-current")}`,
    `statut:\n${git(cwd, "status", "--short") || "(propre)"}`,
    `diff:\n${git(cwd, "diff", "--stat") || "(aucun)"}`,
    `commits:\n${git(cwd, "log", "-5", "--oneline")}`,
  ].join("\n");
}

export function registerTools(server: McpServer): void {
  const repoArg = { repo: z.string().optional() };
  server.tool(
    "batch_read",
    "Plusieurs lectures (fichier ou plage de lignes) en un appel, budget total plafonné",
    { reads: z.array(z.object({ path: z.string(), start: z.number().int().optional(), end: z.number().int().optional() })).min(1).max(20) },
    guard(({ reads }) => batchRead(reads)),
  );
  server.tool("file_diff_since", "Fichiers et volumes modifiés depuis un commit/ref, sans relire les fichiers", { ref: z.string(), ...repoArg }, guard(({ ref, repo }) => fileDiffSince(ref, repo)));
  server.tool("find_tests_for", "Tests qui référencent un symbole ou un fichier", { target: z.string(), scope: z.string().optional() }, guard(({ target, scope }) => findTestsFor(target, scope)));
  server.tool("dependency_graph", "Imports entrants/sortants d'un fichier et cycles qui le traversent", { file: z.string() }, guard(({ file }) => dependencyGraph(file)));
  server.tool(
    "list_entrypoints",
    "Routes HTTP (tsoa/express), jobs planifiés et handlers d'événements ; scope = dossier ou fichier, filter = mot à retrouver dans la ligne ou le chemin",
    { scope: z.string().optional(), filter: z.string().optional() },
    guard(({ scope, filter }) => listEntrypoints(scope, filter)),
  );
  server.tool("secret_scan", "Détecte clés/tokens/mots de passe dans les lignes ajoutées du diff d'un repo (valeurs masquées)", repoArg, guard(({ repo }) => secretScan(repo)));
  server.tool("review_diff", "Checklist auto sur le diff : any, erreurs avalées, console.log, .only, TODO, logs sensibles, secrets", repoArg, guard(({ repo }) => reviewDiff(repo)));
  const kind = z.enum(["pitfall", "decision", "convention", "note"]);
  server.tool(
    "memory_save",
    "Mémorise un piège, une décision, une convention ou une note rattachée à un chemin (scope) ; secrets masqués",
    { fact: z.string(), kind: kind.optional(), scope: z.string().optional(), tags: z.array(z.string()).optional() },
    guard(({ fact, kind: k, scope, tags }) => formatMemories([memorySave(fact, k, scope, tags)])),
  );
  server.tool(
    "memory_recall",
    "Retrouve les mémoires les plus pertinentes pour une requête (mots-clés), filtrables par chemin",
    { query: z.string(), scope: z.string().optional(), limit: z.number().int().min(1).max(30).optional() },
    guard(({ query, scope, limit }) => formatMemories(memoryRecall(query, scope, limit))),
  );
  server.tool("pitfalls", "Pièges connus de la zone (fichier ou dossier) qu'on s'apprête à modifier", { path: z.string() }, guard(({ path: p }) => formatMemories(forPath(p, "pitfall"))));
  server.tool("conventions", "Conventions applicables à ce fichier ou dossier", { path: z.string() }, guard(({ path: p }) => formatMemories(forPath(p, "convention"))));
  server.tool(
    "impact_analysis",
    "Dépendants (imports relatifs) des fichiers donnés : tests à relancer, routes touchées, modules consommateurs",
    { files: z.array(z.string()).min(1), depth: z.number().int().min(1).max(5).optional() },
    guard(({ files, depth }) => impactAnalysis(files, depth)),
  );
  server.tool("risk_zones", "Indique si des fichiers touchent des zones critiques (paiement, auth, migrations…) et les vérifications obligatoires", { files: z.array(z.string()).min(1) }, guard(({ files }) => riskZones(files).text));
  server.tool(
    "plan_check",
    "Valide un plan avant d'écrire du code : zones sensibles, pièges connus, tests, périmètre, retour arrière",
    { plan: z.string(), files: z.array(z.string()).optional() },
    guard(({ plan, files }) => planCheck(plan, files)),
  );
  server.tool(
    "run_command",
    "Exécute une commande (binaires courants seulement sauf unsafe=true) ; renvoie erreurs + fin du log, log complet dans un fichier",
    { cmd: z.string(), cwd: z.string().optional(), max_lines: z.number().int().min(5).max(200).optional(), timeout_s: z.number().int().min(1).max(600).optional(), unsafe: z.boolean().optional() },
    guard(({ cmd, cwd, max_lines, timeout_s, unsafe }) => {
      if (!unsafe) checkAllowed(cmd, cwd ?? ".");
      return execSummary(cmd, cwd ?? ".", max_lines ?? 40, (timeout_s ?? 120) * 1000).text;
    }),
  );
  server.tool(
    "run_tests",
    "Tests d'un repo ; avec affected_by, uniquement les tests liés à ces fichiers (jest/vitest) ; échecs résumés",
    { repo: z.string(), affected_by: z.array(z.string()).optional(), max_lines: z.number().int().min(5).max(200).optional(), allow_unsafe: z.boolean().optional() },
    guard(({ repo, affected_by, max_lines, allow_unsafe }) => runTests(repo, affected_by, max_lines, allow_unsafe)),
  );
  server.tool(
    "verify_change",
    "Lint (eslint sans --fix, sur les seuls fichiers modifiés), typecheck et tests d'un repo ; un seul verdict. Refuse les scripts qui écrivent (--fix) ou migrent la base sauf allow_unsafe=true",
    { repo: z.string(), allow_unsafe: z.boolean().optional() },
    guard(({ repo, allow_unsafe }) => verifyChange(repo, 25, allow_unsafe)),
  );
  server.tool("project_overview", "Stack, scripts et tâches pixi de chaque projet du workspace", {}, guard(() => projectOverview()));
  server.tool(
    "repo_map",
    "Arbre condensé : dossiers (nb de fichiers) et fichiers avec leurs symboles exportés",
    { path: z.string().optional(), depth: z.number().int().min(1).max(5).optional() },
    guard(({ path: p, depth }) => repoMap(p, depth)),
  );
  server.tool("read_outline", "Plan d'un fichier (signatures + lignes), sans le corps", { path: z.string() }, guard(({ path: p }) => withPitfalls(p, readOutline(p))));
  server.tool(
    "read_symbol",
    "Lit une fonction/classe/méthode seule, avec numéros de ligne",
    { path: z.string(), symbol: z.string() },
    guard(({ path: p, symbol }) => withPitfalls(p, readSymbol(p, symbol))),
  );
  server.tool(
    "find_references",
    "Usages d'un identifiant, groupés par fichier, avec 1 ligne de contexte de chaque côté",
    { symbol: z.string(), scope: z.string().optional(), max_results: z.number().int().min(1).max(200).optional() },
    guard(({ symbol, scope, max_results }) => findReferences(symbol, scope, max_results)),
  );
  server.tool(
    "search_code",
    "Regex sur le code (ts/js), résultats groupés par fichier et tronqués",
    { regex: z.string(), scope: z.string().optional(), max_results: z.number().int().min(1).max(200).optional() },
    guard(({ regex, scope, max_results }) => searchCode(regex, scope, max_results)),
  );
  server.tool(
    "git_context",
    "Branche et fichiers modifiés de chaque sous-repo ; avec repo : statut, diff résumé, 5 derniers commits",
    { repo: z.string().optional() },
    guard(({ repo }) => gitContext(repo)),
  );
}
