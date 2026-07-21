import "dotenv/config";
import { AmadeusClient } from "../src/providers/amadeus/client.js";
import {
  AMADEUS_DEVELOPERS,
  AMADEUS_OAUTH,
  authApiUrl,
  authorizeUrl,
  getCredentials,
  parseFragment,
} from "../src/providers/amadeus/config.js";

async function main(): Promise<void> {
  const client = new AmadeusClient();
  const nonce = String(Date.now());
  const { userAlias, password } = getCredentials();

  const accountsFetch = (url: string, init: RequestInit = {}, lid?: string) => {
    const headers = new Headers(init.headers);
    headers.set("Origin", "https://www.accounts.amadeus.com");
    if (lid) headers.set("lid", lid);
    return client.fetch(url, { ...init, headers });
  };

  await client.fetch(authorizeUrl(nonce), { method: "GET" });

  const initRes = await accountsFetch(authApiUrl("init", nonce), {
    method: "POST",
    headers: { "Content-Type": "text/plain", Accept: "application/json, text/plain, */*" },
    body: "",
  });
  const initText = await initRes.text();
  console.log("init:", initRes.status, initText);
  const initData = JSON.parse(initText) as { lid?: string };
  const lid = initData.lid;

  const identifyRes = await accountsFetch(
    authApiUrl("identify", nonce),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        officeId: "",
        userAlias,
        userId: "",
        email: "",
        organization: AMADEUS_OAUTH.organization,
        agentSign: "",
        authMode: AMADEUS_OAUTH.authMode,
        language: AMADEUS_OAUTH.language,
      }),
    },
    lid,
  );
  const identifyText = await identifyRes.text();
  console.log("identify:", identifyRes.status, identifyText.slice(0, 300));
  const identifyData = JSON.parse(identifyText) as { accessToken?: string };

  const authRes = await accountsFetch(
    authApiUrl("authenticate", nonce),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken: identifyData.accessToken,
        authMode: AMADEUS_OAUTH.authMode,
        authenticationFactors: { password },
        officeId: "",
        organization: AMADEUS_OAUTH.organization,
        forceSignIn: false,
        responseMode: AMADEUS_OAUTH.responseMode,
        redirectUri: AMADEUS_OAUTH.redirectUri,
        language: AMADEUS_OAUTH.language,
      }),
    },
    lid,
  );
  const authText = await authRes.text();
  console.log("authenticate:", authRes.status);
  console.log("authenticate body keys:", Object.keys(JSON.parse(authText)));
  console.log("authenticate body preview:", authText.slice(0, 500));

  const authData = JSON.parse(authText) as {
    redirectUri?: string;
    accessToken?: string;
    idToken?: string;
  };

  await client.fetch(`${AMADEUS_DEVELOPERS}/`, { method: "GET" });
  const xsrf = client.getXsrfToken();
  console.log("xsrf after bootstrap:", xsrf ?? "(none)");
  console.log(
    "developers cookies:",
    client.jar
      .toJSON()
      .filter((c) => c.domain.includes("developers"))
      .map((c) => c.name),
  );

  const redirectTarget = authData.redirectUri;
  const inlineTokens = authData.accessToken && authData.idToken;

  const tokenPairs: Array<[string, string, string]> = [];
  if (redirectTarget) {
    const fragment = parseFragment(redirectTarget);
    console.log("fragment keys:", Object.keys(fragment));
    if (fragment.access_token && fragment.id_token) {
      tokenPairs.push(["fragment-swapped", fragment.access_token, fragment.id_token]);
      tokenPairs.push(["fragment-direct", fragment.id_token, fragment.access_token]);
    }
  }
  if (inlineTokens) {
    tokenPairs.push(["inline-swapped", authData.accessToken!, authData.idToken!]);
    tokenPairs.push(["inline-direct", authData.idToken!, authData.accessToken!]);
  }

  for (const [label, idTok, accTok] of tokenPairs) {
    const body = new URLSearchParams({ idToken: idTok, accessToken: accTok });
    const headers: Record<string, string> = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: AMADEUS_DEVELOPERS,
      Referer: `${AMADEUS_DEVELOPERS}/`,
      "X-NO-HANDLE-ERROR": "1",
      "X-NO-MODAL-ERROR": "1",
    };
    if (xsrf) headers["x-xsrf-token"] = xsrf;

    const exRes = await client.fetch(
      `${AMADEUS_DEVELOPERS}/PAS-EAS/api/security/authenticate`,
      { method: "POST", headers, body: body.toString() },
    );
    const exText = await exRes.text();
    console.log(`exchange (${label}):`, exRes.status, exText.slice(0, 300));
  }

  if (tokenPairs.length === 0) {
    console.log("no token pairs to exchange");
  }

  // remove old block below
  if (false && redirectTarget) {
    const fragment = parseFragment(redirectTarget);
    console.log("fragment keys:", Object.keys(fragment));
    console.log("has access_token:", Boolean(fragment.access_token));
    console.log("has id_token:", Boolean(fragment.id_token));

    for (const [label, idTok, accTok] of [
      ["swapped", fragment.access_token, fragment.id_token],
      ["direct", fragment.id_token, fragment.access_token],
    ] as const) {
      if (!idTok || !accTok) continue;
      const body = new URLSearchParams({ idToken: idTok, accessToken: accTok });
      const headers: Record<string, string> = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: AMADEUS_DEVELOPERS,
        Referer: `${AMADEUS_DEVELOPERS}/`,
        "X-NO-HANDLE-ERROR": "1",
        "X-NO-MODAL-ERROR": "1",
      };
      if (xsrf) headers["x-xsrf-token"] = xsrf;

      const exRes = await client.fetch(
        `${AMADEUS_DEVELOPERS}/PAS-EAS/api/security/authenticate`,
        { method: "POST", headers, body: body.toString() },
      );
      const exText = await exRes.text();
      console.log(`exchange (${label}):`, exRes.status, exText.slice(0, 300));
    }
  }

  const statusHeaders: Record<string, string> = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Origin: AMADEUS_DEVELOPERS,
    Referer: `${AMADEUS_DEVELOPERS}/`,
  };
  if (xsrf) statusHeaders["x-xsrf-token"] = xsrf;
  const statusRes = await client.fetch(
    `${AMADEUS_DEVELOPERS}/PAS-EAS/api/security/status`,
    { method: "POST", headers: statusHeaders, body: "{}" },
  );
  console.log("status:", statusRes.status, (await statusRes.text()).slice(0, 500));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
