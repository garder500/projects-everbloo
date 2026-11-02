import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./config.js";
import { forPath, formatMemories } from "./memory.js";

export interface Zone {
  name: string;
  pattern: string; // regex (insensible à la casse) testée sur le chemin
  checks: string[]; // vérifications obligatoires
}

const DEFAULT_ZONES: Zone[] = [
  { name: "paiement/facturation", pattern: "payment|paiement|stripe|billing|invoice|factur|checkout|refund", checks: ["tests ciblés verts", "idempotence des appels", "aucun log de données carte", "relecture humaine"] },
  { name: "comptabilité", pattern: "compta|accounting|ledger|vat|tva", checks: ["tests de montants/arrondis", "relecture humaine"] },
  { name: "authentification", pattern: "auth|jwt|token|session|permission|guard", checks: ["tests d'accès refusé", "aucun secret en clair", "relecture sécurité"] },
  { name: "migrations/schéma", pattern: "migration|schema\\.|\\.sql$|prisma", checks: ["migration réversible", "tester sur copie de données", "vérifier les consommateurs du modèle"] },
  { name: "contrat API", pattern: "openapi|swagger|tsoa|\\.sdk|sdk/", checks: ["régénérer le contrat/SDK", "api_contract à jour", "impact_analysis sur les clients"] },
  { name: "code partagé", pattern: "(^|/)(shared|common|libs?|utils)/", checks: ["impact_analysis sur tous les projets consommateurs", "tests des consommateurs"] },
  { name: "config/secrets", pattern: "\\.env|secret|credential|docker|compose|\\.ya?ml$|pixi\\.toml", checks: ["aucun secret commité", "vérifier tous les environnements"] },
];

function zones(): Zone[] {
  try {
    const custom = JSON.parse(fs.readFileSync(path.join(ROOT, ".dev-agent", "risk-zones.json"), "utf8")) as Zone[];
    return [...DEFAULT_ZONES, ...custom];
  } catch {
    return DEFAULT_ZONES;
  }
}

export function riskZones(files: string[]): { hits: Map<string, string[]>; text: string } {
  const hits = new Map<string, string[]>(); // zone → fichiers
  for (const f of files) {
    const p = f.replace(/\\/g, "/");
    for (const z of zones()) if (new RegExp(z.pattern, "i").test(p)) hits.set(z.name, [...(hits.get(z.name) ?? []), p]);
  }
  if (!hits.size) return { hits, text: "Aucune zone critique touchée." };
  const text = [...hits]
    .map(([name, fs_]) => {
      const z = zones().find((x) => x.name === name)!;
      return `⚠ ${name} (${fs_.join(", ")})\n${z.checks.map((c) => `  - [obligatoire] ${c}`).join("\n")}`;
    })
    .join("\n");
  return { hits, text };
}

const PATH_RE = /[\w.-]+(?:\/[\w.-]+)+\.\w{1,5}\b/g;

/** Valide un plan avant d'écrire du code : zones sensibles, pièges connus, garde-fous manquants. */
export function planCheck(plan: string, files: string[] = []): string {
  const mentioned = [...new Set([...files, ...(plan.match(PATH_RE) ?? [])])];
  const { hits, text } = riskZones(mentioned.length ? mentioned : [plan]);
  const problems: string[] = [];
  if (!/test/i.test(plan)) problems.push("Le plan ne prévoit aucun test.");
  if (!/hors p[ée]rim[eè]tre|out of scope|ne pas/i.test(plan)) problems.push("Périmètre non borné (pas de « hors périmètre »).");
  if (hits.has("migrations/schéma") && !/rollback|revert|r[ée]versible|down/i.test(plan)) problems.push("Migration sans plan de retour arrière.");
  if (hits.has("paiement/facturation") && !/idempoten/i.test(plan)) problems.push("Zone paiement sans mention d'idempotence.");
  if (hits.has("code partagé") && !/impact|consommateur/i.test(plan)) problems.push("Code partagé sans analyse d'impact.");
  if (hits.has("contrat API") && !/(sdk|contrat|g[ée]n[ée]r)/i.test(plan)) problems.push("Contrat API modifié sans régénération du SDK/contrat.");
  const known = mentioned.flatMap((f) => forPath(f, "pitfall"));
  const uniq = [...new Map(known.map((m) => [m.id, m])).values()];
  return [
    `VERDICT: ${problems.length ? "À REVOIR" : "OK"} (${mentioned.length} fichier(s) identifié(s))`,
    ...problems.map((p) => `✗ ${p}`),
    "",
    text,
    uniq.length ? `\nPièges connus:\n${formatMemories(uniq)}` : "",
  ].join("\n").trimEnd();
}
