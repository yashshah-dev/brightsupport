import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import StructuredData from "@/components/StructuredData";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Bright Support | NDIS Disability & Support Services in Shepparton & Melbourne",
    template: "%s | Bright Support - NDIS Services Shepparton",
  },
  description: "Trusted NDIS disability & support services provider in Shepparton, Mooroopna & Melbourne. Offering daily living support, community nursing, physiotherapy, companionship, and more. NDIS registered since 2019.",
  keywords: "NDIS, NDIS provider Shepparton, disability support Shepparton, aged care, community nursing, physiotherapy, Mooroopna, Melbourne, Australia, NDIS support services",
  authors: [{ name: "Bright Support" }],
  openGraph: {
    title: "Bright Support | NDIS Disability & Support Services in Shepparton & Melbourne",
    description: "NDIS registered disability & support services provider in Shepparton, Mooroopna & Melbourne. Daily living support, community nursing, physiotherapy, and more.",
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
    title: 'Bright Support | NDIS Support Services Shepparton & Melbourne',
    description: 'Trusted NDIS disability & support services provider. Daily living, nursing, physiotherapy & more.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.brightsupport.com.au',
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
        {/* Preload a single AVIF hero variant (mid-size) + srcset to avoid double fetch */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/hero-main-1024.avif"
          type="image/avif"
          imageSrcSet="/images/hero/hero-main-480.avif 480w, /images/hero/hero-main-768.avif 768w, /images/hero/hero-main-1024.avif 1024w, /images/hero/hero-main-1400.avif 1400w"
          imageSizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Google Analytics 4 Scripts */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                // Initialize consent settings
                gtag('consent', 'default', {
                  analytics_storage: 'granted',
                  ad_storage: 'denied',
                  functionality_storage: 'granted',
                  personalization_storage: 'denied',
                  security_storage: 'granted'
                });

                // Configure GA4 with enhanced settings
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  send_page_view: true,
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false,
                  allow_ad_features: false,
                  custom_map: {
                    'custom_parameter_1': 'user_type',
                    'custom_parameter_2': 'service_interest',
                    'custom_parameter_3': 'lead_source'
                  }
                });

                // Track initial page load performance
                if ('performance' in window && 'getEntriesByType' in performance) {
                  window.addEventListener('load', function() {
                    setTimeout(function() {
                      var navigation = performance.getEntriesByType('navigation')[0];
                      if (navigation) {
                        gtag('event', 'page_load_time', {
                          page_load_time: navigation.loadEventEnd - navigation.fetchStart,
                          dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
                          first_paint: performance.getEntriesByName('first-paint')[0] ? performance.getEntriesByName('first-paint')[0].startTime : 0,
                          first_contentful_paint: performance.getEntriesByName('first-contentful-paint')[0] ? performance.getEntriesByName('first-contentful-paint')[0].startTime : 0
                        });
                      }
                    }, 0);
                  });
                }
              `,
            }}
          />
        )}
      </head>
      <body className={`${inter.className} antialiased`}>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
