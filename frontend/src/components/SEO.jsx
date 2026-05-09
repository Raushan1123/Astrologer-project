import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for managing page title, meta description, canonical tags, and schema markup
 * @param {string} title - Page title
 * @param {string} description - Page meta description
 * @param {string} canonical - Canonical URL (optional, defaults to current page URL)
 * @param {object} schema - Schema.org structured data (optional)
 */
const SEO = ({ title, description, canonical, schema }) => {
  const baseUrl = 'https://www.happykismat.com';
  const canonicalUrl = canonical || `${baseUrl}${window.location.pathname}`;

  // Default LocalBusiness schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Acharyaa Indira Pandey",
    "image": "",
    "@id": "",
    "url": "https://www.happykismat.com/",
    "telephone": "+91 8792967417",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Ghaziabad",
      "postalCode": "",
      "addressCountry": "IN"
    }
  };

  const schemaData = schema || defaultSchema;

  return (
    <Helmet>
      {/* Page Title */}
      {title && <title>{title}</title>}

      {/* Meta Description */}
      {description && <meta name="description" content={description} />}

      {/* Canonical Tag */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;

