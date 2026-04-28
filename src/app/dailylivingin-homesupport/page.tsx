import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';
import StructuredData from '@/components/StructuredData';

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
  return generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'daily-living-in-home-support' }),
  });
}

export default function Page() {
  return (
    <>
      <StructuredData type="FAQPage" data={{ questions: dailyLivingFaqs }} />
      <ServicePage params={Promise.resolve({ locale: 'en', slug: 'daily-living-in-home-support' })} />
    </>
  );
}
