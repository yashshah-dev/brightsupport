import type { Metadata } from 'next';
import CareerPage from '@/app/_locale_impl/career/page';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'NDIS Career Opportunities in Shepparton | Join Bright Support',
  description:
    'Explore disability support career opportunities at Bright Support in Shepparton. Apply for support worker, nursing, and allied health roles.',
  alternates: {
    languages: {
      en: `${BASE_URL}/career/`,
      'x-default': `${BASE_URL}/career/`,
    },
  },
};

export default function Career() {
  return <CareerPage />;
}
