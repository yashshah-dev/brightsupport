'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    __thirdPartyScriptsLoaded?: boolean;
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-2EXWNERWT2';
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17576617769';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PT83J47';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const DEFER_DELAY_MS = 3500;

const loadScript = (src: string) => {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
  return script;
};

export default function DeferredThirdPartyScripts() {
  useEffect(() => {
    if (window.__thirdPartyScriptsLoaded) return;

    const loadAll = () => {
      if (window.__thirdPartyScriptsLoaded) return;
      window.__thirdPartyScriptsLoaded = true;

      if (GA_MEASUREMENT_ID || GOOGLE_ADS_ID) {
        loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID || GOOGLE_ADS_ID}`);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(...args: unknown[]) {
          window.dataLayer?.push(args);
        };

        window.gtag('js', new Date());
        window.gtag('consent', 'default', {
          analytics_storage: 'granted',
          ad_storage: 'denied',
          functionality_storage: 'granted',
          personalization_storage: 'denied',
          security_storage: 'granted',
        });

        if (GA_MEASUREMENT_ID) {
          window.gtag('config', GA_MEASUREMENT_ID, {
            send_page_view: true,
            allow_google_signals: false,
          });
        }

        if (GOOGLE_ADS_ID) {
          window.gtag('config', GOOGLE_ADS_ID);
        }
      }

      if (GTM_ID) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js',
        });

        loadScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
      }

      if (CLARITY_ID) {
        (function (c: Window, l: Document, a: 'clarity', r: string, i: string) {
          c[a] =
            c[a] ||
            function (...args: unknown[]) {
              (c[a] as any).q = (c[a] as any).q || [];
              (c[a] as any).q.push(args);
            };
          const t = l.createElement(r) as HTMLScriptElement;
          t.async = true;
          t.src = `https://www.clarity.ms/tag/${i}`;
          const y = l.getElementsByTagName(r)[0];
          y.parentNode?.insertBefore(t, y);
        })(window, document, 'clarity', 'script', CLARITY_ID);
      }

      cleanupListeners();
    };

    const loadWhenIdle = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadAll, { timeout: DEFER_DELAY_MS });
      } else {
        setTimeout(loadAll, DEFER_DELAY_MS);
      }
    };

    const onFirstInteraction = () => {
      loadAll();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadWhenIdle();
      }
    };

    const interactionEvents: Array<keyof WindowEventMap> = [
      'pointerdown',
      'keydown',
      'touchstart',
      'scroll',
    ];

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, onFirstInteraction, { passive: true, once: true });
    });

    document.addEventListener('visibilitychange', onVisibilityChange);
    loadWhenIdle();

    const cleanupListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, onFirstInteraction);
      });
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };

    return cleanupListeners;
  }, []);

  return null;
}
