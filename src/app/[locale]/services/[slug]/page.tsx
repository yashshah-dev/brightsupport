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

const imageMap: Record<string, string> = {
    'daily-living-in-home-support': '/images/services/daily-living.webp',
    'community-nursing-complex-care': '/images/services/nursing.webp',
    'physiotherapy-services': '/images/services/physiotherapy.webp',
    'community-participation-group-programs': '/images/services/community-participation.webp',
    'companionship': '/images/services/companionship.webp',
    'travel-transport-assistance': '/images/services/transport.webp',
};

const galleryMap: Record<string, string[]> = {
    'daily-living-in-home-support': [
        '/images/services/daily-living/gallery-1.jpg',
        '/images/services/daily-living/gallery-2.jpg',
        '/images/services/daily-living/gallery-3.jpg',
    ],
    'community-nursing-complex-care': [
        '/images/services/community-nursing/gallery-3.jpg',
        '/images/services/community-nursing/gallery-2.jpg',
        '/images/services/community-nursing/gallery-1.png',
    ],
    'physiotherapy-services': [
        '/images/services/physiotherapy/gallery-1.png',
        '/images/services/physiotherapy/gallery-2.jpg',
        '/images/services/physiotherapy/gallery-3.jpg',
    ],
    'community-participation-group-programs': [
        '/images/services/community-participation/gallery-1.jpg',
        '/images/services/community-participation/gallery-3.jpg',
        '/images/services/community-participation/gallery-2.jpg',
    ],
    'companionship': [
        '/images/services/companionship/gallery-2.jpg',
        '/images/services/companionship/gallery-3.jpg',
        '/images/services/companionship/gallery-1.jpg',
    ],
};

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const heroImage = imageMap[slug];
    const galleryImages = galleryMap[slug];

    return <ServicePageClient slug={slug} heroImage={heroImage} galleryImages={galleryImages} />;
}
