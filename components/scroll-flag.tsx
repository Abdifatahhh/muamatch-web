"use client";

import { useEffect } from "react";

// Toggles html[data-scrolled] so the sticky header can elevate once the page
// is scrolled. Cheap passive listener; no layout work.
export function ScrollFlag() {
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      root.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
