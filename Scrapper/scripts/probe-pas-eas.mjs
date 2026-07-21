const ua =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";
const base = "https://developers.amadeus.com";
const paths = [
  "/PAS-EAS/api/security/status",
  "/PAS-EAS/api/security/csrf",
  "/PAS-EAS/api/security/init",
  "/PAS-EAS/api/v1/product-catalogs",
];

for (const path of paths) {
  for (const method of ["GET", "POST"]) {
    const res = await fetch(`${base}${path}`, {
      method,
      headers: {
        "User-Agent": ua,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Origin: base,
        Referer: `${base}/`,
      },
      body: method === "POST" ? "{}" : undefined,
    });
    const cookies = res.headers.getSetCookie?.() ?? [];
    console.log(method, path, res.status, "cookies:", cookies.map((c) => c.split(";")[0]).join(" | "));
  }
}
