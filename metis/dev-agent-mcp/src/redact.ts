/** Numéro de carte plausible : 13-19 chiffres (séparateurs espace/tiret admis), isolé, et valide au test de Luhn. */
const CARD = /(?<![\w/\\.-])(?:\d[ -]?){12,18}\d(?![\w/\\-])/g;

function luhn(digits: string): boolean {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1 && (d *= 2) > 9) d -= 9;
    sum += d;
  }
  return sum % 10 === 0;
}

const PATTERNS: [RegExp, string][] = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g, "[PRIVATE_KEY]"],
  [/\b(?:sk|pk|rk)_(?:live|test)_[A-Za-z0-9]{10,}\b/g, "[API_KEY]"],
  [/\bgl(?:pat|ptt)-[A-Za-z0-9_-]{10,}\b/g, "[GITLAB_TOKEN]"],
  [/\bgh[pousr]_[A-Za-z0-9]{20,}\b/g, "[GITHUB_TOKEN]"],
  [/\bAKIA[0-9A-Z]{16}\b/g, "[AWS_KEY]"],
  [/\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/g, "[JWT]"],
  [/((?:password|passwd|secret|token|api[_-]?key)["']?\s*[:=]\s*["']?)[^\s"',;]{6,}/gi, "$1[REDACTED]"],
];

/** Vrai si la ligne contient un secret probable (hors numéros de carte, trop de faux positifs dans un diff). */
export function hasSecret(line: string): boolean {
  return PATTERNS.some(([re]) => new RegExp(re.source, re.flags.replace("g", "")).test(line));
}

/** Masque secrets, clés et numéros de carte probables dans toute sortie renvoyée à l'agent. */
export function redact(text: string): string {
  const masked = PATTERNS.reduce((acc, [re, sub]) => acc.replace(re, sub), text);
  // Un horodatage de migration (20261102000000-…) ou un nom de fichier n'est pas une carte : isolé + Luhn valide requis.
  return masked.replace(CARD, (m) => (luhn(m.replace(/[ -]/g, "")) ? "[CARD]" : m));
}
