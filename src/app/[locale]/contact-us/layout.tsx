import type { Metadata } from 'next';
import { locales, Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
    const BASE_URL = 'https://www.brightsupport.com.au';
    
    // Build hreflang alternate URLs
    const languages: Record<string, string> = {};
    for (const l of locales) {
        languages[l] = `${BASE_URL}/${l}/contact-us/`;
    }
    languages['x-default'] = `${BASE_URL}/en/contact-us/`;

    return {
        title: 'Contact Us - NDIS Support Services Shepparton',
        description: 'Contact Bright Support for NDIS services. Call 1800 407 508 or visit us at 279 Wyndham St, Shepparton VIC 3630. We respond within 24 hours.',
        openGraph: {
            title: 'Contact Us | Bright Support - NDIS Services Shepparton',
            description: 'Get in touch with Bright Support for NDIS services. Call 1800 407 508 or visit our Shepparton office.',
        },
        alternates: {
            canonical: `${BASE_URL}/${validLocale}/contact-us/`,
            languages,
        },
    };
}

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
