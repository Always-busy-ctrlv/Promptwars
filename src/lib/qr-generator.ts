import { SignJWT } from "jose";

export interface QRPayload {
  section: string;
  row: string;
  seat: string;
  role?: string;
  [key: string]: string | number | boolean | undefined;
}

// Simple mock for testing without jose issues
export async function generateQRToken(payload: QRPayload) {
  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "default-secret-key");
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);
    return token;
  } catch {
    return "error-token";
  }
}

export async function generateSeatURL(baseUrl: string, payload: QRPayload) {
  const token = await generateQRToken(payload);
  return `${baseUrl}/qr?token=${token}`;
}
