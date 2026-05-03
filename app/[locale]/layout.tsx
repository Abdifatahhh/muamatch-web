import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { CookieBanner } from "@/components/cookie-banner";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "nl" }];
}

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = await getDictionary(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", nl: "/nl", "x-default": "/en" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `https://muamatch.com/${locale}`,
      locale: locale === "nl" ? "nl_NL" : "en_US",
      images: [{ url: "https://www.muamatch.com/assets/MM_Social_Sharing_Logo.png" }],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale = raw;
  const dict = await getDictionary(locale);

  return (
    <>
      {children}
      <CookieBanner cookie={dict.cookie} locale={locale} />
    </>
  );
}
