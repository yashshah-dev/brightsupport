'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
    Phone,
    CheckCircle,
    Star,
    Users,
    Award,
    Clock,
    Heart,
} from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { useTranslations } from 'next-intl';
import { trackPhoneCall, trackButtonClick } from '@/lib/analytics';


const services = [
    {
        title: 'Community Nursing & Complex Care',
        description: 'Professional nursing care including wound care, medication management, and chronic disease support delivered by qualified nurses in your home.',
        image: '/images/services/nursing',
        href: '/services/community-nursing-complex-care/',
    },
    {
        title: 'Daily Living & In-Home Support',
        description: 'Assistance with everyday activities to help you maintain independence at home, including personal care, meal preparation, and household tasks.',
        image: '/images/services/daily-living',
        href: '/services/daily-living-in-home-support/',
    },
    {
        title: 'Independent Living & Accommodation Support',
        description: 'Support to live independently in your own home or supported accommodation, with assistance tailored to your needs.',
        image: '/images/services/transport',
        href: '/services/independent-living-accommodation-support/',
    },
    {
        title: 'Community Participation & Group Programs',
        description: 'Engaging programs to build social connections, develop skills, and participate in community activities.',
        image: '/images/services/community-participation',
        href: '/services/community-participation-group-programs/',
    },
    {
        title: 'Physiotherapy Services',
        description: 'Expert physiotherapy to improve mobility, manage pain, and enhance physical function with personalized treatment plans.',
        image: '/images/services/physiotherapy',
        href: '/services/physiotherapy-services/',
    },
    {
        title: 'Travel & Transport Assistance',
        description: 'Safe and reliable transport to appointments, activities, and community participation with trained support workers.',
        image: '/images/services/transport',
        href: '/services/travel-transport-assistance/',
    },
];

export default function HomePage() {
    const t = useTranslations();

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/50 to-blue-50/30">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-[#38BDF8]/20 to-[#1E4D8C]/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 -left-32 w-80 h-80 bg-gradient-to-tr from-[#1E4D8C]/15 to-[#38BDF8]/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Content Column */}
                        <div className="space-y-8">
                            {/* Trust Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-sky-100 shadow-elegant">
                                <CheckCircle className="text-emerald-500" size={18} />
                                <span className="text-sm font-medium text-slate-700">
                                    {t('Hero.trusted')}
                                </span>
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                                    {t('Hero.title')}
                                </h1>
                                <p className="text-xl md:text-2xl text-[#1E4D8C] font-medium">
                                    {t('Hero.subtitle')}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                                {t('Hero.description')}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/our-services/"
                                    className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1E4D8C] to-[#2563EB] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105"
                                    onClick={() => trackButtonClick('discover_services', { location: 'hero' })}
                                >
                                    {t('Hero.cta.services')}
                                </Link>
                                <Link
                                    href="/contact-us/"
                                    className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 px-8 py-4 rounded-full font-semibold text-lg border-2 border-slate-200 transition-all duration-300 hover:border-[#1E4D8C] hover:shadow-lg"
                                    onClick={() => trackButtonClick('contact_hero', { location: 'hero' })}
                                >
                                    <Phone size={20} className="text-[#DC3545]" />
                                    {t('Hero.cta.contact')}
                                </Link>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div className="relative lg:h-[600px] hidden lg:block">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1E4D8C]/5 to-[#38BDF8]/10 rounded-[3rem] transform rotate-3"></div>
                            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                <picture>
                                    <source
                                        type="image/avif"
                                        srcSet="/images/hero/hero-main-480.avif 480w, /images/hero/hero-main-768.avif 768w, /images/hero/hero-main-1024.avif 1024w, /images/hero/hero-main-1400.avif 1400w"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <source
                                        type="image/webp"
                                        srcSet="/images/hero/hero-main-480.webp 480w, /images/hero/hero-main-768.webp 768w, /images/hero/hero-main-1024.webp 1024w, /images/hero/hero-main-1400.webp 1400w"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <Image
                                        src="/images/hero/hero-main.png"
                                        alt="Bright Support NDIS caregiver helping client with disability support services"
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                            {t('Services.title')}
                        </h2>
                        <p className="text-lg text-slate-600">
                            {t('Services.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <ServiceCard
                                key={service.title}
                                {...service}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-gradient-to-br from-slate-50 to-sky-50/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                            {t('WhyChoose.title')}
                        </h2>
                        <p className="text-lg text-slate-600">
                            {t('WhyChoose.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Users, key: 'experienced' },
                            { icon: Heart, key: 'person' },
                            { icon: Clock, key: 'available' },
                            { icon: Award, key: 'registered' },
                        ].map(({ icon: Icon, key }) => (
                            <div key={key} className="bg-white p-8 rounded-2xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#1E4D8C] to-[#38BDF8] rounded-xl flex items-center justify-center mb-6 text-white">
                                    <Icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">
                                    {t(`WhyChoose.items.${key}.title`)}
                                </h3>
                                <p className="text-slate-600">
                                    {t(`WhyChoose.items.${key}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-[#1E4D8C] via-[#2563EB] to-[#38BDF8] text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <Star className="mx-auto mb-6 text-yellow-400" size={48} />
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            {t('CTA.title')}
                        </h2>
                        <p className="text-xl mb-10 text-sky-100">
                            {t('CTA.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:1800407508"
                                className="inline-flex items-center justify-center gap-2 bg-white text-[#1E4D8C] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                                onClick={() => trackPhoneCall('1800 407 508', { location: 'cta_section' })}
                            >
                                <Phone size={20} />
                                {t('CTA.phone')}
                            </a>
                            <Link
                                href="/contact-us/"
                                className="inline-flex items-center justify-center gap-2 bg-[#DC3545] hover:bg-[#C82333] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                                onClick={() => trackButtonClick('contact_us_cta', {})}
                            >
                                {t('CTA.online')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
