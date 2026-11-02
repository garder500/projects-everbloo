import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { errorText, truncate } from "./fs-utils.js";
import { redact } from "./redact.js";
import { callGraph, findSimilarCode, findSymbol, readRangeSmart, searchSemantic, summarizeDir, summarizeFile } from "./codeindex.js";
import { decisionLog, taskContext } from "./context.js";

const reply = (s: string) => ({ content: [{ type: "text" as const, text: truncate(redact(s)) }] });
const guard = <A>(fn: (a: A) => string) => async (a: A) => {
  try {
    return reply(fn(a));
  } catch (e) {
    return { isError: true, content: [{ type: "text" as const, text: errorText(e) }] };
  }
};

const scope = z.string().optional();

export function registerLot8(server: McpServer): void {
  server.tool("find_symbol", "Définition(s) d'un symbole dans le workspace : fichier, lignes, signature, doc au-dessus", { name: z.string(), scope }, guard(({ name, scope: s }) => findSymbol(name, s)));
  server.tool(
    "read_range_smart",
    "Lit un symbole avec N lignes de contexte autour",
    { path: z.string(), around: z.string(), context: z.number().int().min(0).max(40).optional() },
    guard(({ path, around, context }) => readRangeSmart(path, around, context)),
  );
  server.tool(
    "search_semantic",
    "Recherche par pertinence (BM25 sur symboles, noms camelCase/snake_case découpés) : renvoie des extraits, pas des fichiers. Sans embeddings",
    { query: z.string(), scope, k: z.number().int().min(1).max(30).optional() },
    guard(({ query, scope: s, k }) => searchSemantic(query, s, k)),
  );
  server.tool("find_similar_code", "Code existant ressemblant à un extrait, pour éviter de dupliquer un helper", { snippet: z.string(), scope }, guard(({ snippet, scope: s }) => findSimilarCode(snippet, s)));
  server.tool(
    "call_graph",
    "Qui appelle quoi (par nom, sans résolution de types) : direction in = appelants, out = appelés",
    { symbol: z.string(), direction: z.enum(["in", "out"]), depth: z.number().int().min(1).max(3).optional(), scope },
    guard(({ symbol, direction, depth, scope: s }) => callGraph(symbol, direction, depth, s)),
  );
  server.tool("summarize_file", "Résumé heuristique d'un fichier (rôle, dépendances, symboles), mis en cache par hash du contenu", { path: z.string() }, guard(({ path }) => summarizeFile(path)));
  server.tool("summarize_dir", "Résumé fichier par fichier d'un dossier (40 fichiers max)", { path: z.string() }, guard(({ path }) => summarizeDir(path)));
  server.tool("decision_log", "Pourquoi un choix a été fait : commits (et MR) sur le sujet + décisions mémorisées", { topic: z.string(), repo: z.string().optional() }, guard(({ topic, repo }) => decisionLog(topic, repo)));
  server.tool("task_context", "Reprise après coupure : branche, commits propres, fichiers touchés, non commité, TODO ajoutés", { repo: z.string() }, guard(({ repo }) => taskContext(repo)));
}
