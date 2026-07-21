import { z } from "zod";
import { discoverAmadeusCatalog, testAmadeusConnection } from "../providers/amadeus/catalog.js";
import { crawlAmadeus } from "../providers/amadeus/crawler.js";
import { fetchAmadeusSoapDocs } from "../providers/amadeus/soap-docs.js";
import { getProvider } from "../providers/registry.js";

export const amadeusLoginInputSchema = {
  force: z
    .boolean()
    .optional()
    .describe("Force a new login even if session appears valid"),
};

export async function runAmadeusLogin(input: { force?: boolean }): Promise<string> {
  const status = await getProvider("amadeus").login(input.force ?? false);
  return JSON.stringify(status, null, 2);
}

export const amadeusCrawlInputSchema = {
  urls: z
    .array(z.string())
    .optional()
    .describe("URLs to crawl. Defaults to sources/amadeus/urls.json"),
  force: z
    .boolean()
    .optional()
    .describe("Re-scrape even if local markdown already exists"),
};

export async function runAmadeusCrawl(input: {
  urls?: string[];
  force?: boolean;
}): Promise<string> {
  const report = await crawlAmadeus({
    urls: input.urls,
    force: input.force ?? false,
  });
  return JSON.stringify(report, null, 2);
}

export const amadeusDiscoverInputSchema = {
  save: z
    .boolean()
    .optional()
    .describe("Write discovered URLs to sources/amadeus/urls.json"),
  catalogue_ids: z
    .array(z.number())
    .optional()
    .describe("Catalogue IDs to scan (default: 2 and 3)"),
};

export async function runAmadeusDiscover(input: {
  save?: boolean;
  catalogue_ids?: number[];
}): Promise<string> {
  const report = await discoverAmadeusCatalog({
    save: input.save ?? false,
    catalogueIds: input.catalogue_ids,
  });
  return JSON.stringify(report, null, 2);
}

export const amadeusTestInputSchema = {};

export async function runAmadeusTest(): Promise<string> {
  const report = await testAmadeusConnection();
  return JSON.stringify(report, null, 2);
}

export const amadeusFetchSoapDocsInputSchema = {
  discover_only: z
    .boolean()
    .optional()
    .describe("Discover SOAP services and document IDs only (no HTML download)"),
  force: z
    .boolean()
    .optional()
    .describe("Re-download docs even if local markdown already exists"),
  limit: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("Process only the first N SOAP services"),
  page_size: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("Page size for the services list API"),
};

export async function runAmadeusFetchSoapDocs(input: {
  discover_only?: boolean;
  force?: boolean;
  limit?: number;
  page_size?: number;
}): Promise<string> {
  const report = await fetchAmadeusSoapDocs({
    discoverOnly: input.discover_only,
    force: input.force,
    limit: input.limit,
    pageSize: input.page_size,
  });
  return JSON.stringify(report, null, 2);
}
