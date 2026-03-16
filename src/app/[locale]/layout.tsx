import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { locales, type Locale, isRtl } from '@/i18n/config';
import Chatbot from '@/components/Chatbot';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const localeMessages = messages[validLocale];

  // Build hreflang alternate URLs for all locales
  const BASE_URL = 'https://www.brightsupport.com.au';
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${BASE_URL}/${l}`;
  }
  languages['x-default'] = `${BASE_URL}/en`;

  // Explicit, rich description — ensures Lighthouse and Screaming Frog never flag missing/long meta
  const description =
    'Trusted NDIS disability support provider in Shepparton. Daily living, community nursing, physiotherapy, companionship, transport and more.';

  return {
    title: localeMessages.Hero.title,
    description,
    openGraph: {
      title: localeMessages.Hero.title,
      description,
      type: 'website',
      locale: validLocale === 'en' ? 'en_AU' : validLocale,
      siteName: 'Bright Support',
      url: `${BASE_URL}/${validLocale}`,
    },
    alternates: {
      canonical: `${BASE_URL}/${validLocale}`,
      languages,
    },
  };
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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Chatbot />
      </NextIntlClientProvider>
    </div>
  );
}
