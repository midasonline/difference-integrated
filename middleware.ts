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

  // English stays canonical without a visible /en prefix.
  // /en/about -> /about
  if (pathLocale === defaultLocale) {
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

  // Non-default locale routes such as /ar and /ar/about are real App Router
  // routes under app/[lang]. Keep the URL as-is and pass the locale to the
  // root layout so <html lang/dir> and the dictionary are correct.
  if (pathLocale) {
    const response = NextResponse.next({
      request: {
        headers: withLocaleHeader(request, pathLocale),
      },
    });

    response.cookies.set(localeCookieName, pathLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  }

  const savedLocale = request.cookies.get(localeCookieName)?.value;

  // If Arabic is selected, preserve it when an old/unprefixed internal link
  // is followed.
  if (isLocale(savedLocale) && savedLocale !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? `/${savedLocale}` : `/${savedLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // IMPORTANT:
  // The public English URLs remain /, /about, /services, etc., while the
  // actual page files live once under app/[lang]. Internally rewrite those
  // unprefixed English URLs to /en/... so we do not need duplicate page files
  // and, most importantly, / no longer returns a 404.
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;

  const response = NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: withLocaleHeader(request, defaultLocale),
    },
  });

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
