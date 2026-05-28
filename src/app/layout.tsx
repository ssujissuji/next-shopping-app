import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QueryProvider } from "@/providers/QueryProvider";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const ui = Manrope({
  subsets: ["latin"],
  variable: "--font-ui",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAEIL — Quiet essentials",
  description: "매일(MAEIL) — 매일 다시 입고 싶은 옷.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body
        className={`${display.variable} ${ui.variable} ${mono.variable} antialiased bg-bone text-ink`}
      >
        <QueryProvider>
          <Header />
          <main className="max-w-[1320px] mx-auto px-10 py-12">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
