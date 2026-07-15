import {
  absoluteUrl,
  pageMetadata,
  pricingFaqs,
  site,
  type PageKey,
} from './site';

type JsonLd = Record<string, unknown>;

function breadcrumbSchema(page: PageKey): JsonLd | undefined {
  if (page === 'home') return undefined;

  const metadata = pageMetadata[page];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: pageMetadata.home.label,
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: metadata.label,
        item: absoluteUrl(metadata.pathname),
      },
    ],
  };
}

export function structuredDataForPage(page: PageKey): JsonLd[] {
  const metadata = pageMetadata[page];
  const canonicalUrl = absoluteUrl(metadata.pathname);
  const schemas: JsonLd[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: metadata.title,
      description: metadata.description,
      isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    },
  ];

  if (page === 'home') {
    schemas.unshift({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${absoluteUrl('/')}#website`,
      url: absoluteUrl('/'),
      name: site.name,
      description: site.description,
    });
  }

  if (page === 'features') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: site.name,
      operatingSystem: 'iOS',
      description: metadata.description,
      url: canonicalUrl,
    });
  }

  if (page === 'pricing') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: pricingFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  const breadcrumb = breadcrumbSchema(page);
  if (breadcrumb) schemas.push(breadcrumb);

  return schemas;
}
