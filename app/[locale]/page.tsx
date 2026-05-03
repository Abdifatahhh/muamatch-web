import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

const asset = (path: string) => `https://www.muamatch.com/assets/${path}`;

const PHOTO_QUALITY = 96;
const HERO_W = 3840;
const HERO_H = Math.round((700 / 900) * HERO_W);
const SHOWCASE_W = 1600;
const SHOWCASE_H = Math.round((800 / 600) * SHOWCASE_W);

const showcases = [
  { title: "MUA Diana Velvet", slug: "showcase1" as const },
  { title: "Beauty by Kelly", slug: "showcase2" as const },
  { title: "Jasmine Glow", slug: "showcase3" as const },
];

const APP_STORE =
  "https://apps.apple.com/app/mua-match/id6566187518";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.muamatch.muamatch";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = await getDictionary(locale);

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />

      <main id="main" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl dark:bg-primary/10" />
          <div className="absolute -right-24 top-[40%] h-72 w-72 rounded-full bg-accent blur-3xl dark:opacity-40" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-secondary/80 blur-3xl dark:bg-secondary/30" />
        </div>

        <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{dict.hero.eyebrow}</p>
              <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                {dict.hero.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">{dict.hero.lead}</p>
              <div id="app" className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={APP_STORE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-lg border border-border bg-card p-2 shadow-sm transition-shadow hover:shadow-md"
                >
                  <Image
                    src={asset("apple-store-download-app-icon.svg")}
                    alt={dict.hero.appStoreAlt}
                    width={140}
                    height={42}
                    className="h-[42px] w-auto"
                  />
                </Link>
                <Link
                  href={PLAY_STORE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-lg border border-border bg-card p-2 shadow-sm transition-shadow hover:shadow-md"
                >
                  <Image
                    src={asset("google-play-store-download-app-icon.svg")}
                    alt={dict.hero.playAlt}
                    width={158}
                    height={42}
                    className="h-[42px] w-auto"
                  />
                </Link>
              </div>
              <div className="mt-10 rounded-xl border border-border bg-card/80 px-5 py-4 shadow-sm backdrop-blur-sm dark:bg-card/50">
                <p className="text-sm font-semibold text-foreground">{dict.trust.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dict.trust.platformLead}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border bg-muted shadow-soft">
              <Image
                src={asset("mm.webp")}
                alt=""
                width={HERO_W}
                height={HERO_H}
                className="h-auto w-full object-cover md:hidden"
                sizes="100vw"
                quality={PHOTO_QUALITY}
                priority
              />
              <Image
                src={asset("m-banner1.webp")}
                alt=""
                width={HERO_W}
                height={HERO_H}
                className="hidden h-auto w-full object-cover md:block xl:hidden"
                sizes="(max-width: 1279px) min(94vw, 1600px), 100vw"
                quality={PHOTO_QUALITY}
                priority
              />
              <Image
                src={asset("hero-mua.webp")}
                alt=""
                width={HERO_W}
                height={HERO_H}
                className="hidden h-auto w-full object-cover xl:block"
                sizes="(max-width: 1279px) 100vw, min(54vw, 2000px)"
                quality={PHOTO_QUALITY}
                priority
              />
            </div>
          </div>
        </section>

        <section id="voordelen" className="border-y border-border bg-muted/60 py-16 dark:bg-muted/25">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{dict.features.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{dict.features.subtitle}</p>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
              {dict.features.items.map((label) => (
                <li
                  key={label}
                  className="rounded-lg border border-border bg-card px-4 py-4 text-sm font-medium text-card-foreground shadow-sm"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="hoe-het-werkt" className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{dict.howItWorks.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{dict.howItWorks.subtitle}</p>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {dict.howItWorks.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative rounded-xl border border-border bg-card p-6 pt-8 shadow-sm"
                >
                  <span className="absolute left-6 top-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="artiesten" className="border-t border-border py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{dict.showcase.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{dict.showcase.subtitle}</p>

            <div className="mt-14 space-y-16">
              {showcases.map((block) => (
                <article key={block.slug}>
                  <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-accent-foreground">{block.title}</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                        <Image
                          src={asset(`showcases/${block.slug}/${i}.jpg`)}
                          alt={dict.showcase.portfolioAlt(block.title, i)}
                          width={SHOWCASE_W}
                          height={SHOWCASE_H}
                          className="aspect-[3/4] w-full object-cover"
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, min(30vw, 1200px)"
                          quality={PHOTO_QUALITY}
                        />
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-border bg-muted/40 py-16 dark:bg-muted/20">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{dict.contact.title}</h2>
              <p className="mt-3 text-muted-foreground">{dict.contact.body}</p>
              <p className="mt-6 space-y-1 text-lg font-semibold">
                <Link href="mailto:info@muamatch.com" className="block text-primary hover:underline">
                  info@muamatch.com
                </Link>
                <Link href="tel:+31641881564" className="block text-foreground hover:text-primary">
                  +31 6 41 88 15 64
                </Link>
              </p>
              <ul className="mt-8 flex gap-3" aria-label={dict.contact.socialAria}>
                <li>
                  <Link
                    href="https://www.instagram.com/mua.match/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex rounded-lg border border-border bg-card p-3 shadow-sm transition-colors hover:bg-accent"
                  >
                    <Image src={asset("iconInstagram_black.svg")} alt="Instagram" width={22} height={22} className="opacity-90 dark:invert" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.tiktok.com/@mua.match"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex rounded-lg border border-border bg-card p-3 shadow-sm transition-colors hover:bg-accent"
                  >
                    <Image src={asset("iconTikTok_black.svg")} alt="TikTok" width={22} height={22} className="opacity-90 dark:invert" />
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
