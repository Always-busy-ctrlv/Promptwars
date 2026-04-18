import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { jwtVerify } from "jose";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "qr-token",
      name: "QR Token",
      credentials: {
        token: { label: "JWT Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.token) return null;

        try {
          // In a real app, you'd use a secret from process.env.JWT_SECRET
          const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "default-secret-key");
          const { payload } = await jwtVerify(credentials.token, secret);
          
          return {
            id: payload.seat as string,
            name: `User at ${payload.section}`,
            email: payload.seat as string,
            role: "attendee",
            section: payload.section,
            seat: payload.seat,
          } as any;
        } catch (e) {
          console.error("JWT Verification failed:", e);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.section = (user as any).section;
        token.seat = (user as any).seat;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).section = token.section;
        (session.user as any).seat = token.seat;
      }
      return session;
    },
  },
  pages: {
    signIn: "/qr", // Redirect to QR landing for attendees
  },
});

export { handler as GET, handler as POST };
