import "dotenv/config";
import { AmadeusClient } from "../src/providers/amadeus/client.js";
import {
  getCatalogFamilies,
  getFormats,
  getProductCatalogs,
  getTransactionTypes,
  pasFetch,
} from "../src/providers/amadeus/api.js";

const client = await AmadeusClient.create();
const login = await client.login();
console.log("login:", login.message);

const checks: Array<{ name: string; ok: boolean; detail: string }> = [];

async function check(name: string, fn: () => Promise<{ status?: number; detail: string }>): Promise<void> {
  try {
    const result = await fn();
    checks.push({ name, ok: true, detail: result.detail });
  } catch (error) {
    checks.push({
      name,
      ok: false,
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}

await check("POST /PAS-EAS/api/security/status", async () => {
  const ok = await client.checkSecurityStatus();
  return { detail: ok ? "authenticated" : "not authenticated" };
});

await check("GET /PAS-EAS/api/v1/catalogues/3/families?filter=level,0", async () => {
  const data = (await getCatalogFamilies(client, 3, 0)) as { totalNumberOfResults?: number };
  return { detail: `results=${data.totalNumberOfResults ?? "?"}` };
});

await check("GET /PAS-EAS/api/v1/catalogues/2/families?filter=level,0", async () => {
  const data = (await getCatalogFamilies(client, 2, 0)) as { totalNumberOfResults?: number };
  return { detail: `results=${data.totalNumberOfResults ?? "?"}` };
});

await check("GET /PAS-EAS/api/v1/product-catalogs", async () => {
  await getProductCatalogs(client);
  return { detail: "204/no content OK" };
});

await check("GET /PAS-EAS/api/codesets/transaction-types", async () => {
  const data = await getTransactionTypes(client);
  const count = Array.isArray((data as { data?: unknown[] })?.data)
    ? (data as { data: unknown[] }).data.length
    : "?";
  return { detail: `items=${count}` };
});

await check("GET /PAS-EAS/api/codesets/formats", async () => {
  const data = await getFormats(client);
  const count = Array.isArray((data as { data?: unknown[] })?.data)
    ? (data as { data: unknown[] }).data.length
    : "?";
  return { detail: `items=${count}` };
});

await check("GET https://developers.amadeus.com/enterprise/api-library/soap", async () => {
  const res = await client.fetchAuthenticated("https://developers.amadeus.com/enterprise/api-library/soap");
  return { detail: `status=${res.status}, bytes=${res.html.length}` };
});

console.log(JSON.stringify({ login: login.authenticated, checks }, null, 2));
process.exit(checks.every((c) => c.ok) && login.authenticated ? 0 : 1);
