import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const BASE_URL = 'https://www.brightsupport.com.au';
    const pageUrl = `${BASE_URL}/contact-us/`;

    return {
        title: 'Contact Us - NDIS Support Services Shepparton',
        description: 'Contact Bright Support for NDIS services. Call 1800 407 508 or visit us at 279 Wyndham St, Shepparton VIC 3630. We respond within 24 hours.',
        openGraph: {
            title: 'Contact Us | Bright Support - NDIS Services Shepparton',
            description: 'Get in touch with Bright Support for NDIS services. Call 1800 407 508 or visit our Shepparton office.',
        },
        alternates: {
            languages: { en: pageUrl, 'x-default': pageUrl },
        },
    };
}

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
