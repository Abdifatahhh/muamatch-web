import { cache } from "react";
import type { Locale } from "./i18n";

const DEFAULT_API_BASE = "https://api.muamatch.com/api/";
const DEFAULT_PUBLIC_CLIENT_TOKEN = "375d98da-deb7-40c5-b87b-a0f22e5d9167";

const FETCH_ATTEMPTS = 4;
const FETCH_TIMEOUT_MS = 12_000;

export type LegalEndpoint =
  | "GetTermsAndConditions"
  | "GetPrivacyPolicy"
  | "GetCookies";

export interface LegalDocument {
  title: string;
  subTitle: string | null;
  html: string;
  metaTitle: string | null;
  metaDescription: string | null;
}

interface ApiLegalResult {
  title?: string | null;
  subTitle?: string | null;
  description1?: string | null;
  description2?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

const OFFICIAL_PATH: Record<LegalEndpoint, string> = {
  GetTermsAndConditions: "/termsconditions",
  GetPrivacyPolicy: "/privacypolicy",
  GetCookies: "/cookiemessage",
};

export function officialLegalUrl(endpoint: LegalEndpoint): string {
  return `https://www.muamatch.com${OFFICIAL_PATH[endpoint]}`;
}

function combineDescriptions(a: string, b: string): string {
  const t1 = a.trim();
  const t2 = b.trim();
  if (!t2) return t1;
  if (!t1) return t2;
  if (t1 === t2) return t1;
  return `${t1}\n${t2}`;
}

async function fetchWithRetries(
  url: string,
  init: RequestInit,
): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt < FETCH_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        ...init,
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.ok) return res;
      lastError = new Error(`HTTP ${res.status}`);
    } catch (e) {
      clearTimeout(timer);
      lastError = e;
    }
    if (attempt < FETCH_ATTEMPTS - 1) {
      await new Promise((r) => setTimeout(r, 250 * 2 ** attempt));
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error(`fetch failed: ${String(lastError)}`);
}

async function loadLegalDocument(
  endpoint: LegalEndpoint,
  locale: Locale,
): Promise<LegalDocument> {
  const lang = locale === "en" ? "2" : "1";
  const base = process.env.MUAMATCH_API_BASE_URL ?? DEFAULT_API_BASE;
  const apiKey =
    process.env.MUAMATCH_API_KEY ?? DEFAULT_PUBLIC_CLIENT_TOKEN;
  const url = `${base}${endpoint}?language=${lang}&api-version=1.0`;
  const res = await fetchWithRetries(url, {
    headers: {
      apikey: apiKey,
      accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (compatible; MUA-Match-Marketing/1.0; +https://muamatch.com)",
    },
    next: { revalidate: 3600 },
  });

  const text = await res.text();
  let json: { result?: ApiLegalResult | null };
  try {
    json = JSON.parse(text) as { result?: ApiLegalResult | null };
  } catch {
    throw new Error(`MUA legal API ${endpoint}: response was not JSON`);
  }

  const r = json.result;
  if (!r) {
    throw new Error(`MUA legal API ${endpoint}: empty result`);
  }

  const html = combineDescriptions(r.description1 ?? "", r.description2 ?? "");

  return {
    title: (r.title ?? "").trim() || "MUA Match",
    subTitle: r.subTitle?.trim() ? r.subTitle.trim() : null,
    html,
    metaTitle: r.metaTitle?.trim() ? r.metaTitle.trim() : null,
    metaDescription: r.metaDescription?.trim()
      ? r.metaDescription.trim()
      : null,
  };
}

export const fetchLegalDocument = cache(loadLegalDocument);
