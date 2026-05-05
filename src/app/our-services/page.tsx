import type { Metadata } from 'next';
import OurServicesPage from '@/app/_locale_impl/our-services/page';
import StructuredData from '@/components/StructuredData';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'NDIS Services Shepparton | Disability Services | Bright Support',
  description:
    'Disability services in Shepparton by Bright Support — daily living, community nursing, SIL, support coordination, transport, and more. Local NDIS support workers available now.',
  alternates: {
    canonical: `${BASE_URL}/our-services/`,
    languages: {
      en: `${BASE_URL}/our-services/`,
      'x-default': `${BASE_URL}/our-services/`,
    },
  },
};

export default function OurServices() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', item: `${BASE_URL}/` },
            { name: 'Our Services', item: `${BASE_URL}/our-services/` },
          ],
        }}
      />
      <OurServicesPage />
    </>
  );
}
