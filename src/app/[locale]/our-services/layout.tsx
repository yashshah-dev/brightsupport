import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our NDIS Services - Disability Support & Care',
    description: 'Explore our comprehensive NDIS services in Shepparton & Melbourne: daily living support, community nursing, physiotherapy, community participation, companionship, transport assistance, and more.',
    openGraph: {
        title: 'Our NDIS Services | Bright Support Shepparton & Melbourne',
        description: 'Comprehensive NDIS disability support services including daily living, nursing, physiotherapy, community programs, and more.',
    },
    alternates: {
        canonical: 'https://www.brightsupport.com.au/our-services/',
    },
};

export default function OurServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
