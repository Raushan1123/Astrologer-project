import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

const DisclaimerModal = ({ isOpen, onAccept, onDecline }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 50;
    if (bottom) {
      setHasScrolled(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-amber-500 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Important Disclaimer</h2>
                <p className="text-purple-100 text-sm">Please read carefully before booking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div 
          className="flex-1 overflow-y-auto p-6 space-y-6"
          onScroll={handleScroll}
        >
          {/* Introduction */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <p className="text-gray-700 leading-relaxed">
              By booking a consultation with <strong>Acharyaa Indira Pandey Astrology</strong>, you acknowledge and agree to the following terms and conditions:
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">1</span>
              Nature of Astrological Services
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              <li>Astrology is an ancient Vedic science based on planetary positions and their influence on human life.</li>
              <li>Astrological consultations are for <strong>guidance and spiritual insight only</strong>, not absolute predictions.</li>
              <li>Results and outcomes may vary based on individual karma, free will, and life circumstances.</li>
              <li>Astrology should be used as a tool for self-awareness and personal growth, not as a substitute for professional advice.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">2</span>
              Not a Substitute for Professional Services
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              <li><strong>Medical:</strong> Astrological guidance is NOT a substitute for medical diagnosis, treatment, or advice from qualified healthcare professionals.</li>
              <li><strong>Legal:</strong> We do not provide legal advice. Consult a licensed attorney for legal matters.</li>
              <li><strong>Financial:</strong> Astrological insights should not replace professional financial planning or investment advice.</li>
              <li><strong>Mental Health:</strong> For mental health concerns, please consult a licensed therapist or counselor.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">3</span>
              Accuracy and Predictions
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              <li>While we strive for accuracy, astrological predictions are based on interpretations and may not always be 100% accurate.</li>
              <li>Predictions are influenced by the accuracy of birth details (date, time, place) provided by you.</li>
              <li>We cannot guarantee specific outcomes or results from following astrological remedies.</li>
              <li>Free will and personal choices can alter predicted outcomes.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">4</span>
              Gemstone and Remedies
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              <li>Gemstone recommendations are based on Vedic astrology principles and individual birth charts.</li>
              <li>We recommend only authentic, natural gemstones, but results may vary.</li>
              <li>Gemstones and remedies are spiritual tools and should not replace medical treatment.</li>
              <li>Any allergic reactions or physical discomfort from wearing gemstones should be reported to a doctor immediately.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">5</span>
              Privacy and Confidentiality
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              <li>All personal information and consultation details are kept strictly confidential.</li>
              <li>Your birth chart and personal data will not be shared with third parties without your consent.</li>
              <li>Consultations are private and recorded only for quality assurance purposes (with your permission).</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">6</span>
              Payment and Refund Policy
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              <li>All consultation fees must be paid in advance through our secure payment gateway.</li>
              <li>Refunds are available only if the consultation is cancelled by us or due to technical issues from our end.</li>
              <li>No refunds will be issued for client no-shows or cancellations made less than 24 hours before the scheduled time.</li>
              <li>Gemstone purchases are final and non-refundable once delivered.</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">7</span>
              Limitation of Liability
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              <li>Acharyaa Indira Pandey and our team are not liable for any decisions made based on astrological consultations.</li>
              <li>You are solely responsible for your actions and decisions following the consultation.</li>
              <li>We are not responsible for any financial, emotional, or physical consequences arising from following astrological advice.</li>
            </ul>
          </div>

          {/* Scroll Indicator */}
          {!hasScrolled && (
            <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-8 pb-4 text-center">
              <p className="text-purple-600 font-semibold animate-bounce">
                ↓ Please scroll down to read all terms ↓
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
          <div className="flex items-start gap-3 mb-4">
            <input
              type="checkbox"
              id="agree-checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              disabled={!hasScrolled}
            />
            <label htmlFor="agree-checkbox" className="text-sm text-gray-700 cursor-pointer">
              I have read and understood the disclaimer. I agree to the terms and conditions stated above and acknowledge that astrological consultations are for guidance purposes only.
            </label>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onDecline}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Decline
            </Button>
            <Button
              onClick={onAccept}
              disabled={!agreed || !hasScrolled}
              className="flex-1 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Accept & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;

