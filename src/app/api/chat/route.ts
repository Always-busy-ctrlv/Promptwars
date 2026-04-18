import { NextResponse } from 'next/server';
import { getSmartChatResponse } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Try Vertex AI first
    if (process.env.GOOGLE_CLOUD_PROJECT && process.env.GOOGLE_CLOUD_PROJECT !== 'stadium-project') {
      try {
        const { VertexAI } = await import('@google-cloud/vertexai');
        const vertexAI = new VertexAI({
          project: process.env.GOOGLE_CLOUD_PROJECT,
          location: process.env.VERTEX_AI_LOCATION || 'us-central1',
        });

        const model = vertexAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `You are a concise stadium concierge at a live sporting event. Current facility status: Burgers(2min/clear), Brews(12min/busy), N.Restroom(15min/full), S.Restroom(4min/clear), Merch(1min/clear), Pizza(8min/busy). Gate 7 is 40% less busy than Gate 4. The game is in the 2nd half at 62 minutes. User asks: "${message}". Reply in 1-2 sentences. Use bold for location names.`;

        const resp = await model.generateContent(prompt);
        const text = resp.response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return NextResponse.json({ response: text });
      } catch {
        console.warn('Vertex AI unavailable, using smart fallback');
      }
    }

    return NextResponse.json({ response: getSmartChatResponse(message) });
  } catch {
    return NextResponse.json({
      response: "I'm having trouble right now. Try asking about **food, drinks, restrooms, or exits**.",
    });
  }
}
