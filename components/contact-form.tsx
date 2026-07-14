"use client";

import type { Dictionary } from "@/lib/dictionaries/types";
import { CONTACT_EMAIL } from "@/lib/site";
import * as React from "react";

type Status = "idle" | "sending" | "sent" | "error";

// Real contact form: posts to Netlify Forms (detected via public/__forms.html),
// so the message is delivered without opening the visitor's email client.
// A honeypot field keeps the bots out; on failure we fall back to a direct
// email link so nobody gets stranded.
export function ContactForm({ labels }: { labels: Dictionary["contactForm"] }) {
  const [status, setStatus] = React.useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          "bot-field": String(fd.get("bot-field") ?? ""),
          name: String(fd.get("name") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          body: String(fd.get("body") ?? "").trim(),
        }).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl bg-card p-6 shadow-soft sm:p-8">
      {/* Honeypot: humans never see it, bots fill it in. */}
      <p className="hidden" aria-hidden="true">
        <label>
          Do not fill this in
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label className="grid gap-2 text-sm font-medium text-muted-foreground">
        {labels.name}
        <input
          name="name"
          autoComplete="name"
          required
          maxLength={100}
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
          required
          maxLength={200}
          placeholder={labels.placeholderEmail}
          className="rounded-lg border border-input bg-background px-3 py-2.5 text-base text-foreground outline-none ring-ring transition-shadow focus-visible:ring-2"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-muted-foreground">
        {labels.message}
        <textarea
          name="body"
          rows={5}
          required
          maxLength={5000}
          placeholder={labels.placeholderBody}
          className="resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-base text-foreground outline-none ring-ring transition-shadow focus-visible:ring-2"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="tap min-h-[48px] justify-self-start touch-manipulation rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? labels.sending : labels.submit}
      </button>
      <p aria-live="polite" className="min-h-[1.25rem] text-sm leading-relaxed">
        {status === "sent" ? (
          <span className="font-medium text-emerald-600">{labels.successNote}</span>
        ) : status === "error" ? (
          <span className="text-muted-foreground">
            {labels.errorNote}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
          </span>
        ) : null}
      </p>
    </form>
  );
}
