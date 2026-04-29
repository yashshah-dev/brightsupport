'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { CheckCircle, Award, TrendingUp, Heart, Users, Clock } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

export default function CareerPage() {
    const t = useTranslations('Career');
    const tBenefits = useTranslations('Career.benefits.items');
    const tPositions = useTranslations('Career.positions');

    const benefits = [
        { icon: Award, key: 'pay' },
        { icon: Clock, key: 'flexibility' },
        { icon: TrendingUp, key: 'training' },
        { icon: Users, key: 'support' },
        { icon: Heart, key: 'impact' },
        { icon: CheckCircle, key: 'growth' },
    ];

    const positions = ['supportWorker', 'nurse', 'coordinator'];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-sky-900 text-white pt-32 pb-20">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('hero.title')}</h1>
                        <p className="text-xl text-sky-200 mb-4">{t('hero.subtitle')}</p>
                        <p className="text-lg text-gray-300">{t('hero.description')}</p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-900 text-center mb-16">{t('benefits.title')}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {benefits.map((benefit) => (
                            <div key={benefit.key} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-14 h-14 bg-gradient-to-br from-navy-500 to-sky-500 rounded-xl flex items-center justify-center mb-4">
                                    <benefit.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 mb-2">{tBenefits(`${benefit.key}.title`)}</h3>
                                <p className="text-gray-600">{tBenefits(`${benefit.key}.description`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Positions Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-900 text-center mb-16">{tPositions('title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {positions.map((position) => (
                            <div key={position} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <h3 className="text-xl font-bold text-navy-900 mb-3">{tPositions(`${position}.title`)}</h3>
                                <p className="text-gray-600">{tPositions(`${position}.description`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-navy-900 mb-5">Build a Long-Term NDIS Career in Shepparton</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Bright Support hires team members who value person-centred care, consistent communication, and practical
                        outcomes for participants. Whether you are applying for a disability support worker role, a nursing position,
                        or a coordination role, we look for people who can deliver reliable support and uphold NDIS quality standards.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Our Shepparton team supports participants across daily living, community access, clinical supports,
                        and capacity-building services. This creates real professional growth opportunities for staff who want
                        varied experience and clear development pathways in disability support.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        If you are searching for NDIS career opportunities in Shepparton with structured onboarding,
                        supportive leadership, and meaningful participant impact, we encourage you to submit your interest.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Flexible scheduling options across weekdays and weekends.</li>
                        <li>Team-based support with clear escalation pathways.</li>
                        <li>Ongoing training aligned to NDIS compliance and participant outcomes.</li>
                    </ul>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-[#1E4D8C] to-[#38BDF8] text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
                    <p className="text-lg text-sky-100 mb-8 max-w-2xl mx-auto">{t('cta.description')}</p>
                    <Link
                        href="/contact-us"
                        className="inline-block bg-white text-[#1E4D8C] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {t('cta.button')}
                    </Link>
                </div>
            </section>
        </div>
    );
}
