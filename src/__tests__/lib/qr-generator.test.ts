import { generateQRToken, generateSeatURL } from '@/lib/qr-generator';
import { SignJWT } from 'jose';

describe('QR Generator', () => {
  it('generates a token', async () => {
    const t = await generateQRToken({});
    expect(t).toBe('mocked-token');
  });

  it('handles errors', async () => {
    (SignJWT as any).mockImplementationOnce(() => { throw new Error(); });
    const t = await generateQRToken({});
    expect(t).toBe('error-token');
  });

  it('generates a URL', async () => {
    const url = await generateSeatURL('http://b.com', {});
    expect(url).toContain('token=');
  });
});
