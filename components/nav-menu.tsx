"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ArrowRight, Check } from "lucide-react";
import * as React from "react";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/types";
import { DASHBOARD_URL, DASHBOARD_SIGNUP_URL } from "@/lib/site";

const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands",
};

// Remember an explicit language choice so the middleware can route
// prefix-less visits to the right locale.
function rememberLocale(l: Locale) {
  try {
    document.cookie = `NEXT_LOCALE=${l};path=/;max-age=31536000;samesite=lax`;
  } catch {
    /* ignore */
  }
}

export function NavMenu({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Pick<Dictionary, "nav" | "menu" | "localeSwitcher" | "footer" | "navAria">;
}) {
  const [open, setOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const suffix = pathname.replace(/^\/(en|nl)/, "") || "";
  const base = `/${locale}`;

  const clientLinks = [
    { href: `${base}#how-it-works`, label: dict.nav.howItWorks },
    { href: `${base}#for-clients`, label: dict.nav.forClients },
    { href: `${base}#featured`, label: dict.menu.featured },
    { href: `${base}#get-app`, label: dict.menu.downloadApp },
    { href: `${base}/faq`, label: dict.footer.faq },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? dict.menu.close : dict.menu.open}
        onClick={() => setOpen((v) => !v)}
        className="tap inline-flex min-h-[44px] touch-manipulation items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-foreground shadow-sm hover:bg-accent sm:px-5"
      >
        <span className="hidden sm:inline">{dict.menu.label}</span>
        {open ? (
          <X className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
        ) : (
          <Menu className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
        )}
      </button>

      {open ? (
        <nav
          id="site-menu"
          aria-label={dict.navAria}
          className="absolute right-0 top-[calc(100%+0.75rem)] z-[70] max-h-[calc(100vh-6rem)] w-[min(100vw-2rem,21rem)] overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl"
        >
          <p className="text-lg font-bold text-foreground">{dict.menu.forClients}</p>
          <ul className="mt-3 space-y-1">
            <li>
              <Link
                href={DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-2 py-2 text-[15px] font-medium text-primary transition-colors hover:bg-accent"
              >
                {dict.nav.login}
              </Link>
            </li>
            {clientLinks.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-2 py-2 text-[15px] font-medium text-foreground transition-colors hover:bg-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-border pt-4">
            <p className="flex items-center gap-2 px-2 text-sm font-semibold text-muted-foreground">
              <Globe className="h-4 w-4" strokeWidth={2} aria-hidden />
              {dict.localeSwitcher.label}
            </p>
            <ul className="mt-2 space-y-1">
              {locales.map((l) => {
                const active = l === locale;
                return (
                  <li key={l}>
                    <Link
                      href={`/${l}${suffix}`}
                      hrefLang={l}
                      lang={l}
                      prefetch={false}
                      aria-current={active ? "true" : undefined}
                      onClick={() => {
                        rememberLocale(l);
                        setOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-xl px-2 py-2 text-[15px] transition-colors hover:bg-accent ${
                        active ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
                      }`}
                    >
                      {LOCALE_NAMES[l]} ({l.toUpperCase()})
                      {active ? <Check className="h-4 w-4 text-primary" strokeWidth={2.5} aria-hidden /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <Link
              href={DASHBOARD_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-2 py-2 text-[15px] font-bold text-foreground transition-colors hover:bg-accent"
            >
              {dict.menu.forMuas}
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </Link>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
