'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Phone, CheckCircle, ChevronDown } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';
import { ResponsiveImage } from '@/components/ResponsiveImage';

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
    heroImage?: string;
    galleryImages?: string[];
}

export default function ServicePageClient({ slug, heroImage, galleryImages }: ServicePageClientProps) {
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
            {/* Hero Section with Image */}
            <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-sky-900 text-white pt-32 pb-20 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: `url(${getAssetPath('/images/pattern.svg')})` }}
                ></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{t('title')}</h1>
                            <p className="text-xl text-sky-200 mb-4 font-medium">{t('subtitle')}</p>
                            <p className="text-lg text-gray-300 leading-relaxed">{t('description')}</p>
                        </div>
                        <div className="relative block">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3]">
                                {heroImage ? (
                                    <ResponsiveImage
                                        src={heroImage}
                                        alt={t('title')}
                                        className="w-full h-full object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        priority
                                    />
                                ) : (
                                    /* Hero Image Placeholder */
                                    <div className="absolute inset-0 bg-gradient-to-br from-navy-700 to-sky-800 flex items-center justify-center p-8">
                                        <div className="text-center space-y-3">
                                            <div className="w-16 h-16 mx-auto bg-sky-500/20 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-sky-200 text-sm font-medium">Hero Image 1</p>
                                            {t.has('images.hero') && (
                                                <p className="text-sky-300/60 text-xs italic max-w-xs mx-auto">{t('images.hero')}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-coral-500 rounded-full blur-3xl opacity-20"></div>
                            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-sky-500 rounded-full blur-3xl opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Gallery Section */}
            {t.has('images.gallery') && (
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="grid md:grid-cols-3 gap-6">
                                {[0, 1, 2].map((index) => {
                                    const hasImage = t.has(`images.gallery.${index}`);
                                    if (!hasImage) return null;
                                    const galleryImage = galleryImages?.[index];

                                    return (
                                        <div key={index} className="group">
                                            <div className="relative rounded-xl overflow-hidden shadow-lg bg-white aspect-[4/3]">
                                                {galleryImage ? (
                                                    <ResponsiveImage
                                                        src={galleryImage}
                                                        alt={t(`images.gallery.${index}.caption`)}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                        widths={[480, 768, 1024]}
                                                    />
                                                ) : (
                                                    /* Gallery Image Placeholder */
                                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
                                                        <div className="text-center space-y-2">
                                                            <div className="w-12 h-12 mx-auto bg-gray-300/50 rounded-full flex items-center justify-center">
                                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                            <p className="text-gray-500 text-xs italic px-2 line-clamp-3">
                                                                {t(`images.gallery.${index}.prompt`)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="mt-3 text-sm text-gray-600 text-center font-medium">
                                                {t(`images.gallery.${index}.caption`)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

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
