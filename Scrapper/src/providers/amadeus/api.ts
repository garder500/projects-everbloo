import { AmadeusClient } from "./client.js";
import { AMADEUS_DEVELOPERS } from "./config.js";
import type {
  DocumentFileUrlResponse,
  DocumentMetadata,
  DocumentsListResponse,
  DocumentListItem,
  DocumentReference,
  ServiceDetail,
  ServicesListResponse,
} from "./types.js";

const PAS_EAS = `${AMADEUS_DEVELOPERS}/PAS-EAS/api`;
/** Amadeus PAS-EAS typo: list/detail routes use "servlces", not "services". */
const SERVICES_PATH = "servlces";
const SOAP_LIBRARY_REFERER = `${AMADEUS_DEVELOPERS}/enterprise/api-library/soap`;
const SOAP_LIBRARY_DETAIL_REFERER = `${SOAP_LIBRARY_REFERER}?page=1&count=20&sorting=name,asc`;

export interface PasApiOptions {
  method?: "GET" | "POST";
  body?: unknown;
  referer?: string;
}

export async function pasFetch<T = unknown>(
  client: AmadeusClient,
  path: string,
  options: PasApiOptions = {},
): Promise<T> {
  const method = options.method ?? "GET";
  const referer = options.referer ?? `${AMADEUS_DEVELOPERS}/`;

  let ok = await client.checkSecurityStatus();
  if (!ok) {
    await client.login();
  }

  const xsrf = client.getXsrfToken();
  const headers: Record<string, string> = {
    Accept: "application/json, text/plain, */*",
    Origin: AMADEUS_DEVELOPERS,
    Referer: referer,
  };
  if (method === "POST") {
    headers["Content-Type"] = "application/json";
  }
  if (xsrf) {
    headers["x-xsrf-token"] = xsrf;
  }

  const url = path.startsWith("http") ? path : `${PAS_EAS}${path.startsWith("/") ? path : `/${path}`}`;
  const response = await client.fetch(url, {
    method,
    headers,
    body:
      options.body !== undefined
        ? JSON.stringify(options.body)
        : method === "POST"
          ? "{}"
          : undefined,
  });

  if (response.status === 401 || response.status === 403) {
    await client.login(true);
    return pasFetch(client, path, options);
  }

  if (response.status === 204) {
    return null as T;
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`PAS-EAS ${method} ${path} failed: HTTP ${response.status}${text ? ` — ${text.slice(0, 200)}` : ""}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("json")) {
    const text = await response.text();
    throw new Error(`PAS-EAS ${path} returned non-JSON: ${text.slice(0, 200)}`);
  }

  return (await response.json()) as T;
}

export async function getCatalogFamilies(
  client: AmadeusClient,
  catalogueId: number,
  level = 0,
): Promise<unknown> {
  return pasFetch(
    client,
    `/v1/catalogues/${catalogueId}/families?filter=level,${level}`,
  );
}

export async function getProductCatalogs(client: AmadeusClient): Promise<unknown> {
  return pasFetch(client, "/v1/product-catalogs");
}

export async function getTransactionTypes(client: AmadeusClient): Promise<unknown> {
  return pasFetch(
    client,
    "/codesets/transaction-types?pageSize=99999&page=1",
    { referer: SOAP_LIBRARY_REFERER },
  );
}

export async function getFormats(client: AmadeusClient): Promise<unknown> {
  return pasFetch(
    client,
    "/codesets/formats?pageSize=99999&page=1",
    { referer: SOAP_LIBRARY_REFERER },
  );
}

export async function listServices(
  client: AmadeusClient,
  options: {
    protocol?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: "asc" | "desc";
  } = {},
): Promise<ServicesListResponse> {
  const protocol = options.protocol ?? "SOAP";
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 50;
  const sortBy = options.sortBy ?? "name";
  const sortDirection = options.sortDirection ?? "asc";
  const query = new URLSearchParams({
    filter: `protocol,${protocol}`,
    pageSize: String(pageSize),
    page: String(page),
    sortBy,
    sortDirection,
  });

  return pasFetch<ServicesListResponse>(
    client,
    `/${SERVICES_PATH}?${query.toString()}`,
    { referer: SOAP_LIBRARY_REFERER },
  );
}

export async function getService(
  client: AmadeusClient,
  serviceId: number,
): Promise<ServiceDetail> {
  return pasFetch<ServiceDetail>(
    client,
    `/${SERVICES_PATH}/${serviceId}`,
    { referer: SOAP_LIBRARY_DETAIL_REFERER },
  );
}

export async function getDocument(
  client: AmadeusClient,
  documentId: number,
  serviceId: number,
): Promise<DocumentMetadata> {
  return pasFetch<DocumentMetadata>(
    client,
    `/documents/${documentId}`,
    { referer: `${AMADEUS_DEVELOPERS}/functional-doc/${serviceId}` },
  );
}

export async function getDocumentFileUrl(
  client: AmadeusClient,
  documentId: number,
  serviceId: number,
  serviceVersion: string,
): Promise<DocumentFileUrlResponse> {
  const referer =
    `${AMADEUS_DEVELOPERS}/api-library/soap/functional-doc/${serviceId}` +
    `/doc-read/${documentId}?serviceVersion=${encodeURIComponent(serviceVersion)}`;

  return pasFetch<DocumentFileUrlResponse>(
    client,
    `/documents/${documentId}/file/url`,
    { referer },
  );
}

export function docReadUrl(
  serviceId: number,
  documentId: number,
  serviceVersion: string,
): string {
  return (
    `${AMADEUS_DEVELOPERS}/api-library/soap/functional-doc/${serviceId}` +
    `/doc-read/${documentId}?serviceVersion=${encodeURIComponent(serviceVersion)}`
  );
}

export function downloadUrl(resourcePath: string): string {
  if (resourcePath.startsWith("http")) return resourcePath;
  return `${AMADEUS_DEVELOPERS}${resourcePath.startsWith("/") ? "" : "/"}${resourcePath}`;
}

export async function listServiceDocuments(
  client: AmadeusClient,
  serviceId: number,
  options: {
    page?: number;
    pageSize?: number;
    docType?: string;
    isMainpage?: boolean;
  } = {},
): Promise<DocumentsListResponse> {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 100;
  const params = new URLSearchParams({
    serviceId: String(serviceId),
    pageSize: String(pageSize),
    page: String(page),
  });

  if (options.docType) {
    params.append("filter", `docType,${options.docType}`);
  }
  if (options.isMainpage) {
    params.append("filter", "isMainpage,true");
  }

  return pasFetch<DocumentsListResponse>(
    client,
    `/documents?${params.toString()}`,
    { referer: `${AMADEUS_DEVELOPERS}/functional-doc/${serviceId}` },
  );
}

export function documentMatchesVersion(
  doc: DocumentListItem,
  serviceId: number,
  versionRelease: string,
): boolean {
  const refs = doc.references?.services ?? [];
  return refs.some(
    (ref) =>
      ref.service?.id === serviceId &&
      ref.minVersion === versionRelease &&
      ref.maxVersion === versionRelease,
  );
}

function parseVersionRelease(value: string): number {
  const [major, minor = "0"] = value.split(".");
  return Number.parseFloat(`${major}.${minor}`);
}

function documentReferencesService(
  doc: DocumentListItem,
  serviceId: number,
): DocumentReference | null {
  const refs = doc.references?.services ?? [];
  return refs.find((ref) => ref.service?.id === serviceId) ?? null;
}

function isUserGuideMainpage(doc: DocumentListItem): boolean {
  return (
    doc.isMainpage === true &&
    doc.docType === "User guide" &&
    (doc.fileFormat === "HTML" || doc.fileFormat === "PDF")
  );
}

export function preferHtmlDocument(docs: DocumentListItem[]): DocumentListItem {
  return docs.find((doc) => doc.fileFormat === "HTML") ?? docs[0];
}

export function pickBestDocumentForService(
  docs: DocumentListItem[],
  serviceId: number,
  versionRelease: string,
): DocumentListItem | null {
  const candidates = docs.filter(
    (doc) => isUserGuideMainpage(doc) && documentReferencesService(doc, serviceId),
  );
  if (candidates.length === 0) return null;

  const exactMatches = candidates.filter((doc) =>
    documentMatchesVersion(doc, serviceId, versionRelease),
  );
  if (exactMatches.length > 0) {
    return preferHtmlDocument(exactMatches);
  }

  const target = parseVersionRelease(versionRelease);
  const scored = candidates
    .map((doc) => {
      const ref = documentReferencesService(doc, serviceId);
      const version = ref?.minVersion ?? ref?.maxVersion ?? "0.0";
      return { doc, version, score: parseVersionRelease(version) };
    })
    .filter(({ score }) => score <= target)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;

  const bestScore = scored[0].score;
  const atBestScore = scored.filter(({ score }) => score === bestScore).map(({ doc }) => doc);
  return preferHtmlDocument(atBestScore);
}

export async function downloadDocumentFile(
  client: AmadeusClient,
  resourcePath: string,
  referer: string,
): Promise<{ content: string | Buffer; finalUrl: string; status: number; fileFormat: "HTML" | "PDF" }> {
  let ok = await client.checkSecurityStatus();
  if (!ok) {
    await client.login();
  }

  const xsrf = client.getXsrfToken();
  const url = downloadUrl(resourcePath);
  const headers: Record<string, string> = {
    Accept: "text/html,application/pdf,application/octet-stream,*/*",
    Referer: referer,
    Origin: AMADEUS_DEVELOPERS,
  };
  if (xsrf) {
    headers["x-xsrf-token"] = xsrf;
  }

  const response = await client.fetch(url, { headers });
  const bytes = Buffer.from(await response.arrayBuffer());
  const fileFormat: "HTML" | "PDF" = bytes.subarray(0, 5).toString("ascii").startsWith("%PDF")
    ? "PDF"
    : "HTML";

  return {
    content: fileFormat === "PDF" ? bytes : bytes.toString("utf-8"),
    finalUrl: response.url,
    status: response.status,
    fileFormat,
  };
}

/** @deprecated Use downloadDocumentFile */
export async function downloadDocumentHtml(
  client: AmadeusClient,
  resourcePath: string,
  referer: string,
): Promise<{ html: string; finalUrl: string; status: number }> {
  const result = await downloadDocumentFile(client, resourcePath, referer);
  return {
    html: result.content as string,
    finalUrl: result.finalUrl,
    status: result.status,
  };
}
