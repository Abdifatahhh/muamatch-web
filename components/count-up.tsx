"use client";

import * as React from "react";

// Parse a display string like "10,000+", "10.000+", "500+", "4.9", "4,9" into
// a numeric target plus a formatter that reproduces the original separators
// and suffix (so locale formatting is preserved during the count).
function parseValue(raw: string) {
  const match = raw.match(/[\d.,]*\d/);
  if (!match) return null;
  const core = match[0];
  const index = match.index ?? 0;
  const prefix = raw.slice(0, index);
  const suffix = raw.slice(index + core.length);

  let decimalSep = "";
  let decimals = 0;
  const dec = core.match(/([.,])(\d{1,2})$/);
  if (dec) {
    decimalSep = dec[1];
    decimals = dec[2].length;
  }

  let thousandsSep = "";
  const th = core.match(/\d([.,])\d{3}(?!\d)/);
  if (th) thousandsSep = th[1];

  let numStr = core;
  if (thousandsSep) numStr = numStr.split(thousandsSep).join("");
  if (decimalSep) numStr = numStr.replace(decimalSep, ".");
  const target = parseFloat(numStr);
  if (!isFinite(target)) return null;

  const groupSep = thousandsSep || (decimalSep === "," ? "." : decimalSep === "." ? "," : "");

  const format = (n: number) => {
    const fixed = decimals ? n.toFixed(decimals) : String(Math.round(n));
    const [intPart, frac] = fixed.split(".");
    const grouped = groupSep ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSep) : intPart;
    return prefix + grouped + (frac ? (decimalSep || ".") + frac : "") + suffix;
  };

  return { target, format };
}

export function CountUp({
  value,
  durationMs = 1300,
  className,
}: {
  value: string;
  durationMs?: number;
  className?: string;
}) {
  const [display, setDisplay] = React.useState(value);

  const ref = React.useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      const parsed = parseValue(value);
      if (!parsed) return;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

      let raf = 0;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            io.disconnect();
            const start = performance.now();
            setDisplay(parsed.format(0));
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / durationMs);
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(parsed.format(parsed.target * eased));
              if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            break;
          }
        },
        { threshold: 0.5 },
      );
      io.observe(node);
      return () => {
        io.disconnect();
        cancelAnimationFrame(raf);
      };
    },
    [value, durationMs],
  );

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
