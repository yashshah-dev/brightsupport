'use client';

import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const pathname = usePathname();
  const isLandingPage = pathname?.includes('/landing/');
  const t = useTranslations('Footer');
  const tHeader = useTranslations('Header');
  const tContact = useTranslations('ContactUs');

  const exploreLinks = [
    { name: tHeader('nav.home'), href: '/' },
    { name: tHeader('nav.about'), href: '/about-us' },
    { name: tHeader('nav.services'), href: '/our-services' },
    { name: tHeader('nav.career'), href: '/career' },
    { name: tHeader('nav.contact'), href: '/contact-us' },
    { name: t('privacy'), href: '/privacy-policy' },
  ];

  const services = [
    { name: 'Daily Living Support', href: '/services/daily-living-in-home-support' },
    { name: 'Community Nursing', href: '/services/community-nursing-complex-care' },
    { name: 'Physiotherapy', href: '/services/physiotherapy-services' },
    { name: 'Community Participation', href: '/services/community-participation-group-programs' },
    { name: 'Transport Assistance', href: '/services/travel-transport-assistance' },
    { name: 'Companionship', href: '/services/companionship' },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/brightsupportcare", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" }
  ];

  if (isLandingPage) {
    return (
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>{t('copyright').replace('2024', new Date().getFullYear().toString())}</p>
          <div className="flex gap-6">
            <span>ABN: 32659000978</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">{t('privacy')}</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 font-sans border-t border-slate-800 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#05A5C6] to-transparent opacity-50"></div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex flex-row gap-5 items-center">
              {/* Logo 1 - Bright Support */}
              <div className="bg-white p-4 rounded-2xl shadow-xl shadow-black/10 flex items-center justify-center h-28 w-40">
                <img
                  src={getAssetPath('/images/logo/bright-support-logo.png')}
                  alt="Bright Support Logo"
                  width={160}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>
              {/* Logo 2 - NDIS Badge */}
              <div className="bg-white p-2 rounded-2xl shadow-lg flex items-center justify-center h-28 w-40">
                <img
                  src={getAssetPath('/images/ndis-badge.jpg')}
                  alt="NDIS Registered Provider"
                  width={160}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-base max-w-sm">
              {t('description')}
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 text-slate-400 hover:bg-[#05A5C6] hover:text-white p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#05A5C6]/20"
                  aria-label={social.label}
                >
                  <social.icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-lg font-bold text-white mb-8 relative inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#05A5C6]"></span>
              {t('quickLinks')}
            </h4>
            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-[#05A5C6] hover:translate-x-1.5 transition-all duration-300 text-[15px] flex items-center gap-2 group w-fit"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#05A5C6]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold text-white mb-8 relative inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#05A5C6]"></span>
              {t('services')}
            </h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-[#05A5C6] hover:translate-x-1.5 transition-all duration-300 text-[15px] flex items-center gap-2 group w-fit"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#05A5C6]" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold text-white mb-8 relative inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#05A5C6]"></span>
              {t('contact')}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="bg-slate-800/50 p-3 rounded-xl text-[#05A5C6] group-hover:bg-[#05A5C6] group-hover:text-white transition-all duration-300 shrink-0 border border-slate-700/50 group-hover:border-[#05A5C6] shadow-sm">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Call Us</p>
                  <a href={`tel:${tHeader('phone').replace(/\s/g, '')}`} className="hover:text-[#05A5C6] transition-colors font-semibold text-slate-200 text-lg">
                    {tHeader('phone')}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4 group">
                <div className="bg-slate-800/50 p-3 rounded-xl text-[#FF5A5F] group-hover:bg-[#FF5A5F] group-hover:text-white transition-all duration-300 shrink-0 border border-slate-700/50 group-hover:border-[#FF5A5F] shadow-sm">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Email Us</p>
                  <a href={`mailto:${tHeader('email')}`} className="hover:text-[#FF5A5F] transition-colors font-medium text-slate-200 break-all">
                    {tHeader('email')}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4 group">
                <div className="bg-slate-800/50 p-3 rounded-xl text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-white transition-all duration-300 shrink-0 border border-slate-700/50 group-hover:border-[#38BDF8] shadow-sm">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Location</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(tContact('locations.shepparton.address'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#38BDF8] transition-colors text-slate-300 leading-snug block"
                  >
                    {tContact('locations.shepparton.address')}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Aboriginal and Torres Strait Islander Acknowledgment */}
        <div className="mt-20 pt-10 border-t border-slate-800/60">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            {/* Optional flags implementation can go here if needed again */}
            <p className="text-sm text-slate-500 leading-relaxed italic">
              "Bright Support acknowledges the Traditional Custodians of the land on which we work and live.
              We pay our respects to Elders past, present and emerging."
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>{t('copyright').replace('2024', new Date().getFullYear().toString())}</p>
          <div className="flex gap-6">
            <span>ABN: 32659000978</span>
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">{t('privacy')}</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
