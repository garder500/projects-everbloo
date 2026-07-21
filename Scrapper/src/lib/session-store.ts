import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CookieJar } from "./cookie-jar.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const AUTH_DIR = path.resolve(__dirname, "../../.auth");

export interface AmadeusSessionData {
  cookies: ReturnType<CookieJar["toJSON"]>;
  lid?: string;
  xsrfToken?: string;
  authenticated: boolean;
  savedAt: string;
}

export async function ensureAuthDir(): Promise<void> {
  await mkdir(AUTH_DIR, { recursive: true });
}

export function sessionPath(provider: string): string {
  return path.join(AUTH_DIR, `${provider}.session.json`);
}

export async function loadSession<T>(provider: string): Promise<T | null> {
  try {
    const raw = await readFile(sessionPath(provider), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function saveSession<T>(provider: string, data: T): Promise<void> {
  await ensureAuthDir();
  await writeFile(sessionPath(provider), JSON.stringify(data, null, 2), "utf-8");
}

export async function loadAmadeusSession(): Promise<AmadeusSessionData | null> {
  return loadSession<AmadeusSessionData>("amadeus");
}

export async function saveAmadeusSession(data: AmadeusSessionData): Promise<void> {
  await saveSession("amadeus", data);
}
