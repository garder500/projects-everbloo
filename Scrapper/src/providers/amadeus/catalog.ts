import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getCatalogFamilies,
  getFormats,
  getProductCatalogs,
  getTransactionTypes,
} from "./api.js";
import { AmadeusClient } from "./client.js";
import { AMADEUS_DEVELOPERS } from "./config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URLS_FILE = path.resolve(__dirname, "../../../sources/amadeus/urls.json");

/** Known catalogue roots observed in the Amadeus developers portal HAR. */
export const DEFAULT_CATALOGUE_IDS = [2, 3] as const;

export interface DiscoverReport {
  authenticated: boolean;
  catalogues: Array<{ id: number; level: number; itemCount: number }>;
  codesets: {
    transactionTypes: number;
    formats: number;
  };
  urls: string[];
  savedTo?: string;
}

function collectUrls(value: unknown, out: Set<string>): void {
  if (value === null || value === undefined) return;

  if (typeof value === "string") {
    if (value.startsWith("http") && value.includes("developers.amadeus.com")) {
      out.add(value.split("#")[0]);
      return;
    }
    if (value.startsWith("/") && !value.startsWith("//")) {
      out.add(`${AMADEUS_DEVELOPERS}${value.split("#")[0]}`);
    }
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectUrls(item, out);
    return;
  }

  if (typeof value === "object") {
    for (const entry of Object.values(value as Record<string, unknown>)) {
      collectUrls(entry, out);
    }
  }
}

function countItems(value: unknown): number {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    for (const key of ["items", "content", "data", "families", "results"]) {
      if (Array.isArray(obj[key])) return obj[key].length;
    }
  }
  return 0;
}

export async function discoverAmadeusCatalog(options?: {
  catalogueIds?: number[];
  save?: boolean;
}): Promise<DiscoverReport> {
  const client = await AmadeusClient.create();
  const login = await client.login();
  const catalogueIds = options?.catalogueIds ?? [...DEFAULT_CATALOGUE_IDS];
  const urlSet = new Set<string>();
  const catalogues: DiscoverReport["catalogues"] = [];

  await getProductCatalogs(client).catch(() => null);

  for (const id of catalogueIds) {
    for (const level of [0, 1, 2]) {
      try {
        const payload = await getCatalogFamilies(client, id, level);
        const itemCount = countItems(payload);
        if (itemCount === 0 && level > 0) continue;
        catalogues.push({ id, level, itemCount });
        collectUrls(payload, urlSet);
      } catch {
        if (level === 0) {
          catalogues.push({ id, level, itemCount: 0 });
        }
        break;
      }
    }
  }

  const [transactionTypes, formats] = await Promise.all([
    getTransactionTypes(client).catch(() => null),
    getFormats(client).catch(() => null),
  ]);

  collectUrls(transactionTypes, urlSet);
  collectUrls(formats, urlSet);

  const urls = [...urlSet].sort();
  const report: DiscoverReport = {
    authenticated: login.authenticated,
    catalogues,
    codesets: {
      transactionTypes: countItems(transactionTypes),
      formats: countItems(formats),
    },
    urls,
  };

  if (options?.save && urls.length > 0) {
    await writeFile(URLS_FILE, `${JSON.stringify(urls, null, 2)}\n`, "utf-8");
    report.savedTo = URLS_FILE;
  }

  return report;
}

export async function testAmadeusConnection(): Promise<{
  login: { authenticated: boolean; message: string };
  securityStatus: boolean;
  catalogSample: DiscoverReport;
}> {
  const client = await AmadeusClient.create();
  const login = await client.login();
  const securityStatus = await client.checkSecurityStatus();
  const catalogSample = await discoverAmadeusCatalog({ catalogueIds: [2, 3] });

  return { login, securityStatus, catalogSample };
}
