/**
 * Image Optimization Utilities
 * Optimizes image URLs for better performance
 */

/**
 * Optimize Unsplash image URLs with size and format parameters
 * @param {string} url - Original Unsplash URL
 * @param {number} width - Desired width in pixels
 * @param {number} quality - Image quality (1-100)
 * @returns {string} Optimized URL
 */
export const optimizeUnsplashUrl = (url, width = 800, quality = 80) => {
  if (!url || !url.includes('unsplash.com')) return url;
  
  // Remove existing query parameters
  const baseUrl = url.split('?')[0];
  
  // Add optimization parameters
  const params = new URLSearchParams({
    w: width,           // Width
    q: quality,         // Quality
    fm: 'webp',         // Format (WebP is 30% smaller than JPEG)
    fit: 'crop',        // Crop to fit
    auto: 'format'      // Auto-select best format
  });
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Get responsive image sizes for different breakpoints
 * @param {string} url - Original image URL
 * @returns {object} Object with URLs for different sizes
 */
export const getResponsiveImageUrls = (url) => {
  if (!url || !url.includes('unsplash.com')) {
    return {
      mobile: url,
      tablet: url,
      desktop: url
    };
  }
  
  return {
    mobile: optimizeUnsplashUrl(url, 400, 75),   // Mobile: 400px, lower quality
    tablet: optimizeUnsplashUrl(url, 800, 80),   // Tablet: 800px
    desktop: optimizeUnsplashUrl(url, 1200, 85)  // Desktop: 1200px
  };
};

/**
 * Cloudflare R2 URL builder (for future use)
 * @param {string} imagePath - Path to image in R2 bucket
 * @param {number} width - Desired width
 * @returns {string} R2 URL
 */
export const getR2ImageUrl = (imagePath, width = 800) => {
  const R2_BASE_URL = process.env.REACT_APP_R2_BASE_URL || '';
  
  if (!R2_BASE_URL) {
    console.warn('R2_BASE_URL not configured, returning original path');
    return imagePath;
  }
  
  return `${R2_BASE_URL}/${imagePath}?w=${width}&format=webp`;
};

/**
 * Preload critical images
 * @param {string[]} urls - Array of image URLs to preload
 */
export const preloadImages = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Get optimized image URL based on device pixel ratio
 * @param {string} url - Original URL
 * @param {number} baseWidth - Base width
 * @returns {string} Optimized URL
 */
export const getOptimizedUrl = (url, baseWidth = 800) => {
  const dpr = window.devicePixelRatio || 1;
  const width = Math.min(baseWidth * dpr, 2400); // Cap at 2400px
  return optimizeUnsplashUrl(url, width);
};

