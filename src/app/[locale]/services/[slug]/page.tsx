import { locales } from '@/i18n/config';
import ServicePageClient from '@/components/ServicePageClient';

// Generate static params for all locale + service combinations
const serviceSlugs = [
    'daily-living-in-home-support',
    'community-nursing-complex-care',
    'physiotherapy-services',
    'community-participation-group-programs',
    'companionship',
    'travel-transport-assistance',
    'hydrotherapy-pool-session',
    'personal-training-sessions',
    'positive-behaviour-support',
    'professional-cleaning',
    'independent-living-accommodation-support',
];

export function generateStaticParams() {
    const params = [];
    for (const locale of locales) {
        for (const slug of serviceSlugs) {
            params.push({ locale, slug });
        }
    }
    return params;
}

interface ServicePageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    return <ServicePageClient slug={slug} />;
}
