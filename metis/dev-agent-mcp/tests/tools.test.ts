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
  expect(() => findReferences("a.b")).toThrow();
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
