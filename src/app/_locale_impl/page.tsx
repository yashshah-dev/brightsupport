'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
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
    Sparkles,
    Shield,
    ClipboardList,
    Droplets,
    Dumbbell,
    Brain,
} from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { trackPhoneCall, trackButtonClick } from '@/lib/analytics';
import { useVideoTracking } from '@/hooks/useAnalytics';
import { getServiceUrl } from '@/lib/serviceUrls';


// Service keys that map to translation keys
const serviceKeys = [
    {
        key: 'independentLiving',
        imageSrc: '/images/services/independent-living.webp',
        href: getServiceUrl('independent-living-accommodation-support'),
        icon: Home,
    },
    {
        key: 'supportCoordination',
        imageSrc: '/images/services/support-coordination.webp',
        href: getServiceUrl('support-coordination'),
        icon: ClipboardList,
    },
    {
        key: 'dailyLiving',
        imageSrc: '/images/services/daily-living.webp',
        href: getServiceUrl('daily-living-in-home-support'),
        icon: Home,
    },
    {
        key: 'communityNursing',
        imageSrc: '/images/services/nursing.webp',
        href: getServiceUrl('community-nursing-complex-care'),
        icon: Stethoscope,
    },
    {
        key: 'physiotherapy',
        imageSrc: '/images/services/physiotherapy.webp',
        href: getServiceUrl('physiotherapy-services'),
        icon: Activity,
    },
    {
        key: 'communityParticipation',
        imageSrc: '/images/services/community-participation.webp',
        href: getServiceUrl('community-participation-group-programs'),
        icon: Users,
    },
    {
        key: 'hydrotherapy',
        imageSrc: '/images/services/hydrotherapy.png',
        href: getServiceUrl('hydrotherapy-pool-session'),
        icon: Droplets,
    },
    {
        key: 'personalTraining',
        imageSrc: '/images/services/personal-training.png',
        href: getServiceUrl('personal-training-sessions'),
        icon: Dumbbell,
    },
    {
        key: 'behaviourSupport',
        imageSrc: '/images/services/positive-behaviour-support.png',
        href: getServiceUrl('positive-behaviour-support'),
        icon: Brain,
    },
];

export default function HomePage() {
    const t = useTranslations();
    const pathname = usePathname();
    const { trackVideoPlay } = useVideoTracking();
    const scrollRef = useRef<HTMLDivElement>(null);
    const heroReviewsRef = useRef<HTMLDivElement>(null);

    const heroReviews = [
        {
            name: 'Kaylene Matthey',
            rating: 5,
            text: 'Excellent service and very professional staff. They genuinely care about their clients and provide outstanding support.',
        },
        {
            name: 'Julie Seaton',
            rating: 5,
            text: 'The team at Bright Support has been wonderful. They are reliable, compassionate, and always go the extra mile.',
        },
        {
            name: 'Kenneth Mccoll',
            rating: 5,
            text: 'Highly recommend Bright Support. Their support workers are skilled, friendly, and make a real difference in our lives.',
        },
        {
            name: 'Brenton Wilhelm',
            rating: 5,
            text: 'Professional and caring service. The staff are well-trained and understand the unique needs of each individual.',
        },
    ];

    useEffect(() => {
        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    }, [pathname]);

    // Auto-scroll logic for services
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const AUTO_SCROLL_DELAY_MS = 5000;
        const AUTO_SCROLL_SPEED_PX_PER_SEC = 120;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            return;
        }

        let hasUserInteracted = false;
        let isInView = true;
        let canAutoScroll = false;
        let lastTimestamp = 0;
        let animationFrameId: number | null = null;

        const stopAnimation = () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        const shouldRun = () => {
            if (!canAutoScroll || hasUserInteracted || !isInView || document.hidden) {
                return false;
            }

            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            return maxScroll > 0;
        };

        const tick = (timestamp: number) => {
            if (!shouldRun()) {
                stopAnimation();
                return;
            }

            if (lastTimestamp === 0) {
                lastTimestamp = timestamp;
            }

            const dt = Math.min(50, timestamp - lastTimestamp);
            lastTimestamp = timestamp;

            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const distance = (AUTO_SCROLL_SPEED_PX_PER_SEC * dt) / 1000;

            if (scrollContainer.scrollLeft >= maxScroll - 1) {
                scrollContainer.scrollLeft = 0;
            } else {
                scrollContainer.scrollLeft = Math.min(maxScroll, scrollContainer.scrollLeft + distance);
            }

            animationFrameId = requestAnimationFrame(tick);
        };

        const startAnimation = () => {
            if (animationFrameId !== null || !shouldRun()) {
                return;
            }
            lastTimestamp = 0;
            animationFrameId = requestAnimationFrame(tick);
        };

        const stopAutoScrollOnFirstInteraction = () => {
            hasUserInteracted = true;
            stopAnimation();
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopAnimation();
            } else {
                startAnimation();
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                isInView = entry.isIntersecting;
                if (isInView) {
                    startAnimation();
                } else {
                    stopAnimation();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(scrollContainer);

        const delayTimeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
            canAutoScroll = true;
            startAnimation();
        }, AUTO_SCROLL_DELAY_MS);

        document.addEventListener('visibilitychange', handleVisibilityChange);
        scrollContainer.addEventListener('mouseenter', stopAutoScrollOnFirstInteraction);
        scrollContainer.addEventListener('touchstart', stopAutoScrollOnFirstInteraction, { passive: true });
        scrollContainer.addEventListener('pointerdown', stopAutoScrollOnFirstInteraction, { passive: true });
        scrollContainer.addEventListener('wheel', stopAutoScrollOnFirstInteraction, { passive: true });
        scrollContainer.addEventListener('scroll', stopAutoScrollOnFirstInteraction, { passive: true });

        return () => {
            clearTimeout(delayTimeoutId);
            stopAnimation();
            observer.disconnect();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            scrollContainer.removeEventListener('mouseenter', stopAutoScrollOnFirstInteraction);
            scrollContainer.removeEventListener('touchstart', stopAutoScrollOnFirstInteraction);
            scrollContainer.removeEventListener('pointerdown', stopAutoScrollOnFirstInteraction);
            scrollContainer.removeEventListener('wheel', stopAutoScrollOnFirstInteraction);
            scrollContainer.removeEventListener('scroll', stopAutoScrollOnFirstInteraction);
        };
    }, []);

    useEffect(() => {
        const scrollContainer = heroReviewsRef.current;
        if (!scrollContainer) return;

        const AUTO_SCROLL_DELAY_MS = 1500;
        const AUTO_SCROLL_SPEED_PX_PER_SEC = 38;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            return;
        }

        let isInView = true;
        let isPaused = false;
        let canAutoScroll = false;
        let animationFrameId: number | null = null;
        let lastTimestamp = 0;

        const stopAnimation = () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        const shouldRun = () => {
            if (!canAutoScroll || isPaused || !isInView || document.hidden) {
                return false;
            }

            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            return maxScroll > 0;
        };

        const tick = (timestamp: number) => {
            if (!shouldRun()) {
                stopAnimation();
                return;
            }

            if (lastTimestamp === 0) {
                lastTimestamp = timestamp;
            }

            const dt = Math.min(50, timestamp - lastTimestamp);
            lastTimestamp = timestamp;

            const distance = (AUTO_SCROLL_SPEED_PX_PER_SEC * dt) / 1000;
            const loopPoint = scrollContainer.scrollWidth / 2;

            if (scrollContainer.scrollLeft >= loopPoint) {
                scrollContainer.scrollLeft = 0;
            } else {
                scrollContainer.scrollLeft += distance;
            }

            animationFrameId = requestAnimationFrame(tick);
        };

        const startAnimation = () => {
            if (animationFrameId !== null || !shouldRun()) {
                return;
            }
            lastTimestamp = 0;
            animationFrameId = requestAnimationFrame(tick);
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopAnimation();
            } else {
                startAnimation();
            }
        };

        const pauseAutoScroll = () => {
            isPaused = true;
            stopAnimation();
        };

        const resumeAutoScroll = () => {
            isPaused = false;
            startAnimation();
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                isInView = entry.isIntersecting;
                if (isInView) {
                    startAnimation();
                } else {
                    stopAnimation();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(scrollContainer);

        const delayTimeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
            canAutoScroll = true;
            startAnimation();
        }, AUTO_SCROLL_DELAY_MS);

        document.addEventListener('visibilitychange', handleVisibilityChange);
        scrollContainer.addEventListener('mouseenter', pauseAutoScroll);
        scrollContainer.addEventListener('mouseleave', resumeAutoScroll);
        scrollContainer.addEventListener('touchstart', pauseAutoScroll, { passive: true });
        scrollContainer.addEventListener('touchend', resumeAutoScroll, { passive: true });
        scrollContainer.addEventListener('pointerdown', pauseAutoScroll, { passive: true });
        scrollContainer.addEventListener('pointerup', resumeAutoScroll, { passive: true });
        scrollContainer.addEventListener('wheel', pauseAutoScroll, { passive: true });

        return () => {
            clearTimeout(delayTimeoutId);
            stopAnimation();
            observer.disconnect();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            scrollContainer.removeEventListener('mouseenter', pauseAutoScroll);
            scrollContainer.removeEventListener('mouseleave', resumeAutoScroll);
            scrollContainer.removeEventListener('touchstart', pauseAutoScroll);
            scrollContainer.removeEventListener('touchend', resumeAutoScroll);
            scrollContainer.removeEventListener('pointerdown', pauseAutoScroll);
            scrollContainer.removeEventListener('pointerup', resumeAutoScroll);
            scrollContainer.removeEventListener('wheel', pauseAutoScroll);
        };
    }, []);

    const getLocalizedHref = (path: string) => path;

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
            <section className="relative pt-10 pb-20 lg:pt-10 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1 space-y-8 animate-fade-in">
                            <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
                                <div className="inline-flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl border border-sky-100 shadow-md w-fit">
                                    <img
                                        src="/images/ndis-badge.jpg"
                                        alt="Registered NDIS Provider"
                                        className="h-10 md:h-12 w-auto object-contain"
                                    />
                                </div>
                                <a
                                    href="tel:1800407508"
                                    className="inline-flex items-center gap-3 bg-[#0F2D4D] text-white px-6 py-3 rounded-2xl border-2 border-[#38BDF8] shadow-md hover:shadow-lg transition-all duration-300 w-fit"
                                    aria-label="Call Bright Support on 1800 407 508"
                                >
                                    <Phone size={20} className="text-[#7DD3FC]" />
                                    <span className="leading-tight text-left">
                                        <span className="block text-xs uppercase tracking-wider text-sky-200">Contact us</span>
                                        <span className="block text-base md:text-xl font-bold text-white">1800 407 508</span>
                                    </span>
                                </a>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 text-center lg:text-left">
                                {t('Hero.title')}
                            </h1>
                            <p className="text-2xl md:text-3xl font-light text-[#1E4D8C] text-center lg:text-left">
                                {t('Hero.subtitle')}
                            </p>
                            <p className="text-xl text-slate-600 leading-relaxed max-w-lg text-center lg:text-left">
                                {t('Hero.description')}
                            </p>

                            <div className="pt-2 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
                                <Link
                                    href={getLocalizedHref('/our-services/')}
                                    className="bg-gradient-to-r from-[#1E4D8C] to-[#2563EB] hover:from-[#0F2D4D] hover:to-[#1E4D8C] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                                    onClick={() => trackButtonClick('discover_services', { source: 'hero_section' })}
                                >
                                    {t('Hero.cta.services')}
                                </Link>
                                <Link
                                    href={getLocalizedHref('/contact-us/')}
                                    className="bg-gradient-to-r from-[#DC3545] to-[#E74C5C] hover:from-[#BF202F] hover:to-[#DC3545] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 flex items-center gap-2"
                                    onClick={() => trackButtonClick('send_referral', { source: 'hero_section' })}
                                >
                                    Send us referral
                                </Link>
                            </div>

                            <div className="pt-2 max-w-full">
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 text-center lg:text-left">
                                    Hear What People Say About Us
                                </h2>
                                <div
                                    ref={heroReviewsRef}
                                    className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    aria-label="Auto-scrolling customer reviews"
                                >
                                    {[...heroReviews, ...heroReviews].map((review, index) => (
                                        <article
                                            key={`${review.name}-${index}`}
                                            className="shrink-0 w-[280px] bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 shadow-sm"
                                        >
                                            <div className="flex items-center gap-1 mb-2">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>
                                            <p className="text-sm text-slate-700 leading-relaxed mb-2">{review.text}</p>
                                            <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative lg:h-auto">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <ResponsiveImage
                                    src="/images/hero/hero-main.webp"
                                    alt="NDIS support worker providing compassionate care to participant"
                                    priority
                                    className="w-full h-auto object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    width={1200}
                                    height={800}
                                />
                                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-xs animate-slide-up">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                                        <Star size={24} fill="currentColor" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">5-Star Care</p>
                                        <p className="text-xs text-slate-500">Trusted by local families</p>
                                    </div>
                                </div>
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

                    <div 
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar mb-12" 
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {serviceKeys.map((service) => (
                            <div key={service.key} className="w-[85vw] md:w-[350px] shrink-0">
                                <ServiceCard
                                    title={t(`Services.items.${service.key}.title`)}
                                    description={t(`Services.items.${service.key}.description`)}
                                    imageSrc={service.imageSrc}
                                    href={getLocalizedHref(service.href)}
                                    icon={<service.icon size={64} />}
                                    disableResponsive={service.key === 'supportCoordination' || service.key === 'independentLiving'}
                                />
                            </div>
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

                    <div className="mt-10 text-center">
                        <Link
                            href={getLocalizedHref('/registered-ndis-provider-shepparton/')}
                            className="inline-flex items-center gap-2 text-[#1E4D8C] font-semibold hover:text-[#2563EB] transition-colors"
                        >
                            Looking for a registered NDIS provider in Shepparton?
                            <span aria-hidden="true">Learn how to compare providers</span>
                        </Link>
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
