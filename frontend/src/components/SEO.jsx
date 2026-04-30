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
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return null; // This component doesn't render anything
};

export default SEO;

