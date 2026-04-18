import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // For now, allow all traffic. When Google OAuth is configured,
  // re-enable the next-auth/middleware withAuth wrapper.
  //
  // Admin routes are currently public for demo purposes.
  // In production, uncomment the auth check below:
  //
  // const token = req.cookies.get('next-auth.session-token');
  // if (!token) {
  //   return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
