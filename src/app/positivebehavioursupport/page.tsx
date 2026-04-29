import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';

const BASE_URL = 'https://www.brightsupport.com.au';
const CANONICAL_PATH = '/positive-behaviour-support/';

export async function generateMetadata(): Promise<Metadata> {
  const meta = await generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'positive-behaviour-support' }),
  });

  return {
    ...meta,
    title: 'Legacy URL: Positive Behaviour Support | Bright Support',
    description:
      'Legacy URL for positive behaviour support services. Please use the canonical positive-behaviour-support page for current content.',
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
  return <ServicePage params={Promise.resolve({ locale: 'en', slug: 'positive-behaviour-support' })} />;
}
