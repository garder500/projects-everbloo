import { CookieJar } from "../../lib/cookie-jar.js";
import {
  loadAmadeusSession,
  saveAmadeusSession,
  type AmadeusSessionData,
} from "../../lib/session-store.js";
import {
  AMADEUS_DEVELOPERS,
  AMADEUS_OAUTH,
  authApiUrl,
  authorizeUrl,
  BROWSER_UA,
  getCredentials,
  parseFragment,
} from "./config.js";

interface SecurityStatusResponse {
  authenticated?: boolean;
  isAuthenticated?: boolean;
  loggedIn?: boolean;
  status?: string;
  userName?: string;
}

interface InitResponse {
  lid?: string;
  accessToken?: string;
  state?: string;
}

interface IdentifyResponse {
  accessToken?: string;
  authMode?: string;
  state?: string;
}

interface AuthenticateResponse {
  redirectUri?: string;
  redirectUrl?: string;
  location?: string;
  destinationUrl?: string;
  accessToken?: string;
  idToken?: string;
  state?: string;
}

export class AmadeusClient {
  readonly jar = new CookieJar();
  private lid?: string;
  private xsrfToken?: string;

  static async create(): Promise<AmadeusClient> {
    const client = new AmadeusClient();
    await client.loadSession();
    return client;
  }

  async loadSession(): Promise<void> {
    const saved = await loadAmadeusSession();
    if (!saved) return;
    Object.assign(this.jar, CookieJar.fromJSON(saved.cookies));
    this.lid = saved.lid;
    this.xsrfToken = saved.xsrfToken;
  }

  async persistSession(authenticated: boolean): Promise<void> {
    const data: AmadeusSessionData = {
      cookies: this.jar.toJSON(),
      lid: this.lid,
      xsrfToken: this.xsrfToken,
      authenticated,
      savedAt: new Date().toISOString(),
    };
    await saveAmadeusSession(data);
  }

  private xsrfFromJar(): string | undefined {
    return (
      this.xsrfToken ??
      this.jar.get("XSRF-TOKEN", "developers.amadeus.com") ??
      this.jar.get("XSRF-TOKEN")
    );
  }

  /** Amadeus SPA generates XSRF-TOKEN client-side before any PAS-EAS call. */
  private ensureXsrfToken(): string {
    const existing = this.xsrfFromJar();
    if (existing) {
      this.xsrfToken = existing;
      return existing;
    }

    const token = crypto.randomUUID();
    this.jar.set("XSRF-TOKEN", token, "developers.amadeus.com", "/");
    this.xsrfToken = token;
    return token;
  }

  getXsrfToken(): string | undefined {
    return this.xsrfFromJar();
  }

  async fetch(url: string, init: RequestInit = {}): Promise<Response> {
    const headers = new Headers(init.headers);
    if (!headers.has("User-Agent")) headers.set("User-Agent", BROWSER_UA);
    if (!headers.has("Accept-Language")) {
      headers.set("Accept-Language", "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7");
    }

    const cookieHeader = this.jar.getCookieHeader(url);
    if (cookieHeader) headers.set("Cookie", cookieHeader);

    const response = await fetch(url, {
      ...init,
      headers,
      redirect: init.redirect ?? "follow",
    });

    this.jar.ingestSetCookieHeaders(response.headers, response.url);
    return response;
  }

  async fetchAccounts(
    url: string,
    init: RequestInit = {},
  ): Promise<Response> {
    const headers = new Headers(init.headers);
    headers.set("Origin", "https://www.accounts.amadeus.com");
    if (this.lid) headers.set("lid", this.lid);
    return this.fetch(url, { ...init, headers });
  }

  async bootstrapDevelopersSession(): Promise<void> {
    await this.fetch(`${AMADEUS_DEVELOPERS}/`, { method: "GET" });
    this.ensureXsrfToken();
  }

  async checkSecurityStatus(): Promise<boolean> {
    await this.bootstrapDevelopersSession();
    const xsrf = this.ensureXsrfToken();
    const headers: Record<string, string> = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Origin: AMADEUS_DEVELOPERS,
      Referer: `${AMADEUS_DEVELOPERS}/`,
    };
    if (xsrf) headers["x-xsrf-token"] = xsrf;

    const response = await this.fetch(
      `${AMADEUS_DEVELOPERS}/PAS-EAS/api/security/status`,
      { method: "POST", headers, body: "{}" },
    );

    if (!response.ok) {
      return false;
    }

    const data = (await response.json()) as SecurityStatusResponse;
    return (
      data.authenticated === true ||
      data.isAuthenticated === true ||
      data.loggedIn === true ||
      data.status === "AUTHENTICATED"
    );
  }

  async login(force = false): Promise<{ authenticated: boolean; message: string }> {
    if (!force) {
      const ok = await this.checkSecurityStatus();
      if (ok) {
        await this.persistSession(true);
        return { authenticated: true, message: "Session already valid" };
      }
    }

    const { userAlias, password } = getCredentials();
    const nonce = String(Date.now());

    await this.fetch(authorizeUrl(nonce), { method: "GET" });

    const initResponse = await this.fetchAccounts(authApiUrl("init", nonce), {
      method: "POST",
      headers: { "Content-Type": "text/plain", Accept: "application/json, text/plain, */*" },
      body: "",
    });

    if (!initResponse.ok) {
      throw new Error(`Amadeus auth init failed: HTTP ${initResponse.status}`);
    }

    const initData = (await initResponse.json()) as InitResponse;
    if (initData.lid) this.lid = initData.lid;

    const identifyResponse = await this.fetchAccounts(authApiUrl("identify", nonce), {
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
    });

    if (!identifyResponse.ok) {
      throw new Error(`Amadeus auth identify failed: HTTP ${identifyResponse.status}`);
    }

    const identifyData = (await identifyResponse.json()) as IdentifyResponse;
    const stepToken = identifyData.accessToken;
    if (!stepToken) {
      throw new Error("Amadeus identify response missing accessToken");
    }

    const authenticateResponse = await this.fetchAccounts(
      authApiUrl("authenticate", nonce),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: stepToken,
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
    );

    if (!authenticateResponse.ok) {
      throw new Error(
        `Amadeus auth authenticate failed: HTTP ${authenticateResponse.status}`,
      );
    }

    const authData = (await authenticateResponse.json()) as AuthenticateResponse;
    const redirectTarget =
      authData.redirectUri ?? authData.redirectUrl ?? authData.location;

    if (redirectTarget) {
      await this.completeOAuthRedirect(redirectTarget);
    } else if (authData.accessToken && authData.idToken) {
      await this.exchangePortalTokens(authData.accessToken, authData.idToken);
    } else if (authData.accessToken || authData.idToken) {
      throw new Error("Amadeus authenticate response missing token pair");
    }

    const authenticated = await this.checkSecurityStatus();
    await this.persistSession(authenticated);

    if (!authenticated) {
      throw new Error("Amadeus login completed but security/status is not authenticated");
    }

    return { authenticated: true, message: "Login successful" };
  }

  private async exchangePortalTokens(
    idToken: string,
    accessToken: string,
  ): Promise<void> {
    // PAS-EAS expects the short OAuth bearer in `idToken` and the JWT in `accessToken`
    // (field names do not match OAuth fragment names).
    await this.bootstrapDevelopersSession();
    const xsrf = this.ensureXsrfToken();

    const body = new URLSearchParams({
      idToken,
      accessToken,
    });

    const headers: Record<string, string> = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: AMADEUS_DEVELOPERS,
      Referer: `${AMADEUS_DEVELOPERS}/`,
      "X-NO-HANDLE-ERROR": "1",
      "X-NO-MODAL-ERROR": "1",
    };
    if (xsrf) headers["x-xsrf-token"] = xsrf;

    const response = await this.fetch(
      `${AMADEUS_DEVELOPERS}/PAS-EAS/api/security/authenticate`,
      { method: "POST", headers, body: body.toString() },
    );

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(
        `Amadeus portal token exchange failed: HTTP ${response.status}${text ? ` — ${text.slice(0, 200)}` : ""}`,
      );
    }

    this.xsrfToken = this.xsrfFromJar();
  }

  private async completeOAuthRedirect(redirectTarget: string): Promise<void> {
    const fragment = redirectTarget.includes("#")
      ? parseFragment(redirectTarget)
      : parseFragment(`${redirectTarget}#`);

    const accessToken = fragment.access_token;
    const idToken = fragment.id_token;

    if (accessToken && idToken) {
      await this.exchangePortalTokens(accessToken, idToken);
      return;
    }

    const url = redirectTarget.startsWith("http")
      ? redirectTarget.split("#")[0]
      : redirectTarget.startsWith("/")
        ? `${AMADEUS_OAUTH.redirectUri}${redirectTarget}`
        : `${AMADEUS_OAUTH.redirectUri}/${redirectTarget}`;

    await this.fetch(url, { method: "GET" });
  }

  async fetchAuthenticated(url: string): Promise<{ html: string; finalUrl: string; status: number }> {
    let ok = await this.checkSecurityStatus();
    if (!ok) {
      await this.login();
    }

    const response = await this.fetch(url, {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        Referer: AMADEUS_DEVELOPERS,
      },
    });

    if (response.status === 401 || response.status === 403) {
      await this.login(true);
      const retry = await this.fetch(url, {
        headers: {
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          Referer: AMADEUS_DEVELOPERS,
        },
      });
      const html = await retry.text();
      return { html, finalUrl: retry.url, status: retry.status };
    }

    const html = await response.text();
    return { html, finalUrl: response.url, status: response.status };
  }
}
