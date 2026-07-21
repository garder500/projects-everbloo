import "dotenv/config";
import { AmadeusClient } from "../src/providers/amadeus/client.js";
import { AMADEUS_DEVELOPERS } from "../src/providers/amadeus/config.js";

const client = await AmadeusClient.create();
await client.login();

const paths = [
  "/PAS-EAS/api/services?filter=protocol,SOAP&pageSize=2&page=1&sortBy=name&sortDirection=asc",
  "/PAS-EAS/api/servlces?filter=protocol,SOAP&pageSize=2&page=1&sortBy=name&sortDirection=asc",
];

for (const path of paths) {
  const xsrf = client.getXsrfToken();
  const res = await client.fetch(`${AMADEUS_DEVELOPERS}${path}`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      Referer: `${AMADEUS_DEVELOPERS}/enterprise/api-library/soap`,
      Origin: AMADEUS_DEVELOPERS,
      ...(xsrf ? { "x-xsrf-token": xsrf } : {}),
    },
  });
  const ct = res.headers.get("content-type") ?? "";
  const text = await res.text();
  console.log(path, res.status, ct.split(";")[0], text.slice(0, 200));
}
