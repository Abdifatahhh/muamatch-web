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
    // Some legal docs are titled "MUA Match" already; avoid a doubled brand.
    const fullTitle = pageTitle.includes("MUA Match")
      ? pageTitle
      : `${pageTitle} | MUA Match`;
    const description = doc.metaDescription || fullTitle;

    return {
      title: fullTitle,
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
        title: fullTitle,
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
