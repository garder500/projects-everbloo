import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { execSummary } from "./exec.js";
import { resolveInRoot } from "./fs-utils.js";
import { pkgDir, relativeToPkg } from "./pkg.js";

interface Pkg {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

function readPkg(dir: string): Pkg {
  const p = path.join(dir, "package.json");
  if (!fs.existsSync(p)) throw new Error(`Pas de package.json dans ${dir}`);
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function runner(dir: string): string {
  if (fs.existsSync(path.join(dir, "bun.lock")) || fs.existsSync(path.join(dir, "bun.lockb"))) return "bun run";
  if (fs.existsSync(path.join(dir, "pnpm-lock.yaml"))) return "pnpm run";
  if (fs.existsSync(path.join(dir, "yarn.lock"))) return "yarn";
  return "npm run";
}

/** Fichiers modifiés (non commités) du repo, relatifs à ce repo. */
export function changedFiles(repo: string): string[] {
  const out = execFileSync("git", ["status", "--porcelain", "--untracked-files=no"], { cwd: resolveInRoot(repo), encoding: "utf8" });
  return out.split("\n").filter(Boolean).map((l) => l.slice(3).trim().replace(/^.* -> /, ""));
}

export function testCommand(repo: string, affectedBy?: string[]): string {
  const dir = resolveInRoot(pkgDir(repo));
  const pkg = readPkg(dir);
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const r = runner(dir);
  if (!pkg.scripts?.test) throw new Error(`Pas de script "test" dans ${repo}`);
  const local = affectedBy?.length ? relativeToPkg(repo, affectedBy) : [];
  if (!local.length) return `${r} test`;
  const files = local.map((f) => `"${f}"`).join(" ");
  const sep = r.startsWith("yarn") ? "" : "-- ";
  if ("jest" in deps) return `${r} test ${sep}--findRelatedTests ${files} --passWithNoTests`;
  if ("vitest" in deps) return `${r} test ${sep}related ${files} --run`;
  return `${r} test`; // runner inconnu : suite complète
}

export function runTests(repo: string, affectedBy: string[] | undefined, maxLines = 40): string {
  return execSummary(testCommand(repo, affectedBy), pkgDir(repo), maxLines, 300_000).text;
}

/** lint → typecheck → tests ciblés ; un seul verdict. S'arrête à la première étape en échec. */
export function verifyChange(repo: string, maxLines = 25): string {
  const cwd = pkgDir(repo);
  const dir = resolveInRoot(cwd);
  const pkg = readPkg(dir);
  const r = runner(dir);
  const files = changedFiles(repo);
  const steps: [string, string | undefined][] = [
    ["format", pkg.scripts?.["format:check"] ? `${r} format:check` : undefined],
    ["lint", pkg.scripts?.lint ? `${r} lint` : undefined],
    ["typecheck", pkg.scripts?.typecheck ? `${r} typecheck` : fs.existsSync(path.join(dir, "tsconfig.json")) ? "npx tsc --noEmit" : undefined],
    ["tests", pkg.scripts?.test ? testCommand(repo, files.length ? files : undefined) : undefined],
  ];
  const report: string[] = [`${repo}: ${files.length} fichier(s) modifié(s)`];
  for (const [name, cmd] of steps) {
    if (!cmd) {
      report.push(`- ${name}: ignoré (pas de commande)`);
      continue;
    }
    const res = execSummary(cmd, cwd, maxLines, 300_000);
    report.push(`- ${name}: ${res.ok ? "pass" : "FAIL"}`);
    if (!res.ok) return [`VERDICT: FAIL (${name})`, ...report, "", res.text].join("\n");
  }
  return [`VERDICT: PASS`, ...report].join("\n");
}
