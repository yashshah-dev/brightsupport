import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const BASE_URL = 'https://www.brightsupport.com.au';
    const canonical = `${BASE_URL}/our-services/`;

    return {
        title: 'Our NDIS Services - Disability Support & Care',
        description: 'Explore NDIS services in Shepparton: daily living support, community nursing, physiotherapy, community participation, companionship and more.',
        openGraph: {
            title: 'Our NDIS Services | Bright Support Shepparton',
            description: 'Comprehensive NDIS disability support services including daily living, nursing, physiotherapy, community programs, and more.',
        },
        alternates: {
            canonical,
            languages: { en: canonical, 'x-default': canonical },
        },
    };
}

export default function OurServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
