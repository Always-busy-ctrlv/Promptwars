import type { NextAuthOptions, User as DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtVerify } from "jose";

declare module "next-auth" {
  interface User {
    role?: string;
    section?: string;
    row?: string;
    seat?: string;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    section?: string;
    row?: string;
    seat?: string;
  }
}

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
            section: payload.section as string,
            row: payload.row as string,
            seat: payload.seat as string,
          };
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
          user.role ||
          (account?.provider === "google" ? "admin" : "attendee");
        token.section = user.section;
        token.row = user.row;
        token.seat = user.seat;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || "attendee";
        session.user.section = token.section;
        session.user.row = token.row;
        session.user.seat = token.seat;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
