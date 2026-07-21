import "dotenv/config";
import { AmadeusClient } from "../src/providers/amadeus/client.js";
import { getCatalogFamilies } from "../src/providers/amadeus/api.js";
import { writeFile } from "node:fs/promises";

const client = await AmadeusClient.create();
await client.login();
for (const [id, level] of [[2, 0], [2, 1], [3, 1]] as const) {
  const payload = await getCatalogFamilies(client, id, level);
  await writeFile(`scripts/sample-catalog-${id}-${level}.json`, JSON.stringify(payload, null, 2));
  console.log("written", id, level);
}
