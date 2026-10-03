import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, RotateCcw, Mail, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const LoveCalculator = () => {
  const [formData, setFormData] = useState({
    yourName: '',
    yourPhone: '',
    yourEmail: '',
    partnerName: '',
    yourGender: 'male',
    partnerGender: 'female'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Numerology helper
  const getNameNumerology = (name) => {
    const numerologyMap = {
      'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
      'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
      's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
    };

    const cleanName = name.toLowerCase().replace(/\s/g, '');
    let sum = 0;
    for (let char of cleanName) {
      sum += numerologyMap[char] || 0;
    }

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = Math.floor(sum / 10) + (sum % 10);
    }
    return sum;
  };

  const getNumerologyLabel = (number) => {
    const labels = {
      1: { name: 'The Leader', desc: 'Independent, ambitious, innovative' },
      2: { name: 'The Diplomat', desc: 'Sensitive, intuitive, cooperative' },
      3: { name: 'The Creator', desc: 'Creative, expressive, communicative' },
      4: { name: 'The Builder', desc: 'Practical, loyal, stable' },
      5: { name: 'The Adventurer', desc: 'Free-spirited, dynamic, magnetic' },
      6: { name: 'The Nurturer', desc: 'Caring, responsible, family-oriented' },
      7: { name: 'The Mystic', desc: 'Spiritual, analytical, introspective' },
      8: { name: 'The Achiever', desc: 'Ambitious, powerful, success-oriented' },
      9: { name: 'The Humanitarian', desc: 'Compassionate, universal, idealistic' },
      11: { name: 'The Master Intuitive', desc: 'Highly spiritual, illuminated, visionary' },
      22: { name: 'The Master Builder', desc: 'Visionary leader, builds on grand scale' },
      33: { name: 'The Master Healer', desc: 'Master of compassion and healing' }
    };
    return labels[number] || { name: 'Unknown', desc: 'Unique vibration' };
  };

  const calculateCompatibility = () => {
    if (!formData.yourName.trim() || !formData.partnerName.trim() || !formData.yourEmail.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const cleanName1 = formData.yourName.toLowerCase().replace(/\s/g, '');
      const cleanName2 = formData.partnerName.toLowerCase().replace(/\s/g, '');

      // 1. NAME VIBRATION MATCH (25%)
      const num1 = getNameNumerology(formData.yourName);
      const num2 = getNameNumerology(formData.partnerName);
      const vibrationDiff = Math.abs(num1 - num2);
      const nameVibrationScore = Math.max(0, 25 - (vibrationDiff * 2));

      // 2. SOUL URGE HARMONY (20%)
      const vowels = 'aeiou';
      const vowel1 = cleanName1.split('').filter(c => vowels.includes(c)).length;
      const vowel2 = cleanName2.split('').filter(c => vowels.includes(c)).length;
      const soulUrge1 = vowel1 % 9 || 9;
      const soulUrge2 = vowel2 % 9 || 9;
      const soulDiff = Math.abs(soulUrge1 - soulUrge2);
      const soulUrgeScore = Math.max(0, 20 - (soulDiff * 2));

      // 3. DESTINY PATH ALIGNMENT (20%)
      const consonant1 = cleanName1.length - vowel1;
      const consonant2 = cleanName2.length - vowel2;
      const destiny1 = consonant1 % 9 || 9;
      const destiny2 = consonant2 % 9 || 9;
      const destinyDiff = Math.abs(destiny1 - destiny2);
      const destinyScore = Math.max(0, 20 - (destinyDiff * 2));

      // 4. LETTER ENERGY MATCH (20%)
      let commonLetters = 0;
      const letters1 = cleanName1.split('');
      const letters2Copy = cleanName2.split('');

      for (let letter of letters1) {
        const index = letters2Copy.indexOf(letter);
        if (index > -1) {
          commonLetters++;
          letters2Copy.splice(index, 1);
        }
      }

      const totalUnique = new Set([...cleanName1, ...cleanName2]).size;
      const letterScore = (commonLetters / totalUnique) * 20;

      // 5. GENDER HARMONY (15%)
      let genderScore = 15;
      if (formData.yourGender === formData.partnerGender) {
        genderScore = 10;
      }

      // Final Score
      const totalScore = Math.min(100, Math.round(
        nameVibrationScore + soulUrgeScore + destinyScore + letterScore + genderScore
      ));

      // Relationship Description
      const getDescription = (score) => {
        if (score >= 85) return 'You two share an incredibly deep connection. Your energies complement each other beautifully, creating a harmonious and fulfilling bond.';
        if (score >= 75) return 'Strong connection with excellent potential. You understand each other well and bring out the best in one another.';
        if (score >= 65) return 'Good compatibility with solid foundation. A little patience and trust will make this bond even stronger.';
        if (score >= 55) return 'Moderate compatibility with potential for growth. Communication and understanding are key to strengthening your bond.';
        if (score >= 45) return 'Different energies but can work well together. Focus on appreciating your differences and finding common ground.';
        return 'Very different vibrations. Success requires significant effort, patience, and mutual understanding.';
      };

      setResult({
        yourName: formData.yourName,
        partnerName: formData.partnerName,
        yourEmail: formData.yourEmail,
        score: totalScore,
        description: getDescription(totalScore),

        nameVibration: {
          score: Math.round(nameVibrationScore),
          num1,
          num2,
          label1: getNumerologyLabel(num1),
          label2: getNumerologyLabel(num2)
        },

        soulUrge: {
          score: Math.round(soulUrgeScore),
          soulUrge1,
          soulUrge2,
          interpretation: `Your soul urge ${soulUrge1} seeks ${['completion', 'partnership', 'expression', 'stability', 'freedom', 'harmony', 'wisdom', 'achievement', 'universal love'][soulUrge1-1]}. Partner's soul urge ${soulUrge2} seeks ${['completion', 'partnership', 'expression', 'stability', 'freedom', 'harmony', 'wisdom', 'achievement', 'universal love'][soulUrge2-1]}.`
        },

        destinyPath: {
          score: Math.round(destinyScore),
          destiny1,
          destiny2,
          interpretation: `Your destiny aligns with path ${destiny1}. Your partner's destiny follows path ${destiny2}. Together, you create a powerful combination.`
        },

        letterEnergy: {
          score: Math.round(letterScore),
          commonLetters,
          totalUnique
        },

        genderHarmony: {
          score: genderScore,
          types: `${formData.yourGender.charAt(0).toUpperCase() + formData.yourGender.slice(1)} & ${formData.partnerGender.charAt(0).toUpperCase() + formData.partnerGender.slice(1)}`
        }
      });

      setLoading(false);
    }, 1500);
  };

  const reset = () => {
    setFormData({
      yourName: '',
      yourPhone: '',
      yourEmail: '',
      partnerName: '',
      yourGender: 'male',
      partnerGender: 'female'
    });
    setResult(null);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'from-red-600 to-pink-600';
    if (score >= 75) return 'from-red-500 to-pink-500';
    if (score >= 65) return 'from-pink-400 to-rose-400';
    if (score >= 55) return 'from-orange-400 to-pink-400';
    if (score >= 45) return 'from-yellow-400 to-orange-400';
    return 'from-gray-400 to-blue-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Love Calculator - Happy Kismat"
        description="Calculate your love compatibility with detailed numerology analysis and personalized relationship insights."
      />

      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/calculators" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Calculators
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">💕 Love Calculator</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover your relationship compatibility through advanced numerology and energy analysis. Get a personalized report based on your names, details, and vibrational energies.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="p-8 border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 mb-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-8">Enter Your Details</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Your Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-purple-900 flex items-center gap-2">
                  <User className="w-5 h-5" /> Your Information
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={formData.yourName}
                    onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.yourPhone}
                    onChange={(e) => setFormData({ ...formData, yourPhone: e.target.value })}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.yourEmail}
                    onChange={(e) => setFormData({ ...formData, yourEmail: e.target.value })}
                    placeholder="Your email"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Gender</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="male"
                        checked={formData.yourGender === 'male'}
                        onChange={(e) => setFormData({ ...formData, yourGender: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="female"
                        checked={formData.yourGender === 'female'}
                        onChange={(e) => setFormData({ ...formData, yourGender: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">Female</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Partner Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-purple-900 flex items-center gap-2">
                  <User className="w-5 h-5" /> Partner Information
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Partner Name *</label>
                  <input
                    type="text"
                    value={formData.partnerName}
                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                    placeholder="Enter partner's full name"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="pt-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Partner Gender</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="male"
                        checked={formData.partnerGender === 'male'}
                        onChange={(e) => setFormData({ ...formData, partnerGender: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="female"
                        checked={formData.partnerGender === 'female'}
                        onChange={(e) => setFormData({ ...formData, partnerGender: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">Female</span>
                    </label>
                  </div>
                </div>

                <div className="pt-12 flex gap-3">
                  <Button
                    onClick={calculateCompatibility}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 text-lg font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Calculating...' : 'Find Relationship'}
                  </Button>

                  {result && (
                    <Button
                      onClick={reset}
                      variant="outline"
                      className="flex-1 border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Main Score Card */}
              <Card className="p-8 border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className={`bg-gradient-to-r ${getScoreColor(result.score)} p-8 rounded-lg text-center text-white`}>
                    <p className="text-sm uppercase tracking-widest opacity-90 mb-2">Compatibility Score</p>
                    <p className="text-6xl font-bold mb-4">{result.score}%</p>
                    <p className="text-lg font-semibold">{result.nameVibration.label1.name} & {result.nameVibration.label2.name}</p>
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-3 font-semibold">Relationship Type</p>
                    <p className="text-2xl font-bold text-purple-900 mb-6">
                      {result.score >= 85 ? '✨ Soulmates ✨' :
                       result.score >= 75 ? '💕 Highly Compatible 💕' :
                       result.score >= 65 ? '💚 Very Compatible 💚' :
                       result.score >= 55 ? '🧡 Compatible 🧡' :
                       result.score >= 45 ? '💛 Potential 💛' : '🤔 Different Energies 🤔'}
                    </p>
                    <p className="text-gray-700 italic leading-relaxed">{result.description}</p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-8">
                  <div
                    className={`bg-gradient-to-r ${getScoreColor(result.score)} h-full transition-all`}
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
              </Card>

              {/* Compatibility Breakdown */}
              <Card className="p-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <h3 className="text-2xl font-bold text-purple-900 mb-8">Compatibility Breakdown</h3>

                <div className="space-y-6">
                  {/* Name Vibration Match */}
                  <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-bold text-purple-900">Name Vibration Match</h4>
                      <span className="text-2xl font-bold text-purple-600">{result.nameVibration.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full" style={{ width: `${result.nameVibration.score}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Your number: <strong>{result.nameVibration.num1}</strong> — {result.nameVibration.label1.name} — {result.nameVibration.label1.desc} |
                      Partner: <strong>{result.nameVibration.num2}</strong> — {result.nameVibration.label2.name} — {result.nameVibration.label2.desc}
                    </p>
                  </div>

                  {/* Soul Urge Harmony */}
                  <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-bold text-purple-900">Soul Urge Harmony</h4>
                      <span className="text-2xl font-bold text-blue-600">{result.soulUrge.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full" style={{ width: `${result.soulUrge.score}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-700">{result.soulUrge.interpretation}</p>
                  </div>

                  {/* Destiny Path Alignment */}
                  <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-bold text-purple-900">Destiny Path Alignment</h4>
                      <span className="text-2xl font-bold text-green-600">{result.destinyPath.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full" style={{ width: `${result.destinyPath.score}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-700">{result.destinyPath.interpretation}</p>
                  </div>

                  {/* Letter Energy Match */}
                  <div className="bg-white p-6 rounded-lg border-2 border-amber-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-bold text-purple-900">Letter Energy Match</h4>
                      <span className="text-2xl font-bold text-amber-600">{result.letterEnergy.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full" style={{ width: `${result.letterEnergy.score}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-700">
                      How many unique energy letters you share: <strong>{result.letterEnergy.commonLetters} common out of {result.letterEnergy.totalUnique} unique</strong>
                    </p>
                  </div>

                  {/* Gender Harmony */}
                  <div className="bg-white p-6 rounded-lg border-2 border-rose-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-bold text-purple-900">Gender Harmony</h4>
                      <span className="text-2xl font-bold text-rose-600">{result.genderHarmony.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-full" style={{ width: `${result.genderHarmony.score}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-700">{result.genderHarmony.types}</p>
                  </div>
                </div>
              </Card>

              {/* Numerology Insights */}
              <Card className="p-8 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                <h3 className="text-2xl font-bold text-purple-900 mb-8">📊 Numerology Insights</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
                    <p className="text-xs text-gray-600 uppercase tracking-widest mb-3 font-semibold">{result.yourName}'s Number</p>
                    <p className="text-5xl font-bold text-purple-600 mb-3">{result.nameVibration.num1}</p>
                    <p className="text-lg font-bold text-purple-900">{result.nameVibration.label1.name}</p>
                    <p className="text-sm text-gray-600 mt-2">{result.nameVibration.label1.desc}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-pink-200">
                    <p className="text-xs text-gray-600 uppercase tracking-widest mb-3 font-semibold">{result.partnerName}'s Number</p>
                    <p className="text-5xl font-bold text-pink-600 mb-3">{result.nameVibration.num2}</p>
                    <p className="text-lg font-bold text-purple-900">{result.nameVibration.label2.name}</p>
                    <p className="text-sm text-gray-600 mt-2">{result.nameVibration.label2.desc}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* What is Love Calculator */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">What is a Love Calculator?</h2>

          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-pink-500">
              <p className="text-gray-700 leading-relaxed">
                The Love Calculator is an advanced numerology and energy analysis tool designed to measure compatibility between two individuals. It goes beyond simple name matching to analyze the deep vibrational energies, soul urges, and destiny paths that shape a relationship.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-900 mb-3">How Does It Work?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-pink-500 font-bold">1.</span>
                  <span><strong>Name Vibration:</strong> Each letter has a numeric value. Your names are reduced to master numbers that reveal your personality essence.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-500 font-bold">2.</span>
                  <span><strong>Soul Urge:</strong> Based on vowels in your name, revealing what your soul truly desires and seeks.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-500 font-bold">3.</span>
                  <span><strong>Destiny Path:</strong> Based on consonants, showing your life's direction and purpose.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-500 font-bold">4.</span>
                  <span><strong>Letter Energy:</strong> Shared letters indicate common interests and values.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-pink-500 font-bold">5.</span>
                  <span><strong>Gender Harmony:</strong> Natural balance between masculine and feminine energies.</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-rose-500">
              <h3 className="font-bold text-purple-900 mb-3">Is It Accurate?</h3>
              <p className="text-gray-700">
                The Love Calculator is for entertainment and insight purposes. While numerology has ancient roots, real relationships thrive on communication, trust, respect, and mutual effort. Use this tool to understand your energetic compatibility, but remember that lasting love is built through commitment and understanding.
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
              <strong>Disclaimer:</strong> This Love Calculator is designed for entertainment and personal insight. Numerology is an ancient practice, but true relationship compatibility depends on communication, trust, respect, and mutual effort. Use this tool to explore your connection, but rely on genuine communication and understanding to build lasting love.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LoveCalculator;
