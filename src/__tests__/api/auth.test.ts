import { GET, POST } from '@/app/api/auth/[...nextauth]/route';

describe('NextAuth API', () => {
  it('handles GET', async () => {
    const res = await GET(new Request('http://a.com') as any);
    expect(res).toBeDefined();
  });
  it('handles POST', async () => {
    const res = await POST(new Request('http://a.com') as any);
    expect(res).toBeDefined();
  });
});
