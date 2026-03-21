import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const BASE_URL = 'https://www.brightsupport.com.au';
    const canonical = `${BASE_URL}/career/`;

    return {
        title: 'Careers - Join Our Disability Support Team',
        description: 'Join our team in Shepparton. We need dedicated Support Workers, Registered Nurses and Physiotherapists. Competitive pay and flexible hours.',
        openGraph: {
            title: 'Careers | Join Bright Support Team - NDIS Services',
            description: 'Build a rewarding career in disability support services. Join our growing team in Shepparton.',
        },
        alternates: {
            canonical,
            languages: { en: canonical, 'x-default': canonical },
        },
    };
}

export default function CareerLayout({ children }: { children: React.ReactNode }) {
    return children;
}
