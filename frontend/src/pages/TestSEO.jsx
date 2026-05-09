import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { Card } from '../components/ui/card';

const TestSEO = () => {
  const [seoInfo, setSeoInfo] = useState({
    title: '',
    description: '',
    canonical: '',
    hasSchema: false
  });

  useEffect(() => {
    // Wait a bit for Helmet to update the DOM
    const timer = setTimeout(() => {
      const title = document.title;
      const descriptionMeta = document.querySelector('meta[name="description"]');
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      const schemaScript = document.querySelector('script[type="application/ld+json"]');

      setSeoInfo({
        title: title,
        description: descriptionMeta ? descriptionMeta.content : 'Not found',
        canonical: canonicalLink ? canonicalLink.href : 'Not found',
        hasSchema: !!schemaScript,
        schemaContent: schemaScript ? JSON.parse(schemaScript.textContent) : null
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-cream-100 py-20 px-4">
      <SEO
        title="SEO Test Page | Happy Kismat - Testing Meta Tags"
        description="This is a test page to verify that SEO component is working correctly with title, description, canonical tags, and schema markup."
        canonical="https://www.happykismat.com/test-seo"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-maroon-500 mb-8 text-center">
          SEO Component Test Page
        </h1>

        <Card className="p-6 mb-6 bg-white">
          <h2 className="text-2xl font-semibold text-maroon-500 mb-4">
            Current SEO Values (Live from DOM)
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gold-600">Title:</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded mt-2">
                {seoInfo.title}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gold-600">Description:</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded mt-2">
                {seoInfo.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gold-600">Canonical URL:</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded mt-2 break-all">
                {seoInfo.canonical}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gold-600">Schema Markup:</h3>
              <p className="text-gray-700 mb-2">
                {seoInfo.hasSchema ? '✅ Present' : '❌ Not found'}
              </p>
              {seoInfo.schemaContent && (
                <pre className="text-sm bg-gray-50 p-3 rounded mt-2 overflow-auto">
                  {JSON.stringify(seoInfo.schemaContent, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-green-50 border-green-200">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Expected Values
          </h2>
          
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-green-600">Expected Title:</h3>
              <p className="text-gray-700 bg-white p-3 rounded mt-2">
                SEO Test Page | Happy Kismat - Testing Meta Tags
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-green-600">Expected Description:</h3>
              <p className="text-gray-700 bg-white p-3 rounded mt-2">
                This is a test page to verify that SEO component is working correctly with title, description, canonical tags, and schema markup.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-green-600">Expected Canonical:</h3>
              <p className="text-gray-700 bg-white p-3 rounded mt-2">
                https://www.happykismat.com/test-seo
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            <strong>Note:</strong> If the values match, the SEO component is working correctly! 🎉
          </p>
          <p className="text-sm text-gray-500 mt-2">
            You can also inspect the page source using F12 Developer Tools to verify.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestSEO;

