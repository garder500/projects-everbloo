import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { errorText, truncate } from "./fs-utils.js";
import { redact } from "./redact.js";
import { dataModel } from "./datamodel.js";
import { apiContractCheck, checkpoint, coverageGaps, rollback } from "./safety.js";
import { budgetReport, record, scratchpad } from "./session.js";

const reply = (s: string) => ({ content: [{ type: "text" as const, text: truncate(redact(s)) }] });
const guard = <A>(fn: (a: A) => string) => async (a: A) => {
  try {
    return reply(fn(a));
  } catch (e) {
    return { isError: true, content: [{ type: "text" as const, text: errorText(e) }] };
  }
};

/** Enregistre appels et volumes de sortie de chaque tool, pour budget_report. À appeler AVANT l'enregistrement des tools. */
export function instrument(server: McpServer): void {
  const original = server.tool.bind(server) as (...a: unknown[]) => unknown;
  (server as unknown as { tool: (...a: unknown[]) => unknown }).tool = (...args: unknown[]) => {
    const name = String(args[0]);
    const handler = args[args.length - 1] as (...h: unknown[]) => Promise<{ content: { text: string }[] }>;
    args[args.length - 1] = async (...h: unknown[]) => {
      const res = await handler(...h);
      record(name, h[0], res.content.reduce((n, c) => n + (c.text?.length ?? 0), 0));
      return res;
    };
    return original(...args);
  };
}

export function registerLot7(server: McpServer): void {
  server.tool("data_model", "Modèles Sequelize : colonnes, types, tables et relations (filtrable par nom)", { scope: z.string().optional(), filter: z.string().optional() }, guard(({ scope, filter }) => dataModel(scope, filter)));
  server.tool("api_contract_check", "Spec/routes tsoa générées plus anciennes que les sources ? (heuristique sur les dates)", { repo: z.string() }, guard(({ repo }) => apiContractCheck(repo)));
  server.tool("coverage_gaps", "Lignes ajoutées dans le diff non couvertes d'après coverage/lcov.info", { repo: z.string() }, guard(({ repo }) => coverageGaps(repo)));
  server.tool("checkpoint", "Instantané des fichiers suivis d'un repo avant une modification risquée (ne touche pas au worktree)", { repo: z.string(), name: z.string() }, guard(({ repo, name }) => checkpoint(repo, name)));
  server.tool(
    "rollback",
    "Restaure les fichiers suivis à un checkpoint ; sans confirm=true, simple aperçu. Écrase les changements postérieurs",
    { repo: z.string(), name: z.string(), confirm: z.boolean().optional() },
    guard(({ repo, name, confirm }) => rollback(repo, name, confirm)),
  );
  server.tool("scratchpad", "Notes de session : sans argument liste, avec key lit, avec key+value écrit (value vide = supprime)", { key: z.string().optional(), value: z.string().optional() }, guard(({ key, value }) => scratchpad(key, value)));
  server.tool("budget_report", "Appels et volume de sortie par tool dans cette session, fichiers relus, suggestions d'économie", {}, guard(() => budgetReport()));
}
