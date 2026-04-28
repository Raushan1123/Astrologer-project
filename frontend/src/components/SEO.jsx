import { useEffect } from 'react';

/**
 * SEO Component for managing page title and meta description
 * @param {string} title - Page title
 * @param {string} description - Page meta description
 */
const SEO = ({ title, description }) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }

    // Cleanup function to reset to default values
    return () => {
      document.title = 'Acharyaa Indira Pandey - Vedic Astrology Consultation';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = 'Professional Vedic Astrology Consultation by Acharyaa Indira Pandey - Expert guidance for life, career, relationships, and spiritual growth';
      }
    };
  }, [title, description]);

  return null; // This component doesn't render anything
};

export default SEO;

