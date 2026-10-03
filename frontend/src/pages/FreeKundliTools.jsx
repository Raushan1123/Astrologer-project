import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, BookOpen, Moon, Sun, Calendar, Globe, FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const FreeKundliTools = () => {
  const tools = [
    {
      id: 1,
      title: 'Free Kundli',
      description: 'Complete birth chart analysis with planetary positions, houses, and aspects',
      icon: FileText,
      color: 'from-purple-600 to-indigo-600',
      link: '/kundli',
      features: ['Birth Chart', 'Planetary Positions', 'House Analysis', 'Aspect Grid']
    },
    {
      id: 2,
      title: 'Your Nakshatra',
      description: 'Discover your lunar mansion and its astrological significance',
      icon: Moon,
      color: 'from-slate-700 to-blue-600',
      link: '/nakshatra',
      features: ['Lunar Mansion', 'Characteristics', 'Compatibility', 'Lucky Elements']
    },
    {
      id: 3,
      title: 'Daily Horoscope',
      description: 'Get personalized daily predictions based on your zodiac sign',
      icon: Sun,
      color: 'from-yellow-500 to-orange-500',
      link: '/daily-horoscope',
      features: ['Daily Predictions', 'Lucky Hours', 'Do\'s & Don\'ts', 'Advice']
    },
    {
      id: 4,
      title: 'Monthly Horoscope',
      description: 'Detailed monthly astrological predictions and guidance',
      icon: Calendar,
      color: 'from-pink-500 to-rose-500',
      link: '/monthly-horoscope',
      features: ['Month Overview', 'Week-by-Week', 'Remedies', 'Guidance']
    },
    {
      id: 5,
      title: 'Yearly Horoscope',
      description: 'Comprehensive year-long astrological predictions and insights',
      icon: Globe,
      color: 'from-green-600 to-emerald-600',
      link: '/yearly-horoscope',
      features: ['Year Overview', 'Quarterly Analysis', 'Career', 'Health', 'Relationships']
    },
    {
      id: 6,
      title: 'Kundli in Hindi',
      description: 'हिंदी में कुंडली विश्लेषण - Complete birth chart in Hindi',
      icon: BookOpen,
      color: 'from-orange-600 to-red-600',
      link: '/kundli-hindi',
      features: ['हिंदी भाषा', 'पूर्ण विश्लेषण', 'सभी सुविधाएं', 'विस्तृत रिपोर्ट']
    },
    {
      id: 7,
      title: 'Panchang',
      description: 'Hindu calendar with Tithi, Nakshatra, Yoga, Karana, Chaughadiya & Hora',
      icon: Clock,
      color: 'from-cyan-600 to-blue-600',
      link: '/panchang',
      features: ['Tithi & Nakshatra', 'Chaughadiya', 'Hora Muhurta', 'Location-Based']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Free Kundli Tools - Happy Kismat"
        description="Free Kundli, Nakshatra Calculator, Daily/Monthly/Yearly Horoscope and more free astrology tools"
      />

      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">🔮 Free Kundli Tools</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access authentic Vedic astrology tools completely free. Get accurate birth chart analysis, horoscopes,
              and astrological insights powered by traditional Vedic wisdom.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.id} to={tool.link}>
                  <Card className="p-6 h-full border-2 border-purple-200 hover:border-purple-500 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className={`bg-gradient-to-r ${tool.color} p-4 rounded-lg mb-4 w-fit`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-purple-900 mb-2">{tool.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{tool.description}</p>

                    <div className="space-y-2 mb-6">
                      {tool.features.map((feature, idx) => (
                        <p key={idx} className="text-xs text-gray-700 flex items-center gap-2">
                          <span className="text-purple-600">✓</span> {feature}
                        </p>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold">
                      Explore Tool →
                    </Button>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Use Our Tools */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Why Use Our Free Kundli Tools?</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-900 mb-3">✨ Authentic Vedic Astrology</h3>
              <p className="text-gray-700 text-sm">
                Based on traditional Vedic principles and ancient astrological texts for accurate results.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-blue-500">
              <h3 className="font-bold text-purple-900 mb-3">🎯 Accurate Calculations</h3>
              <p className="text-gray-700 text-sm">
                Precise planetary position calculations using advanced astrological algorithms.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-green-500">
              <h3 className="font-bold text-purple-900 mb-3">💰 100% Free</h3>
              <p className="text-gray-700 text-sm">
                All tools are completely free to use with no hidden charges or premium versions.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-orange-500">
              <h3 className="font-bold text-purple-900 mb-3">📱 Mobile Friendly</h3>
              <p className="text-gray-700 text-sm">
                Access all tools from any device with responsive design and easy navigation.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-red-500">
              <h3 className="font-bold text-purple-900 mb-3">🌍 Multiple Languages</h3>
              <p className="text-gray-700 text-sm">
                Tools available in English and Hindi for wider accessibility.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-yellow-500">
              <h3 className="font-bold text-purple-900 mb-3">📊 Detailed Reports</h3>
              <p className="text-gray-700 text-sm">
                Comprehensive analysis with detailed interpretations and guidance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">How to Use These Tools</h2>

          <div className="space-y-4">
            {[
              { step: 1, title: 'Provide Birth Details', desc: 'Enter your date, time, and place of birth for accurate calculations' },
              { step: 2, title: 'Select Desired Tool', desc: 'Choose which astrological analysis you want to explore' },
              { step: 3, title: 'Get Detailed Results', desc: 'Receive comprehensive interpretations and astrological insights' },
              { step: 4, title: 'Book Consultation', desc: 'Optionally book a consultation for personalized guidance' }
            ].map((item) => (
              <Card key={item.step} className="p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Need Professional Guidance?</h2>
          <p className="text-white mb-8 text-lg">
            While our free tools provide excellent insights, a personalized consultation with our expert astrologers
            can give you deeper understanding and tailored advice.
          </p>
          <Link to="/booking">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg">
              Book Consultation Now →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FreeKundliTools;
