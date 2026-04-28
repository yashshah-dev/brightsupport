import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';
import StructuredData from '@/components/StructuredData';

const supportCoordinationFaqs = [
  {
    '@type': 'Question',
    name: 'What does NDIS support coordination include in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Support coordination helps you understand your NDIS plan, connect with providers, coordinate services, and build confidence to manage supports over time.',
    },
  },
  {
    '@type': 'Question',
    name: 'Can support coordination help me find local providers quickly?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. Bright Support helps identify suitable local providers in Shepparton and nearby areas based on your goals, support needs, and availability requirements.',
    },
  },
  {
    '@type': 'Question',
    name: 'How do I get started with support coordination?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Share your NDIS plan details with Bright Support and the team will guide your intake, planning priorities, and first service connection steps.',
    },
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'support-coordination' }),
  });
}

export default function Page() {
  return (
    <>
      <StructuredData type="FAQPage" data={{ questions: supportCoordinationFaqs }} />
      <ServicePage params={Promise.resolve({ locale: 'en', slug: 'support-coordination' })} />
    </>
  );
}
