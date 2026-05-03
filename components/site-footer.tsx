import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:px-6">
        <span>© {new Date().getFullYear()} MUA Match</span>
        <nav
          className="flex flex-wrap gap-x-4 gap-y-2"
          aria-label={dict.footer.legalAria}
        >
          <Link
            href={`/${locale}/termsconditions`}
            className="hover:text-foreground"
          >
            {dict.footer.terms}
          </Link>
          <Link
            href={`/${locale}/privacypolicy`}
            className="hover:text-foreground"
          >
            {dict.footer.privacy}
          </Link>
          <Link
            href={`/${locale}/cookiemessage`}
            className="hover:text-foreground"
          >
            {dict.footer.cookiePolicy}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
