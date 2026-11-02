import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./config.js";
import { redact } from "./redact.js";

export type MemoryKind = "pitfall" | "decision" | "convention" | "note";

export interface Memory {
  id: number;
  kind: MemoryKind;
  fact: string;
  scope: string; // préfixe de chemin relatif au workspace, "*" = global
  tags: string[];
  createdAt: string;
}

/** Fichier versionnable (savoir d'équipe) ; surchargeable pour les tests. */
const memoryFile = () => process.env.DEV_AGENT_MEMORY_FILE ?? path.join(ROOT, ".dev-agent", "memory.json");

function load(): Memory[] {
  try {
    return JSON.parse(fs.readFileSync(memoryFile(), "utf8"));
  } catch {
    return [];
  }
}

export function memorySave(fact: string, kind: MemoryKind = "note", scope = "*", tags: string[] = []): Memory {
  const all = load();
  const clean = redact(fact).trim();
  const dup = all.find((m) => m.fact === clean && m.scope === scope && m.kind === kind);
  if (dup) return dup;
  const mem: Memory = {
    id: all.reduce((max, m) => Math.max(max, m.id), 0) + 1,
    kind,
    fact: clean,
    scope: scope.replace(/\\/g, "/").replace(/\/+$/, "") || "*",
    tags,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  fs.mkdirSync(path.dirname(memoryFile()), { recursive: true });
  fs.writeFileSync(memoryFile(), JSON.stringify([...all, mem], null, 2));
  return mem;
}

const words = (s: string) => s.toLowerCase().split(/[^\p{L}\p{N}_]+/u).filter((w) => w.length > 2);

/** Mémoires dont le scope couvre ce chemin (le plus spécifique d'abord). */
export function forPath(rel: string, kind?: MemoryKind): Memory[] {
  const p = rel.replace(/\\/g, "/");
  return load()
    .filter((m) => (!kind || m.kind === kind) && (m.scope === "*" || p === m.scope || p.startsWith(`${m.scope}/`)))
    .sort((a, b) => b.scope.length - a.scope.length);
}

export function memoryRecall(query: string, scope?: string, limit = 8): Memory[] {
  const q = new Set(words(query));
  return load()
    .filter((m) => !scope || m.scope === "*" || scope.startsWith(m.scope) || m.scope.startsWith(scope))
    .map((m) => ({ m, score: words(`${m.fact} ${m.tags.join(" ")} ${m.scope}`).filter((w) => q.has(w)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.m);
}

export const formatMemories = (ms: Memory[]): string =>
  ms.map((m) => `#${m.id} [${m.kind}] (${m.scope}) ${m.fact}${m.tags.length ? ` {${m.tags.join(", ")}}` : ""}`).join("\n") || "Aucune entrée";
