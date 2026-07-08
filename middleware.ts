import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { APP_STORE, PLAY_STORE } from "@/lib/site";

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
    url.pathname = `/${defaultLocale}`;
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
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
