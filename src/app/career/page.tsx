import type { Metadata } from 'next';
import CareerPage from '@/app/_locale_impl/career/page';
import StructuredData from '@/components/StructuredData';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'NDIS Career Opportunities in Shepparton | Join Bright Support',
  description:
    'Explore disability support career opportunities at Bright Support in Shepparton. Apply for support worker, nursing, and allied health roles.',
  alternates: {
    canonical: `${BASE_URL}/career/`,
    languages: {
      en: `${BASE_URL}/career/`,
      'x-default': `${BASE_URL}/career/`,
    },
  },
};

export default function Career() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', item: `${BASE_URL}/` },
            { name: 'Careers', item: `${BASE_URL}/career/` },
          ],
        }}
      />
      <CareerPage />
    </>
  );
}
