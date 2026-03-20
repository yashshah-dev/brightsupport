'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { Target, Users, Heart, Award, Download, Clock, MapPin, UserCheck, ShieldCheck } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

export default function AboutUsPage() {
    const t = useTranslations('AboutUs');
    const tValues = useTranslations('AboutUs.values');

    const values = [
        { icon: Heart, key: 'compassion' },
        { icon: Target, key: 'integrity' },
        { icon: Award, key: 'excellence' },
        { icon: Users, key: 'respect' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-sky-900 text-white pt-32 pb-20">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('hero.title')}</h1>
                        <p className="text-xl text-sky-200 mb-4">{t('hero.subtitle')}</p>
                        <p className="text-lg text-gray-300">{t('hero.description')}</p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-navy-50 to-sky-50 p-8 rounded-2xl">
                            <div className="w-16 h-16 bg-navy-600 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('mission.title')}</h2>
                            <p className="text-gray-600 leading-relaxed">{t('mission.description')}</p>
                        </div>
                        <div className="bg-gradient-to-br from-coral-50 to-orange-50 p-8 rounded-2xl">
                            <div className="w-16 h-16 bg-coral-500 rounded-xl flex items-center justify-center mb-6">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('vision.title')}</h2>
                            <p className="text-gray-600 leading-relaxed">{t('vision.description')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values - Modern Colorful Bento Grid */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-sky-600 font-semibold tracking-wider uppercase text-sm mb-3 block">What Drives Us</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">{t('values.title')}</h2>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-sky-400 to-blue-600 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {[
                            { icon: Heart, key: 'compassion', gradient: 'from-rose-400 to-pink-600', shadow: 'shadow-pink-500/20', bg: 'bg-rose-50' },
                            { icon: Target, key: 'integrity', gradient: 'from-blue-400 to-indigo-600', shadow: 'shadow-indigo-500/20', bg: 'bg-indigo-50' },
                            { icon: Award, key: 'excellence', gradient: 'from-amber-400 to-orange-500', shadow: 'shadow-orange-500/20', bg: 'bg-amber-50' },
                            { icon: Users, key: 'respect', gradient: 'from-emerald-400 to-teal-500', shadow: 'shadow-teal-500/20', bg: 'bg-emerald-50' },
                        ].map((value, i) => (
                            <div 
                                key={value.key} 
                                className="group relative bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 ${value.bg} rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700`}></div>
                                
                                <div className="relative z-10 flex items-start gap-6">
                                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg ${value.shadow} transform group-hover:-translate-y-1 transition-transform duration-300`}>
                                        <value.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-navy-900 mb-3 group-hover:text-blue-600 transition-colors">{tValues(`${value.key}.title`)}</h3>
                                        <p className="text-gray-600 leading-relaxed">{tValues(`${value.key}.description`)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team & Stats Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 to-blue-600/20 rounded-[3rem] transform -rotate-6 scale-105"></div>
                                <ResponsiveImage
                                    src={getAssetPath('/images/about/team-photo.webp')}
                                    alt="Bright Support Team"
                                    className="rounded-[3rem] shadow-2xl relative z-10 w-full h-[500px] object-cover"
                                    priority={false}
                                />
                                {/* Floating Badge */}
                                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl z-20 max-w-[200px] border border-slate-50 animate-bounce-slow hidden md:block">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex -space-x-3">
                                            {[1,2,3].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                                                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="avatar" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-navy-900 leading-tight">Trusted by hundreds of families</p>
                                </div>
                            </div>
                            
                            <div className="order-1 lg:order-2">
                                <span className="text-sky-600 font-semibold tracking-wider uppercase text-sm mb-3 block">Our People</span>
                                <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">{t('team.title')}</h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-12">{t('team.description')}</p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    {[
                                        { title: "Qualified Professionals", description: "All staff are carefully screened & continuously trained", icon: ShieldCheck, color: "text-sky-600", bg: "bg-sky-50" },
                                        { title: "Local Presence", description: "Deeply rooted in our community with local knowledge", icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-50" },
                                        { title: "Matched Care", description: "Workers hand-picked to align with your personal goals", icon: UserCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
                                        { title: "24/7 Availability", description: "Consistent support available around the clock", icon: Clock, color: "text-rose-600", bg: "bg-rose-50" }
                                    ].map((stat, i) => (
                                        <div key={i} className="relative group">
                                            <div className="absolute inset-0 bg-slate-50 rounded-2xl transform transition-transform group-hover:scale-105 group-hover:bg-white group-hover:shadow-md duration-300"></div>
                                            <div className="relative p-5">
                                                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-3 transform group-hover:-translate-y-0.5 transition-transform duration-300`}>
                                                    <stat.icon size={24} strokeWidth={2.5} />
                                                </div>
                                                <h4 className="font-bold text-navy-900 mb-1 leading-snug">{stat.title}</h4>
                                                <p className="text-xs text-slate-600 leading-relaxed">{stat.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
