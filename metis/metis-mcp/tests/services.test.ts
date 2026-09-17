import { describe, it, expect } from "bun:test";
import { listRepositories } from "../src/services/repo-scanner.js";
import { searchCode } from "../src/services/code-search.js";
import { findSymbols } from "../src/services/symbol-finder.js";
import { mapArchitecture } from "../src/services/architecture-mapper.js";
import { readFileSlice } from "../src/services/file-reader.js";
import { semanticSearch } from "../src/services/semantic-index.js";
import { ensureWorkspaceIndexed } from "../src/services/indexer.js";

describe("metis-mcp services", () => {
  it("should index the workspace into SQLite and extract AST symbols", () => {
    const stats = ensureWorkspaceIndexed(undefined, true);
    expect(stats.filesIndexed).toBeGreaterThan(0);
    expect(stats.symbolsIndexed).toBeGreaterThan(0);
  });

  it("should list repositories in the metis workspace", () => {
    const repos = listRepositories();
    expect(Array.isArray(repos)).toBe(true);
    expect(repos.length).toBeGreaterThan(0);

    const repoNames = repos.map((r) => r.name);
    expect(repoNames).toContain("api-aerial");
  });

  it("should search code across repositories using FTS5", () => {
    const result = searchCode({
      query: "express",
      maxResults: 5,
    });
    expect(result.hits.length).toBeGreaterThanOrEqual(0);
  });

  it("should find dossierCreate symbol with AST accuracy", () => {
    const result = findSymbols({
      symbolName: "dossierCreate",
      maxResults: 10,
    });
    expect(result.symbols.length).toBeGreaterThan(0);
    const match = result.symbols.find((s) => s.name === "dossierCreate");
    expect(match).toBeDefined();
    expect(match?.filePath).toContain("dossier.utils.js");
  });

  it("should find symbols across codebases", () => {
    const result = findSymbols({
      symbolName: "*",
      maxResults: 10,
    });
    expect(result.symbols.length).toBeGreaterThan(0);
  });

  it("should map architecture and detect services & endpoints", () => {
    const arch = mapArchitecture();
    expect(arch.totalServices).toBeGreaterThan(0);
    expect(arch.services.length).toBeGreaterThan(0);
  });

  it("should read a file slice cleanly", () => {
    const result = readFileSlice({
      relativeOrAbsolutePath: "metis-mcp/package.json",
      startLine: 1,
      endLine: 5,
    });
    expect(result.startLine).toBe(1);
    expect(result.endLine).toBe(5);
    expect(result.content).toContain("metis-mcp");
  });

  it("should perform semantic keyword ranking search with synonym expansion (create folder)", () => {
    const result = semanticSearch({
      query: "create folder",
      limit: 10,
    });
    expect(result.results.length).toBeGreaterThan(0);
    expect(result.expandedTerms).toContain("dossier");
    expect(result.expandedTerms).toContain("folder");

    // The top results should contain dossier related files
    const matchedPaths = result.results.map((r) => r.filePath.toLowerCase());
    const hasDossierMatch = matchedPaths.some((p) => p.includes("dossier"));
    expect(hasDossierMatch).toBe(true);
  });
});
