import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  const title = `${dict.faq.title} | MUA Match`;
  return {
    title,
    description: dict.faq.subtitle,
    alternates: {
      canonical: `/${raw}/faq`,
      languages: { en: "/en/faq", nl: "/nl/faq", "x-default": "/en/faq" },
    },
    openGraph: {
      title,
      description: dict.faq.subtitle,
      url: `https://muamatch.com/${raw}/faq`,
      locale: raw === "nl" ? "nl_NL" : "en_US",
      images: [{ url: "https://www.muamatch.com/assets/MM_Social_Sharing_Logo.png" }],
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const base = `/${locale}`;

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />

      <main id="main" className="relative min-h-[60vh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="blob-a absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="blob-c absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-secondary/70 blur-3xl" />
        </div>

        <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <Link
            href={base}
            className="nav-underline inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
            {dict.faq.backToHome}
          </Link>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{dict.faq.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{dict.faq.subtitle}</p>

          <div className="mt-8 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {dict.faq.items.map((item) => (
              <details key={item.q} className="faq group">
                <summary className="tap flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-foreground transition-colors hover:bg-accent/50 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                    strokeWidth={2}
                    aria-hidden
                  />
                </summary>
                <div className="faq-answer px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</div>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-secondary/50 px-6 py-9 text-center shadow-soft">
            <p className="text-lg font-semibold text-foreground">{dict.faq.contactPrompt}</p>
            <Link
              href={`${base}/contact`}
              className="tap mt-4 inline-flex min-h-[48px] touch-manipulation items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              {dict.faq.contactCta}
            </Link>
          </div>
        </section>

        <SiteFooter locale={locale} dict={dict} />
      </main>
    </>
  );
}
