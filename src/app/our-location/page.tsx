import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, Clock } from 'lucide-react';

const BASE_URL = 'https://www.brightsupport.com.au';
const PAGE_PATH = '/our-location';

export const metadata: Metadata = {
  title: 'Our Location in Shepparton | Bright Support',
  description:
    'Visit Bright Support in Shepparton. Find our location, contact details, business hours, and local NDIS service coverage information.',
  alternates: {
    canonical: PAGE_PATH,
    languages: {
      en: `${BASE_URL}${PAGE_PATH}/`,
      'x-default': `${BASE_URL}${PAGE_PATH}/`,
    },
  },
  openGraph: {
    title: 'Our Location in Shepparton | Bright Support',
    description:
      'Find Bright Support in Shepparton, including phone number, business hours, and local NDIS service area details.',
    url: `${BASE_URL}${PAGE_PATH}/`,
    type: 'website',
  },
};

export default function OurLocation() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-sky-900 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Location</h1>
            <p className="text-xl text-sky-200">Visit Bright Support in Shepparton</p>
          </div>
        </div>
      </section>

      {/* Location Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-navy-900 mb-8">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-coral-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-2">Address</h3>
                      <p className="text-gray-600">Shepparton, Victoria, Australia</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-coral-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-2">Phone</h3>
                      <a href="tel:1800407508" className="text-sky-600 hover:text-sky-700">
                        1800 407 508
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock className="w-6 h-6 text-coral-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-2">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <Link
                    href="/contact-us"
                    className="inline-block bg-coral-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-coral-600 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Map */}
              <div>
                <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Map location - Shepparton, Victoria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-slate-200 pt-12">
              <h2 className="text-3xl font-bold text-navy-900 mb-5">NDIS Support in Shepparton and Nearby Areas</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Bright Support is based in Shepparton and supports participants across the broader region. Many families
                contact us for local, reliable NDIS services that reduce travel complexity and improve consistency of care.
                Our team works with participants, carers, and referrers to coordinate practical supports close to home.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We regularly assist participants in Shepparton and surrounding communities including Mooroopna, Tatura,
                and nearby suburbs where service accessibility matters. If you are unsure whether your area is covered,
                call us and we will confirm availability, travel arrangements, and estimated start timelines.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                From daily living support and support coordination to community nursing and capacity-building services,
                our local presence helps participants receive more responsive communication and clearer ongoing planning.
              </p>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">Before You Visit</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Bring your NDIS plan details if you want service guidance.</li>
                    <li>Note your preferred support start times and availability.</li>
                    <li>Prepare questions about provider matching and onboarding.</li>
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">How We Can Help</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>New participant enquiries and referral support.</li>
                    <li>Service coordination across multiple support categories.</li>
                    <li>Practical planning for local NDIS service delivery.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
