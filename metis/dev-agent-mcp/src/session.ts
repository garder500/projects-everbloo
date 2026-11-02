/** État de session en mémoire : notes (scratchpad) et métriques d'usage des tools (budget_report). */

const notes = new Map<string, string>();

export function scratchpad(key?: string, value?: string): string {
  if (key && value !== undefined) {
    if (value === "") notes.delete(key);
    else notes.set(key, value.slice(0, 2000));
    return `${value === "" ? "supprimé" : "noté"}: ${key}`;
  }
  if (key) return notes.get(key) ?? `(pas de note "${key}")`;
  return [...notes].map(([k, v]) => `${k}: ${v}`).join("\n") || "(scratchpad vide)";
}

interface Stat { calls: number; chars: number }
const stats = new Map<string, Stat>();
const reads = new Map<string, number>();

export function record(tool: string, args: unknown, outputChars: number): void {
  const s = stats.get(tool) ?? { calls: 0, chars: 0 };
  stats.set(tool, { calls: s.calls + 1, chars: s.chars + outputChars });
  const a = args as { path?: string; reads?: { path: string }[] } | undefined;
  const paths = [a?.path, ...(a?.reads?.map((r) => r.path) ?? [])].filter((p): p is string => typeof p === "string");
  if (["read_outline", "read_symbol", "batch_read"].includes(tool)) paths.forEach((p) => reads.set(p, (reads.get(p) ?? 0) + 1));
}

/** ≈ 4 caractères par token. */
export function budgetReport(): string {
  const rows = [...stats].sort((a, b) => b[1].chars - a[1].chars);
  const total = rows.reduce((n, [, s]) => n + s.chars, 0);
  const rereads = [...reads].filter(([, n]) => n > 2).sort((a, b) => b[1] - a[1]);
  const tips = [
    ...rereads.slice(0, 5).map(([p, n]) => `- ${p} lu ${n} fois : noter l'essentiel dans scratchpad`),
    ...rows.filter(([, s]) => s.calls > 0 && s.chars / s.calls > 6000).map(([t]) => `- ${t} renvoie de grosses sorties : restreindre scope/max_results`),
  ];
  return [
    `Sorties des tools de cette session : ~${Math.round(total / 4)} tokens (${rows.reduce((n, [, s]) => n + s.calls, 0)} appels)`,
    ...rows.slice(0, 10).map(([t, s]) => `  ${t}: ${s.calls} appel(s), ~${Math.round(s.chars / 4)} tokens`),
    tips.length ? `Suggestions:\n${tips.join("\n")}` : "Aucune suggestion.",
  ].join("\n");
}
