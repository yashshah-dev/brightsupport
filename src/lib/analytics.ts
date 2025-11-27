// src/lib/analytics.ts

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Tracks a pageview in GA4.
 * @param url - The URL of the page being viewed.
 */
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Tracks a custom event in GA4.
 * @param action - The event action (e.g., 'click', 'submit').
 * @param category - The event category (e.g., 'engagement').
 * @param label - Optional event label.
 * @param value - Optional numeric value.
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};

// Common event tracking functions for NDIS website
export const trackButtonClick = (buttonName: string, additionalParams?: Record<string, any>) => {
  event({
    action: 'click',
    category: 'engagement',
    label: buttonName,
    ...additionalParams,
  });
};

export const trackFormSubmission = (formName: string, additionalParams?: Record<string, any>) => {
  event({
    action: 'form_submit',
    category: 'conversion',
    label: formName,
    ...additionalParams,
  });
};

export const trackServiceInquiry = (serviceName: string, additionalParams?: Record<string, any>) => {
  event({
    action: 'service_inquiry',
    category: 'lead',
    label: serviceName,
    ...additionalParams,
  });
};

export const trackPhoneCall = (phoneNumber: string, additionalParams?: Record<string, any>) => {
  event({
    action: 'phone_call',
    category: 'contact',
    label: phoneNumber,
    ...additionalParams,
  });
};

export const trackEmailClick = (emailAddress: string, additionalParams?: Record<string, any>) => {
  event({
    action: 'email_click',
    category: 'contact',
    label: emailAddress,
    ...additionalParams,
  });
};

// Check if GA4 is loaded and ready
export const isGA4Loaded = (): boolean => {
  return typeof window !== 'undefined' && !!window.gtag && !!GA_MEASUREMENT_ID;
};