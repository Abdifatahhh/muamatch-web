import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/types";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Pick<
    Dictionary,
    "nav" | "header" | "localeSwitcher" | "navAria"
  >;
}) {
  const base = `/${locale}`;
  const nav = [
    { href: `${base}#app`, label: dict.nav.download },
    { href: `${base}#voordelen`, label: dict.nav.benefits },
    { href: `${base}#hoe-het-werkt`, label: dict.nav.howItWorks },
    { href: `${base}#artiesten`, label: dict.nav.artists },
    { href: `${base}#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="relative mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-full h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />

        <Link href={base} className="flex shrink-0 items-center touch-manipulation" aria-label={dict.header.ariaHome}>
          <Image
            src="https://www.muamatch.com/assets/LogoPink.svg"
            alt="MUA Match"
            width={112}
            height={74}
            className="h-9 w-auto sm:h-11"
            priority
          />
        </Link>

        <nav className="hidden flex-1 justify-center gap-5 lg:flex xl:gap-6" aria-label={dict.navAria}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="touch-manipulation text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <MobileNav
            items={nav}
            ariaLabel={dict.navAria}
            openLabel={dict.header.openMenu}
            closeLabel={dict.header.closeMenu}
          />
          <LocaleSwitcher locale={locale} ariaLabel={dict.localeSwitcher.label} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
