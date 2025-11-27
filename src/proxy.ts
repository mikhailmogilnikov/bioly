import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";
import linguiConfig from "../lingui.config";

const { locales } = linguiConfig;

// Пути, которые требуют локали (находятся внутри [lang])
const localizedPaths = [
  "editor",
  "explore",
  "login",
  "signup",
  "reset-password",
] as const;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Если путь уже содержит локаль, пропускаем
  const pathnameHasLocale = locales.some(
    (newLocale) =>
      pathname.startsWith(`/${newLocale}/`) || pathname === `/${newLocale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // Если это корневой путь или путь, который требует локали
  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];

  // Корневой путь (/) требует локали
  if (pathname === "/") {
    const locale = getRequestLocale(request.headers);
    request.nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Если первый сегмент - это один из путей, требующих локали
  if (
    firstSegment &&
    localizedPaths.includes(firstSegment as (typeof localizedPaths)[number])
  ) {
    const locale = getRequestLocale(request.headers);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Если это один сегмент (username) - не делаем редирект
  // Пропускаем для страниц пользователей
  return;
}

function getRequestLocale(requestHeaders: Headers): string {
  const langHeader = requestHeaders.get("accept-language") || undefined;
  const languages = new Negotiator({
    headers: { "accept-language": langHeader },
  }).languages(locales.slice());

  const activeLocale = languages[0] || locales[0] || "en";

  return activeLocale;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/reset-password",
    "/editor",
    "/explore",
    // "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
