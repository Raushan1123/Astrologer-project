import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const MoonPhaseCalculator = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);

  // Known new moon date (Jan 29, 2025)
  const KNOWN_NEW_MOON = new Date('2025-01-29');
  const LUNAR_CYCLE = 29.53; // days

  const calculateMoonPhase = (date) => {
    const inputDate = new Date(date);
    const daysSinceNewMoon = (inputDate - KNOWN_NEW_MOON) / (1000 * 60 * 60 * 24);
    const daysInCycle = daysSinceNewMoon % LUNAR_CYCLE;
    const illumination = Math.round((daysInCycle / LUNAR_CYCLE) * 100);

    let phase = '';
    let emoji = '';
    let meaning = '';

    if (daysInCycle < 1.84) {
      phase = 'New Moon';
      emoji = '🌑';
      meaning = 'New beginnings, introspection, rest period';
    } else if (daysInCycle < 7.38) {
      phase = 'Waxing Crescent';
      emoji = '🌒';
      meaning = 'Growth, intention-setting, building energy';
    } else if (daysInCycle < 9.23) {
      phase = 'First Quarter';
      emoji = '🌓';
      meaning = 'Decision-making, challenges, action phase';
    } else if (daysInCycle < 14.76) {
      phase = 'Waxing Gibbous';
      emoji = '🌔';
      meaning = 'Refinement, near completion, anticipation';
    } else if (daysInCycle < 16.61) {
      phase = 'Full Moon';
      emoji = '🌕';
      meaning = 'Culmination, illumination, manifestation';
    } else if (daysInCycle < 22.14) {
      phase = 'Waning Gibbous';
      emoji = '🌖';
      meaning = 'Release, gratitude, sharing, teaching';
    } else if (daysInCycle < 23.99) {
      phase = 'Last Quarter';
      emoji = '🌗';
      meaning = 'Reflection, rest, inner work, closure';
    } else {
      phase = 'Waning Crescent';
      emoji = '🌘';
      meaning = 'Surrender, rest, preparation for new cycle';
    }

    return {
      phase,
      emoji,
      meaning,
      illumination,
      daysInCycle: Math.round(daysInCycle * 100) / 100,
      dayOfCycle: Math.round(daysInCycle)
    };
  };

  const handleCalculate = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    const moonData = calculateMoonPhase(selectedDate);
    setResult(moonData);
  };

  const getMoonColor = (phase) => {
    if (phase === 'New Moon') return 'from-slate-700 to-slate-900';
    if (phase.includes('Waxing')) return 'from-yellow-400 to-amber-400';
    if (phase === 'Full Moon') return 'from-yellow-200 to-yellow-300';
    return 'from-slate-500 to-slate-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Moon Phase Calculator - Happy Kismat"
        description="Find the moon phase for any date and understand its astrological significance."
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/calculators" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Calculators
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">🌙 Moon Phase Calculator</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the moon phase for any date and understand its astrological significance and meaning.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-purple-100 bg-gradient-to-br from-white to-purple-50">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">Select a Date</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-gradient-to-r from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                  >
                    Find Moon Phase
                  </Button>

                  {result && (
                    <Button
                      onClick={() => {
                        setResult(null);
                        setPhone('');
                        setEmail('');
                      }}
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

            {result && (
              <Card className="p-8 border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className={`bg-gradient-to-r ${getMoonColor(result.phase)} p-12 rounded-lg text-center text-white mb-6`}>
                  <p className="text-7xl mb-4">{result.emoji}</p>
                  <p className="text-2xl font-bold">{result.phase}</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                    <p className="text-xs text-gray-600 uppercase mb-2">Illumination</p>
                    <p className="text-4xl font-bold text-blue-600">{result.illumination}%</p>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-300 to-yellow-400 h-full transition-all"
                      style={{ width: `${result.illumination}%` }}
                    ></div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <p className="text-xs text-gray-600 uppercase mb-2">Day in Cycle</p>
                    <p className="text-sm text-gray-700">{result.dayOfCycle} of 29 days</p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Meaning:</p>
                    <p className="text-sm text-gray-600 italic">{result.meaning}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* What is Moon Phase Calculator */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">What is the Moon Phase Calculator?</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-slate-600">
              <p className="text-gray-700 leading-relaxed">
                The Moon Phase Calculator is a tool that determines the lunar phase for any date in history or future. It combines astronomical calculations with astrological interpretation to reveal not just what phase the moon is in, but also what that phase means spiritually and energetically for your life.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-purple-900 mb-3">The Lunar Cycle</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Duration:</strong> 29.53 days (known as a lunar month or synodic month)</p>
                <p><strong>Moon's Journey:</strong> From new moon, through full moon, back to new moon</p>
                <p><strong>8 Primary Phases:</strong> Each lasting approximately 3-4 days</p>
                <p className="text-sm bg-blue-50 p-3 rounded">The moon's cycles have influenced human culture, agriculture, and spirituality for millennia</p>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-purple-600">
              <h3 className="font-bold text-purple-900 mb-3">How It Works</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Step 1:</strong> You select a date</p>
                <p><strong>Step 2:</strong> Calculator determines where moon is in 29.53-day cycle</p>
                <p><strong>Step 3:</strong> Calculates illumination percentage (0-100%)</p>
                <p><strong>Step 4:</strong> Identifies which phase it matches</p>
                <p><strong>Step 5:</strong> Provides spiritual/astrological meaning of that phase</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Eight Lunar Phases Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Eight Lunar Phases & Their Meanings</h2>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-2 border-slate-700">
              <h3 className="text-xl font-bold mb-3">🌑 New Moon (0-12% illumination)</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Duration:</strong> Days 1-2 of lunar cycle</p>
                <p><strong>Astronomical:</strong> Moon between Earth and Sun, not visible</p>
                <p><strong>Astrological Meaning:</strong> New beginnings, fresh starts, setting intentions</p>
                <p><strong>Energy:</strong> Introspection, rest period, internal renewal</p>
                <p><strong>Best For:</strong> Planning new projects, meditation, goal-setting</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-300">
              <h3 className="text-xl font-bold text-gray-800 mb-3">🌒 Waxing Crescent (12-25% illumination)</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Duration:</strong> Days 3-7 of lunar cycle</p>
                <p><strong>Astronomical:</strong> Small visible crescent on right side (Northern Hemisphere)</p>
                <p><strong>Astrological Meaning:</strong> Growth, building energy, manifestation beginning</p>
                <p><strong>Energy:</strong> Action, momentum, setting intentions into motion</p>
                <p><strong>Best For:</strong> Starting new initiatives, attracting opportunities</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300">
              <h3 className="text-xl font-bold text-gray-800 mb-3">🌓 First Quarter (25-50% illumination)</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Duration:</strong> Days 7-10 of lunar cycle</p>
                <p><strong>Astronomical:</strong> Half moon visible on right side</p>
                <p><strong>Astrological Meaning:</strong> Decision-making, overcoming obstacles, action phase</p>
                <p><strong>Energy:</strong> Challenges appear, but solvable through effort</p>
                <p><strong>Best For:</strong> Problem-solving, taking action despite obstacles</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-300 border-2 border-yellow-400">
              <h3 className="text-xl font-bold text-gray-800 mb-3">🌔 Waxing Gibbous (50-87% illumination)</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Duration:</strong> Days 10-15 of lunar cycle</p>
                <p><strong>Astronomical:</strong> More than half illuminated, approaching full</p>
                <p><strong>Astrological Meaning:</strong> Refinement, fine-tuning, nearly at peak</p>
                <p><strong>Energy:</strong> Anticipation, completion near, polishing projects</p>
                <p><strong>Best For:</strong> Refinement work, detailed planning, near-completion tasks</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-yellow-300 to-yellow-100 border-2 border-yellow-300">
              <h3 className="text-xl font-bold text-gray-800 mb-3">🌕 Full Moon (87-100% illumination)</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Duration:</strong> Days 15-16 of lunar cycle</p>
                <p><strong>Astronomical:</strong> 100% illuminated, opposite Earth from Sun</p>
                <p><strong>Astrological Meaning:</strong> Culmination, illumination, manifestation, climax</p>
                <p><strong>Energy:</strong> Peak power, maximum visibility, emotional intensity</p>
                <p><strong>Best For:</strong> Celebrations, harvest, release, culmination events</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-slate-300 to-slate-200 border-2 border-slate-400">
              <h3 className="text-xl font-bold text-gray-800 mb-3">🌖 Waning Gibbous (50-87% illumination, waning)</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Duration:</strong> Days 16-22 of lunar cycle</p>
                <p><strong>Astronomical:</strong> More than half illuminated, but decreasing</p>
                <p><strong>Astrological Meaning:</strong> Release, gratitude, giving back, sharing</p>
                <p><strong>Energy:</strong> Harvest time, sharing blessings, teaching others</p>
                <p><strong>Best For:</strong> Sharing knowledge, gratitude practice, celebration</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-slate-500 to-slate-400 text-white border-2 border-slate-600">
              <h3 className="text-xl font-bold mb-3">🌗 Last Quarter (25-50% illumination, waning)</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Duration:</strong> Days 22-26 of lunar cycle</p>
                <p><strong>Astronomical:</strong> Half moon visible on left side</p>
                <p><strong>Astrological Meaning:</strong> Reflection, rest, inner work, completion</p>
                <p><strong>Energy:</strong> Winding down, introspection, review and reassess</p>
                <p><strong>Best For:</strong> Reflection, rest, closing projects, inner work</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-slate-700 to-slate-600 text-white border-2 border-slate-800">
              <h3 className="text-xl font-bold mb-3">🌘 Waning Crescent (0-25% illumination)</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Duration:</strong> Days 26-29 of lunar cycle</p>
                <p><strong>Astronomical:</strong> Thin crescent on left side (Northern Hemisphere)</p>
                <p><strong>Astrological Meaning:</strong> Surrender, preparation for new cycle, rest</p>
                <p><strong>Energy:</strong> Letting go, rest, spiritual preparation</p>
                <p><strong>Best For:</strong> Meditation, spiritual practices, releasing the old</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Moon Influence on Life */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">How the Moon Influences Your Life</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-purple-900 mb-3">🌊 Emotional & Physical Effects</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Full Moon:</strong> Heightened emotions, increased energy, better visibility</li>
                <li><strong>New Moon:</strong> Inward focus, dreams vivid, intuition stronger</li>
                <li><strong>Waxing Phases:</strong> Building energy, externally focused, action-oriented</li>
                <li><strong>Waning Phases:</strong> Releasing energy, internally focused, reflective</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-amber-600">
              <h3 className="font-bold text-purple-900 mb-3">🌙 Moon & Sleep Quality</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Full Moon often brings difficulty falling asleep</li>
                <li>New Moon supports deep, restful sleep</li>
                <li>Lunar phases affect melatonin production naturally</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-green-600">
              <h3 className="font-bold text-purple-900 mb-3">🎯 Moon & Planning</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Plan during New Moon:</strong> Clearer thinking, fresh perspective</li>
                <li><strong>Execute during Waxing:</strong> Build momentum, action energies high</li>
                <li><strong>Review during Waning:</strong> Reflect, learn, integrate lessons</li>
              </ul>
            </Card>

            <Card className="p-6 bg-blue-50 border-2 border-blue-300">
              <p className="text-sm text-gray-700">
                <strong>🔍 Note:</strong> While moon phases do influence people, individual birth charts and personal factors vary greatly. Use moon phases as tools for self-awareness, not as absolute predictors of your day.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoonPhaseCalculator;
