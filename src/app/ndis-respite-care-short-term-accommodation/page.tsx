import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';
import StructuredData from '@/components/StructuredData';

const respiteFaqs = [
  {
    '@type': 'Question',
    name: 'What is NDIS Short-Term Accommodation (STA) and Respite Care?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Short-Term Accommodation (STA) and assistance is funding under the NDIS that covers the cost of care, accommodation, food, and activities for a short period away from your usual home. It allows participants to try new things, meet new people, and build skills in a supportive, comfortable environment while giving their primary carers a break.',
    },
  },
  {
    '@type': 'Question',
    name: 'How long can I stay in NDIS respite care?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'The NDIS generally funds up to 28 days of Short-Term Accommodation per year, which you can use flexibly—for example, as a weekend block, a one-week stay, or a two-week stay, depending on your NDIS funding and personal needs.',
    },
  },
  {
    '@type': 'Question',
    name: 'Does Bright Support provide respite care in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. Bright Support provides professional NDIS respite care and Short-Term Accommodation (STA) services in Shepparton and surrounding areas. Our services include 24/7 care, meals, accommodation, and community activities.',
    },
  },
  {
    '@type': 'Question',
    name: 'Do I need specific funding in my NDIS plan for respite care?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes, you need funding for \'Short-Term Accommodation and Assistance\' approved under your Core Supports (specifically, Assistance with Daily Life). If you are unsure whether you have this funding, our team can help you review your plan.',
    },
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'respite-care' }),
  });
}

export default function Page() {
  return (
    <>
      <StructuredData type="FAQPage" data={{ questions: respiteFaqs }} />
      <ServicePage params={Promise.resolve({ locale: 'en', slug: 'respite-care' })} />
    </>
  );
}
