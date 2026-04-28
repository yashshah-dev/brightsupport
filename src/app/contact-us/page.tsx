import type { Metadata } from 'next';
import ContactUsPage from '@/app/_locale_impl/contact-us/page';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'Contact Bright Support | NDIS Services Shepparton',
  description:
    'Contact Bright Support for NDIS support services in Shepparton. Call 1800 407 508 or submit a referral and our team will respond promptly.',
  alternates: {
    languages: {
      en: `${BASE_URL}/contact-us/`,
      'x-default': `${BASE_URL}/contact-us/`,
    },
  },
};

export default function ContactUs() {
  return <ContactUsPage />;
}
