const DEFAULT_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (compatible; EverblooScrapperMCP/0.1; +https://everbloo.com)",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9,fr;q=0.8",
};

export async function fetchUrl(
  url: string,
  timeoutMs = 15_000,
): Promise<{ html: string; finalUrl: string; status: number }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      headers: DEFAULT_HEADERS,
      redirect: "follow",
      signal: controller.signal,
    });

    const html = await response.text();
    return {
      html,
      finalUrl: response.url,
      status: response.status,
    };
  } finally {
    clearTimeout(timeout);
  }
}
