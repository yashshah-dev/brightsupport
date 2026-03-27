import type { Metadata } from 'next';
import ServicePageClient from '@/components/ServicePageClient';
import StructuredData from '@/components/StructuredData';

// SEO metadata for each service page
const serviceMetadata: Record<string, { title: string; description: string }> = {
    'daily-living-in-home-support': {
        title: 'Daily Living & In-Home Support Services - NDIS Shepparton | Bright Support',
        description: 'Empowering independence with expert daily living and in-home support for NDIS participants in Shepparton. Personal care, meal prep, and household assistance.',
    },
    'support-coordination': {
        title: 'NDIS Support Coordination Shepparton | Bright Support',
        description: 'Expert NDIS Support Coordination to help you navigate your plan, connect with the right providers, and achieve your personal goals.',
    },
    'community-nursing-complex-care': {
        title: 'Community Nursing & Complex Care - NDIS Services Shepparton',
        description: 'Expert community nursing and complex care services in Shepparton. Medication management, wound care, catheter care, and support for complex medical needs by qualified Registered Nurses.',
    },
    'physiotherapy-services': {
        title: 'Physiotherapy Services - NDIS Provider Shepparton',
        description: 'NDIS physiotherapy services in Shepparton. Personalised treatment for neurological, musculoskeletal, and cardio-pulmonary conditions. Home visits available.',
    },
    'community-participation-group-programs': {
        title: 'Community Participation & Group Programs - NDIS Shepparton',
        description: 'NDIS community participation and group programs in Shepparton. Social activities, skills development, and community outings to build connections and enhance quality of life.',
    },
    'companionship': {
        title: 'Companionship Services - NDIS Support Shepparton',
        description: 'NDIS companionship services in Shepparton. Meaningful companionship and emotional support to reduce isolation and improve wellbeing through genuine connections.',
    },
    'travel-transport-assistance': {
        title: 'Travel & Transport Assistance - NDIS Shepparton',
        description: 'NDIS travel and transport assistance in Shepparton. Safe, reliable transport to appointments, social outings, and community activities. Wheelchair-accessible vehicles available.',
    },
    'hydrotherapy-pool-session': {
        title: 'Hydrotherapy & Pool Sessions - NDIS Shepparton',
        description: 'NDIS hydrotherapy and pool session services in Shepparton. Water-based therapy for pain management, mobility improvement, and rehabilitation.',
    },
    'personal-training-sessions': {
        title: 'Personal Training Sessions - NDIS Shepparton',
        description: 'NDIS personal training sessions in Shepparton. Tailored exercise programs to improve physical fitness, strength, and overall wellbeing.',
    },
    'positive-behaviour-support': {
        title: 'Positive Behaviour Support - NDIS Shepparton',
        description: 'NDIS positive behaviour support services in Shepparton. Evidence-based strategies to understand behaviour and develop positive support plans.',
    },
    'professional-cleaning': {
        title: 'Professional Cleaning Services - NDIS Shepparton',
        description: 'NDIS professional cleaning services in Shepparton. Reliable house cleaning, laundry, and home maintenance support for NDIS participants.',
    },
    'independent-living-accommodation-support': {
        title: 'Independent Living & Accommodation Support - NDIS Shepparton',
        description: 'NDIS independent living and accommodation support in Shepparton. Assistance finding suitable accommodation, tenancy support, and supported independent living (SIL).',
    },
};

// Generate static params for all locale + service combinations
const serviceSlugs = Object.keys(serviceMetadata);

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const meta = serviceMetadata[slug] || {
        title: 'NDIS Support Services',
        description: 'NDIS disability and support services by Bright Support in Shepparton.',
    };

    const BASE_URL = 'https://www.brightsupport.com.au';
    const pageUrl = `${BASE_URL}/${slug}/`;

    return {
        title: meta.title,
        description: meta.description,
        openGraph: {
            title: meta.title,
            description: meta.description,
        },
        alternates: {
            languages: { en: pageUrl, 'x-default': pageUrl },
        },
    };
}

export function generateStaticParams() {
    const params = [];
    for (const slug of serviceSlugs) {
        params.push({ locale: 'en', slug });
    }
    return params;
}

interface ServicePageProps {
    params: Promise<{ locale: string; slug: string }>;
}

const imageMap: Record<string, string> = {
    'community-nursing-complex-care': '/images/services/nursing.webp',
    'physiotherapy-services': '/images/services/physiotherapy.webp',
    'community-participation-group-programs': '/images/services/community-participation.webp',
    'companionship': '/images/services/companionship.webp',
    'travel-transport-assistance': '/images/services/transport.webp',
    'hydrotherapy-pool-session': '/images/services/hydrotherapy.png',
    'personal-training-sessions': '/images/services/personal-training.png',
    'positive-behaviour-support': '/images/services/positive-behaviour-support.png',
    'daily-living-in-home-support': '/images/services/daily-living.webp',
    'support-coordination': '/images/services/support-coordination.webp',
    'independent-living-accommodation-support': '/images/services/independent-living.webp',
};

const galleryMap: Record<string, string[]> = {
    'daily-living-in-home-support': [
        '/images/services/daily-living/gallery-1.jpg',
        '/images/services/daily-living/gallery-2.jpg',
        '/images/services/daily-living/gallery-3.jpg',
    ],
    'support-coordination': [
        '/images/services/support-coordination/gallery-1.webp',
        '/images/services/support-coordination/gallery-2.webp',
        '/images/services/support-coordination/gallery-3.webp',
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
    'hydrotherapy-pool-session': [
        '/images/services/hydrotherapy/gallery-1.png',
        '/images/services/hydrotherapy/gallery-3.png',
        '/images/services/hydrotherapy/gallery-2.png',
    ],
    'personal-training-sessions': [
        '/images/services/personal-training/gallery-1.png',
        '/images/services/personal-training/gallery-2.png',
        '/images/services/personal-training/gallery-3.png',
    ],
    'positive-behaviour-support': [
        '/images/services/positive-behaviour-support/gallery-3.png',
        '/images/services/positive-behaviour-support/gallery-2.png',
        '/images/services/positive-behaviour-support/gallery-1.png',
    ],
    'professional-cleaning': [
    ],
    'independent-living-accommodation-support': [
        '/images/services/independent-living/gallery-1.webp',
        '/images/services/independent-living/gallery-2.webp',
        '/images/services/independent-living/gallery-3.webp',
    ],
};

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const heroImage = imageMap[slug];
    const galleryImages = galleryMap[slug];
    const meta = serviceMetadata[slug] || { title: 'NDIS Support Services', description: 'NDIS disability and support services by Bright Support in Shepparton.' };

    return (
        <>
            <StructuredData
                type="Service"
                data={{
                    name: meta.title,
                    description: meta.description,
                    serviceType: meta.title,
                    url: `https://www.brightsupport.com.au/services/${slug}/`,
                    areaServed: {
                        '@type': 'City',
                        name: 'Shepparton',
                        containedInPlace: {
                            '@type': 'State',
                            name: 'Victoria',
                            containedInPlace: { '@type': 'Country', name: 'Australia' },
                        },
                    },
                }}
            />
            <ServicePageClient slug={slug} heroImage={heroImage} galleryImages={galleryImages} />
        </>
    );
}
