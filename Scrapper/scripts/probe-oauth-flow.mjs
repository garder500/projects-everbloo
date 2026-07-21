const url = "https://developers.amadeus.com/main.228eca2fd33d7779.js";
const res = await fetch(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
  },
});
const js = await res.text();
for (const needle of ["access_token", "id_token", ".authenticate(", "handleOAuth", "fragment"]) {
  let idx = 0;
  let count = 0;
  while ((idx = js.indexOf(needle, idx)) !== -1 && count < 2) {
    if (needle.includes("token") || needle.includes("authenticate")) {
      console.log("\n---", needle, count, "---");
      console.log(js.slice(Math.max(0, idx - 120), idx + 220));
    }
    idx += needle.length;
    count++;
  }
}
