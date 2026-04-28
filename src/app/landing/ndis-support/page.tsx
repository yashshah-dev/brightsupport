import type { Metadata } from 'next';
import LandingPage from '@/app/_locale_impl/landing/ndis-support/page';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'NDIS Support Shepparton | Fast Intake & Personalised Care',
  description:
    'Get personalised NDIS support in Shepparton with fast intake and compassionate local staff. Speak with Bright Support about your care goals today.',
  alternates: {
    languages: {
      en: `${BASE_URL}/landing/ndis-support/`,
      'x-default': `${BASE_URL}/landing/ndis-support/`,
    },
  },
};

export default function Page() {
  return <LandingPage />;
}
