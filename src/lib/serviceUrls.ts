// Mapping of internal service slugs to live site URLs
export const serviceUrlMapping: Record<string, string> = {
  'daily-living-in-home-support': '/dailylivingin-homesupport',
  'communitylivingin-homesupport': '/dailylivingin-homesupport',
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

export function getServiceUrl(slug: string): string {
  return serviceUrlMapping[slug] || `/${slug}`;
}
