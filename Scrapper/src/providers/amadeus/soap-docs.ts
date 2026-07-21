import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  docsDir,
  excerptFromMarkdown,
  loadIndex,
  saveIndex,
  upsertEntry,
} from "../../lib/local-index.js";
import { buildFrontmatter, htmlToMarkdown } from "../../lib/markdown.js";
import {
  docReadUrl,
  documentMatchesVersion,
  downloadDocumentFile,
  getDocument,
  getDocumentFileUrl,
  getService,
  listServiceDocuments,
  listServices,
  pickBestDocumentForService,
  preferHtmlDocument,
} from "./api.js";
import { AmadeusClient } from "./client.js";
import type {
  ServiceSummary,
  ServiceVersion,
  SoapDocsReport,
  SoapServiceManifestEntry,
  SoapServicesManifest,
} from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST_FILE = path.resolve(__dirname, "../../../sources/amadeus/soap-services.json");
const SOURCE = "amadeus";
const REQUEST_DELAY_MS = 300;
const MAX_DOCUMENT_PAGES = 20;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function pickLatestPublishedVersion(
  versions: ServiceVersion[] | undefined,
): ServiceVersion | null {
  if (!versions?.length) return null;

  const published = versions.filter((v) => v.releaseStatus === "Published");
  const pool = published.length > 0 ? published : versions;

  return [...pool].sort((a, b) => {
    if (b.version !== a.version) return b.version - a.version;
    return b.release - a.release;
  })[0] ?? null;
}

export async function resolveMainDocument(
  client: AmadeusClient,
  serviceId: number,
  versionRelease: string,
): Promise<{ documentId: number; docVersion: string; fileFormat: "HTML" | "PDF" } | null> {
  const pageSize = 100;
  let page = 1;
  let total = Infinity;
  const collected: import("./types.js").DocumentListItem[] = [];

  while ((page - 1) * pageSize < total) {
    const response = await listServiceDocuments(client, serviceId, {
      page,
      pageSize,
      docType: "User guide",
      isMainpage: true,
    });
    total = response.totalNumberOfResults;
    collected.push(...response.data);

    const exactMatches = collected.filter(
      (doc) =>
        (doc.fileFormat === "HTML" || doc.fileFormat === "PDF") &&
        doc.isMainpage === true &&
        doc.docType === "User guide" &&
        documentMatchesVersion(doc, serviceId, versionRelease),
    );
    if (exactMatches.length > 0) {
      const best = preferHtmlDocument(exactMatches);
      return {
        documentId: best.id,
        docVersion: versionRelease,
        fileFormat: best.fileFormat === "PDF" ? "PDF" : "HTML",
      };
    }

    if (response.data.length < pageSize) break;
    if (page >= MAX_DOCUMENT_PAGES) break;
    page += 1;
    await sleep(REQUEST_DELAY_MS);
  }

  const fallback = pickBestDocumentForService(collected, serviceId, versionRelease);
  if (!fallback) return null;

  const ref = fallback.references?.services?.find((r) => r.service?.id === serviceId);
  const docVersion = ref?.minVersion ?? ref?.maxVersion ?? versionRelease;
  return {
    documentId: fallback.id,
    docVersion,
    fileFormat: fallback.fileFormat === "PDF" ? "PDF" : "HTML",
  };
}

export async function listAllSoapServices(
  client: AmadeusClient,
  pageSize = 50,
): Promise<ServiceSummary[]> {
  const all: ServiceSummary[] = [];
  let page = 1;
  let total = Infinity;

  while (all.length < total) {
    const response = await listServices(client, {
      protocol: "SOAP",
      page,
      pageSize,
    });
    total = response.totalNumberOfResults;
    all.push(...response.data);

    if (response.data.length === 0 || response.data.length < pageSize) break;
    page += 1;
    await sleep(REQUEST_DELAY_MS);
  }

  return all;
}

function soapDocSlug(serviceName: string, versionRelease: string): string {
  const safeName = serviceName.replace(/[^\w.-]+/g, "_");
  const safeVersion = versionRelease.replace(/[^\w.-]+/g, "_");
  return `soap-${safeName}-${safeVersion}`;
}

function soapDocPath(
  serviceName: string,
  docVersion: string,
  fileFormat: "HTML" | "PDF",
): string {
  const ext = fileFormat === "PDF" ? "pdf" : "md";
  return path.join(docsDir(SOURCE), `${soapDocSlug(serviceName, docVersion)}.${ext}`);
}

async function loadManifest(): Promise<SoapServicesManifest | null> {
  try {
    const raw = await readFile(MANIFEST_FILE, "utf-8");
    return JSON.parse(raw) as SoapServicesManifest;
  } catch {
    return null;
  }
}

async function saveManifest(manifest: SoapServicesManifest): Promise<string> {
  await mkdir(path.dirname(MANIFEST_FILE), { recursive: true });
  await writeFile(MANIFEST_FILE, `${JSON.stringify(manifest, null, 2)}\n`, "utf-8");
  return MANIFEST_FILE;
}

export async function fetchAmadeusSoapDocs(options: {
  discoverOnly?: boolean;
  force?: boolean;
  limit?: number;
  pageSize?: number;
} = {}): Promise<SoapDocsReport> {
  const client = await AmadeusClient.create();
  await client.login();

  const discoverOnly = options.discoverOnly ?? false;
  const force = options.force ?? false;
  const pageSize = options.pageSize ?? 50;

  const services = await listAllSoapServices(client, pageSize);
  const limited = options.limit ? services.slice(0, options.limit) : services;

  const existingManifest = await loadManifest();
  const manifestMap = new Map<number, SoapServiceManifestEntry>(
    (existingManifest?.services ?? []).map((entry) => [entry.id, entry]),
  );

  const report: SoapDocsReport = {
    source: SOURCE,
    discoverOnly,
    total: limited.length,
    succeeded: 0,
    failed: 0,
    skipped: 0,
    results: [],
  };

  const manifestEntries: SoapServiceManifestEntry[] = [];
  const index = discoverOnly ? null : await loadIndex(SOURCE);

  if (!discoverOnly) {
    await mkdir(docsDir(SOURCE), { recursive: true });
  }

  for (let i = 0; i < limited.length; i++) {
    const summary = limited[i];
    const existing = manifestMap.get(summary.id);

    console.error(
      `[soap-docs] ${i + 1}/${limited.length} ${summary.name} (id=${summary.id})`,
    );

    if (!force && existing?.status === "ok" && existing.path && !discoverOnly) {
      try {
        await access(existing.path);
        report.skipped += 1;
        report.results.push({
          serviceId: summary.id,
          serviceName: summary.name,
          version: existing.latestVersion,
          documentId: existing.documentId,
          path: existing.path,
          status: "skipped",
        });
        manifestEntries.push({ ...existing, status: "skipped" });
        continue;
      } catch {
        // stale manifest entry — re-fetch
      }
    }

    try {
      let versions = summary.serviceVersions;
      if (!versions?.length) {
        await sleep(REQUEST_DELAY_MS);
        const detail = await getService(client, summary.id);
        versions = detail.serviceVersions;
      }
      const version = pickLatestPublishedVersion(versions);

      if (!version) {
        const entry: SoapServiceManifestEntry = {
          id: summary.id,
          name: summary.name,
          status: "no_version",
        };
        manifestEntries.push(entry);
        report.failed += 1;
        report.results.push({
          serviceId: summary.id,
          serviceName: summary.name,
          status: "no_version",
          error: "No published service version found",
        });
        continue;
      }

      await sleep(REQUEST_DELAY_MS);
      const resolved = await resolveMainDocument(
        client,
        summary.id,
        version.versionRelease,
      );

      if (!resolved) {
        const entry: SoapServiceManifestEntry = {
          id: summary.id,
          name: summary.name,
          latestVersion: version.versionRelease,
          status: "no_document",
        };
        manifestEntries.push(entry);
        report.failed += 1;
        report.results.push({
          serviceId: summary.id,
          serviceName: summary.name,
          version: version.versionRelease,
          status: "no_document",
          error: "No User guide mainpage document for latest version",
        });
        continue;
      }

      const { documentId, docVersion } = resolved;

      const canonicalUrl = docReadUrl(
        summary.id,
        documentId,
        docVersion,
      );

      if (discoverOnly) {
        const entry: SoapServiceManifestEntry = {
          id: summary.id,
          name: summary.name,
          latestVersion: version.versionRelease,
          documentId,
          status: "pending",
        };
        manifestEntries.push(entry);
        report.succeeded += 1;
        report.results.push({
          serviceId: summary.id,
          serviceName: summary.name,
          version: version.versionRelease,
          documentId,
          url: canonicalUrl,
          status: "pending",
        });
        continue;
      }

      if (!force) {
        const cachedPaths = [
          soapDocPath(summary.name, docVersion, "HTML"),
          soapDocPath(summary.name, docVersion, "PDF"),
        ];
        let cachedPath: string | undefined;
        for (const candidate of cachedPaths) {
          try {
            await access(candidate);
            cachedPath = candidate;
            break;
          } catch {
            // try next extension
          }
        }
        if (cachedPath) {
          report.skipped += 1;
          const entry: SoapServiceManifestEntry = {
            id: summary.id,
            name: summary.name,
            latestVersion: version.versionRelease,
            documentId,
            path: cachedPath,
            status: "ok",
          };
          manifestEntries.push(entry);
          report.results.push({
            serviceId: summary.id,
            serviceName: summary.name,
            version: version.versionRelease,
            documentId,
            url: canonicalUrl,
            path: cachedPath,
            status: "skipped",
          });
          continue;
        }
      }

      await sleep(REQUEST_DELAY_MS);
      const docMeta = await getDocument(client, documentId, summary.id);

      await sleep(REQUEST_DELAY_MS);
      const fileUrlResponse = await getDocumentFileUrl(
        client,
        documentId,
        summary.id,
        docVersion,
      );
      await sleep(REQUEST_DELAY_MS);
      const { content, finalUrl, status, fileFormat: downloadedFormat } =
        await downloadDocumentFile(
          client,
          fileUrlResponse.resourcePath,
          canonicalUrl,
        );
      if (status >= 400) {
        throw new Error(`Document download failed: HTTP ${status}`);
      }

      const effectiveFormat = downloadedFormat;

      const title = docMeta.title ?? summary.name;
      const scrapedAt = new Date().toISOString();
      const outputPath = soapDocPath(summary.name, docVersion, effectiveFormat);

      if (effectiveFormat === "PDF") {
        await writeFile(outputPath, content as Buffer);
      } else {
        const html = content as string;
        const markdown = htmlToMarkdown(html);
        const body =
          buildFrontmatter({
            url: canonicalUrl,
            download_url: finalUrl,
            title,
            source: SOURCE,
            service_id: String(summary.id),
            service_name: summary.name,
            version: version.versionRelease,
            document_id: String(documentId),
            doc_version: docVersion,
            doc_type: docMeta.docType ?? "User guide",
            file_format: "HTML",
            scraped_at: scrapedAt,
          }) + markdown;
        await writeFile(outputPath, body, "utf-8");

        if (index) {
          upsertEntry(index, {
            url: canonicalUrl,
            title,
            path: outputPath,
            excerpt: excerptFromMarkdown(markdown),
            scraped_at: scrapedAt,
          });
        }
      }

      if (index && effectiveFormat === "PDF") {
        upsertEntry(index, {
          url: canonicalUrl,
          title,
          path: outputPath,
          excerpt: `PDF user guide (${docVersion})`,
          scraped_at: scrapedAt,
        });
      }

      const entry: SoapServiceManifestEntry = {
        id: summary.id,
        name: summary.name,
        latestVersion: version.versionRelease,
        documentId,
        path: outputPath,
        status: "ok",
      };
      manifestEntries.push(entry);
      report.succeeded += 1;
      report.results.push({
        serviceId: summary.id,
        serviceName: summary.name,
        version: version.versionRelease,
        documentId,
        url: canonicalUrl,
        path: outputPath,
        status: "ok",
      });

      if ((i + 1) % 10 === 0) {
        console.error(`[soap-docs] ${i + 1}/${limited.length} processed`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const entry: SoapServiceManifestEntry = {
        id: summary.id,
        name: summary.name,
        status: "failed",
        error: message,
      };
      manifestEntries.push(entry);
      report.failed += 1;
      report.results.push({
        serviceId: summary.id,
        serviceName: summary.name,
        status: "failed",
        error: message,
      });
    }
  }

  if (index) {
    await saveIndex(index);
  }

  const manifest: SoapServicesManifest = {
    total: services.length,
    fetched_at: new Date().toISOString(),
    services: manifestEntries,
  };
  report.manifestPath = await saveManifest(manifest);

  return report;
}
