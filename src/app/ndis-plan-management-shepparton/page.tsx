import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Phone } from 'lucide-react';
import StructuredData from '@/components/StructuredData';

const BASE_URL = 'https://www.brightsupport.com.au';
const PAGE_PATH = '/ndis-plan-management-shepparton';

export const metadata: Metadata = {
  title: 'NDIS Plan Management Shepparton | Local Plan Management Support | Bright Support',
  description:
    'Looking for NDIS plan management in Shepparton? Bright Support helps participants understand budgets, track spending, and pay providers on time with clear, local support.',
  alternates: {
    canonical: PAGE_PATH,
    languages: {
      en: `${BASE_URL}${PAGE_PATH}/`,
      'x-default': `${BASE_URL}${PAGE_PATH}/`,
    },
  },
  openGraph: {
    title: 'NDIS Plan Management Shepparton | Local Plan Management Support | Bright Support',
    description:
      'Local NDIS plan management support in Shepparton. Get help with invoices, budget tracking, and provider payments while keeping full choice and control.',
    url: `${BASE_URL}${PAGE_PATH}/`,
    type: 'website',
  },
};

const planManagementBenefits = [
  'Track your NDIS budget with clear monthly updates and practical guidance.',
  'Get invoices processed quickly and correctly to reduce payment delays.',
  'Keep choice and control by using both registered and non-registered providers.',
  'Understand your funding categories and what each budget can be used for.',
  'Coordinate plan usage with your support coordinator and wider care team.',
  'Receive local support from a team that understands services in Shepparton.',
];

const faqs = [
  {
    '@type': 'Question',
    name: 'What is NDIS plan management?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'NDIS plan management is a funded support that helps you manage invoices, monitor budgets, and pay providers, while keeping choice and control over who delivers your supports.',
    },
  },
  {
    '@type': 'Question',
    name: 'Can I use non-registered providers with plan management?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. With plan management funding, many participants can access both registered and non-registered providers, giving more flexibility in how supports are delivered.',
    },
  },
  {
    '@type': 'Question',
    name: 'How do I add plan management to my NDIS plan in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'You can request plan management during your NDIS planning meeting or plan reassessment. Bright Support can guide you on what to ask and how to prepare for the discussion.',
    },
  },
];

export default function NdisPlanManagementSheppartonPage() {
  return (
    <>
      <StructuredData
        type="Service"
        data={{
          name: 'NDIS Plan Management Shepparton',
          serviceType: 'NDIS Plan Management',
          description:
            'Local NDIS plan management support in Shepparton including budget tracking, invoice processing, and provider payments.',
          url: `${BASE_URL}${PAGE_PATH}/`,
          areaServed: {
            '@type': 'City',
            name: 'Shepparton',
            containedInPlace: {
              '@type': 'State',
              name: 'Victoria',
              containedInPlace: { '@type': 'Country', name: 'Australia' },
            },
          },
        }}
      />
      <StructuredData type="FAQPage" data={{ questions: faqs }} />

      <div className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-sky-900 text-white pt-32 pb-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">NDIS Plan Management Shepparton</h1>
            <p className="text-xl text-sky-200">
              Practical local support to manage your NDIS funding, pay providers, and stay on track with your goals.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Plan management helps you use your NDIS funding with confidence. Bright Support gives participants and families in
              Shepparton clear, easy-to-follow guidance so you can make informed choices without the admin stress.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-6">How Plan Management Helps</h2>
            <ul className="space-y-4 mb-10">
              {planManagementBenefits.map((item) => (
                <li key={item} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <CheckCircle className="text-emerald-600 mt-0.5 flex-shrink-0" size={20} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-gradient-to-r from-navy-50 to-sky-50 border border-sky-100 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Need Plan Management Support?</h2>
              <p className="text-slate-700 mb-5">
                Talk to Bright Support about plan management options in Shepparton, current availability, and how this service
                can work alongside support coordination.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact-us" className="bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-lg font-semibold text-center">
                  Request a Call Back
                </Link>
                <a href="tel:1800407508" className="bg-navy-900 hover:bg-navy-800 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
                  <Phone size={18} />
                  1800 407 508
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}