import { SignJWT } from "jose";

// Simple mock for testing without jose issues
export async function generateQRToken(payload: any) {
  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "default-secret-key");
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);
    return token;
  } catch (e) {
    return "error-token";
  }
}

export async function generateSeatURL(baseUrl: string, payload: any) {
  const token = await generateQRToken(payload);
  return `${baseUrl}/qr?token=${token}`;
}
