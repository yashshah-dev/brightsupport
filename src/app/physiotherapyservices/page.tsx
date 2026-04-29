import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';

const BASE_URL = 'https://www.brightsupport.com.au';
const CANONICAL_PATH = '/physiotherapy-services/';

export async function generateMetadata(): Promise<Metadata> {
  const meta = await generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'physiotherapy-services' }),
  });

  return {
    ...meta,
    title: 'Legacy URL: Physiotherapy Services | Bright Support',
    description:
      'Legacy URL for NDIS physiotherapy services. Please use the canonical physiotherapy-services page for current content.',
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
  return <ServicePage params={Promise.resolve({ locale: 'en', slug: 'physiotherapy-services' })} />;
}
