import type { Metadata } from "next";
import { Fraunces, Tiro_Devanagari_Hindi, Inter } from "next/font/google";
import "./globals.css";

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
  description: "Bharosa Shop is India's premier trusted marketplace for verified organic produce, pure A2 desi ghee, cold-pressed oils, wild honey, and natural grains direct from local farmers. 100% lab verified.",
  keywords: ["organic produce", "bharosa verified", "cold pressed oils", "A2 ghee", "pure honey", "lab tested organic", "Indian organic farmers", "शुद्धता का वादा"],
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
      <body className="min-h-full flex flex-col bg-[#F6F1E4] text-[#1E2C1B] selection:bg-[#E07A2E] selection:text-white">
        {children}
      </body>
    </html>
  );
}

