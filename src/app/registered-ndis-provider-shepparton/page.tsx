import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import StructuredData from '@/components/StructuredData';

const BASE_URL = 'https://www.brightsupport.com.au';
const PAGE_PATH = '/registered-ndis-provider-shepparton';

export const metadata: Metadata = {
  title: 'Registered NDIS Provider Shepparton | Bright Support',
  description:
    'Compare NDIS providers in Shepparton. Bright Support is a registered NDIS provider with local staff, fast response times, and SIL vacancies. Use our free checklist to choose with confidence.',
  alternates: {
    canonical: PAGE_PATH,
    languages: {
      en: `${BASE_URL}${PAGE_PATH}/`,
      'x-default': `${BASE_URL}${PAGE_PATH}/`,
    },
  },
  openGraph: {
    title: 'Registered NDIS Provider Shepparton | Bright Support',
    description:
      'Compare registered NDIS providers in Shepparton with our free checklist. Local staff, SIL vacancies, and transparent pricing — choose Bright Support with confidence.',
    url: `${BASE_URL}${PAGE_PATH}/`,
    type: 'website',
  },
};

const checklistItems = [
  'Check NDIS registration status and approved support categories.',
  'Ask whether support workers are locally based in Shepparton and Mooroopna.',
  'Review SIL vacancy response times and onboarding timelines.',
  'Confirm communication standards for calls, rostering, and incidents.',
  'Request transparent pricing aligned to NDIS price limits.',
  'Check continuity plans for staff absences and after-hours support.',
];

const faqs = [
  {
    '@type': 'Question',
    name: 'How do I verify if an NDIS provider is registered in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Use the NDIS provider finder and confirm the provider is registered for your required support categories.',
    },
  },
  {
    '@type': 'Question',
    name: 'Why do local staff matter when choosing an NDIS provider?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Local teams generally provide better reliability, faster response times, and stronger knowledge of Shepparton services and community networks.',
    },
  },
  {
    '@type': 'Question',
    name: 'What should I ask about SIL vacancies?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Ask how quickly the provider responds to SIL enquiries, average wait times for vacancies, and how matching and onboarding are handled.',
    },
  },
];

export default function RegisteredNdisProviderPage() {
  return (
    <>
      <StructuredData
        type="Service"
        data={{
          name: 'Registered NDIS Provider in Shepparton',
          serviceType: 'NDIS Support Services',
          description:
            'Registered NDIS support services in Shepparton including daily living, community nursing, support coordination, and SIL support.',
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
            <h1 className="text-4xl md:text-5xl font-bold mb-5">Registered NDIS Provider in Shepparton</h1>
            <p className="text-xl text-sky-200">
              Use this practical checklist to compare providers and choose support with confidence.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Choosing a provider is not about who makes the biggest promise. It is about registration,
              reliability, local capability, and proven participant outcomes. Use the checklist below to
              assess providers fairly.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-6">Provider Selection Checklist</h2>
            <ul className="space-y-4 mb-10">
              {checklistItems.map((item) => (
                <li key={item} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <CheckCircle className="text-emerald-600 mt-0.5 flex-shrink-0" size={20} />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mb-6">What to Ask Every Provider</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-2 text-indigo-700 font-semibold">
                  <Clock size={18} />
                  Response Time Questions
                </div>
                <p className="text-slate-700">What is your average response time for new referrals and SIL vacancy enquiries?</p>
              </div>
              <div className="bg-sky-50 border border-sky-100 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-2 text-sky-700 font-semibold">
                  <MapPin size={18} />
                  Local Coverage Questions
                </div>
                <p className="text-slate-700">Which suburbs do your local teams cover across Shepparton and Mooroopna?</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-navy-50 to-sky-50 border border-sky-100 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Need Help Comparing Providers?</h2>
              <p className="text-slate-700 mb-5">
                Our team can walk you through this checklist and answer questions about registration,
                local staffing, service agreements, and SIL vacancies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact-us" className="bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-lg font-semibold text-center">
                  Make an NDIS Referral
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
