"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

export function LocaleSwitcher({
  locale,
  ariaLabel,
}: {
  locale: Locale;
  ariaLabel: string;
}) {
  const pathname = usePathname();
  const suffix = pathname.replace(/^\/(en|nl)/, "") || "";

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex shrink-0 touch-manipulation rounded-md border border-border bg-muted/50 p-0.5 dark:bg-muted/30"
    >
      {locales.map((l) => {
        const active = l === locale;
        const href = `/${l}${suffix}`;
        const label = l.toUpperCase();
        return (
          <Link
            key={l}
            href={href}
            hrefLang={l}
            lang={l}
            prefetch={false}
            className={`flex min-h-[44px] min-w-[2.75rem] items-center justify-center rounded px-3 py-2 text-center text-xs font-semibold transition-colors ${
              active
                ? "bg-card text-foreground shadow-sm dark:bg-card"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
