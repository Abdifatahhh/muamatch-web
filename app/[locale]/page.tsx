import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  Check,
  Star,
  Search,
  UserRound,
  MessageSquare,
  CalendarCheck,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/get-dictionary";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import {
  APP_STORE,
  PLAY_STORE,
  DASHBOARD_URL,
  DASHBOARD_SIGNUP_URL,
  STORE_ICONS,
  INSTAGRAM_URL,
  TIKTOK_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  asset,
} from "@/lib/site";

const PHOTO_QUALITY = 96;
const HERO_W = 3840;
const HERO_H = Math.round((700 / 900) * HERO_W);

// One strong photo per featured artist (reused from existing portfolio assets).
const FEATURED_PHOTOS = [
  "showcases/showcase1/1.jpg",
  "showcases/showcase1/2.jpg",
  "showcases/showcase2/1.jpg",
  "showcases/showcase2/2.jpg",
  "showcases/showcase3/1.jpg",
  "showcases/showcase3/2.jpg",
  "showcases/showcase1/3.jpg",
  "showcases/showcase2/3.jpg",
];

// TODO: drop real app screenshots in here (Search / Profile / Chat / Booking).
// Leave an entry null to show the styled placeholder frame.
const APP_SCREEN_SRC: (string | null)[] = [null, null, null, null];
const APP_SCREEN_ICONS: ReactNode[] = [
  <Search key="s" className="h-8 w-8" strokeWidth={1.5} />,
  <UserRound key="p" className="h-8 w-8" strokeWidth={1.5} />,
  <MessageSquare key="c" className="h-8 w-8" strokeWidth={1.5} />,
  <CalendarCheck key="b" className="h-8 w-8" strokeWidth={1.5} />,
];

function StoreButtons({
  appStoreAlt,
  playAlt,
  className = "",
}: {
  appStoreAlt: string;
  playAlt: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link
        href={APP_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex touch-manipulation rounded-lg transition hover:opacity-90 active:opacity-90 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.16))]"
      >
        <Image src={STORE_ICONS.appStore} alt={appStoreAlt} width={140} height={42} className="h-[46px] w-auto" />
      </Link>
      <Link
        href={PLAY_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex touch-manipulation rounded-lg transition hover:opacity-90 active:opacity-90 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.16))]"
      >
        <Image src={STORE_ICONS.playStore} alt={playAlt} width={158} height={42} className="h-[46px] w-auto" />
      </Link>
    </div>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-primary text-primary" strokeWidth={0} />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict: Dictionary = await getDictionary(locale);
  const base = `/${locale}`;

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />

      <main id="main" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 top-[40%] h-72 w-72 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-secondary/80 blur-3xl" />
        </div>

        {/* HERO */}
        <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
            <div>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                {dict.hero.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{dict.hero.lead}</p>
              <StoreButtons appStoreAlt={dict.hero.appStoreAlt} playAlt={dict.hero.playAlt} className="mt-8" />
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border bg-muted shadow-soft">
              <Image
                src={asset("mm.webp")}
                alt={dict.hero.imageAlt}
                width={HERO_W}
                height={HERO_H}
                className="h-auto w-full object-cover md:hidden"
                sizes="100vw"
                quality={PHOTO_QUALITY}
                priority
              />
              <Image
                src={asset("m-banner1.webp")}
                alt={dict.hero.imageAlt}
                width={HERO_W}
                height={HERO_H}
                className="hidden h-auto w-full object-cover md:block xl:hidden"
                sizes="(max-width: 1279px) min(94vw, 1600px), 100vw"
                quality={PHOTO_QUALITY}
                priority
              />
              <Image
                src={asset("hero-mua.webp")}
                alt={dict.hero.imageAlt}
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

        {/* SOCIAL PROOF */}
        <section className="border-y border-border bg-muted/50 py-12 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {dict.socialProof.title}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {dict.socialProof.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-3xl font-bold tracking-tight text-primary sm:text-4xl">{stat.value}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="scroll-mt-24 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{dict.howItWorks.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{dict.howItWorks.subtitle}</p>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {dict.howItWorks.steps.map((step, index) => (
                <li key={step.title} className="relative rounded-xl border border-border bg-card p-6 pt-8 shadow-sm">
                  <span className="absolute left-6 top-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <Link
                href={`${base}#download`}
                className="inline-flex min-h-[48px] touch-manipulation items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {dict.howItWorks.cta}
              </Link>
            </div>
          </div>
        </section>

        {/* FOR CLIENTS */}
        <section id="for-clients" className="scroll-mt-24 border-t border-border py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{dict.forClients.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{dict.forClients.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{dict.forClients.lead}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2" role="list">
              {dict.forClients.items.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3.5 shadow-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-accent-foreground">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm font-medium text-card-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href={`${base}#download`}
                className="inline-flex min-h-[48px] touch-manipulation items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {dict.forClients.cta}
              </Link>
            </div>
          </div>
        </section>

        {/* FOR MUAS */}
        <section id="for-muas" className="scroll-mt-24 border-t border-border bg-secondary/40 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{dict.forMuas.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{dict.forMuas.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{dict.forMuas.lead}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {dict.forMuas.items.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3.5 shadow-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-accent-foreground">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm font-medium text-card-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={DASHBOARD_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] touch-manipulation items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {dict.forMuas.ctaJoin}
              </Link>
              <Link
                href={DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] touch-manipulation items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                {dict.forMuas.ctaLogin}
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED MAKEUP ARTISTS */}
        <section id="featured" className="scroll-mt-24 border-t border-border py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{dict.featured.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{dict.featured.subtitle}</p>
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4" role="list">
              {dict.featured.artists.map((artist, i) => (
                <li key={artist.name}>
                  <Link
                    href={`${base}#download`}
                    aria-label={`${dict.featured.viewLabel} — ${artist.name}`}
                    className="group block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      <Image
                        src={asset(FEATURED_PHOTOS[i % FEATURED_PHOTOS.length])}
                        alt={dict.featured.photoAlt(artist.name)}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
                        quality={PHOTO_QUALITY}
                      />
                      <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" strokeWidth={0} />
                        {artist.rating}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground">{artist.name}</h3>
                      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                        {artist.location}
                      </p>
                      <p className="mt-1 text-sm text-accent-foreground">{artist.specialty}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* APP SCREENSHOTS */}
        <section id="app-screenshots" className="scroll-mt-24 border-t border-border bg-muted/50 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{dict.appScreens.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{dict.appScreens.subtitle}</p>
            <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {dict.appScreens.screens.map((screen, i) => {
                const src = APP_SCREEN_SRC[i] ?? null;
                return (
                  <div key={screen.label} className="flex flex-col items-center text-center">
                    <div className="relative aspect-[9/19] w-full max-w-[190px] overflow-hidden rounded-[1.75rem] border-[6px] border-foreground/85 bg-foreground/85 shadow-soft">
                      <span className="absolute left-1/2 top-1.5 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-background/40" aria-hidden />
                      <div className="relative h-full w-full overflow-hidden rounded-[1.3rem] bg-gradient-to-b from-secondary to-background">
                        {src ? (
                          <Image src={asset(src)} alt={screen.label} fill className="object-cover" sizes="190px" quality={PHOTO_QUALITY} />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-primary">
                            {APP_SCREEN_ICONS[i]}
                            <span className="text-sm font-semibold text-foreground">{screen.label}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="mt-4 max-w-[200px] text-sm text-muted-foreground">{screen.caption}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="scroll-mt-24 border-t border-border py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{dict.reviews.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{dict.reviews.subtitle}</p>
            <ul className="mt-10 grid gap-5 md:grid-cols-2" role="list">
              {dict.reviews.items.map((review) => (
                <li key={review.name} className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <Stars />
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                      {review.type === "client" ? dict.reviews.clientLabel : dict.reviews.muaLabel}
                    </span>
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">“{review.quote}”</blockquote>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {initials(review.name)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.role}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 border-t border-border bg-muted/50 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{dict.faq.title}</h2>
            <p className="mt-3 text-muted-foreground">{dict.faq.subtitle}</p>
            <div className="mt-8 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
              {dict.faq.items.map((item) => (
                <details key={item.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-foreground transition-colors hover:bg-accent/50 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" strokeWidth={2} aria-hidden />
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* DOWNLOAD APP */}
        <section id="download" className="scroll-mt-24 border-t border-border py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="rounded-2xl border border-border bg-secondary/50 px-6 py-12 text-center shadow-soft sm:px-12">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{dict.downloadApp.title}</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{dict.downloadApp.lead}</p>
              <StoreButtons appStoreAlt={dict.hero.appStoreAlt} playAlt={dict.hero.playAlt} className="mt-8 justify-center" />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-24 border-t border-border bg-muted/40 py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{dict.contact.title}</h2>
              <p className="mt-3 text-muted-foreground">{dict.contact.body}</p>
              <p className="mt-6 space-y-1 text-lg font-semibold">
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
                    className="flex rounded-lg border border-border bg-card p-3 shadow-sm transition-colors hover:bg-accent"
                  >
                    <Image src={asset("iconInstagram_black.svg")} alt="Instagram" width={22} height={22} className="opacity-90" />
                  </Link>
                </li>
                <li>
                  <Link
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex rounded-lg border border-border bg-card p-3 shadow-sm transition-colors hover:bg-accent"
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
