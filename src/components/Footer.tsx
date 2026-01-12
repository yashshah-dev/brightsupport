import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

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
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <Image
              src="/images/logo/bright-support-logo.png"
              alt="Bright Support Logo"
              width={150}
              height={50}
              className="h-14 w-auto mb-4"
            />
            <p className="text-slate-300 mb-6 leading-relaxed text-sm">
              NDIS Disability & Support Services Provider helping people live independently with dignity and choice.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/brightsupportcare" target="_blank" rel="noopener noreferrer" className="hover:text-[#38BDF8] transition-all duration-300 hover:scale-110 bg-slate-800 p-2.5 rounded-full" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#38BDF8] transition-all duration-300 hover:scale-110 bg-slate-800 p-2.5 rounded-full" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#38BDF8] transition-all duration-300 hover:scale-110 bg-slate-800 p-2.5 rounded-full" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-slate-100">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#38BDF8] transition-all duration-300 text-sm hover:pl-2 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-slate-100">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-slate-400 hover:text-[#38BDF8] transition-all duration-300 text-sm hover:pl-2 inline-block">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-slate-100">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-[#1E4D8C] to-[#38BDF8] p-2 rounded-lg">
                  <Phone size={16} className="text-white" />
                </div>
                <div>
                  <a href="tel:1800407508" className="hover:text-[#38BDF8] transition-all duration-300 text-sm">1800 407 508</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-[#DC3545] to-[#E74C5C] p-2 rounded-lg">
                  <Mail size={16} className="text-white" />
                </div>
                <div>
                  <a href="mailto:care@brightsupport.com.au" className="hover:text-[#38BDF8] transition-all duration-300 break-all text-sm">
                    care@brightsupport.com.au
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-[#7DD3FC] to-[#38BDF8] p-2 rounded-lg">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <a
                    href="https://maps.google.com/?q=279+Wyndham+St,+Shepparton+VIC+3630,+Australia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#38BDF8] transition-all duration-300 text-sm"
                  >
                    279 Wyndham St, Shepparton VIC 3630, Australia
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Aboriginal and Torres Strait Islander Acknowledgment */}
        <div className="mt-12 pt-10 border-t border-slate-700/50">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="w-12 h-8 bg-slate-800 rounded-md flex items-center justify-center text-xs shadow-inner border border-slate-700">Flag</div>
            <p className="text-sm text-slate-300 text-center max-w-3xl leading-relaxed">
              Bright Support acknowledges the Traditional Custodians of the land on which we work and live.
              We pay our respects to Elders past, present and emerging.
            </p>
            <div className="w-12 h-8 bg-slate-800 rounded-md flex items-center justify-center text-xs shadow-inner border border-slate-700">Flag</div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-700/50 text-center text-sm text-slate-400">
          <p className="mb-2">Copyright © {new Date().getFullYear()} Bright Support. All Rights Reserved.</p>
          <p className="text-slate-500">ABN: 32659000978</p>
        </div>
      </div>
    </footer>
  );
}
