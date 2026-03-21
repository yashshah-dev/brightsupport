import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import "./globals.css";

import StructuredData from "@/components/StructuredData";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import enMessages from '../../messages/en.json';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Bright Support | NDIS Support Services Shepparton",
    template: "%s | Bright Support NDIS Shepparton",
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
  alternates: {
    canonical: 'https://www.brightsupport.com.au',
  },
  metadataBase: new URL('https://www.brightsupport.com.au'),
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-2EXWNERWT2';
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17576617769';
const GTAG_SCRIPT_ID = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;

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
        <StructuredData
          type="FAQPage"
          data={{
            questions: [
              {
                '@type': 'Question',
                name: 'What is the NDIS and how does Bright Support help?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The NDIS (National Disability Insurance Scheme) is an Australian government initiative funding support for people with permanent and significant disabilities. Bright Support is a registered NDIS provider in Shepparton offering daily living support, community nursing, physiotherapy, companionship, transport, and more.',
                },
              },
              {
                '@type': 'Question',
                name: 'What NDIS services does Bright Support offer in Shepparton?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bright Support offers daily living & in-home support, community nursing & complex care, physiotherapy, community participation & group programs, companionship, travel & transport assistance, hydrotherapy, personal training, positive behaviour support, professional cleaning, and independent living accommodation support.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I access NDIS services from Bright Support if I already receive support from other programs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. You may access NDIS services even if you currently receive support from other programs. The NDIS works alongside existing supports where possible. Contact us to discuss your individual situation and plan.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where does Bright Support provide NDIS services?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bright Support provides NDIS disability support services across Shepparton, Mooroopna, and surrounding suburbs in Victoria, Australia.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I get started with Bright Support?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Call us on 1800 407 508 or fill in our online contact form. We respond within 24 hours and can help you understand your NDIS plan and which services suit your needs.',
                },
              },
            ],
          }}
        />
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
        {/* Microsoft Clarity Script */}
        <script
          id="microsoft-clarity"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");`,
          }}
        />
        {/* Google Analytics 4 + Google Ads Scripts */}
        {GTAG_SCRIPT_ID && (
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_SCRIPT_ID}`}
          />
        )}
        {GTAG_SCRIPT_ID && (
          <Script
            id="google-analytics-and-ads"
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
                ${GA_MEASUREMENT_ID ? `
                gtag('config', '${GA_MEASUREMENT_ID}', {
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
                ` : ''}

                // Configure Google Ads tag
                ${GOOGLE_ADS_ID ? `
                gtag('config', '${GOOGLE_ADS_ID}');
                ` : ''}

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
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <Header />
          <main className="min-h-screen">
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </main>
          <Footer />
          <Chatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
