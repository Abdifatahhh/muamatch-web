"use client";

import Link from "next/link";
import { X } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";
import * as React from "react";

const storageKey = "muamatch_cookie_consent";
export const COOKIE_PREFERENCES_EVENT = "muamatch:cookie-preferences";

type Consent = { v: 1; necessary: true; analytics: boolean; marketing: boolean; date: string };

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    return parsed && parsed.v === 1 ? parsed : null;
  } catch {
    return null;
  }
}

// Consent card: centered above the bottom edge on mobile, bottom-right on
// desktop. Three choices up front (essential only, preferences, accept all)
// and a preferences view with per-category switches. Necessary cookies are
// always on; analytics and marketing (e.g. Meta Pixel) are opt-in. No
// tracking scripts exist today; gate future ones on the stored consent.
export function CookieBanner({
  cookie,
  locale,
}: {
  cookie: Dictionary["cookie"];
  locale: Locale;
}) {
  const [visible, setVisible] = React.useState(false);
  const [prefsOpen, setPrefsOpen] = React.useState(false);
  const [hadConsent, setHadConsent] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);

  React.useEffect(() => {
    if (!readConsent()) setVisible(true);
    const reopen = () => {
      const current = readConsent();
      setHadConsent(!!current);
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setPrefsOpen(true);
      setVisible(true);
    };
    window.addEventListener(COOKIE_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, reopen);
  }, []);

  if (!visible) return null;

  const persist = (a: boolean, m: boolean) => {
    try {
      const consent: Consent = { v: 1, necessary: true, analytics: a, marketing: m, date: new Date().toISOString() };
      localStorage.setItem(storageKey, JSON.stringify(consent));
    } catch {
      /* ignore */
    }
    setVisible(false);
    setPrefsOpen(false);
  };

  const closePrefs = () => {
    // With an earlier choice on record the X just closes the card;
    // otherwise it returns to the three main buttons.
    if (hadConsent) {
      setVisible(false);
      setPrefsOpen(false);
    } else {
      setPrefsOpen(false);
    }
  };

  const policyLink = (
    <Link
      href={`/${locale}/cookiemessage`}
      className="font-medium text-primary underline-offset-4 hover:underline"
    >
      {cookie.more}
    </Link>
  );

  const toggleRow = (
    label: string,
    desc: string,
    on: boolean,
    onChange: (() => void) | null,
  ) => (
    <div className="flex items-start justify-between gap-3 py-2.5">
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="block text-xs leading-snug text-muted-foreground">{desc}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        disabled={!onChange}
        onClick={onChange ?? undefined}
        className={`relative mt-0.5 h-6 w-10 shrink-0 rounded-full transition-colors ${
          on ? "bg-primary" : "bg-muted-foreground/25"
        } ${!onChange ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] ${
            on ? "left-[1.125rem]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div
      role="dialog"
      aria-label={cookie.bannerAria}
      className="cookie-in fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[100] mx-auto max-w-md rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:mx-0 sm:w-[22rem]"
    >
      {prefsOpen ? (
        <>
          <div className="flex items-start justify-between gap-3">
            <p className="text-lg font-bold text-foreground">{cookie.prefsTitle}</p>
            <button
              type="button"
              aria-label={cookie.closeAria}
              onClick={closePrefs}
              className="tap -mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-accent touch-manipulation"
            >
              <X className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </button>
          </div>
          <p className="mt-1.5">
            {cookie.prefsIntro} {policyLink}
          </p>
          <div className="mt-2 divide-y divide-border">
            {toggleRow(cookie.necessaryLabel, cookie.necessaryDesc, true, null)}
            {toggleRow(cookie.analyticsLabel, cookie.analyticsDesc, analytics, () => setAnalytics((v) => !v))}
            {toggleRow(cookie.marketingLabel, cookie.marketingDesc, marketing, () => setMarketing((v) => !v))}
          </div>
          <button
            type="button"
            onClick={() => persist(analytics, marketing)}
            className="tap mt-3 min-h-[44px] w-full rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90 touch-manipulation"
          >
            {cookie.save}
          </button>
        </>
      ) : (
        <>
          <p className="text-lg font-bold text-foreground">{cookie.title}</p>
          <p className="mt-1.5">
            {cookie.text} {policyLink}
          </p>
          <div className="mt-4 grid gap-2">
            <button
              type="button"
              onClick={() => persist(false, false)}
              className="tap min-h-[44px] w-full rounded-full border border-border bg-card px-5 text-sm font-semibold text-foreground hover:bg-accent touch-manipulation"
            >
              {cookie.reject}
            </button>
            <button
              type="button"
              onClick={() => {
                const current = readConsent();
                setAnalytics(current?.analytics ?? false);
                setMarketing(current?.marketing ?? false);
                setPrefsOpen(true);
              }}
              className="tap min-h-[44px] w-full rounded-full border border-border bg-card px-5 text-sm font-semibold text-foreground hover:bg-accent touch-manipulation"
            >
              {cookie.preferences}
            </button>
            <button
              type="button"
              onClick={() => persist(true, true)}
              className="tap min-h-[44px] w-full rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90 touch-manipulation"
            >
              {cookie.acceptAll}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
