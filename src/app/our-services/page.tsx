import type { Metadata } from 'next';
import OurServicesPage from '@/app/_locale_impl/our-services/page';
import StructuredData from '@/components/StructuredData';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'NDIS Services Shepparton | Disability Care & Support Services',
  description:
    'Explore professional NDIS services in Shepparton including personal care, home support & community participation. Tailored care plans available.',
  keywords:
    'NDIS provider Shepparton, Disability support Shepparton, NDIS services Shepparton, Support worker Shepparton, Home care Shepparton, best NDIS provider in Shepparton, affordable disability support Shepparton, registered NDIS provider Shepparton, how to apply for NDIS in Shepparton, disability support services near Shepparton, in-home care services Shepparton',
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
