import { NextResponse, type NextRequest } from "next/server";

import {
  defaultLocale,
  isLocale,
  localeCookieName,
  type Locale,
} from "./i18n/config";
import { stripLocaleFromPathname } from "./i18n/routing";

function getPathLocale(pathname: string): Locale | null {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  return isLocale(firstSegment) ? firstSegment : null;
}

function withLocaleHeader(request: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-di-locale", locale);

  return requestHeaders;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathLocale = getPathLocale(pathname);

  /*
   * =========================================================
   * ENGLISH-ONLY LIVE SITE
   * =========================================================
   *
   * /en/about -> /about
   * /ar/about -> /about
   * /ar -> /
   *
   * Arabic files/dictionaries remain in the project,
   * but Arabic URLs are temporarily redirected to English.
   */

  if (pathLocale) {
    const url = request.nextUrl.clone();

    url.pathname = stripLocaleFromPathname(pathname);

    const response = NextResponse.redirect(url);

    response.cookies.set(localeCookieName, defaultLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  }

  /*
   * =========================================================
   * PUBLIC ENGLISH URL
   * =========================================================
   *
   * Public:
   * /about
   * /services
   * /contact
   *
   * Internal App Router:
   * /en/about
   * /en/services
   * /en/contact
   */

  const rewriteUrl = request.nextUrl.clone();

  rewriteUrl.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;

  const response = NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: withLocaleHeader(request, defaultLocale),
    },
  });

  /*
   * Force the locale cookie back to English as well.
   * This prevents an old Arabic selection from affecting
   * the currently live English-only website.
   */
  response.cookies.set(localeCookieName, defaultLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|assets|.*\\..*).*)",
  ],
};
