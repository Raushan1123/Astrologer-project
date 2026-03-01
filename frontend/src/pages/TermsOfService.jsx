import React from 'react';
import { Card } from '../components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 shadow-xl">
          <h1 className="text-4xl font-bold text-purple-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last Updated: February 2026</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the services of Acharyaa Indira Pandey Astrology ("we," "our," or "us"),
                you accept and agree to be bound by these Terms of Service. If you do not agree to these terms,
                please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">2. Services Provided</h2>
              <p className="mb-3">We offer the following astrology consultation services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Birth Chart (Kundli) Analysis</li>
                <li>Career & Business Guidance</li>
                <li>Marriage & Relationship Compatibility</li>
                <li>Health & Life Path Insights</li>
                <li>Vastu Consultation</li>
                <li>Numerology</li>
                <li>Gemstone Recommendations</li>
                <li>Auspicious Childbirth Timing (Muhurat)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">3. Booking and Payments</h2>
              <div className="space-y-3">
                <p><strong>3.1 Consultation Fees:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Up to 10 minutes: Free (worth ₹1999 - first-time consultation only)</li>
                  <li>10+ minutes: Varies by service (starting from ₹1,500)</li>
                </ul>
                <p><strong>3.2 Payment:</strong> All payments are processed securely through Razorpay. We accept credit/debit cards, UPI, net banking, and digital wallets.</p>
                <p><strong>3.3 Booking Confirmation:</strong> You will receive a confirmation email upon successful booking and payment.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">4. Cancellation and Refund Policy</h2>
              <div className="space-y-3">
                <p><strong>4.1 Cancellation by Client:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cancellations made 24 hours before the scheduled consultation: Full refund</li>
                  <li>Cancellations made less than 24 hours before: 50% refund</li>
                  <li>No-shows or cancellations after the scheduled time: No refund</li>
                </ul>
                <p><strong>4.2 Cancellation by Us:</strong> If we need to cancel or reschedule, you will receive a full refund or the option to reschedule at no additional cost.</p>
                <p><strong>4.3 Refund Processing:</strong> Refunds will be processed within 7-10 business days to the original payment method.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">5. Consultation Guidelines</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Please provide accurate birth details (date, time, and place) for accurate readings</li>
                <li>Be punctual for your scheduled consultation</li>
                <li>Consultations are conducted in Hindi or English</li>
                <li>Recording of consultations is not permitted without prior consent</li>
                <li>Respect and professional conduct is expected from both parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">6. Disclaimer</h2>
              <div className="bg-amber-50 p-4 rounded-lg space-y-2">
                <p><strong>Important:</strong> Astrology consultations are for guidance and entertainment purposes only.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our services do not replace professional medical, legal, or financial advice</li>
                  <li>We are not responsible for decisions made based on our consultations</li>
                  <li>Results and predictions are based on astrological principles and may vary</li>
                  <li>We do not guarantee specific outcomes or results</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">7. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and images, is the property of
                Acharyaa Indira Pandey Astrology and is protected by copyright laws. Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">8. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">9. Limitation of Liability</h2>
              <p>
                We shall not be liable for any indirect, incidental, special, or consequential damages arising 
                from the use of our services. Our total liability shall not exceed the amount paid for the consultation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">10. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective 
                immediately upon posting on this page. Continued use of our services constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">11. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of India. 
                Any disputes shall be subject to the exclusive jurisdiction of the courts in Ghaziabad, India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-800 mb-3">12. Contact Information</h2>
              <p className="mb-3">For questions about these Terms of Service, please contact us:</p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p><strong>Acharyaa Indira Pandey</strong></p>
                <p>Email: indirapandey2526@gmail.com</p>
                <p>Phone: +91 8130420339</p>
                <p>Location: Ghaziabad, India</p>
              </div>
            </section>

            <section className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by 
                these Terms of Service.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;

