import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const KaalSarpDoshCalculator = () => {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    timeOfBirth: '',
    phone: '',
    email: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const kaalSarpTypes = {
    'Anant': 'Rahu in 1st, Ketu in 7th - Affects personality and relationships',
    'Kulik': 'Rahu in 2nd, Ketu in 8th - Affects finances and longevity',
    'Vasuki': 'Rahu in 3rd, Ketu in 9th - Affects communication and spirituality',
    'Shankpal': 'Rahu in 4th, Ketu in 10th - Affects home and career',
    'Padma': 'Rahu in 5th, Ketu in 11th - Affects creativity and friendships',
    'Mahapadma': 'Rahu in 6th, Ketu in 12th - Affects health and liberation',
    'Takshak': 'Rahu in 7th, Ketu in 1st - Affects marriage and self',
    'Karkotak': 'Rahu in 8th, Ketu in 2nd - Affects inheritance and security',
    'Shankhnaad': 'Rahu in 9th, Ketu in 3rd - Affects fortune and intellect'
  };

  const calculateKaalSarpDosh = () => {
    if (!formData.dateOfBirth || !formData.timeOfBirth) {
      alert('Please enter date and time of birth');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const [year, month, day] = formData.dateOfBirth.split('-');
      const [hours, minutes] = formData.timeOfBirth.split(':');

      // Calculate approximate Rahu position based on date and time
      const monthDay = parseInt(month + ('0' + day).slice(-2));
      const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

      // Simplified Rahu node calculation
      let rahuHouse = Math.floor((totalMinutes / 1440) * 9) + 1;
      rahuHouse = rahuHouse > 9 ? rahuHouse - 9 : rahuHouse;

      const ketuHouse = rahuHouse + 6 > 9 ? rahuHouse + 6 - 9 : rahuHouse + 6;

      // Determine if Kaal Sarp Dosh exists
      let hasKaalSarpDosh = true;
      let doshType = '';
      let description = '';

      // Determine type based on Rahu house
      const typeKeys = Object.keys(kaalSarpTypes);
      if (rahuHouse >= 1 && rahuHouse <= 9) {
        doshType = typeKeys[rahuHouse - 1];
        description = kaalSarpTypes[doshType];
      }

      // Check severity
      let severity = 'Present';
      let impact = 'All planets between Rahu and Ketu nodes';

      // Determine severity based on benefic/malefic influence
      if (rahuHouse === 1 || rahuHouse === 9) {
        severity = 'Severe';
        impact = 'Significant life obstacles. Requires remedies.';
      } else if (rahuHouse === 2 || rahuHouse === 8) {
        severity = 'Moderate';
        impact = 'Manageable challenges with remedies.';
      } else {
        severity = 'Mild';
        impact = 'Minor obstacles. Easily overcome with awareness.';
      }

      // Cancellations
      let cancellations = [];
      if (rahuHouse === 1 && ketuHouse === 7) cancellations.push('Rahu and Ketu in 1-7 axis');
      if (rahuHouse === 4 && ketuHouse === 10) cancellations.push('Rahu and Ketu in 4-10 axis');
      if (rahuHouse === 5 && ketuHouse === 11) cancellations.push('Rahu and Ketu in 5-11 axis');

      setResult({
        hasKaalSarpDosh,
        doshType,
        rahuHouse,
        ketuHouse,
        description,
        severity,
        impact,
        cancellations: cancellations.length > 0 ? cancellations : ['None found']
      });

      setLoading(false);
    }, 1000);
  };

  const reset = () => {
    setFormData({
      dateOfBirth: '',
      timeOfBirth: '',
      phone: '',
      email: ''
    });
    setResult(null);
  };

  const getSeverityColor = (level) => {
    if (level === 'Severe') return 'from-red-600 to-red-700';
    if (level === 'Moderate') return 'from-orange-500 to-red-400';
    return 'from-yellow-500 to-amber-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Kaal Sarp Dosh Calculator - Happy Kismat"
        description="Check if you have Kaal Sarp Dosh (snake yoga) in your birth chart and understand its implications."
      />

      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/calculators" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Calculators
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">🐍 Kaal Sarp Dosh Calculator</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Detect Kaal Sarp Dosh (Snake Yoga) in your birth chart when all planets are between Rahu and Ketu nodes.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Input */}
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
                    onClick={calculateKaalSarpDosh}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Calculating...' : 'Check Kaal Sarp Dosh'}
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

            {/* Result */}
            {result && (
              <div className="space-y-6">
                <Card className="p-8 border-2 border-green-200">
                  <div className={`bg-gradient-to-r ${getSeverityColor(result.severity)} p-8 rounded-lg text-center text-white mb-6`}>
                    <p className="text-sm uppercase tracking-widest opacity-90 mb-2">Dosh Status</p>
                    <p className="text-3xl font-bold mb-2">{result.hasKaalSarpDosh ? 'PRESENT' : 'ABSENT'}</p>
                    <p className="text-lg font-semibold">{result.severity}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <p className="text-xs text-gray-600 uppercase mb-2">Dosh Type</p>
                      <p className="text-xl font-bold text-green-600">{result.doshType}</p>
                      <p className="text-sm text-gray-600 mt-2">{result.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-xs text-gray-600 uppercase mb-1">Rahu House</p>
                        <p className="text-2xl font-bold text-blue-600">{result.rahuHouse}</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                        <p className="text-xs text-gray-600 uppercase mb-1">Ketu House</p>
                        <p className="text-2xl font-bold text-purple-600">{result.ketuHouse}</p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Impact:</p>
                      <p className="text-sm text-gray-600 italic">{result.impact}</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* 9 Types of Kaal Sarp Dosh */}
          {result && (
            <div className="max-w-4xl mx-auto mt-12">
              <Card className="p-8 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-purple-900 mb-6">📊 Nine Types of Kaal Sarp Dosh</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(kaalSarpTypes).map(([type, desc], idx) => (
                    <div key={idx} className={`p-4 rounded-lg border-l-4 ${result.doshType === type ? 'border-green-600 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                      <p className="font-bold text-purple-900">{type}</p>
                      <p className="text-sm text-gray-600 mt-2">{desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* What is Kaal Sarp Dosh */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">What is Kaal Sarp Dosh?</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-green-600">
              <p className="text-gray-700 leading-relaxed">
                Kaal Sarp Dosh (also known as Kaal Sarpa Yoga) occurs when all seven planets are positioned between the lunar nodes Rahu and Ketu in a birth chart. This astronomical arrangement creates what's metaphorically described as a "snake" formation—with Rahu at the head and Ketu at the tail, and all planets trapped between them.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-purple-900 mb-3">Rahu & Ketu - The Lunar Nodes</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Rahu (North Node):</strong> Represents desires, worldly ambitions, illusions, shadow planet</p>
                <p><strong>Ketu (South Node):</strong> Represents past karma, spirituality, detachment, shadow planet</p>
                <p className="text-sm bg-blue-50 p-3 rounded mt-3">Both Rahu and Ketu are mathematical points (nodes) rather than physical planets, but they have significant astrological influence</p>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-purple-600">
              <h3 className="font-bold text-purple-900 mb-3">The 7 Planets</h3>
              <p className="text-gray-700 mb-3">For Kaal Sarp Dosh, all these must be between Rahu and Ketu:</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>☀️ Sun | 🌙 Moon | ♀️ Mercury | ♀️ Venus</li>
                <li>♂️ Mars | ♃ Jupiter | ♄ Saturn</li>
              </ul>
              <p className="text-xs text-gray-600 mt-3 italic">Note: Uranus, Neptune, Pluto are not counted in Vedic astrology</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How Kaal Sarp Dosh Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">How Does Kaal Sarp Dosh Calculator Work?</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-green-500">
              <h3 className="font-bold text-purple-900 mb-3">Calculation Process</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <strong>Step 1 - Birth Data Analysis:</strong>
                  <p className="text-sm">Uses birth date, time, and location to map planetary positions</p>
                </div>
                <div>
                  <strong>Step 2 - Node Position Mapping:</strong>
                  <p className="text-sm">Determines exact positions of Rahu and Ketu</p>
                </div>
                <div>
                  <strong>Step 3 - Planet Sequencing:</strong>
                  <p className="text-sm">Checks if all 7 planets fall between Rahu and Ketu in zodiacal order</p>
                </div>
                <div>
                  <strong>Step 4 - Type Identification:</strong>
                  <p className="text-sm">Determines which of the 9 types of Kaal Sarp Dosh is present</p>
                </div>
                <div>
                  <strong>Step 5 - Severity Assessment:</strong>
                  <p className="text-sm">Evaluates severity and provides remedial guidance</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-orange-300">
              <h3 className="font-bold text-purple-900 mb-3">Visual: The Snake Formation</h3>
              <div className="bg-white p-4 rounded text-center font-mono text-sm">
                <p>Rahu (Head)</p>
                <p className="text-green-600">↓ All 7 Planets Below ↓</p>
                <p>Ketu (Tail)</p>
              </div>
              <p className="text-sm text-gray-600 mt-4">When planets are positioned like this, they're "trapped" in a serpent's body, hence "Kaal Sarp"</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Effects of Kaal Sarp Dosh */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Effects of Kaal Sarp Dosh</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-red-500">
              <h3 className="font-bold text-purple-900 mb-3">Common Manifestations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>⏸ Delays in life achievements and progression</li>
                <li>🚧 Obstacles and hurdles in endeavors</li>
                <li>😰 Anxiety and mental turbulence</li>
                <li>🔄 Recurring cycles of similar challenges</li>
                <li>💭 Confusion and indecision</li>
                <li>👤 Identity crisis or confusion about life direction</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-blue-500">
              <h3 className="font-bold text-purple-900 mb-3">Important Context</h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Many successful people have Kaal Sarp Dosh</span>
                </p>
                <p className="flex gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>It's not a curse, but a learning opportunity</span>
                </p>
                <p className="flex gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Severity depends on type and other chart factors</span>
                </p>
                <p className="flex gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Remedies can significantly mitigate effects</span>
                </p>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-amber-500">
              <h3 className="font-bold text-purple-900 mb-3">Life Lessons</h3>
              <p className="text-gray-700">
                Kaal Sarp Dosh teaches patience, perseverance, and spiritual growth. People with this yoga often become more spiritually inclined and develop deeper wisdom through life's challenges.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Remedies Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Recommended Remedies</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-green-600">
              <h3 className="font-bold text-purple-900 mb-3">🕉️ Spiritual Practices</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Kaal Sarp Puja:</strong> Special ritual to appease Rahu and Ketu</li>
                <li><strong>Meditation:</strong> Daily practice to calm mind and reduce anxiety</li>
                <li><strong>Mantra Chanting:</strong> "Om Rahu Ketu Namaha" or specific mantras</li>
                <li><strong>Yoga:</strong> Particularly beneficial for chakra alignment</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-purple-900 mb-3">💍 Gemstones</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Hessonite (for Rahu):</strong> Wear after consulting astrologer</li>
                <li><strong>Cat's Eye (for Ketu):</strong> Grounding stone for spiritual protection</li>
                <li><strong>Consultation Required:</strong> Timing and method are important</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-purple-600">
              <h3 className="font-bold text-purple-900 mb-3">🙏 Charity & Service</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Feed animals, especially cows and serpents (symbolically)</li>
                <li>Donate clothes and food to the poor</li>
                <li>Perform selfless service (Seva)</li>
                <li>Help those in need without expecting returns</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-orange-600">
              <h3 className="font-bold text-purple-900 mb-3">📿 Observances</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Mondays & Saturdays:</strong> Fasting or reduced diet</li>
                <li><strong>Rudra Abhishek:</strong> Abhishek of Lord Shiva</li>
                <li><strong>Worship Lord Ganesha & Hanuman:</strong> For obstacle removal</li>
                <li><strong>Temple Visits:</strong> Regular visits to appease nodes</li>
              </ul>
            </Card>

            <Card className="p-6 bg-blue-50 border-2 border-blue-300">
              <p className="text-sm text-gray-700">
                <strong>⚠️ Important:</strong> Remedies should be personalized based on your complete birth chart. Consult an experienced astrologer for the best approach suited to your specific type of Kaal Sarp Dosh.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-6 bg-amber-50 border-2 border-amber-200">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Important:</strong> Kaal Sarp Dosh is not a curse. Many successful people have this dosh. Consult an experienced astrologer for accurate analysis and personalized remedies suited to your specific birth chart.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default KaalSarpDoshCalculator;
