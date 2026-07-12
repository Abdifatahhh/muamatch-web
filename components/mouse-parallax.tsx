"use client";

import * as React from "react";
import { motion, useSpring, useTransform } from "framer-motion";

// Extremely subtle mouse parallax: the wrapped block drifts a few pixels
// toward the cursor, spring-smoothed. Desktop pointers only; reduced motion
// and touch devices render a plain block.
export function MouseParallax({
  children,
  strength = 5,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const [enabled, setEnabled] = React.useState(false);
  const mx = useSpring(0, { stiffness: 90, damping: 24 });
  const my = useSpring(0, { stiffness: 90, damping: 24 });
  const x = useTransform(mx, (v) => v * strength);
  const y = useTransform(my, (v) => v * strength * 0.8);

  React.useEffect(() => {
    const pointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(pointerMq.matches && !motionMq.matches);
    sync();
    pointerMq.addEventListener("change", sync);
    motionMq.addEventListener("change", sync);
    return () => {
      pointerMq.removeEventListener("change", sync);
      motionMq.removeEventListener("change", sync);
    };
  }, []);

  return (
    <motion.div
      className={className}
      style={enabled ? { x, y } : undefined}
      onMouseMove={(e) => {
        if (!enabled) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
