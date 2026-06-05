import type { Metadata } from "next";
import { Geist } from "next/font/google";
import StarBackground from "@/components/StarBackground";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jalal Al-Nabelsi | AI Engineer & Front-End Developer",
  description:
    "Portfolio of Jalal Al-Nabelsi — AI Engineer and Front-End Developer building intelligent applications and modern user interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <StarBackground />
        {/* transparent wrapper so the fixed canvas shows through all sections */}
        <div style={{ position: "relative", zIndex: 1, background: "transparent" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
