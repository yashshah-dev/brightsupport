import type { Metadata } from 'next';
import HomePage from '@/app/_locale_impl/page';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'Bright Support | NDIS Disability & Support Services in Shepparton',
  description:
    'Registered NDIS provider in Shepparton offering daily living support, community nursing, physiotherapy, SIL, and community participation services.',
  alternates: {
    languages: {
      en: `${BASE_URL}/`,
      'x-default': `${BASE_URL}/`,
    },
  },
  openGraph: {
    title: 'Bright Support | NDIS Disability & Support Services in Shepparton',
    description:
      'Trusted NDIS support across Shepparton and Mooroopna with personalised care plans and local, experienced teams.',
    url: `${BASE_URL}/`,
    type: 'website',
  },
};

export default function RootPage() {
  return <HomePage />;
}
