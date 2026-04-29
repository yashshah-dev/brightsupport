import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Clock, Home, Phone } from 'lucide-react';

const BASE_URL = 'https://www.brightsupport.com.au';
const THANK_YOU_PATH = '/thank-you';

export const metadata: Metadata = {
  title: 'Thank You - Contact Request Received',
  description:
    'Thank you for contacting Bright Support. Your inquiry has been received and our team will respond soon.',
  alternates: {
    canonical: THANK_YOU_PATH,
    languages: {
      en: `${BASE_URL}${THANK_YOU_PATH}/`,
      'x-default': `${BASE_URL}${THANK_YOU_PATH}/`,
    },
  },
  openGraph: {
    title: 'Thank You | Bright Support',
    description:
      'Your contact request has been received. Our team will be in touch shortly.',
    url: `${BASE_URL}${THANK_YOU_PATH}/`,
    type: 'website',
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-sky-900">
      <section className="relative pt-32 pb-16 text-white">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">Thank you for contacting us</h1>
            <p className="text-xl text-sky-200 mb-3">
              Your message has been submitted successfully.
            </p>
            <p className="text-lg text-gray-300">
              We usually respond within 24-48 business hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="rounded-xl p-6 bg-gradient-to-br from-navy-50 to-sky-50">
              <div className="w-11 h-11 bg-navy-700 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-navy-900 mb-2">What happens next</h2>
              <p className="text-gray-700">
                Our team reviews every request and follows up with the right service options for your needs.
              </p>
            </div>

            <div className="rounded-xl p-6 bg-gradient-to-br from-coral-50 to-orange-50">
              <div className="w-11 h-11 bg-coral-500 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-navy-900 mb-2">Need immediate support?</h2>
              <p className="text-gray-700">
                Call 1800 407 508 for a faster response during business hours.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-navy-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-800 transition-colors"
            >
              <Home className="w-5 h-5" />
              Return to home
            </Link>
          </div>

          <div className="max-w-3xl mx-auto mt-10 bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">While You Wait</h2>
            <p className="text-slate-700 mb-3">
              Bright Support provides NDIS services in Shepparton across daily living support, support coordination,
              community nursing, physiotherapy, community participation, and supported independent living.
            </p>
            <p className="text-slate-700 mb-3">
              If your enquiry is time-sensitive, phone support is the fastest channel. For non-urgent requests,
              our team will reply with next steps, service availability, and referral guidance based on your goals.
            </p>
            <p className="text-slate-700">
              You can also review our service information to prepare questions before your callback.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
