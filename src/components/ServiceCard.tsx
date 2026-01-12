'use client';

import Link from 'next/link';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { ArrowRight } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';
import { trackButtonClick } from '@/lib/analytics';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  imageSrc?: string;
}

export default function ServiceCard({ title, description, href, icon, imageSrc }: ServiceCardProps) {
  const handleClick = () => {
    trackButtonClick('service_card_click', { service_name: title, href });
  };

  return (
    <Link href={href} onClick={handleClick}>
      <div className="bg-white rounded-2xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 overflow-hidden h-full hover:-translate-y-2 group border border-slate-100">
        <div className="aspect-video bg-gradient-to-br from-sky-100 via-blue-100 to-cyan-100 flex items-center justify-center relative overflow-hidden">
          {imageSrc ? (
            <ResponsiveImage
              src={imageSrc}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              width={600}
              height={400}
            />
          ) : icon ? (
            <div className="text-[#1E4D8C] group-hover:scale-110 transition-transform duration-300">{icon}</div>
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
              Service Image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E4D8C]/0 to-[#38BDF8]/0 group-hover:from-[#1E4D8C]/10 group-hover:to-[#38BDF8]/10 transition-all duration-300"></div>
        </div>
        <div className="p-7">
          <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-[#1E4D8C] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-600 mb-5 line-clamp-3 leading-relaxed text-sm">{description}</p>
          <div className="flex items-center text-[#1E4D8C] font-semibold group-hover:text-[#38BDF8] transition-colors duration-300 text-sm">
            <span>Learn More</span>
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
