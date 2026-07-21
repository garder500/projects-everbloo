import "dotenv/config";
import { pasFetch } from "../src/providers/amadeus/api.js";
import { AmadeusClient } from "../src/providers/amadeus/client.js";
import { AMADEUS_DEVELOPERS } from "../src/providers/amadeus/config.js";

const client = await AmadeusClient.create();
await client.login();

const serviceVersionId = 1717;
const candidates = [
  `/serviceVersions/${serviceVersionId}/documents`,
  `/servlces/1/versions/7.1/documents`,
  `/documents?serviceVersionId=${serviceVersionId}`,
  `/documents?filter=serviceVersionId,${serviceVersionId}`,
];

for (const path of candidates) {
  try {
    const data = await pasFetch(client, path, {
      referer: `${AMADEUS_DEVELOPERS}/functional-doc/1`,
    });
    console.log("OK", path, JSON.stringify(data).slice(0, 300));
  } catch (e) {
    console.log("FAIL", path, (e instanceof Error ? e.message : e).slice(0, 120));
  }
}
