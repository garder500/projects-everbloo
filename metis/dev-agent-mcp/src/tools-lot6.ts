import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { truncate } from "./fs-utils.js";
import { redact } from "./redact.js";
import { blameWhy, relatedHistory } from "./history.js";
import { changelogDiff, docsLookup, specLookup } from "./docs.js";
import { dbQueryReadonly, dbSchema } from "./db.js";
import { ciFailures, mrContext } from "./gitlab.js";

const reply = (s: string) => ({ content: [{ type: "text" as const, text: truncate(redact(s)) }] });
const guard = <A>(fn: (a: A) => string | Promise<string>) => async (a: A) => {
  try {
    return reply(await fn(a));
  } catch (e) {
    return { isError: true, content: [{ type: "text" as const, text: e instanceof Error ? e.message : String(e) }] };
  }
};

export function registerLot6(server: McpServer): void {
  server.tool(
    "blame_why",
    "Commit, auteur, message et MR liés à une plage de lignes",
    { path: z.string(), start: z.number().int().min(1), end: z.number().int().optional() },
    guard(({ path, start, end }) => blameWhy(path, start, end)),
  );
  server.tool("related_history", "Commits qui ont touché un fichier (suit les renommages), avec leur raison", { path: z.string(), limit: z.number().int().min(1).max(30).optional() }, guard(({ path, limit }) => relatedHistory(path, limit)));
  server.tool(
    "docs_lookup",
    "Doc (README/docs) de la version INSTALLÉE d'une lib, sections les plus pertinentes pour la requête",
    { lib: z.string(), query: z.string(), project: z.string().optional() },
    guard(({ lib, query, project }) => docsLookup(lib, query, project)),
  );
  server.tool(
    "changelog_diff",
    "Entrées du changelog d'une lib installée entre deux versions (breaking changes d'une mise à jour)",
    { lib: z.string(), from: z.string(), to: z.string().optional(), project: z.string().optional() },
    guard(({ lib, from, to, project }) => changelogDiff(lib, from, to, project)),
  );
  server.tool("spec_lookup", "Extrait ciblé d'une spec lourde (md, yaml, json/OpenAPI) à partir d'une section", { doc: z.string(), section: z.string(), max_lines: z.number().int().min(10).max(300).optional() }, guard(({ doc, section, max_lines }) => specLookup(doc, section, max_lines)));
  server.tool("db_schema", "Colonnes d'une table (ou de toutes) du schéma public ; lecture seule ; connexion = DB_URL du .env de `repo` (ou DEV_AGENT_DB_URL)", { table: z.string().optional(), repo: z.string().optional() }, guard(({ table, repo }) => dbSchema(table, repo)));
  server.tool(
    "db_query_readonly",
    "SELECT unique en transaction READ ONLY, timeout 10 s, lignes limitées, colonnes sensibles et emails masqués",
    { sql: z.string(), max_rows: z.number().int().min(1).max(200).optional(), repo: z.string().optional() },
    guard(({ sql, max_rows, repo }) => dbQueryReadonly(sql, max_rows, repo)),
  );
  server.tool("mr_context", "MR GitLab : description, discussions non résolues, état CI (GITLAB_TOKEN requis)", { repo: z.string(), iid: z.number().int() }, guard(({ repo, iid }) => mrContext(repo, iid)));
  server.tool("ci_failures", "Jobs en échec d'un pipeline GitLab (défaut : dernier de la branche) avec l'essentiel du log (GITLAB_TOKEN requis)", { repo: z.string(), pipeline_id: z.number().int().optional() }, guard(({ repo, pipeline_id }) => ciFailures(repo, pipeline_id)));
}
