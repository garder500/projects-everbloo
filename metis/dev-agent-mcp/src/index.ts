#!/usr/bin/env bun
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ROOT } from "./config.js";
import { registerTools } from "./tools.js";
import { registerLot6 } from "./tools-lot6.js";
import { instrument, registerLot7 } from "./tools-lot7.js";
import { registerLot8 } from "./tools-lot8.js";

const server = new McpServer({ name: "dev-agent-mcp", version: "0.1.1" });
instrument(server);
registerTools(server);
registerLot6(server);
registerLot7(server);
registerLot8(server);

await server.connect(new StdioServerTransport());
console.error(`[dev-agent-mcp] démarré sur stdio. Workspace: ${ROOT}`);
