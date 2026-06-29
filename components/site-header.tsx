import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/types";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { asset, DASHBOARD_URL } from "@/lib/site";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Pick<Dictionary, "nav" | "header" | "localeSwitcher" | "navAria">;
}) {
  const base = `/${locale}`;
  const nav = [
    { href: `${base}#how-it-works`, label: dict.nav.howItWorks },
    { href: `${base}#for-clients`, label: dict.nav.forClients },
    { href: `${base}#for-muas`, label: dict.nav.forMuas },
    { href: `${base}#contact`, label: dict.nav.contact },
  ];

  const actions = [
    { href: DASHBOARD_URL, label: dict.nav.login, variant: "outline" as const, external: true },
    { href: `${base}#download`, label: dict.nav.download, variant: "primary" as const },
  ];

  return (
    <header data-site-header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="relative mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-full h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />

        <Link href={base} className="flex shrink-0 items-center touch-manipulation" aria-label={dict.header.ariaHome}>
          <Image
            src={asset("LogoPink.svg")}
            alt="MUA Match"
            width={132}
            height={87}
            className="h-[42px] w-auto sm:h-[52px]"
            priority
          />
        </Link>

        <nav className="hidden flex-1 justify-center gap-5 lg:flex xl:gap-7" aria-label={dict.navAria}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-underline touch-manipulation text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Desktop CTAs */}
          <Link
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="tap hidden touch-manipulation rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent lg:inline-flex"
          >
            {dict.nav.login}
          </Link>
          <Link
            href={`${base}#download`}
            className="tap hidden touch-manipulation rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 lg:inline-flex"
          >
            {dict.nav.download}
          </Link>

          <LocaleSwitcher locale={locale} ariaLabel={dict.localeSwitcher.label} />
          <ThemeToggle />

          {/* Mobile menu */}
          <MobileNav
            items={nav}
            actions={actions}
            ariaLabel={dict.navAria}
            openLabel={dict.header.openMenu}
            closeLabel={dict.header.closeMenu}
          />
        </div>
      </div>
    </header>
  );
}
