import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const DisclaimerModal = ({ isOpen, onAccept, onDecline }) => {
  const { language } = useLanguage();
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

  // Translation content
  const content = {
    en: {
      title: "Important Disclaimer",
      subtitle: "Please read carefully before booking",
      intro: "By booking a consultation with Acharyaa Indira Pandey Astrology, you acknowledge and agree to the following terms and conditions:",
      section1: {
        title: "Nature of Astrological Services",
        points: [
          "Astrology is an ancient Vedic science based on planetary positions and their influence on human life.",
          "Astrological consultations are for guidance and spiritual insight only, not absolute predictions.",
          "Results and outcomes may vary based on individual karma, free will, and life circumstances.",
          "Astrology should be used as a tool for self-awareness and personal growth, not as a substitute for professional advice."
        ]
      },
      section2: {
        title: "Not a Substitute for Professional Services",
        points: [
          "Medical: Astrological guidance is NOT a substitute for medical diagnosis, treatment, or advice from qualified healthcare professionals.",
          "Legal: We do not provide legal advice. Consult a licensed attorney for legal matters.",
          "Financial: Astrological insights should not replace professional financial planning or investment advice.",
          "Mental Health: For mental health concerns, please consult a licensed therapist or counselor."
        ]
      },
      section3: {
        title: "Accuracy and Predictions",
        points: [
          "While we strive for accuracy, astrological predictions are based on interpretations and may not always be 100% accurate.",
          "Predictions are influenced by the accuracy of birth details (date, time, place) provided by you.",
          "We cannot guarantee specific outcomes or results from following astrological remedies.",
          "Free will and personal choices can alter predicted outcomes."
        ]
      },
      section4: {
        title: "Gemstone and Remedies",
        points: [
          "Gemstone recommendations are based on Vedic astrology principles and individual birth charts.",
          "We recommend only authentic, natural gemstones, but results may vary.",
          "Gemstones and remedies are spiritual tools and should not replace medical treatment.",
          "Any allergic reactions or physical discomfort from wearing gemstones should be reported to a doctor immediately."
        ]
      },
      section5: {
        title: "Privacy and Confidentiality",
        points: [
          "All personal information and consultation details are kept strictly confidential.",
          "Your birth chart and personal data will not be shared with third parties without your consent.",
          "Consultations are private and recorded only for quality assurance purposes (with your permission)."
        ]
      },
      section6: {
        title: "Payment and Refund Policy",
        points: [
          "All consultation fees must be paid in advance through our secure payment gateway.",
          "Refunds are available only if the consultation is cancelled by us or due to technical issues from our end.",
          "No refunds will be issued for client no-shows or cancellations made less than 24 hours before the scheduled time.",
          "Gemstone purchases are final and non-refundable once delivered."
        ]
      },
      section7: {
        title: "Limitation of Liability",
        points: [
          "Acharyaa Indira Pandey and our team are not liable for any decisions made based on astrological consultations.",
          "You are solely responsible for your actions and decisions following the consultation.",
          "We are not responsible for any financial, emotional, or physical consequences arising from following astrological advice."
        ]
      },
      scrollIndicator: "↓ Please scroll down to read all terms ↓",
      checkboxLabel: "I have read and understood the disclaimer. I agree to the terms and conditions stated above and acknowledge that astrological consultations are for guidance purposes only.",
      decline: "Decline",
      accept: "Accept & Continue"
    },
    hi: {
      title: "महत्वपूर्ण अस्वीकरण",
      subtitle: "बुकिंग से पहले कृपया ध्यान से पढ़ें",
      intro: "आचार्या इंदिरा पांडेय ज्योतिष के साथ परामर्श बुक करके, आप निम्नलिखित नियमों और शर्तों को स्वीकार करते हैं:",
      section1: {
        title: "ज्योतिषीय सेवाओं की प्रकृति",
        points: [
          "ज्योतिष एक प्राचीन वैदिक विज्ञान है जो ग्रहों की स्थिति और मानव जीवन पर उनके प्रभाव पर आधारित है।",
          "ज्योतिषीय परामर्श केवल मार्गदर्शन और आध्यात्मिक अंतर्दृष्टि के लिए हैं, पूर्ण भविष्यवाणी नहीं।",
          "परिणाम व्यक्तिगत कर्म, स्वतंत्र इच्छा और जीवन परिस्थितियों के आधार पर भिन्न हो सकते हैं।",
          "ज्योतिष का उपयोग आत्म-जागरूकता और व्यक्तिगत विकास के उपकरण के रूप में किया जाना चाहिए, पेशेवर सलाह के विकल्प के रूप में नहीं।"
        ]
      },
      section2: {
        title: "पेशेवर सेवाओं का विकल्प नहीं",
        points: [
          "चिकित्सा: ज्योतिषीय मार्गदर्शन योग्य स्वास्थ्य पेशेवरों से चिकित्सा निदान, उपचार या सलाह का विकल्प नहीं है।",
          "कानूनी: हम कानूनी सलाह प्रदान नहीं करते हैं। कानूनी मामलों के लिए लाइसेंस प्राप्त वकील से परामर्श करें।",
          "वित्तीय: ज्योतिषीय अंतर्दृष्टि पेशेवर वित्तीय योजना या निवेश सलाह का स्थान नहीं ले सकती।",
          "मानसिक स्वास्थ्य: मानसिक स्वास्थ्य संबंधी चिंताओं के लिए, कृपया लाइसेंस प्राप्त चिकित्सक या परामर्शदाता से परामर्श करें।"
        ]
      },
      section3: {
        title: "सटीकता और भविष्यवाणियां",
        points: [
          "हालांकि हम सटीकता के लिए प्रयास करते हैं, ज्योतिषीय भविष्यवाणियां व्याख्याओं पर आधारित हैं और हमेशा 100% सटीक नहीं हो सकती हैं।",
          "भविष्यवाणियां आपके द्वारा प्रदान किए गए जन्म विवरण (तिथि, समय, स्थान) की सटीकता से प्रभावित होती हैं।",
          "हम ज्योतिषीय उपायों का पालन करने से विशिष्ट परिणामों या परिणामों की गारंटी नहीं दे सकते।",
          "स्वतंत्र इच्छा और व्यक्तिगत विकल्प भविष्यवाणी किए गए परिणामों को बदल सकते हैं।"
        ]
      },
      section4: {
        title: "रत्न और उपाय",
        points: [
          "रत्न की सिफारिशें वैदिक ज्योतिष सिद्धांतों और व्यक्तिगत जन्म कुंडली पर आधारित हैं।",
          "हम केवल प्रामाणिक, प्राकृतिक रत्नों की सिफारिश करते हैं, लेकिन परिणाम भिन्न हो सकते हैं।",
          "रत्न और उपाय आध्यात्मिक उपकरण हैं और चिकित्सा उपचार का स्थान नहीं ले सकते।",
          "रत्न पहनने से किसी भी एलर्जी प्रतिक्रिया या शारीरिक असुविधा की तुरंत डॉक्टर को सूचना दी जानी चाहिए।"
        ]
      },
      section5: {
        title: "गोपनीयता और गोपनीयता",
        points: [
          "सभी व्यक्तिगत जानकारी और परामर्श विवरण सख्ती से गोपनीय रखे जाते हैं।",
          "आपकी जन्म कुंडली और व्यक्तिगत डेटा आपकी सहमति के बिना तीसरे पक्ष के साथ साझा नहीं किया जाएगा।",
          "परामर्श निजी हैं और केवल गुणवत्ता आश्वासन उद्देश्यों के लिए रिकॉर्ड किए जाते हैं (आपकी अनुमति से)।"
        ]
      },
      section6: {
        title: "भुगतान और धनवापसी नीति",
        points: [
          "सभी परामर्श शुल्क हमारे सुरक्षित भुगतान गेटवे के माध्यम से अग्रिम भुगतान किया जाना चाहिए।",
          "धनवापसी केवल तभी उपलब्ध है जब परामर्श हमारे द्वारा रद्द किया जाता है या हमारी ओर से तकनीकी समस्याओं के कारण।",
          "निर्धारित समय से 24 घंटे से कम समय पहले किए गए ग्राहक नो-शो या रद्दीकरण के लिए कोई धनवापसी जारी नहीं की जाएगी।",
          "रत्न खरीद अंतिम है और एक बार वितरित होने के बाद गैर-वापसी योग्य है।"
        ]
      },
      section7: {
        title: "दायित्व की सीमा",
        points: [
          "आचार्या इंदिरा पांडेय और हमारी टीम ज्योतिषीय परामर्श के आधार पर किए गए किसी भी निर्णय के लिए उत्तरदायी नहीं हैं।",
          "परामर्श के बाद आप अपने कार्यों और निर्णयों के लिए पूरी तरह से जिम्मेदार हैं।",
          "हम ज्योतिषीय सलाह का पालन करने से उत्पन्न किसी भी वित्तीय, भावनात्मक या शारीरिक परिणामों के लिए जिम्मेदार नहीं हैं।"
        ]
      },
      scrollIndicator: "↓ कृपया सभी नियम पढ़ने के लिए नीचे स्क्रॉल करें ↓",
      checkboxLabel: "मैंने अस्वीकरण को पढ़ और समझ लिया है। मैं ऊपर बताई गई शर्तों से सहमत हूं और स्वीकार करता हूं कि ज्योतिषीय परामर्श केवल मार्गदर्शन उद्देश्यों के लिए हैं।",
      decline: "अस्वीकार करें",
      accept: "स्वीकार करें और जारी रखें"
    }
  };

  const t = content[language] || content.en;

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
                <h2 className="text-2xl font-bold text-white">{t.title}</h2>
                <p className="text-purple-100 text-sm">{t.subtitle}</p>
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
            <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{
              __html: t.intro.replace('Acharyaa Indira Pandey Astrology', '<strong>Acharyaa Indira Pandey Astrology</strong>')
            }} />
          </div>

          {/* Section 1 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">1</span>
              {t.section1.title}
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              {t.section1.points.map((point, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: point }} />
              ))}
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">2</span>
              {t.section2.title}
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              {t.section2.points.map((point, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: point }} />
              ))}
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">3</span>
              {t.section3.title}
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              {t.section3.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">4</span>
              {t.section4.title}
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              {t.section4.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">5</span>
              {t.section5.title}
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              {t.section5.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">6</span>
              {t.section6.title}
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              {t.section6.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Section 7 */}
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">7</span>
              {t.section7.title}
            </h3>
            <ul className="space-y-2 text-gray-700 ml-10 list-disc">
              {t.section7.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Scroll Indicator */}
          {!hasScrolled && (
            <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-8 pb-4 text-center">
              <p className="text-purple-600 font-semibold animate-bounce">
                {t.scrollIndicator}
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
              {t.checkboxLabel}
            </label>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onDecline}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              {t.decline}
            </Button>
            <Button
              onClick={onAccept}
              disabled={!agreed || !hasScrolled}
              className="flex-1 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {t.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;

