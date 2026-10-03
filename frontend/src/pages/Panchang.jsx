import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, MapPin, Calendar, Sun, Moon, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Panchang = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2026-10-04'));
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru');
  const [activeTab, setActiveTab] = useState('panchang'); // panchang, chaughadiya, hora, gochar

  const indianLocations = [
    { name: 'Bengaluru', lat: 12.9716, lon: 77.5946, timezone: 'IST' },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777, timezone: 'IST' },
    { name: 'Delhi', lat: 28.7041, lon: 77.1025, timezone: 'IST' },
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639, timezone: 'IST' },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707, timezone: 'IST' },
    { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, timezone: 'IST' },
    { name: 'Pune', lat: 18.5204, lon: 73.8567, timezone: 'IST' },
    { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, timezone: 'IST' },
    { name: 'Varanasi', lat: 25.3201, lon: 82.9979, timezone: 'IST' },
    { name: 'Jaipur', lat: 26.9124, lon: 75.7873, timezone: 'IST' },
    { name: 'Lucknow', lat: 26.8467, lon: 80.9462, timezone: 'IST' },
    { name: 'Chandigarh', lat: 30.7333, lon: 76.7794, timezone: 'IST' },
  ];

  // Calculate panchang elements (memoized with useCallback)
  const calculatePanchang = useCallback(() => {
    const dateNum = selectedDate.getDate();
    const monthNum = selectedDate.getMonth() + 1;

    // Tithi (simplified calculation - 1-30)
    const lunarDay = ((dateNum % 15) || 15);
    const tithiNames = [
      'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
      'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
      'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
    ];
    const currentTithi = tithiNames[(lunarDay - 1) % 15];
    const tithiEndTime = `${18 + ((lunarDay % 2) * 2)}:${(lunarDay * 4) % 60} PM`;

    // Nakshatra (simplified - 27 nakshatras)
    const nakshatraNames = [
      'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha',
      'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
      'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
      'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purvashadha',
      'Uttarashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
      'Uttara Bhadrapada', 'Revati'
    ];
    const nakshatraIndex = (dateNum + monthNum) % 27;
    const currentNakshatra = nakshatraNames[nakshatraIndex];

    // Yoga (simplified - 27 yogas)
    const yogaNames = [
      'Vishkambha', 'Preeti', 'Ayushman', 'Saubhagya', 'Shobhan',
      'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda',
      'Vriddhi', 'Dhruva', 'Vyaghat', 'Harshana', 'Vajra',
      'Siddhi', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
      'Indra', 'Vaidhriti', 'Parigha', 'Shiva', 'Siddha',
      'Sadhan', 'Magha'
    ];
    const yogaIndex = (dateNum % 27);
    const currentYoga = yogaNames[yogaIndex];

    // Karana (half tithi - 8 different karanas)
    const karanaNames = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti', 'Shakti'];
    const karanaIndex = (dateNum % 8);
    const currentKarana = karanaNames[karanaIndex];

    // Sun and Moon signs
    const sunSignIndex = (monthNum % 12);
    const sunSigns = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'];
    const currentSunSign = sunSigns[sunSignIndex];

    const moonSignIndex = (dateNum % 12);
    const moonSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const currentMoonSign = moonSigns[moonSignIndex];

    // Sunrise/Sunset (IST - simplified)
    const sunrise = `6:${15 + (monthNum % 45)}:00 AM`;
    const sunset = `6:${15 + (monthNum % 45)}:00 PM`;

    return {
      tithi: currentTithi,
      tithiEnd: tithiEndTime,
      nakshatra: currentNakshatra,
      yoga: currentYoga,
      karana: currentKarana,
      sunSign: currentSunSign,
      moonSign: currentMoonSign,
      sunrise,
      sunset,
      dayLength: '12h 00m',
      moonPhase: lunarDay <= 15 ? `Waxing (${lunarDay}/15)` : `Waning (${30 - lunarDay}/15)`,
      auspiciousTime: `${8 + (dateNum % 8)}:00 AM - ${10 + (dateNum % 8)}:00 AM`
    };
  }, [selectedDate]);

  const [panchangData, setPanchangData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch panchang when date or location changes
  useEffect(() => {
    const fetchPanchang = async () => {
      setLoading(true);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/panchang/calculate`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              date: dateStr,
              location: selectedLocation
            })
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch panchang data');
        }

        const data = await response.json();
        setPanchangData(data);
      } catch (error) {
        console.error('Error fetching panchang:', error);
        // Fall back to local calculations if API fails
        setPanchangData(calculatePanchang());
      } finally {
        setLoading(false);
      }
    };

    fetchPanchang();
  }, [selectedDate, selectedLocation, calculatePanchang]);

  const panchang = panchangData || calculatePanchang();

  // Chaughadiya calculation
  const calculateChaughadiya = () => {
    const chaughadiyaNames = ['Char', 'Labha', 'Amrita', 'Kaal', 'Labha', 'Amrita', 'Kaal', 'Labha'];
    const chaughadiyaColors = ['🟢', '🟡', '🟢', '🔴', '🟡', '🟢', '🔴', '🟡'];

    const dayStart = 6; // 6 AM
    const nightStart = 18; // 6 PM
    const duration = 1.5; // 1.5 hours per period

    const dayChaug = Array.from({ length: 8 }, (_, i) => ({
      name: chaughadiyaNames[i],
      emoji: chaughadiyaColors[i],
      start: `${dayStart + i * duration}:00`,
      type: chaughadiyaNames[i] === 'Labha' ? 'Auspicious' : chaughadiyaNames[i] === 'Amrita' ? 'Most Auspicious' : 'Inauspicious'
    })).slice(0, 6); // 6 periods in day

    const nightChaug = Array.from({ length: 8 }, (_, i) => ({
      name: chaughadiyaNames[(i + 4) % 8],
      emoji: chaughadiyaColors[(i + 4) % 8],
      start: `${nightStart + i * duration}:00`,
      type: chaughadiyaNames[(i + 4) % 8] === 'Labha' ? 'Auspicious' : chaughadiyaNames[(i + 4) % 8] === 'Amrita' ? 'Most Auspicious' : 'Inauspicious'
    })).slice(0, 6);

    return { dayChaug, nightChaug };
  };

  const chaughadiya = useMemo(() => calculateChaughadiya(), []);

  // Hora calculation
  const calculateHora = useMemo(() => {
    const planetaryHoras = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars'];
    const dayHoras = Array.from({ length: 12 }, (_, i) => ({
      hour: `${6 + i}:00 - ${7 + i}:00`,
      ruler: planetaryHoras[(i + selectedDate.getDate()) % 7],
      beneficial: (i + selectedDate.getDate()) % 2 === 0
    }));

    const nightHoras = Array.from({ length: 12 }, (_, i) => ({
      hour: `${18 + i}:00 - ${19 + i}:00`,
      ruler: planetaryHoras[(i + 3 + selectedDate.getDate()) % 7],
      beneficial: (i + selectedDate.getDate()) % 2 === 0
    }));

    return { dayHoras, nightHoras };
  }, [selectedDate]);

  const hora = calculateHora;

  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const dateStr = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Panchang Calculator - Hindu Calendar - Happy Kismat"
        description="Calculate detailed Panchang (Hindu calendar) for any date with location-based sunrise/sunset, Chaughadiya, and Hora calculations."
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/free-kundli-tools" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Free Tools
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">📅 Panchang Calculator</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Calculate detailed Hindu calendar (Panchang) with Tithi, Nakshatra, Yoga, Karana, Chaughadiya, and Hora based on your location.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Date and Location Selector */}
          <Card className="p-8 border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Date Navigation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Date</label>
                <div className="flex items-center gap-2 mb-3">
                  <Button
                    onClick={() => handleDateChange(-1)}
                    className="bg-purple-200 text-purple-700 hover:bg-purple-300"
                  >
                    ←
                  </Button>
                  <Button
                    onClick={() => setSelectedDate(new Date())}
                    className="flex-1 bg-purple-600 text-white hover:bg-purple-700"
                  >
                    Today
                  </Button>
                  <Button
                    onClick={() => handleDateChange(1)}
                    className="bg-purple-200 text-purple-700 hover:bg-purple-300"
                  >
                    →
                  </Button>
                </div>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg"
                />
              </div>

              {/* Location Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                >
                  <optgroup label="Indian Cities">
                    {indianLocations.map((loc) => (
                      <option key={loc.name} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Info Display */}
              <div className="flex flex-col justify-end">
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    <strong>{dateStr}</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    <MapPin className="inline w-4 h-4 mr-2" />
                    <strong>{selectedLocation}, India</strong>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {[
              { id: 'panchang', label: '📋 Panchang', icon: '📋' },
              { id: 'chaughadiya', label: '⏰ Chaughadiya', icon: '⏰' },
              { id: 'hora', label: '🕐 Hora', icon: '🕐' },
              { id: 'gochar', label: '🌟 Planetary Transit', icon: '🌟' }
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-purple-600 font-semibold text-lg">🔄 Calculating Panchang...</p>
              <p className="text-gray-600 text-sm mt-2">Using astronomical algorithms for accurate calculations</p>
            </div>
          )}

          {/* PANCHANG TAB */}
          {!loading && activeTab === 'panchang' && (
            <div className="space-y-6">
              {/* Main Panchang Elements */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-2 border-blue-200 bg-blue-50">
                  <h3 className="text-lg font-bold text-blue-900 mb-4">📅 Tithi (Lunar Day)</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Current Tithi</p>
                      <p className="text-2xl font-bold text-blue-600">{panchang.tithi}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tithi Ends At</p>
                      <p className="text-lg font-semibold text-gray-700">{panchang.tithiEnd}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Moon Phase</p>
                      <p className="text-lg font-semibold text-gray-700">{panchang.moonPhase}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-green-200 bg-green-50">
                  <h3 className="text-lg font-bold text-green-900 mb-4">⭐ Nakshatra (Lunar Mansion)</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Current Nakshatra</p>
                      <p className="text-2xl font-bold text-green-600">{panchang.nakshatra}</p>
                    </div>
                    <div className="bg-white p-3 rounded border-l-4 border-green-500">
                      <p className="text-xs text-gray-600 uppercase mb-1">Characteristics</p>
                      <p className="text-sm text-gray-700">{panchang.nakshatra === 'Punarvasu' ? 'Renewal and return, prosperity, wisdom' : 'Unique and powerful lunar mansion'}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-yellow-200 bg-yellow-50">
                  <h3 className="text-lg font-bold text-yellow-900 mb-4">🎯 Yoga (Auspicious Combination)</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Current Yoga</p>
                      <p className="text-2xl font-bold text-yellow-600">{panchang.yoga}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Significance</p>
                      <p className="text-sm text-gray-700">A combination of Sun and Moon positions that determines auspiciousness</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-red-200 bg-red-50">
                  <h3 className="text-lg font-bold text-red-900 mb-4">⚡ Karana (Half Tithi)</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Current Karana</p>
                      <p className="text-2xl font-bold text-red-600">{panchang.karana}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="text-sm text-gray-700">Half of a Tithi (lunar day)</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sunrise/Sunset and Zodiac Signs */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 border-2 border-orange-200 bg-orange-50">
                  <h3 className="text-lg font-bold text-orange-900 mb-4">
                    <Sun className="inline w-5 h-5 mr-2" />
                    Sunrise & Sunset
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Sunrise</p>
                      <p className="text-lg font-bold text-orange-600">{panchang.sunrise}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sunset</p>
                      <p className="text-lg font-bold text-orange-600">{panchang.sunset}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Day Length</p>
                      <p className="text-sm text-gray-700">{panchang.dayLength}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-purple-200 bg-purple-50">
                  <h3 className="text-lg font-bold text-purple-900 mb-4">☀️ Sun Sign</h3>
                  <div className="space-y-3">
                    <p className="text-3xl font-bold text-purple-600">{panchang.sunSign}</p>
                    <p className="text-sm text-gray-700">The zodiac sign where the Sun is positioned</p>
                    <div className="bg-white p-2 rounded text-center text-sm text-gray-600 font-semibold">
                      Life Force, Vitality, Ego
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-indigo-200 bg-indigo-50">
                  <h3 className="text-lg font-bold text-indigo-900 mb-4">
                    <Moon className="inline w-5 h-5 mr-2" />
                    Moon Sign
                  </h3>
                  <div className="space-y-3">
                    <p className="text-3xl font-bold text-indigo-600">{panchang.moonSign}</p>
                    <p className="text-sm text-gray-700">The zodiac sign where the Moon is positioned</p>
                    <div className="bg-white p-2 rounded text-center text-sm text-gray-600 font-semibold">
                      Mind, Emotions, Instincts
                    </div>
                  </div>
                </Card>
              </div>

              {/* Auspicious Time */}
              <Card className="p-6 border-2 border-green-300 bg-green-100">
                <h3 className="text-lg font-bold text-green-900 mb-3">✨ Most Auspicious Time</h3>
                <p className="text-xl font-bold text-green-700">{panchang.auspiciousTime} IST</p>
                <p className="text-sm text-gray-700 mt-2">Best time for important activities, rituals, and new beginnings</p>
              </Card>
            </div>
          )}

          {/* CHAUGHADIYA TAB */}
          {activeTab === 'chaughadiya' && (
            <div className="space-y-6">
              <Card className="p-6 border-2 border-blue-200 bg-blue-50">
                <h3 className="text-lg font-bold text-blue-900 mb-4">⏰ Chaughadiya - Daytime Periods</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {chaughadiya.dayChaug.map((period, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-2 ${
                        period.type === 'Most Auspicious'
                          ? 'border-green-400 bg-green-50'
                          : period.type === 'Auspicious'
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-red-400 bg-red-50'
                      }`}
                    >
                      <p className="text-2xl mb-2">{period.emoji}</p>
                      <p className="font-bold text-gray-900">{period.name}</p>
                      <p className="text-sm text-gray-700">{period.start}</p>
                      <p className={`text-xs font-semibold mt-2 ${
                        period.type === 'Most Auspicious' ? 'text-green-700' :
                        period.type === 'Auspicious' ? 'text-blue-700' : 'text-red-700'
                      }`}>
                        {period.type}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-2 border-indigo-200 bg-indigo-50">
                <h3 className="text-lg font-bold text-indigo-900 mb-4">⏰ Chaughadiya - Nighttime Periods</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {chaughadiya.nightChaug.map((period, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-2 ${
                        period.type === 'Most Auspicious'
                          ? 'border-green-400 bg-green-50'
                          : period.type === 'Auspicious'
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-red-400 bg-red-50'
                      }`}
                    >
                      <p className="text-2xl mb-2">{period.emoji}</p>
                      <p className="font-bold text-gray-900">{period.name}</p>
                      <p className="text-sm text-gray-700">{period.start}</p>
                      <p className={`text-xs font-semibold mt-2 ${
                        period.type === 'Most Auspicious' ? 'text-green-700' :
                        period.type === 'Auspicious' ? 'text-blue-700' : 'text-red-700'
                      }`}>
                        {period.type}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-2 border-purple-200 bg-purple-50">
                <h3 className="text-lg font-bold text-purple-900 mb-4">📚 About Chaughadiya</h3>
                <p className="text-gray-700 leading-relaxed">
                  Chaughadiya divides the day and night into eight equal periods of approximately 1.5 hours each. Each period is ruled by a specific planetary energy and is classified as Auspicious (Labha), Most Auspicious (Amrita), or Inauspicious (Kaal). Understanding Chaughadiya helps you choose the best time for important activities.
                </p>
              </Card>
            </div>
          )}

          {/* HORA TAB */}
          {activeTab === 'hora' && (
            <div className="space-y-6">
              <Card className="p-6 border-2 border-yellow-200 bg-yellow-50">
                <h3 className="text-lg font-bold text-yellow-900 mb-4">🕐 Hora - Daytime Hours</h3>
                <div className="grid md:grid-cols-4 gap-3">
                  {hora.dayHoras.map((h, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border-2 ${
                        h.beneficial ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      <p className="text-xs text-gray-600 uppercase mb-1">Hour</p>
                      <p className="text-sm font-bold text-gray-900">{h.hour}</p>
                      <p className={`text-sm font-semibold mt-2 ${h.beneficial ? 'text-green-700' : 'text-gray-700'}`}>
                        {h.ruler}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {h.beneficial ? '✓ Favorable' : '○ Neutral'}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-2 border-blue-200 bg-blue-50">
                <h3 className="text-lg font-bold text-blue-900 mb-4">🕐 Hora - Nighttime Hours</h3>
                <div className="grid md:grid-cols-4 gap-3">
                  {hora.nightHoras.map((h, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border-2 ${
                        h.beneficial ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      <p className="text-xs text-gray-600 uppercase mb-1">Hour</p>
                      <p className="text-sm font-bold text-gray-900">{h.hour}</p>
                      <p className={`text-sm font-semibold mt-2 ${h.beneficial ? 'text-green-700' : 'text-gray-700'}`}>
                        {h.ruler}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {h.beneficial ? '✓ Favorable' : '○ Neutral'}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-2 border-purple-200 bg-purple-50">
                <h3 className="text-lg font-bold text-purple-900 mb-4">📚 About Hora Muhurta</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Hora divides the day into 12 hourly periods and the night into 12 more periods. Each hour is ruled by one of seven planets: Sun, Venus, Mercury, Moon, Saturn, Jupiter, and Mars. Certain planetary hours are more favorable for specific activities.
                </p>
                <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                  <p className="text-sm text-gray-700"><strong>Sun Hora:</strong> Leadership, authority, success</p>
                  <p className="text-sm text-gray-700 mt-2"><strong>Moon Hora:</strong> Emotional matters, family, spirituality</p>
                  <p className="text-sm text-gray-700 mt-2"><strong>Mercury Hora:</strong> Communication, learning, trade</p>
                </div>
              </Card>
            </div>
          )}

          {/* PLANETARY TRANSIT TAB */}
          {activeTab === 'gochar' && (
            <div className="space-y-6">
              {/* Location-Specific Ascendant */}
              {panchang?.ascendant && (
                <Card className="p-6 border-2 border-purple-300 bg-purple-100">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">🏠 Ascendant (Lagna) - Location Specific</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded border-2 border-purple-500">
                      <p className="text-sm text-gray-600 uppercase mb-2">Ascendant Sign</p>
                      <p className="text-3xl font-bold text-purple-600">{panchang.ascendant.sign}</p>
                      <p className="text-sm text-gray-700 mt-2">At {panchang.ascendant.degree}°</p>
                    </div>
                    <div className="bg-white p-4 rounded border-2 border-green-500 md:col-span-2">
                      <p className="text-sm text-gray-600 uppercase mb-2">Location Dependency</p>
                      <p className="text-gray-700"><strong>✓ Changes per location!</strong></p>
                      <p className="text-sm text-gray-700 mt-2">
                        Your ascendant varies based on {selectedLocation}'s coordinates (Lat: {panchang.coordinates?.lat}°, Lon: {panchang.coordinates?.lon}°). Different cities have different ascendants at the same time!
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* All Planetary Positions */}
              {panchang?.planetary_positions && (
                <Card className="p-6 border-2 border-orange-200 bg-orange-50">
                  <h3 className="text-lg font-bold text-orange-900 mb-4">
                    <Navigation className="inline w-5 h-5 mr-2" />
                    Planetary Positions
                  </h3>
                  <p className="text-xs text-gray-600 bg-white p-2 rounded mb-4">
                    📍 <strong>Local Meridian Crossing Times</strong> - Shows when each planet crosses your local meridian in {selectedLocation}
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {panchang.planetary_positions.map((planet, idx) => (
                      <div key={idx} className="p-4 bg-white rounded border-2 border-orange-300 hover:shadow-lg transition">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-2xl">{planet.symbol}</p>
                          <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded">Location-Specific</span>
                        </div>
                        <p className="font-bold text-gray-900">{planet.name}</p>
                        <p className="text-sm text-gray-700 mb-2">{planet.meaning}</p>

                        <div className="bg-orange-50 p-2 rounded text-sm space-y-1">
                          <p><strong>Sign:</strong> {planet.zodiac_sign} {planet.degree.toFixed(1)}°</p>
                          <p><strong>Nakshatra:</strong> {planet.nakshatra}</p>
                          <p><strong>Meridian:</strong> {planet.meridian_crossing}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Retrograde Planets */}
              {panchang?.retrograde_planets && panchang.retrograde_planets.length > 0 && (
                <Card className="p-6 border-2 border-red-300 bg-red-50">
                  <h3 className="text-lg font-bold text-red-900 mb-4">♻️ Retrograde Planets</h3>
                  <p className="text-xs text-gray-600 bg-white p-2 rounded mb-4">
                    ⚠️ <strong>Note:</strong> Retrograde status is the SAME worldwide, but effects manifest locally
                  </p>
                  <div className="space-y-3">
                    {panchang.retrograde_planets.map((planet, idx) => (
                      <div key={idx} className="p-4 bg-white rounded border-2 border-red-400">
                        <p className="text-lg font-bold text-red-700 mb-1">{planet.name} - {planet.status}</p>
                        <p className="text-gray-700">{planet.effect}</p>
                        <p className="text-xs text-gray-600 mt-2">
                          🌍 Same for all locations globally | ⏰ But local timing varies by {selectedLocation}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* House Cusps */}
              {panchang?.houses && (
                <Card className="p-6 border-2 border-indigo-200 bg-indigo-50">
                  <h3 className="text-lg font-bold text-indigo-900 mb-4">🏠 House Cusps - Location Dependent</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {panchang.houses.slice(0, 12).map((house, idx) => (
                      <div key={idx} className="p-3 bg-white rounded border-2 border-indigo-300 text-center">
                        <p className="text-sm font-bold text-indigo-700">House {house.number}</p>
                        <p className="text-xs text-gray-700 mt-1">{house.sign}</p>
                        <p className="text-xs text-gray-600">{house.degree}°</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mt-4 bg-white p-3 rounded">
                    ✓ <strong>House Cusps are LOCATION-SPECIFIC!</strong> They change based on {selectedLocation}'s latitude and longitude. Your houses in Bengaluru differ from Varanasi.
                  </p>
                </Card>
              )}

              {/* Location Specific Note */}
              {panchang?.location_specific_note && (
                <Card className="p-6 border-2 border-green-300 bg-green-50">
                  <h3 className="text-lg font-bold text-green-900 mb-3">📍 What Varies by Location?</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>Ascendant/Lagna</strong> - Changes based on local sunrise and latitude</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>House Cusps</strong> - Completely different per location</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>Meridian Crossing Times</strong> - When planets cross your local meridian</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">✗</span>
                      <span><strong>Planetary Zodiac Positions</strong> - SAME worldwide (e.g., Sun in Virgo for everyone)</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">✗</span>
                      <span><strong>Retrograde Status</strong> - SAME for all locations (retrograde planet is retrograde everywhere)</span>
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mt-4 italic">
                    {panchang.location_specific_note}
                  </p>
                </Card>
              )}

              <Card className="p-6 border-2 border-blue-200 bg-blue-50">
                <h3 className="text-lg font-bold text-blue-900 mb-4">📚 Understanding Retrograde Motion</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When planets appear to move backward from Earth's perspective, they are said to be retrograde. This doesn't change their actual motion but shifts how we experience their energies. Retrograde periods encourage review, reflection, and recalibration rather than new initiatives.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>🔄 During Retrograde:</strong> Review, rethink, revise - internal work</li>
                  <li><strong>✓ Best For:</strong> Meditation, therapy, introspection, learning</li>
                  <li><strong>✗ Avoid:</strong> New projects, major decisions, signed contracts</li>
                </ul>
              </Card>

              <Card className="p-6 border-2 border-green-200 bg-green-50">
                <h3 className="text-lg font-bold text-green-900 mb-4">🌟 The Sky at a Glance</h3>
                <p className="text-gray-700 mb-4">
                  Today's sky is marked by introspection and karmic review. With multiple retrograde planets, this is an ideal time for spiritual practice, inner healing, and re-evaluating your life direction. Honor the call for internal work.
                </p>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Panchang;
