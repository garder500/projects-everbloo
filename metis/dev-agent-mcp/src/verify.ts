import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { CODE_EXTS } from "./config.js";
import { execSummary, summarizeLint } from "./exec.js";
import { resolveInRoot, toRel, walkFiles } from "./fs-utils.js";
import { isTestFile } from "./impact.js";
import { pkgDir, readPkg, relativeToPkg, scriptRisk } from "./pkg.js";

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

/** Commande de test + avertissement éventuel (runner qui ne sait pas cibler des fichiers). */
export function testPlan(repo: string, affectedBy?: string[]): { cmd: string; warning?: string } {
  const rel = pkgDir(repo);
  const pkg = readPkg(rel);
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const r = runner(resolveInRoot(rel));
  if (!pkg.scripts?.test) throw new Error(`Pas de script "test" dans ${repo}`);
  const local = affectedBy?.length ? relativeToPkg(repo, affectedBy) : [];
  if (!local.length) {
    return { cmd: `${r} test`, warning: affectedBy?.length ? "affected_by ne désigne aucun fichier de ce package : suite complète." : undefined };
  }
  const files = local.map((f) => `"${f}"`).join(" ");
  const sep = r.startsWith("yarn") ? "" : "-- ";
  if ("jest" in deps) return { cmd: `${r} test ${sep}--findRelatedTests ${files} --passWithNoTests` };
  if ("vitest" in deps) return { cmd: `${r} test ${sep}related ${files} --run` };
  return { cmd: `${r} test`, warning: "affected_by ignoré : seul jest/vitest sait cibler des fichiers (runner ici : mocha / node --test) → suite complète." };
}

export const testCommand = (repo: string, affectedBy?: string[]): string => testPlan(repo, affectedBy).cmd;

const refuse = (what: string, reason: string) =>
  `${what} NON lancé : ${reason}. Relire le script, puis relancer avec allow_unsafe=true si c'est voulu (ou utiliser run_command).`;

/** Le script `test` est le placeholder npm : rien à exécuter. On liste les tests qui existent et la commande probable. */
function placeholderReport(repo: string, rel: string): string {
  const dir = resolveInRoot(rel);
  const tests = [...walkFiles(dir)].map(toRel).filter(isTestFile);
  const nodeTest = tests.filter((f) => /node:test/.test(fs.readFileSync(resolveInRoot(f), "utf8")));
  const head = `Tests NON lancés : le script "test" de ${repo} est le placeholder npm (« no test specified »), aucun runner configuré.`;
  if (!tests.length) return `${head}\nAucun fichier de test trouvé non plus.`;
  const hint = nodeTest.length
    ? `Ces fichiers utilisent node:test. Commande probable (via run_command, exécute du code du projet) :\n  node --test ${nodeTest.slice(0, 5).map((f) => path.relative(dir, resolveInRoot(f)).split(path.sep).join("/")).join(" ")}  [cwd ${rel}]`
    : "Runner inconnu (pas de node:test détecté) : lire un fichier de test pour le déterminer.";
  return `${head}\n${tests.length} fichier(s) de test existent, dont :\n${tests.slice(0, 8).map((f) => `  ${f}`).join("\n")}\n${hint}`;
}

export function runTests(repo: string, affectedBy: string[] | undefined, maxLines = 40, allowUnsafe = false): string {
  const rel = pkgDir(repo);
  if (/no test specified/i.test(readPkg(rel).scripts?.test ?? "")) return placeholderReport(repo, rel);
  const risk = scriptRisk(readPkg(rel), "test");
  if (risk && !allowUnsafe) return refuse("Tests", risk);
  const plan = testPlan(repo, affectedBy);
  return `${plan.warning ? `⚠ ${plan.warning}\n` : ""}${execSummary(plan.cmd, rel, maxLines, 300_000).text}`;
}

type Step = { cmd?: string; skip?: string };

/** format → lint (ciblé, sans --fix) → typecheck → tests ; un seul verdict. S'arrête à la première étape en échec. */
export function verifyChange(repo: string, maxLines = 25, allowUnsafe = false): string {
  const cwd = pkgDir(repo);
  const dir = resolveInRoot(cwd);
  const pkg = readPkg(cwd);
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const r = runner(dir);
  const files = changedFiles(repo);
  const codeFiles = relativeToPkg(repo, files).filter((f) => CODE_EXTS.has(path.extname(f)) && fs.existsSync(path.join(dir, f)));

  const scriptStep = (name: string): Step => {
    if (!pkg.scripts?.[name]) return { skip: "pas de commande" };
    const risk = scriptRisk(pkg, name);
    return risk && !allowUnsafe ? { skip: `refusé : ${risk}` } : { cmd: `${r} ${name}` };
  };

  const lint: Step =
    "eslint" in deps
      ? codeFiles.length
        ? { cmd: `npx --no-install eslint --no-fix -f unix ${codeFiles.map((f) => `"${f}"`).join(" ")}` }
        : { skip: "aucun fichier de code modifié" }
      : scriptStep("lint");

  const tests: Step = !pkg.scripts?.test
    ? { skip: "pas de commande" }
    : /no test specified/i.test(pkg.scripts.test)
      ? { skip: "script test = placeholder npm, aucun runner configuré" }
      : scriptStep("test");
  if (tests.cmd) tests.cmd = testPlan(repo, files).cmd;

  const steps: [string, Step][] = [
    ["format", scriptStep("format:check")],
    ["lint", lint],
    ["typecheck", pkg.scripts?.typecheck ? scriptStep("typecheck") : fs.existsSync(path.join(dir, "tsconfig.json")) ? { cmd: "npx --no-install tsc --noEmit" } : { skip: "pas de commande" }],
    ["tests", tests],
  ];

  // Toutes les étapes tournent : une dette de lint ne doit pas masquer un échec de typecheck ou de tests.
  const report: string[] = [`${repo}: ${files.length} fichier(s) modifié(s), ${codeFiles.length} de code`];
  const failed: string[] = [];
  const details: string[] = [];
  for (const [name, step] of steps) {
    if (!step.cmd) {
      report.push(`- ${name}: ignoré (${step.skip})`);
      continue;
    }
    const res = execSummary(step.cmd, cwd, maxLines, 300_000, name === "lint" && step.cmd.includes("eslint") ? summarizeLint : undefined);
    report.push(`- ${name}: ${res.ok ? "pass" : "FAIL"}`);
    if (!res.ok) {
      failed.push(name);
      details.push(`── ${name}\n${res.text}`);
    }
  }
  const refused = steps.filter(([, s]) => s.skip?.startsWith("refusé")).map(([n]) => n);
  const verdict = failed.length ? `FAIL (${failed.join(", ")})` : refused.length ? `PASS PARTIEL (non vérifié : ${refused.join(", ")})` : "PASS";
  return [`VERDICT: ${verdict}`, ...report, ...(details.length ? ["", ...details] : [])].join("\n");
}
