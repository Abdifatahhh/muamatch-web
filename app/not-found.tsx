import Link from "next/link";
import { Logo } from "@/components/logo";

// Root not-found catches every unmatched URL, outside the [locale] segment,
// so it has no dictionary. Keep it short and bilingual; the middleware sends
// "/" to the visitor's language.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo iconClassName="h-10 w-10" textClassName="text-base" />
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</p>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          This page does not exist. / Deze pagina bestaat niet.
        </p>
      </div>
      <Link
        href="/"
        className="tap inline-flex min-h-[48px] touch-manipulation items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        Back to home / Terug naar home
      </Link>
    </main>
  );
}
