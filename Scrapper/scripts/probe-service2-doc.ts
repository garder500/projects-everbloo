import "dotenv/config";
import {
  documentMatchesVersion,
  listServiceDocuments,
} from "../src/providers/amadeus/api.js";
import { AmadeusClient } from "../src/providers/amadeus/client.js";

const client = await AmadeusClient.create();
await client.login();

const serviceId = 2;
const version = "19.1";

for (let page = 1; page <= 15; page++) {
  const res = await listServiceDocuments(client, serviceId, {
    page,
    pageSize: 100,
    docType: "User guide",
    isMainpage: true,
  });
  const matches = res.data.filter(
    (d) =>
      d.isMainpage &&
      (documentMatchesVersion(d, serviceId, version) ||
        d.title?.includes("MultiAvailability") ||
        d.title?.includes("SATRQT")),
  );
  if (matches.length) {
    console.log("page", page, JSON.stringify(matches.slice(0, 3), null, 2));
  }
  if (res.data.length < 100) break;
}
