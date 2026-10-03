import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const FreeKundli = () => {
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

  const zodiacDetails = {
    'Aries': {
      symbol: '♈',
      element: 'Fire',
      ruling_planet: 'Mars',
      dates: 'Mar 21 - Apr 19',
      description: `Aries, the Ram, is the first sign of the zodiac and represents new beginnings, courage, and initiative. As an Aries, you are naturally assertive, energetic, and ambitious. You possess a pioneering spirit and are not afraid to take bold actions. Your ruling planet Mars gives you drive, determination, and a competitive nature. You are passionate about your pursuits and have excellent leadership qualities.`,
      characteristics: `You are dynamic, courageous, and possess excellent problem-solving abilities. Your enthusiasm is contagious and inspires those around you. You are direct in your communication and value honesty. Your adventurous spirit drives you to explore new territories and take calculated risks. However, you can be impulsive at times and may lack patience in complex situations.`,
      strengths: `Leadership, courage, initiative, determination, honesty, dynamism, confidence`,
      challenges: `Impulsiveness, impatience, aggression, arrogance, recklessness`,
      career: `Well-suited for entrepreneurship, military, sports, management, or any field requiring leadership and action.`,
      love: `Passionate, devoted, and expect loyalty from your partner. You value independence and appreciate a partner who matches your energy.`
    },
    'Taurus': {
      symbol: '♉',
      element: 'Earth',
      ruling_planet: 'Venus',
      dates: 'Apr 20 - May 20',
      description: `Taurus, the Bull, represents stability, reliability, and material prosperity. As a Taurus, you are grounded, practical, and possess strong values. Your ruling planet Venus gives you an appreciation for beauty, comfort, and the finer things in life. You are known for your steadfastness and loyalty. You build solid foundations in all aspects of your life and are committed to long-term security.`,
      characteristics: `You are reliable, dependable, and possess excellent financial acumen. Your practical approach to life ensures stability and success. You have a keen eye for beauty and aesthetics. You are patient, determined, and willing to work hard for your goals. Your loyalty to friends and family is unmatched. However, you can be stubborn and resistant to change.`,
      strengths: `Stability, reliability, loyalty, practicality, patience, determination, sensuality`,
      challenges: `Stubbornness, possessiveness, laziness, material attachment, resistance to change`,
      career: `Well-suited for banking, finance, real estate, farming, arts, beauty, or any field requiring stability and reliability.`,
      love: `Loyal, devoted, and seek long-term commitment. You value security and appreciate partners who are dependable and stable.`
    },
    'Gemini': {
      symbol: '♊',
      element: 'Air',
      ruling_planet: 'Mercury',
      dates: 'May 21 - Jun 20',
      description: `Gemini, the Twins, represents communication, intellect, and versatility. As a Gemini, you are highly intelligent, curious, and possess excellent communication skills. Your ruling planet Mercury makes you an excellent speaker and writer. You are adaptable, witty, and enjoy mental stimulation. Your versatile nature allows you to excel in various fields and easily adjust to new situations.`,
      characteristics: `You are quick-witted, intelligent, and possess an excellent memory. Your communication skills are exceptional, making you an effective teacher, writer, or speaker. You are curious about the world and enjoy learning new things. Your social nature makes you excellent at networking. You are adaptable and flexible. However, you can be inconsistent, superficial, and struggle with commitment.`,
      strengths: `Communication, intelligence, adaptability, curiosity, wit, versatility, social skills`,
      challenges: `Inconsistency, superficiality, nervousness, restlessness, indecision`,
      career: `Well-suited for journalism, writing, teaching, sales, trade, or any field requiring communication and intellectual engagement.`,
      love: `Seek mental connection and intellectual stimulation. You value communication and appreciate partners who can engage you in meaningful conversations.`
    },
    'Cancer': {
      symbol: '♋',
      element: 'Water',
      ruling_planet: 'Moon',
      dates: 'Jun 21 - Jul 22',
      description: `Cancer, the Crab, represents emotions, intuition, and home. As a Cancer, you are deeply emotional, intuitive, and nurturing. Your ruling planet Moon gives you strong emotional intelligence and psychic abilities. You are naturally protective of your loved ones and create warm, nurturing environments. Your strong connection to family and home makes you sentimental and deeply attached to your roots.`,
      characteristics: `You are highly emotional, intuitive, and possess excellent empathetic abilities. Your nurturing nature makes you an excellent caregiver and counselor. You are imaginative, creative, and possess strong artistic talents. You are loyal to family and friends. Your home is your sanctuary, and you invest deeply in creating a comfortable environment. However, you can be overly sensitive, moody, and tend to hold onto the past.`,
      strengths: `Emotional intelligence, intuition, nurturing, creativity, loyalty, empathy, imagination`,
      challenges: `Moodiness, oversensitivity, clinginess, pessimism, difficulty letting go`,
      career: `Well-suited for counseling, healthcare, hospitality, arts, childcare, or any field involving emotional support and creativity.`,
      love: `Deeply emotional, devoted, and seek security in relationships. You value emotional connection and appreciate partners who understand your sensitive nature.`
    },
    'Leo': {
      symbol: '♌',
      element: 'Fire',
      ruling_planet: 'Sun',
      dates: 'Jul 23 - Aug 22',
      description: `Leo, the Lion, represents creativity, confidence, and self-expression. As a Leo, you are naturally charismatic, confident, and possess strong creative abilities. Your ruling planet Sun gives you a radiant personality and natural leadership qualities. You have a strong sense of self-worth and are not afraid to shine and be noticed. Your generous and warm-hearted nature makes you beloved by those around you.`,
      characteristics: `You are confident, charismatic, and possess strong creative talents. Your natural leadership abilities make you excellent in positions of authority. You are generous, warm-hearted, and enjoy helping others. Your love for drama and grandeur makes life around you exciting. You are proud, dignified, and value recognition. However, you can be arrogant, overly proud, and need constant admiration.`,
      strengths: `Creativity, confidence, leadership, generosity, charisma, pride, self-expression`,
      challenges: `Arrogance, pride, need for attention, stubbornness, vanity`,
      career: `Well-suited for entertainment, arts, management, education, politics, or any field that allows self-expression and leadership.`,
      love: `Passionate, devoted, and seek admiration from your partner. You value loyalty and appreciate partners who recognize your worth.`
    },
    'Virgo': {
      symbol: '♍',
      element: 'Earth',
      ruling_planet: 'Mercury',
      dates: 'Aug 23 - Sep 22',
      description: `Virgo, the Virgin, represents service, analysis, and perfectionism. As a Virgo, you are detail-oriented, analytical, and possess excellent organizational skills. Your ruling planet Mercury makes you intelligent and excellent at problem-solving. You have a strong desire to help others and improve situations. Your practical approach to life ensures efficiency and excellence in whatever you undertake.`,
      characteristics: `You are intelligent, analytical, and possess excellent organizational skills. Your attention to detail ensures quality in all your work. You have a strong sense of service and enjoy helping others. You are practical, efficient, and have an excellent eye for spotting errors or improvements. Your logical approach aids decision-making. However, you can be overly critical, perfectionistic, and prone to anxiety.`,
      strengths: `Analysis, organization, attention to detail, service, efficiency, practicality, intelligence`,
      challenges: `Perfectionism, criticism, anxiety, overthinking, overly critical nature`,
      career: `Well-suited for healthcare, education, research, writing, accounting, or any field requiring precision and analytical skills.`,
      love: `Seek intellectual connection and appreciate partners who value stability. You express love through acts of service and reliability.`
    },
    'Libra': {
      symbol: '♎',
      element: 'Air',
      ruling_planet: 'Venus',
      dates: 'Sep 23 - Oct 22',
      description: `Libra, the Scales, represents balance, harmony, and justice. As a Libra, you are naturally diplomatic, fair-minded, and possess strong aesthetic sensibilities. Your ruling planet Venus gives you an appreciation for beauty, art, and harmonious relationships. You have an excellent ability to see multiple perspectives and find common ground. Your desire for balance and justice makes you an advocate for peace and equality.`,
      characteristics: `You are diplomatic, fair-minded, and possess excellent social skills. Your aesthetic sense is refined, and you appreciate beauty in all forms. You are charming, graceful, and excel at creating harmonious environments. Your ability to see multiple perspectives makes you an excellent mediator. You value relationships highly. However, you can be indecisive, overly people-pleasing, and struggle with confrontation.`,
      strengths: `Diplomacy, balance, justice, charm, social skills, aesthetics, fairness`,
      challenges: `Indecision, people-pleasing, avoidance of confrontation, superficiality`,
      career: `Well-suited for law, diplomacy, arts, design, counseling, or any field involving negotiation and aesthetics.`,
      love: `Seek balance and harmony in relationships. You value partnership and appreciate lovers who can engage in meaningful discussions.`
    },
    'Scorpio': {
      symbol: '♏',
      element: 'Water',
      ruling_planet: 'Mars',
      dates: 'Oct 23 - Nov 21',
      description: `Scorpio, the Scorpion, represents intensity, transformation, and power. As a Scorpio, you are deeply mysterious, intense, and possess powerful emotional depth. Your ruling planet Mars gives you determination and strength. You have an excellent ability to see beneath the surface and understand hidden truths. Your transformative nature allows you to emerge stronger from life's challenges.`,
      characteristics: `You are intense, mysterious, and possess powerful emotional depth. Your determination and willpower are exceptional. You have an excellent ability to understand complex situations and hidden motivations. Your loyalty to those you trust is absolute. You are passionate about your pursuits. Your secretive nature protects your inner world. However, you can be overly secretive, jealous, and prone to holding grudges.`,
      strengths: `Intensity, determination, power, loyalty, passion, insight, transformation`,
      challenges: `Jealousy, possessiveness, secretiveness, vindictiveness, emotional intensity`,
      career: `Well-suited for research, psychology, investigation, finance, transformation work, or any field requiring deep analysis and determination.`,
      love: `Deeply passionate, loyal, and seek profound emotional connection. You value trust and exclusivity in relationships.`
    },
    'Sagittarius': {
      symbol: '♐',
      element: 'Fire',
      ruling_planet: 'Jupiter',
      dates: 'Nov 22 - Dec 21',
      description: `Sagittarius, the Archer, represents adventure, wisdom, and expansion. As a Sagittarius, you are naturally optimistic, adventurous, and possess a strong desire for knowledge and growth. Your ruling planet Jupiter gives you a broad perspective and excellent luck. You are a natural philosopher and truth-seeker. Your expansive nature drives you to explore new horizons and embrace diverse experiences.`,
      characteristics: `You are optimistic, adventurous, and possess a strong desire for freedom and exploration. Your philosophical nature drives you to seek deeper meanings. You are honest, straightforward, and appreciate directness in others. Your enthusiasm is contagious and inspires others. Your luck seems almost magical. However, you can be overly blunt, tactless, and prone to overcommitment.`,
      strengths: `Optimism, adventure, wisdom, expansion, luck, honesty, enthusiasm`,
      challenges: `Bluntness, overcommitment, tactlessness, recklessness, scattered focus`,
      career: `Well-suited for teaching, travel, publishing, philosophy, sports, or any field involving exploration and expansion.`,
      love: `Seek freedom and adventure in relationships. You value partners who share your optimism and love of exploration.`
    },
    'Capricorn': {
      symbol: '♑',
      element: 'Earth',
      ruling_planet: 'Saturn',
      dates: 'Dec 22 - Jan 19',
      description: `Capricorn, the Goat, represents ambition, discipline, and achievement. As a Capricorn, you are naturally ambitious, disciplined, and possess strong organizational skills. Your ruling planet Saturn gives you wisdom, patience, and a long-term perspective. You are pragmatic, responsible, and committed to achieving your goals. Your steady climb toward success is admirable and consistent.`,
      characteristics: `You are ambitious, disciplined, and possess excellent organizational and management skills. Your pragmatic approach ensures success in your endeavors. You are responsible, reliable, and possess strong self-control. Your long-term vision allows you to build lasting success. You are patient and willing to work hard for your goals. However, you can be overly serious, pessimistic, and emotionally reserved.`,
      strengths: `Ambition, discipline, responsibility, pragmatism, patience, success-orientation`,
      challenges: `Pessimism, emotional coldness, overly serious, rigid, workaholic tendencies`,
      career: `Well-suited for management, government, business, law, engineering, or any field requiring discipline and long-term planning.`,
      love: `Seek stability and commitment in relationships. You express love through dedication and reliability rather than emotional displays.`
    },
    'Aquarius': {
      symbol: '♒',
      element: 'Air',
      ruling_planet: 'Saturn',
      dates: 'Jan 20 - Feb 18',
      description: `Aquarius, the Water Bearer, represents innovation, independence, and humanitarianism. As an Aquarius, you are naturally progressive, innovative, and possess a strong desire to make the world a better place. Your ruling planet Saturn gives you discipline and long-term vision. You are independent, intellectual, and value freedom highly. Your unique perspective and visionary nature make you ahead of your time.`,
      characteristics: `You are independent, innovative, and possess a strong desire for freedom. Your intellectual nature drives you to explore new ideas and technologies. You are humanitarian and value the greater good. You are unconventional and not afraid to be different. Your humanitarian concerns extend to the collective welfare. However, you can be emotionally detached, stubborn, and overly intellectual.`,
      strengths: `Innovation, independence, humanitarianism, intellectual ability, progressiveness, uniqueness`,
      challenges: `Emotional detachment, stubbornness, unpredictability, aloofness`,
      career: `Well-suited for technology, science, humanitarian work, innovation, or any field involving progressive ideas and social change.`,
      love: `Seek intellectual connection and freedom in relationships. You value independence and appreciate partners who respect your individuality.`
    },
    'Pisces': {
      symbol: '♓',
      element: 'Water',
      ruling_planet: 'Jupiter',
      dates: 'Feb 19 - Mar 20',
      description: `Pisces, the Fish, represents compassion, creativity, and spirituality. As a Pisces, you are naturally compassionate, creative, and deeply spiritual. Your ruling planet Jupiter gives you optimism and a broad perspective. You are intuitive, artistic, and possess strong psychic abilities. Your compassionate nature drives you to help others and make a positive difference in the world.`,
      characteristics: `You are compassionate, empathetic, and possess excellent intuitive abilities. Your creativity flows naturally and often finds artistic expression. You are spiritual and seek deeper meanings. Your gentle nature makes you beloved by many. Your dreams and imagination are vivid. Your sacrifice for others is admirable. However, you can be overly idealistic, escapist, and prone to illusions.`,
      strengths: `Compassion, creativity, spirituality, intuition, imagination, empathy, artistic ability`,
      challenges: `Escapism, idealism, gullibility, overly sensitive, victim mentality`,
      career: `Well-suited for arts, music, healing professions, spirituality, counseling, or any field involving creativity and compassion.`,
      love: `Deeply compassionate, romantic, and seek spiritual connection. You value emotional intimacy and appreciate partners who understand your sensitive nature.`
    }
  };

  const calculateKundli = () => {
    if (!formData.name || !formData.dateOfBirth || !formData.timeOfBirth || !formData.placeOfBirth) {
      alert('Please fill all required fields');
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

      const allSigns = Object.keys(zodiacDetails);
      const sunSignData = zodiacDetails[sunSign];
      const ascendantIndex = Math.floor((parseInt(hours) / 24) * 12) % allSigns.length;
      const ascendant = zodiacDetails[allSigns[ascendantIndex]];
      const moonIndex = Math.floor((parseInt(day) / 31) * 12) % allSigns.length;
      const moon = zodiacDetails[allSigns[moonIndex]];

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
        title="Free Kundli - Birth Chart Analysis - Happy Kismat"
        description="Generate your free Kundli (birth chart) with complete planetary positions, houses, and astrological analysis."
      />

      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/free-kundli-tools" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Free Tools
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">📊 Free Kundli Generator</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get your complete birth chart analysis with detailed zodiac sign descriptions and astrological insights.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {!result ? (
            <Card className="p-8 border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">Birth Information</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time of Birth (24h) *</label>
                    <input
                      type="time"
                      value={formData.timeOfBirth}
                      onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Place of Birth *</label>
                    <input
                      type="text"
                      value={formData.placeOfBirth}
                      onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                      placeholder="City, Country"
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your email (optional)"
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Your phone (optional)"
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <Button
                  onClick={calculateKundli}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
                >
                  {loading ? 'Generating Kundli...' : 'Generate Free Kundli'}
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Quick Summary */}
              <Card className="p-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">Your Birth Chart</h2>
                <p className="text-lg text-gray-700 mb-4">Native Name: <strong>{result.name}</strong></p>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-lg border-2 border-yellow-200">
                    <p className="text-xs text-gray-600 uppercase mb-3">☀️ Sun Sign</p>
                    <p className="text-2xl font-bold text-orange-600 mb-1">{result.sunSign.name}</p>
                    <p className="text-sm text-gray-600">{result.sunSign.element} • {result.sunSign.ruling_planet}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-slate-200">
                    <p className="text-xs text-gray-600 uppercase mb-3">🌙 Moon Sign</p>
                    <p className="text-2xl font-bold text-slate-600 mb-1">{result.moon.name}</p>
                    <p className="text-sm text-gray-600">{result.moon.element} • {result.moon.ruling_planet}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                    <p className="text-xs text-gray-600 uppercase mb-3">⬆️ Ascendant</p>
                    <p className="text-2xl font-bold text-green-600 mb-1">{result.ascendant.name}</p>
                    <p className="text-sm text-gray-600">{result.ascendant.element} • {result.ascendant.ruling_planet}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-gray-200 text-center">
                  <p className="text-xs text-gray-600 uppercase mb-2">Birth Information</p>
                  <p className="text-sm text-gray-700"><strong>Date:</strong> {result.birthDate}</p>
                  <p className="text-sm text-gray-700"><strong>Time:</strong> {result.birthTime}</p>
                  <p className="text-sm text-gray-700"><strong>Place:</strong> {result.birthPlace}</p>
                </div>
              </Card>

              {/* Detailed Sign Descriptions */}
              {[
                { title: '☀️ Sun Sign', data: result.sunSign, icon: 'Sun' },
                { title: '🌙 Moon Sign', data: result.moon, icon: 'Moon' },
                { title: '⬆️ Ascendant', data: result.ascendant, icon: 'Ascendant' }
              ].map((sign, idx) => (
                <Card key={idx} className="p-8 border-2 border-purple-200 bg-white">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">{sign.title} - {sign.data.name}</h3>

                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <div>
                      <h4 className="font-bold text-lg text-purple-900 mb-2">Overview</h4>
                      <p>{sign.data.description}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg text-purple-900 mb-2">Characteristics</h4>
                      <p>{sign.data.characteristics}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-purple-900 mb-2">Strengths</h4>
                        <p className="text-sm">{sign.data.strengths}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-purple-900 mb-2">Challenges</h4>
                        <p className="text-sm">{sign.data.challenges}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-purple-900 mb-2">💼 Career & Profession</h4>
                      <p className="text-sm">{sign.data.career}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-purple-900 mb-2">💕 Love & Relationships</h4>
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
                Generate Another Kundli
              </Button>

              {/* CTA */}
              <Card className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-700">
                <p className="mb-3">Want a detailed professional analysis?</p>
                <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold">
                  Book Personal Consultation
                </Button>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FreeKundli;
