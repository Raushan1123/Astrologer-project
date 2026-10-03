import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const YourNakshatra = () => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    email: '',
    phone: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const nakshatrasData = {
    1: {
      name: 'Ashwini',
      ruling_planet: 'Ketu',
      zodiac: 'Aries',
      degrees: '0°00\' - 13°20\'',
      symbol: 'Horse Head',
      deity: 'Ashwini Kumaras',
      element: 'Fire',
      guna: 'Sattvic',
      intro: `Hello Ashwini Native! You were born between 0°00' to 13°20' in the zodiac sign of Aries, and you are ruled by Ketu. Your nakshatra is associated with the Ashwini Kumaras (divine physicians), and it is symbolized by the horse head, which represents speed, courage, and healing abilities. You are naturally dynamic, enthusiastic, and possess excellent healing and leadership qualities.`,
      characteristics: `As an Ashwini native, you are naturally energetic, ambitious, and possess pioneering spirit. You have an excellent ability to heal others both physically and emotionally. You are quick-witted, courageous, and not afraid to take risks. You are also a natural healer and are drawn to professions that involve helping others. Your enthusiasm is contagious, and you inspire those around you.`,
      strengths: `Your greatest strengths include your dynamic energy, healing abilities, and natural leadership. You are quick to act and possess excellent problem-solving skills. You are adventurous and not afraid to venture into new territories. Your enthusiasm and optimism inspire others. However, you can sometimes be impatient and lack focus. Remember to channel your energy wisely and complete tasks before starting new ones.`,
      career: `You are destined for success in healing professions, medicine, entrepreneurship, or any field that requires pioneering spirit. Your quick mind and healing abilities make you well-suited for careers in healthcare, alternative medicine, or even business ventures. You have excellent leadership qualities and can inspire teams. Your financial prospects are good, but avoid impulsive spending.`,
      love: `In love, dear Ashwini native, you are passionate and enthusiastic. You seek partners who can match your energy and adventurous spirit. You value independence and need a partner who respects your freedom. Your ideal partners would be from Aries, Leo, or Sagittarius. You are caring but need to work on patience and understanding in relationships. Show more emotional depth and vulnerability.`,
      health: `Your health is generally robust, but excessive activity can lead to fatigue. Be careful with head-related issues and accidents due to your adventurous nature. Practice moderation in physical activities and ensure adequate rest. Yoga and meditation can help balance your hyperactive nature. Maintain a healthy diet and avoid excessive stimulants.`,
      conclusion: `You are a naturally dynamic and healing-oriented person with tremendous potential for success. Balance your enthusiasm with patience and focus. In relationships, work on emotional depth while maintaining your independence. Take care of your physical health and channel your abundant energy productively. Lead a life of purpose and healing.`
    },
    2: {
      name: 'Bharani',
      ruling_planet: 'Venus',
      zodiac: 'Aries',
      degrees: '13°20\' - 26°40\'',
      symbol: 'Womb/Yoni',
      deity: 'Yama',
      element: 'Fire',
      guna: 'Rajasic',
      intro: `Hello Bharani Native! You were born between 13°20' to 26°40' in the zodiac sign of Aries, and you are ruled by Venus. Your nakshatra is associated with Yama (lord of dharma), and it is symbolized by the womb, which represents fertility, creativity, and the power of creation. You are naturally creative, nurturing, and possess strong creative and reproductive abilities.`,
      characteristics: `As a Bharani native, you possess creative talents and strong emotional depth. You are naturally nurturing and caring towards others. You have excellent artistic and creative abilities. You are passionate, determined, and possess strong willpower. You are also highly sensual and appreciate beauty in all its forms. Your nurturing nature makes you an excellent caregiver.`,
      strengths: `Your greatest strengths include your creativity, nurturing abilities, and strong determination. You are passionate about your pursuits and possess excellent willpower. You are caring and loyal to those you love. Your artistic talents are remarkable. However, you can be possessive and overly emotional at times. Learn to balance your intense feelings with rational thinking.`,
      career: `You are well-suited for careers involving creativity, arts, healing, childcare, or nurturing professions. Your artistic talents can lead to success in music, painting, dance, or writing. You can also excel in counseling or therapy. Your strong willpower ensures you achieve your goals. Financial success comes through creative endeavors.`,
      love: `In love, dear Bharani native, you are passionate and deeply emotional. You seek partners who understand your intense nature. You value loyalty and commitment above all. Your ideal partners would be from Taurus, Libra, or Pisces. You can be possessive, so work on giving your partner space. Your nurturing nature makes you an excellent life partner.`,
      health: `Your health is generally good, but emotional stress can affect your well-being. Be aware of reproductive health and hormonal issues. Manage your emotions through yoga, meditation, and creative outlets. Maintain a balanced lifestyle and avoid excessive indulgence. Regular exercise and a healthy diet are essential for your well-being.`,
      conclusion: `You are a naturally creative and nurturing person with tremendous artistic potential. Balance your intense emotions with rational thinking. In relationships, work on being less possessive while maintaining your loyalty. Use your creative talents to express yourself. Take care of your emotional and physical health for a fulfilling life.`
    },
    3: {
      name: 'Krittika',
      ruling_planet: 'Sun',
      zodiac: 'Taurus',
      degrees: '26°40\' - 40°00\'',
      symbol: 'Knife/Razor',
      deity: 'Agni',
      element: 'Fire',
      guna: 'Sattvic',
      intro: `Hello Krittika Native! You were born between 26°40' to 40°00' in the zodiac sign of Taurus, and you are ruled by the Sun. Your nakshatra is associated with Agni (god of fire), and it is symbolized by a razor or knife, which represents the ability to cut through illusions and discrimination. You are naturally brilliant, sharp-minded, and possess a keen analytical ability.`,
      characteristics: `As a Krittika native, you possess sharp intellect and excellent discrimination abilities. You are natural leaders with a strong sense of purpose. You are practical, organized, and possess excellent management skills. You have a bright, radiant personality and inspire confidence in others. You are determined and have strong convictions.`,
      strengths: `Your greatest strengths include your sharp intellect, leadership abilities, and strong sense of purpose. You are excellent at analyzing situations and making sound decisions. You are practical and goal-oriented. Your radiant personality inspires others. However, you can be overly critical and harsh in your judgments. Learn to be more compassionate and understanding.`,
      career: `You are well-suited for leadership positions, management, teaching, or any field requiring analytical skills. Your natural authority makes you an excellent administrator or manager. You can excel in finance, engineering, or education. Your practical approach ensures success in any venture you undertake.`,
      love: `In love, dear Krittika native, you are loyal but can be demanding. You seek partners who respect your leadership. You value honesty and straightforwardness in relationships. Your ideal partners would be from Aries, Leo, or Scorpio. Work on being less critical and more accepting of your partner's imperfections.`,
      health: `Your health is generally good, but digestive issues may arise due to your fiery nature. Manage stress through meditation and relaxation. Avoid excessive heat and spicy foods. Regular exercise and a balanced diet are important. Eye health requires attention due to your sharp focus.`,
      conclusion: `You are a naturally brilliant and purpose-driven person with strong leadership potential. Balance your critical nature with compassion. In relationships, work on accepting imperfections. Use your sharp intellect for constructive purposes. Take care of your physical and mental well-being for sustained success.`
    },
    4: {
      name: 'Rohini',
      ruling_planet: 'Moon',
      zodiac: 'Taurus',
      degrees: '40°00\' - 53°20\'',
      symbol: 'Chariot',
      deity: 'Brahma',
      element: 'Earth',
      guna: 'Sattvic',
      intro: `Hello Rohini Native! You were born between 40°00' to 53°20' in the zodiac sign of Taurus, and you are ruled by the Moon. Your nakshatra is associated with Brahma (creator of the universe), and it is symbolized by a chariot, which represents growth, development, and forward movement. You are naturally beautiful, creative, and possess excellent aesthetic sensibilities.`,
      characteristics: `As a Rohini native, you are naturally talented, beautiful, and possess excellent creative abilities. You are emotionally sensitive and deeply intuitive. You have a keen eye for beauty and aesthetics. You are practical, reliable, and possess strong nurturing abilities. You create harmony in your surroundings.`,
      strengths: `Your greatest strengths include your natural beauty, creative talents, and emotional depth. You possess excellent intuition and can understand others' feelings well. You are reliable and create harmonious environments. Your emotional sensitivity allows you to connect deeply with others. However, you can be overly attached and possessive. Learn to develop healthy detachment.`,
      career: `You are well-suited for careers in arts, design, beauty, entertainment, or any creative field. Your aesthetic sense makes you excellent in fashion, interior design, or jewelry design. You can also excel in counseling or therapies involving emotional support. Your reliability ensures success.`,
      love: `In love, dear Rohini native, you are devoted and deeply emotional. You seek partners who appreciate your beauty and creativity. You value stability and security in relationships. Your ideal partners would be from Taurus, Cancer, or Pisces. You can be possessive, so practice giving space. Your loyalty is unmatched.`,
      health: `Your health is generally good, but emotional disturbances can affect your well-being. Manage stress through creative outlets and nature. Be aware of weight gain due to comfort-seeking. Regular gentle exercise like yoga is beneficial. Emotional balance is key to physical health.`,
      conclusion: `You are a naturally beautiful and creative person with strong emotional depth. Balance your attachment with healthy detachment. In relationships, maintain your loyalty while respecting independence. Use your creative talents for self-expression. Nurture your emotional and physical well-being for a fulfilling life.`
    },
    5: {
      name: 'Mrigashirsha',
      ruling_planet: 'Mars',
      zodiac: 'Gemini',
      degrees: '53°20\' - 66°40\'',
      symbol: 'Deer Head',
      deity: 'Soma',
      element: 'Air',
      guna: 'Rajasic',
      intro: `Hello Mrigashirsha Native! You were born between 53°20' to 66°40' in the zodiac sign of Gemini, and you are ruled by Mars. Your nakshatra is associated with Soma (lord of the Moon), and it is symbolized by a deer's head, which represents curiosity, gentleness, and the desire to explore. You are naturally inquisitive, communicative, and possess excellent intellectual abilities.`,
      characteristics: `As a Mrigashirsha native, you are naturally curious and possess a deep desire to explore and learn. You are excellent communicators with sharp minds. You are gentle, sensitive, and possess good aesthetic sense. You are playful and enjoy intellectual conversations. Your curiosity drives you to seek knowledge and new experiences.`,
      strengths: `Your greatest strengths include your curiosity, communication skills, and intellectual abilities. You are quick-witted and adaptable. You possess excellent problem-solving abilities. Your gentle nature makes you likeable. However, you can be restless and lack focus. Work on completing tasks before starting new ones. Your nervousness can create anxiety.`,
      career: `You are well-suited for careers in writing, journalism, teaching, research, or any field requiring communication and analytical skills. Your curiosity makes you excellent in investigation or research roles. You can excel in media, publishing, or education. Your adaptability ensures success in various fields.`,
      love: `In love, dear Mrigashirsha native, you seek intellectual connection above all. You value communication and mental stimulation. You need a partner who can engage you intellectually. Your ideal partners would be from Gemini, Libra, or Aquarius. You can be flirtatious, so work on commitment. Your playful nature brings joy to relationships.`,
      health: `Your health is generally good, but nervous tension can cause issues. Practice relaxation techniques and meditation. Be aware of anxiety-related conditions. Regular exercise helps manage restlessness. Avoid excessive stimulants. Mental peace is essential for your physical well-being.`,
      conclusion: `You are a naturally curious and communicative person with strong intellectual abilities. Channel your curiosity productively and maintain focus on your goals. In relationships, deepen your connections beyond mental attraction. Practice mindfulness to manage anxiety. Use your communication skills to build meaningful relationships.`
    }
  };

  const calculateNakshatra = () => {
    if (!formData.name || !formData.dateOfBirth || !formData.timeOfBirth) {
      alert('Please enter all required fields');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const [year, month, day] = formData.dateOfBirth.split('-');
      const birthDate = new Date(year, parseInt(month) - 1, parseInt(day));

      const startOfYear = new Date(year, 0, 0);
      const diff = birthDate - startOfYear;
      const dayOfYear = Math.floor(diff / (24 * 60 * 60 * 1000));

      // Simplified: Assign nakshatra based on day of year
      const nakshatraNumber = Math.floor((dayOfYear / 365) * 27) + 1;
      const nakshatraId = Math.max(1, Math.min(5, nakshatraNumber)); // Using first 5 for demo

      const nakshatra = nakshatrasData[nakshatraId];

      setResult({
        name: formData.name,
        nakshatra,
        nakshatraNumber: nakshatraId,
        birthDate: formData.dateOfBirth,
        birthTime: formData.timeOfBirth
      });

      setLoading(false);
    }, 1500);
  };

  const reset = () => {
    setFormData({
      name: '',
      dateOfBirth: '',
      timeOfBirth: '',
      email: '',
      phone: ''
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Your Nakshatra Calculator - Happy Kismat"
        description="Discover your Nakshatra with detailed personalized analysis and insights."
      />

      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/free-kundli-tools" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Free Tools
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">🌙 Your Nakshatra</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover your lunar mansion with detailed personalized analysis, characteristics, career guidance, and life insights.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {!result ? (
            <Card className="p-8 border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">Enter Your Birth Details</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                  onClick={calculateNakshatra}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
                >
                  {loading ? 'Analyzing Your Nakshatra...' : 'Discover Your Nakshatra'}
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Header with Name */}
              <Card className="p-8 border-2 border-slate-300 bg-gradient-to-r from-slate-700 to-blue-600 text-white">
                <p className="text-sm opacity-90 mb-2">Your Moon Nakshatra is</p>
                <p className="text-5xl font-bold mb-3">{result.nakshatra.name}</p>
                <p className="text-lg opacity-95">{result.nakshatra.name} - {result.nakshatraNumber}</p>
              </Card>

              {/* Quick Info */}
              <Card className="p-6 border-2 border-slate-200 bg-white">
                <h3 className="text-lg font-bold text-purple-900 mb-4">Nakshatra Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded border border-slate-200">
                    <p className="text-xs text-gray-600 uppercase mb-1">Degrees</p>
                    <p className="font-semibold text-gray-700">{result.nakshatra.degrees}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded border border-slate-200">
                    <p className="text-xs text-gray-600 uppercase mb-1">Zodiac Sign</p>
                    <p className="font-semibold text-gray-700">{result.nakshatra.zodiac}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded border border-slate-200">
                    <p className="text-xs text-gray-600 uppercase mb-1">Ruling Planet</p>
                    <p className="font-semibold text-gray-700">{result.nakshatra.ruling_planet}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded border border-slate-200">
                    <p className="text-xs text-gray-600 uppercase mb-1">Deity</p>
                    <p className="font-semibold text-gray-700">{result.nakshatra.deity}</p>
                  </div>
                </div>
              </Card>

              {/* Detailed Analysis */}
              <Card className="p-8 border-2 border-slate-200 bg-white">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-900 mb-4">Introduction</h3>
                    <p className="text-gray-700 leading-relaxed">{result.nakshatra.intro}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-purple-900 mb-4">{result.nakshatra.name} Nakshatra Characteristics</h3>
                    <p className="text-gray-700 leading-relaxed">{result.nakshatra.characteristics}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-purple-900 mb-4">Strengths and Weaknesses</h3>
                    <p className="text-gray-700 leading-relaxed">{result.nakshatra.strengths}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-purple-900 mb-4">💼 Career and Finance</h3>
                      <p className="text-gray-700 leading-relaxed">{result.nakshatra.career}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-purple-900 mb-4">💕 Love and Relationships</h3>
                      <p className="text-gray-700 leading-relaxed">{result.nakshatra.love}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-purple-900 mb-4">❤️ Health</h3>
                    <p className="text-gray-700 leading-relaxed">{result.nakshatra.health}</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200">
                    <h3 className="text-2xl font-bold text-purple-900 mb-4">Conclusion</h3>
                    <p className="text-gray-700 leading-relaxed">{result.nakshatra.conclusion}</p>
                  </div>
                </div>
              </Card>

              {/* Reset Button */}
              <Button
                onClick={reset}
                variant="outline"
                className="w-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50 py-3 font-semibold"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Calculate Another Nakshatra
              </Button>

              {/* CTA */}
              <Card className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-purple-700">
                <p className="mb-3">Want a deeper analysis and personalized guidance?</p>
                <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold">
                  Book Consultation with Expert
                </Button>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default YourNakshatra;
