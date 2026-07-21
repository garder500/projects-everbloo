#!/usr/bin/env node

import { config } from "dotenv";
import { discoverAmadeusCatalog, testAmadeusConnection } from "../src/providers/amadeus/catalog.js";
import { crawlAmadeus } from "../src/providers/amadeus/crawler.js";
import { fetchAmadeusSoapDocs } from "../src/providers/amadeus/soap-docs.js";
import { amadeusProvider } from "../src/providers/amadeus/index.js";

config();

function parseArgs(argv: string[]): {
  urls: string[];
  force: boolean;
  loginOnly: boolean;
  discover: boolean;
  saveDiscover: boolean;
  test: boolean;
  discoverSoap: boolean;
  fetchSoap: boolean;
  limit?: number;
  pageSize?: number;
} {
  const urls: string[] = [];
  let force = false;
  let loginOnly = false;
  let discover = false;
  let saveDiscover = false;
  let test = false;
  let discoverSoap = false;
  let fetchSoap = false;
  let limit: number | undefined;
  let pageSize: number | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--force") force = true;
    else if (arg === "--login") loginOnly = true;
    else if (arg === "--discover") discover = true;
    else if (arg === "--save") saveDiscover = true;
    else if (arg === "--test") test = true;
    else if (arg === "--discover-soap") discoverSoap = true;
    else if (arg === "--fetch-soap") fetchSoap = true;
    else if (arg === "--limit" && argv[i + 1]) {
      limit = Number.parseInt(argv[++i], 10);
    } else if (arg === "--page-size" && argv[i + 1]) {
      pageSize = Number.parseInt(argv[++i], 10);
    } else if (arg === "--url" && argv[i + 1]) {
      urls.push(argv[++i]);
    } else if (arg.startsWith("http")) {
      urls.push(arg);
    }
  }

  return {
    urls,
    force,
    loginOnly,
    discover,
    saveDiscover,
    test,
    discoverSoap,
    fetchSoap,
    limit,
    pageSize,
  };
}

async function main() {
  const {
    urls,
    force,
    loginOnly,
    discover,
    saveDiscover,
    test,
    discoverSoap,
    fetchSoap,
    limit,
    pageSize,
  } = parseArgs(process.argv.slice(2));

  if (test) {
    const report = await testAmadeusConnection();
    console.log(JSON.stringify(report, null, 2));
    process.exit(report.login.authenticated && report.securityStatus ? 0 : 1);
  }

  if (loginOnly) {
    const status = await amadeusProvider.login(force);
    console.log(JSON.stringify(status, null, 2));
    process.exit(status.authenticated ? 0 : 1);
  }

  if (discover) {
    const report = await discoverAmadeusCatalog({ save: saveDiscover });
    console.log(JSON.stringify(report, null, 2));
    process.exit(report.authenticated ? 0 : 1);
  }

  if (discoverSoap || fetchSoap) {
    const report = await fetchAmadeusSoapDocs({
      discoverOnly: discoverSoap && !fetchSoap,
      force,
      limit,
      pageSize,
    });
    console.log(JSON.stringify(report, null, 2));
    const discoverOnlyRun = discoverSoap && !fetchSoap;
    const ok = discoverOnlyRun
      ? report.total > 0 && report.succeeded + report.failed === report.total
      : report.failed === 0;
    process.exit(ok ? 0 : 1);
  }

  const report = await crawlAmadeus({ urls: urls.length ? urls : undefined, force });
  console.log(JSON.stringify(report, null, 2));
  process.exit(report.failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
