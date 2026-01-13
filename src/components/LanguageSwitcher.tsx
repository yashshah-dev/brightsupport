'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function LanguageSwitcher({ currentLocale }: { currentLocale?: Locale }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Detect current locale from pathname
    const detectedLocale = locales.find(locale =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    ) || 'en';

    const activeLocale = currentLocale || detectedLocale;

    // Get path without locale prefix for switching
    const getLocalizedPath = (locale: Locale) => {
        // Remove current locale prefix if present
        let pathWithoutLocale = pathname;
        for (const loc of locales) {
            if (pathname.startsWith(`/${loc}/`)) {
                pathWithoutLocale = pathname.replace(`/${loc}`, '');
                break;
            } else if (pathname === `/${loc}`) {
                pathWithoutLocale = '/';
                break;
            }
        }

        // For English (default), we can use root path
        // For other locales, add the prefix
        if (locale === 'en') {
            return pathWithoutLocale || '/';
        }
        return `/${locale}${pathWithoutLocale}`;
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
            >
                <Globe size={14} className="text-[#7DD3FC]" />
                <span>{localeNames[activeLocale as Locale]}</span>
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-slate-100 py-2 min-w-[120px] z-50">
                        {locales.map((locale) => (
                            <Link
                                key={locale}
                                href={getLocalizedPath(locale)}
                                className={`block px-4 py-2 text-sm transition-colors duration-200 ${activeLocale === locale
                                        ? 'bg-sky-50 text-[#1E4D8C] font-medium'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {localeNames[locale]}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
