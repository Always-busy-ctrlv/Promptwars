import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminPath = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminPath && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthPath = req.nextUrl.pathname.startsWith("/api/auth") || 
                          req.nextUrl.pathname.startsWith("/qr") ||
                          req.nextUrl.pathname === "/";
        
        if (isAuthPath) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/api/protected/:path*"],
};
