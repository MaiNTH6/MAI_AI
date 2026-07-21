import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidAdminCookie } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // chỉ áp dụng cho /admin/* (đã được match qua matcher bên dưới)
  // ngoại trừ /admin/login
  if (pathname === "/admin/login") return NextResponse.next();

  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  const ok = await isValidAdminCookie(cookie);

  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
