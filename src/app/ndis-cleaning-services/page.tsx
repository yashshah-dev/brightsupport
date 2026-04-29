import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';
import StructuredData from '@/components/StructuredData';

const cleaningFaqs = [
  {
    '@type': 'Question',
    name: 'Does Bright Support offer NDIS cleaning services in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. Bright Support provides NDIS-funded house cleaning in Shepparton, including vacuuming, mopping, bathroom cleaning, laundry, and general home maintenance for eligible NDIS participants.',
    },
  },
  {
    '@type': 'Question',
    name: 'Can I use my NDIS funding for house cleaning in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. If household tasks are included in your NDIS plan under Core Supports, you can use that funding for professional house cleaning through a registered NDIS provider like Bright Support.',
    },
  },
  {
    '@type': 'Question',
    name: 'How often can I receive home cleaning support through the NDIS?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Cleaning frequency depends on support hours in your NDIS plan. Bright Support works with you to schedule services that fit your plan budget and household needs in Shepparton.',
    },
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'professional-cleaning' }),
  });
}

export default function Page() {
  return (
    <>
      <StructuredData type="FAQPage" data={{ questions: cleaningFaqs }} />
      <ServicePage params={Promise.resolve({ locale: 'en', slug: 'professional-cleaning' })} />
    </>
  );
}
