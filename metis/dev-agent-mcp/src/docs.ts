import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./config.js";
import { resolveInRoot } from "./fs-utils.js";
import { pkgDir } from "./pkg.js";

/** Dossier d'une lib installée : node_modules du projet, sinon celui du workspace. */
function libDir(lib: string, project?: string): string {
  const bases = [project ? resolveInRoot(pkgDir(project)) : undefined, ROOT].filter((b): b is string => !!b);
  for (const b of bases) {
    const d = path.join(b, "node_modules", lib);
    if (fs.existsSync(path.join(d, "package.json"))) return d;
  }
  throw new Error(`"${lib}" n'est pas installée${project ? ` dans ${project}` : ""} (lancer l'install du projet).`);
}

const installedVersion = (dir: string): string => JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8")).version;
const words = (s: string) => s.toLowerCase().split(/[^\p{L}\p{N}_]+/u).filter((w) => w.length > 2);

function sections(md: string): { title: string; body: string }[] {
  const out: { title: string; body: string }[] = [];
  let cur = { title: "(intro)", body: "" };
  for (const l of md.split(/\r?\n/)) {
    if (/^#{1,4}\s/.test(l)) {
      out.push(cur);
      cur = { title: l.replace(/^#+\s*/, ""), body: "" };
    } else cur.body += `${l}\n`;
  }
  return [...out, cur];
}

/** Doc de la version installée (README + docs/*.md du paquet), sections les plus pertinentes. */
export function docsLookup(lib: string, query: string, project?: string): string {
  const dir = libDir(lib, project);
  const files = ["README.md", "readme.md", ...(fs.existsSync(path.join(dir, "docs")) ? fs.readdirSync(path.join(dir, "docs")).filter((f) => f.endsWith(".md")).map((f) => `docs/${f}`) : [])];
  const q = new Set(words(query));
  const scored = files
    .filter((f) => fs.existsSync(path.join(dir, f)))
    .flatMap((f) => sections(fs.readFileSync(path.join(dir, f), "utf8")).map((s) => ({ f, ...s })))
    .map((s) => ({ ...s, score: words(`${s.title} ${s.title} ${s.body}`).filter((w) => q.has(w)).length }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const head = `${lib}@${installedVersion(dir)} (version installée)`;
  return scored.length ? [head, ...scored.map((s) => `\n## ${s.title}  [${s.f}]\n${s.body.trim().slice(0, 1500)}`)].join("\n") : `${head}\nAucune section pertinente pour "${query}".`;
}

const num = (v: string) => v.split(/[.-]/).slice(0, 3).map((n) => parseInt(n, 10) || 0);
const cmp = (a: string, b: string) => {
  const [x, y] = [num(a), num(b)];
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
};

/** Entrées du CHANGELOG du paquet installé pour from < version <= to (défaut : version installée). */
export function changelogDiff(lib: string, from: string, to?: string, project?: string): string {
  const dir = libDir(lib, project);
  const target = to ?? installedVersion(dir);
  const file = ["CHANGELOG.md", "changelog.md", "CHANGES.md", "HISTORY.md"].find((f) => fs.existsSync(path.join(dir, f)));
  if (!file) return `Pas de changelog dans ${lib}@${installedVersion(dir)}.`;
  const parts = fs.readFileSync(path.join(dir, file), "utf8").split(/^(?=#{1,3}\s*\[?v?\d+\.\d+\.\d+)/m);
  const picked = parts.filter((p) => {
    const v = /^#{1,3}\s*\[?v?(\d+\.\d+\.\d+[\w.-]*)/.exec(p)?.[1];
    return v && cmp(v, from) > 0 && cmp(v, target) <= 0;
  });
  const text = picked.map((p) => p.trim().slice(0, 1200)).join("\n\n");
  return text ? `${lib}: ${from} → ${target}\n\n${text}` : `Aucune entrée entre ${from} et ${target} dans ${file}.`;
}

/** Extrait ciblé d'une spec lourde (md, yaml, json) : le bloc qui commence à la première occurrence de `section`. */
export function specLookup(rel: string, section: string, maxLines = 80): string {
  const lines = fs.readFileSync(resolveInRoot(rel), "utf8").split(/\r?\n/);
  const needle = section.toLowerCase();
  const i = lines.findIndex((l) => l.toLowerCase().includes(needle));
  if (i < 0) throw new Error(`Section "${section}" introuvable dans ${rel}`);
  const heading = /^(#+)\s/.exec(lines[i]);
  const indent = (l: string) => l.length - l.trimStart().length;
  let end = i + 1;
  while (end < lines.length && end - i < maxLines) {
    const l = lines[end];
    if (heading ? new RegExp(`^#{1,${heading[1].length}}\\s`).test(l) : l.trim() && indent(l) <= indent(lines[i])) break;
    end++;
  }
  return `${rel}:${i + 1}-${end}\n${lines.slice(i, end).join("\n")}`;
}
