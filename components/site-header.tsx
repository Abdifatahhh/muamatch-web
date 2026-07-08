import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/types";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { DASHBOARD_URL } from "@/lib/site";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Pick<Dictionary, "nav" | "menu" | "header" | "localeSwitcher" | "footer" | "navAria">;
}) {
  const base = `/${locale}`;

  return (
    <header data-site-header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="relative mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-full h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />

        <Link href={base} className="flex shrink-0 items-center touch-manipulation" aria-label={dict.header.ariaHome}>
          <Logo />
        </Link>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="tap hidden touch-manipulation rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 sm:inline-flex"
          >
            {dict.nav.login}
          </Link>

          <ThemeToggle />
          {/* Client component: pass a plain-string subset (full dict holds functions). */}
          <NavMenu
            locale={locale}
            dict={{
              nav: dict.nav,
              menu: dict.menu,
              localeSwitcher: dict.localeSwitcher,
              footer: dict.footer,
              navAria: dict.navAria,
            }}
          />
        </div>
      </div>
    </header>
  );
}
