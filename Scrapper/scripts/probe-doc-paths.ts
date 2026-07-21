import "dotenv/config";
import { AmadeusClient } from "../src/providers/amadeus/client.js";

const client = await AmadeusClient.create();
await client.login();
const paths = [
  "/enterprise/api-library/soap",
  "/PAS-EAS/api/v1/services/2709",
  "/PAS-EAS/api/v1/services/2709/documentation",
  "/PAS-EAS/api/v1/catalogues/2/families/153",
];
for (const p of paths) {
  const res = await client.fetch(`https://developers.amadeus.com${p}`, {
    headers: { Accept: "application/json, text/html, */*" },
  });
  const ct = res.headers.get("content-type") ?? "";
  const text = await res.text();
  console.log(p, res.status, ct.split(";")[0], "len", text.length);
}
