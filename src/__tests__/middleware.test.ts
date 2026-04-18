import middleware from '@/middleware';
import { NextResponse } from 'next/server';

// Mock next-auth/middleware
jest.mock('next-auth/middleware', () => ({
  withAuth: (handler: any) => (req: any) => handler(req),
}));

// Mock next/server
jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url) => ({ type: 'redirect', url })),
    next: jest.fn(() => ({ type: 'next' })),
  },
}));

describe('Middleware', () => {
  it('redirects to home if user is not admin and tries to access admin path', () => {
    const req = {
      nextauth: { token: { role: 'attendee' } },
      nextUrl: { pathname: '/admin/alerts' },
      url: 'http://localhost/admin/alerts',
    } as any;

    const res = middleware(req);
    expect(NextResponse.redirect).toHaveBeenCalled();
  });

  it('allows access if user is admin', () => {
    const req = {
      nextauth: { token: { role: 'admin' } },
      nextUrl: { pathname: '/admin/alerts' },
      url: 'http://localhost/admin/alerts',
    } as any;

    const res = middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it('allows access to non-admin paths', () => {
    const req = {
      nextauth: { token: { role: 'attendee' } },
      nextUrl: { pathname: '/qr' },
      url: 'http://localhost/qr',
    } as any;

    const res = middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
  });
});
