export const locales = ["en", "nl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(s: string): s is Locale {
  return locales.includes(s as Locale);
}
