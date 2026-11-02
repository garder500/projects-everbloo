import { execFileSync } from "node:child_process";
import { resolveInRoot } from "./fs-utils.js";
import { redact } from "./redact.js";
import { summarize } from "./exec.js";

/** `git@gitlab.com:Groupe/sub/repo.git` ou `https://gitlab.com/Groupe/sub/repo.git` → `Groupe/sub/repo`. */
export function parseRemote(url: string): { host: string; project: string } {
  const m = /^(?:git@|https?:\/\/(?:[^@/]+@)?)([^:/]+)[:/](.+?)(?:\.git)?$/.exec(url.trim());
  if (!m) throw new Error(`Remote non reconnu : ${url}`);
  return { host: m[1], project: m[2] };
}

const git = (repo: string, ...args: string[]) => execFileSync("git", args, { cwd: resolveInRoot(repo), encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

async function api<T>(repo: string, route: (projectId: string) => string, raw = false): Promise<T> {
  const token = process.env.GITLAB_TOKEN;
  if (!token) throw new Error("GITLAB_TOKEN non défini (token read_api à fournir dans la config du MCP).");
  const { host, project } = parseRemote(git(repo, "remote", "get-url", "origin"));
  const base = process.env.GITLAB_URL ?? `https://${host}`;
  const res = await fetch(`${base}/api/v4/projects/${encodeURIComponent(project)}${route(encodeURIComponent(project))}`, { headers: { "PRIVATE-TOKEN": token } });
  if (!res.ok) throw new Error(`GitLab ${res.status} ${res.statusText}`);
  return (raw ? await res.text() : await res.json()) as T;
}

interface Note { body: string; resolvable?: boolean; resolved?: boolean; author?: { username: string }; position?: { new_path?: string; new_line?: number } }

/** Description, discussions non résolues et état CI d'une MR. */
export async function mrContext(repo: string, iid: number): Promise<string> {
  const mr = await api<{ title: string; state: string; source_branch: string; target_branch: string; description: string; head_pipeline?: { id: number; status: string } }>(repo, () => `/merge_requests/${iid}`);
  const discussions = await api<{ notes: Note[] }[]>(repo, () => `/merge_requests/${iid}/discussions?per_page=100`);
  const open = discussions.flatMap((d) => d.notes.filter((n) => n.resolvable && !n.resolved).slice(0, 1));
  return redact(
    [
      `!${iid} ${mr.title} [${mr.state}] ${mr.source_branch} → ${mr.target_branch}`,
      `CI: ${mr.head_pipeline ? `pipeline ${mr.head_pipeline.id} ${mr.head_pipeline.status}` : "aucune"}`,
      `Description:\n${(mr.description ?? "").slice(0, 1200)}`,
      `Discussions non résolues (${open.length}):`,
      ...open.slice(0, 15).map((n) => `- ${n.author?.username ?? "?"} ${n.position?.new_path ? `${n.position.new_path}:${n.position.new_line ?? ""}` : ""}: ${n.body.replace(/\s+/g, " ").slice(0, 300)}`),
    ].join("\n"),
  );
}

/** Seulement les jobs en échec d'un pipeline (défaut : dernier de la branche courante), avec l'essentiel du log. */
export async function ciFailures(repo: string, pipelineId?: number): Promise<string> {
  let id = pipelineId;
  if (!id) {
    const branch = git(repo, "branch", "--show-current");
    const list = await api<{ id: number }[]>(repo, () => `/pipelines?ref=${encodeURIComponent(branch)}&per_page=1`);
    id = list[0]?.id;
    if (!id) return `Aucun pipeline pour la branche ${branch}.`;
  }
  const jobs = await api<{ id: number; name: string; stage: string; status: string }[]>(repo, () => `/pipelines/${id}/jobs?scope[]=failed&per_page=20`);
  if (!jobs.length) return `Pipeline ${id} : aucun job en échec.`;
  const parts: string[] = [];
  for (const j of jobs.slice(0, 5)) {
    const trace = await api<string>(repo, () => `/jobs/${j.id}/trace`, true);
    parts.push(`── ${j.stage}/${j.name} (job ${j.id})\n${summarize(trace.slice(-20_000), 15)}`);
  }
  return redact([`Pipeline ${id} : ${jobs.length} job(s) en échec`, ...parts].join("\n"));
}
