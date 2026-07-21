import "dotenv/config";
import {
  docReadUrl,
  downloadUrl,
  getDocument,
  getDocumentFileUrl,
} from "../src/providers/amadeus/api.js";
import { AmadeusClient } from "../src/providers/amadeus/client.js";
import { AMADEUS_DEVELOPERS } from "../src/providers/amadeus/config.js";

const client = await AmadeusClient.create();
await client.login();

const serviceId = 1;
const documentId = 2311;
const version = "7.1";

const fileUrlResponse = await getDocumentFileUrl(
  client,
  documentId,
  serviceId,
  version,
);
console.log("fileUrlResponse", fileUrlResponse);

const candidates = [
  downloadUrl(fileUrlResponse.resourcePath),
  `${AMADEUS_DEVELOPERS}${fileUrlResponse.resourcePath}`,
  `${AMADEUS_DEVELOPERS}/PAS-EAS/api${fileUrlResponse.resourcePath.replace(/^\/PAS-EAS\/api/, "")}`,
];

for (const url of candidates) {
  const res = await client.fetch(url, {
    headers: {
      Accept: "text/html,application/json,*/*",
      Referer: docReadUrl(serviceId, documentId, version),
    },
  });
  const ct = res.headers.get("content-type") ?? "";
  const text = await res.text();
  console.log(url, res.status, ct.split(";")[0], "len", text.length, text.slice(0, 100));
}

// Try pasFetch on resource path directly
try {
  const { pasFetch } = await import("../src/providers/amadeus/api.js");
  const data = await pasFetch(client, fileUrlResponse.resourcePath.replace(/^\/PAS-EAS\/api/, ""), {
    referer: docReadUrl(serviceId, documentId, version),
  });
  console.log("pasFetch resource", typeof data, JSON.stringify(data).slice(0, 200));
} catch (e) {
  console.log("pasFetch fail", e instanceof Error ? e.message : e);
}
