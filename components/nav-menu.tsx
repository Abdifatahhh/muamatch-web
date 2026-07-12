"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Check, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/types";

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

const itemClass =
  "flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:bg-accent";

export function NavMenu({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Pick<Dictionary, "nav" | "menu" | "localeSwitcher" | "footer" | "navAria">;
}) {
  const [open, setOpen] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const suffix = pathname.replace(/^\/(en|nl)/, "") || "";
  const base = `/${locale}`;
  const dark = mounted && resolvedTheme === "dark";

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
          className="absolute right-0 top-[calc(100%+0.75rem)] z-[70] max-h-[calc(100vh-6rem)] w-[min(100vw-2rem,21rem)] overflow-y-auto rounded-3xl border border-border bg-card p-5 shadow-2xl"
        >
          <ul className="mt-1 space-y-0.5">
            <li>
              <Link href={`${base}#get-app`} onClick={() => setOpen(false)} className={itemClass}>
                {dict.menu.downloadApp}
              </Link>
            </li>
            <li>
              <Link href={`${base}/faq`} onClick={() => setOpen(false)} className={itemClass}>
                {dict.menu.help}
              </Link>
            </li>

            {/* Language row: collapsed shows the active locale, expands in place. */}
            <li>
              <button
                type="button"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
                className={itemClass}
              >
                <Globe className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
                <span className="flex-1 text-left">
                  {LOCALE_NAMES[locale]} ({locale.toUpperCase()})
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${langOpen ? "rotate-180" : ""}`}
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
              {langOpen ? (
                <ul className="mt-0.5 space-y-0.5">
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
                          className={`flex items-center justify-between rounded-xl py-2 pl-10 pr-2 text-[15px] transition-colors hover:bg-accent ${
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
              ) : null}
            </li>

            {/* Dark mode row with an inline switch. */}
            <li>
              <button
                type="button"
                role="switch"
                aria-checked={dark}
                onClick={() => setTheme(dark ? "light" : "dark")}
                className={itemClass}
              >
                {dark ? (
                  <Sun className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
                ) : (
                  <Moon className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
                )}
                <span className="flex-1 text-left">{dict.menu.darkMode}</span>
                <span
                  aria-hidden
                  className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${dark ? "bg-primary" : "bg-muted-foreground/25"}`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] ${dark ? "left-[1.125rem]" : "left-0.5"}`}
                  />
                </span>
              </button>
            </li>
          </ul>

        </nav>
      ) : null}
    </div>
  );
}
