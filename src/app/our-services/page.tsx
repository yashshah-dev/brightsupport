import type { Metadata } from 'next';
import OurServicesPage from '@/app/_locale_impl/our-services/page';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'Our NDIS Services in Shepparton | Bright Support',
  description:
    'Discover Bright Support NDIS services including daily living, community nursing, physiotherapy, SIL, support coordination, and transport assistance.',
  alternates: {
    languages: {
      en: `${BASE_URL}/our-services/`,
      'x-default': `${BASE_URL}/our-services/`,
    },
  },
};

export default function OurServices() {
  return <OurServicesPage />;
}
