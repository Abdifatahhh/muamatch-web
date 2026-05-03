import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPageShell } from "@/components/legal-page-shell";
import { legalRouteMetadata } from "@/lib/legal-metadata";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return legalRouteMetadata(raw, "GetTermsAndConditions", "termsconditions");
}

export default async function TermsConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  return <LegalPageShell locale={locale} endpoint="GetTermsAndConditions" />;
}
