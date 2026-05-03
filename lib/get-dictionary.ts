import type { Locale } from "./i18n";
import type { Dictionary } from "./dictionaries/types";

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "nl":
      return (await import("./dictionaries/nl")).default;
    default:
      return (await import("./dictionaries/en")).default;
  }
}
