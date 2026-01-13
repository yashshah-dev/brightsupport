export const locales = ['en', 'zh', 'ar', 'vi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
    en: 'English',
    zh: '中文',
    ar: 'العربية',
    vi: 'Tiếng Việt',
};

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

export function isRtl(locale: Locale): boolean {
    return rtlLocales.includes(locale);
}
