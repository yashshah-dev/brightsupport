import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';
import StructuredData from '@/components/StructuredData';

const sdaFaqs = [
  {
    '@type': 'Question',
    name: 'What is Specialist Disability Accommodation (SDA) in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Specialist Disability Accommodation (SDA) is custom-designed housing for NDIS participants who require high-level, specialized support or have extreme functional impairment. Bright Support provides accessible SDA homes in Shepparton tailored to individual mobility and sensory needs.',
    },
  },
  {
    '@type': 'Question',
    name: 'What is the difference between SIL and SDA?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'SDA refers to the physical bricks-and-mortar housing itself, which is built with accessible features. SIL (Supported Independent Living) refers to the day-to-day support services (such as personal care and cooking assistance) delivered to help participants live independently inside the home.',
    },
  },
  {
    '@type': 'Question',
    name: 'How do I qualify for NDIS SDA funding in Victoria?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'To get SDA funding in your NDIS plan, you must demonstrate that you have extreme functional impairment or very high support needs that cannot be met by standard housing or other support models. An assessment by an Occupational Therapist is typically required.',
    },
  },
  {
    '@type': 'Question',
    name: 'Are there different design categories of SDA housing?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes, the NDIS defines four SDA design categories: Improved Liveability, Robust, Fully Accessible, and High Physical Support. Bright Support works with housing providers to connect participants with homes built to these specific standards in Greater Shepparton.',
    },
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'specialist-disability-accommodation-sda' }),
  });
}

export default function Page() {
  return (
    <>
      <StructuredData type="FAQPage" data={{ questions: sdaFaqs }} />
      <ServicePage params={Promise.resolve({ locale: 'en', slug: 'specialist-disability-accommodation-sda' })} />
    </>
  );
}
