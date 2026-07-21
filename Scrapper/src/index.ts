#!/usr/bin/env node

import { config } from "dotenv";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  amadeusCrawlInputSchema,
  amadeusDiscoverInputSchema,
  amadeusFetchSoapDocsInputSchema,
  amadeusLoginInputSchema,
  amadeusTestInputSchema,
  runAmadeusCrawl,
  runAmadeusDiscover,
  runAmadeusFetchSoapDocs,
  runAmadeusLogin,
  runAmadeusTest,
} from "./tools/amadeus.js";
import { getInputSchema, runGet } from "./tools/get.js";
import { runSearch, searchInputSchema } from "./tools/search.js";

config();

const server = new McpServer({
  name: "scrapper",
  version: "0.2.1",
});

server.tool(
  "search",
  "Search the web or a local documentation mirror (Amadeus).",
  searchInputSchema,
  async (input) => {
    try {
      const text = await runSearch(input);
      return { content: [{ type: "text", text }] };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Search failed: ${message}` }],
        isError: true,
      };
    }
  },
);

server.tool(
  "get",
  "Fetch a URL. Use source=amadeus for authenticated Amadeus docs (local cache first).",
  getInputSchema,
  async (input) => {
    try {
      const text = await runGet(input);
      return { content: [{ type: "text", text }] };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Get failed: ${message}` }],
        isError: true,
      };
    }
  },
);

server.tool(
  "amadeus_login",
  "Authenticate with the Amadeus developers portal and persist session cookies.",
  amadeusLoginInputSchema,
  async (input) => {
    try {
      const text = await runAmadeusLogin(input);
      return { content: [{ type: "text", text }] };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Amadeus login failed: ${message}` }],
        isError: true,
      };
    }
  },
);

server.tool(
  "amadeus_crawl",
  "Crawl Amadeus documentation URLs into local markdown mirror (docs/amadeus/).",
  amadeusCrawlInputSchema,
  async (input) => {
    try {
      const text = await runAmadeusCrawl(input);
      return { content: [{ type: "text", text }] };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Amadeus crawl failed: ${message}` }],
        isError: true,
      };
    }
  },
);

server.tool(
  "amadeus_discover",
  "Discover Amadeus documentation URLs via PAS-EAS catalog API (from authenticated session).",
  amadeusDiscoverInputSchema,
  async (input) => {
    try {
      const text = await runAmadeusDiscover(input);
      return { content: [{ type: "text", text }] };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Amadeus discover failed: ${message}` }],
        isError: true,
      };
    }
  },
);

server.tool(
  "amadeus_fetch_soap_docs",
  "Discover and download Amadeus SOAP user-guide docs via PAS-EAS services API into docs/amadeus/.",
  amadeusFetchSoapDocsInputSchema,
  async (input) => {
    try {
      const text = await runAmadeusFetchSoapDocs(input);
      return { content: [{ type: "text", text }] };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Amadeus SOAP docs fetch failed: ${message}` }],
        isError: true,
      };
    }
  },
);

server.tool(
  "amadeus_test",
  "Test Amadeus login + security/status + catalog API discovery (smoke test).",
  amadeusTestInputSchema,
  async () => {
    try {
      const text = await runAmadeusTest();
      return { content: [{ type: "text", text }] };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Amadeus test failed: ${message}` }],
        isError: true,
      };
    }
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Scrapper MCP server failed to start:", error);
  process.exit(1);
});
