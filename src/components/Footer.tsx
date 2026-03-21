'use client';

import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { trackPhoneCall, trackEmailClick } from '@/lib/analytics';

export default function Footer() {
  const pathname = usePathname();
  const isLandingPage = pathname?.includes('/landing/');
  const t = useTranslations('Footer');
  const tHeader = useTranslations('Header');
  const tContact = useTranslations('ContactUs');

  const getLocalizedHref = (path: string) => path;

  // Helper functions for tracking
  const handlePhoneClick = () => {
    trackPhoneCall(tHeader('phone'));
  };

  const handleEmailClick = () => {
    trackEmailClick(tHeader('email'));
  };

  const exploreLinks = [
    { name: tHeader('nav.home'), href: '/' },
    { name: tHeader('nav.about'), href: getLocalizedHref('/about-us') },
    { name: tHeader('nav.services'), href: getLocalizedHref('/our-services') },
    { name: tHeader('nav.career'), href: getLocalizedHref('/career') },
    { name: tHeader('nav.contact'), href: getLocalizedHref('/contact-us') },
  ];

  const services = [
    { name: 'Daily Living Support', href: getLocalizedHref('/dailylivingin-homesupport') },
    { name: 'Community Nursing', href: getLocalizedHref('/communitynursingandcomplexcare') },
    { name: 'Physiotherapy', href: getLocalizedHref('/physiotherapyservices') },
    { name: 'Community Participation', href: getLocalizedHref('/communityparticipationgroupprograms') },
    { name: 'Transport Assistance', href: getLocalizedHref('/ndis-transport-service-provider') },
    { name: 'Companionship', href: getLocalizedHref('/companion-care-services') },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/brightsupportcare", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
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
    <footer className="bg-slate-900 text-slate-300 font-sans relative overflow-hidden">
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-[#1E4D8C] via-[#05A5C6] to-[#1E4D8C]"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logos row */}
            <div className="bg-white rounded-2xl p-2 shadow-xl flex items-center justify-center w-max">
              <img
                src={getAssetPath('/images/logo/bright-support-logo.png')}
                alt="Bright Support Logo"
                width={200}
                height={200}
                className="h-20 w-auto object-contain transform scale-105"
              />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {t('description')}
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-[#05A5C6] p-2 rounded-lg hover:bg-slate-800 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-[#05A5C6] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('services')}
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-[#05A5C6] transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('contact')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href={`tel:${tHeader('phone').replace(/\s/g, '')}`} 
                  onClick={handlePhoneClick}
                  className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-[#05A5C6] transition-colors group"
                >
                  <Phone size={15} className="text-[#05A5C6] shrink-0" />
                  <span>{tHeader('phone')}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${tHeader('email')}`}
                  onClick={handleEmailClick}
                  className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-[#05A5C6] transition-colors group"
                >
                  <Mail size={15} className="text-[#05A5C6] shrink-0" />
                  <span className="break-all">{tHeader('email')}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(tContact('locations.shepparton.address'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-slate-400 hover:text-[#05A5C6] transition-colors group"
                >
                  <MapPin size={15} className="text-[#05A5C6] shrink-0 mt-0.5" />
                  <span>{tContact('locations.shepparton.address')}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-5">
          {/* Acknowledgment of Country */}
          <div className="flex flex-col items-center gap-3 mb-4">
            <img
              src={getAssetPath('/images/aboriginal-torres-strait-islander-flags.webp')}
              alt="Aboriginal and Torres Strait Islander Flags"
              width={220}
              height={76}
              className="h-12 w-auto object-contain opacity-90"
            />
            <p className="text-xs text-slate-500 text-center leading-relaxed max-w-2xl mx-auto italic">
              Bright Support acknowledges the Traditional Custodians of the land on which we work and live.
              We pay our respects to Elders past, present and emerging.
            </p>
          </div>
          {/* Copyright row */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
            <p>{t('copyright').replace('2024', new Date().getFullYear().toString())}</p>
            <div className="flex gap-4">
              <span>ABN: 32659000978</span>
              <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">{t('privacy')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
