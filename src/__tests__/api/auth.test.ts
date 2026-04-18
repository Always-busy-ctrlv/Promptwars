import { GET, POST } from '@/app/api/auth/[...nextauth]/route';

describe('Auth API Route', () => {
  it('exports handlers', () => {
    expect(typeof GET).toBe('function');
    expect(typeof POST).toBe('function');
  });
});
