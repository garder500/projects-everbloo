const url = "https://developers.amadeus.com/main.228eca2fd33d7779.js";
const res = await fetch(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
  },
});
const js = await res.text();
console.log("bytes", js.length);
for (const needle of [
  "security/authenticate",
  "security/csrf",
  "XSRF-TOKEN",
  "x-xsrf-token",
  "idToken",
  "accessToken",
]) {
  let idx = 0;
  let count = 0;
  while ((idx = js.indexOf(needle, idx)) !== -1 && count < 3) {
    console.log("\n---", needle, count, "---");
    console.log(js.slice(Math.max(0, idx - 100), idx + needle.length + 150));
    idx += needle.length;
    count++;
  }
}
