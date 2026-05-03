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
      className="flex shrink-0 rounded-md border border-border bg-muted/50 p-0.5 dark:bg-muted/30"
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
            className={`min-w-[2.25rem] rounded px-2 py-1 text-center text-xs font-semibold transition-colors ${
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
