'use client';

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

    return (
        <div className="flex flex-col min-h-screen">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Copy */}
                        <div className="space-y-8 animate-fade-in">
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-sm">
                                <Shield size={16} />
                                <span>Registered NDIS Provider</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                                Reliable NDIS Support That Puts <span className="text-[#1E4D8C]">You First</span>
                            </h1>

                            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                                Experience personalized care with our compassionate team in Shepparton & Melbourne. We help you achieve your goals with dignity and independence.
                            </p>

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
                                    className="bg-[#1E4D8C] hover:bg-[#0F2D4D] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
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
