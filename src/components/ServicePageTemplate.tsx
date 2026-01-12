'use client';

import Link from 'next/link';
import { Phone, CheckCircle } from 'lucide-react';
import FAQ from './FAQ';
import { trackPhoneCall, trackButtonClick } from '@/lib/analytics';

interface ServicePageTemplateProps {
  title: string;
  subtitle?: string;
  description: string;
  services?: string[];
  features?: Array<{
    title: string;
    description: string;
  }>;
  benefits?: string[];
  process?: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
}

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  services,
  features,
  benefits,
  process,
  faqItems,
}: ServicePageTemplateProps) {
  return (
    <div>
      {/* Hero Section - extra top padding to account for sticky header */}
      <section className="bg-gradient-to-br from-[#1E4D8C] via-[#2563EB] to-[#38BDF8] text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
            {subtitle && <p className="text-xl text-sky-100">{subtitle}</p>}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      {services && services.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-sky-50/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Services Offered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-6 rounded-2xl shadow-elegant border border-slate-100 hover:border-sky-200 hover:shadow-elegant-lg transition-all duration-300">
                    <CheckCircle className="text-[#1E4D8C] flex-shrink-0 mt-1" size={24} />
                    <span className="text-slate-800">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {features && features.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                What Sets Us Apart
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8 shadow-elegant border border-sky-100 hover:shadow-elegant-lg hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits List */}
      {benefits && benefits.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-sky-50/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Key Benefits
              </h2>
              <div className="bg-white rounded-2xl shadow-elegant p-10 border border-slate-100">
                <ul className="space-y-5">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <CheckCircle className="text-[#1E4D8C] flex-shrink-0 mt-1" size={24} />
                      <span className="text-lg text-slate-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Steps */}
      {process && process.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Our Process
              </h2>
              <div className="space-y-8">
                {process.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#1E4D8C] to-[#38BDF8] text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-elegant">
                      {step.step}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-3 text-slate-800">{step.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqItems && faqItems.length > 0 && <FAQ items={faqItems} />}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1E4D8C] via-[#2563EB] to-[#38BDF8] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Check Your Eligibility
            </h2>
            <p className="text-xl mb-10 text-sky-100">
              Contact us today to learn more about this service and check your NDIS eligibility
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href="tel:1800407508"
                className="bg-white hover:bg-sky-50 text-[#1E4D8C] px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                onClick={() => trackPhoneCall('1800 407 508', { service_page: title })}
              >
                <Phone size={20} />
                1800 407 508
              </a>
              <Link
                href="/contact-us"
                className="bg-[#DC3545] hover:bg-[#C82333] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
                onClick={() => trackButtonClick('contact_us_online', { service_page: title })}
              >
                Contact Us Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
