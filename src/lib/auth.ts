import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtVerify } from "jose";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "qr-token",
      name: "QR Ticket",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.token) return null;
        try {
          const secret = new TextEncoder().encode(
            process.env.NEXTAUTH_SECRET || "default-secret-key"
          );
          const { payload } = await jwtVerify(credentials.token, secret);
          return {
            id: `seat-${payload.section}-${payload.row}-${payload.seat}`,
            name: `Section ${payload.section}, Seat ${payload.seat}`,
            email: null,
            image: null,
            role: "attendee",
            section: payload.section,
            row: payload.row,
            seat: payload.seat,
          } as any;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role =
          (user as any).role ||
          (account?.provider === "google" ? "admin" : "attendee");
        token.section = (user as any).section;
        token.row = (user as any).row;
        token.seat = (user as any).seat;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role || "attendee";
        (session.user as any).section = token.section;
        (session.user as any).row = token.row;
        (session.user as any).seat = token.seat;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
