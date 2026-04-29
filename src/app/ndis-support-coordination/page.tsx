import type { Metadata } from 'next';
import Link from 'next/link';
import ServicePage, { generateMetadata as generateServiceMetadata } from '@/app/_locale_impl/services/[slug]/page';
import StructuredData from '@/components/StructuredData';

const supportCoordinationFaqs = [
  {
    '@type': 'Question',
    name: 'What does NDIS support coordination include in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Support coordination helps you understand your NDIS plan, connect with providers, coordinate services, and build confidence to manage supports over time.',
    },
  },
  {
    '@type': 'Question',
    name: 'Can support coordination help me find local providers quickly?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. Bright Support helps identify suitable local providers in Shepparton and nearby areas based on your goals, support needs, and availability requirements.',
    },
  },
  {
    '@type': 'Question',
    name: 'How do I get started with support coordination?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Share your NDIS plan details with Bright Support and the team will guide your intake, planning priorities, and first service connection steps.',
    },
  },
  {
    '@type': 'Question',
    name: 'Can Bright Support help with NDIS plan management in Shepparton?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. Bright Support can guide participants on NDIS plan management in Shepparton, including budget tracking, invoice processing, and coordinating plan usage with your support coordination goals.',
    },
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata({
    params: Promise.resolve({ locale: 'en', slug: 'support-coordination' }),
  });
}

export default function Page() {
  return (
    <>
      <StructuredData type="FAQPage" data={{ questions: supportCoordinationFaqs }} />
      <ServicePage params={Promise.resolve({ locale: 'en', slug: 'support-coordination' })} />
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Need NDIS Plan Management in Shepparton?</h2>
            <p className="text-slate-700 mb-5 leading-relaxed">
              If you need help with budgets, invoices, and provider payments, explore our dedicated plan management page.
              It explains how plan management works and how it supports your NDIS goals alongside support coordination.
            </p>
            <Link
              href="/ndis-plan-management-shepparton"
              className="inline-flex items-center justify-center bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Explore NDIS Plan Management Shepparton
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
