import "dotenv/config";
import { pasFetch } from "../src/providers/amadeus/api.js";
import { AmadeusClient } from "../src/providers/amadeus/client.js";
import { AMADEUS_DEVELOPERS } from "../src/providers/amadeus/config.js";

const client = await AmadeusClient.create();
await client.login();

const serviceId = 1;
const version = "7.1";
const expectedDocId = 2311;

const candidates = [
  `/documents?serviceId=${serviceId}&pageSize=100&page=1`,
  `/documents?serviceId=${serviceId}&filter=isMainpage,true&pageSize=100&page=1`,
  `/documents?serviceId=${serviceId}&filter=docType,User guide&pageSize=100&page=1`,
  `/documents?serviceId=${serviceId}&filter=docType,User%20guide&pageSize=100&page=1`,
  `/documents?serviceId=${serviceId}&serviceVersion=${version}&pageSize=100&page=1`,
  `/documents?serviceId=${serviceId}&filter=serviceVersion,${version}&pageSize=100&page=1`,
  `/documents?serviceId=${serviceId}&filter=version,${version}&pageSize=100&page=1`,
  `/documents?serviceId=${serviceId}&filter=isMainpage,true&filter=docType,User guide&pageSize=100&page=1`,
  `/documents?serviceId=${serviceId}&isMainpage=true&pageSize=100&page=1`,
  `/documents?serviceId=${serviceId}&docType=User guide&pageSize=100&page=1`,
];

function inspect(label: string, data: unknown): void {
  const obj = data as { totalNumberOfResults?: number; data?: Array<Record<string, unknown>> };
  const items = obj.data ?? [];
  const match = items.find((d) => d.id === expectedDocId);
  console.log(label, "total", obj.totalNumberOfResults, "pageItems", items.length, match ? "FOUND_2311" : "");
  if (match) {
    console.log(JSON.stringify(match, null, 2).slice(0, 800));
  } else if (items.length > 0) {
    const main = items.filter((d) => d.isMainpage === true).slice(0, 3);
    console.log("mainpages sample:", JSON.stringify(main.map((d) => ({ id: d.id, title: d.title, docType: d.docType })), null, 2));
  }
}

for (const path of candidates) {
  try {
    const data = await pasFetch<unknown>(client, path, {
      referer: `${AMADEUS_DEVELOPERS}/functional-doc/${serviceId}`,
    });
    inspect("OK " + path, data);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.log("FAIL", path, msg.slice(0, 150));
  }
}

// Paginate to find doc 2311 in unfiltered list
console.log("\n--- paginate search for 2311 ---");
for (let page = 1; page <= 20; page++) {
  const data = await pasFetch<{ data?: Array<{ id: number; title?: string; isMainpage?: boolean }> }>(
    client,
    `/documents?serviceId=${serviceId}&pageSize=100&page=${page}`,
    { referer: `${AMADEUS_DEVELOPERS}/functional-doc/${serviceId}` },
  );
  const items = data.data ?? [];
  const match = items.find((d) => d.id === expectedDocId);
  if (match) {
    console.log("FOUND on page", page, JSON.stringify(match, null, 2).slice(0, 1000));
    break;
  }
  if (items.length === 0) {
    console.log("empty page", page);
    break;
  }
}
