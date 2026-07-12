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
  Receipt,
  Wallet,
  Globe,
  Lock,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AppShowcase } from "@/components/app-showcase";
import { FeaturedArtists } from "@/components/featured-artists";
import { MouseParallax } from "@/components/mouse-parallax";
import { Reveal, RevealGroup } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
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

// Profile photo per artist, order matches dict.featured.artists. Every
// artist has a distinct model and style (served from /public/looks); Kelly
// and Sofia lead with their finished looks.
const PROFILE_PHOTOS = [
  "/looks/lena.jpg", // Lena: blonde, natural glow
  "/looks/glam.jpg", // Kelly: glam look
  "/looks/diana.jpg", // Diana: curly updo portrait
  "/looks/branding.jpg", // Sofia: clean beauty shot
  "/looks/amira.jpg", // Amira: warm soft glam
  "/looks/noor.jpg", // Noor: sleek editorial
];

// Hover shot per artist: a finished look for Lena and Diana, an on-set /
// studio shot for Kelly and Sofia (their profile already shows the look),
// a soft lips close-up for Amira and an editorial beauty shot for Noor, so
// every artist in the rotation has two photos.
const PORTFOLIO_SHOTS = [
  "/looks/natural.jpg",
  "/looks/kelly-studio.jpg",
  "/looks/bridal.jpg",
  "/looks/sofia-shoot.jpg",
  asset("showcases/showcase1/3.jpg"), // Amira: soft nude lips close-up
  "/looks/noor-look.jpg", // Noor: editorial beauty shot
];

// Small round social-proof avatars in the hero.
const HERO_AVATARS = [
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

// Order matches dict.whyUs.items: verified, pricing, secure, no hidden fees, chat, reviews.
const WHY_ICONS: ComponentType<{ className?: string; strokeWidth?: number }>[] = [
  BadgeCheck,
  Receipt,
  ShieldCheck,
  Wallet,
  MessageSquare,
  Star,
];

// Order matches dict.whyUs.badges: Europe, verified, payments.
const WHY_BADGE_ICONS: ComponentType<{ className?: string; strokeWidth?: number }>[] = [
  Globe,
  BadgeCheck,
  Lock,
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
        className="tap inline-flex touch-manipulation rounded-lg hover:-translate-y-1 hover:opacity-90 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.16))]"
      >
        <Image src={STORE_ICONS.appStore} alt={appStoreAlt} width={140} height={42} className="h-[46px] w-auto" />
      </Link>
      <Link
        href={PLAY_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className="tap inline-flex touch-manipulation rounded-lg hover:-translate-y-1 hover:opacity-90 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.16))]"
      >
        <Image src={STORE_ICONS.playStore} alt={playAlt} width={158} height={42} className="h-[46px] w-auto" />
      </Link>
    </div>
  );
}

// Star row with fractional support: 4.5 renders four full stars and a half.
function Stars({ value = 5, count = 5 }: { value?: number; count?: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative h-4 w-4">
            <Star className="h-4 w-4 fill-muted-foreground/25 text-muted-foreground/25" strokeWidth={0} />
            {fill > 0 && (
              <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="h-4 w-4 fill-[#f7c948] text-[#f7c948]" strokeWidth={0} />
              </span>
            )}
          </span>
        );
      })}
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
        <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 sm:pb-20 sm:pt-12 lg:pt-16">
          {/* Slowly drifting warm glow behind the hero */}
          <div aria-hidden className="hero-radial pointer-events-none absolute -inset-x-40 -top-24 bottom-0 -z-10" />
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
                </div>
                <p className="mt-3 text-sm font-medium text-muted-foreground">{dict.hero.freeNote}</p>
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
              <MouseParallax strength={6}>
                <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/15 via-secondary/40 to-accent/40 blur-2xl" />
                <div className="hero-float">
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
                </div>

                {/* Chips ease in after the photo, then keep floating. */}
                <div className="hero-chip-in absolute -left-3 top-8 sm:-left-5" style={{ animationDelay: "550ms" }}>
                  <div className="chip-float-a flex items-center gap-2 rounded-xl border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur-sm">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-primary">
                      <BadgeCheck className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                    </span>
                    <span className="text-xs font-semibold text-foreground">{dict.hero.chipVerified}</span>
                  </div>
                </div>

                <div className="hero-chip-in absolute -left-2 bottom-8 sm:-left-5" style={{ animationDelay: "720ms" }}>
                  <div className="chip-float-b flex items-center gap-2 rounded-xl border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur-sm">
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
              </MouseParallax>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF + CITY MARQUEE */}
        <section className="py-12 sm:py-16">
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

        {/* WHY CHOOSE US */}
        <section id="why-us" className="relative scroll-mt-24 overflow-hidden bg-muted/40 py-16 sm:py-24">
          {/* Faint depth: radial tint from the top plus a soft corner glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 opacity-60 [background:radial-gradient(90%_60%_at_50%_0%,var(--secondary),transparent_70%)]" />
            <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.whyUs.title}</h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{dict.whyUs.subtitle}</p>
            </Reveal>
            <MouseParallax strength={5}>
              <RevealGroup as="ul" className="reveal-blur mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {dict.whyUs.items.map((item, i) => {
                  const Icon = WHY_ICONS[i % WHY_ICONS.length];
                  return (
                    // Outer li carries the scroll reveal; the inner card owns the
                    // hover transitions so the reveal rules cannot override them.
                    <li key={item.title}>
                      <SpotlightCard className="feature-card h-full rounded-3xl bg-card p-6 shadow-sm sm:p-8">
                        <span
                          className="feature-icon flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary"
                          style={{ animationDelay: `${i * 450}ms` }}
                        >
                          <Icon className="h-5 w-5" strokeWidth={2} />
                        </span>
                        <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </SpotlightCard>
                    </li>
                  );
                })}
              </RevealGroup>
              <RevealGroup className="reveal-blur mt-10 flex flex-wrap items-center gap-3">
                {dict.whyUs.badges.map((badge, i) => {
                  const Icon = WHY_BADGE_ICONS[i % WHY_BADGE_ICONS.length];
                  return (
                    <span key={badge} className="inline-flex">
                      <span className="trust-chip inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm">
                        <Icon className="h-4 w-4 text-primary" strokeWidth={2} aria-hidden />
                        {badge}
                      </span>
                    </span>
                  );
                })}
              </RevealGroup>
            </MouseParallax>
          </div>
        </section>

        {/* FOR CLIENTS */}
        <section id="for-clients" className="scroll-mt-24 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
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
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden />
                  </Link>
                  <span className="text-sm font-medium text-muted-foreground">{dict.forClients.note}</span>
                </div>
              </Reveal>

              {/* Featured artists, folded into the clients story. Rotates
                  through a larger pool so the grid feels like a live market. */}
              <FeaturedArtists
                artists={dict.featured.artists}
                photos={PROFILE_PHOTOS}
                portfolios={dict.featured.artists.map((_, i) => PORTFOLIO_SHOTS[i] ?? null)}
                alts={dict.featured.artists.map((artist) => dict.featured.photoAlt(artist.name))}
                viewLabel={dict.featured.viewLabel}
                verifiedLabel={dict.featured.verifiedLabel}
                href={`${base}#get-app`}
              />
            </div>
          </div>
        </section>

        {/* FOR MUAS */}
        <section id="for-muas" className="scroll-mt-24 bg-secondary/40 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
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
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden />
                  </Link>
                  <p className="mt-3 text-sm font-medium text-muted-foreground">{dict.forMuas.note}</p>
                </div>
              </Reveal>

              {/* Dashboard mock */}
              <Reveal className="relative order-1 lg:order-2">
                <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10">
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/15 to-accent/40 blur-2xl" />
                  <div className="absolute inset-0 opacity-60 [background:radial-gradient(70%_60%_at_50%_40%,var(--secondary),transparent_72%)]" />
                </div>
                <MouseParallax strength={4}>
                <div className="relative mx-auto max-w-sm rounded-3xl bg-card p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-foreground">{dash.title}</p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
                      <span className="relative flex h-1.5 w-1.5" aria-hidden>
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50 [animation-duration:2.4s]" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 [animation:pulse_2s_ease-in-out_infinite]" />
                      </span>
                      live
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2.5">
                    <div className="dash-tile rounded-xl border border-border bg-muted/50 p-2.5">
                      <CalendarCheck className="h-4 w-4 text-primary" strokeWidth={2} aria-hidden />
                      <CountUp value="128" className="mt-1.5 block text-lg font-bold leading-none text-foreground" />
                      <span className="mt-1 block text-[10px] text-muted-foreground">{dash.bookingsLabel}</span>
                    </div>
                    <div className="dash-tile rounded-xl border border-border bg-muted/50 p-2.5">
                      <Star className="h-4 w-4 fill-[#f7c948] text-[#f7c948]" strokeWidth={0} aria-hidden />
                      <CountUp value="4.9" className="mt-1.5 block text-lg font-bold leading-none text-foreground" />
                      <span className="mt-1 block text-[10px] text-muted-foreground">{dash.ratingLabel}</span>
                    </div>
                    <div className="dash-tile rounded-xl border border-border bg-muted/50 p-2.5">
                      <Eye className="h-4 w-4 text-primary" strokeWidth={2} aria-hidden />
                      <CountUp value="2.4k" className="mt-1.5 block text-lg font-bold leading-none text-foreground" />
                      <span className="mt-1 block text-[10px] text-muted-foreground">{dash.viewsLabel}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-1.5 rounded-xl border border-border bg-muted/40 px-3 pb-3 pt-4">
                    {[45, 70, 52, 84, 62, 92, 74].map((h, i) => (
                      <span
                        key={i}
                        className="bar-rise w-full rounded-t bg-primary/70 last:bg-primary"
                        style={{ height: `${h}px`, transitionDelay: `${120 + i * 90}ms` }}
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

                {/* Slides in after the dashboard reveals, then keeps floating. */}
                <div className="dash-chip absolute -bottom-4 right-0 max-w-[15rem] sm:-right-4">
                  <div className="chip-float-b flex items-center gap-2.5 rounded-xl border border-border bg-background/95 px-3.5 py-2.5 shadow-lg backdrop-blur-sm">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Inbox className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                    </span>
                    <div className="leading-tight">
                      <p className="text-xs font-bold text-foreground">{dash.requestTitle}</p>
                      <p className="text-[11px] text-muted-foreground">{dash.requestBody}</p>
                    </div>
                  </div>
                </div>
                </MouseParallax>
              </Reveal>
            </div>
          </div>
        </section>

        {/* APP SHOWCASE */}
        <section id="app-screenshots" className="scroll-mt-24 overflow-hidden bg-muted/40 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
              <Reveal className="relative isolate">
                {/* Soft shape behind the copy so the column reads as its own layer */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-20 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-secondary/60 blur-3xl"
                />

                <h2 className="text-balance text-4xl font-bold leading-[1.06] tracking-tight sm:text-[2.75rem] lg:text-[3.25rem]">
                  {dict.appScreens.title}
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  {dict.appScreens.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Link
                    href={`${base}#get-app`}
                    className="tap group inline-flex min-h-[54px] touch-manipulation items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-sm hover:opacity-90"
                  >
                    {dict.appScreens.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden />
                  </Link>
                  <span className="text-sm font-medium text-muted-foreground">{dict.hero.freeNote}</span>
                </div>
              </Reveal>
              <Reveal className="min-w-0">
                <AppShowcase screens={dict.appScreens.screens} sources={APP_SCREENS} float={dict.appScreens.float} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="scroll-mt-24 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.reviews.title}</h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{dict.reviews.subtitle}</p>
            </Reveal>
            <RevealGroup as="ul" step={90} className="reveal-blur mt-10 grid gap-6 md:grid-cols-2">
              {dict.reviews.items.map((review) => (
                // Outer li carries the scroll reveal; the inner card owns the
                // hover transitions so the reveal rules cannot override them.
                <li key={review.name}>
                  <div className="review-card flex h-full flex-col rounded-3xl bg-muted/40 p-7 sm:p-8">
                    <div className="flex items-center justify-between">
                      <Stars value={review.stars} />
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
                  </div>
                </li>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* GET THE APP */}
        <section id="download-app" className="scroll-mt-24 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-[#1c1315] shadow-soft">
              <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-primary/30 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" aria-hidden />
              {/* Slow drifting warm glow across the dark card */}
              <div className="cta-drift pointer-events-none absolute inset-0" aria-hidden />

              <div className="relative grid items-center gap-10 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_auto_auto] lg:gap-14">
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
                    <span>{dict.getApp.freeLine}</span>
                  </div>
                </div>

                <div className="hidden flex-col items-center gap-3 sm:flex">
                  <div className="rounded-3xl bg-white p-4 shadow-xl transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(255,255,255,0.35)]">
                    <Image src="/qr-get.svg" alt={dict.getApp.qrLabel} width={168} height={168} unoptimized className="h-[168px] w-[168px]" />
                  </div>
                  <p className="text-sm font-semibold text-white">{dict.getApp.qrLabel}</p>
                  <p className="max-w-[13rem] text-center text-xs leading-relaxed text-white/55">{dict.getApp.qrHint}</p>
                </div>

                <div className="float-soft mx-auto w-[170px] sm:w-[190px]">
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
