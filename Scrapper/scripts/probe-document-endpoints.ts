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
  `/services/${serviceId}/documents`,
  `/services/${serviceId}/documents?serviceVersion=${version}`,
  `/services/${serviceId}/documentation`,
  `/services/${serviceId}/documentation?serviceVersion=${version}`,
  `/v1/services/${serviceId}/documents`,
  `/v1/services/${serviceId}/documents?serviceVersion=${version}`,
  `/v1/services/${serviceId}/documentation`,
  `/v1/services/${serviceId}/documentation?serviceVersion=${version}`,
  `/documents?filter=service,${serviceId}`,
  `/documents?filter=serviceId,${serviceId}`,
  `/documents?serviceId=${serviceId}`,
  `/documents?serviceId=${serviceId}&serviceVersion=${version}`,
  `/services/${serviceId}/versions/${version}/documents`,
  `/services/${serviceId}/functional-documents`,
  `/services/${serviceId}/functional-documents?serviceVersion=${version}`,
];

for (const path of candidates) {
  try {
    const data = await pasFetch<unknown>(client, path, {
      referer: `${AMADEUS_DEVELOPERS}/functional-doc/${serviceId}`,
    });
    const json = JSON.stringify(data);
    const hasExpected = json.includes(String(expectedDocId));
    console.log("OK", path, "len", json.length, hasExpected ? "HAS_2311" : "");
    if (hasExpected || json.includes('"id"')) {
      console.log(json.slice(0, 500));
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.log("FAIL", path, msg.slice(0, 120));
  }
}
