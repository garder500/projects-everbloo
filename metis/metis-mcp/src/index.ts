#!/usr/bin/env bun
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools/register-tools.js";
import { defaultConfig } from "./config.js";
import { ensureWorkspaceIndexed } from "./services/indexer.js";

async function runServer() {
  const server = new Server(
    {
      name: "metis-mcp",
      version: "0.2.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  registerTools(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error(`[metis-mcp] Serveur MCP démarré sur stdio. Workspace: ${defaultConfig.workspaceRoot}`);

  // Warm-up / incremental index in background without blocking server startup
  setTimeout(() => {
    try {
      const stats = ensureWorkspaceIndexed(defaultConfig.workspaceRoot);
      console.error(
        `[metis-mcp] Indexation terminée : ${stats.filesIndexed} indexés, ${stats.symbolsIndexed} symboles (${stats.durationMs}ms)`
      );
    } catch (err) {
      console.error("[metis-mcp] Erreur lors de l'indexation initiale :", err);
    }
  }, 100);

  process.on("SIGINT", async () => {
    await server.close();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await server.close();
    process.exit(0);
  });
}

runServer().catch((error) => {
  console.error("[metis-mcp] Erreur fatale :", error);
  process.exit(1);
});
