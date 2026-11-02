import fs from "node:fs";
import path from "node:path";
import { resolveInRoot } from "./fs-utils.js";

/** Accès base en LECTURE SEULE (PostgreSQL). URL : DEV_AGENT_DB_URL, sinon DB_URL du .env du repo demandé (clé utilisée par les api-*). */

const SENSITIVE_COL = /pass|secret|token|card|iban|cvv|salt|hash/i;
const EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/g;

export function assertReadOnly(sql: string): string {
  const clean = sql.trim().replace(/;+\s*$/, "");
  if (clean.includes(";")) throw new Error("Une seule requête autorisée.");
  if (!/^(select|with|explain|show)\b/i.test(clean)) throw new Error("Lecture seule : SELECT / WITH / EXPLAIN / SHOW uniquement.");
  if (/\b(insert|update|delete|drop|alter|truncate|create|grant|revoke|copy|call|do)\b/i.test(clean.replace(/'[^']*'/g, "''"))) {
    throw new Error("Mot-clé d'écriture détecté ; requête refusée.");
  }
  return clean;
}

export function maskRow(row: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(row).map(([k, v]) => [k, SENSITIVE_COL.test(k) ? "[MASKED]" : typeof v === "string" ? v.replace(EMAIL, "[EMAIL]").slice(0, 200) : v]),
  );
}

/** Valeur de DB_URL dans `<repo>/.env` ou `<repo>/src/.env` ; la valeur n'est jamais renvoyée ni journalisée. */
export function readDbUrl(repo?: string): string {
  if (process.env.DEV_AGENT_DB_URL) return process.env.DEV_AGENT_DB_URL;
  if (!repo) throw new Error("Indiquer `repo` (ex. api-dashboard) pour lire son DB_URL, ou définir DEV_AGENT_DB_URL.");
  for (const sub of ["", "src"]) {
    const file = path.join(resolveInRoot(path.posix.join(repo, sub)), ".env");
    if (!fs.existsSync(file)) continue;
    const line = fs.readFileSync(file, "utf8").split(/\r?\n/).find((l) => /^\s*(export\s+)?DB_URL\s*=/.test(l));
    const value = line?.replace(/^[^=]*=/, "").trim().replace(/^["']|["']$/g, "");
    if (value) return value;
  }
  throw new Error(`DB_URL introuvable dans ${repo}/.env ni ${repo}/src/.env.`);
}

async function withClient<T>(repo: string | undefined, fn: (c: { query: (sql: string, params?: unknown[]) => Promise<{ rows: Record<string, unknown>[] }> }) => Promise<T>): Promise<T> {
  const url = readDbUrl(repo);
  if (!/^postgres(ql)?:\/\//i.test(url)) throw new Error("Seul PostgreSQL est géré (l'URL n'est pas postgres://).");
  const { Client } = await import("pg");
  const client = new Client({ connectionString: url, statement_timeout: 10_000 });
  await client.connect();
  try {
    await client.query("BEGIN READ ONLY");
    return await fn(client);
  } finally {
    await client.query("ROLLBACK").catch(() => undefined);
    await client.end();
  }
}

const table = (rows: Record<string, unknown>[]): string =>
  rows.length ? [Object.keys(rows[0]).join(" | "), ...rows.map((r) => Object.values(r).map((v) => (v === null ? "NULL" : String(v))).join(" | "))].join("\n") : "(aucune ligne)";

export async function dbQueryReadonly(sql: string, maxRows = 50, repo?: string): Promise<string> {
  const clean = assertReadOnly(sql);
  const rows = await withClient(repo, async (c) => (await c.query(clean)).rows);
  const shown = rows.slice(0, maxRows).map(maskRow);
  return `${table(shown)}${rows.length > maxRows ? `\n… ${rows.length - maxRows} lignes de plus (max_rows=${maxRows})` : ""}`;
}

export async function dbSchema(tableName?: string, repo?: string): Promise<string> {
  const rows = await withClient(repo, async (c) =>
    (
      await c.query(
        `select table_name, column_name, data_type, is_nullable from information_schema.columns
         where table_schema = 'public' and ($1::text is null or table_name = $1) order by table_name, ordinal_position limit 400`,
        [tableName ?? null],
      )
    ).rows,
  );
  return table(rows);
}
