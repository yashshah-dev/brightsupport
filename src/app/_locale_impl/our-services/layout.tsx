import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const BASE_URL = 'https://brightsupport.com.au';
    const pageUrl = `${BASE_URL}/our-services/`;

    return {
        title: 'Our NDIS Services - Disability Support & Care',
        description: 'Explore NDIS services in Shepparton: daily living support, community nursing, physiotherapy, community participation, companionship and more.',
        openGraph: {
            title: 'Our NDIS Services | Bright Support Shepparton',
            description: 'Comprehensive NDIS disability support services including daily living, nursing, physiotherapy, community programs, and more.',
        },
        alternates: {
            languages: { en: pageUrl, 'x-default': pageUrl },
        },
    };
}

export default function OurServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
