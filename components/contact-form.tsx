"use client";

import type { Dictionary } from "@/lib/dictionaries/types";
import { CONTACT_EMAIL } from "@/lib/site";
import * as React from "react";

export function ContactForm({ labels }: { labels: Dictionary["contactForm"] }) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const body = String(fd.get("body") ?? "").trim();
    const subject = name ? `${labels.mailSubjectPrefix}${name}` : labels.mailSubjectFallback;
    const lines: string[] = [];
    if (name) lines.push(`${labels.mailBodyNamePrefix}${name}`);
    if (email) lines.push(`${labels.mailBodyEmailPrefix}${email}`);
    if (body) lines.push("", body);
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <label className="grid gap-2 text-sm font-medium text-muted-foreground">
        {labels.name}
        <input
          name="name"
          autoComplete="name"
          placeholder={labels.placeholderName}
          className="rounded-lg border border-input bg-background px-3 py-2.5 text-base text-foreground outline-none ring-ring transition-shadow focus-visible:ring-2"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-muted-foreground">
        {labels.email}
        <input
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={labels.placeholderEmail}
          className="rounded-lg border border-input bg-background px-3 py-2.5 text-base text-foreground outline-none ring-ring transition-shadow focus-visible:ring-2"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-muted-foreground">
        {labels.message}
        <textarea
          name="body"
          rows={5}
          placeholder={labels.placeholderBody}
          className="resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-base text-foreground outline-none ring-ring transition-shadow focus-visible:ring-2"
        />
      </label>
      <button
        type="submit"
        className="tap min-h-[44px] justify-self-start touch-manipulation rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        {labels.submit}
      </button>
    </form>
  );
}
