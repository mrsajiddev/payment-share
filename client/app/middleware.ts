// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  // Get cookies
  const token = request.cookies.get("token")?.value;
  const user = request.cookies.get("user")?.value;


  // If user and token exist, allow access
  if( token && user ) {
    return NextResponse.next();
  }

  // If not authenticated, redirect to login page
  const loginUrl = new URL("/auth/login", request.url);
  return NextResponse.redirect(loginUrl);
}

// Apply middleware to dashboard pages
export const config = {
  matcher: ["/dashboard/:path*"], // protect /dashboard and any nested routes
};
