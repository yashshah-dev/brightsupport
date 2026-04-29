// Mapping of internal service slugs to live site URLs
export const serviceUrlMapping: Record<string, string> = {
  'daily-living-in-home-support': '/daily-living-in-home-support',
  'communitylivingin-homesupport': '/daily-living-in-home-support',
  'community-nursing-complex-care': '/community-nursing-complex-care',
  'physiotherapy-services': '/physiotherapy-services',
  'community-participation-group-programs': '/community-participation-group-programs',
  'companionship': '/companion-care-services',
  'travel-transport-assistance': '/ndis-transport-service-provider',
  'hydrotherapy-pool-session': '/ndis-hydrotherapy-services',
  'personal-training-sessions': '/personal-training-sessions',
  'positive-behaviour-support': '/positive-behaviour-support',
  'professional-cleaning': '/ndis-cleaning-services',
  'independent-living-accommodation-support': '/supported-independent-living-sil-shepparton',
  'support-coordination': '/ndis-support-coordination',
};

export function getServiceUrl(slug: string): string {
  return serviceUrlMapping[slug] || `/${slug}`;
}
