import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Careers - Join Our Disability Support Team',
    description: 'Join our Bright Support team in Shepparton & Melbourne. We are looking for dedicated Support Workers, Registered Nurses, and Physiotherapists. Competitive pay, flexible hours, and career growth opportunities.',
    openGraph: {
        title: 'Careers | Join Bright Support Team - NDIS Services',
        description: 'Build a rewarding career in disability support services. Join our growing team in Shepparton & Melbourne.',
    },
    alternates: {
        canonical: 'https://www.brightsupport.com.au/career/',
    },
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
    return children;
}
