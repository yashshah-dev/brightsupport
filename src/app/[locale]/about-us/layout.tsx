import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - Our Story & Mission',
    description: 'Learn about Bright Support, a trusted NDIS provider in Shepparton since 2019. Meet our team of nurses, physios and support workers.',
    openGraph: {
        title: 'About Us | Bright Support - NDIS Services Shepparton',
        description: 'Meet our experienced team providing NDIS disability & support services in Shepparton & Mooroopna.',
    },
    alternates: {
        canonical: 'https://www.brightsupport.com.au/about-us/',
    },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
