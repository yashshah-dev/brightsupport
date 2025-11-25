import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Bright Support | NDIS Disability & Support Services Provider",
  description: "Trusted NDIS disability and support services provider in Australia. Offering daily living support, community nursing, physiotherapy, and more. Making navigating the NDIS easy.",
  keywords: "NDIS, disability support, aged care, community nursing, physiotherapy, Melbourne, Shepparton, Australia",
  authors: [{ name: "Bright Support" }],
  openGraph: {
    title: "Bright Support | NDIS Disability & Support Services Provider",
    description: "Trusted NDIS disability and support services provider in Australia",
    type: "website",
    locale: "en_AU",
    siteName: "Bright Support",
  },
  metadataBase: new URL('https://www.brightsupport.com.au'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="Organization" />
        <StructuredData type="LocalBusiness" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload hero image responsive variants for faster LCP */}
        <link
          rel="preload"
          as="image"
          href="/bright-support/images/hero/hero-main.webp"
          imagesrcset="/bright-support/images/hero/hero-main-480.webp 480w, /bright-support/images/hero/hero-main-768.webp 768w, /bright-support/images/hero/hero-main-1024.webp 1024w, /bright-support/images/hero/hero-main-1400.webp 1400w"
          imagesizes="(max-width: 768px) 100vw, 50vw"
        />
        <link
          rel="preload"
          as="image"
          href="/bright-support/images/hero/hero-main-768.avif"
          type="image/avif"
          imagesrcset="/bright-support/images/hero/hero-main-480.avif 480w, /bright-support/images/hero/hero-main-768.avif 768w, /bright-support/images/hero/hero-main-1024.avif 1024w, /bright-support/images/hero/hero-main-1400.avif 1400w"
          imagesizes="(max-width: 768px) 100vw, 50vw"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
