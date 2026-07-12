"use client";

import * as React from "react";

// Card wrapper that tracks the cursor and exposes it as --spot-x/--spot-y,
// so CSS can paint a faint highlight under the pointer (see .feature-card
// in globals.css). Writes styles directly on the node; no re-renders.
export function SpotlightCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
