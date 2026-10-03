import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const KundliHindi = () => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    email: '',
    phone: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const zodiacDetailsHindi = {
    'Aries': {
      hindi_name: 'मेष',
      symbol: '♈',
      element: 'अग्नि',
      ruling_planet: 'मंगल',
      description: `मेष राशि साहस, पहल और नई शुरुआत का प्रतीक है। आप स्वभाव से साहसी, ऊर्जावान और महत्वाकांक्षी हैं। आपका शासक ग्रह मंगल आपको ड्राइव, निर्धारता और प्रतिस्पर्धी प्रकृति देता है। आप अपने कार्यों के प्रति भावुक हैं और उत्कृष्ट नेतृत्व गुण रखते हैं।`,
      characteristics: `आप गतिशील, साहसी और उत्कृष्ट समस्या समाधान क्षमता रखते हैं। आपका उत्साह संक्रामक है और दूसरों को प्रेरित करता है। आप संचार में सीधे हैं और ईमानदारी का मूल्य देते हैं। आपकी रोमांच की भावना आपको नए क्षेत्रों का अन्वेषण करने के लिए प्रेरित करती है।`,
      strengths: `नेतृत्व, साहस, पहल, निर्धारता, ईमानदारी, गतिविधि, आत्मविश्वास`,
      challenges: `आवेग, अधैर्य, आक्रामकता, अहंकार, लापरवाही`,
      career: `उद्यमिता, सैन्य, खेल, प्रबंधन या किसी भी क्षेत्र के लिए उपयुक्त।`,
      love: `भावुक, समर्पित, और अपने साथी से वफादारी की अपेक्षा करते हैं।`
    },
    'Taurus': {
      hindi_name: 'वृष',
      symbol: '♉',
      element: 'पृथ्वी',
      ruling_planet: 'शुक्र',
      description: `वृष राशि स्थिरता, विश्वसनीयता और भौतिक समृद्धि का प्रतीक है। आप जमीन से जुड़े हैं, व्यावहारिक और मजबूत मूल्यों वाले हैं। आपका शासक ग्रह शुक्र आपको सुंदरता, आराम और जीवन की बेहतरीन चीजों के लिए प्रशंसा देता है। आप दीर्घकालीन सुरक्षा के लिए प्रतिबद्ध हैं।`,
      characteristics: `आप विश्वसनीय, निर्भरयोग्य और उत्कृष्ट वित्तीय बुद्धि रखते हैं। आपका व्यावहारिक दृष्टिकोण सुनिश्चित करता है कि आप स्थिरता और सफलता प्राप्त करें। आपके पास सौंदर्य और सौंदर्यबोध की गहरी समझ है। आप धैर्यवान, निर्धारित और अपने लक्ष्यों के लिए कड़ी मेहनत करने के लिए तैयार हैं।`,
      strengths: `स्थिरता, विश्वसनीयता, वफादारी, व्यावहारिकता, धैर्य, निर्धारता, संवेदनशीलता`,
      challenges: `जिद्दीपन, कब्जापरस्ती, आलस्य, भौतिक लगाव, परिवर्तन के प्रति प्रतिरोध`,
      career: `बैंकिंग, वित्त, रियल एस्टेट, कृषि, कला या सौंदर्य में।`,
      love: `वफादार, समर्पित, और दीर्घकालीन प्रतिबद्धता चाहते हैं।`
    },
    'Gemini': {
      hindi_name: 'मिथुन',
      symbol: '♊',
      element: 'वायु',
      ruling_planet: 'बुध',
      description: `मिथुन राशि संचार, बुद्धि और बहुमुखीता का प्रतीक है। आप अत्यधिक बुद्धिमान, जिज्ञासु और उत्कृष्ट संचार कौशल रखते हैं। आपका शासक ग्रह बुध आपको एक उत्कृष्ट वक्ता और लेखक बनाता है। आप अनुकूल, विविध और नई चीजें सीखने का आनंद लेते हैं।`,
      characteristics: `आप तीव्र-बुद्धिमान, बुद्धिमान और उत्कृष्ट स्मृति रखते हैं। आपके संचार कौशल असाधारण हैं। आप जिज्ञासु हैं और दुनिया के बारे में सीखना पसंद करते हैं। आपकी सामाजिक प्रकृति आपको नेटवर्किंग में उत्कृष्ट बनाती है।`,
      strengths: `संचार, बुद्धि, अनुकूलता, जिज्ञासा, बहुमुखिता, सामाजिक कौशल`,
      challenges: `असंगतता, सतहीपन, घबराहट, बेचैनी, अनिश्चितता`,
      career: `पत्रकारिता, लेखन, शिक्षण, बिक्री या व्यापार में।`,
      love: `मानसिक संबंध और बौद्धिक उत्तेजना की तलाश में।`
    },
    'Cancer': {
      hindi_name: 'कर्क',
      symbol: '♋',
      element: 'जल',
      ruling_planet: 'चंद्र',
      description: `कर्क राशि भावनाओं, अंतर्ज्ञान और घर का प्रतीक है। आप गहराई से भावुक, अंतर्ज्ञानी और पोषण देने वाले हैं। आपका शासक ग्रह चंद्र आपको मजबूत भावनात्मक बुद्धिमत्ता देता है। आप परिवार और घर से दृढ़ता से जुड़े हैं।`,
      characteristics: `आप अत्यधिक भावुक, अंतर्ज्ञानी और उत्कृष्ट सहानुभूति क्षमता रखते हैं। आपकी पोषण करने की प्रकृति आपको एक उत्कृष्ट देखभालकर्ता बनाती है। आप कल्पनाशील, रचनात्मक और मजबूत कलात्मक प्रतिभा रखते हैं।`,
      strengths: `भावनात्मक बुद्धिमत्ता, अंतर्ज्ञान, पोषण, रचनात्मकता, वफादारी, सहानुभूति`,
      challenges: `मूड स्विंग्स, अत्यधिक संवेदनशीलता, आसक्ति, निराशावाद`,
      career: `परामर्श, स्वास्थ्यसेवा, आतिथ्य, कला, बाल देखभाल में।`,
      love: `गहरा भावनात्मक संबंध और सुरक्षा चाहते हैं।`
    },
    'Leo': {
      hindi_name: 'सिंह',
      symbol: '♌',
      element: 'अग्नि',
      ruling_planet: 'सूर्य',
      description: `सिंह राशि रचनात्मकता, आत्मविश्वास और आत्म-अभिव्यक्ति का प्रतीक है। आप स्वभाव से करिश्माई, आत्मविश्वासी और मजबूत रचनात्मक क्षमता रखते हैं। आपका शासक ग्रह सूर्य आपको एक चमकदार व्यक्तित्व देता है। आपके पास प्राकृतिक नेतृत्व गुण हैं।`,
      characteristics: `आप आत्मविश्वासी, करिश्माई और मजबूत रचनात्मक प्रतिभा रखते हैं। आपकी नेतृत्व क्षमता आपको अधिकार की स्थिति में उत्कृष्ट बनाती है। आप उदार, दयालु और उन लोगों को मदद करना पसंद करते हैं जो आप प्यार करते हैं।`,
      strengths: `रचनात्मकता, आत्मविश्वास, नेतृत्व, उदारता, करिष्मा, आत्म-अभिव्यक्ति`,
      challenges: `अहंकार, घमंड, ध्यान की आवश्यकता, जिद्दीपन, अहंवाद`,
      career: `मनोरंजन, कला, प्रबंधन, शिक्षा या राजनीति में।`,
      love: `भावुक, समर्पित, और अपने साथी से प्रशंसा चाहते हैं।`
    },
    'Virgo': {
      hindi_name: 'कन्या',
      symbol: '♍',
      element: 'पृथ्वी',
      ruling_planet: 'बुध',
      description: `कन्या राशि सेवा, विश्लेषण और पूर्णतावाद का प्रतीक है। आप विस्तार-केंद्रित, विश्लेषणात्मक और उत्कृष्ट संगठनात्मक कौशल रखते हैं। आपका शासक ग्रह बुध आपको बुद्धिमान और समस्या समाधान कौशल देता है। आप दूसरों की मदद करने की प्रबल इच्छा रखते हैं।`,
      characteristics: `आप बुद्धिमान, विश्लेषणात्मक और उत्कृष्ट संगठनात्मक कौशल रखते हैं। आपका विस्तार पर ध्यान सभी आपके काम में गुणवत्ता सुनिश्चित करता है। आप सेवा की मजबूत भावना रखते हैं और दूसरों की मदद करना पसंद करते हैं।`,
      strengths: `विश्लेषण, संगठन, विस्तार पर ध्यान, सेवा, दक्षता, व्यावहारिकता`,
      challenges: `पूर्णतावाद, आलोचना, चिंता, अधिक सोचना, आलोचनात्मक प्रकृति`,
      career: `स्वास्थ्यसेवा, शिक्षा, अनुसंधान, लेखन, लेखांकन में।`,
      love: `बौद्धिक संबंध और स्थिरता पसंद करते हैं।`
    },
    'Libra': {
      hindi_name: 'तुला',
      symbol: '♎',
      element: 'वायु',
      ruling_planet: 'शुक्र',
      description: `तुला राशि संतुलन, सद्भावना और न्याय का प्रतीक है। आप स्वभाव से राजनयिक, निष्पक्ष और मजबूत सौंदर्य संवेदनशीलता रखते हैं। आपका शासक ग्रह शुक्र आपको कला, सुंदरता और सामंजस्यपूर्ण संबंधों के लिए प्रशंसा देता है। आपके पास कई दृष्टिकोण देखने की उत्कृष्ट क्षमता है।`,
      characteristics: `आप राजनयिक, निष्पक्ष और उत्कृष्ट सामाजिक कौशल रखते हैं। आपकी सौंदर्य समझ परिष्कृत है और आप सभी रूपों में सुंदरता की सराहना करते हैं। आप आकर्षक, सुंदर और सामंजस्यपूर्ण वातावरण बनाने में उत्कृष्ट हैं।`,
      strengths: `राजनय, संतुलन, न्याय, आकर्षण, सामाजिक कौशल, सौंदर्य, निष्पक्षता`,
      challenges: `अनिश्चितता, लोगों को खुश करने की इच्छा, द्वंद्व से बचना, सतहीपन`,
      career: `कानून, राजनय, कला, डिजाइन, परामर्श में।`,
      love: `संतुलन और सामंजस्य चाहते हैं।`
    },
    'Scorpio': {
      hindi_name: 'वृश्चिक',
      symbol: '♏',
      element: 'जल',
      ruling_planet: 'मंगल',
      description: `वृश्चिक राशि तीव्रता, रूपांतरण और शक्ति का प्रतीक है। आप गहरे रहस्यमय, तीव्र और मजबूत भावनात्मक गहराई रखते हैं। आपका शासक ग्रह मंगल आपको निर्धारता और शक्ति देता है। आपके पास सतह के नीचे देखने की उत्कृष्ट क्षमता है।`,
      characteristics: `आप तीव्र, रहस्यमय और मजबूत भावनात्मक गहराई रखते हैं। आपका निर्धारता और इच्छाशक्ति असाधारण है। आप जटिल स्थितियों को समझने और छिपी सच्चाई को उजागर करने में उत्कृष्ट हैं।`,
      strengths: `तीव्रता, निर्धारता, शक्ति, वफादारी, जुनून, अंतर्दृष्टि, रूपांतरण`,
      challenges: `ईर्ष्या, कब्जापरस्ती, रहस्यपन, प्रतिशोधी, भावनात्मक तीव्रता`,
      career: `अनुसंधान, मनोविज्ञान, जांच, वित्त, परिवर्तन कार्य में।`,
      love: `गहरा जुनून, वफादारी, और विश्वास चाहते हैं।`
    },
    'Sagittarius': {
      hindi_name: 'धनु',
      symbol: '♐',
      element: 'अग्नि',
      ruling_planet: 'बृहस्पति',
      description: `धनु राशि रोमांच, ज्ञान और विस्तार का प्रतीक है। आप स्वभाव से आशावादी, रोमांचप्रिय और ज्ञान की गहरी इच्छा रखते हैं। आपका शासक ग्रह बृहस्पति आपको व्यापक दृष्टिकोण और असाधारण भाग्य देता है। आप नए क्षितिज का अन्वेषण करने के लिए प्रेरित हैं।`,
      characteristics: `आप आशावादी, रोमांचप्रिय और ज्ञान की गहरी इच्छा रखते हैं। आपकी दार्शनिक प्रकृति आपको गहरे अर्थ खोजने के लिए प्रेरित करती है। आप ईमानदार, सीधे बोलने वाले और दूसरों को प्रेरित करते हैं।`,
      strengths: `आशावाद, रोमांच, ज्ञान, विस्तार, भाग्य, ईमानदारी, उत्साह`,
      challenges: `सीधापन, अति-प्रतिबद्धता, असावधानी, अधैर्य`,
      career: `शिक्षण, यात्रा, प्रकाशन, दर्शन, खेल में।`,
      love: `स्वतंत्रता और रोमांच चाहते हैं।`
    },
    'Capricorn': {
      hindi_name: 'मकर',
      symbol: '♑',
      element: 'पृथ्वी',
      ruling_planet: 'शनि',
      description: `मकर राशि महत्वाकांक्षा, अनुशासन और सफलता का प्रतीक है। आप स्वभाव से महत्वाकांक्षी, अनुशासित और मजबूत संगठनात्मक कौशल रखते हैं। आपका शासक ग्रह शनि आपको ज्ञान, धैर्य और दीर्घकालीन दृष्टि देता है। आप अपने लक्ष्य प्राप्त करने के लिए प्रतिबद्ध हैं।`,
      characteristics: `आप महत्वाकांक्षी, अनुशासित और उत्कृष्ट प्रबंधन कौशल रखते हैं। आपका व्यावहारिक दृष्टिकोण आपकी उद्यमों में सफलता सुनिश्चित करता है। आप जिम्मेदार, विश्वसनीय और अपने लक्ष्यों के लिए कड़ी मेहनत करने के लिए तैयार हैं।`,
      strengths: `महत्वाकांक्षा, अनुशासन, जिम्मेदारी, व्यावहारिकता, धैर्य, सफलता-उन्मुख`,
      challenges: `निराशावाद, भावनात्मक शीतलता, अधिक गंभीर, कठोर, कार्यहॉलिक प्रवृत्ति`,
      career: `प्रबंधन, सरकार, व्यापार, कानून, इंजीनियरिंग में।`,
      love: `स्थिरता और प्रतिबद्धता चाहते हैं।`
    },
    'Aquarius': {
      hindi_name: 'कुंभ',
      symbol: '♒',
      element: 'वायु',
      ruling_planet: 'शनि',
      description: `कुंभ राशि नवाचार, स्वतंत्रता और मानवतावाद का प्रतीक है। आप स्वभाव से प्रगतिशील, नवीन और मजबूत स्वतंत्रता की इच्छा रखते हैं। आपका शासक ग्रह शनि आपको अनुशासन और दीर्घकालीन दृष्टि देता है। आपके पास समाज को बेहतर बनाने की गहरी इच्छा है।`,
      characteristics: `आप स्वतंत्र, नवीन और नई विचारधारा और प्रौद्योगिकी की तलाश में हैं। आपकी बौद्धिक प्रकृति आपको नई समस्याएं खोजने के लिए प्रेरित करती है। आप अपरंपरागत और अपने व्यक्तित्व को व्यक्त करने से डरते नहीं हैं।`,
      strengths: `नवाचार, स्वतंत्रता, मानवतावाद, बौद्धिक क्षमता, प्रगतिशीलता, अनन्यता`,
      challenges: `भावनात्मक दूरी, जिद्दीपन, अप्रत्याशितता, अलगाववाद`,
      career: `प्रौद्योगिकी, विज्ञान, मानवीय कार्य, नवाचार में।`,
      love: `बौद्धिक संबंध और स्वतंत्रता चाहते हैं।`
    },
    'Pisces': {
      hindi_name: 'मीन',
      symbol: '♓',
      element: 'जल',
      ruling_planet: 'बृहस्पति',
      description: `मीन राशि करुणा, रचनात्मकता और आध्यात्मिकता का प्रतीक है। आप स्वभाव से करुणामय, रचनात्मक और गहरी आध्यात्मिक जुड़ाव रखते हैं। आपका शासक ग्रह बृहस्पति आपको आशावाद और व्यापक दृष्टिकोण देता है। आपके पास मजबूत अंतर्ज्ञान और मनोविज्ञान क्षमता है।`,
      characteristics: `आप करुणामय, सहानुभूतिपूर्ण और उत्कृष्ट अंतर्ज्ञान क्षमता रखते हैं। आपकी रचनात्मकता स्वाभाविक रूप से प्रवाहित होती है। आप आध्यात्मिक अर्थ खोजते हैं और दूसरों को मदद करने के लिए समर्पित हैं।`,
      strengths: `करुणा, रचनात्मकता, आध्यात्मिकता, अंतर्ज्ञान, कल्पना, सहानुभूति, कलात्मक क्षमता`,
      challenges: `भागना, आदर्शवाद, आसान विश्वास, अत्यधिक संवेदनशील, शिकार मानसिकता`,
      career: `कला, संगीत, चिकित्सा व्यवसाय, आध्यात्मिकता, परामर्श में।`,
      love: `गहरा आध्यात्मिक संबंध चाहते हैं।`
    }
  };

  const calculateKundli = () => {
    if (!formData.name || !formData.dateOfBirth || !formData.timeOfBirth || !formData.placeOfBirth) {
      alert('कृपया सभी आवश्यक फील्ड भरें');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const [year, month, day] = formData.dateOfBirth.split('-');
      const [hours, minutes] = formData.timeOfBirth.split(':');

      const monthDay = parseInt(month + ('0' + day).slice(-2));
      let sunSign = '';

      if (monthDay >= 321 && monthDay <= 419) sunSign = 'Aries';
      else if (monthDay >= 420 && monthDay <= 520) sunSign = 'Taurus';
      else if (monthDay >= 521 && monthDay <= 620) sunSign = 'Gemini';
      else if (monthDay >= 621 && monthDay <= 722) sunSign = 'Cancer';
      else if (monthDay >= 723 && monthDay <= 822) sunSign = 'Leo';
      else if (monthDay >= 823 && monthDay <= 922) sunSign = 'Virgo';
      else if (monthDay >= 923 && monthDay <= 1022) sunSign = 'Libra';
      else if (monthDay >= 1023 && monthDay <= 1121) sunSign = 'Scorpio';
      else if (monthDay >= 1122 && monthDay <= 1221) sunSign = 'Sagittarius';
      else if (monthDay >= 1222 || monthDay <= 119) sunSign = 'Capricorn';
      else if (monthDay >= 120 && monthDay <= 218) sunSign = 'Aquarius';
      else sunSign = 'Pisces';

      const allSigns = Object.keys(zodiacDetailsHindi);
      const sunSignData = zodiacDetailsHindi[sunSign];
      const ascendantIndex = Math.floor((parseInt(hours) / 24) * 12) % allSigns.length;
      const ascendant = zodiacDetailsHindi[allSigns[ascendantIndex]];
      const moonIndex = Math.floor((parseInt(day) / 31) * 12) % allSigns.length;
      const moon = zodiacDetailsHindi[allSigns[moonIndex]];

      setResult({
        name: formData.name,
        birthPlace: formData.placeOfBirth,
        birthDate: formData.dateOfBirth,
        birthTime: formData.timeOfBirth,
        sunSign: { name: sunSign, ...sunSignData },
        moon: { name: allSigns[moonIndex], ...moon },
        ascendant: { name: allSigns[ascendantIndex], ...ascendant }
      });

      setLoading(false);
    }, 1500);
  };

  const reset = () => {
    setFormData({
      name: '',
      dateOfBirth: '',
      timeOfBirth: '',
      placeOfBirth: '',
      email: '',
      phone: ''
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="कुंडली - जन्म पत्रिका - Happy Kismat"
        description="अपनी निःशुल्क कुंडली (जन्म पत्रिका) बनाएं और संपूर्ण ग्रह विश्लेषण प्राप्त करें"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/free-kundli-tools" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            मुक्त उपकरणों पर वापस जाएं
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">📊 निःशुल्क कुंडली जनरेटर</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              अपनी संपूर्ण जन्म पत्रिका विश्लेषण प्राप्त करें विस्तृत राशि विवरण और ज्योतिषीय अंतर्दृष्टि के साथ।
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {!result ? (
            <Card className="p-8 border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">जन्म विवरण</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">पूरा नाम *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="अपना पूरा नाम दर्ज करें"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">जन्मतिथि *</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">जन्म समय (24h) *</label>
                    <input
                      type="time"
                      value={formData.timeOfBirth}
                      onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">जन्म स्थान *</label>
                    <input
                      type="text"
                      value={formData.placeOfBirth}
                      onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                      placeholder="शहर, देश"
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ईमेल</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="आपका ईमेल (वैकल्पिक)"
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">फोन</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="आपका फोन (वैकल्पिक)"
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <Button
                  onClick={calculateKundli}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
                >
                  {loading ? 'कुंडली जनरेट की जा रही है...' : 'निःशुल्क कुंडली जनरेट करें'}
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Detailed Sign Descriptions */}
              {[
                { title: '☀️ सूर्य राशि', data: result.sunSign, icon: 'सूर्य' },
                { title: '🌙 चंद्र राशि', data: result.moon, icon: 'चंद्र' },
                { title: '⬆️ लग्न', data: result.ascendant, icon: 'लग्न' }
              ].map((sign, idx) => (
                <Card key={idx} className="p-8 border-2 border-purple-200 bg-white">
                  <h3 className="text-2xl font-bold text-purple-900 mb-2">{sign.title} - {sign.data.hindi_name}</h3>
                  <p className="text-sm text-gray-600 mb-6">{sign.data.name}</p>

                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <div>
                      <h4 className="font-bold text-lg text-purple-900 mb-2">विवरण</h4>
                      <p>{sign.data.description}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg text-purple-900 mb-2">विशेषताएं</h4>
                      <p>{sign.data.characteristics}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-purple-900 mb-2">शक्तियां</h4>
                        <p className="text-sm">{sign.data.strengths}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-purple-900 mb-2">चुनौतियां</h4>
                        <p className="text-sm">{sign.data.challenges}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-purple-900 mb-2">💼 कैरियर और पेशा</h4>
                      <p className="text-sm">{sign.data.career}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-purple-900 mb-2">💕 प्रेम और संबंध</h4>
                      <p className="text-sm">{sign.data.love}</p>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Reset Button */}
              <Button
                onClick={reset}
                variant="outline"
                className="w-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50 py-3 font-semibold"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                दूसरी कुंडली जनरेट करें
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default KundliHindi;
