import { expect, test } from "bun:test";
import { outline } from "../src/outline.js";
import { redact } from "../src/redact.js";
import { findReferences, readSymbol } from "../src/tools.js";
import { checkAllowed, summarize } from "../src/exec.js";
import { testCommand } from "../src/verify.js";

const SRC = `export function add(a: number, b: number): number {
  return a + b;
}
export const mul = (a: number, b: number) => a * b;
class Svc { run(x: string) { return x; } }
`;

test("outline: signatures sans corps, export et méthodes", () => {
  const items = outline("x.ts", SRC);
  expect(items.map((i) => i.name)).toEqual(["add", "mul", "Svc"]);
  expect(items[0].signature).toBe("export function add(a: number, b: number): number");
  expect(items[1].kind).toBe("function");
  expect(items[2].children?.[0].name).toBe("run");
});

test("redact masque clés et mots de passe", () => {
  expect(redact("password=hunter2hunter2")).toBe("password=[REDACTED]");
  expect(redact("sk_live_abcdefghij1234")).toBe("[API_KEY]");
});

test("read_symbol lit le bloc avec numéros de ligne", () => {
  const out = readSymbol("dev-agent-mcp/src/redact.ts", "redact");
  expect(out).toContain("export function redact");
});

test("find_references refuse un symbole non identifiant", () => {
  expect(() => findReferences("a b")).toThrow();
});

test("summarize garde les erreurs dédupliquées et la fin du log", () => {
  const log = ["ok 1", "Error: boom", "Error: boom", "ok 2", "TS2322: bad type", "done"].join("\n");
  const out = summarize(log);
  expect(out.match(/Error: boom/g)?.length).toBe(1);
  expect(out).toContain("TS2322");
  expect(out).toContain("done");
});

test("checkAllowed bloque binaires et git en écriture", () => {
  expect(() => checkAllowed("rm -rf x")).toThrow();
  expect(() => checkAllowed("git push")).toThrow();
  expect(() => checkAllowed("git status")).not.toThrow();
});

test("testCommand: runner inconnu → suite complète", () => {
  expect(testCommand("dev-agent-mcp", ["src/a.ts"])).toContain("bun run test");
});

test("sortie hors workspace refusée", () => {
  expect(() => readSymbol("../../etc/passwd", "x")).toThrow();
});

test("memory: save, dédup, recall, pitfalls par préfixe, masquage", async () => {
  const fs = await import("node:fs");
  const os = await import("node:os");
  const file = `${os.tmpdir()}/dev-agent-mem-${Date.now()}.json`;
  process.env.DEV_AGENT_MEMORY_FILE = file;
  const { memorySave, memoryRecall, forPath } = await import("../src/memory.js");
  const a = memorySave("Ne jamais retenter un paiement sans clé d'idempotence", "pitfall", "api-dashboard/src/payments");
  expect(memorySave("Ne jamais retenter un paiement sans clé d'idempotence", "pitfall", "api-dashboard/src/payments").id).toBe(a.id);
  memorySave("token=abcdef123456 à ne pas logger", "note");
  expect(memoryRecall("paiement idempotence")[0].id).toBe(a.id);
  expect(forPath("api-dashboard/src/payments/stripe.ts", "pitfall")).toHaveLength(1);
  expect(forPath("api-car/src/x.ts", "pitfall")).toHaveLength(0);
  expect(fs.readFileSync(file, "utf8")).not.toContain("abcdef123456");
  delete process.env.DEV_AGENT_MEMORY_FILE;
  fs.unlinkSync(file);
});

test("risk_zones et plan_check détectent paiement/migration", async () => {
  const { riskZones, planCheck } = await import("../src/risk.js");
  expect(riskZones(["api-dashboard/src/payments/stripe.ts"]).text).toContain("paiement");
  expect(riskZones(["api-car/src/foo.ts"]).text).toContain("Aucune zone");
  const out = planCheck("Modifier api-dashboard/src/payments/stripe.ts et ajouter une migration db/migrations/001.sql");
  expect(out).toContain("À REVOIR");
  expect(out).toContain("idempotence");
  expect(out).toContain("retour arrière");
});

test("impact_analysis: dépendants et tests", async () => {
  const { impactAnalysis } = await import("../src/impact.js");
  const out = impactAnalysis(["dev-agent-mcp/src/redact.ts"]);
  expect(out).toContain("dev-agent-mcp/src/tools.ts");
  expect(out).toContain("dev-agent-mcp/tests/tools.test.ts");
});

test("extras: find_tests_for, dependency_graph, batch_read, hasSecret", async () => {
  const { findTestsFor, batchRead } = await import("../src/extras.js");
  const { dependencyGraph } = await import("../src/impact.js");
  const { hasSecret } = await import("../src/redact.js");
  expect(findTestsFor("redact", "dev-agent-mcp")).toContain("tests/tools.test.ts");
  const g = dependencyGraph("dev-agent-mcp/src/tools.ts");
  expect(g).toContain("dev-agent-mcp/src/redact.ts");
  expect(g).toContain("Aucun cycle");
  expect(batchRead([{ path: "dev-agent-mcp/src/index.ts", start: 1, end: 2 }])).toContain("1\t#!/usr/bin/env bun");
  expect(hasSecret("const token = 'abcdef123456'")).toBe(true);
  expect(hasSecret("const x = 12345678901234")).toBe(false);
});

test("lot 6: garde lecture seule DB, masquage, parseRemote", async () => {
  const { assertReadOnly, maskRow } = await import("../src/db.js");
  const { parseRemote } = await import("../src/gitlab.js");
  expect(assertReadOnly("select * from users;")).toBe("select * from users");
  expect(() => assertReadOnly("delete from users")).toThrow();
  expect(() => assertReadOnly("select 1; drop table users")).toThrow();
  expect(() => assertReadOnly("with x as (select 1) update t set a=1")).toThrow();
  expect(assertReadOnly("select 'update me' as t")).toContain("update me");
  expect(maskRow({ id: 1, password_hash: "x", mail: "a@b.fr" })).toEqual({ id: 1, password_hash: "[MASKED]", mail: "[EMAIL]" });
  expect(parseRemote("git@gitlab.com:GroupeAdnenis/metis-connect/api-dashboard.git")).toEqual({ host: "gitlab.com", project: "GroupeAdnenis/metis-connect/api-dashboard" });
  expect(parseRemote("https://gitlab.com/G/r.git").project).toBe("G/r");
});

test("lot 6: spec_lookup, docs_lookup, changelog_diff, blame_why", async () => {
  const { specLookup, docsLookup, changelogDiff } = await import("../src/docs.js");
  const { blameWhy } = await import("../src/history.js");
  expect(specLookup("dev-agent-mcp/src/redact.ts", "export function redact")).toContain("PATTERNS.reduce");
  expect(docsLookup("zod", "string schema validation", "dev-agent-mcp")).toContain("zod@");
  expect(changelogDiff("typescript", "5.0.0", undefined, "dev-agent-mcp")).toBeString();
  expect(blameWhy("dev-agent-mcp/src/redact.ts", 1)).toBeString(); // fichier commité
});

test("readDbUrl lit DB_URL du .env du repo (src/ inclus), sans le renvoyer en erreur", async () => {
  const fs = await import("node:fs");
  const { ROOT } = await import("../src/config.js");
  const { readDbUrl } = await import("../src/db.js");
  const dir = `${ROOT}/__tmp_dbtest/src`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/.env`, 'OTHER=1\nDB_URL="postgres://u:p@h:5432/d"\n');
  try {
    expect(readDbUrl("__tmp_dbtest")).toBe("postgres://u:p@h:5432/d");
    expect(() => readDbUrl("__tmp_dbtest_absent")).toThrow(/DB_URL introuvable/);
    expect(() => readDbUrl()).toThrow(/repo/);
  } finally {
    fs.rmSync(`${ROOT}/__tmp_dbtest`, { recursive: true, force: true });
  }
});

test("lot 7: parseLcov, scratchpad, budget_report", async () => {
  const { parseLcov } = await import("../src/safety.js");
  const { scratchpad, record, budgetReport } = await import("../src/session.js");
  expect([...(parseLcov("SF:src/a.js\nDA:1,3\nDA:2,0\nDA:5,0\nend_of_record").get("src/a.js") ?? [])]).toEqual([2, 5]);
  scratchpad("k", "v");
  expect(scratchpad("k")).toBe("v");
  expect(scratchpad("k", "")).toContain("supprimé");
  for (let i = 0; i < 3; i++) record("read_symbol", { path: "x.ts" }, 100);
  expect(budgetReport()).toContain("x.ts lu 3 fois");
});

test("lot 7: checkpoint puis rollback (aperçu sans confirm, restauration avec)", async () => {
  const fs = await import("node:fs");
  const os = await import("node:os");
  const { execFileSync } = await import("node:child_process");
  const { ROOT } = await import("../src/config.js");
  process.env.DEV_AGENT_CHECKPOINTS_FILE = `${os.tmpdir()}/dev-agent-cp-${Date.now()}.json`;
  const { checkpoint, rollback } = await import("../src/safety.js");
  const dir = `${ROOT}/__tmp_cp`;
  const g = (...a: string[]) => execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", ...a], { cwd: dir, stdio: "ignore" });
  fs.mkdirSync(dir, { recursive: true });
  try {
    g("init", "-q");
    fs.writeFileSync(`${dir}/a.txt`, "v1");
    g("add", "."); g("commit", "-qm", "init");
    fs.writeFileSync(`${dir}/a.txt`, "v2"); // modif non commitée présente au checkpoint
    checkpoint("__tmp_cp", "avant");
    fs.writeFileSync(`${dir}/a.txt`, "v3");
    expect(rollback("__tmp_cp", "avant")).toContain("Aperçu");
    expect(fs.readFileSync(`${dir}/a.txt`, "utf8")).toBe("v3");
    rollback("__tmp_cp", "avant", true);
    expect(fs.readFileSync(`${dir}/a.txt`, "utf8")).toBe("v2");
    expect(() => rollback("__tmp_cp", "inconnu")).toThrow();
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
    delete process.env.DEV_AGENT_CHECKPOINTS_FILE;
  }
});

test("lot 7: data_model Sequelize (fixture)", async () => {
  const { dataModel } = await import("../src/datamodel.js");
  const out = dataModel("dev-agent-mcp/tests/fixtures/models", "Addresses");
  expect(out).toContain("Addresses");
  expect(out).toContain("belongsTo Profil (fk id_user)");
  expect(out).toContain("id:INTEGER (pk, not null)");
  expect(out).toContain("city:TEXT");
});

test("lot 8: tokenize, find_symbol, read_range_smart, search_semantic, call_graph", async () => {
  const c = await import("../src/codeindex.js");
  expect(c.tokenize("getUserByIdFromDB_cache")).toEqual(["get", "user", "by", "id", "from", "db", "cache"]);
  expect(c.findSymbol("redact", "dev-agent-mcp/src")).toContain("dev-agent-mcp/src/redact.ts");
  expect(c.readRangeSmart("dev-agent-mcp/src/redact.ts", "hasSecret", 1)).toContain("export function hasSecret");
  expect(c.searchSemantic("mask secrets redact output", "dev-agent-mcp/src")).toContain("function redact");
  expect(c.callGraph("redact", "in", 1, "dev-agent-mcp/src")).toContain("→ redact");
  expect(c.callGraph("planCheck", "out", 1, "dev-agent-mcp/src")).toContain("riskZones");
});

test("lot 8: find_similar_code, summarize_file (cache), decision_log, task_context", async () => {
  const c = await import("../src/codeindex.js");
  const sim = c.findSimilarCode("const text = (s) => ({ content: [{ type: 'text', text: truncate(redact(s)) }] });", "dev-agent-mcp/src");
  expect(sim).toContain("dev-agent-mcp/src/");
  const s1 = c.summarizeFile("dev-agent-mcp/src/redact.ts");
  expect(s1).toBe(c.summarizeFile("dev-agent-mcp/src/redact.ts"));
  expect(s1).toContain("+redact");
  const { decisionLog, taskContext } = await import("../src/context.js");
  expect(decisionLog("workflows", "dev-agent-mcp")).toContain("Commits");
  expect(taskContext("dev-agent-mcp")).toContain("branche:");
});

test("correctifs: masquage carte (Luhn) sans casser les noms de migrations", async () => {
  const { redact } = await import("../src/redact.js");
  expect(redact("migrations/20261102000000-add-note.js")).toBe("migrations/20261102000000-add-note.js");
  expect(redact("dev-agent-mcp-log-1793615579256.log")).toContain("1793615579256");
  expect(redact("carte 4111 1111 1111 1111 ok")).toContain("[CARD]");
  expect(redact("id 1234567890123456 fin")).toContain("1234567890123456"); // Luhn invalide
});

test("correctifs: scripts dangereux détectés, node -e refusé, avertissement affected_by", async () => {
  const { scriptRisk } = await import("../src/pkg.js");
  const { checkAllowed } = await import("../src/exec.js");
  const pkg = { scripts: { test: "run-script-os", "test:win32": "npm run sequelize && mocha", sequelize: "npx sequelize-cli db:migrate", lint: "eslint . --fix", typecheck: "tsc --noEmit" } };
  expect(scriptRisk(pkg, "test")).toContain("test");
  expect(scriptRisk(pkg, "lint")).toContain("--fix");
  expect(scriptRisk(pkg, "typecheck")).toBeUndefined();
  expect(() => checkAllowed("node -e 'process.exit(1)'")).toThrow(/arbitraire/);
  expect(() => checkAllowed("node script.js")).not.toThrow();
});

test("correctifs: outline CommonJS (factory de modèle) et exports module.exports", async () => {
  const { outline } = await import("../src/outline.js");
  const fs = await import("node:fs");
  const items = outline("m.js", fs.readFileSync("tests/fixtures/models/addresses.js", "utf8"));
  const cls = items.find((i) => i.name === "Addresses");
  expect(cls?.exported).toBe(true);
  expect(cls?.children?.map((c) => c.name)).toContain("associate");
  const cjs = outline("x.js", "function a(){}\nfunction b(){}\nconst c = 1;\nmodule.exports = { a, d: b };\nexports.c = c;");
  expect(cjs.filter((i) => i.exported).map((i) => i.name).sort()).toEqual(["a", "b", "c"]);
});

test("correctifs: impact_analysis relie un modèle Sequelize à ses utilisateurs, et prévient quand il ne voit rien", async () => {
  const { impactAnalysis } = await import("../src/impact.js");
  const out = impactAnalysis(["dev-agent-mcp/tests/fixtures/models/addresses.js"]);
  expect(out).toContain("dev-agent-mcp/tests/fixtures/services/addresses.service.js");
  expect(impactAnalysis(["dev-agent-mcp/src/index.ts"])).toContain("Ne pas en conclure");
});

test("correctifs: scope fichier, filter entrypoints, find_tests_for par import", async () => {
  const { listEntrypoints, findTestsFor } = await import("../src/extras.js");
  expect(listEntrypoints("dev-agent-mcp/tests/fixtures/models/addresses.js")).toContain("0 point(s)");
  expect(listEntrypoints("dev-agent-mcp/src", "zzz-inexistant")).toContain("0 point(s)");
  expect(findTestsFor("dev-agent-mcp/src/redact.ts", "dev-agent-mcp/tests")).toContain("tools.test.ts"); // import ../src/redact.js
  expect(findTestsFor("dev-agent-mcp/src/memory.ts", "dev-agent-mcp/tests")).toContain("tools.test.ts");
});

test("correctifs: plan_check exige migration + retour arrière pour une colonne", async () => {
  const { planCheck } = await import("../src/risk.js");
  const sans = planCheck("Ajouter une colonne note au modèle. Tests unitaires. Hors périmètre : le front.", ["api-dashboard/src/models/addresses.js"]);
  expect(sans).toContain("sans migration");
  const avec = planCheck("Ajouter une colonne note au modèle via une migration avec undo. Tests unitaires. Hors périmètre : le front.", ["api-dashboard/src/models/addresses.js"]);
  expect(avec).not.toContain("sans migration");
  expect(avec).not.toContain("retour arrière");
});

test("correctifs: decision_log multi-dépôts, task_context sur branche de base, find_references pointé", async () => {
  const { decisionLog, taskContext } = await import("../src/context.js");
  expect(decisionLog("workflows")).toContain("dépôts cherchés");
  expect(taskContext("dev-agent-mcp")).toMatch(/branche: \S+/);
  const { findReferences } = await import("../src/tools.js");
  expect(findReferences("AddressesService.update", "dev-agent-mcp/tests")).toContain("1 occurrence");
});

test("rapport 0.1.1: call_graph entrant = sites d'appel réels de Classe.méthode", async () => {
  const { callGraph } = await import("../src/codeindex.js");
  const out = callGraph("AddressesService.update", "in", 1, "dev-agent-mcp/tests/fixtures");
  expect(out).toContain("save → update");
  expect(out).toContain("addresses.controller.js:6");
  expect(out).not.toContain("rename");
  expect(callGraph("update", "in", 1, "dev-agent-mcp/tests/fixtures")).toContain("rename → update");
});

test("rapport 0.1.1: find_similar_code retrouve un extrait copié d'une longue fonction", async () => {
  const { findSimilarCode } = await import("../src/codeindex.js");
  const snippet = "const pkg = readPkg(rel); const deps = { ...pkg.dependencies, ...pkg.devDependencies }; const r = runner(resolveInRoot(rel));";
  expect(findSimilarCode(snippet, "dev-agent-mcp/src")).toContain("verify.ts");
});

test("rapport 0.1.1: summarize_dir tient dans le budget et signale le reste", async () => {
  const { summarizeDir } = await import("../src/codeindex.js");
  const full = summarizeDir("dev-agent-mcp/src");
  expect(full).toContain("redact.ts (");
  expect(full).not.toContain("[tronqué");
  expect(summarizeDir("dev-agent-mcp/src", 200)).toContain("non listé");
});

test("rapport 0.1.1: memory_save ne duplique pas un fait quasi identique", async () => {
  const fs = await import("node:fs");
  const os = await import("node:os");
  process.env.DEV_AGENT_MEMORY_FILE = `${os.tmpdir()}/dev-agent-mem-dup-${Date.now()}.json`;
  const { memorySaveChecked } = await import("../src/memory.js");
  const a = memorySaveChecked("Toute nouvelle colonne passe par une migration réversible", "pitfall", "api-dashboard/src");
  const b = memorySaveChecked("Toute colonne passe par une migration réversible", "pitfall", "api-dashboard/src/models");
  const c = memorySaveChecked("Ne jamais logguer les numéros de carte", "pitfall", "api-dashboard/src/models");
  expect(a.existing).toBe(false);
  expect(b.existing).toBe(true);
  expect(b.mem.id).toBe(a.mem.id);
  expect(c.existing).toBe(false);
  fs.unlinkSync(process.env.DEV_AGENT_MEMORY_FILE);
  delete process.env.DEV_AGENT_MEMORY_FILE;
});

test("rapport 0.1.1: summarizeLint garde les erreurs avec fichier:ligne et compte les warnings", async () => {
  const { summarizeLint } = await import("../src/exec.js");
  const out = summarizeLint("/x/src/a.js:1:2: 'x' is defined but never used. [Error/no-unused-vars]\n/x/src/b.js:3:4: Unexpected console [Warning/no-console]\n\n2 problems");
  expect(out).toContain("a.js:1:2");
  expect(out).not.toContain("b.js");
  expect(out).toContain("1 erreur(s), 1 warning(s)");
});

test("rapport 0.1.1: signature de classe s'arrête à l'accolade", async () => {
  const { outline } = await import("../src/outline.js");
  const it = outline("m.js", "class A extends B { /** long commentaire */ static x() {} }")[0];
  expect(it.signature).toBe("class A extends B");
});

test("rapport 50ac519: read_symbol Classe.méthode, read_outline non-code et sans doublon de signature", async () => {
  const { readSymbol, readOutline } = await import("../src/tools.js");
  expect(readSymbol("dev-agent-mcp/tests/fixtures/services/addresses.service.js", "AddressesService.update")).toContain("bulkCreate");
  expect(readOutline("dev-agent-mcp/package.json")).toContain("non analysé");
  expect(readOutline("dev-agent-mcp/README.md")).toContain("non analysé");
  const { outline } = await import("../src/outline.js");
  expect(outline("t.ts", "export type Foo = string;")[0].signature).toBe("export type Foo = string;");
});

test("rapport 50ac519: erreurs sans chemin absolu, fixtures ignorées hors scope explicite", async () => {
  const { errorText } = await import("../src/fs-utils.js");
  const { ROOT } = await import("../src/config.js");
  expect(errorText(new Error(`ENOENT: no such file or directory, open '${ROOT}/x/y.js'`))).not.toContain(ROOT);
  const c = await import("../src/codeindex.js");
  expect(c.findSymbol("AddressesController", "dev-agent-mcp")).toContain("Aucun symbole");
  expect(c.findSymbol("AddressesController", "dev-agent-mcp/tests/fixtures")).toContain("addresses.controller.js");
});

test("rapport 50ac519: summarize_dir liste le niveau courant et les sous-dossiers", async () => {
  const { summarizeDir } = await import("../src/codeindex.js");
  const out = summarizeDir("dev-agent-mcp");
  expect(out).toContain("Sous-dossiers");
  expect(out).toContain("src/ (");
});

test("rapport 50ac519: checkAllowed lecture seule git étendue et commandes Windows", async () => {
  const { checkAllowed } = await import("../src/exec.js");
  for (const ok of ["git branch --show-current", "git branch -a", "git stash list", "git remote -v", "git config --get user.name", "git tag -l", "dir", "git log -3"]) expect(() => checkAllowed(ok)).not.toThrow();
  for (const ko of ["git branch -D x", "git stash drop", "git push", "git config user.name x", "git checkout main"]) expect(() => checkAllowed(ko)).toThrow();
});

test("rapport 50ac519: run_tests sur script placeholder, list_entrypoints sans gabarits, risk_zones dédupliqué, search_code plafonné", async () => {
  const fs = await import("node:fs");
  const { ROOT } = await import("../src/config.js");
  const dir = `${ROOT}/__tmp_rt`;
  fs.mkdirSync(`${dir}/tests`, { recursive: true });
  fs.writeFileSync(`${dir}/package.json`, JSON.stringify({ name: "x", scripts: { test: 'echo "Error: no test specified" && exit 1' } }));
  fs.writeFileSync(`${dir}/tests/a.test.js`, "const test = require('node:test');\ntest('a', () => {});\n");
  fs.writeFileSync(`${dir}/routes.js`, "app.get('/vrai', h);\nconst t = `app.post('/${name}', h)`;\n");
  try {
    const { runTests } = await import("../src/verify.js");
    const out = runTests("__tmp_rt", undefined);
    expect(out).toContain("placeholder");
    expect(out).toContain("node --test");
    const { listEntrypoints } = await import("../src/extras.js");
    const eps = listEntrypoints("__tmp_rt");
    expect(eps).toContain("/vrai");
    expect(eps).not.toContain("${name}");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  const { riskZones } = await import("../src/risk.js");
  const rz = riskZones(["src/models/a.js", "api-x/src/models/a.js"]).text;
  expect(rz.match(/models\/a\.js/g)?.length).toBe(1);
  const { searchCode } = await import("../src/tools.js");
  const sc = searchCode("e", "dev-agent-mcp/src", 200);
  expect(sc.length).toBeLessThan(7500);
  expect(sc).toContain("non affiché");
});

test("read_outline descend dans les namespaces des .d.ts", async () => {
  const { outline } = await import("../src/outline.js");
  const items = outline("x.d.ts", "declare namespace A { interface B { x: number } type C = string }");
  expect(items.map((i) => i.name)).toEqual(["A", "B", "C"]);
});
