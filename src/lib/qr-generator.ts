import { SignJWT } from "jose";

export async function generateQRToken(payload: {
  section: string;
  row: string;
  seat: string;
  eventId: string;
}) {
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "default-secret-key");
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // Valid for the duration of the event
    .sign(secret);
    
  return token;
}

export async function generateSeatURL(baseUrl: string, payload: any) {
  const token = await generateQRToken(payload);
  return `${baseUrl}/qr?token=${token}`;
}
