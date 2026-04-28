import type { Metadata } from 'next';
import AboutUsPage from '@/app/_locale_impl/about-us/page';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'About Bright Support | NDIS Provider in Shepparton',
  description:
    'Learn about Bright Support, our values, and our experienced team delivering person-centred NDIS services in Shepparton and Mooroopna.',
  alternates: {
    languages: {
      en: `${BASE_URL}/about-us/`,
      'x-default': `${BASE_URL}/about-us/`,
    },
  },
};

export default function AboutUs() {
  return <AboutUsPage />;
}
