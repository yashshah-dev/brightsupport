import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const BASE_URL = 'https://www.brightsupport.com.au';
    const pageUrl = `${BASE_URL}/career/`;

    return {
        title: 'Careers - Join Our Disability Support Team',
        description: 'Join our team in Shepparton. We need dedicated Support Workers, Registered Nurses and Physiotherapists. Competitive pay and flexible hours.',
        openGraph: {
            title: 'Careers | Join Bright Support Team - NDIS Services',
            description: 'Build a rewarding career in disability support services. Join our growing team in Shepparton.',
        },
        alternates: {
            languages: { en: pageUrl, 'x-default': pageUrl },
        },
    };
}

export default function CareerLayout({ children }: { children: React.ReactNode }) {
    return children;
}
