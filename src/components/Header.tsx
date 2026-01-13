'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Phone, Mail, Clock, Menu, X, ChevronRight } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { locales, type Locale } from '@/i18n/config';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detect current locale from pathname
  const currentLocale = locales.find(locale =>
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Helper function to get locale-aware href
  const getLocalizedHref = (path: string) => {
    if (currentLocale) {
      return `/${currentLocale}${path}`;
    }
    return path;
  };

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: currentLocale ? `/${currentLocale}` : '/' },
    { name: 'About Us', href: getLocalizedHref('/about-us') },
    { name: 'Our Services', href: getLocalizedHref('/our-services') },
    { name: 'Career', href: getLocalizedHref('/career') },
    { name: 'Contact Us', href: getLocalizedHref('/contact-us') },
  ];

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-500 ${scrolled
      ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-100'
      : 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200'
      }`}>
      {/* Modern Top Bar */}
      <div className="bg-gradient-to-r from-[#0F2D4D] via-[#1E4D8C] to-[#2563EB] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            {/* Contact Pills */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:1800407508"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone size={14} className="text-[#7DD3FC]" />
                <span>1800 407 508</span>
              </a>
              <a
                href="mailto:care@brightsupport.com.au"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                <Mail size={14} className="text-[#7DD3FC]" />
                <span>care@brightsupport.com.au</span>
              </a>
            </div>

            {/* Hours Badge + Language Switcher */}
            <div className="flex items-center gap-3 text-sm">
              <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#38BDF8]/20 to-[#7DD3FC]/20 px-4 py-1.5 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <Clock size={14} className="text-[#7DD3FC]" />
                <span className="font-medium">Mon-Fri 8am-6pm</span>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4">
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'
          }`}>
          {/* Logo */}
          <Link href={currentLocale ? `/${currentLocale}` : '/'} className="flex items-center gap-3 group relative">
            <div className="relative">
              <Image
                src="/images/logo-new.jpg"
                alt="Bright Support Logo"
                width={80}
                height={80}
                className={`w-auto transition-all duration-300 group-hover:rotate-3 ${scrolled ? 'h-12' : 'h-16'
                  }`}
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-[#254689] leading-tight transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl'
                }`}>
                Bright Support
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] text-[#05A5C6] font-bold uppercase">
                BARRIER-FREE LIFE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2.5 text-slate-600 hover:text-[#1E4D8C] font-medium transition-all duration-300 rounded-xl hover:bg-slate-50 group"
              >
                <span className="relative z-10">{item.name}</span>
                {/* Animated underline */}
                <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-gradient-to-r from-[#1E4D8C] to-[#38BDF8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
              </Link>
            ))}

            {/* CTA Button with modern styling */}
            <Link
              href={getLocalizedHref('/contact-us')}
              className="ml-4 group relative overflow-hidden bg-gradient-to-r from-[#DC3545] to-[#E74C5C] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                Send Us Referral
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-11 h-11 text-slate-600 hover:text-[#1E4D8C] hover:bg-slate-100 rounded-xl transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}
              />
              <X
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation - Modern Slide Down */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="py-6 space-y-2 border-t border-slate-100">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center justify-between px-4 py-3.5 text-slate-700 hover:text-[#1E4D8C] font-medium rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-sky-50/50 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span>{item.name}</span>
                <ChevronRight size={18} className="text-slate-400" />
              </Link>
            ))}

            {/* Mobile Contact Info */}
            <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
              <a
                href="tel:1800407508"
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-[#1E4D8C] rounded-xl hover:bg-slate-50 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#1E4D8C] to-[#38BDF8] rounded-xl flex items-center justify-center">
                  <Phone size={18} className="text-white" />
                </div>
                <span className="font-medium">1800 407 508</span>
              </a>
              <a
                href="mailto:care@brightsupport.com.au"
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-[#1E4D8C] rounded-xl hover:bg-slate-50 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#DC3545] to-[#E74C5C] rounded-xl flex items-center justify-center">
                  <Mail size={18} className="text-white" />
                </div>
                <span className="font-medium">care@brightsupport.com.au</span>
              </a>
            </div>

            {/* Mobile CTA */}
            <Link
              href={getLocalizedHref('/contact-us')}
              className="block w-full mt-4 bg-gradient-to-r from-[#DC3545] to-[#E74C5C] text-white px-6 py-4 rounded-2xl font-semibold text-center shadow-lg shadow-red-500/20 transition-all duration-300 hover:shadow-xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center justify-center gap-2">
                Send Us Referral
                <ChevronRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

