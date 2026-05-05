import type { Metadata } from 'next';
import AboutUsPage from '@/app/_locale_impl/about-us/page';
import StructuredData from '@/components/StructuredData';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'About Bright Support | NDIS Provider in Shepparton',
  description:
    'Learn about Bright Support, our values, and our experienced team delivering person-centred NDIS services in Shepparton and Mooroopna.',
  alternates: {
    canonical: `${BASE_URL}/about-us/`,
    languages: {
      en: `${BASE_URL}/about-us/`,
      'x-default': `${BASE_URL}/about-us/`,
    },
  },
};

export default function AboutUs() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', item: `${BASE_URL}/` },
            { name: 'About Us', item: `${BASE_URL}/about-us/` },
          ],
        }}
      />
      <AboutUsPage />
    </>
  );
}
