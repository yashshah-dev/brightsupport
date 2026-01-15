'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
    Phone,
    CheckCircle,
    Star,
    Users,
    Award,
    Clock,
    Heart,
    Home,
    Stethoscope,
    Activity,
    Car,
    Sparkles,
    Shield,
} from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import { useTranslations, useLocale } from 'next-intl';
import { trackPhoneCall, trackButtonClick } from '@/lib/analytics';
import { useVideoTracking } from '@/hooks/useAnalytics';


// Service keys that map to translation keys
const serviceKeys = [
    {
        key: 'dailyLiving',
        imageSrc: '/images/services/daily-living.webp',
        href: '/services/daily-living-in-home-support/',
        icon: Home,
    },
    {
        key: 'communityNursing',
        imageSrc: '/images/services/nursing.webp',
        href: '/services/community-nursing-complex-care/',
        icon: Stethoscope,
    },
    {
        key: 'physiotherapy',
        imageSrc: '/images/services/physiotherapy.webp',
        href: '/services/physiotherapy-services/',
        icon: Activity,
    },
    {
        key: 'communityParticipation',
        imageSrc: '/images/services/community-participation.webp',
        href: '/services/community-participation-group-programs/',
        icon: Users,
    },
    {
        key: 'companionship',
        imageSrc: '/images/services/companionship.webp',
        href: '/services/companionship/',
        icon: Heart,
    },
    {
        key: 'transport',
        imageSrc: '/images/services/transport.webp',
        href: '/services/travel-transport-assistance/',
        icon: Car,
    },
];

export default function HomePage() {
    const t = useTranslations();
    const locale = useLocale();
    const { trackVideoPlay } = useVideoTracking();

    // Helper to get locale-aware href
    const getLocalizedHref = (path: string) => {
        return `/${locale}${path}`;
    };

    // Lazy Video Embed Component
    function LazyVideoEmbed({ videoId, title }: { videoId: string; title: string }) {
        const [load, setLoad] = useState(false);
        const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        return (
            <div className="aspect-video rounded-3xl overflow-hidden shadow-elegant-lg border-4 border-white hover:scale-[1.02] transition-transform duration-300 relative bg-black">
                {!load && (
                    <button
                        type="button"
                        aria-label={`Play video: ${title}`}
                        onClick={() => {
                            setLoad(true);
                            trackVideoPlay(title, { video_id: videoId, source: 'homepage' });
                        }}
                        className="group w-full h-full relative"
                        style={{ display: 'block' }}
                    >
                        <img
                            src={thumb}
                            alt={title}
                            className="w-full h-full object-cover group-hover:brightness-90 transition"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/80 backdrop-blur-sm rounded-full p-5 shadow-elegant group-hover:scale-110 transition-transform">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1E4D8C]">
                                    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </button>
                )}
                {load && (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                    ></iframe>
                )}
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 text-slate-800 py-24 md:py-36 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDk5LCAxMDIsIDI0MSwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            {/* Trust Badges & Acceptance Banner */}
                            <div className="mb-8 space-y-4">
                                {/* Accepting Participants Banner */}
                                <div className="inline-flex items-center gap-2 bg-green-50 border-2 border-green-200 px-6 py-3 rounded-full shadow-sm">
                                    <CheckCircle size={20} className="text-green-600" />
                                    <span className="text-sm md:text-base font-semibold text-green-700">
                                        {t('Hero.acceptingBanner')}
                                    </span>
                                </div>

                                {/* NDIS Registration Badges */}
                                <div className="flex flex-wrap gap-3 items-center justify-center lg:justify-start">
                                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-md border border-sky-100 flex items-center gap-2">
                                        <Award size={18} className="text-[#1E4D8C]" />
                                        <div className="text-left">
                                            <p className="text-xs font-semibold text-slate-800">{t('Hero.trustBadge.registered')}</p>
                                            <p className="text-xs text-slate-600">{t('Hero.trustBadge.since')}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-md border border-sky-100">
                                        <p className="text-xs font-medium text-slate-700">{t('Hero.trustBadge.registrationNumber')}</p>
                                    </div>
                                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-md border border-sky-100 flex items-center gap-2">
                                        <Clock size={16} className="text-green-600" />
                                        <p className="text-xs font-semibold text-slate-800">{t('Hero.responseGuarantee')}</p>
                                    </div>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent animate-scale-in text-center lg:text-left">
                                {t('Hero.title')}
                            </h1>
                            <p className="text-2xl md:text-3xl mb-6 font-light bg-gradient-to-r from-[#1E4D8C] to-[#38BDF8] bg-clip-text text-transparent text-center lg:text-left">
                                {t('Hero.subtitle')}
                            </p>
                            <p className="text-lg md:text-xl mb-12 leading-relaxed text-slate-600 text-center lg:text-left">
                                {t('Hero.description')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center animate-in">
                                <Link
                                    href={getLocalizedHref('/our-services/')}
                                    className="bg-gradient-to-r from-[#1E4D8C] to-[#2563EB] hover:from-[#0F2D4D] hover:to-[#1E4D8C] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                    onClick={() => trackButtonClick('discover_services', { source: 'hero_section' })}
                                >
                                    {t('Hero.cta.services')}
                                </Link>
                                <Link
                                    href={getLocalizedHref('/contact-us/')}
                                    className="bg-white hover:bg-slate-50 text-slate-700 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg border-2 border-slate-200 hover:border-indigo-300 flex items-center gap-2"
                                    onClick={() => trackButtonClick('book_assessment', { source: 'hero_section' })}
                                >
                                    <Phone size={20} className="text-[#1E4D8C]" />
                                    {t('Hero.cta.contact')}
                                </Link>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="relative rounded-3xl overflow-hidden shadow-elegant-lg">
                                <ResponsiveImage
                                    src="/images/hero/hero-main.webp"
                                    alt="NDIS support worker providing compassionate care to participant"
                                    priority
                                    className="w-full h-auto object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    width={1200}
                                    height={800}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-20 bg-gradient-to-br from-white to-slate-50" style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                {t('Video.title')}
                            </h2>
                            <p className="text-lg text-slate-600">
                                {t('Video.subtitle')}
                            </p>
                        </div>
                        <LazyVideoEmbed videoId="0Vyy3CjCcKk" title="Bright Support Services" />
                    </div>
                </div>
            </section>

            {/* Types of Care / Services Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            {t('Services.title')}
                        </h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            {t('Services.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {serviceKeys.map((service) => (
                            <ServiceCard
                                key={service.key}
                                title={t(`Services.items.${service.key}.title`)}
                                description={t(`Services.items.${service.key}.description`)}
                                imageSrc={service.imageSrc}
                                href={getLocalizedHref(service.href)}
                                icon={<service.icon size={64} />}
                            />
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            href={getLocalizedHref('/our-services/')}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg"
                        >
                            {t('Services.viewAllServices')}
                            <Sparkles size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Our Goal Section */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-sky-50/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            {t('OurGoal.title')}
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            {t('OurGoal.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center mb-12">
                        <div className="space-y-8">
                            {[
                                { icon: Clock, key: 'easy' },
                                { icon: Shield, key: 'support' },
                            ].map(({ icon: Icon, key }) => (
                                <div
                                    key={key}
                                    className="bg-white rounded-2xl shadow-elegant p-9 hover:shadow-elegant-lg transition-all duration-300 border border-slate-100 hover:border-indigo-200 group hover:-translate-y-1"
                                >
                                    <div className="text-[#1E4D8C] mb-5 group-hover:scale-110 transition-transform duration-300">
                                        <Icon size={48} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-[#1E4D8C] transition-colors duration-300">
                                        {t(`OurGoal.items.${key}.title`)}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {t(`OurGoal.items.${key}.description`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="relative rounded-3xl overflow-hidden shadow-elegant-lg">
                            <ResponsiveImage
                                src="/images/general/services-in-action.webp"
                                alt="NDIS support worker assisting participant with daily living activities"
                                loading="lazy"
                                className="w-full h-auto object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                width={800}
                                height={1000}
                                widths={[480, 768, 1024]}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-white">
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
                            <div key={key} className="bg-gradient-to-br from-slate-50 to-sky-50/50 p-8 rounded-2xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 hover:-translate-y-1">
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

            {/* Service Guarantees Section */}
            <section className="py-16 bg-gradient-to-br from-[#1E4D8C] via-[#2563EB] to-[#38BDF8] text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {t('Hero.guarantees.title')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { key: 'response', icon: Clock },
                            { key: 'sameDay', icon: Users },
                            { key: 'emergency', icon: Phone },
                        ].map(({ key, icon: Icon }) => (
                            <div key={key} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                                    <Icon size={32} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-center">
                                    {t(`Hero.guarantees.items.${key}.title`)}
                                </h3>
                                <p className="text-sky-100 text-center">
                                    {t(`Hero.guarantees.items.${key}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ />

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-[#1E4D8C] via-[#2563EB] to-[#38BDF8] text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <Star className="mx-auto mb-6 text-yellow-400" size={48} />
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            {t('CTA.title')}
                        </h2>
                        <p className="text-xl mb-10 text-sky-100">
                            {t('CTA.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <a
                                href="tel:1800407508"
                                className="bg-white hover:bg-sky-50 text-[#1E4D8C] px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                                onClick={() => trackPhoneCall('1800 407 508', { source: 'cta_section' })}
                            >
                                <Phone size={20} />
                                {t('CTA.phone')}
                            </a>
                            <Link
                                href={getLocalizedHref('/contact-us/')}
                                className="bg-[#DC3545] hover:bg-[#C82333] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
                                onClick={() => trackButtonClick('send_message', { source: 'cta_section' })}
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
