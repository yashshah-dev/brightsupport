// Mapping of internal service slugs to live site URLs
export const serviceUrlMapping: Record<string, string> = {
  'daily-living-in-home-support': '/daily-living-in-home-support/',
  'communitylivingin-homesupport': '/daily-living-in-home-support/',
  'community-nursing-complex-care': '/community-nursing-complex-care/',
  'physiotherapy-services': '/physiotherapy-services/',
  'community-participation-group-programs': '/community-participation-group-programs/',
  'companionship': '/companion-care-services/',
  'travel-transport-assistance': '/ndis-transport-service-provider/',
  'hydrotherapy-pool-session': '/ndis-hydrotherapy-services/',
  'personal-training-sessions': '/personal-training-sessions/',
  'positive-behaviour-support': '/positive-behaviour-support/',
  'professional-cleaning': '/ndis-cleaning-services/',
  'independent-living-accommodation-support': '/supported-independent-living-sil-shepparton/',
  'support-coordination': '/ndis-support-coordination/',
  'respite-care': '/ndis-respite-care-short-term-accommodation/',
};

export function getServiceUrl(slug: string): string {
  const path = serviceUrlMapping[slug] || `/${slug}`;
  return path.endsWith('/') ? path : `${path}/`;
}

const SITE_ORIGIN = 'https://www.brightsupport.com.au';

/** Absolute canonical URL for a service slug (no double trailing slash). */
export function getServiceCanonicalUrl(slug: string): string {
  return `${SITE_ORIGIN}${getServiceUrl(slug)}`;
}
