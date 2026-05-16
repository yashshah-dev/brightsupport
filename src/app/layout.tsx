import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import "./globals.css";

import StructuredData from "@/components/StructuredData";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DeferredThirdPartyScripts from '@/components/DeferredThirdPartyScripts';
import LazyChatbot from '@/components/LazyChatbot';
import NonCriticalStylesLoader from '@/components/NonCriticalStylesLoader';
import enMessages from '../../messages/en.json';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const NON_CRITICAL_CSS_HREF =
  process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'gh-pages'
    ? '/brightsupport/styles/non-critical.css'
    : '/styles/non-critical.css';

export const metadata: Metadata = {
  title: {
    default: "Bright Support | NDIS Support Services Shepparton",
    template: "%s",
  },
  description: "Trusted NDIS disability support provider in Shepparton. Daily living, community nursing, physiotherapy, companionship and more.",
  keywords: "NDIS, NDIS provider Shepparton, disability support Shepparton, aged care, community nursing, physiotherapy, Mooroopna, Australia, NDIS support services",
  authors: [{ name: "Bright Support" }],
  openGraph: {
    title: "Bright Support | NDIS Disability & Support Services in Shepparton",
    description: "NDIS registered disability & support services provider in Shepparton & Mooroopna. Daily living support, community nursing, physiotherapy, and more.",
    type: "website",
    locale: "en_AU",
    siteName: "Bright Support",
    images: [{
      url: '/images/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Bright Support - NDIS Disability & Support Services Provider in Shepparton',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bright Support | NDIS Support Services Shepparton',
    description: 'Trusted NDIS disability & support services provider. Daily living, nursing, physiotherapy & more.',
    images: ['/images/og-image.png'],
  },
  metadataBase: new URL('https://www.brightsupport.com.au'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData type="Organization" />
        <StructuredData type="LocalBusiness" />
        <StructuredData type="WebSite" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Preload hero AVIF for LCP — browser picks the right size from imagesrcset */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/hero-main-480.avif"
          type="image/avif"
          imageSrcSet="/images/hero/hero-main-480.avif 480w, /images/hero/hero-main-768.avif 768w, /images/hero/hero-main-1024.avif 1024w, /images/hero/hero-main-1400.avif 1400w"
          imageSizes="(max-width: 768px) 100vw, 50vw"
        />
        <noscript>
          <link rel="stylesheet" href={NON_CRITICAL_CSS_HREF} />
        </noscript>
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PT83J47"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <DeferredThirdPartyScripts />
        <NonCriticalStylesLoader />
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <Header />
          <main className="min-h-screen">
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </main>
          <Footer />
          <LazyChatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
