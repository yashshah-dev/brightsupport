import { Metadata } from 'next';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import {
  Home, Building2, Stethoscope, Users, Activity, Dumbbell,
  Droplets, Brain, Heart, Car, Sparkles, ShieldCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | NDIS Support Services - Bright Support',
  description: 'Comprehensive NDIS services including daily living support, community nursing, physiotherapy, community participation, personal training, hydrotherapy, and more.',
};

export default function OurServicesPage() {
  const services = [
    {
      title: 'Daily Living & In-Home Support',
      description: 'Personal care, household tasks, meal preparation, and assistance with activities of daily living to help you maintain independence at home.',
      href: '/services/daily-living-in-home-support',
      icon: <Home size={64} />,
      imageSrc: '/images/services/daily-living.webp',
    },
    {
      title: 'Independent Living Accommodation Services (SIL)',
      description: 'Supported Independent Living services providing 24/7 support, personal care assistance, life skills development, and community integration.',
      href: '/services/independent-living-accommodation-support',
      icon: <Building2 size={64} />,
    },
    {
      title: 'Community Nursing & Complex Care',
      description: 'Professional nursing care including medication management, wound care, catheter care, stoma care, and support for complex medical needs.',
      href: '/services/community-nursing-complex-care',
      icon: <Stethoscope size={64} />,
      imageSrc: '/images/services/nursing.webp',
    },
    {
      title: 'Community Participation & Group Programs',
      description: 'Engaging group activities, social programs, and community outings to build connections, friendships, and enhance quality of life.',
      href: '/services/community-participation-group-programs',
      icon: <Users size={64} />,
      imageSrc: '/images/services/community-participation.webp',
    },
    {
      title: 'Physiotherapy Services',
      description: 'Expert physiotherapy for neurological, musculoskeletal, and cardio-pulmonary conditions with personalized treatment plans.',
      href: '/services/physiotherapy-services',
      icon: <Activity size={64} />,
      imageSrc: '/images/services/physiotherapy.webp',
    },
    {
      title: 'Personal Training Sessions',
      description: 'NDIS registered disability fitness training to improve physical abilities, build self-confidence, and maintain healthy lifestyles.',
      href: '/services/personal-training-sessions',
      icon: <Dumbbell size={64} />,
    },
    {
      title: 'Hydrotherapy & Pool Sessions',
      description: 'Therapeutic warm water pool sessions for pain relief, muscle strengthening, improved mobility, and relaxation with specialized equipment.',
      href: '/services/hydrotherapy-pool-session',
      icon: <Droplets size={64} />,
    },
    {
      title: 'Positive Behaviour Support',
      description: 'Evidence-based approach to understanding behaviour, reducing restrictive interventions, and achieving personal growth and positive outcomes.',
      href: '/services/positive-behaviour-support',
      icon: <Brain size={64} />,
    },
    {
      title: 'Companionship Services',
      description: 'Meaningful companionship and emotional support to reduce isolation, build genuine connections, and improve wellbeing.',
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
    {
      title: 'Professional Cleaning Services',
      description: 'NDIS house cleaning services including general cleaning, dusting, vacuuming, laundry, kitchen, bathroom, and linen changing.',
      href: '/services/professional-cleaning',
      icon: <Sparkles size={64} />,
    },
    {
      title: 'Privacy Policy',
      description: 'Learn about how we collect, use, and protect your personal information in accordance with Australian privacy legislation.',
      href: '/privacy-policy',
      icon: <ShieldCheck size={64} />,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E4D8C] via-[#2563EB] to-[#38BDF8] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-sky-100">
              Comprehensive NDIS support services tailored to your unique needs and goals
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-sky-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                All Our Services
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Discover our full range of NDIS services designed to support your independence,
                health, and wellbeing. Click on any service to learn more.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-lg text-slate-700 mb-10 leading-relaxed">
              Our friendly team is here to help you understand your options and find the right support for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href="tel:1800407508"
                className="bg-gradient-to-r from-[#1E4D8C] to-[#2563EB] hover:from-[#0F2D4D] hover:to-[#1E4D8C] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-elegant-lg"
              >
                Call Us: 1800 407 508
              </a>
              <Link
                href="/contact-us"
                className="bg-[#DC3545] hover:bg-[#C82333] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-elegant-lg"
              >
                Contact Us Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
