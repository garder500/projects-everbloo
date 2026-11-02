#!/usr/bin/env bun
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { fileURLToPath } from "node:url";
import { ROOT, detectRoot, setRoot } from "./config.js";
import { registerTools } from "./tools.js";
import { registerLot6 } from "./tools-lot6.js";
import { instrument, registerLot7 } from "./tools-lot7.js";
import { registerLot8 } from "./tools-lot8.js";

const server = new McpServer({ name: "dev-agent-mcp", version: "0.1.2" });
instrument(server);
registerTools(server);
registerLot6(server);
registerLot7(server);
registerLot8(server);

// Sans METIS_WORKSPACE_ROOT : si le client expose ses racines MCP, on en déduit le workspace (pixi.toml) au lieu d'exiger la variable.
server.server.oninitialized = async () => {
  if (process.env.METIS_WORKSPACE_ROOT || !server.server.getClientCapabilities()?.roots) return;
  try {
    const { roots } = await server.server.listRoots();
    const dirs = roots.filter((r) => r.uri.startsWith("file:")).map((r) => fileURLToPath(r.uri));
    const found = dirs.map((d) => detectRoot(d)).find(Boolean) ?? dirs[0];
    if (found && found !== ROOT) {
      setRoot(found);
      console.error(`[dev-agent-mcp] workspace déduit des racines du client: ${ROOT}`);
    }
  } catch {
    /* le client ne gère pas roots/list : on garde la détection par dossier de lancement */
  }
};

await server.connect(new StdioServerTransport());
console.error(`[dev-agent-mcp] démarré sur stdio. Workspace: ${ROOT}`);
