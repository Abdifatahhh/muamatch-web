import type { Metadata } from "next";
import { LEGAL_CONTENT, type LegalEndpoint } from "@/lib/legal-content";
import type { Locale } from "@/lib/i18n";

export type LegalPathSegment =
  | "termsconditions"
  | "privacypolicy"
  | "cookiemessage";

export function legalRouteMetadata(
  locale: Locale,
  endpoint: LegalEndpoint,
  segment: LegalPathSegment,
): Metadata {
  const doc = LEGAL_CONTENT[endpoint][locale];
  const fullTitle = `${doc.title} | MUA Match`;
  const description = doc.description || fullTitle;

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
}
