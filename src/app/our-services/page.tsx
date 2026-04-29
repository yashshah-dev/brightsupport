import type { Metadata } from 'next';
import OurServicesPage from '@/app/_locale_impl/our-services/page';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'NDIS Services Shepparton | Disability Services | Bright Support',
  description:
    'Disability services in Shepparton by Bright Support — daily living, community nursing, SIL, support coordination, transport, and more. Local NDIS support workers available now.',
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
