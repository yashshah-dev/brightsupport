import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';
import StructuredData from '@/components/StructuredData';

const transportFaqs = [
  {
    '@type': 'Question',
    name: 'Does Bright Support provide NDIS transport services in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. Bright Support provides NDIS transport services in Shepparton and the Goulburn Valley, including door-to-door trips to medical appointments, community activities, and social outings.',
    },
  },
  {
    '@type': 'Question',
    name: 'Are wheelchair-accessible vehicles available for NDIS transport in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. Wheelchair-accessible transport options are available. Contact Bright Support to confirm vehicle availability and book based on your specific mobility requirements.',
    },
  },
  {
    '@type': 'Question',
    name: 'How do I include transport support in my NDIS plan?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Transport funding can be included under Core Supports in your NDIS plan. Bright Support can help you understand how to use your transport budget effectively in Shepparton.',
    },
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'travel-transport-assistance' }),
  });
}

export default function Page() {
  return (
    <>
      <StructuredData type="FAQPage" data={{ questions: transportFaqs }} />
      <ServicePage params={Promise.resolve({ locale: 'en', slug: 'travel-transport-assistance' })} />
    </>
  );
}
