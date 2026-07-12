import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import { LEGAL_CONTENT, type LegalEndpoint } from "@/lib/legal-content";

const legalHtmlClassName =
  "legal-html mt-10 max-w-none break-words space-y-4 text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h1]:mb-4 [&_h1]:mt-10 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-foreground [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_hr]:my-8 [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_strong]:font-semibold [&_strong]:text-foreground [&_table]:my-6 [&_table]:w-full [&_table]:min-w-0 [&_table]:border-collapse [&_table]:text-sm [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:text-left [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_img]:my-4 [&_img]:h-auto [&_img]:max-w-full";

// Legal pages render from locally bundled content (lib/legal-content.ts,
// generated from the official Word documents), so they need no network
// fetch and can never show a failed state.
export async function LegalPageShell({
  locale,
  endpoint,
}: {
  locale: Locale;
  endpoint: LegalEndpoint;
}) {
  const dict = await getDictionary(locale);
  const doc = LEGAL_CONTENT[endpoint][locale];

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <main id="main" className="relative min-h-[55vh]">
        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {doc.title}
          </h1>
          <div className="max-w-full overflow-x-auto [-webkit-overflow-scrolling:touch]">
            <div
              className={legalHtmlClassName}
              dangerouslySetInnerHTML={{ __html: doc.html }}
            />
          </div>
        </article>
        <SiteFooter locale={locale} dict={dict} />
      </main>
    </>
  );
}
