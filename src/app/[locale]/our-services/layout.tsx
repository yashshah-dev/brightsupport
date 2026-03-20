import type { Metadata } from 'next';
import { locales, Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
    const BASE_URL = 'https://www.brightsupport.com.au';
    
    // Build hreflang alternate URLs
    const languages: Record<string, string> = {};
    for (const l of locales) {
        languages[l] = `${BASE_URL}/${l}/our-services/`;
    }
    languages['x-default'] = `${BASE_URL}/en/our-services/`;

    return {
        title: 'Our NDIS Services - Disability Support & Care',
        description: 'Explore NDIS services in Shepparton: daily living support, community nursing, physiotherapy, community participation, companionship and more.',
        openGraph: {
            title: 'Our NDIS Services | Bright Support Shepparton',
            description: 'Comprehensive NDIS disability support services including daily living, nursing, physiotherapy, community programs, and more.',
        },
        alternates: {
            canonical: `${BASE_URL}/${validLocale}/our-services/`,
            languages,
        },
    };
}

export default function OurServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
