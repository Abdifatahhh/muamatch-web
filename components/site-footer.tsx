import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";
import {
  APP_STORE,
  PLAY_STORE,
  DASHBOARD_URL,
  STORE_ICONS,
  asset,
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
    { href: `${base}#faq`, label: dict.footer.faq },
    { href: `${base}#contact`, label: dict.footer.contact },
    { href: DASHBOARD_URL, label: dict.footer.login, external: true },
  ];

  const legalLinks = [
    { href: `${base}/termsconditions`, label: dict.footer.terms },
    { href: `${base}/privacypolicy`, label: dict.footer.privacy },
    { href: `${base}/cookiemessage`, label: dict.footer.cookiePolicy },
  ];

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div className="max-w-xs">
            <Image
              src={asset("LogoPink.svg")}
              alt="MUA Match"
              width={132}
              height={87}
              className="h-11 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{dict.footer.tagline}</p>
          </div>

          <nav aria-label={dict.footer.quickLinksAria} className="flex flex-col gap-2.5 text-sm">
            {quickLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="w-fit text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label={dict.footer.legalAria} className="flex flex-col gap-2.5 text-sm">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-muted-foreground transition-colors hover:text-foreground"
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
              className="inline-flex w-fit touch-manipulation rounded-lg transition hover:opacity-90 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.16))]"
            >
              <Image src={STORE_ICONS.appStore} alt={dict.hero.appStoreAlt} width={130} height={39} className="h-[39px] w-auto" />
            </Link>
            <Link
              href={PLAY_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit touch-manipulation rounded-lg transition hover:opacity-90 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.16))]"
            >
              <Image src={STORE_ICONS.playStore} alt={dict.hero.playAlt} width={146} height={39} className="h-[39px] w-auto" />
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} MUA Match
        </div>
      </div>
    </footer>
  );
}
