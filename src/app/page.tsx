import type { Metadata } from 'next';
import HomePage from '@/app/_locale_impl/page';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'NDIS Provider Shepparton | Bright Support',
  description:
    'Bright Support is a registered NDIS provider in Shepparton delivering disability support services — daily living, SIL, support coordination, community nursing, and more. Local staff, fast response.',
  alternates: {
    languages: {
      en: `${BASE_URL}/`,
      'x-default': `${BASE_URL}/`,
    },
  },
  openGraph: {
    title: 'NDIS Provider Shepparton | Bright Support',
    description:
      'Registered NDIS provider serving Shepparton and Mooroopna. Disability support services tailored to your plan and goals — with a 24-hour response guarantee.',
    url: `${BASE_URL}/`,
    type: 'website',
  },
};

export default function RootPage() {
  return <HomePage />;
}
