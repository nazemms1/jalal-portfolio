import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import AmbientMesh from "@/components/AmbientMesh";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Jalal Al-Nabelsi | AI Engineer & Front-End Developer",
  description:
    "Portfolio of Jalal Al-Nabelsi — AI Engineer and Front-End Developer specializing in LLMs, RAG applications, React, and high-performance glass-morphic web interfaces.",
  keywords: [
    "Jalal Al-Nabelsi",
    "AI Engineer",
    "Front-End Developer",
    "React Developer",
    "Next.js",
    "RAG",
    "LLM",
    "ChatPDF",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>

        <LanguageProvider>
          {/* Clean Human Design Ambient Background (Linear / Vercel Aesthetic) */}
          <AmbientMesh />

          <div style={{ position: "relative", zIndex: 1, background: "transparent" }}>
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
