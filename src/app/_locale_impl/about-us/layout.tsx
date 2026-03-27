import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const BASE_URL = 'https://brightsupport.com.au';
    const pageUrl = `${BASE_URL}/about-us/`;

    return {
        title: 'About Us - Our Story & Mission',
        description: 'Learn about Bright Support, a trusted NDIS provider in Shepparton since 2019. Meet our team of nurses, physios and support workers.',
        openGraph: {
            title: 'About Us | Bright Support - NDIS Services Shepparton',
            description: 'Meet our experienced team providing NDIS disability & support services in Shepparton & Mooroopna.',
        },
        alternates: {
            languages: { en: pageUrl, 'x-default': pageUrl },
        },
    };
}

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
