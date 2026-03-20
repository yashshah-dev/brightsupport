import type { Metadata } from 'next';
import { locales, Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
    const BASE_URL = 'https://www.brightsupport.com.au';
    
    // Build hreflang alternate URLs
    const languages: Record<string, string> = {};
    for (const l of locales) {
        languages[l] = `${BASE_URL}/${l}/career/`;
    }
    languages['x-default'] = `${BASE_URL}/en/career/`;

    return {
        title: 'Careers - Join Our Disability Support Team',
        description: 'Join our team in Shepparton. We need dedicated Support Workers, Registered Nurses and Physiotherapists. Competitive pay and flexible hours.',
        openGraph: {
            title: 'Careers | Join Bright Support Team - NDIS Services',
            description: 'Build a rewarding career in disability support services. Join our growing team in Shepparton.',
        },
        alternates: {
            canonical: `${BASE_URL}/${validLocale}/career/`,
            languages,
        },
    };
}

export default function CareerLayout({ children }: { children: React.ReactNode }) {
    return children;
}
