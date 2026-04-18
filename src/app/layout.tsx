import type { Metadata } from "next";
import { Outfit, Rubik } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Stadium Go — Smart Venue Navigation",
  description:
    "Real-time crowd routing, personalized incentives, and AI-powered assistance for large-scale sporting events.",
  keywords: ["stadium", "crowd management", "live events", "navigation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${rubik.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
