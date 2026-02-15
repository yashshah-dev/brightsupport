import type { MetadataRoute } from 'next';

export const dynamic = "force-static";

const BASE_URL = 'https://www.brightsupport.com.au';

const locales = ['en', 'zh', 'ar', 'vi'] as const;

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

const mainPages = [
  '',          // homepage
  '/about-us',
  '/our-services',
  '/contact-us',
  '/career',
];

// Image mapping for service pages (for image sitemap)
const serviceImages: Record<string, string[]> = {
  'daily-living-in-home-support': ['/images/services/daily-living.webp'],
  'community-nursing-complex-care': ['/images/services/nursing.webp'],
  'physiotherapy-services': ['/images/services/physiotherapy.webp'],
  'community-participation-group-programs': ['/images/services/community-participation.webp'],
  'companionship': ['/images/services/companionship.webp'],
  'travel-transport-assistance': ['/images/services/transport.webp'],
};

function generateAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${BASE_URL}/${locale}${path}`;
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date().toISOString();

  // Main pages with all locale variants
  for (const locale of locales) {
    for (const page of mainPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: generateAlternates(page),
      });
    }
  }

  // Service pages with all locale variants + images
  for (const locale of locales) {
    for (const slug of serviceSlugs) {
      const images = serviceImages[slug];
      entries.push({
        url: `${BASE_URL}/${locale}/services/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: generateAlternates(`/services/${slug}`),
        ...(images && {
          images: images.map(img => `${BASE_URL}${img}`),
        }),
      });
    }
  }

  // Static pages (privacy policy, NDIS landing)
  entries.push({
    url: `${BASE_URL}/privacy-policy`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.3,
  });

  entries.push({
    url: `${BASE_URL}/en/landing/ndis-support`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  });

  return entries;
}
