import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { ROOT } from "./config.js";
import { resolveInRoot, toRel, walkFiles } from "./fs-utils.js";
import { outline, type OutlineItem } from "./outline.js";

export interface Chunk {
  file: string;
  name: string;
  kind: OutlineItem["kind"];
  signature: string;
  start: number;
  end: number;
  exported: boolean;
  text: string;
  tokens: string[];
}

const KEYWORDS = new Set(["if", "for", "while", "switch", "catch", "function", "return", "typeof", "await", "async", "new", "super", "require", "import"]);

/** camelCase / snake_case / kebab → mots en minuscules (len ≥ 2). */
export function tokenize(s: string): string[] {
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length >= 2);
}

const fileCache = new Map<string, { mtime: number; chunks: Chunk[] }>();

/** Cache disque des plans de fichiers (mtime + taille) : le parsing TypeScript est l'essentiel du coût à froid. */
const diskFile = path.join(os.tmpdir(), `dev-agent-mcp-index-v2-${createHash("sha1").update(ROOT).digest("hex").slice(0, 10)}.json`);
type DiskEntry = { mtime: number; size: number; items: OutlineItem[] };
let disk: Map<string, DiskEntry> | undefined;
let diskDirty = false;

function loadDisk(): Map<string, DiskEntry> {
  if (!disk) {
    try {
      disk = new Map(Object.entries(JSON.parse(fs.readFileSync(diskFile, "utf8"))));
    } catch {
      disk = new Map();
    }
  }
  return disk;
}

function saveDisk(): void {
  if (!diskDirty || !disk) return;
  try {
    fs.writeFileSync(diskFile, JSON.stringify(Object.fromEntries(disk)));
    diskDirty = false;
  } catch {
    /* cache best-effort */
  }
}

function chunksOf(abs: string): Chunk[] {
  const st = fs.statSync(abs);
  const hit = fileCache.get(abs);
  if (hit && hit.mtime === st.mtimeMs) return hit.chunks;
  const content = fs.readFileSync(abs, "utf8");
  const lines = content.split(/\r?\n/);
  const file = toRel(abs);
  const cached = loadDisk().get(abs);
  let items: OutlineItem[];
  if (cached && cached.mtime === st.mtimeMs && cached.size === st.size) {
    items = cached.items;
  } else {
    try {
      items = outline(abs, content);
    } catch {
      items = []; // fichier non analysable : ignoré
    }
    loadDisk().set(abs, { mtime: st.mtimeMs, size: st.size, items });
    diskDirty = true;
  }
  const out: Chunk[] = [];
  const add = (it: OutlineItem) => {
    const text = lines.slice(it.start - 1, it.end).join("\n");
    out.push({ file, name: it.name, kind: it.kind, signature: it.signature, start: it.start, end: it.end, exported: it.exported, text, tokens: tokenize(`${it.name} ${text.slice(0, 4000)}`) });
    it.children?.forEach(add);
  };
  items.forEach(add);
  fileCache.set(abs, { mtime: st.mtimeMs, chunks: out });
  return out;
}

export function indexScope(scope = "."): Chunk[] {
  const chunks = [...walkFiles(resolveInRoot(scope))].flatMap(chunksOf);
  saveDisk();
  return chunks;
}

export function fileChunks(rel: string): Chunk[] {
  return chunksOf(resolveInRoot(rel));
}

/** Commentaire JSDoc / ligne(s) `//` juste au-dessus d'une déclaration. */
function docAbove(file: string, start: number): string {
  const lines = fs.readFileSync(resolveInRoot(file), "utf8").split(/\r?\n/);
  const doc: string[] = [];
  for (let i = start - 2; i >= 0 && doc.length < 8; i--) {
    const l = lines[i].trim();
    if (!l) break;
    if (l.startsWith("//") || l.startsWith("*") || l.startsWith("/*")) doc.unshift(l.replace(/^(\/\*+|\*+\/?|\/\/)\s?/, ""));
    else break;
  }
  return doc.join(" ").trim();
}

export function findSymbol(name: string, scope = ".", limit = 15): string {
  const q = name.toLowerCase();
  const all = indexScope(scope);
  const exact = all.filter((c) => c.name === name);
  const loose = all.filter((c) => c.name !== name && c.name.toLowerCase().includes(q));
  const hits = [...exact, ...loose].slice(0, limit);
  if (!hits.length) return `Aucun symbole "${name}".`;
  return hits
    .map((c) => {
      const doc = docAbove(c.file, c.start);
      return `${c.file}:${c.start}-${c.end} ${c.exported ? "export " : ""}${c.kind} ${c.name}\n  ${c.signature}${doc ? `\n  doc: ${doc.slice(0, 200)}` : ""}`;
    })
    .join("\n");
}

/** Fenêtre autour d'un symbole : le symbole + `context` lignes de chaque côté. */
export function readRangeSmart(rel: string, around: string, context = 5): string {
  const c = fileChunks(rel).find((x) => x.name === around);
  if (!c) throw new Error(`Symbole "${around}" introuvable dans ${rel}. Utiliser read_outline.`);
  const lines = fs.readFileSync(resolveInRoot(rel), "utf8").split(/\r?\n/);
  const from = Math.max(1, c.start - context);
  const to = Math.min(lines.length, c.end + context);
  return `${rel}:${from}-${to}\n${lines.slice(from - 1, to).map((l, i) => `${from + i}\t${l}`).join("\n")}`;
}

/** Recherche lexicale pondérée BM25 sur les symboles (noms découpés camelCase/snake_case) : pas d'embeddings. */
export function searchSemantic(query: string, scope = ".", k = 8): string {
  const chunks = indexScope(scope).filter((c) => c.kind !== "method" || c.tokens.length > 0);
  const q = [...new Set(tokenize(query))];
  if (!q.length || !chunks.length) return "Requête vide ou rien d'indexé.";
  const N = chunks.length;
  const avg = chunks.reduce((n, c) => n + c.tokens.length, 0) / N;
  const df = new Map<string, number>();
  for (const c of chunks) for (const t of new Set(c.tokens)) df.set(t, (df.get(t) ?? 0) + 1);
  const scored = chunks
    .map((c) => {
      const tf = new Map<string, number>();
      c.tokens.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));
      const nameTokens = new Set(tokenize(c.name));
      let score = 0;
      for (const t of q) {
        const f = tf.get(t) ?? 0;
        if (!f) continue;
        const idf = Math.log(1 + (N - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5));
        score += idf * ((f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (c.tokens.length / avg)))) * (nameTokens.has(t) ? 2 : 1);
      }
      return { c, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
  if (!scored.length) return `Aucun résultat pour "${query}".`;
  return scored.map(({ c, score }) => `${c.file}:${c.start}-${c.end} ${c.kind} ${c.name} (${score.toFixed(1)})\n  ${c.signature}`).join("\n");
}

const shingles = (text: string): Set<string> => {
  const toks = text.split(/[^\w$]+/).filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + 3 <= toks.length; i++) out.add(toks.slice(i, i + 3).join(" "));
  return out;
};

/** Code déjà présent qui ressemble à l'extrait (similarité de 3-grammes de tokens) : éviter un helper en double. */
export function findSimilarCode(snippet: string, scope = ".", limit = 5): string {
  const target = shingles(snippet);
  if (target.size < 2) throw new Error("Extrait trop court (au moins ~5 tokens).");
  // Part de l'extrait retrouvée dans le candidat (et non Jaccard) : un extrait de 3 lignes copié d'une longue fonction doit ressortir.
  const scored = indexScope(scope)
    .filter((c) => c.kind !== "class")
    .map((c) => {
      const s = shingles(c.text);
      let inter = 0;
      for (const x of target) if (s.has(x)) inter++;
      return { c, sim: inter / target.size };
    })
    .filter((x) => x.sim >= 0.5)
    .sort((a, b) => b.sim - a.sim || a.c.end - a.c.start - (b.c.end - b.c.start)) // à similarité égale, le plus petit bloc d'abord
    .slice(0, limit);
  return scored.length ? scored.map(({ c, sim }) => `${Math.round(sim * 100)}% de l'extrait  ${c.file}:${c.start}-${c.end} ${c.kind} ${c.name}`).join("\n") : "Aucun code similaire trouvé.";
}

/** Graphe d'appels PAR NOM (sans résolution de types) : homonymes possibles. */
export function callGraph(symbol: string, direction: "in" | "out", depth = 1, scope = "."): string {
  const all = indexScope(scope);
  const byName = new Map<string, Chunk[]>();
  all.forEach((c) => byName.set(c.name, [...(byName.get(c.name) ?? []), c]));
  const calls = (c: Chunk): Set<string> => {
    const out = new Set<string>();
    for (const m of c.text.slice(c.text.indexOf("\n") >= 0 ? c.text.indexOf("\n") : 0).matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)) {
      if (!KEYWORDS.has(m[1]) && m[1] !== c.name) out.add(m[1]);
    }
    return out;
  };
  const lines: string[] = [];
  let omitted = 0;
  // « Classe.méthode » : on ne garde que les appels écrits explicitement Classe.méthode( — beaucoup moins d'homonymes.
  const dotted = symbol.includes(".") ? symbol.split(".") : undefined;
  const target = dotted ? dotted[dotted.length - 1] : symbol;
  const qualified = dotted ? new RegExp(`\\b${dotted.join("\\s*\\.\\s*")}\\s*\\(`) : undefined;
  const seen = new Set<string>([target]);
  let frontier = [target];
  // Corps de fonctions/méthodes seulement : une classe englobe ses méthodes et fausserait les appelants.
  const bodies = all.filter((c) => c.kind !== "class");
  const nameCall = (n: string) => new RegExp(`(^|[^\\w$])${n.replace(/\$/g, "\\$")}\\s*\\(`);

  for (let d = 1; d <= depth && frontier.length; d++) {
    const next: string[] = [];
    for (const name of frontier) {
      if (direction === "out") {
        const related = [...new Set((byName.get(name) ?? []).flatMap((c) => [...calls(c)]))].filter((n) => byName.has(n));
        omitted += Math.max(0, related.length - 25);
        for (const r of related.slice(0, 25)) {
          const where = (byName.get(r) ?? []).slice(0, 2).map((c) => `${c.file}:${c.start}`).join(", ");
          lines.push(`${"  ".repeat(d - 1)}${name} → ${r}  (${where})`);
          if (!seen.has(r)) {
            seen.add(r);
            next.push(r);
          }
        }
        continue;
      }
      // entrant : chaque site d'appel (fichier:ligne) et la fonction qui le contient
      const re = d === 1 && qualified ? qualified : nameCall(name);
      const sites: { c: Chunk; line: number }[] = [];
      for (const c of bodies) {
        if (c.name === name && !qualified) continue; // récursion triviale
        c.text.split("\n").forEach((l, i) => {
          if (i > 0 && re.test(l)) sites.push({ c, line: c.start + i });
        });
      }
      omitted += Math.max(0, sites.length - 30);
      for (const { c, line } of sites.slice(0, 30)) {
        lines.push(`${"  ".repeat(d - 1)}${c.name} → ${name}  (${c.file}:${line})`);
        if (!seen.has(c.name)) {
          seen.add(c.name);
          next.push(c.name);
        }
      }
    }
    frontier = next;
  }
  omitted += Math.max(0, lines.length - 80);
  const note = omitted ? `\n… ${omitted} relation(s) non affichée(s) (plafonds : 25-30 par symbole, 80 lignes) — nom trop courant ? essayer Classe.méthode` : "";
  return lines.length ? `(appels détectés par nom, sans résolution de types)\n${lines.slice(0, 80).join("\n")}${note}` : `Aucun appel ${direction === "out" ? "sortant" : "entrant"} trouvé pour "${symbol}".`;
}

const summaries = new Map<string, string>();
const hash = (s: string) => createHash("sha1").update(s).digest("hex");

function summarizeContent(rel: string, content: string): string {
  const lines = content.split(/\r?\n/);
  const header = (/^\s*(?:\/\*+([\s\S]*?)\*\/|((?:\/\/.*\n?)+))/.exec(content)?.[0] ?? "").replace(/^\s*(\/\*+|\*\/|\*|\/\/)\s?/gm, "").replace(/\s+/g, " ").trim();
  const libs = [...new Set([...content.matchAll(/(?:from\s+|require\s*\(\s*)["']([^."'][^"']*)["']/g)].map((m) => m[1]))].slice(0, 8);
  const items = fileChunksFromContent(rel, content);
  const exported = items.filter((i) => i.exported).map((i) => i.name);
  return [
    `${rel} — ${lines.length} lignes`,
    header ? `  rôle: ${header.slice(0, 200)}` : undefined,
    libs.length ? `  dépend de: ${libs.join(", ")}` : undefined,
    `  symboles: ${items.filter((i) => i.kind !== "method").map((i) => `${i.exported ? "+" : ""}${i.name}`).slice(0, 15).join(", ") || "-"}${exported.length ? "" : ""}`,
  ].filter(Boolean).join("\n");
}

function fileChunksFromContent(rel: string, content: string): OutlineItem[] {
  try {
    return outline(rel, content);
  } catch {
    return [];
  }
}

/** Résumé heuristique d'un fichier, mis en cache par hash de contenu (invalidé dès que le contenu change). */
export function summarizeFile(rel: string): string {
  const content = fs.readFileSync(resolveInRoot(rel), "utf8");
  const key = `${rel}:${hash(content)}`;
  let s = summaries.get(key);
  if (!s) {
    s = summarizeContent(rel, content);
    summaries.set(key, s);
  }
  return s;
}

const dirLines = new Map<string, string>();

/** Une ligne par fichier (nom, taille, rôle, symboles principaux) : tient dans un budget fixe, même pour un gros dossier. */
function summaryLine(abs: string): string {
  const content = fs.readFileSync(abs, "utf8");
  const key = `${abs}:${hash(content)}`;
  let line = dirLines.get(key);
  if (!line) {
    const header = (/^\s*(?:\/\*+([\s\S]*?)\*\/|((?:\/\/.*\n?)+))/.exec(content)?.[0] ?? "").replace(/^\s*(\/\*+|\*\/|\*|\/\/)\s?/gm, "").replace(/\s+/g, " ").trim();
    const items = fileChunksFromContent(abs, content).filter((i) => i.kind !== "method");
    const syms = items.slice(0, 6).map((i) => `${i.exported ? "+" : ""}${i.name}`).join(", ");
    line = `${path.basename(abs)} (${content.split("\n").length} l.)${header ? ` — ${header.slice(0, 70)}` : ""}${syms ? ` — ${syms}${items.length > 6 ? ", …" : ""}` : ""}`;
    dirLines.set(key, line);
  }
  return line;
}

export function summarizeDir(rel: string, budget = 6000): string {
  const files = [...walkFiles(resolveInRoot(rel))];
  if (!files.length) return "Aucun fichier de code.";
  const out: string[] = [];
  let used = 0;
  for (const f of files) {
    const l = summaryLine(f);
    if (used + l.length > budget) break;
    out.push(l);
    used += l.length + 1;
  }
  const rest = files.length - out.length;
  return `${rel} — ${files.length} fichier(s)\n${out.join("\n")}${rest > 0 ? `\n… ${rest} fichier(s) non listé(s) (budget) : viser un sous-dossier` : ""}`;
}
