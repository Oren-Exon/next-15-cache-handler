import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const chosenLpv = "10000";

  const newUrl = new URL(`/lpvs/${chosenLpv}/verticals/best${pathname}`, request.url);
  console.log(`[middleware] rewrite ${request.url} --> ${newUrl.toString()}`);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: ["/search/:path*"],
};