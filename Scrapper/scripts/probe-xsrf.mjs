const ua =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";

const res = await fetch("https://developers.amadeus.com/", {
  headers: { "User-Agent": ua },
});
console.log("status", res.status);
console.log("set-cookie", res.headers.getSetCookie?.() ?? res.headers.get("set-cookie"));
const html = await res.text();
console.log("html length", html.length);
console.log("contains XSRF", /xsrf/i.test(html));
for (const re of [
  /XSRF-TOKEN[=:"'\s]+([a-f0-9-]{20,})/gi,
  /"xsrfToken"\s*:\s*"([^"]+)"/i,
  /xsrf[_-]?token['"]\s*:\s*['"]([^'"]+)/i,
]) {
  const m = html.match(re);
  if (m) console.log("match", re.source, m[1]?.slice(0, 60));
}
