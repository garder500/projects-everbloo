export interface StoredCookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: string;
}

export class CookieJar {
  private cookies = new Map<string, StoredCookie>();

  private key(cookie: StoredCookie): string {
    return `${cookie.domain}|${cookie.path}|${cookie.name}`;
  }

  set(name: string, value: string, domain: string, path = "/"): void {
    const cookie: StoredCookie = { name, value, domain, path };
    this.cookies.set(this.key(cookie), cookie);
  }

  setFromSetCookieHeader(setCookie: string, requestUrl: string): void {
    const url = new URL(requestUrl);
    const parts = setCookie.split(";").map((p) => p.trim());
    const [nameValue, ...attrs] = parts;
    const eq = nameValue.indexOf("=");
    if (eq === -1) return;

    const name = nameValue.slice(0, eq);
    const value = nameValue.slice(eq + 1);
    let domain = url.hostname;
    let path = "/";
    let expires: number | undefined;

    for (const attr of attrs) {
      const lower = attr.toLowerCase();
      if (lower.startsWith("domain=")) {
        domain = attr.slice(7).replace(/^\./, "");
      } else if (lower.startsWith("path=")) {
        path = attr.slice(5);
      } else if (lower.startsWith("expires=")) {
        const ts = Date.parse(attr.slice(8));
        if (!Number.isNaN(ts)) expires = ts;
      } else if (lower === "max-age=0") {
        this.delete(name, domain, path);
        return;
      }
    }

    if (expires !== undefined && expires < Date.now()) {
      this.delete(name, domain, path);
      return;
    }

    this.set(name, value, domain, path);
  }

  delete(name: string, domain: string, path = "/"): void {
    this.cookies.delete(`${domain}|${path}|${name}`);
  }

  getCookieHeader(url: string): string {
    const { hostname, pathname } = new URL(url);
    const matching: StoredCookie[] = [];

    for (const cookie of this.cookies.values()) {
      if (cookie.expires !== undefined && cookie.expires < Date.now()) {
        this.cookies.delete(this.key(cookie));
        continue;
      }
      const domainMatch =
        hostname === cookie.domain || hostname.endsWith(`.${cookie.domain}`);
      const pathMatch = pathname.startsWith(cookie.path);
      if (domainMatch && pathMatch) {
        matching.push(cookie);
      }
    }

    return matching.map((c) => `${c.name}=${c.value}`).join("; ");
  }

  get(name: string, domain?: string): string | undefined {
    for (const cookie of this.cookies.values()) {
      if (cookie.name !== name) continue;
      if (domain && cookie.domain !== domain && !domain.endsWith(cookie.domain)) {
        continue;
      }
      if (cookie.expires !== undefined && cookie.expires < Date.now()) continue;
      return cookie.value;
    }
    return undefined;
  }

  ingestSetCookieHeaders(headers: Headers, requestUrl: string): void {
    const raw = headers.getSetCookie?.() ?? [];
    if (raw.length > 0) {
      for (const line of raw) {
        this.setFromSetCookieHeader(line, requestUrl);
      }
      return;
    }

    const single = headers.get("set-cookie");
    if (single) {
      this.setFromSetCookieHeader(single, requestUrl);
    }
  }

  toJSON(): StoredCookie[] {
    return [...this.cookies.values()];
  }

  static fromJSON(cookies: StoredCookie[]): CookieJar {
    const jar = new CookieJar();
    for (const cookie of cookies) {
      jar.cookies.set(jar.key(cookie), cookie);
    }
    return jar;
  }
}
