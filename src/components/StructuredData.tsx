interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'FAQPage';
  data?: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = 'https://brightsupport.com.au';
    
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': `${baseUrl}/#organization`,
          name: 'Bright Support',
          alternateName: 'Bright Support Australia',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description: 'NDIS Disability & Support Services Provider in Australia',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '279 Wyndham St',
            addressLocality: 'Shepparton',
            addressRegion: 'VIC',
            postalCode: '3630',
            addressCountry: 'AU',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+61-1800-407-508',
            contactType: 'customer service',
            email: 'care@brightsupport.com.au',
            availableLanguage: ['English', 'Chinese', 'Arabic', 'Vietnamese'],
            areaServed: 'AU',
          },
          sameAs: [
            'https://www.facebook.com/brightsupportcare',
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '4',
            bestRating: '5',
            worstRating: '1',
          },
          ...data,
        };

      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${baseUrl}/#business`,
          name: 'Bright Support',
          image: `${baseUrl}/logo.png`,
          description: 'Trusted NDIS support services provider offering disability care, aged care, and community support services',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '279 Wyndham St',
            addressLocality: 'Shepparton',
            addressRegion: 'VIC',
            postalCode: '3630',
            addressCountry: 'AU',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: -36.38,
            longitude: 145.395,
          },
          telephone: '+61-1800-407-508',
          email: 'care@brightsupport.com.au',
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '18:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Saturday'],
              opens: '09:00',
              closes: '14:00',
            },
          ],
          priceRange: '$$',
          paymentAccepted: 'NDIS',
          currenciesAccepted: 'AUD',
          taxID: '32659000978',
          url: baseUrl,
          hasMap: 'https://maps.google.com/?cid=2822930396149587949',
          ...data,
        };

      case 'Service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: data?.serviceType || 'NDIS Support Services',
          provider: {
            '@type': 'Organization',
            name: 'Bright Support',
            telephone: '+61-1800-407-508',
          },
          areaServed: {
            '@type': 'Country',
            name: 'Australia',
          },
          ...data,
        };

      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data?.questions || [],
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  // Escape & as \u0026 to prevent HTML parsers from corrupting the JSON
  // inside <script> tags (a well-known browser/HTML5 parser issue).
  const safeJson = JSON.stringify(structuredData).replace(/&/g, '\\u0026');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
