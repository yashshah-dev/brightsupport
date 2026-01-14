'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import {
    Home, Building2, Stethoscope, Users, Activity, Dumbbell,
    Droplets, Brain, Heart, Car, Sparkles, ShieldCheck
} from 'lucide-react';

export default function OurServicesPage() {
    const t = useTranslations('OurServices');
    const tService = useTranslations('ServiceDetails');
    const locale = useLocale();

    const services = [
        {
            icon: Home,
            titleKey: 'dailyLiving.title',
            descriptionKey: 'dailyLiving.subtitle',
            link: '/services/daily-living-in-home-support',
            imageSrc: '/images/services/daily-living.webp',
        },
        {
            icon: Stethoscope,
            titleKey: 'communityNursing.title',
            descriptionKey: 'communityNursing.subtitle',
            link: '/services/community-nursing-complex-care',
            imageSrc: '/images/services/nursing.webp',
        },
        {
            icon: Activity,
            titleKey: 'physiotherapy.title',
            descriptionKey: 'physiotherapy.subtitle',
            link: '/services/physiotherapy-services',
            imageSrc: '/images/services/physiotherapy.webp',
        },
        {
            icon: Users,
            titleKey: 'communityParticipation.title',
            descriptionKey: 'communityParticipation.subtitle',
            link: '/services/community-participation-group-programs',
            imageSrc: '/images/services/community-participation.webp',
        },
        {
            icon: Heart,
            titleKey: 'companionship.title',
            descriptionKey: 'companionship.subtitle',
            link: '/services/companionship',
            imageSrc: '/images/services/companionship.webp',
        },
        {
            icon: Car,
            titleKey: 'transport.title',
            descriptionKey: 'transport.subtitle',
            link: '/services/travel-transport-assistance',
            imageSrc: '/images/services/transport.webp',
        },
        {
            icon: Droplets,
            titleKey: 'hydrotherapy.title',
            descriptionKey: 'hydrotherapy.subtitle',
            link: '/services/hydrotherapy-pool-session',
        },
        {
            icon: Dumbbell,
            titleKey: 'personalTraining.title',
            descriptionKey: 'personalTraining.subtitle',
            link: '/services/personal-training-sessions',
        },
        {
            icon: Brain,
            titleKey: 'behaviourSupport.title',
            descriptionKey: 'behaviourSupport.subtitle',
            link: '/services/positive-behaviour-support',
        },
        {
            icon: Sparkles,
            titleKey: 'cleaning.title',
            descriptionKey: 'cleaning.subtitle',
            link: '/services/professional-cleaning',
        },
        {
            icon: Building2,
            titleKey: 'independentLiving.title',
            descriptionKey: 'independentLiving.subtitle',
            link: '/services/independent-living-accommodation-support',
        },
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

            {/* Services Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {services.map((service) => (
                            <div key={service.titleKey} className="h-full">
                                <ServiceCard
                                    title={tService(service.titleKey)}
                                    description={tService(service.descriptionKey)}
                                    href={`/${locale}${service.link}`}
                                    icon={<service.icon size={64} />}
                                    imageSrc={service.imageSrc}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-navy-800 to-sky-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">{t('hero.subtitle')}</h2>
                    <p className="text-lg text-sky-200 mb-8 max-w-2xl mx-auto">{t('hero.description')}</p>
                    <Link
                        href="/contact-us"
                        className="inline-block bg-coral-500 hover:bg-coral-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                    >
                        {t('hero.subtitle')}
                    </Link>
                </div>
            </section>
        </div>
    );
}
