import { VertexAI } from '@google-cloud/vertexai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Initialize Vertex AI
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT || 'stadium-project',
      location: process.env.VERTEX_AI_LOCATION || 'us-central1'
    });

    const generativeModel = vertexAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    // Mock Facility Data for Context (In a real app, fetch from Firestore here)
    const venueContext = `
      CURRENT STADIUM STATUS:
      - Burgers & Dogs (Section 102): 2 min wait (CLEAR)
      - Stadium Brews (Section 104): 12 min wait (BUSY)
      - North Restroom (Section 101): 15 min wait (CONGESTED)
      - South Restroom (Section 106): 4 min wait (CLEAR)
      - Gate 7 is currently 40% less crowded than Gate 4.
    `;

    const prompt = `
      You are the Stadium AI Concierge for "STADIUM GO". 
      Your goal is to help fans navigate the venue and find the shortest lines.
      
      CONTEXT:
      ${venueContext}
      
      USER QUESTION:
      ${message}
      
      INSTRUCTIONS:
      - Be helpful, energetic, and concise.
      - Always recommend the facilities with the SHORTEST wait times.
      - If a user asks for something busy, suggest a nearby alternative with a shorter line.
      - Use professional, sporty tone.
    `;

    const resp = await generativeModel.generateContent(prompt);
    const content = resp.response.candidates?.[0].content.parts[0].text;

    return NextResponse.json({ response: content });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json({ error: "Failed to connect to AI Concierge" }, { status: 500 });
  }
}
