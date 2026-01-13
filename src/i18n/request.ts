import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Validate that the incoming locale is valid
    if (!locale || !locales.includes(locale as Locale)) {
        locale = 'en';
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
        onError(error) {
            if (error.code === 'MISSING_MESSAGE') {
                return;
            }
            console.error(error);
        },
        getMessageFallback({ namespace, key, error }) {
            const path = [namespace, key].filter((part) => part != null).join('.');
            if (error.code === 'MISSING_MESSAGE') {
                return ''; // Return empty string for missing translations instead of key
            }
            return 'FIXME: ' + path;
        }
    };
});
