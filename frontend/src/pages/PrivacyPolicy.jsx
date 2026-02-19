import React from 'react';
import { Card } from '../components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 shadow-xl">
          <h1 className="text-4xl font-bold text-purple-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: February 2026</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">1. Information We Collect</h2>
              <p className="mb-3">We collect information that you provide directly to us when you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Book a consultation (name, email, phone number, date of birth, birth time, birth place)</li>
                <li>Contact us through our contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Make a payment for our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide astrology consultation services</li>
                <li>Process your bookings and payments</li>
                <li>Send you confirmation emails and updates about your consultation</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send newsletters and promotional materials (only if you've subscribed)</li>
                <li>Improve our services and website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">3. Information Sharing</h2>
              <p className="mb-3">We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Payment Processors:</strong> We use Razorpay for secure payment processing</li>
                <li><strong>Email Service Providers:</strong> For sending consultation confirmations and newsletters</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized access, 
                alteration, disclosure, or destruction. All payment transactions are processed through secure, 
                PCI-compliant payment gateways.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">5. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Unsubscribe from our newsletter at any time</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">6. Cookies</h2>
              <p>
                Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on 
                your device. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices 
                of these external sites. We encourage you to read their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">8. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 18 years of age. We do not knowingly collect 
                personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">9. Changes to Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">10. Contact Us</h2>
              <p className="mb-3">If you have any questions about this Privacy Policy, please contact us:</p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p><strong>Mrs. Indira Pandey</strong></p>
                <p>Email: indirapandey2526@gmail.com</p>
                <p>Phone: +91 8130420339</p>
                <p>Location: Ghaziabad, India</p>
              </div>
            </section>

            <section className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                By using our website and services, you acknowledge that you have read and understood this Privacy Policy 
                and agree to its terms.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

