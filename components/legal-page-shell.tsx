import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import {
  fetchLegalDocument,
  officialLegalUrl,
  type LegalEndpoint,
} from "@/lib/muamatch-legal-api";

const legalHtmlClassName =
  "legal-html mt-10 max-w-none break-words space-y-4 text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h1]:mb-4 [&_h1]:mt-10 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-foreground [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_hr]:my-8 [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_strong]:font-semibold [&_strong]:text-foreground [&_table]:my-6 [&_table]:w-full [&_table]:min-w-0 [&_table]:border-collapse [&_table]:text-sm [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:text-left [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_img]:my-4 [&_img]:h-auto [&_img]:max-w-full";

export async function LegalPageShell({
  locale,
  endpoint,
}: {
  locale: Locale;
  endpoint: LegalEndpoint;
}) {
  const dict = await getDictionary(locale);
  let doc: Awaited<ReturnType<typeof fetchLegalDocument>> | null = null;
  try {
    doc = await fetchLegalDocument(endpoint, locale);
  } catch {
    doc = null;
  }

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <main id="main" className="relative min-h-[55vh]">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          {!doc ? (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                MUA Match
              </h1>
              <p className="mt-6 text-muted-foreground">{dict.legal.fetchFailed}</p>
              <p className="mt-4">
                <Link
                  href={officialLegalUrl(endpoint)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4 hover:underline"
                >
                  {dict.legal.openOfficial}
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {doc.title}
              </h1>
              {doc.subTitle ? (
                <p className="mt-3 text-lg text-muted-foreground">{doc.subTitle}</p>
              ) : null}
              {doc.html ? (
                <div className="max-w-full overflow-x-auto [-webkit-overflow-scrolling:touch]">
                  <div
                    className={legalHtmlClassName}
                    dangerouslySetInnerHTML={{ __html: doc.html }}
                  />
                </div>
              ) : null}
            </>
          )}
        </article>
        <SiteFooter locale={locale} dict={dict} />
      </main>
    </>
  );
}
