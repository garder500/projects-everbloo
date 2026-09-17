import fs from "node:fs";
import path from "node:path";
import { defaultConfig } from "../config.js";

export interface RepoInfo {
  name: string;
  relativePath: string;
  absolutePath: string;
  type: "api" | "frontend" | "cli" | "sdk" | "docs" | "config" | "mcp" | "other";
  language: string;
  framework?: string;
  description?: string;
  scripts?: Record<string, string>;
  dependencies?: string[];
  devDependencies?: string[];
  hasOpenApi?: boolean;
  openApiFiles?: string[];
  portsDetected?: number[];
  filesCount?: number;
}

export function listRepositories(workspaceRoot = defaultConfig.workspaceRoot): RepoInfo[] {
  if (!fs.existsSync(workspaceRoot)) {
    return [];
  }

  const entries = fs.readdirSync(workspaceRoot, { withFileTypes: true });
  const repos: RepoInfo[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (defaultConfig.ignoredFolders.includes(entry.name)) continue;

    const dirPath = path.join(workspaceRoot, entry.name);
    const repoInfo = inspectDirectory(entry.name, dirPath, workspaceRoot);
    if (repoInfo) {
      repos.push(repoInfo);
    }
  }

  return repos;
}

function inspectDirectory(name: string, dirPath: string, rootDir: string): RepoInfo | null {
  const pkgJsonPath = path.join(dirPath, "package.json");
  const nestedSrcPkgJsonPath = path.join(dirPath, "src", "package.json");
  
  let pkgData: any = null;
  if (fs.existsSync(pkgJsonPath)) {
    try {
      pkgData = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
    } catch {}
  } else if (fs.existsSync(nestedSrcPkgJsonPath)) {
    try {
      pkgData = JSON.parse(fs.readFileSync(nestedSrcPkgJsonPath, "utf-8"));
    } catch {}
  }

  // Detect type
  let type: RepoInfo["type"] = "other";
  if (name.startsWith("api-") || name.includes("backend") || name.includes("server")) {
    type = "api";
  } else if (name.startsWith("front-") || name.includes("frontend") || name.includes("ui")) {
    type = "frontend";
  } else if (name.includes("cli") || name.includes("tool")) {
    type = "cli";
  } else if (name.includes("sdk") || name.includes("client")) {
    type = "sdk";
  } else if (name.includes("doc") || name.includes("specs")) {
    type = "docs";
  } else if (name.includes("mcp")) {
    type = "mcp";
  }

  // Detect framework & dependencies
  let framework: string | undefined = undefined;
  const deps = pkgData?.dependencies ? Object.keys(pkgData.dependencies) : [];
  const devDeps = pkgData?.devDependencies ? Object.keys(pkgData.devDependencies) : [];
  const allDeps = [...deps, ...devDeps];

  if (allDeps.includes("express")) framework = "Express";
  else if (allDeps.includes("@nestjs/core")) framework = "NestJS";
  else if (allDeps.includes("fastify")) framework = "Fastify";
  else if (allDeps.includes("hono")) framework = "Hono";
  else if (allDeps.includes("next")) framework = "Next.js";
  else if (allDeps.includes("react")) framework = "React";
  else if (allDeps.includes("vue")) framework = "Vue";
  else if (allDeps.includes("svelte")) framework = "Svelte";
  else if (allDeps.includes("@modelcontextprotocol/sdk")) framework = "MCP Server";

  // Check for OpenAPI specs
  const openApiFiles: string[] = [];
  findOpenApiFilesRecursive(dirPath, openApiFiles, 0);

  // Detect ports from scripts or env files or config files
  const portsDetected = detectPorts(dirPath);

  return {
    name,
    relativePath: path.relative(rootDir, dirPath) || name,
    absolutePath: dirPath,
    type,
    language: detectLanguage(dirPath, allDeps),
    framework,
    description: pkgData?.description,
    scripts: pkgData?.scripts,
    dependencies: deps,
    devDependencies: devDeps,
    hasOpenApi: openApiFiles.length > 0,
    openApiFiles: openApiFiles.map((f) => path.relative(dirPath, f)),
    portsDetected,
  };
}

function detectLanguage(dirPath: string, deps: string[]): string {
  if (fs.existsSync(path.join(dirPath, "tsconfig.json")) || deps.includes("typescript")) {
    return "TypeScript";
  }
  if (fs.existsSync(path.join(dirPath, "package.json"))) {
    return "JavaScript";
  }
  if (fs.existsSync(path.join(dirPath, "pyproject.toml")) || fs.existsSync(path.join(dirPath, "requirements.txt"))) {
    return "Python";
  }
  if (fs.existsSync(path.join(dirPath, "pom.xml")) || fs.existsSync(path.join(dirPath, "build.gradle"))) {
    return "Java";
  }
  if (fs.existsSync(path.join(dirPath, "Cargo.toml"))) {
    return "Rust";
  }
  if (fs.existsSync(path.join(dirPath, "go.mod"))) {
    return "Go";
  }
  return "Unknown";
}

function findOpenApiFilesRecursive(dir: string, results: string[], depth: number) {
  if (depth > 4) return;
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (defaultConfig.ignoredFolders.includes(item.name)) continue;
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        findOpenApiFilesRecursive(fullPath, results, depth + 1);
      } else if (
        item.name.toLowerCase().includes("openapi") ||
        item.name.toLowerCase().includes("swagger") ||
        (item.name.endsWith(".yaml") && depth <= 3) ||
        (item.name.endsWith(".json") && item.name.includes("api"))
      ) {
        results.push(fullPath);
      }
    }
  } catch {}
}

function detectPorts(dirPath: string): number[] {
  const ports = new Set<number>();
  try {
    // Check .env, .env.example, package.json
    const envFiles = [".env", ".env.example", ".env.local", ".env.development"];
    for (const envFile of envFiles) {
      const envPath = path.join(dirPath, envFile);
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, "utf-8");
        const matches = content.matchAll(/PORT\s*=\s*(\d{2,5})/gi);
        for (const match of matches) {
          ports.add(parseInt(match[1], 10));
        }
      }
    }
  } catch {}
  return Array.from(ports);
}
