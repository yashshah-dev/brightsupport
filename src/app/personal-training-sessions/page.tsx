import type { Metadata } from 'next';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'personal-training-sessions' }),
  });
}

export default function Page() {
  return <ServicePage params={Promise.resolve({ locale: 'en', slug: 'personal-training-sessions' })} />;
}