/**
 * @jest-environment node
 */
import { POST } from '@/app/api/chat/route';

// Mock VertexAI
jest.mock('@google-cloud/vertexai', () => ({
  VertexAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockImplementation(() => ({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          candidates: [{ content: { parts: [{ text: 'Vertex AI Response' }] } }]
        }
      })
    }))
  }))
}));

describe('/api/chat - Full Coverage', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  it('uses Vertex AI when configured', async () => {
    process.env.GOOGLE_CLOUD_PROJECT = 'real-project';
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'test' }),
    });

    const res = await POST(req);
    const data = await res.json();
    expect(data.response).toBe('Vertex AI Response');
  });

  it('handles Vertex AI failure and falls back to keywords', async () => {
    process.env.GOOGLE_CLOUD_PROJECT = 'real-project';
    // Force failure
    const { VertexAI } = require('@google-cloud/vertexai');
    VertexAI.mockImplementationOnce(() => { throw new Error('API Down'); });

    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'beer' }),
    });

    const res = await POST(req);
    const data = await res.json();
    expect(data.response).toContain('Section 108'); // Fallback keyword response
  });

  it('handles generic catch block errors', async () => {
    // Malformed request that will throw in the root try block
    const res = await POST(null as any);
    const data = await res.json();
    expect(data.response).toContain("I'm having trouble");
  });
});
