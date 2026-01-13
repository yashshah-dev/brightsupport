'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { Target, Users, Heart, Award, Download } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

export default function AboutUsPage() {
    const t = useTranslations('AboutUs');
    const tValues = useTranslations('AboutUs.values');

    const values = [
        { icon: Heart, key: 'compassion' },
        { icon: Target, key: 'integrity' },
        { icon: Award, key: 'excellence' },
        { icon: Users, key: 'respect' },
    ];

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

            {/* Mission & Vision */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-navy-50 to-sky-50 p-8 rounded-2xl">
                            <div className="w-16 h-16 bg-navy-600 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('mission.title')}</h2>
                            <p className="text-gray-600 leading-relaxed">{t('mission.description')}</p>
                        </div>
                        <div className="bg-gradient-to-br from-coral-50 to-orange-50 p-8 rounded-2xl">
                            <div className="w-16 h-16 bg-coral-500 rounded-xl flex items-center justify-center mb-6">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('vision.title')}</h2>
                            <p className="text-gray-600 leading-relaxed">{t('vision.description')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">{t('values.title')}</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {values.map((value) => (
                            <div key={value.key} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                                <div className="w-14 h-14 bg-gradient-to-br from-navy-500 to-sky-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-navy-900 mb-2">{tValues(`${value.key}.title`)}</h3>
                                <p className="text-gray-600 text-sm">{tValues(`${value.key}.description`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">{t('team.title')}</h2>
                                <p className="text-gray-600 leading-relaxed mb-8">{t('team.description')}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-navy-50 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-navy-600">{t('stats.clients')}</div>
                                    </div>
                                    <div className="bg-sky-50 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-sky-600">{t('stats.staff')}</div>
                                    </div>
                                    <div className="bg-coral-50 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-coral-600">{t('stats.years')}</div>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-green-600">{t('stats.locations')}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <ResponsiveImage
                                    src={getAssetPath('/images/team/team-photo')}
                                    alt="Bright Support Team"
                                    className="rounded-2xl shadow-xl"
                                    priority={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
