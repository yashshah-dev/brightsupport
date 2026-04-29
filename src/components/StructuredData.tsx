interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'FAQPage';
  data?: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = 'https://www.brightsupport.com.au';
    const sheppartonPlace = {
      '@type': 'City',
      '@id': `${baseUrl}/#place-shepparton`,
      name: 'Shepparton',
      containedInPlace: {
        '@type': 'State',
        name: 'Victoria',
        containedInPlace: {
          '@type': 'Country',
          name: 'Australia',
        },
      },
    };
    
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': `${baseUrl}/#organization`,
          name: 'Bright Support',
          alternateName: 'Bright Support Shepparton',
          legalName: 'Bright Support',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description: 'NDIS Disability & Support Services Provider in Australia',
          areaServed: [
            { '@id': `${baseUrl}/#place-shepparton` },
            {
              '@type': 'Place',
              name: 'Mooroopna',
              containedInPlace: { '@id': `${baseUrl}/#place-shepparton` },
            },
          ],
          location: { '@id': `${baseUrl}/#place-shepparton` },
          knowsAbout: [
            'NDIS support services',
            'Supported Independent Living',
            'Community nursing and complex care',
            'Support coordination',
            'Disability support in Shepparton',
          ],
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
            'https://maps.google.com/?cid=2822930396149587949',
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '6',
            bestRating: '5',
            worstRating: '1',
          },
          mainEntityOfPage: baseUrl,
          hasPOS: {
            '@type': 'Place',
            name: 'Bright Support Shepparton Office',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '279 Wyndham St',
              addressLocality: 'Shepparton',
              addressRegion: 'VIC',
              postalCode: '3630',
              addressCountry: 'AU',
            },
          },
          subjectOf: sheppartonPlace,
          ...data,
        };

      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${baseUrl}/#business`,
          branchOf: { '@id': `${baseUrl}/#organization` },
          parentOrganization: { '@id': `${baseUrl}/#organization` },
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
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '08:00',
              closes: '18:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Sunday'],
              opens: '08:00',
              closes: '12:00',
            },
          ],
          priceRange: '$$',
          paymentAccepted: 'NDIS',
          currenciesAccepted: 'AUD',
          taxID: '32659000978',
          url: baseUrl,
          hasMap: 'https://maps.google.com/?cid=2822930396149587949',
          areaServed: [
            { '@id': `${baseUrl}/#place-shepparton` },
            {
              '@type': 'Place',
              name: 'Mooroopna',
              containedInPlace: { '@id': `${baseUrl}/#place-shepparton` },
            },
          ],
          sameAs: [
            'https://www.facebook.com/brightsupportcare',
            'https://maps.google.com/?cid=2822930396149587949',
          ],
          containedInPlace: { '@id': `${baseUrl}/#place-shepparton` },
          ...data,
        };

      case 'Service':
        {
          const serviceUrl = typeof data?.url === 'string' ? data.url : `${baseUrl}/`;
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `${serviceUrl}#service`,
          serviceType: data?.serviceType || 'NDIS Support Services',
          provider: {
            '@id': `${baseUrl}/#organization`,
          },
          areaServed: {
            '@id': `${baseUrl}/#place-shepparton`,
          },
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl,
            availableLanguage: ['English', 'Chinese', 'Arabic', 'Vietnamese'],
          },
          ...data,
        };
      }

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
