import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


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
        <link 
          rel="preload" 
          as="image" 
          href="/_next/image?url=%2Fhero%2Faloe-plant-blackbg-left.webp&w=828&q=75"
          fetchPriority="high" 
        />
        <link 
          rel="preload" 
          as="image" 
          href="/_next/image?url=%2Fhero%2Faloe-plant-blackbg-right.webp&w=828&q=75"
          fetchPriority="high"
        />
      </head>
      <body className={` antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
