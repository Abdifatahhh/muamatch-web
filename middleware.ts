import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Locale } from "@/lib/i18n";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { APP_STORE, PLAY_STORE } from "@/lib/site";

// Pick a locale for prefix-less visits: an explicit choice stored by the
// language menu wins, otherwise the browser's Accept-Language decides.
function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const accept = request.headers.get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase();
    if (tag === "nl" || tag.startsWith("nl-")) return "nl";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Smart store link behind the QR code: phones go straight to their store,
  // everyone else lands on the homepage download block.
  if (pathname === "/get") {
    const ua = request.headers.get("user-agent") ?? "";
    if (/iphone|ipad|ipod/i.test(ua)) return NextResponse.redirect(APP_STORE);
    if (/android/i.test(ua)) return NextResponse.redirect(PLAY_STORE);
    const url = request.nextUrl.clone();
    url.pathname = `/${detectLocale(request)}`;
    url.hash = "get-app";
    return NextResponse.redirect(url);
  }

  if (/\.[a-zA-Z0-9]+$/.test(pathname.split("/").pop() ?? "")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (!first || !isLocale(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
