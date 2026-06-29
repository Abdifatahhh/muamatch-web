"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import * as React from "react";

type NavItem = { href: string; label: string };
type Action = { href: string; label: string; variant: "primary" | "outline"; external?: boolean };

export function MobileNav({
  items,
  actions = [],
  ariaLabel,
  openLabel,
  closeLabel,
}: {
  items: NavItem[];
  actions?: Action[];
  ariaLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-accent lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={openLabel}
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6 shrink-0" strokeWidth={1.75} aria-hidden />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav-drawer"
            className="absolute right-0 top-0 flex h-full w-[min(100vw-3rem,18rem)] flex-col gap-1 border-l border-border bg-background px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] shadow-xl"
            aria-label={ariaLabel}
          >
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-muted/60 text-foreground transition-colors hover:bg-accent"
                aria-label={closeLabel}
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6 shrink-0" strokeWidth={1.75} aria-hidden />
              </button>
            </div>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent active:bg-accent"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {actions.length > 0 ? (
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                {actions.map((action) => (
                  <Link
                    key={action.href + action.label}
                    href={action.href}
                    {...(action.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    onClick={() => setOpen(false)}
                    className={
                      action.variant === "primary"
                        ? "inline-flex min-h-[48px] items-center justify-center rounded-lg bg-primary px-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                        : "inline-flex min-h-[48px] items-center justify-center rounded-lg border border-border bg-card px-4 text-base font-semibold text-foreground transition-colors hover:bg-accent"
                    }
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </nav>
        </div>
      ) : null}
    </>
  );
}
