import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import {
  INSTAGRAM_URL,
  TIKTOK_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  asset,
} from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = await getDictionary(raw);
  const title = `${dict.contact.title} | MUA Match`;
  return {
    title,
    description: dict.contact.body,
    alternates: {
      canonical: `/${raw}/contact`,
      languages: { en: "/en/contact", nl: "/nl/contact", "x-default": "/en/contact" },
    },
    openGraph: {
      title,
      description: dict.contact.body,
      url: `https://muamatch.com/${raw}/contact`,
      locale: raw === "nl" ? "nl_NL" : "en_US",
      images: [{ url: "https://www.muamatch.com/assets/MM_Social_Sharing_Logo.png" }],
    },
  };
}

export default async function ContactPage({
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

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Link
            href={base}
            className="nav-underline inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
            {dict.faq.backToHome}
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{dict.contact.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{dict.contact.body}</p>
              <p className="mt-7 space-y-1 text-lg font-semibold">
                <Link href={`mailto:${CONTACT_EMAIL}`} className="block text-primary hover:underline">
                  {CONTACT_EMAIL}
                </Link>
                <Link href={`tel:${CONTACT_PHONE}`} className="block text-foreground hover:text-primary">
                  {CONTACT_PHONE_DISPLAY}
                </Link>
              </p>
              <ul className="mt-8 flex gap-3" aria-label={dict.contact.socialAria}>
                <li>
                  <Link
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap flex rounded-xl border border-border bg-card p-3 shadow-sm hover:bg-accent"
                  >
                    <Image src={asset("iconInstagram_black.svg")} alt="Instagram" width={22} height={22} className="opacity-90" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap flex rounded-xl border border-border bg-card p-3 shadow-sm hover:bg-accent"
                  >
                    <Image src={asset("iconTikTok_black.svg")} alt="TikTok" width={22} height={22} className="opacity-90" />
                  </Link>
                </li>
              </ul>
            </div>

            <ContactForm labels={dict.contactForm} />
          </div>
        </section>

        <SiteFooter locale={locale} dict={dict} />
      </main>
    </>
  );
}
