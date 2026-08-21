import type { Metadata } from "next";
import { Fraunces, Tiro_Devanagari_Hindi, Inter } from "next/font/google";
import "./globals.css";
import { AppShellProvider } from "@/context/AppShellContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const tiroDevanagari = Tiro_Devanagari_Hindi({
  weight: "400",
  subsets: ["devanagari", "latin"],
  variable: "--font-tiro-devanagari",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bharosa Shop - Fresh Organic Goodness, Verified for You | प्रकृति से सीधे आपके घर तक",
  description: "Bharosa Shop is India's premier trusted marketplace for the best organic products, pure A2 desi ghee, cold-pressed oils, wild honey, and natural grains direct from local farmers. Lab verified.",
  keywords: ["best organic products", "bharosa verified", "cold pressed oils", "A2 ghee", "pure honey", "lab tested organic", "Indian organic farmers", "शुद्धता का वादा"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hi"
      className={`${fraunces.variable} ${tiroDevanagari.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FBF9F4] text-[#24291F] selection:bg-[#C4611E] selection:text-white">
        <AppShellProvider>{children}</AppShellProvider>
      </body>
    </html>
  );
}

