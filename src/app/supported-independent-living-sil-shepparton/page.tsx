import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';
import StructuredData from '@/components/StructuredData';

const silFaqs = [
  {
    '@type': 'Question',
    name: 'What is Supported Independent Living (SIL) in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'SIL is an NDIS support model for people who need regular help at home. Bright Support provides tailored SIL support focused on independence, safety, and daily routines in Shepparton.',
    },
  },
  {
    '@type': 'Question',
    name: 'How do I check SIL vacancy availability with Bright Support?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Contact Bright Support directly to discuss current SIL availability, support matching, and expected onboarding timelines for Shepparton participants.',
    },
  },
  {
    '@type': 'Question',
    name: 'Can SIL supports be tailored to my NDIS goals?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. SIL supports are planned around your NDIS goals, daily living needs, and preferred level of independence to create a practical long-term support setup.',
    },
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'independent-living-accommodation-support' }),
  });
}

export default function Page() {
  return (
    <>
      <StructuredData type="FAQPage" data={{ questions: silFaqs }} />
      <ServicePage params={Promise.resolve({ locale: 'en', slug: 'independent-living-accommodation-support' })} />
    </>
  );
}
