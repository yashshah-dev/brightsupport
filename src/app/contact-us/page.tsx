import type { Metadata } from 'next';
import ContactUsPage from '@/app/_locale_impl/contact-us/page';
import StructuredData from '@/components/StructuredData';

const BASE_URL = 'https://www.brightsupport.com.au';

export const metadata: Metadata = {
  title: 'Contact Bright Support | NDIS Services Shepparton',
  description:
    'Contact Bright Support for NDIS support services in Shepparton. Call 1800 407 508 or submit a referral and our team will respond promptly.',
  alternates: {
    canonical: `${BASE_URL}/contact-us/`,
    languages: {
      en: `${BASE_URL}/contact-us/`,
      'x-default': `${BASE_URL}/contact-us/`,
    },
  },
};

export default function ContactUs() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', item: `${BASE_URL}/` },
            { name: 'Contact Us', item: `${BASE_URL}/contact-us/` },
          ],
        }}
      />
      <ContactUsPage />
    </>
  );
}
