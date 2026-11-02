import fs from "node:fs";
import path from "node:path";
import { CODE_EXTS, ROOT } from "./config.js";
import { resolveInRoot, toRel, walkFiles } from "./fs-utils.js";

const IMPORT_RE = /(?:from\s+|import\s*\(\s*|require\s*\(\s*|import\s+)["']([^"']+)["']/g;
const TEST_RE = /(\.|\/)(test|spec)\.|(^|\/)(tests?|__tests__)\//;
const ROUTE_RE = /(route|controller|handler|endpoint)s?\b/i;

function resolveSpec(fromFile: string, spec: string, known: Set<string>): string | undefined {
  if (!spec.startsWith(".")) return undefined;
  const base = path.join(path.dirname(fromFile), spec).split(path.sep).join("/").replace(/\.(js|mjs|cjs|jsx)$/, "");
  for (const cand of [...[...CODE_EXTS].map((e) => base + e), ...[...CODE_EXTS].map((e) => `${base}/index${e}`)]) {
    if (known.has(cand)) return cand;
  }
  return undefined;
}

export const isTestFile = (f: string): boolean => TEST_RE.test(f);

/** Graphe d'imports relatifs : imports (fichier → ce qu'il importe) et importers (l'inverse). */
export function buildGraph(scope = "."): { imports: Map<string, Set<string>>; importers: Map<string, Set<string>> } {
  const files = [...walkFiles(resolveInRoot(scope))].map(toRel);
  const known = new Set(files);
  const imports = new Map<string, Set<string>>();
  const importers = new Map<string, Set<string>>();
  for (const f of files) {
    const src = fs.readFileSync(path.join(ROOT, f), "utf8");
    for (const m of src.matchAll(IMPORT_RE)) {
      const target = resolveSpec(f, m[1], known);
      if (!target) continue;
      imports.set(f, (imports.get(f) ?? new Set()).add(target));
      importers.set(target, (importers.get(target) ?? new Set()).add(f));
    }
  }
  return { imports, importers };
}

/** Graphe inverse : fichier → fichiers qui l'importent (imports relatifs uniquement). */
export const buildImporters = (scope = "."): Map<string, Set<string>> => buildGraph(scope).importers;

/** Imports entrants/sortants d'un fichier et cycles qui le traversent. */
export function dependencyGraph(file: string): string {
  const rel = toRel(resolveInRoot(file));
  const { imports, importers } = buildGraph(rel.split("/")[0]);
  const cycles: string[][] = [];
  const dfs = (cur: string, trail: string[]) => {
    if (cycles.length >= 5 || trail.length > 8) return;
    for (const next of imports.get(cur) ?? []) {
      if (next === rel) cycles.push([...trail, rel]);
      else if (!trail.includes(next)) dfs(next, [...trail, next]);
    }
  };
  dfs(rel, [rel]);
  const list = (s?: Set<string>) => [...(s ?? [])].sort().map((f) => `  ${f}`).join("\n") || "  (aucun)";
  return [
    `${rel}`,
    `Importe (${imports.get(rel)?.size ?? 0}):\n${list(imports.get(rel))}`,
    `Importé par (${importers.get(rel)?.size ?? 0}):\n${list(importers.get(rel))}`,
    cycles.length ? `⚠ Cycles:\n${cycles.map((c) => `  ${c.join(" → ")}`).join("\n")}` : "Aucun cycle",
  ].join("\n");
}

export function impactAnalysis(files: string[], depth = 3): string {
  const rels = files.map((f) => toRel(resolveInRoot(f)));
  // Limite le scan au(x) projet(s) touché(s) : 1er segment du chemin.
  const roots = [...new Set(rels.map((r) => r.split("/")[0]))];
  const importers = new Map<string, Set<string>>();
  for (const root of roots) for (const [k, v] of buildImporters(root)) importers.set(k, v);

  const dependents = new Map<string, number>(); // fichier → distance
  let frontier = rels;
  for (let d = 1; d <= depth && frontier.length; d++) {
    const next: string[] = [];
    for (const f of frontier) {
      for (const imp of importers.get(f) ?? []) {
        if (!dependents.has(imp) && !rels.includes(imp)) {
          dependents.set(imp, d);
          next.push(imp);
        }
      }
    }
    frontier = next;
  }
  const all = [...dependents].sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]));
  const tests = all.filter(([f]) => TEST_RE.test(f));
  const routes = all.filter(([f]) => !TEST_RE.test(f) && ROUTE_RE.test(f));
  const others = all.filter(([f]) => !TEST_RE.test(f) && !ROUTE_RE.test(f));
  const fmt = (xs: [string, number][], max = 25) =>
    xs.slice(0, max).map(([f, d]) => `  ${f} (distance ${d})`).join("\n") + (xs.length > max ? `\n  … ${xs.length - max} de plus` : "") || "  (aucun)";
  return [
    `Fichiers modifiés: ${rels.join(", ")}`,
    `Dépendants directs/indirects: ${all.length} (profondeur ${depth}; imports relatifs seulement)`,
    `Tests à relancer (${tests.length}):\n${fmt(tests)}`,
    `Routes/contrôleurs touchés (${routes.length}):\n${fmt(routes)}`,
    `Autres modules consommateurs (${others.length}):\n${fmt(others)}`,
  ].join("\n");
}
