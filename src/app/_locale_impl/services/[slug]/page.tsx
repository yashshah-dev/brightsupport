import type { Metadata } from 'next';
import ServicePageClient from '@/components/ServicePageClient';
import StructuredData from '@/components/StructuredData';
import { getServiceCanonicalUrl, getServiceUrl } from '@/lib/serviceUrls';

// SEO metadata for each service page
const serviceMetadata: Record<string, { title: string; description: string; keywords?: string }> = {
    'daily-living-in-home-support': {
        title: 'Daily Living & In-Home Support Shepparton | NDIS Support Services',
        description: 'Looking for reliable in-home disability support in Shepparton? Bright Support offers daily living assistance, personal care & NDIS services. Enquire today!',
        keywords: 'daily living support Shepparton, in-home support Shepparton, NDIS daily living support, NDIS in-home care Shepparton, personal care services Shepparton, home assistance NDIS, disability support at home, NDIS personal care Shepparton, daily personal activities NDIS, home care services Shepparton, independent living support Shepparton',
    },
    'support-coordination': {
        title: 'Support Coordination Shepparton | NDIS Plan Help & Service Guidance',
        description: 'Get expert NDIS support coordination in Shepparton with Bright Support. We help you understand your plan, connect with providers & achieve your goals with confidence.',
        keywords: 'ndis support coordination Shepparton, support coordinator Shepparton, ndis support services Shepparton, ndis plan support Shepparton, ndis provider Shepparton, disability support coordination, ndis service provider Shepparton, support coordination services, ndis assistance with plan management, ndis support worker Shepparton, ndis plan implementation support',
    },
    'community-nursing-complex-care': {
        title: 'Community Nursing & Complex Care Shepparton | NDIS Nursing Support',
        description: 'Get expert community nursing & complex care in Shepparton with Bright Support. We provide NDIS clinical support, medication management & 24/7 nursing care tailored to your needs.',
        keywords: 'community nursing Shepparton, complex care Shepparton, NDIS nursing services, clinical care at home, disability nursing support, home nursing care Shepparton, complex medical care services',
    },
    'physiotherapy-services': {
        title: 'Physiotherapy Services Shepparton | NDIS Rehabilitation & Mobility Support',
        description: 'Get expert physiotherapy services in Shepparton with Bright Support. We provide NDIS rehabilitation, pain management & mobility support to help you recover and live independently.',
        keywords: 'physiotherapy Shepparton, NDIS physiotherapy services, rehabilitation services Shepparton, pain management physiotherapy, mobility support therapy, injury recovery physiotherapy, home physiotherapy services',
    },
    'community-participation-group-programs': {
        title: 'Community Participation & Group Programs Shepparton | NDIS Social Support',
        description: 'Join engaging community participation & group programs in Shepparton with Bright Support. Build social skills, confidence & independence through NDIS-supported activities.',
        keywords: 'community participation Shepparton, NDIS community participation, group programs Shepparton, social support services, NDIS social activities, community access support, disability group activities',
    },
    'companionship': {
        title: 'Companionship Services - NDIS Support Shepparton',
        description: 'NDIS companionship services in Shepparton. Meaningful companionship and emotional support to reduce isolation and improve wellbeing through genuine connections.',
    },
    'travel-transport-assistance': {
        title: 'NDIS Transport Shepparton | Bright Support',
        description: 'NDIS transport services in Shepparton — safe, reliable travel to medical appointments, social outings, and community activities. Wheelchair-accessible vehicles available.',
    },
    'hydrotherapy-pool-session': {
        title: 'Hydrotherapy Shepparton | NDIS Water-Based Physiotherapy Services',
        description: 'Get expert NDIS hydrotherapy services in Shepparton with Bright Support. Improve mobility, reduce pain & build strength with water-based physiotherapy tailored to your needs.',
        keywords: 'hydrotherapy Shepparton, NDIS hydrotherapy services, aquatic therapy Shepparton, water-based physiotherapy, rehabilitation therapy Shepparton, pain relief therapy, mobility improvement therapy',
    },
    'personal-training-sessions': {
        title: 'Personal Training Sessions Shepparton | NDIS Fitness & Strength Coaching',
        description: 'Get expert personal training sessions in Shepparton with Bright Support. Improve strength, mobility & overall fitness with personalised NDIS-supported training programs.',
        keywords: 'personal training Shepparton, personal trainer Shepparton, NDIS personal training, fitness training services, strength training Shepparton, rehabilitation fitness training, mobility improvement training',
    },
    'positive-behaviour-support': {
        title: 'Positive Behaviour Support Shepparton | NDIS Behaviour Support Services',
        description: 'Get expert Positive Behaviour Support in Shepparton with Bright Support. We create personalised NDIS behaviour support plans to improve quality of life & reduce behaviours of concern.',
        keywords: 'positive behaviour support Shepparton, NDIS behaviour support, behaviour support services Shepparton, behaviour support plan NDIS, PBS services Australia, disability behaviour support, behaviour intervention support',
    },
    'professional-cleaning': {
        title: 'NDIS Cleaning Shepparton | Bright Support',
        description: 'NDIS cleaning services in Shepparton — house cleaning, laundry, and home maintenance for NDIS participants. Trusted local cleaners who work to your standards.',
    },
    'independent-living-accommodation-support': {
        title: 'Supported Independent Living (SIL) Shepparton | NDIS Accommodation Support',
        description: 'Get trusted SIL accommodation in Shepparton with Bright Support. We provide 24/7 support, personal care & independent living solutions under NDIS.',
        keywords: 'supported independent living Shepparton, SIL Shepparton, NDIS SIL provider Shepparton, SIL accommodation Shepparton, NDIS supported independent living, disability accommodation Shepparton, NDIS housing support Shepparton, independent living support Shepparton, 24/7 disability support Shepparton, NDIS home and living support, SIL services Australia',
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

    const pageUrl = getServiceCanonicalUrl(slug);

    return {
        title: meta.title,
        description: meta.description,
        ...(meta.keywords && { keywords: meta.keywords }),
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: pageUrl,
        },
        alternates: {
            canonical: pageUrl,
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
    const liveUrl = getServiceCanonicalUrl(slug);

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
            <StructuredData
                type="BreadcrumbList"
                data={{
                    items: [
                        { name: 'Home', item: 'https://www.brightsupport.com.au/' },
                        { name: 'Our Services', item: 'https://www.brightsupport.com.au/our-services' },
                        { name: meta.title.split('|')[0].trim(), item: liveUrl },
                    ],
                }}
            />
            <ServicePageClient slug={slug} heroImage={heroImage} galleryImages={galleryImages} />
        </>
    );
}
