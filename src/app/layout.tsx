import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cormorant_Garamond, Tenor_Sans } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-tenor',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://useluvera.com"),

  title: "Luvéra - Premium Men's Skincare | Lightweight Face Moisturizer",
  description: "Discover Luvéra's premium men's skincare. Lightweight, non-greasy face moisturizers for daily hydration across all skin types. Discover and shop today now online.",
  keywords: [
    "Skincare",
    "lotion",
    "moisturizer",
    "men's",
    "hydrating",
  ],
  icons: {
    icon: "/favicon.png", // 👈 points to your new PNG
  },

  openGraph: {
    title: "Luvéra - Premium Men's Skincare | Lightweight Face Moisturizer",
    description:
      "Discover Luvéra's premium men's skincare. Lightweight, non-greasy face moisturizers for daily hydration across all skin types. Discover and shop today now online.",
    images: ['/product/tub.webp'],
  },

  twitter: {
    card: 'summary_large_image',
    title: "Luvéra - Premium Men's Skincare | Lightweight Face Moisturizer",
    description:
      "Discover Luvéra's premium men's skincare. Lightweight, non-greasy face moisturizers for daily hydration across all skin types. Discover and shop today now online.",
    images: ['/product/tub.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero images — tells browser to fetch these before JS runs */}
        <link rel="preload" as="image" href="/hero/aloe-plant-blackbg-left.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/hero/aloe-plant-blackbg-right.webp" fetchPriority="high" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${tenorSans.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
