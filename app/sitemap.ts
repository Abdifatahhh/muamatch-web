import type { MetadataRoute } from "next";

const BASE = "https://muamatch.com";
const ROUTES = ["", "/faq", "/contact", "/termsconditions", "/privacypolicy", "/cookiemessage"];
const LOCALES = ["en", "nl"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${BASE}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.6,
      alternates: {
        languages: {
          en: `${BASE}/en${route}`,
          nl: `${BASE}/nl${route}`,
        },
      },
    })),
  );
}
