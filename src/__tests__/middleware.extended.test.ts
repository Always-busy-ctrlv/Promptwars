import { middleware } from '@/middleware';
import { NextRequest } from 'next/server';

describe('Middleware Branches', () => {
  it('covers cookie branch', () => {
    const req = new NextRequest(new Request('http://localhost/admin'));
    req.cookies.set('next-auth.session-token', 'test');
    middleware(req);
  });
});
