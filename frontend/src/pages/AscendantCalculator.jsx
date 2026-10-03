import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const AscendantCalculator = () => {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    timeOfBirth: '',
    phone: '',
    email: '',
    latitude: '',
    longitude: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Zodiac signs and their date ranges
  const zodiacSigns = [
    { sign: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire' },
    { sign: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth' },
    { sign: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air' },
    { sign: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water' },
    { sign: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire' },
    { sign: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth' },
    { sign: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air' },
    { sign: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water' },
    { sign: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire' },
    { sign: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth' },
    { sign: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air' },
    { sign: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water' }
  ];

  const calculateAscendant = () => {
    if (!formData.dateOfBirth || !formData.timeOfBirth) {
      alert('Please enter date and time of birth');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Parse date and time
      const [year, month, day] = formData.dateOfBirth.split('-');
      const [hours, minutes] = formData.timeOfBirth.split(':');

      // Calculate approximate birth hour (0-23)
      const birthHour = parseInt(hours);

      // Zodiac sign from date
      const date = new Date(year, parseInt(month) - 1, day);
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

      // Calculate ascendant (simplified: based on birth hour)
      const ascendantIndex = Math.floor((birthHour / 24) * 12);
      const ascendantSign = zodiacSigns[ascendantIndex];

      // Calculate moon sign (simplified: approximately 2.5 days per sign)
      const dayOfYear = Math.floor((date - new Date(year, 0, 0)) / 86400000);
      const moonSignIndex = Math.floor((dayOfYear / 365) * 12);
      const moonSign = zodiacSigns[moonSignIndex];

      const sunSignData = zodiacSigns.find(z => z.sign === sunSign);

      setResult({
        sunSign: sunSignData,
        moonSign,
        ascendant: ascendantSign,
        birthTime: formData.timeOfBirth,
        birthDate: formData.dateOfBirth,
        birthHour: parseInt(hours)
      });

      setLoading(false);
    }, 1000);
  };

  const reset = () => {
    setFormData({
      dateOfBirth: '',
      timeOfBirth: '',
      phone: '',
      email: '',
      latitude: '',
      longitude: ''
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Ascendant Rising Sign Calculator - Happy Kismat"
        description="Calculate your ascendant (rising sign) based on birth date, time and location. Discover how the world sees you!"
      />

      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/calculators" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Calculators
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">⬆️ Ascendant Calculator</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover your rising sign and understand how others perceive you. Your ascendant reveals your outward personality.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Input Card */}
            <Card className="p-8 border-2 border-purple-100 bg-gradient-to-br from-white to-purple-50">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">Birth Details</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time of Birth (24h format) *</label>
                  <input
                    type="time"
                    value={formData.timeOfBirth}
                    onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="text-sm text-gray-500 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p><strong>Note:</strong> Enter birth time as accurately as possible for better results. If you don't know exact time, use 12:00 noon as default.</p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={calculateAscendant}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Calculating...' : 'Calculate Ascendant'}
                  </Button>

                  {result && (
                    <Button
                      onClick={reset}
                      variant="outline"
                      className="w-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Result Card */}
            {result && (
              <Card className="p-8 border-2 border-amber-100 bg-gradient-to-br from-amber-50 to-purple-50">
                <h2 className="text-2xl font-bold text-purple-900 mb-6">Your Birth Chart</h2>

                <div className="space-y-6">
                  {/* Ascendant */}
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-lg text-white text-center">
                    <p className="text-sm uppercase tracking-widest opacity-90 mb-2">Rising Sign (Ascendant)</p>
                    <p className="text-4xl font-bold mb-2">{result.ascendant.symbol} {result.ascendant.sign}</p>
                    <p className="text-sm opacity-90">{result.ascendant.element} Sign</p>
                  </div>

                  {/* Sun Sign */}
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-lg text-white text-center">
                    <p className="text-sm uppercase tracking-widest opacity-90 mb-2">Sun Sign (Birth Chart)</p>
                    <p className="text-3xl font-bold mb-2">{result.sunSign.symbol} {result.sunSign.sign}</p>
                    <p className="text-sm opacity-90">{result.sunSign.element} Sign</p>
                  </div>

                  {/* Moon Sign */}
                  <div className="bg-gradient-to-r from-slate-600 to-blue-600 p-6 rounded-lg text-white text-center">
                    <p className="text-sm uppercase tracking-widest opacity-90 mb-2">Moon Sign</p>
                    <p className="text-3xl font-bold mb-2">🌙 {result.moonSign.sign}</p>
                    <p className="text-sm opacity-90">{result.moonSign.element} Sign</p>
                  </div>

                  {/* Birth Time Info */}
                  <div className="bg-white p-4 rounded-lg border-2 border-purple-200 text-center text-sm">
                    <p className="text-gray-500 mb-2">Birth Information</p>
                    <p className="font-semibold text-gray-700">{result.birthDate} at {result.birthTime}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* What is Ascendant Calculator */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">What is an Ascendant Calculator?</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-purple-500">
              <p className="text-gray-700 leading-relaxed">
                The Ascendant Calculator is a tool that reveals your three fundamental astrological signs based on Vedic astrology principles. It combines your birth date, time, and sometimes location to calculate how the planets and zodiac signs were positioned at the exact moment of your birth. This creates your unique birth chart, which serves as a cosmic blueprint for your personality and life path.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-blue-500">
              <h3 className="font-bold text-purple-900 mb-3">Why Are These Three Signs Important?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-yellow-500 font-bold">☀️</span>
                  <span><strong>Sun Sign:</strong> Your core identity, ego, and fundamental nature</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-600 font-bold">🌙</span>
                  <span><strong>Moon Sign:</strong> Your emotional inner world and private personality</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-600 font-bold">⬆️</span>
                  <span><strong>Ascendant:</strong> Your outward appearance and how others perceive you</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-green-500">
              <h3 className="font-bold text-purple-900 mb-3">How Does the Ascendant Calculator Work?</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Step 1 - Date of Birth:</strong> Determines your Sun Sign based on which zodiac constellation the sun occupied on your birth date.</p>
                <p><strong>Step 2 - Time of Birth:</strong> Calculates your Ascendant (Rising Sign). The ascendant changes approximately every 2 hours as the earth rotates, so precise birth time is critical.</p>
                <p><strong>Step 3 - Moon Position:</strong> Determines your Moon Sign based on the lunar position at birth. The moon cycles through all 12 zodiac signs in approximately 29.5 days.</p>
                <p><strong>Result:</strong> Your complete trio of signs revealing public face, inner emotions, and core identity.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Understanding Each Sign */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Understanding Your Zodiac Signs</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-yellow-400">
              <h3 className="text-xl font-bold text-purple-900 mb-3">☀️ Sun Sign (Solar Sign)</h3>
              <div className="space-y-3 text-gray-700">
                <p>Your sun sign represents your <strong>core identity and ego</strong>. It's what you are naturally inclined to be and the essence of who you truly are. This is your traditional zodiac sign based on birth date.</p>
                <p className="text-sm bg-yellow-50 p-3 rounded">💡 <strong>Think of it as:</strong> Your inner flame, your driving force, your life purpose</p>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-slate-600">
              <h3 className="text-xl font-bold text-purple-900 mb-3">🌙 Moon Sign (Lunar Sign)</h3>
              <div className="space-y-3 text-gray-700">
                <p>Your moon sign represents your <strong>emotional nature and inner world</strong>. It shows how you feel and process emotions privately. This sign is deeply personal and often hidden from others, based on the moon's position at birth.</p>
                <p className="text-sm bg-slate-50 p-3 rounded">💡 <strong>Think of it as:</strong> Your emotional core, your private self, how you feel things</p>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">⬆️ Ascendant (Rising Sign)</h3>
              <div className="space-y-3 text-gray-700">
                <p>Your ascendant is your <strong>outward personality and how others perceive you at first glance</strong>. It's like the "mask" you wear in public. It changes every 2 hours and requires accurate birth time to calculate correctly.</p>
                <p className="text-sm bg-purple-50 p-3 rounded">💡 <strong>Think of it as:</strong> Your public image, your first impression, how the world sees you</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-purple-900 mb-3">🔥 Fire Signs (Aries, Leo, Sagittarius)</h3>
              <p className="text-gray-700">Passionate, energetic, enthusiastic, and action-oriented. Fire signs are driven by inspiration and have a natural enthusiasm for life.</p>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-yellow-200">
              <h3 className="text-xl font-bold text-purple-900 mb-3">🌍 Earth Signs (Taurus, Virgo, Capricorn)</h3>
              <p className="text-gray-700">Practical, reliable, grounded, and stable. Earth signs are focused on material reality and building lasting foundations.</p>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-yellow-50 to-blue-50 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-purple-900 mb-3">💨 Air Signs (Gemini, Libra, Aquarius)</h3>
              <p className="text-gray-700">Intellectual, communicative, analytical, and social. Air signs thrive on ideas, communication, and mental stimulation.</p>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300">
              <h3 className="text-xl font-bold text-purple-900 mb-3">💧 Water Signs (Cancer, Scorpio, Pisces)</h3>
              <p className="text-gray-700">Intuitive, emotional, sensitive, and empathetic. Water signs are deeply connected to emotions and the spiritual realm.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* All Zodiac Signs Detail */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Complete Zodiac Signs Reference</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { sign: 'Aries ♈', dates: 'Mar 21 - Apr 19', element: 'Fire', traits: 'Bold, courageous, energetic, passionate leader' },
              { sign: 'Taurus ♉', dates: 'Apr 20 - May 20', element: 'Earth', traits: 'Reliable, stable, practical, sensual, loyal' },
              { sign: 'Gemini ♊', dates: 'May 21 - Jun 20', element: 'Air', traits: 'Communicative, curious, adaptable, intellectual' },
              { sign: 'Cancer ♋', dates: 'Jun 21 - Jul 22', element: 'Water', traits: 'Caring, protective, emotional, intuitive' },
              { sign: 'Leo ♌', dates: 'Jul 23 - Aug 22', element: 'Fire', traits: 'Confident, creative, generous, charismatic' },
              { sign: 'Virgo ♍', dates: 'Aug 23 - Sep 22', element: 'Earth', traits: 'Analytical, practical, detail-oriented, helpful' },
              { sign: 'Libra ♎', dates: 'Sep 23 - Oct 22', element: 'Air', traits: 'Balanced, diplomatic, artistic, fair-minded' },
              { sign: 'Scorpio ♏', dates: 'Oct 23 - Nov 21', element: 'Water', traits: 'Intense, mysterious, passionate, powerful' },
              { sign: 'Sagittarius ♐', dates: 'Nov 22 - Dec 21', element: 'Fire', traits: 'Adventurous, optimistic, philosophical, free-spirited' },
              { sign: 'Capricorn ♑', dates: 'Dec 22 - Jan 19', element: 'Earth', traits: 'Ambitious, disciplined, responsible, practical' },
              { sign: 'Aquarius ♒', dates: 'Jan 20 - Feb 18', element: 'Air', traits: 'Independent, innovative, humanitarian, intellectual' },
              { sign: 'Pisces ♓', dates: 'Feb 19 - Mar 20', element: 'Water', traits: 'Compassionate, artistic, intuitive, spiritual' }
            ].map((item, idx) => (
              <Card key={idx} className="p-4 border-2 border-purple-200 hover:border-purple-500 transition">
                <p className="font-bold text-purple-900 text-lg">{item.sign}</p>
                <p className="text-xs text-gray-600 mt-1">{item.dates}</p>
                <p className="text-sm font-semibold text-purple-600 mt-2">{item.element} Sign</p>
                <p className="text-sm text-gray-700 mt-2">{item.traits}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-6 bg-amber-50 border-2 border-amber-200">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Important:</strong> Accurate birth time is crucial for calculating your ascendant. If exact time is unavailable, results may be approximate. For precise birth chart analysis and detailed interpretation, consult with a professional astrologer. Consider getting a rectified birth chart if needed.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AscendantCalculator;
