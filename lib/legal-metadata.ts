import type { Metadata } from "next";
import { fetchLegalDocument, type LegalEndpoint } from "@/lib/muamatch-legal-api";
import type { Locale } from "@/lib/i18n";

export type LegalPathSegment =
  | "termsconditions"
  | "privacypolicy"
  | "cookiemessage";

export async function legalRouteMetadata(
  locale: Locale,
  endpoint: LegalEndpoint,
  segment: LegalPathSegment,
): Promise<Metadata> {
  try {
    const doc = await fetchLegalDocument(endpoint, locale);
    const pageTitle = doc.metaTitle || doc.title;
    const description = doc.metaDescription || `${pageTitle} — MUA Match`;

    return {
      title: `${pageTitle} — MUA Match`,
      description,
      alternates: {
        canonical: `/${locale}/${segment}`,
        languages: {
          en: `/en/${segment}`,
          nl: `/nl/${segment}`,
          "x-default": `/en/${segment}`,
        },
      },
      openGraph: {
        title: `${pageTitle} — MUA Match`,
        description,
        url: `https://muamatch.com/${locale}/${segment}`,
        locale: locale === "nl" ? "nl_NL" : "en_US",
        images: [
          { url: "https://www.muamatch.com/assets/MM_Social_Sharing_Logo.png" },
        ],
      },
    };
  } catch {
    return {
      title: "MUA Match",
      description: "MUA Match",
      alternates: {
        canonical: `/${locale}/${segment}`,
        languages: {
          en: `/en/${segment}`,
          nl: `/nl/${segment}`,
          "x-default": `/en/${segment}`,
        },
      },
    };
  }
}
