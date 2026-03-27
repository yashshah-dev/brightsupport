'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { getAssetPath } from '@/lib/utils';
import { Phone, CheckCircle, Star, Users, Clock, Shield, ArrowRight } from 'lucide-react';
import { ResponsiveImage } from '@/components/ResponsiveImage'; // Fixed relative import
import ServiceCard from '@/components/ServiceCard';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Link from 'next/link';

export default function LandingPage() {
    const t = useTranslations('Index'); // Reusing existing translations where possible, or fallback to hardcoded for specific landing copy
    const heroReviewsRef = useRef<HTMLDivElement>(null);

    // Hardcoded landing page specific content to ensure persuasive copy without waiting for full i18n
    const benefits = [
        "Personalized NDIS Care Plans",
        "Qualified & Compassionate Staff",
        "24/7 Support Available",
        "Fast Service Intake (24-48hrs)"
    ];

    const featuredServices = [
        {
            title: 'Daily Living Support',
            description: 'Assistance with personal care, household tasks, and daily routines to maintain independence.',
            href: '#contact', // Anchor to form
            icon: <Users size={64} />,
            imageSrc: '/images/services/daily-living.webp',
        },
        {
            title: 'Community Nursing',
            description: 'Professional nursing care for complex needs, medication management, and wound care.',
            href: '#contact',
            icon: <Shield size={64} />,
            imageSrc: '/images/services/nursing.webp',
        },
        {
            title: 'Community Participation',
            description: 'Social activities and group programs to build connections and community engagement.',
            href: '#contact',
            icon: <Users size={64} />, // Reusing icon
            imageSrc: '/images/services/community-participation.webp',
        },
    ];

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

    return (
        <div className="flex flex-col min-h-screen">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Copy */}
                        <div className="space-y-8 animate-fade-in">
                            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl border border-sky-100 shadow-md">
                                <img
                                    src="/images/ndis-badge.jpg"
                                    alt="Registered NDIS Provider"
                                    className="h-10 md:h-12 w-auto object-contain"
                                />
                                <div className="w-px self-stretch bg-slate-200" />
                                <div className="text-left leading-tight">
                                    <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Contact Us</p>
                                    <a href="tel:1800407508" className="block text-sm md:text-base font-bold text-slate-900 hover:text-[#1E4D8C]">1800 407 508</a>
                                    <a href="mailto:care@brightsupport.com.au" className="block text-xs md:text-sm text-slate-600 hover:text-[#1E4D8C]">care@brightsupport.com.au</a>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                                Reliable NDIS Support That Puts <span className="text-[#1E4D8C]">You First</span>
                            </h1>

                            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                                Experience personalized care with our compassionate team in Shepparton and surrounding areas. We help you achieve your goals with dignity and independence.
                            </p>

                            <a
                                href="tel:1800407508"
                                className="group inline-flex items-center gap-4 w-full sm:w-auto bg-[#0F2D4D] text-white px-5 py-4 rounded-2xl border-2 border-[#38BDF8] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                                aria-label="Call Bright Support on 1800 407 508"
                            >
                                <span className="w-11 h-11 rounded-full bg-[#38BDF8] text-[#0F2D4D] flex items-center justify-center animate-pulse">
                                    <Phone size={22} />
                                </span>
                                <span className="leading-tight">
                                    <span className="block text-xs uppercase tracking-widest text-sky-200">Call now for fast help</span>
                                    <span className="block text-2xl md:text-3xl font-extrabold text-white">1800 407 508</span>
                                </span>
                            </a>

                            <div className="flex flex-col sm:flex-row gap-4">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                                        <CheckCircle className="text-green-500 shrink-0" size={20} />
                                        {benefit}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <a
                                    href="tel:1800407508"
                                    className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-8 py-4 rounded-full font-extrabold text-lg shadow-lg shadow-red-500/25 hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <Phone size={20} />
                                    Call 1800 407 508
                                </a>
                                <a
                                    href="#contact"
                                    className="bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-lg shadow-sm hover:shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    Get Free Consultation
                                </a>
                            </div>

                            <div className="pt-2 max-w-full">
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
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

                        {/* Hero Image/Form Placeholder */}
                        <div className="relative lg:h-auto">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <ResponsiveImage
                                    src="/images/hero/hero-main.webp"
                                    alt="Happy NDIS participant with support worker"
                                    priority
                                    className="w-full h-auto object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    width={800}
                                    height={600}
                                />
                                {/* Floating Trust Badge */}
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

            {/* Trust Bar */}
            <div className="bg-[#1E4D8C] py-8 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center text-center font-medium opacity-90">
                        <div className="flex items-center gap-3">
                            <Shield size={24} />
                            <span>NDIS Registered</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users size={24} />
                            <span>Qualified Staff</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={24} />
                            <span>24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle size={24} />
                            <span>Person-Centered</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Grid (Simplified) */}
            <section className="py-20 bg-white" id="services">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Support Services Tailored to You</h2>
                        <p className="text-lg text-slate-600">We offer a comprehensive range of NDIS services designed to help you live independently and achieve your goals.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredServices.map((service, idx) => (
                            <ServiceCard key={idx} {...service} />
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href="/our-services" className="text-[#1E4D8C] font-semibold hover:underline inline-flex items-center gap-1">
                            View all services <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <Testimonials />

            {/* FAQ */}
            <FAQ />

            {/* Final CTA / Contact Form */}
            <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                        <div className="bg-[#1E4D8C] text-white p-10 md:w-2/5 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Free Consultation</h3>
                                <p className="text-blue-100 mb-8">Speak with our friendly team about your NDIS needs. No obligation.</p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <Phone size={20} className="text-blue-300" />
                                        <span className="font-medium">1800 407 508</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Clock size={20} className="text-blue-300" />
                                        <span>Mon-Fri: 9am - 5pm</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-8">
                                <img
                                    src={getAssetPath('/images/logo-new.jpg')}
                                    alt="Bright Support"
                                    className="bg-white p-2 rounded-lg w-24 h-auto"
                                />
                            </div>
                        </div>
                        <div className="p-10 md:w-3/5">
                            <form className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Request Call Back</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]" />
                                    <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]" />
                                </div>
                                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]" />
                                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]" />
                                <textarea placeholder="How can we help?" rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E4D8C]"></textarea>
                                <button type="button" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-lg transition-all shadow-md hover:shadow-lg">
                                    Get Free Advice
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
