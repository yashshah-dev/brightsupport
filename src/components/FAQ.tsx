'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'What is the NDIS Disability Support Services?',
    answer: 'The NDIS (National Disability Insurance Scheme) is an Australian government initiative that provides funding and support for people with permanent and significant disabilities. NDIS Disability Support Services help participants access the support they need to live independently, pursue their goals, and participate in their community.',
  },
  {
    question: 'What types of services does the NDIS provide?',
    answer: 'The NDIS provides a wide range of services including daily living support, community nursing, physiotherapy, occupational therapy, community participation programs, transport assistance, personal training, hydrotherapy, companionship, accommodation support, and positive behavior support. Services are tailored to each participant\'s individual needs and goals.',
  },
  {
    question: 'Can I access the NDIS if I already receive support from other programs?',
    answer: 'Yes, you may be able to access the NDIS even if you currently receive support from other programs. However, the NDIS will work with you to ensure there is no duplication of services. Some existing supports may be replaced by NDIS funding, while others may continue alongside your NDIS plan. It\'s best to discuss your specific situation with an NDIS planner or Local Area Coordinator.',
  },
];

export default function FAQ({ 
  items = defaultFAQs,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about our services',
  className = 'py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30'
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={className}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-center text-slate-600 mb-12">{subtitle}</p>
          )}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-elegant overflow-hidden transition-all duration-300 border border-slate-100 hover:border-indigo-200"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-7 py-5 text-left flex justify-between items-center hover:bg-slate-50 transition-colors duration-300"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-slate-800 pr-4 text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={22}
                    className={`flex-shrink-0 text-indigo-600 transition-transform duration-300 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-7 pb-6 text-slate-600 leading-relaxed animate-in">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
