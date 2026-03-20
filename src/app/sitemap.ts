import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';

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
  '/blog',     // Added blog listing page
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
  languages['x-default'] = `${BASE_URL}/en${path}`;
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

  // Locale-prefixed main pages
  for (const locale of locales) {
    for (const page of mainPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 0.9 : 0.7,
        alternates: generateAlternates(page),
      });
    }
  }

  // Blog Post Pages (Canonical & Multilingual)
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

    // Multilingual URLs for blog posts
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${blogPath}/`,
        lastModified: post.updatedAt || pubDate,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: generateAlternates(blogPath),
      });
    }
  }

  // Canonical service pages (match the canonical tags set in service page metadata)
  for (const slug of serviceSlugs) {
    const images = serviceImages[slug];
    entries.push({
      url: `${BASE_URL}/services/${slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: generateAlternates(`/services/${slug}`),
      ...(images && {
        images: images.map(img => `${BASE_URL}${img}`),
      }),
    });
  }

  // Locale-prefixed service pages
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

  // Static pages
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
