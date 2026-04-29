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
  {
    '@type': 'Question',
    name: 'What does community nursing care in Shepparton include?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Community nursing care in Shepparton through Bright Support includes wound care, medication management, catheter care, clinical health assessments, and coordination of complex care needs, delivered by Registered Nurses at home.',
    },
  },
  {
    '@type': 'Question',
    name: 'Do I need a referral to access community nursing care in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'You need community nursing supports funded in your NDIS plan to access these services. Bright Support can assist with the referral process and liaise with your GP or specialist to coordinate care.',
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