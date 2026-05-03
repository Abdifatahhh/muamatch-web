"use client";

import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";
import * as React from "react";

const storageKey = "muamatch_cookie_ack";

export function CookieBanner({
  cookie,
  locale,
}: {
  cookie: Dictionary["cookie"];
  locale: Locale;
}) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      if (!localStorage.getItem(storageKey)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={cookie.bannerAria}
      className="fixed bottom-4 left-4 right-4 z-[100] mx-auto flex max-w-lg flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground shadow-soft sm:flex-nowrap sm:gap-4"
    >
      <p className="min-w-0 flex-1">
        {cookie.text}{" "}
        <Link
          href={`/${locale}/cookiemessage`}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {cookie.more}
        </Link>
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            localStorage.setItem(storageKey, "1");
          } catch {
            /* ignore */
          }
          setVisible(false);
        }}
        className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        {cookie.accept}
      </button>
    </div>
  );
}
