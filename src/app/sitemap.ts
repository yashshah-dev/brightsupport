import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';

export const dynamic = "force-static";

const BASE_URL = 'https://brightsupport.com.au';

// Mapping of internal slugs to live site URLs
const serviceUrlMapping: Record<string, string> = {
  'daily-living-in-home-support': '/dailylivingin-homesupport',
  'community-nursing-complex-care': '/communitynursingandcomplexcare',
  'physiotherapy-services': '/physiotherapyservices',
  'community-participation-group-programs': '/communityparticipationgroupprograms',
  'companionship': '/companion-care-services',
  'travel-transport-assistance': '/ndis-transport-service-provider',
  'hydrotherapy-pool-session': '/ndis-hydrotherapy-services',
  'personal-training-sessions': '/ndispersonaltrainingsessions',
  'positive-behaviour-support': '/positivebehavioursupport',
  'professional-cleaning': '/ndis-cleaning-services',
  'independent-living-accommodation-support': '/independent-living-accommodation-support',
  'support-coordination': '/ndis-support-coordination',
};

const serviceSlugs = Object.keys(serviceUrlMapping);

const mainPages = [
  '',          // homepage
  '/about-us',
  '/our-services',
  '/blog',     // Added blog listing page
  '/contact-us',
  '/career',
  '/privacy-policy',
  '/thank-you',
  '/our-location',
  '/accommodation-support-services',
];

// Image mapping for service pages (for image sitemap)
const serviceImages: Record<string, string[]> = {
  'daily-living-in-home-support': ['/images/services/daily-living.webp'],
  'community-nursing-complex-care': ['/images/services/nursing.webp'],
  'physiotherapy-services': ['/images/services/physiotherapy.webp'],
  'community-participation-group-programs': ['/images/services/community-participation.webp'],
  'companionship': ['/images/services/companionship.webp'],
  'travel-transport-assistance': ['/images/services/transport.webp'],
  'hydrotherapy-pool-session': ['/images/services/hydrotherapy.png'],
  'personal-training-sessions': ['/images/services/personal-training.png'],
  'positive-behaviour-support': ['/images/services/positive-behaviour-support.png'],
  'independent-living-accommodation-support': ['/images/services/independent-living.webp'],
  'support-coordination': ['/images/services/support-coordination.webp'],
};

function generateAlternates(path: string) {
  const languages: Record<string, string> = {
    en: `${BASE_URL}${path}`,
    'x-default': `${BASE_URL}${path}`,
  };
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date().toISOString();
  const blogPosts = getBlogPosts();

  // Canonical non-locale main pages (match what's in each layout's canonical tag)
  for (const page of mainPages) {
    entries.push({
      url: page === '' ? BASE_URL : `${BASE_URL}${page}/`,
      lastModified: now,
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: generateAlternates(page),
    });
  }

  // Blog Post Pages
  for (const post of blogPosts) {
    const blogPath = `/blog/${post.slug}`;
    const pubDate = post.publishedAt || now;
    
    // Canonical URL for blog posts
    entries.push({
      url: `${BASE_URL}${blogPath}/`,
      lastModified: post.updatedAt || pubDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: generateAlternates(blogPath),
      ...(post.coverImage && {
        images: [`${BASE_URL}${post.coverImage}`],
      }),
    });

  }

  // Canonical service pages (match the canonical tags set in service page metadata)
  for (const slug of serviceSlugs) {
    const images = serviceImages[slug];
    const liveUrl = serviceUrlMapping[slug];
    entries.push({
      url: `${BASE_URL}${liveUrl}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: generateAlternates(liveUrl),
      ...(images && {
        images: images.map(img => `${BASE_URL}${img}`),
      }),
    });
  }

  // Static pages
  entries.push({
    url: `${BASE_URL}/privacy-policy`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.3,
  });

  entries.push({
    url: `${BASE_URL}/landing/ndis-support`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  });

  return entries;
}
