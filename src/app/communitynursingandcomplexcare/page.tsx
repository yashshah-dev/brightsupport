import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';
import StructuredData from '@/components/StructuredData';

const communityNursingFaqs = [
  {
    '@type': 'Question',
    name: 'What community nursing supports does Bright Support provide in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Bright Support provides community nursing and complex care supports including medication assistance, clinical monitoring, and care coordination for eligible NDIS participants in Shepparton.',
    },
  },
  {
    '@type': 'Question',
    name: 'Who can access NDIS community nursing and complex care services?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Participants with nursing-related supports in their NDIS plan may access community nursing services. Bright Support can help clarify service fit and referral pathways.',
    },
  },
  {
    '@type': 'Question',
    name: 'How quickly can community nursing services start?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Start times depend on clinical needs and roster availability. Bright Support provides clear onboarding timelines during intake and care planning.',
    },
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'community-nursing-complex-care' }),
  });
}

export default function Page() {
  return (
    <>
      <StructuredData type="FAQPage" data={{ questions: communityNursingFaqs }} />
      <ServicePage params={Promise.resolve({ locale: 'en', slug: 'community-nursing-complex-care' })} />
    </>
  );
}
