import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const exploreLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Our Services', href: '/our-services' },
    { name: 'Career', href: '/career' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ];

  const services = [
    { name: 'Daily Living Support', href: '/services/daily-living-in-home-support' },
    { name: 'Community Nursing', href: '/services/community-nursing-complex-care' },
    { name: 'Physiotherapy', href: '/services/physiotherapy-services' },
    { name: 'Community Participation', href: '/services/community-participation-group-programs' },
    { name: 'Transport Assistance', href: '/services/travel-transport-assistance' },
    { name: 'Companionship', href: '/services/companionship' },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 font-sans border-t border-slate-800">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="bg-white p-4 rounded-xl shadow-lg shadow-black/5 flex items-center justify-center h-24 w-auto">
                <Image
                  src="/images/logo/bright-support-logo.png"
                  alt="Bright Support Logo"
                  width={180}
                  height={60}
                  className="h-auto w-40 object-contain"
                />
              </div>
              <div className="bg-white p-2 rounded-xl shadow-lg shadow-black/5 flex items-center justify-center h-24 w-auto">
                <Image
                  src="/images/ndis-badge.jpg"
                  alt="NDIS Registered Provider"
                  width={120}
                  height={60}
                  className="h-auto w-28 object-contain"
                />
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm lg:text-base max-w-sm">
              Empowering individuals with NDIS Disability & Support Services to live independently with dignity, choice, and control.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { icon: Facebook, href: "https://facebook.com/brightsupportcare", label: "Facebook" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-[#05A5C6] text-white p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-md"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Explore
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-[#05A5C6] rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#05A5C6] transition-colors duration-200 text-sm flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#05A5C6] mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-[#05A5C6] rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-slate-400 hover:text-[#05A5C6] transition-colors duration-200 text-sm flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#05A5C6] mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-[#05A5C6] rounded-full"></span>
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="bg-slate-800 p-2.5 rounded-lg text-[#05A5C6] shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Call Us</p>
                  <a href="tel:1800407508" className="hover:text-white transition-colors font-semibold text-slate-200">1800 407 508</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-slate-800 p-2.5 rounded-lg text-[#FF5A5F] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Email Us</p>
                  <a href="mailto:care@brightsupport.com.au" className="hover:text-white transition-colors font-semibold text-slate-200 break-all">
                    care@brightsupport.com.au
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-slate-800 p-2.5 rounded-lg text-[#38BDF8] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Location</p>
                  <a
                    href="https://maps.google.com/?q=279+Wyndham+St,+Shepparton+VIC+3630,+Australia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-slate-300 leading-tight block"
                  >
                    279 Wyndham St, Shepparton VIC 3630, Australia
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Aboriginal and Torres Strait Islander Acknowledgment */}
        <div className="mt-16 pt-10 border-t border-slate-800/60">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-8">
            {/* <div className="w-16 h-10 bg-[url('/images/flag-aboriginal.png')] bg-cover bg-center rounded shadow-md opacity-80 hover:opacity-100 transition-opacity" title="Aboriginal Flag"></div>
            <p className="text-sm text-slate-500 text-center max-w-2xl leading-relaxed italic">
              "Bright Support acknowledges the Traditional Custodians of the land on which we work and live.
              We pay our respects to Elders past, present and emerging."
            </p>
            <div className="w-16 h-10 bg-[url('/images/flag-torres.png')] bg-cover bg-center rounded shadow-md opacity-80 hover:opacity-100 transition-opacity" title="Torres Strait Islander Flag"></div> */}
            <p className="text-sm text-slate-500 text-center max-w-2xl leading-relaxed italic">
              "Bright Support acknowledges the Traditional Custodians of the land on which we work and live.
              We pay our respects to Elders past, present and emerging."
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Bright Support. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span>ABN: 32659000978</span>
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
