'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Phone, CheckCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// Map slugs to translation keys
const slugToKeyMap: Record<string, string> = {
    'daily-living-in-home-support': 'dailyLiving',
    'community-nursing-complex-care': 'communityNursing',
    'physiotherapy-services': 'physiotherapy',
    'community-participation-group-programs': 'communityParticipation',
    'companionship': 'companionship',
    'travel-transport-assistance': 'transport',
    'hydrotherapy-pool-session': 'hydrotherapy',
    'personal-training-sessions': 'personalTraining',
    'positive-behaviour-support': 'behaviourSupport',
    'professional-cleaning': 'cleaning',
    'independent-living-accommodation-support': 'independentLiving',
};

interface ServicePageClientProps {
    slug: string;
}

export default function ServicePageClient({ slug }: ServicePageClientProps) {
    const translationKey = slugToKeyMap[slug] || 'dailyLiving';

    const t = useTranslations(`ServiceDetails.${translationKey}`);
    const tPage = useTranslations('ServicePage');

    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    // Get services array
    const services: string[] = [];
    try {
        for (let i = 0; i < 10; i++) {
            const service = t(`services.${i}`);
            if (service && !service.includes('services.')) {
                services.push(service);
            }
        }
    } catch {
        // Services not found
    }

    // Get features
    const featureKeys = ['support247', 'qualified', 'personCentered', 'flexible', 'registered', 'available',
        'coordinated', 'training', 'homeVisits', 'personalized', 'equipment', 'variety', 'inclusive',
        'skills', 'connections', 'matched', 'trained', 'meaningful', 'reliable', 'accessible', 'warm',
        'individual', 'progress', 'location', 'safe', 'evidenceBased', 'collaborative', 'products',
        'skillBuilding', 'quality'];

    const features: { title: string; description: string }[] = [];
    for (const key of featureKeys) {
        try {
            if (t.has(`features.${key}`)) {
                const title = t(`features.${key}.title`);
                const description = t(`features.${key}.description`);
                if (title && !title.includes(`features.${key}`)) {
                    features.push({ title, description });
                }
            }
        } catch {
            // Feature not found
        }
    }

    // Get FAQ items
    const faqItems: { question: string; answer: string }[] = [];
    for (let i = 0; i < 5; i++) {
        try {
            if (t.has(`faq.${i}`)) {
                const question = t(`faq.${i}.question`);
                const answer = t(`faq.${i}.answer`);
                if (question && !question.includes(`faq.${i}`)) {
                    faqItems.push({ question, answer });
                }
            }
        } catch {
            // FAQ not found
        }
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-sky-900 text-white pt-32 pb-20">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
                        <p className="text-xl text-sky-200 mb-4">{t('subtitle')}</p>
                        <p className="text-lg text-gray-300">{t('description')}</p>
                    </div>
                </div>
            </section>

            {/* Services List */}
            {services.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-navy-900 mb-8">{tPage('services')}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {services.map((service, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Features */}
            {features.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">{tPage('features')}</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {features.slice(0, 4).map((feature, index) => (
                                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                                        <h3 className="text-lg font-bold text-navy-900 mb-2">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            {faqItems.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">{tPage('faq')}</h2>
                            <div className="space-y-4">
                                {faqItems.map((item, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                            className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            <span className="font-semibold text-navy-900">{item.question}</span>
                                            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
                                        </button>
                                        {expandedFaq === index && (
                                            <div className="p-4 bg-white">
                                                <p className="text-gray-600">{item.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-coral-500 to-coral-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">{tPage('ctaTitle')}</h2>
                    <p className="text-lg text-coral-100 mb-8 max-w-2xl mx-auto">{tPage('ctaDescription')}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:1800407508"
                            className="inline-flex items-center justify-center gap-2 bg-white text-coral-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            1800 407 508
                        </a>
                        <Link
                            href="/contact-us"
                            className="inline-block bg-navy-800 hover:bg-navy-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                        >
                            {tPage('ctaButton')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
