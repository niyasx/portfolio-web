import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const secret = process.env.AUTH_SECRET;
  if (!secret) return NextResponse.next();

  const secureCookie = req.nextUrl.protocol === "https:";
  let token = await getToken({
    req,
    secret,
    cookieName: secureCookie ? "__Secure-authjs.session-token" : "authjs.session-token",
  });
  if (!token) {
    token = await getToken({
      req,
      secret,
      cookieName: secureCookie ? "__Secure-next-auth.session-token" : "next-auth.session-token",
    });
  }
  if (!token) {
    const url = new URL("/admin/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
