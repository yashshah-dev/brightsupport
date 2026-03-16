import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our NDIS Services - Disability Support & Care',
    description: 'Explore NDIS services in Shepparton: daily living support, community nursing, physiotherapy, community participation, companionship and more.',
    openGraph: {
        title: 'Our NDIS Services | Bright Support Shepparton',
        description: 'Comprehensive NDIS disability support services including daily living, nursing, physiotherapy, community programs, and more.',
    },
    alternates: {
        canonical: 'https://www.brightsupport.com.au/our-services/',
    },
};

export default function OurServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
