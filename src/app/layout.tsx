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
  title: "Bharosa Shop — Lab-Tested Organic Ghee, Honey, Oils & Spices Online",
  description: "India's verified organic marketplace. NABL lab-tested A2 ghee, cold-pressed oils, raw honey & spices, sourced direct from farmers. QR batch traceability.",
  keywords: ["organic products online India", "lab tested organic products India", "verified organic marketplace India", "A2 ghee cold pressed oil honey online", "sell organic products online India", "NABL certified organic products", "शुद्धता का वादा"],
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

