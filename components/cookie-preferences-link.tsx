"use client";

import { COOKIE_PREFERENCES_EVENT } from "@/components/cookie-banner";

// Footer button that reopens the cookie consent panel, as promised in the
// cookie policy.
export function CookiePreferencesLink({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT))}
    >
      {label}
    </button>
  );
}
