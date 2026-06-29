"use client";

import * as React from "react";

// Reveal-on-scroll primitives. The hidden start state lives in CSS, gated on
// `html.js`, so content stays visible if JS never runs. Reduced motion shows
// everything immediately.
function useInView() {
  const [shown, setShown] = React.useState(false);
  const ref = React.useCallback((node: HTMLElement | null) => {
    if (!node || shown) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
  }, [shown]);
  return { ref, shown };
}

type RevealProps = {
  as?: React.ElementType;
  className?: string;
  delay?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function Reveal({ as: Tag = "div", className, delay = 0, children, ...rest }: RevealProps) {
  const { ref, shown } = useInView();
  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-shown={shown ? "true" : "false"}
      style={delay ? ({ transitionDelay: shown ? `${delay}ms` : "0ms" } as React.CSSProperties) : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type RevealGroupProps = {
  as?: React.ElementType;
  className?: string;
  step?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function RevealGroup({ as: Tag = "div", className, step = 60, children, ...rest }: RevealGroupProps) {
  const { ref, shown } = useInView();
  return (
    <Tag
      ref={ref}
      data-reveal-group=""
      data-shown={shown ? "true" : "false"}
      style={{ ["--reveal-step"]: `${step}ms` } as React.CSSProperties}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
