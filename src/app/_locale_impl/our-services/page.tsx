'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import {
    Home, Building2, Stethoscope, Users, Activity, Dumbbell,
    Droplets, Brain, Heart, Car, Sparkles, ShieldCheck, ClipboardList
} from 'lucide-react';

export default function OurServicesPage() {
    const t = useTranslations('OurServices');
    const tService = useTranslations('ServiceDetails');

    const services = [
        {
            icon: Building2,
            titleKey: 'independentLiving.title',
            descriptionKey: 'independentLiving.subtitle',
            link: '/supported-independent-living-sil-shepparton',
            imageSrc: '/images/services/independent-living.webp',
        },
        {
            icon: ClipboardList,
            titleKey: 'supportCoordination.title',
            descriptionKey: 'supportCoordination.subtitle',
            link: '/ndis-support-coordination',
            imageSrc: '/images/services/support-coordination.webp',
        },
        {
            icon: Home,
            titleKey: 'dailyLiving.title',
            descriptionKey: 'dailyLiving.subtitle',
            link: '/daily-living-in-home-support',
            imageSrc: '/images/services/daily-living.webp',
        },
        {
            icon: Stethoscope,
            titleKey: 'communityNursing.title',
            descriptionKey: 'communityNursing.subtitle',
            link: '/community-nursing-complex-care',
            imageSrc: '/images/services/nursing.webp',
        },
        {
            icon: Activity,
            titleKey: 'physiotherapy.title',
            descriptionKey: 'physiotherapy.subtitle',
            link: '/physiotherapy-services',
            imageSrc: '/images/services/physiotherapy.webp',
        },
        {
            icon: Users,
            titleKey: 'communityParticipation.title',
            descriptionKey: 'communityParticipation.subtitle',
            link: '/community-participation-group-programs',
            imageSrc: '/images/services/community-participation.webp',
        },
        // {
        //     icon: Heart,
        //     titleKey: 'companionship.title',
        //     descriptionKey: 'companionship.subtitle',
        //     link: '/companion-care-services',
        //     imageSrc: '/images/services/companionship.webp',
        // },
        // {
        //     icon: Car,
        //     titleKey: 'transport.title',
        //     descriptionKey: 'transport.subtitle',
        //     link: '/ndis-transport-service-provider',
        //     imageSrc: '/images/services/transport.webp',
        // },
        {
            icon: Droplets,
            titleKey: 'hydrotherapy.title',
            descriptionKey: 'hydrotherapy.subtitle',
            link: '/ndis-hydrotherapy-services',
            imageSrc: '/images/services/hydrotherapy.png',
        },
        {
            icon: Dumbbell,
            titleKey: 'personalTraining.title',
            descriptionKey: 'personalTraining.subtitle',
            link: '/personal-training-sessions',
            imageSrc: '/images/services/personal-training.png',
        },
        {
            icon: Brain,
            titleKey: 'behaviourSupport.title',
            descriptionKey: 'behaviourSupport.subtitle',
            link: '/positive-behaviour-support',
            imageSrc: '/images/services/positive-behaviour-support.png',

        },
        // {
        //     icon: Sparkles,
        //     titleKey: 'cleaning.title',
        //     descriptionKey: 'cleaning.subtitle',
        //     link: '/ndis-cleaning-services',
        // },
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
                                    href={service.link}
                                    icon={<service.icon size={64} />}
                                    imageSrc={service.imageSrc}
                                    disableResponsive={service.titleKey === 'supportCoordination.title' || service.titleKey === 'independentLiving.title'}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold text-navy-900 mb-5">NDIS Services in Shepparton: How to Choose the Right Mix</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Participants often need more than one support type to reach their goals. For example, daily living supports
                        can be combined with community participation, while nursing or therapy supports may be scheduled alongside
                        support coordination to keep services aligned and practical.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Bright Support provides local NDIS services in Shepparton with a person-first approach. We focus on reliable
                        rostering, clear communication, and measurable outcomes so participants and families understand what is
                        being delivered and why it matters for plan goals.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        If you are comparing providers, review each service page above and then contact our team to discuss funding,
                        service availability, and implementation timelines for your location.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h3 className="font-semibold text-navy-900 mb-1">For New Participants</h3>
                            <p>Start with core supports, then add capacity-building services as your plan goals evolve.</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h3 className="font-semibold text-navy-900 mb-1">For Plan Reviews</h3>
                            <p>Use service outcomes and usage patterns to request realistic funding for the next plan period.</p>
                        </div>
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
