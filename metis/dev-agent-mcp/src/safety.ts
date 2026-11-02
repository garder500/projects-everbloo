import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { ROOT } from "./config.js";
import { addedLines } from "./extras.js";
import { resolveInRoot, toRel, walkFiles } from "./fs-utils.js";
import { pkgDir } from "./pkg.js";

const git = (repo: string, ...args: string[]) => execFileSync("git", args, { cwd: resolveInRoot(repo), encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

/* ── Checkpoint / rollback (git, sans toucher au worktree à la création) ── */

const cpFile = () => process.env.DEV_AGENT_CHECKPOINTS_FILE ?? path.join(ROOT, ".dev-agent", "checkpoints.json");
type Checkpoints = Record<string, { name: string; commit: string; head: string; at: string }>;
const loadCp = (): Checkpoints => {
  try {
    return JSON.parse(fs.readFileSync(cpFile(), "utf8"));
  } catch {
    return {};
  }
};

/** Instantané des fichiers SUIVIS (modifs non commitées incluses). Les fichiers non suivis ne sont pas capturés. */
export function checkpoint(repo: string, name: string): string {
  const head = git(repo, "rev-parse", "HEAD");
  const snap = git(repo, "stash", "create", `dev-agent checkpoint ${name}`) || head; // vide si worktree propre
  const all = loadCp();
  all[`${repo}::${name}`] = { name, commit: snap, head, at: new Date().toISOString() };
  fs.mkdirSync(path.dirname(cpFile()), { recursive: true });
  fs.writeFileSync(cpFile(), JSON.stringify(all, null, 2));
  const untracked = git(repo, "ls-files", "--others", "--exclude-standard").split("\n").filter(Boolean).length;
  return `Checkpoint "${name}" sur ${repo} (${snap.slice(0, 8)}). ${untracked} fichier(s) non suivi(s) NON capturé(s).`;
}

/** Restaure les fichiers suivis à l'état du checkpoint. Écrase tout changement postérieur : confirm=true obligatoire. */
export function rollback(repo: string, name: string, confirm = false): string {
  const cp = loadCp()[`${repo}::${name}`];
  if (!cp) throw new Error(`Checkpoint "${name}" inconnu pour ${repo}.`);
  const changed = git(repo, "diff", "--name-only", cp.commit).split("\n").filter(Boolean);
  const untracked = git(repo, "ls-files", "--others", "--exclude-standard").split("\n").filter(Boolean);
  const preview = `${changed.length} fichier(s) suivi(s) seraient restaurés${changed.length ? `:\n${changed.slice(0, 20).map((f) => `  ${f}`).join("\n")}` : ""}\n${untracked.length} fichier(s) non suivi(s) ne seront pas touchés.`;
  if (!confirm) return `Aperçu (rien modifié). ${preview}\nRelancer avec confirm=true pour appliquer — cela écrase aussi toute modification faite depuis le checkpoint, y compris les tiennes.`;
  if (changed.length) git(repo, "checkout", cp.commit, "--", ...changed);
  return `Rollback appliqué. ${preview}`;
}

/* ── coverage_gaps : lignes ajoutées non couvertes (lcov) ── */

export function parseLcov(lcov: string): Map<string, Set<number>> {
  const uncovered = new Map<string, Set<number>>();
  let file = "";
  for (const l of lcov.split(/\r?\n/)) {
    if (l.startsWith("SF:")) file = l.slice(3).replace(/\\/g, "/");
    else if (l.startsWith("DA:")) {
      const [n, hits] = l.slice(3).split(",").map(Number);
      if (hits === 0) uncovered.set(file, (uncovered.get(file) ?? new Set()).add(n));
    }
  }
  return uncovered;
}

export function coverageGaps(repo: string): string {
  const dir = resolveInRoot(pkgDir(repo));
  const lcovPath = path.join(dir, "coverage", "lcov.info");
  if (!fs.existsSync(lcovPath)) return `Pas de ${toRel(lcovPath)} : lancer les tests avec couverture (lcov) d'abord.`;
  const uncovered = parseLcov(fs.readFileSync(lcovPath, "utf8"));
  const gaps = new Map<string, number[]>();
  for (const [file, n] of addedLines(repo)) {
    const abs = path.resolve(resolveInRoot(repo), file);
    const key = [...uncovered.keys()].find((k) => path.resolve(dir, k) === abs);
    if (key && uncovered.get(key)!.has(n)) gaps.set(file, [...(gaps.get(file) ?? []), n]);
  }
  const age = Math.round((Date.now() - fs.statSync(lcovPath).mtimeMs) / 60000);
  return gaps.size
    ? `Lignes ajoutées non couvertes (couverture générée il y a ${age} min) :\n${[...gaps].map(([f, ns]) => `  ${f}: ${ns.join(", ")}`).join("\n")}`
    : `✓ Aucune ligne ajoutée non couverte (couverture générée il y a ${age} min ; vérifier qu'elle est postérieure à tes changements).`;
}

/* ── api_contract_check : spec/routes tsoa périmées ── */

const commitTime = (repo: string, file: string): number =>
  Number(git(repo, "log", "-1", "--format=%ct", "--", file)) || 0;

/**
 * Si les fichiers générés sont suivis par git : compare les dates de DERNIER COMMIT (fiable après un changement de branche)
 * et signale aussi les sources tsoa modifiées non commitées. Sinon : repli sur les dates de modification (peu fiable).
 */
export function apiContractCheck(repo: string): string {
  const dir = resolveInRoot(pkgDir(repo));
  const cfgPath = path.join(dir, "tsoa.json");
  if (!fs.existsSync(cfgPath)) return `Pas de tsoa.json dans ${toRel(dir)} : rien à vérifier.`;
  const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
  const generated = [path.join(dir, cfg.spec?.outputDirectory ?? "build", "swagger.json"), path.join(dir, cfg.routes?.routesDir ?? "build", "routes.ts")];
  const missing = generated.filter((g) => !fs.existsSync(g));
  if (missing.length) return `✗ Fichiers générés absents : ${missing.map(toRel).join(", ")} — lancer la génération tsoa.`;
  const sources = [...walkFiles(path.join(dir, "tsoa"), new Set([".ts"]))];
  const fmt = (xs: string[]) => xs.slice(0, 10).map((f) => `  ${toRel(f)}`).join("\n") + (xs.length > 10 ? `\n  … ${xs.length - 10} de plus` : "");
  const tracked = generated.every((g) => commitTime(repo, g) > 0);
  const hint = "Régénérer (tsoa spec-and-routes) puis le SDK.";

  if (tracked) {
    const genTime = Math.min(...generated.map((g) => commitTime(repo, g)));
    const newer = sources.filter((f) => commitTime(repo, f) > genTime);
    const dirty = new Set(git(repo, "status", "--porcelain", "--untracked-files=no").split("\n").filter(Boolean).map((l) => path.resolve(resolveInRoot(repo), l.slice(3).trim())));
    const modified = sources.filter((f) => dirty.has(path.resolve(f)));
    const stale = [...new Set([...newer, ...modified])];
    return stale.length
      ? `✗ Spec/routes probablement périmées : ${stale.length} source(s) tsoa commitée(s) après la génération ou modifiée(s) :
${fmt(stale)}
${hint}`
      : "✓ Spec/routes générées à jour par rapport aux sources tsoa (dates de commit + modifs locales).";
  }
  const oldest = Math.min(...generated.map((g) => fs.statSync(g).mtimeMs));
  const stale = sources.filter((f) => fs.statSync(f).mtimeMs > oldest);
  return stale.length
    ? `⚠ Fichiers générés non suivis par git : repli sur les dates de modification (peu fiable après un changement de branche). ${stale.length} source(s) plus récente(s) :
${fmt(stale)}
${hint}`
    : "✓ Spec/routes plus récentes que les sources tsoa (dates de modification, fiabilité limitée).";
}
