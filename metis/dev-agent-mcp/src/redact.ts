const PATTERNS: [RegExp, string][] = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g, "[PRIVATE_KEY]"],
  [/\b(?:sk|pk|rk)_(?:live|test)_[A-Za-z0-9]{10,}\b/g, "[API_KEY]"],
  [/\bgl(?:pat|ptt)-[A-Za-z0-9_-]{10,}\b/g, "[GITLAB_TOKEN]"],
  [/\bgh[pousr]_[A-Za-z0-9]{20,}\b/g, "[GITHUB_TOKEN]"],
  [/\bAKIA[0-9A-Z]{16}\b/g, "[AWS_KEY]"],
  [/\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/g, "[JWT]"],
  [/\b(?:\d[ -]?){13,19}\b/g, "[NUMBER]"],
  [/((?:password|passwd|secret|token|api[_-]?key)["']?\s*[:=]\s*["']?)[^\s"',;]{6,}/gi, "$1[REDACTED]"],
];

/** Vrai si la ligne contient un secret probable (hors numéros longs, trop de faux positifs dans un diff). */
export function hasSecret(line: string): boolean {
  return PATTERNS.some(([re, sub]) => sub !== "[NUMBER]" && new RegExp(re.source, re.flags.replace("g", "")).test(line));
}

/** Masque secrets, clés et numéros de carte probables dans toute sortie renvoyée à l'agent. */
export function redact(text: string): string {
  return PATTERNS.reduce((acc, [re, sub]) => acc.replace(re, sub), text);
}
