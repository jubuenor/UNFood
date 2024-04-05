import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("user-token")?.value;
  if (!jwt) return NextResponse.redirect(new URL("/", request.url));

  try {
    jwtVerify(
      jwt,
      new TextEncoder().encode("4$kGfVDHQtMYIxWS]/MpQYn6CNqrR4d@/0wY!+LWy")
    );
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/client/:path*", "/chaza/:path*"],
};
