import path from "node:path";
import fs from "node:fs";

export interface MetisMcpConfig {
  workspaceRoot: string;
  ignoredFolders: string[];
  maxFileSizeBytes: number;
  textExtensions: Set<string>;
}

export function findDefaultWorkspaceRoot(): string {
  if (process.env.METIS_WORKSPACE_ROOT) {
    const customPath = path.resolve(process.env.METIS_WORKSPACE_ROOT);
    if (fs.existsSync(customPath)) {
      return customPath;
    }
  }

  // Walk up from current working directory or import.meta.dir
  let currentDir = process.cwd();
  for (let i = 0; i < 5; i++) {
    // If we find pixi.toml or devenv.nix or .git or multiple api-* directories
    const pixiPath = path.join(currentDir, "pixi.toml");
    const gitPath = path.join(currentDir, ".git");
    const apiAerialPath = path.join(currentDir, "api-aerial");

    if (fs.existsSync(pixiPath) || fs.existsSync(apiAerialPath) || (fs.existsSync(gitPath) && !currentDir.endsWith("metis-mcp"))) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }

  return process.cwd();
}

export const defaultConfig: MetisMcpConfig = {
  workspaceRoot: findDefaultWorkspaceRoot(),
  ignoredFolders: [
    "node_modules",
    ".git",
    ".pixi",
    ".devenv",
    ".antigravitycli",
    ".dsh-memory",
    ".vscode",
    ".idea",
    "dist",
    "build",
    "target",
    ".turbo",
    ".next",
    ".output",
    "coverage",
    ".cache",
    "tmp",
    "temp",
    ".gradle",
    "vendor",
  ],
  maxFileSizeBytes: 1024 * 1024 * 2, // 2 MB max per searched file
  textExtensions: new Set([
    ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
    ".json", ".jsonc", ".yaml", ".yml", ".toml", ".ini",
    ".md", ".mdx", ".txt", ".html", ".css", ".scss",
    ".py", ".java", ".go", ".rs", ".sql", ".sh", ".bash",
    ".ps1", ".env", ".env.example", ".nix", ".dockerfile"
  ]),
};
