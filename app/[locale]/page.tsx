import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import {
  Check,
  Star,
  MapPin,
  Sparkles,
  Download,
  BadgeCheck,
  ShieldCheck,
  Images,
  CalendarCheck,
  CalendarDays,
  MessageSquare,
  TrendingUp,
  Eye,
  Inbox,
  ArrowRight,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Reveal, RevealGroup } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { getDictionary } from "@/lib/get-dictionary";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import {
  APP_STORE,
  PLAY_STORE,
  DASHBOARD_SIGNUP_URL,
  STORE_ICONS,
  asset,
} from "@/lib/site";

const PHOTO_QUALITY = 96;

// Hero photo, served locally from /public. Landscape 3:2 lifestyle shot
// (artist + client + app mockup); the frame crops the empty left edge.
const HERO_PHOTO = "/hero.jpg";

// Real app screenshots, served locally from /public/screens.
// Order matches dict.appScreens.screens: Home, Explore, Glam AI, Bookings, Reviews.
const APP_SCREENS = [
  "/screens/home.jpg",
  "/screens/explore.jpg",
  "/screens/glam-ai.jpg",
  "/screens/bookings.jpg",
  "/screens/reviews.jpg",
];

// One strong portrait per featured artist (reused from existing portfolio assets).
const FEATURED_PHOTOS = [
  "showcases/showcase3/2.jpg",
  "showcases/showcase1/1.jpg",
  "showcases/showcase2/1.jpg",
  "showcases/showcase3/1.jpg",
];

// Small round social-proof avatars in the hero.
const HERO_AVATARS = [
  "showcases/showcase3/2.jpg",
  "showcases/showcase1/1.jpg",
  "showcases/showcase2/1.jpg",
  "showcases/showcase3/1.jpg",
];

// Collage behind the "For clients" copy.
const CLIENT_COLLAGE = [
  "showcases/showcase3/2.jpg",
  "showcases/showcase1/1.jpg",
  "showcases/showcase2/1.jpg",
  "showcases/showcase3/1.jpg",
];

const EU_CITIES = [
  "Amsterdam",
  "Rotterdam",
  "Paris",
  "London",
  "Berlin",
  "Milan",
  "Barcelona",
  "Brussels",
  "Antwerp",
  "Vienna",
  "Madrid",
  "Lisbon",
];

const CLIENT_ICONS: ComponentType<{ className?: string; strokeWidth?: number }>[] = [
  ShieldCheck,
  Images,
  CalendarCheck,
  Star,
  MessageSquare,
  Download,
];

const MUA_ICONS: ComponentType<{ className?: string; strokeWidth?: number }>[] = [
  Sparkles,
  Images,
  Inbox,
  CalendarDays,
  MessageSquare,
  TrendingUp,
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
        className="tap inline-flex touch-manipulation rounded-lg hover:opacity-90 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.16))]"
      >
        <Image src={STORE_ICONS.appStore} alt={appStoreAlt} width={140} height={42} className="h-[46px] w-auto" />
      </Link>
      <Link
        href={PLAY_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className="tap inline-flex touch-manipulation rounded-lg hover:opacity-90 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.16))]"
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
        <Star key={i} className="h-4 w-4 fill-[#f7c948] text-[#f7c948]" strokeWidth={0} />
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
  const dash = dict.forMuas.dashboard;
  const earnings = locale === "nl" ? "1.240" : "1,240";

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />

      <main id="main" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="blob-a absolute -left-32 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="blob-b absolute -right-24 top-[38%] h-72 w-72 rounded-full bg-accent blur-3xl" />
          <div className="blob-c absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-secondary/80 blur-3xl" />
        </div>

        {/* HERO */}
        <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-14 lg:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)] lg:gap-16">
            <div className="max-w-xl">
              <span className="hero-rise inline-flex items-center gap-2 rounded-full border border-primary/25 bg-secondary/70 px-4 py-2 text-xs font-semibold text-secondary-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} aria-hidden />
                {dict.hero.badge}
              </span>
              <h1
                className="hero-rise mt-6 text-balance text-[2.6rem] font-bold leading-[1.03] tracking-tight text-foreground sm:text-6xl lg:text-[4.15rem]"
                style={{ animationDelay: "70ms" }}
              >
                {dict.hero.title}
              </h1>
              <p
                className="hero-rise mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl"
                style={{ animationDelay: "140ms" }}
              >
                {dict.hero.lead}
              </p>

              <div className="hero-rise mt-8" id="get-app" style={{ animationDelay: "210ms" }}>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-4 scroll-mt-28">
                  <StoreButtons appStoreAlt={dict.hero.appStoreAlt} playAlt={dict.hero.playAlt} />
                  <div className="hidden items-center gap-2.5 rounded-xl bg-white p-2 pr-3.5 shadow-md ring-1 ring-black/5 lg:flex">
                    <Image src="/qr-get.svg" alt={dict.getApp.qrLabel} width={58} height={58} unoptimized className="h-[58px] w-[58px]" />
                    <span className="max-w-[7rem] text-xs font-semibold leading-snug text-neutral-900">
                      {dict.getApp.qrLabel}
                    </span>
                  </div>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <Download className="h-4 w-4 text-primary" strokeWidth={2} aria-hidden />
                  {dict.hero.freeNote}
                </p>
              </div>

              <div className="hero-rise mt-8 flex items-center gap-3" style={{ animationDelay: "280ms" }}>
                <div className="flex -space-x-2.5">
                  {HERO_AVATARS.map((src) => (
                    <span
                      key={src}
                      className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-background bg-muted"
                    >
                      <Image src={asset(src)} alt="" fill className="object-cover" sizes="36px" />
                    </span>
                  ))}
                </div>
                <div>
                  <Stars />
                  <p className="mt-0.5 text-xs text-muted-foreground">{dict.hero.ratingNote}</p>
                </div>
              </div>
            </div>

            {/* Hero image with floating chips */}
            <div className="hero-img-in relative">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/15 via-secondary/40 to-accent/40 blur-2xl" />
              <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-[2.25rem] bg-muted shadow-soft">
                <Image
                  src={HERO_PHOTO}
                  alt={dict.hero.imageAlt}
                  fill
                  className="object-cover object-[80%_50%]"
                  sizes="(max-width: 1023px) 92vw, 46vw"
                  quality={PHOTO_QUALITY}
                  priority
                />
              </div>

              <div className="chip-float-a absolute -left-3 top-8 flex items-center gap-2 rounded-xl border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur-sm sm:-left-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-primary">
                  <BadgeCheck className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                </span>
                <span className="text-xs font-semibold text-foreground">{dict.hero.chipVerified}</span>
              </div>

              <div className="chip-float-b absolute -left-2 bottom-8 flex items-center gap-2 rounded-xl border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur-sm sm:-left-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-foreground">{dict.hero.chipBooking}</p>
                  <p className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                    <Star className="h-2.5 w-2.5 fill-[#f7c948] text-[#f7c948]" strokeWidth={0} aria-hidden />
                    4.9 · Amsterdam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF + CITY MARQUEE */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal as="p" className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {dict.socialProof.title}
            </Reveal>
            <RevealGroup as="dl" step={80} className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {dict.socialProof.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <CountUp value={stat.value} className="block text-4xl font-bold tracking-tight text-foreground sm:text-5xl" />
                    <span className="mt-2 block text-sm text-muted-foreground">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </RevealGroup>
          </div>
          <div className="marquee mt-10 [--marquee-fade:5rem]" aria-hidden>
            <div className="marquee-track gap-8 text-sm font-semibold text-muted-foreground/70">
              {[...EU_CITIES, ...EU_CITIES].map((city, i) => (
                <span key={`${city}-${i}`} className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary/70" strokeWidth={2} />
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="scroll-mt-24 bg-muted/40 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.howItWorks.title}</h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{dict.howItWorks.subtitle}</p>
            </Reveal>
            <RevealGroup as="ol" className="mt-12 grid gap-5 md:grid-cols-3">
              {dict.howItWorks.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-3xl bg-card p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="block text-5xl font-bold leading-none text-primary/25">{index + 1}</span>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* FOR CLIENTS */}
        <section id="for-clients" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{dict.forClients.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{dict.forClients.title}</h2>
                <p className="mt-4 max-w-xl text-lg text-muted-foreground">{dict.forClients.lead}</p>
                <ul className="mt-7 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                  {dict.forClients.items.map((item, i) => {
                    const Icon = CLIENT_ICONS[i % CLIENT_ICONS.length];
                    return (
                      <li key={item} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                          <Icon className="h-4 w-4" strokeWidth={2.25} />
                        </span>
                        <span className="text-sm font-medium text-card-foreground">{item}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Link
                    href={`${base}#get-app`}
                    className="tap group inline-flex min-h-[54px] touch-manipulation items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-sm hover:opacity-90"
                  >
                    {dict.forClients.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
                  </Link>
                  <span className="text-sm font-medium text-muted-foreground">{dict.forClients.note}</span>
                </div>
              </Reveal>

              <Reveal className="relative">
                <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-secondary/50 to-accent/40 blur-2xl" />
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-muted shadow-sm">
                      <Image src={asset(CLIENT_COLLAGE[0])} alt={dict.forClients.mediaAlt} fill className="object-cover" sizes="(max-width:1023px) 45vw, 22vw" quality={PHOTO_QUALITY} />
                    </div>
                    <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-muted shadow-sm">
                      <Image src={asset(CLIENT_COLLAGE[1])} alt="" fill className="object-cover" sizes="(max-width:1023px) 45vw, 22vw" quality={PHOTO_QUALITY} />
                    </div>
                  </div>
                  <div className="space-y-3 pt-8 sm:space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-muted shadow-sm">
                      <Image src={asset(CLIENT_COLLAGE[2])} alt="" fill className="object-cover" sizes="(max-width:1023px) 45vw, 22vw" quality={PHOTO_QUALITY} />
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-muted shadow-sm">
                      <Image src={asset(CLIENT_COLLAGE[3])} alt="" fill className="object-cover" sizes="(max-width:1023px) 45vw, 22vw" quality={PHOTO_QUALITY} />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  <div className="chip-float-a flex items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2 shadow-lg backdrop-blur-sm">
                    <Stars />
                    <span className="text-xs font-semibold text-foreground">4.9/5</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FOR MUAS */}
        <section id="for-muas" className="scroll-mt-24 bg-secondary/40 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal className="order-2 lg:order-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{dict.forMuas.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{dict.forMuas.title}</h2>
                <p className="mt-4 max-w-xl text-lg text-muted-foreground">{dict.forMuas.lead}</p>
                <ul className="mt-7 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                  {dict.forMuas.items.map((item, i) => {
                    const Icon = MUA_ICONS[i % MUA_ICONS.length];
                    return (
                      <li key={item} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card text-primary shadow-sm">
                          <Icon className="h-4 w-4" strokeWidth={2.25} />
                        </span>
                        <span className="text-sm font-medium text-card-foreground">{item}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-9">
                  <Link
                    href={DASHBOARD_SIGNUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap group inline-flex min-h-[56px] touch-manipulation items-center justify-center gap-2 rounded-full bg-primary px-9 text-base font-semibold text-primary-foreground shadow-md hover:opacity-90"
                  >
                    {dict.forMuas.ctaJoin}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
                  </Link>
                  <p className="mt-3 text-sm font-medium text-muted-foreground">{dict.forMuas.note}</p>
                </div>
              </Reveal>

              {/* Dashboard mock */}
              <Reveal className="relative order-1 lg:order-2">
                <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/15 to-accent/40 blur-2xl" />
                <div className="relative mx-auto max-w-sm rounded-3xl bg-card p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-foreground">{dash.title}</p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 [animation:pulse_2s_ease-in-out_infinite]" />
                      live
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2.5">
                    <div className="rounded-xl border border-border bg-muted/50 p-2.5">
                      <CalendarCheck className="h-4 w-4 text-primary" strokeWidth={2} aria-hidden />
                      <CountUp value="128" className="mt-1.5 block text-lg font-bold leading-none text-foreground" />
                      <span className="mt-1 block text-[10px] text-muted-foreground">{dash.bookingsLabel}</span>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/50 p-2.5">
                      <Star className="h-4 w-4 fill-[#f7c948] text-[#f7c948]" strokeWidth={0} aria-hidden />
                      <CountUp value="4.9" className="mt-1.5 block text-lg font-bold leading-none text-foreground" />
                      <span className="mt-1 block text-[10px] text-muted-foreground">{dash.ratingLabel}</span>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/50 p-2.5">
                      <Eye className="h-4 w-4 text-primary" strokeWidth={2} aria-hidden />
                      <CountUp value="2.4k" className="mt-1.5 block text-lg font-bold leading-none text-foreground" />
                      <span className="mt-1 block text-[10px] text-muted-foreground">{dash.viewsLabel}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-1.5 rounded-xl border border-border bg-muted/40 px-3 pb-3 pt-4">
                    {[45, 70, 52, 84, 62, 92, 74].map((h, i) => (
                      <span
                        key={i}
                        className="w-full rounded-t bg-primary/70 last:bg-primary"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-xl bg-primary/10 px-3.5 py-3">
                    <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
                      <TrendingUp className="h-4 w-4 text-primary" strokeWidth={2.25} aria-hidden />
                      {dash.earningsLabel}
                    </span>
                    <span className="text-base font-bold text-primary">
                      €<CountUp value={earnings} className="inline" />
                    </span>
                  </div>
                </div>

                <div className="chip-float-b absolute -bottom-4 -right-2 flex max-w-[15rem] items-center gap-2.5 rounded-xl border border-border bg-background/95 px-3.5 py-2.5 shadow-lg backdrop-blur-sm sm:-right-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Inbox className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs font-bold text-foreground">{dash.requestTitle}</p>
                    <p className="text-[11px] text-muted-foreground">{dash.requestBody}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FEATURED MAKEUP ARTISTS */}
        <section id="featured" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.featured.title}</h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{dict.featured.subtitle}</p>
            </Reveal>
            <RevealGroup as="ul" step={60} className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {dict.featured.artists.map((artist, i) => (
                <li key={artist.name}>
                  <Link
                    href={`${base}#get-app`}
                    aria-label={`${dict.featured.viewLabel}: ${artist.name}`}
                    className="group block overflow-hidden rounded-3xl bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      <Image
                        src={asset(FEATURED_PHOTOS[i % FEATURED_PHOTOS.length])}
                        alt={dict.featured.photoAlt(artist.name)}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                        sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
                        quality={PHOTO_QUALITY}
                      />
                      <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                        <Star className="h-3.5 w-3.5 fill-[#f7c948] text-[#f7c948]" strokeWidth={0} />
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
            </RevealGroup>
          </div>
        </section>

        {/* APP SCREENSHOTS */}
        <section id="app-screenshots" className="scroll-mt-24 bg-muted/40 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.appScreens.title}</h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{dict.appScreens.subtitle}</p>
            </Reveal>
            <RevealGroup className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-x-8">
              {dict.appScreens.screens.map((screen, i) => (
                <div key={screen.label} className="flex w-[9.5rem] flex-col items-center text-center sm:w-[10.5rem] lg:w-[10.75rem]">
                  <div className="phone-tilt relative aspect-[736/1600] w-full overflow-hidden rounded-[1.6rem] border-[5px] border-foreground/85 bg-foreground/85 shadow-soft sm:rounded-[1.8rem] sm:border-[6px]">
                    <div className="relative h-full w-full overflow-hidden rounded-[1.2rem] bg-card sm:rounded-[1.35rem]">
                      <Image
                        src={APP_SCREENS[i % APP_SCREENS.length]}
                        alt={`MUA Match app: ${screen.label}`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 639px) 45vw, 172px"
                        quality={90}
                      />
                    </div>
                  </div>
                  <p className="mt-3.5 text-sm font-semibold text-foreground">{screen.label}</p>
                  <p className="mt-1 max-w-[180px] text-xs leading-relaxed text-muted-foreground">{screen.caption}</p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.reviews.title}</h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{dict.reviews.subtitle}</p>
            </Reveal>
            <RevealGroup as="ul" className="mt-12 grid gap-6 md:grid-cols-2">
              {dict.reviews.items.map((review) => (
                <li key={review.name} className="flex flex-col rounded-3xl bg-muted/40 p-7 transition hover:-translate-y-1 hover:shadow-md sm:p-8">
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
            </RevealGroup>
          </div>
        </section>

        {/* GET THE APP */}
        <section id="download-app" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-[#1c1315] shadow-soft">
              <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-primary/30 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" aria-hidden />

              <div className="relative grid items-center gap-10 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_auto_auto] lg:gap-14">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                    {dict.getApp.title}
                  </h2>
                  <p className="mt-4 max-w-md text-lg text-white/70">{dict.getApp.lead}</p>
                  <ul className="mt-7 space-y-3">
                    {dict.getApp.bullets.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-white/90">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <StoreButtons appStoreAlt={dict.hero.appStoreAlt} playAlt={dict.hero.playAlt} className="mt-8" />
                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-[#f7c948] text-[#f7c948]" strokeWidth={0} aria-hidden />
                      {dict.getApp.ratingLine}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Download className="h-4 w-4 text-primary" strokeWidth={2} aria-hidden />
                      {dict.getApp.freeLine}
                    </span>
                  </div>
                </div>

                <div className="hidden flex-col items-center gap-3 sm:flex">
                  <div className="rounded-3xl bg-white p-4 shadow-xl">
                    <Image src="/qr-get.svg" alt={dict.getApp.qrLabel} width={150} height={150} unoptimized className="h-[150px] w-[150px]" />
                  </div>
                  <p className="text-sm font-semibold text-white">{dict.getApp.qrLabel}</p>
                  <p className="max-w-[13rem] text-center text-xs leading-relaxed text-white/55">{dict.getApp.qrHint}</p>
                </div>

                <div className="mx-auto w-[170px] sm:w-[190px]">
                  <div className="relative aspect-[736/1600] w-full overflow-hidden rounded-[1.8rem] border-[6px] border-white/15 bg-white/10 shadow-xl">
                    <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] bg-white">
                      <Image
                        src="/screens/explore.jpg"
                        alt={`MUA Match app: ${dict.appScreens.screens[1].label}`}
                        fill
                        className="object-cover object-top"
                        sizes="190px"
                        quality={90}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <SiteFooter locale={locale} dict={dict} />
      </main>
    </>
  );
}
