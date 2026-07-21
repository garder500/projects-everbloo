export const AMADEUS_OAUTH = {
  clientId: "1ASIXPAA",
  service: "IDGTW_PAD-USERS",
  organization: "PAD-USERS",
  authMode: "HOS",
  redirectUri: "https://developers.amadeus.com",
  scope: "profile openid email sap.1ASIWAPILA1A",
  responseMode: "fragment",
  language: "en_GB",
} as const;

export const AMADEUS_DEVELOPERS = "https://developers.amadeus.com";
export const AMADEUS_ACCOUNTS = "https://www.accounts.amadeus.com";

export const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";

export function buildOAuthQuery(nonce: string): string {
  const params = new URLSearchParams({
    service: AMADEUS_OAUTH.service,
    client_id: AMADEUS_OAUTH.clientId,
    nonce,
    redirect_uri: AMADEUS_OAUTH.redirectUri,
    scope: AMADEUS_OAUTH.scope,
    response_mode: AMADEUS_OAUTH.responseMode,
  });
  return params.toString();
}

export function authorizeUrl(nonce: string): string {
  return `${AMADEUS_ACCOUNTS}/LoginService/authorize?${buildOAuthQuery(nonce)}`;
}

export function authApiUrl(step: "init" | "identify" | "authenticate", nonce: string): string {
  return `${AMADEUS_ACCOUNTS}/LoginService/services/rs/auth2.0/${step}?${buildOAuthQuery(nonce)}`;
}

export function getCredentials(): { userAlias: string; password: string } {
  const userAlias = process.env.AMADEUS_USER_ALIAS;
  const password = process.env.AMADEUS_PASSWORD;
  if (!userAlias || !password) {
    throw new Error(
      "Missing AMADEUS_USER_ALIAS or AMADEUS_PASSWORD. Copy .env.example to .env and fill credentials.",
    );
  }
  return { userAlias, password };
}

export function parseFragment(url: string): Record<string, string> {
  const hash = url.includes("#") ? url.split("#")[1] : "";
  const params = new URLSearchParams(hash);
  const out: Record<string, string> = {};
  for (const [k, v] of params) out[k] = v;
  return out;
}
