/**
 * @jest-environment node
 */
import { middleware } from '@/middleware';
import { NextRequest } from 'next/server';

describe('Middleware', () => {
  it('allows requests to admin paths', () => {
    const req = new NextRequest(new Request('http://localhost/admin'));
    const res = middleware(req);
    expect(res.status).toBe(200);
  });

  it('allows requests to admin sub-paths', () => {
    const req = new NextRequest(new Request('http://localhost/admin/alerts'));
    const res = middleware(req);
    expect(res.status).toBe(200);
  });
});
