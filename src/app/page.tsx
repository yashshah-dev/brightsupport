import type { Metadata } from 'next';
import HomePage from '@/app/_locale_impl/page';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'NDIS Provider Shepparton | Disability Support Services | Bright Support',
  description:
    'Looking for trusted NDIS provider in Shepparton? Bright Support offers personalized disability support services, home care & support workers. Contact us today.',
  keywords:
    'NDIS provider Shepparton, Disability support Shepparton, NDIS services Shepparton, Support worker Shepparton, Home care Shepparton, best NDIS provider in Shepparton, affordable disability support Shepparton, registered NDIS provider Shepparton, how to apply for NDIS in Shepparton, disability support services near Shepparton, in-home care services Shepparton',
  alternates: {
    canonical: `${BASE_URL}/`,
    languages: {
      en: `${BASE_URL}/`,
      'x-default': `${BASE_URL}/`,
    },
  },
  openGraph: {
    title: 'NDIS Provider Shepparton | Disability Support Services | Bright Support',
    description:
      'Looking for trusted NDIS provider in Shepparton? Bright Support offers personalized disability support services, home care & support workers. Contact us today.',
    url: `${BASE_URL}/`,
    type: 'website',
  },
};

export default function RootPage() {
  return <HomePage />;
}
