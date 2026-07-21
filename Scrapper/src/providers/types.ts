export interface SessionStatus {
  authenticated: boolean;
  message: string;
  savedAt?: string;
}

export interface SearchResult {
  rank: number;
  title: string;
  url: string;
  description: string;
  path?: string;
}

export interface DocumentContent {
  url: string;
  title?: string;
  content: string;
  format: "markdown" | "text" | "html";
  fromCache: boolean;
}

export interface CrawlReport {
  source: string;
  total: number;
  succeeded: number;
  failed: number;
  results: Array<{ url: string; path?: string; error?: string }>;
}

export interface DocumentProvider {
  id: string;
  login(force?: boolean): Promise<SessionStatus>;
  crawl(urls: string[], force?: boolean): Promise<CrawlReport>;
  search(query: string, limit: number): Promise<SearchResult[]>;
  get(url: string, options?: { format?: "text" | "html" | "markdown"; maxChars?: number }): Promise<DocumentContent>;
}
