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

import StructuredData from '@/components/StructuredData';

const homepageFaqs = [
  {
    name: 'Is Bright Support an NDIS registered provider?',
    acceptedAnswer: {
      text: 'Yes, Bright Support is a registered NDIS provider in Australia offering disability support services in Shepparton.',
    },
  },
  {
    name: 'What services does Bright Support provide?',
    acceptedAnswer: {
      text: 'We provide SIL, Support Coordination, Nursing, Physiotherapy and Community Participation services.',
    },
  },
  {
    name: 'Where is Bright Support located?',
    acceptedAnswer: {
      text: 'We are located at 279 Wyndham Street, Shepparton VIC 3630, Australia.',
    },
  },
];

export default function RootPage() {
  return (
    <>
      <StructuredData
        type="Service"
        data={{
          serviceType: 'Supported Independent Living (SIL)',
          areaServed: 'Shepparton, Australia',
          description:
            'NDIS Supported Independent Living (SIL) services helping participants live independently with 24/7 support, personal care and daily living assistance.',
          url: `${BASE_URL}/`,
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{
          questions: homepageFaqs,
        }}
      />
      <HomePage />
    </>
  );
}
