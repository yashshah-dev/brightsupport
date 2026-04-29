import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';
import StructuredData from '@/components/StructuredData';

const BASE_URL = 'https://www.brightsupport.com.au';
const CANONICAL_PATH = '/community-participation-group-programs/';

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
  const meta = await generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'community-participation-group-programs' }),
  });

  return {
    ...meta,
    title: 'Legacy URL: Community Participation Programs | Bright Support',
    description:
      'Legacy URL for NDIS community participation programs. Please use the canonical community-participation-group-programs page for current content.',
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
      <StructuredData type="FAQPage" data={{ questions: communityParticipationFaqs }} />
      <ServicePage params={Promise.resolve({ locale: 'en', slug: 'community-participation-group-programs' })} />
    </>
  );
}
