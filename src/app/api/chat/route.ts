import { NextResponse } from 'next/server';

// Smart fallback responses when Vertex AI is not configured
const FALLBACK_RESPONSES: Record<string, string> = {
  beer: "🍺 **Stadium Brews** at Section 104 has a 12-min wait. But Section 108 Brews is clear — only 1 min wait and 10% off right now!",
  food: "🍔 **Burgers & Dogs** at Section 102 is your best bet — only 2 min wait! Pizza Palace at Section 110 is also good at 8 min.",
  restroom: "🚻 Skip the North Restroom (15 min). **South Restroom** at Section 106 is clear — just 4 min wait.",
  exit: "🚪 Gate 4 is congested. I recommend **Gate 7** (West) — it's 40% less crowded right now.",
  merch: "🛍️ **West Merch Stand** at Section 108 has almost no line — just 1 min wait!",
};

function getSmartResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('beer') || lower.includes('drink') || lower.includes('brew')) return FALLBACK_RESPONSES.beer;
  if (lower.includes('food') || lower.includes('eat') || lower.includes('burger') || lower.includes('pizza') || lower.includes('hungry')) return FALLBACK_RESPONSES.food;
  if (lower.includes('restroom') || lower.includes('bathroom') || lower.includes('toilet')) return FALLBACK_RESPONSES.restroom;
  if (lower.includes('exit') || lower.includes('leave') || lower.includes('gate') || lower.includes('go home')) return FALLBACK_RESPONSES.exit;
  if (lower.includes('merch') || lower.includes('shop') || lower.includes('souvenir') || lower.includes('buy')) return FALLBACK_RESPONSES.merch;
  return "I can help you find **food, drinks, restrooms, exits, or merch** with the shortest wait times. What are you looking for?";
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Try Vertex AI first
    if (process.env.GOOGLE_CLOUD_PROJECT && process.env.GOOGLE_CLOUD_PROJECT !== 'stadium-project') {
      try {
        const { VertexAI } = await import('@google-cloud/vertexai');
        const vertexAI = new VertexAI({
          project: process.env.GOOGLE_CLOUD_PROJECT,
          location: process.env.VERTEX_AI_LOCATION || 'us-central1'
        });

        const model = vertexAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `You are a concise stadium concierge. Current status: Burgers(2min/clear), Brews(12min/busy), N.Restroom(15min/full), S.Restroom(4min/clear), Merch(1min/clear), Pizza(8min/busy). Gate 7 is 40% less busy than Gate 4. User asks: "${message}". Reply in 1-2 sentences. Use bold for location names.`;

        const resp = await model.generateContent(prompt);
        const text = resp.response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return NextResponse.json({ response: text });
      } catch (e) {
        console.warn("Vertex AI unavailable, using smart fallback");
      }
    }

    // Smart fallback
    return NextResponse.json({ response: getSmartResponse(message) });
  } catch (error) {
    return NextResponse.json({ response: "I'm having trouble right now. Try asking about **food, drinks, restrooms, or exits**." });
  }
}
