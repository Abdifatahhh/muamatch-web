import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/reveal";
import {
  APP_STORE,
  PLAY_STORE,
  DASHBOARD_URL,
  STORE_ICONS,
} from "@/lib/site";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const base = `/${locale}`;

  const quickLinks = [
    { href: `${base}/faq`, label: dict.footer.faq },
    { href: `${base}/contact`, label: dict.footer.contact },
    { href: DASHBOARD_URL, label: dict.footer.login, external: true },
  ];

  const legalLinks = [
    { href: `${base}/termsconditions`, label: dict.footer.terms },
    { href: `${base}/privacypolicy`, label: dict.footer.privacy },
    { href: `${base}/cookiemessage`, label: dict.footer.cookiePolicy },
  ];

  return (
    <footer className="border-t border-border bg-muted/40">
      {/* Fades in softly once the footer scrolls into view. */}
      <Reveal className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div className="max-w-xs">
            <Logo iconClassName="h-9 w-9" textClassName="text-sm" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{dict.footer.tagline}</p>
          </div>

          <nav aria-label={dict.footer.quickLinksAria} className="flex flex-col gap-2.5 text-sm max-sm:gap-0">
            {quickLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex w-fit items-center text-muted-foreground transition-[color,transform] duration-200 hover:translate-x-1 hover:text-primary max-sm:min-h-[44px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label={dict.footer.legalAria} className="flex flex-col gap-2.5 text-sm max-sm:gap-0">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex w-fit items-center text-muted-foreground transition-[color,transform] duration-200 hover:translate-x-1 hover:text-primary max-sm:min-h-[44px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-row gap-3 sm:flex-col">
            <Link
              href={APP_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="tap inline-flex w-fit touch-manipulation items-center rounded-lg hover:-translate-y-1 hover:opacity-90 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.16))] max-sm:min-h-[44px]"
            >
              <Image src={STORE_ICONS.appStore} alt={dict.hero.appStoreAlt} width={130} height={39} className="h-[39px] w-auto" />
            </Link>
            <Link
              href={PLAY_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="tap inline-flex w-fit touch-manipulation items-center rounded-lg hover:-translate-y-1 hover:opacity-90 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.16))] max-sm:min-h-[44px]"
            >
              <Image src={STORE_ICONS.playStore} alt={dict.hero.playAlt} width={146} height={39} className="h-[39px] w-auto" />
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} MUA Match
        </div>
      </Reveal>
    </footer>
  );
}
