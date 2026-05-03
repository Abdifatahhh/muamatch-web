"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { defaultLocale, isLocale } from "@/lib/i18n";

export function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const first = pathname.split("/").filter(Boolean)[0];
    document.documentElement.lang = isLocale(first) ? first : defaultLocale;
  }, [pathname]);

  return null;
}
