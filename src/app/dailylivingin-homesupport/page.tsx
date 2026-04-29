import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';
import StructuredData from '@/components/StructuredData';

const BASE_URL = 'https://www.brightsupport.com.au';
const CANONICAL_PATH = '/daily-living-in-home-support/';

const dailyLivingFaqs = [
  {
    '@type': 'Question',
    name: 'What daily living supports are available under NDIS in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Bright Support provides daily living and in-home supports including personal care, meal support, household tasks, and routine-based assistance for NDIS participants in Shepparton.',
    },
  },
  {
    '@type': 'Question',
    name: 'Can daily living support be matched to my schedule?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. Support schedules are planned around your goals, preferred times, and level of independence so services are practical and consistent.',
    },
  },
  {
    '@type': 'Question',
    name: 'How do I start daily living support with Bright Support?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Contact Bright Support with your NDIS plan details. The team will review your needs and set up a tailored support plan for daily living services.',
    },
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const meta = await generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'daily-living-in-home-support' }),
  });

  return {
    ...meta,
    title: 'Legacy URL: Daily Living Support | Bright Support',
    description:
      'Legacy URL for daily living support. Please use the canonical daily-living-in-home-support page for current content.',
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${BASE_URL}${CANONICAL_PATH}`,
      languages: {
        en: `${BASE_URL}${CANONICAL_PATH}`,
        'x-default': `${BASE_URL}${CANONICAL_PATH}`,
      },
    },
  };
}

export default function Page() {
  return (
    <>
      <StructuredData type="FAQPage" data={{ questions: dailyLivingFaqs }} />
      <ServicePage params={Promise.resolve({ locale: 'en', slug: 'daily-living-in-home-support' })} />
    </>
  );
}
