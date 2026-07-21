export interface ServiceArea {
  id: number;
  name: string;
}

export interface ServiceVersion {
  id: number;
  version: number;
  release: number;
  functionalEnhancements?: string;
  publicationPolicies?: unknown[];
  releaseStatus: string;
  schemaRules?: string[];
  versionRelease: string;
}

export interface ServiceSummary {
  id: number;
  name: string;
  description?: string;
  area?: ServiceArea;
  serviceVersions?: ServiceVersion[];
  transactionType?: string;
  baseFormat?: string;
  format?: string;
  protocol?: string;
  code?: string;
}

export interface ServiceDetail extends ServiceSummary {
  releaseStatus?: string;
  catalogues?: unknown[];
  capacityPlanningValidation?: boolean;
  pdfWinaproachGroups?: Array<{ name: string; code: string }>;
  devWinaproachGroups?: Array<{ name: string; code: string }>;
}

export interface ServicesListResponse {
  data: ServiceSummary[];
  totalNumberOfResults: number;
}

export interface DocumentReference {
  minVersion?: string;
  maxVersion?: string;
  service?: { name: string; id: number };
}

export interface DocumentMetadata {
  id: number;
  title: string;
  isMainpage?: boolean;
  docType?: string;
  fileFormat?: string;
  domain?: string;
  technologies?: string[];
  references?: {
    services?: DocumentReference[];
  };
  source?: { sourceType?: string };
  adaptedForFrameworks?: boolean;
}

export interface DocumentFileUrlResponse {
  resourcePath: string;
}

export interface DocumentListItem {
  id: number;
  title?: string;
  docType?: string;
  isMainpage?: boolean;
  fileFormat?: string;
  references?: {
    services?: DocumentReference[];
  };
}

export interface DocumentsListResponse {
  data: DocumentListItem[];
  totalNumberOfResults: number;
}

export interface SoapServiceManifestEntry {
  id: number;
  name: string;
  latestVersion?: string;
  documentId?: number;
  status: "ok" | "skipped" | "failed" | "pending" | "no_document" | "no_version";
  error?: string;
  path?: string;
}

export interface SoapServicesManifest {
  total: number;
  fetched_at: string;
  services: SoapServiceManifestEntry[];
}

export interface SoapDocsReport {
  source: string;
  discoverOnly: boolean;
  total: number;
  succeeded: number;
  failed: number;
  skipped: number;
  results: Array<{
    serviceId: number;
    serviceName: string;
    version?: string;
    documentId?: number;
    url?: string;
    path?: string;
    error?: string;
    status: SoapServiceManifestEntry["status"];
  }>;
  manifestPath?: string;
}
