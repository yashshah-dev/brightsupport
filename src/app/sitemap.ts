import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';

export const dynamic = "force-static";

const BASE_URL = 'https://www.brightsupport.com.au';

function toCanonicalUrl(path: string) {
  if (!path || path === '/') return BASE_URL;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
}

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
  'independent-living-accommodation-support': '/supported-independent-living-sil-shepparton',
  'support-coordination': '/ndis-support-coordination',
};

const serviceSlugs = Object.keys(serviceUrlMapping);

const mainPages = [
  '',          // homepage
  '/about-us',
  '/our-services',
  '/blog',     // Added blog listing page
  '/contact-us',
  '/registered-ndis-provider-shepparton',
  '/thank-you',
  '/career',
  '/privacy-policy',
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
  const canonical = toCanonicalUrl(path);
  const languages: Record<string, string> = {
    en: canonical,
    'x-default': canonical,
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
      url: toCanonicalUrl(page),
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
      url: toCanonicalUrl(blogPath),
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
      url: toCanonicalUrl(liveUrl),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: generateAlternates(liveUrl),
      ...(images && {
        images: images.map(img => `${BASE_URL}${img}`),
      }),
    });
  }

  // Additional landing pages not included in mainPages
  entries.push({
    url: toCanonicalUrl('/landing/ndis-support'),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
    alternates: generateAlternates('/landing/ndis-support'),
  });

  return entries;
}
