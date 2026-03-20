import type { Metadata } from 'next';
import { locales, Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
    const BASE_URL = 'https://www.brightsupport.com.au';
    
    // Build hreflang alternate URLs
    const languages: Record<string, string> = {};
    for (const l of locales) {
        languages[l] = `${BASE_URL}/${l}/about-us/`;
    }
    languages['x-default'] = `${BASE_URL}/en/about-us/`;

    return {
        title: 'About Us - Our Story & Mission',
        description: 'Learn about Bright Support, a trusted NDIS provider in Shepparton since 2019. Meet our team of nurses, physios and support workers.',
        openGraph: {
            title: 'About Us | Bright Support - NDIS Services Shepparton',
            description: 'Meet our experienced team providing NDIS disability & support services in Shepparton & Mooroopna.',
        },
        alternates: {
            canonical: `${BASE_URL}/${validLocale}/about-us/`,
            languages,
        },
    };
}

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
