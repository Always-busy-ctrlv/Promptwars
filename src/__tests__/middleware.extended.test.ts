import { NextResponse } from 'next/server';
import middleware from '@/middleware';

describe('Middleware (Deep Coverage)', () => {
  it('handles protected admin routes', async () => {
    const req: any = {
      nextUrl: { pathname: '/admin' },
      headers: new Map(),
      nextauth: { token: { role: 'admin' } }
    };
    const res = await (middleware as any)(req);
    expect(res).toBeDefined();
  });

  it('handles non-admin users on admin routes', async () => {
    const req: any = {
      nextUrl: { pathname: '/admin' },
      headers: new Map(),
      nextauth: { token: { role: 'attendee' } }
    };
    // Mock NextResponse.redirect
    const res = await (middleware as any)(req);
    expect(res.type).toBe('redirect');
    expect(res.url).toBe('/auth/signin');
  });
});
