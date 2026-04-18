import { authOptions } from '@/lib/auth';

describe('Auth Configuration', () => {
  it('has required properties', () => {
    expect(authOptions).toBeDefined();
    expect(authOptions.providers).toBeDefined();
    expect(authOptions.callbacks).toBeDefined();
  });
});
