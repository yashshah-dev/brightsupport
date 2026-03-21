import { getRequestConfig } from 'next-intl/server';
import enMessages from '../../messages/en.json';

export default getRequestConfig(async () => {
    return {
        locale: 'en',
        messages: enMessages,
        onError(error) {
            if (error.code === 'MISSING_MESSAGE') {
                return;
            }
            console.error(error);
        },
        getMessageFallback({ namespace, key, error }) {
            const path = [namespace, key].filter((part) => part != null).join('.');
            if (error.code === 'MISSING_MESSAGE') {
                return '';
            }
            return 'FIXME: ' + path;
        }
    };
});
