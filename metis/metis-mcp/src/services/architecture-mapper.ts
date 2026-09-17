import fs from "node:fs";
import path from "node:path";
import { defaultConfig } from "../config.js";
import { listRepositories, RepoInfo } from "./repo-scanner.js";

export interface ApiEndpoint {
  method: string;
  path: string;
  summary?: string;
  sourceFile: string;
  sourceType: "openapi" | "code_route";
}

export interface ServiceArchitecture {
  name: string;
  type: string;
  framework?: string;
  ports: number[];
  openApiSpecs: string[];
  endpoints: ApiEndpoint[];
  outboundCallsDetected: string[];
}

export interface ArchitectureMap {
  workspaceRoot: string;
  totalServices: number;
  services: ServiceArchitecture[];
  sharedDependencies: Record<string, string[]>;
}

export function mapArchitecture(options?: { repoFilter?: string[]; workspaceRoot?: string }): ArchitectureMap {
  const rootDir = options?.workspaceRoot || defaultConfig.workspaceRoot;
  const repos = listRepositories(rootDir);
  const filteredRepos = options?.repoFilter?.length
    ? repos.filter((r) => options.repoFilter!.includes(r.name))
    : repos;

  const services: ServiceArchitecture[] = [];
  const dependencyMap: Record<string, string[]> = {};

  for (const repo of filteredRepos) {
    const endpoints: ApiEndpoint[] = [];
    const outboundCalls: Set<string> = new Set();

    // 1. Parse OpenAPI files if present
    if (repo.openApiFiles) {
      for (const relOpenApi of repo.openApiFiles) {
        const fullPath = path.join(repo.absolutePath, relOpenApi);
        const parsed = extractOpenApiEndpoints(fullPath);
        endpoints.push(...parsed);
      }
    }

    // 2. Scan code files for route patterns (Express, Fastify, Hono, etc.)
    scanRoutesInCode(repo.absolutePath, endpoints, outboundCalls);

    // 3. Collect dependencies for sharing analysis
    if (repo.dependencies) {
      for (const dep of repo.dependencies) {
        if (!dependencyMap[dep]) dependencyMap[dep] = [];
        dependencyMap[dep].push(repo.name);
      }
    }

    services.push({
      name: repo.name,
      type: repo.type,
      framework: repo.framework,
      ports: repo.portsDetected || [],
      openApiSpecs: repo.openApiFiles || [],
      endpoints,
      outboundCallsDetected: Array.from(outboundCalls),
    });
  }

  // Filter shared dependencies (present in >= 2 repos)
  const sharedDependencies: Record<string, string[]> = {};
  for (const [dep, repoList] of Object.entries(dependencyMap)) {
    if (repoList.length > 1) {
      sharedDependencies[dep] = repoList;
    }
  }

  return {
    workspaceRoot: rootDir,
    totalServices: services.length,
    services,
    sharedDependencies,
  };
}

function extractOpenApiEndpoints(filePath: string): ApiEndpoint[] {
  const endpoints: ApiEndpoint[] = [];
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    // Simple fast regex parser for OpenAPI paths without heavy external parser
    const lines = content.split(/\r?\n/);
    let inPaths = false;
    let currentPath = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^paths:\s*$/i.test(line.trim())) {
        inPaths = true;
        continue;
      }

      if (inPaths) {
        if (/^[a-zA-Z0-9_-]+:\s*$/.test(line) && !line.startsWith(" ")) {
          // Exited paths section
          break;
        }

        const pathMatch = line.match(/^\s{2}['"]?(\/[^'":]+)['"]?:\s*$/);
        if (pathMatch) {
          currentPath = pathMatch[1];
          continue;
        }

        const methodMatch = line.match(/^\s{4}(get|post|put|delete|patch|options|head):\s*$/i);
        if (methodMatch && currentPath) {
          const method = methodMatch[1].toUpperCase();
          let summary: string | undefined = undefined;

          // Look ahead for summary
          for (let j = i + 1; j < Math.min(lines.length, i + 8); j++) {
            const summaryMatch = lines[j].match(/^\s{6}summary:\s*['"]?(.+?)['"]?\s*$/i);
            if (summaryMatch) {
              summary = summaryMatch[1];
              break;
            }
            if (/^\s{4}[a-z]+:\s*$/i.test(lines[j])) break;
          }

          endpoints.push({
            method,
            path: currentPath,
            summary,
            sourceFile: filePath,
            sourceType: "openapi",
          });
        }
      }
    }
  } catch {}
  return endpoints;
}

function scanRoutesInCode(dirPath: string, endpoints: ApiEndpoint[], outboundCalls: Set<string>, depth = 0) {
  if (depth > 3) return;
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith(".") || defaultConfig.ignoredFolders.includes(entry.name)) continue;
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        scanRoutesInCode(fullPath, endpoints, outboundCalls, depth + 1);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if ([".ts", ".js", ".mjs"].includes(ext)) {
          try {
            const code = fs.readFileSync(fullPath, "utf-8");
            
            // Route definitions: app.get('/...', router.post('/...', etc.
            const routeRegex = /(?:app|router|fastify|server)\.(get|post|put|delete|patch)\s*\(\s*['"`]([^'"`]+)['"`]/gi;
            let match;
            while ((match = routeRegex.exec(code)) !== null) {
              endpoints.push({
                method: match[1].toUpperCase(),
                path: match[2],
                sourceFile: fullPath,
                sourceType: "code_route",
              });
            }

            // Outbound calls: fetch('http...', axios.get('http...
            const callRegex = /(?:fetch|axios\.(?:get|post|put|delete)|got)\s*\(\s*['"`](https?:\/\/[^'"`]+)['"`]/gi;
            let callMatch;
            while ((callMatch = callRegex.exec(code)) !== null) {
              outboundCalls.add(callMatch[1]);
            }
          } catch {}
        }
      }
    }
  } catch {}
}
