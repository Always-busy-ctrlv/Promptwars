/**
 * @jest-environment node
 */
import { POST } from '@/app/api/chat/route';

describe('/api/chat', () => {
  it('returns a response for a beer query', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Where can I get a beer?' }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.response).toBeDefined();
    expect(data.response).toContain('Section 108');
  });

  it('returns a response for a food query', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'I am hungry' }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.response).toContain('Burgers');
  });

  it('returns a response for a restroom query', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Where is the restroom?' }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.response).toContain('South Restroom');
  });

  it('returns a response for an exit query', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'How do I exit?' }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.response).toContain('Gate 7');
  });

  it('returns a response for a merch query', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'I want to buy a souvenir' }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.response).toContain('Merch Stand');
  });

  it('returns a default helpful response for unknown queries', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello there' }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.response).toContain('food, drinks, restrooms, exits, or merch');
  });

  it('handles malformed requests gracefully', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: 'invalid json',
    });

    const res = await POST(req);
    const data = await res.json();
    expect(data.response).toBeDefined();
  });
});
