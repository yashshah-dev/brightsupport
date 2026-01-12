"use client";
import Link from 'next/link';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import React, { useState } from 'react';
import {
  Heart, Users, Home, Activity, Stethoscope, Car,
  Sparkles, Clock, Shield, CheckCircle, Phone
} from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import { getAssetPath } from '@/lib/utils';
import { trackPhoneCall, trackButtonClick } from '@/lib/analytics';
import { useVideoTracking } from '@/hooks/useAnalytics';

export default function HomePage() {
  const [videoReady, setVideoReady] = useState(false);
  const { trackVideoPlay, trackVideoPause, trackVideoComplete } = useVideoTracking();

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
            onLoad={() => {
              // Track video load completion
              setTimeout(() => trackVideoPlay(title, { video_id: videoId, source: 'homepage', loaded: true }), 1000);
            }}
          ></iframe>
        )}
      </div>
    );
  }
  const featuredServices = [
    {
      title: 'Daily Living & In-Home Support',
      description: 'Personal care, household tasks, meal preparation, and assistance with activities of daily living to help you maintain independence at home.',
      href: '/services/daily-living-in-home-support',
      icon: <Home size={64} />,
      imageSrc: '/images/services/daily-living.webp',
    },
    {
      title: 'Community Nursing & Complex Care',
      description: 'Professional nursing care including medication management, wound care, catheter care, and support for complex medical needs.',
      href: '/services/community-nursing-complex-care',
      icon: <Stethoscope size={64} />,
      imageSrc: '/images/services/nursing.webp',
    },
    {
      title: 'Physiotherapy Services',
      description: 'Expert physiotherapy for neurological, musculoskeletal, and cardio-pulmonary conditions with personalized treatment plans.',
      href: '/services/physiotherapy-services',
      icon: <Activity size={64} />,
      imageSrc: '/images/services/physiotherapy.webp',
    },
    {
      title: 'Community Participation & Group Programs',
      description: 'Engaging group activities, social programs, and community outings to build connections and enhance quality of life.',
      href: '/services/community-participation-group-programs',
      icon: <Users size={64} />,
      imageSrc: '/images/services/community-participation.webp',
    },
    {
      title: 'Companionship Services',
      description: 'Meaningful companionship and emotional support to reduce isolation and improve wellbeing through genuine connections.',
      href: '/services/companionship',
      icon: <Heart size={64} />,
      imageSrc: '/images/services/companionship.webp',
    },
    {
      title: 'Travel & Transport Assistance',
      description: 'Safe and reliable transport to appointments, social outings, and shopping with wheelchair-accessible vehicles available.',
      href: '/services/travel-transport-assistance',
      icon: <Car size={64} />,
      imageSrc: '/images/services/transport.webp',
    },
  ];

  const valuePropositions = [
    {
      icon: <Clock size={48} />,
      title: 'We Make Navigating The NDIS Easy',
      description: 'Our experienced team helps you understand and access NDIS services with ease. Available 24/7 through our hotline to support you whenever you need assistance.',
    },
    {
      icon: <Shield size={48} />,
      title: 'Disabilities Support Services',
      description: 'Comprehensive, person-centered support services designed to help you live independently with dignity and choice. Our qualified team is dedicated to your goals and wellbeing.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 text-slate-800 py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDk5LCAxMDIsIDI0MSwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-white/90 backdrop-blur-md px-8 py-3 rounded-full mb-8 shadow-lg border border-sky-100 animate-fade-in">
                <p className="text-sm md:text-base font-semibold flex items-center justify-center lg:justify-start gap-2 bg-gradient-to-r from-[#1E4D8C] to-[#38BDF8] bg-clip-text text-transparent">
                  <CheckCircle size={20} className="text-[#1E4D8C]" />
                  Trusted by More than 500+ People
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent animate-scale-in text-center lg:text-left">
                NDIS Disability & Support Services Provider
              </h1>
              <p className="text-2xl md:text-3xl mb-6 font-light bg-gradient-to-r from-[#1E4D8C] to-[#38BDF8] bg-clip-text text-transparent text-center lg:text-left">
                Welcome To Bright Support
              </p>
              <p className="text-lg md:text-xl mb-12 leading-relaxed text-slate-600 text-center lg:text-left">
                Making navigating the NDIS easy with compassionate, professional support services tailored to your unique needs and goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center animate-in">
                <Link
                  href="/our-services"
                  className="bg-gradient-to-r from-[#1E4D8C] to-[#2563EB] hover:from-[#0F2D4D] hover:to-[#1E4D8C] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => trackButtonClick('discover_services', { source: 'hero_section' })}
                >
                  Discover More Services
                </Link>
                <a
                  href="tel:1800407508"
                  className="bg-white hover:bg-slate-50 text-slate-700 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg border-2 border-slate-200 hover:border-indigo-300 flex items-center gap-2"
                  onClick={() => trackPhoneCall('1800 407 508', { source: 'hero_section' })}
                >
                  <Phone size={20} className="text-[#1E4D8C]" />
                  Contact Now
                </a>
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

      {/* Video Section (lazy embed with poster) */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-50" style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Learn More About Our Services
              </h2>
              <p className="text-lg text-slate-600">
                Watch our video to understand how we can support you
              </p>
            </div>
            <LazyVideoEmbed videoId="0Vyy3CjCcKk" title="Bright Support Services" />
          </div>
        </div>
      </section>

      {/* Types of Care Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Types of Care
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive NDIS services designed to support your independence, health, and wellbeing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                href={service.href}
                icon={service.icon}
                imageSrc={service.imageSrc}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/our-services"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg"
            >
              View All Services
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
              Our Goal Is To Make Your Life Better
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Providing exceptional support services with a person-centered approach
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center mb-12">
            <div className="space-y-8">
              {valuePropositions.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-elegant p-9 hover:shadow-elegant-lg transition-all duration-300 border border-slate-100 hover:border-indigo-200 group hover:-translate-y-1"
                >
                  <div className="text-[#1E4D8C] mb-5 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-[#1E4D8C] transition-colors duration-300">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
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

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1E4D8C] via-[#2563EB] to-[#38BDF8] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-10 text-sky-100">
              Contact us today to learn more about how we can support you
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href="tel:1800407508"
                className="bg-white hover:bg-sky-50 text-[#1E4D8C] px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                onClick={() => trackPhoneCall('1800 407 508', { source: 'cta_section' })}
              >
                <Phone size={20} />
                1800 407 508
              </a>
              <Link
                href="/contact-us"
                className="bg-[#DC3545] hover:bg-[#C82333] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
                onClick={() => trackButtonClick('send_message', { source: 'cta_section' })}
              >
                Send Us A Message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
