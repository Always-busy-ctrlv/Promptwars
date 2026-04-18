/**
 * @jest-environment node
 */
import { GET } from '@/app/api/health/route';

describe('/api/health', () => {
  it('returns a healthy status', async () => {
    const res = await GET();
    const data = await res.json();

    expect(data.status).toBe('healthy');
  });

  it('returns a timestamp', async () => {
    const res = await GET();
    const data = await res.json();

    expect(data.timestamp).toBeDefined();
    expect(new Date(data.timestamp).getTime()).not.toBeNaN();
  });

  it('returns a version', async () => {
    const res = await GET();
    const data = await res.json();

    expect(data.version).toBeDefined();
  });
});
