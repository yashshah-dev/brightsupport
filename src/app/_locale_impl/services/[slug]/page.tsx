import type { Metadata } from 'next';
import ServicePageClient from '@/components/ServicePageClient';
import StructuredData from '@/components/StructuredData';
import { getServiceUrl } from '@/lib/serviceUrls';

// SEO metadata for each service page
const serviceMetadata: Record<string, { title: string; description: string }> = {
    'daily-living-in-home-support': {
        title: 'Daily Living & In-Home Support Services - NDIS Shepparton',
        description: 'Empowering independence with expert daily living and in-home support for NDIS participants in Shepparton. Personal care, meal prep, and household assistance.',
    },
    'support-coordination': {
        title: 'Support Coordination Shepparton | NDIS Plan Management | Bright Support',
        description: 'Support coordination in Shepparton to help you navigate your NDIS plan, connect with local providers, and build long-term capacity. Bright Support also assists with NDIS plan management guidance.',
    },
    'community-nursing-complex-care': {
        title: 'Community Nursing Care Shepparton | NDIS Complex Care | Bright Support',
        description: 'Expert community nursing care in Shepparton for NDIS participants. Registered Nurses provide wound care, medication management, catheter care, and complex care in the comfort of your home.',
    },
    'physiotherapy-services': {
        title: 'Physiotherapy Services - NDIS Provider Shepparton',
        description: 'NDIS physiotherapy services in Shepparton. Personalised treatment for neurological, musculoskeletal, and cardio-pulmonary conditions. Home visits available.',
    },
    'community-participation-group-programs': {
        title: 'NDIS Community Participation Shepparton | Group Programs | Bright Support',
        description: 'NDIS community participation programs in Shepparton — social activities, group outings, and skills development. Bright Support helps NDIS participants build connections and thrive locally.',
    },
    'companionship': {
        title: 'Companionship Services - NDIS Support Shepparton',
        description: 'NDIS companionship services in Shepparton. Meaningful companionship and emotional support to reduce isolation and improve wellbeing through genuine connections.',
    },
    'travel-transport-assistance': {
        title: 'NDIS Transport Shepparton | Travel & Transport Assistance | Bright Support',
        description: 'NDIS transport services in Shepparton — safe, reliable travel to medical appointments, social outings, and community activities. Wheelchair-accessible vehicles available.',
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
        title: 'NDIS Cleaning Services Shepparton | House Cleaning | Bright Support',
        description: 'NDIS cleaning services in Shepparton — house cleaning, laundry, and home maintenance for NDIS participants. Trusted local cleaners who work to your standards.',
    },
    'independent-living-accommodation-support': {
        title: 'NDIS Accommodation Shepparton | Supported Independent Living (SIL) | Bright Support',
        description: 'NDIS accommodation and supported independent living (SIL) in Shepparton. Bright Support offers current SIL vacancies, 24-hour support, and individualised disability accommodation tailored to your NDIS goals.',
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
    const livePath = getServiceUrl(slug);
    const pageUrl = `${BASE_URL}${livePath}/`;

    return {
        title: meta.title,
        description: meta.description,
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: pageUrl,
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
    const livePath = getServiceUrl(slug);
    const liveUrl = `https://www.brightsupport.com.au${livePath}/`;

    return (
        <>
            <StructuredData
                type="Service"
                data={{
                    name: meta.title,
                    description: meta.description,
                    serviceType: meta.title,
                    url: liveUrl,
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
