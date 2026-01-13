import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { locales, type Locale, isRtl } from '@/i18n/config';

// Import messages statically for static export compatibility
import enMessages from '../../../messages/en.json';
import zhMessages from '../../../messages/zh.json';
import arMessages from '../../../messages/ar.json';
import viMessages from '../../../messages/vi.json';

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  zh: zhMessages,
  ar: arMessages,
  vi: viMessages,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  // Enable static rendering
  setRequestLocale(validLocale);

  // Get messages for the current locale (statically imported)
  const localeMessages = messages[validLocale];

  // Determine text direction for RTL languages
  const dir = isRtl(validLocale) ? 'rtl' : 'ltr';

  return (
    <div dir={dir} lang={validLocale}>
      <NextIntlClientProvider locale={validLocale} messages={localeMessages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
