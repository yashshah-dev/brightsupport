import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';
import StructuredData from '@/components/StructuredData';

const communityParticipationFaqs = [
  {
    '@type': 'Question',
    name: 'What community participation support is available in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Bright Support offers community access, social group activities, and skills-building supports for NDIS participants in Shepparton and nearby suburbs.',
    },
  },
  {
    '@type': 'Question',
    name: 'Can community participation supports be tailored to my NDIS goals?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. Supports are tailored to your NDIS plan goals, interests, communication needs, and preferred level of independence.',
    },
  },
  {
    '@type': 'Question',
    name: 'How do I start community participation services with Bright Support?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Contact Bright Support to discuss your plan and goals. The team will help map suitable activities and build a practical support schedule.',
    },
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'community-participation-group-programs' }),
  });
}

export default function Page() {
  return (
    <>
      <StructuredData type="FAQPage" data={{ questions: communityParticipationFaqs }} />
      <ServicePage params={Promise.resolve({ locale: 'en', slug: 'community-participation-group-programs' })} />
    </>
  );
}