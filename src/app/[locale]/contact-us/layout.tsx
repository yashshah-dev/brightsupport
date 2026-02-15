import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - Get in Touch',
    description: 'Contact Bright Support for NDIS disability & support services. Call us at 1800 407 508 or visit our office at 279 Wyndham St, Shepparton VIC 3630. We respond within 24 hours.',
    openGraph: {
        title: 'Contact Us | Bright Support - NDIS Services Shepparton',
        description: 'Get in touch with Bright Support for NDIS services. Call 1800 407 508 or visit our Shepparton office.',
    },
    alternates: {
        canonical: 'https://www.brightsupport.com.au/contact-us/',
    },
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
