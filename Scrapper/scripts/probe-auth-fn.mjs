const url = "https://developers.amadeus.com/main.228eca2fd33d7779.js";
const res = await fetch(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
  },
});
const js = await res.text();
const idx = js.indexOf("authenticate(idToken, accessToken)");
console.log(js.slice(idx, idx + 1200));
