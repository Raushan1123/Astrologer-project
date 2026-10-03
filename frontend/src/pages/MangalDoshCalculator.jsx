import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const MangalDoshCalculator = () => {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    timeOfBirth: '',
    phone: '',
    email: '',
    gender: 'male'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateMangalDosh = () => {
    if (!formData.dateOfBirth || !formData.timeOfBirth) {
      alert('Please enter date and time of birth');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const [year, month, day] = formData.dateOfBirth.split('-');
      const [hours, minutes] = formData.timeOfBirth.split(':');

      // Zodiac sign from date
      const monthDay = parseInt(month + ('0' + day).slice(-2));
      let zodiacSign = '';
      let marsHouse = 0;

      // Determine zodiac and approximate Mars position
      if (monthDay >= 321 && monthDay <= 419) { zodiacSign = 'Aries'; marsHouse = 1; }
      else if (monthDay >= 420 && monthDay <= 520) { zodiacSign = 'Taurus'; marsHouse = 2; }
      else if (monthDay >= 521 && monthDay <= 620) { zodiacSign = 'Gemini'; marsHouse = 3; }
      else if (monthDay >= 621 && monthDay <= 722) { zodiacSign = 'Cancer'; marsHouse = 4; }
      else if (monthDay >= 723 && monthDay <= 822) { zodiacSign = 'Leo'; marsHouse = 5; }
      else if (monthDay >= 823 && monthDay <= 922) { zodiacSign = 'Virgo'; marsHouse = 6; }
      else if (monthDay >= 923 && monthDay <= 1022) { zodiacSign = 'Libra'; marsHouse = 7; }
      else if (monthDay >= 1023 && monthDay <= 1121) { zodiacSign = 'Scorpio'; marsHouse = 8; }
      else if (monthDay >= 1122 && monthDay <= 1221) { zodiacSign = 'Sagittarius'; marsHouse = 9; }
      else if (monthDay >= 1222 || monthDay <= 119) { zodiacSign = 'Capricorn'; marsHouse = 10; }
      else if (monthDay >= 120 && monthDay <= 218) { zodiacSign = 'Aquarius'; marsHouse = 11; }
      else { zodiacSign = 'Pisces'; marsHouse = 12; }

      // Determine Mangal Dosh based on Mars house and aspect
      // Mangal Dosh exists when Mars is in 1, 2, 4, 7, 8, 12 houses
      const doshHouses = [1, 2, 4, 7, 8, 12];
      const hasMangalDosh = doshHouses.includes(marsHouse);

      // Determine severity
      let severity = 'No Dosh';
      let severityLevel = 0;
      let impact = 'No impact on marriage';

      if (hasMangalDosh) {
        if ([7, 8].includes(marsHouse)) {
          severity = 'Severe Mangal Dosh';
          severityLevel = 3;
          impact = 'Significant delays or challenges in marriage. Remedies recommended.';
        } else if ([2, 4, 12].includes(marsHouse)) {
          severity = 'Moderate Mangal Dosh';
          severityLevel = 2;
          impact = 'Some challenges in marriage. Can be mitigated with remedies.';
        } else if (marsHouse === 1) {
          severity = 'Mild Mangal Dosh';
          severityLevel = 1;
          impact = 'Minimal impact. Manageable with understanding.';
        }
      }

      // Remedies based on severity
      const remedies = {
        0: ['No specific remedies needed'],
        1: [
          'Wear red coral (Moonga) on Tuesday',
          'Recite Hanuman Chalisa daily',
          'Perform Mangal Puja on Tuesdays'
        ],
        2: [
          'Donate red items (cloth, flowers) on Tuesdays',
          'Feed salt to animals',
          'Wear red threads on wrist',
          'Recite Mangal Mantra: "Om Angarakaya Namah"',
          'Perform Kumbh Vivah ritual (marriage with tree)'
        ],
        3: [
          'Perform Kumbh Vivah (marriage with banyan tree)',
          'Donate blood on Tuesdays',
          'Feed red lentils to cows',
          'Wear red coral stone',
          'Consult experienced astrologer for comprehensive remedies',
          'Perform Mangal Shanti Puja'
        ]
      };

      setResult({
        zodiacSign,
        marsHouse,
        hasMangalDosh,
        severity,
        severityLevel,
        impact,
        remedies: remedies[severityLevel],
        birthInfo: {
          date: formData.dateOfBirth,
          time: formData.timeOfBirth,
          gender: formData.gender
        }
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
      gender: 'male'
    });
    setResult(null);
  };

  const getSeverityColor = (level) => {
    if (level === 0) return 'from-green-500 to-emerald-500';
    if (level === 1) return 'from-yellow-500 to-amber-500';
    if (level === 2) return 'from-orange-500 to-red-400';
    return 'from-red-600 to-red-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Mangal Dosh Calculator - Happy Kismat"
        description="Check if you have Mangal Dosh (Mars defect) in your birth chart and understand its impact on marriage."
      />

      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/calculators" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Calculators
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">🔴 Mangal Dosh Calculator</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check if you have Mangal Dosh (Mars defect) in your birth chart and understand its implications for marriage.
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time of Birth *</label>
                  <input
                    type="time"
                    value={formData.timeOfBirth}
                    onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
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

                <div className="space-y-3">
                  <Button
                    onClick={calculateMangalDosh}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 text-lg font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Calculating...' : 'Check Mangal Dosh'}
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
              <div className="space-y-6">
                {/* Main Result */}
                <Card className={`p-8 border-2 bg-gradient-to-br from-opacity-50 to-opacity-50 ${result.severityLevel === 0 ? 'border-green-200' : 'border-red-200'}`}>
                  <div className={`bg-gradient-to-r ${getSeverityColor(result.severityLevel)} p-8 rounded-lg text-center text-white mb-6`}>
                    <p className="text-sm uppercase tracking-widest opacity-90 mb-2">Mangal Dosh Status</p>
                    <p className="text-3xl font-bold mb-2">{result.severity}</p>
                    <p className="text-lg">Mars in {result.zodiacSign}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-purple-200 mb-4">
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Impact on Marriage</p>
                    <p className="text-gray-700 leading-relaxed italic">"{result.impact}"</p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                    <p className="text-xs text-gray-600 uppercase mb-2">Mars House Position</p>
                    <p className="text-2xl font-bold text-purple-600">{result.marsHouse}</p>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Remedies */}
          {result && (
            <div className="max-w-4xl mx-auto mt-8">
              <Card className="p-8 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                <h3 className="text-2xl font-bold text-purple-900 mb-6">🧿 Recommended Remedies</h3>
                <div className="space-y-3">
                  {result.remedies.map((remedy, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-white rounded-lg border-l-4 border-amber-500">
                      <div className="text-2xl">✓</div>
                      <div>
                        <p className="text-gray-700 font-medium">{remedy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* What is Mangal Dosh */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">What is Mangal Dosh?</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-red-600">
              <p className="text-gray-700 leading-relaxed">
                Mangal Dosh (also spelled Manglik Dosha or Mars defect) occurs when the planet Mars is positioned in certain houses in a person's birth chart. It's one of the most discussed Dosh in Vedic astrology, particularly regarding marriage compatibility. Mangal represents aggression, passion, energy, and raw power—qualities that can create friction if not well-managed in relationships.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-orange-600">
              <h3 className="font-bold text-purple-900 mb-3">Mars (Mangal) in Vedic Astrology</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Represents:</strong> Courage, energy, passion, action, aggression, determination</p>
                <p><strong>Day:</strong> Tuesday</p>
                <p><strong>Color:</strong> Red</p>
                <p><strong>Element:</strong> Fire</p>
                <p><strong>Nature:</strong> Masculine, fiery, aggressive</p>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-yellow-600">
              <h3 className="font-bold text-purple-900 mb-3">Why Certain Houses Create Dosh</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>House 1 (Ascendant):</strong> Direct aggression affects personality</p>
                <p><strong>House 2 (Family):</strong> Creates friction in family matters</p>
                <p><strong>House 4 (Home/Mother):</strong> Affects home peace and maternal relationship</p>
                <p><strong>House 7 (Marriage):</strong> Most critical—affects spouse and marital harmony</p>
                <p><strong>House 8 (Longevity/Mystery):</strong> Creates deep disturbances</p>
                <p><strong>House 12 (Loss/Separation):</strong> Can lead to separation if not managed</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How Mangal Dosh Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">How Does Mangal Dosh Calculator Work?</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-900 mb-3">Calculation Process</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <strong>Step 1 - Birth Chart Creation:</strong>
                  <p>Uses your birth date, time, and location to calculate planetary positions</p>
                </div>
                <div>
                  <strong>Step 2 - Mars Position Determination:</strong>
                  <p>Identifies which zodiac sign and house Mars occupies in your birth chart</p>
                </div>
                <div>
                  <strong>Step 3 - Dosh Assessment:</strong>
                  <p>Checks if Mars is in any of the 6 critical houses (1, 2, 4, 7, 8, 12)</p>
                </div>
                <div>
                  <strong>Step 4 - Severity Evaluation:</strong>
                  <p>Determines severity level based on which specific house Mars occupies</p>
                </div>
                <div>
                  <strong>Step 5 - Remedy Suggestion:</strong>
                  <p>Provides specific remedies and solutions based on severity level</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-orange-300">
              <h3 className="font-bold text-purple-900 mb-3">Severity Levels Explained</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded border-l-4 border-green-500">
                  <p className="font-semibold text-green-700">✓ No Dosh</p>
                  <p className="text-sm text-gray-600 mt-1">Mars not in critical houses. No challenges related to Mangal Dosh.</p>
                </div>
                <div className="p-4 bg-white rounded border-l-4 border-yellow-500">
                  <p className="font-semibold text-yellow-700">⚠ Mild Mangal Dosh (House 1)</p>
                  <p className="text-sm text-gray-600 mt-1">Minor personality aggression. Manageable with awareness and communication.</p>
                </div>
                <div className="p-4 bg-white rounded border-l-4 border-orange-500">
                  <p className="font-semibold text-orange-700">⚠⚠ Moderate Mangal Dosh (Houses 2, 4, 12)</p>
                  <p className="text-sm text-gray-600 mt-1">Can create challenges. Remedies and awareness significantly help.</p>
                </div>
                <div className="p-4 bg-white rounded border-l-4 border-red-600">
                  <p className="font-semibold text-red-700">⚠⚠⚠ Severe Mangal Dosh (Houses 7, 8)</p>
                  <p className="text-sm text-gray-600 mt-1">Significant impact on marriage. Requires active remedies and professional guidance.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Understanding Mangal Dosh Effects */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Effects of Mangal Dosh</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-red-500">
              <h3 className="font-bold text-purple-900 mb-3">On Marriage & Relationships</h3>
              <ul className="space-y-2 text-gray-700">
                <li>🔴 Can create discord and misunderstandings between partners</li>
                <li>🔴 May cause delays in marriage</li>
                <li>🔴 Can lead to financial disputes</li>
                <li>🔴 Might create excessive aggression or domination</li>
                <li>🔴 Can affect compatibility if partner doesn't have Mangal Dosh</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-amber-500">
              <h3 className="font-bold text-purple-900 mb-3">Important: Mangal Dosh Cancellation</h3>
              <p className="text-gray-700 mb-4">
                Mangal Dosh may be nullified (cancelled) in several situations:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>✓ Own Sign:</strong> Mars in Aries or Scorpio (its own sign)</li>
                <li><strong>✓ Exalted:</strong> Mars in Capricorn (exalted position)</li>
                <li><strong>✓ Conjunction:</strong> Mars with benefic planets</li>
                <li><strong>✓ Aspect:</strong> Jupiter or Venus aspecting Mars beneficially</li>
                <li><strong>✓ Age Factor:</strong> For women over 25, Mangal Dosh effects may reduce</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-green-500">
              <h3 className="font-bold text-purple-900 mb-3">Myth vs Reality</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>❌ Myth:</strong> Mangal Dosh prevents marriage entirely</p>
                <p><strong>✓ Reality:</strong> It requires awareness and remedies; marriage is still possible</p>
              </div>
              <div className="space-y-3 text-gray-700 mt-4">
                <p><strong>❌ Myth:</strong> Only women with Mangal Dosh face marriage issues</p>
                <p><strong>✓ Reality:</strong> Men and women both experience similar effects</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-6 bg-amber-50 border-2 border-amber-200">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Important:</strong> This calculator provides basic Mangal Dosh analysis. For accurate assessment, consult a qualified astrologer who can examine your complete birth chart. Mangal Dosh does not prevent marriage but requires awareness and remedies.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default MangalDoshCalculator;
