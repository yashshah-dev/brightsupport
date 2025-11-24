import { MetadataRoute } from 'next';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.brightsupport.com.au';
  
  // Main pages
  const mainPages = [
    '',
    '/about-us',
    '/our-services',
    '/career',
    '/contact-us',
    '/privacy-policy',
  ];

  // Service pages
  const servicePages = [
    '/services/daily-living-in-home-support',
    '/services/independent-living-accommodation-support',
    '/services/community-nursing-complex-care',
    '/services/community-participation-group-programs',
    '/services/physiotherapy-services',
    '/services/personal-training-sessions',
    '/services/hydrotherapy-pool-session',
    '/services/positive-behaviour-support',
    '/services/companionship',
    '/services/travel-transport-assistance',
    '/services/professional-cleaning',
  ];

  const allPages = [...mainPages, ...servicePages];

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1.0 : page.startsWith('/services/') ? 0.8 : 0.9,
  }));
}
