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
      className="flex shrink-0 items-center text-xs font-medium text-muted-foreground"
    >
      {locales.map((l, i) => {
        const active = l === locale;
        const href = `/${l}${suffix}`;
        return (
          <span key={l} className="flex items-center">
            {i > 0 ? <span aria-hidden className="px-0.5 text-border">/</span> : null}
            <Link
              href={href}
              hrefLang={l}
              lang={l}
              prefetch={false}
              aria-current={active ? "true" : undefined}
              className={`touch-manipulation rounded px-1.5 py-1 transition-colors ${
                active
                  ? "font-semibold text-foreground"
                  : "hover:text-foreground"
              }`}
            >
              {l.toUpperCase()}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
