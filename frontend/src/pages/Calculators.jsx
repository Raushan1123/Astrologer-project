import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowRight, Heart, Moon, Calculator, Zap, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';

const Calculators = () => {
  const calculators = [
    {
      id: 'flames',
      name: 'FLAMES Calculator',
      description: 'Discover your romantic relationship potential using the FLAMES method - a fun and engaging way to analyze compatibility.',
      icon: '🔥',
      color: 'from-red-500 to-orange-500',
      path: '/calculator/flames'
    },
    {
      id: 'love',
      name: 'Love Calculator',
      description: 'Calculate your love compatibility percentage with your partner based on astrological principles and numerology.',
      icon: '💕',
      color: 'from-pink-500 to-rose-500',
      path: '/calculator/love'
    },
    {
      id: 'ascendant',
      name: 'Ascendant (Rising Sign) Calculator',
      description: 'Find your rising sign based on birth time, date, and location. Understand how you appear to the world.',
      icon: '⬆️',
      color: 'from-purple-500 to-indigo-500',
      path: '/calculator/ascendant'
    },
    {
      id: 'horoscope',
      name: 'Horoscope Charts',
      description: 'Generate detailed horoscope charts showing planetary positions and their influence on your life.',
      icon: '📊',
      color: 'from-blue-500 to-cyan-500',
      path: '/calculator/horoscope-charts'
    },
    {
      id: 'lagna',
      name: 'Lagna (Ascendant) Calculator',
      description: 'Determine your Lagna (Vedic ascendant) and understand its significance in your birth chart.',
      icon: '🌅',
      color: 'from-amber-500 to-yellow-500',
      path: '/calculator/lagna'
    },
    {
      id: 'mangal-dosh',
      name: 'Mangal Dosh Calculator',
      description: 'Check if you have Mangal Dosh (Mars defect) in your birth chart and its implications for marriage.',
      icon: '🔴',
      color: 'from-red-600 to-red-700',
      path: '/calculator/mangal-dosh'
    },
    {
      id: 'kaal-sarp',
      name: 'Kaal Sarp Dosh Calculator',
      description: 'Analyze if Kaal Sarp Dosh is present in your birth chart and understand its effects on your life.',
      icon: '🐍',
      color: 'from-green-600 to-emerald-600',
      path: '/calculator/kaal-sarp-dosh'
    },
    {
      id: 'moon-phase',
      name: 'Moon Phase Calculator',
      description: 'Find the moon phase on any date and understand its astrological significance.',
      icon: '🌙',
      color: 'from-slate-600 to-blue-600',
      path: '/calculator/moon-phase'
    },
    {
      id: 'moon-calendar',
      name: 'Moon Phase Calendar',
      description: 'View the complete lunar calendar for any month with all moon phases and their dates.',
      icon: '📅',
      color: 'from-indigo-600 to-purple-600',
      path: '/calculator/moon-calendar'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Free Astrology Calculators - Happy Kismat"
        description="Use our free astrology calculators including FLAMES, love compatibility, ascendant, Mangal Dosh, Kaal Sarp Dosh, moon phases and more by Acharyaa Indira Pandey."
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=75&fm=webp&fit=crop&auto=format"
            alt="Calculators Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-amber-900/70 to-purple-900/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Free Astrology Calculators
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed">
              Explore our collection of powerful astrology calculators to gain insights into your birth chart, relationships, compatibility, and cosmic influences.
            </p>
            <div className="flex justify-center gap-2">
              <Zap className="w-6 h-6 text-amber-300" />
              <span className="text-amber-200 font-semibold">9 Free Tools Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.map((calc) => (
              <Card
                key={calc.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-100 group"
              >
                <div className={`bg-gradient-to-r ${calc.color} p-8 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 opacity-20 text-8xl transform translate-x-6 -translate-y-6">
                    {calc.icon}
                  </div>
                  <div className="text-5xl mb-4 relative z-10">{calc.icon}</div>
                  <h3 className="text-xl font-bold relative z-10">{calc.name}</h3>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed h-16">
                    {calc.description}
                  </p>
                  <Link to={calc.path}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transform hover:scale-105 transition-all duration-300">
                      Use Calculator
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-900 mb-4">Why Use Our Calculators?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: '🎯',
                title: 'Accurate Results',
                desc: 'Based on authentic Vedic astrology principles and precise calculations'
              },
              {
                icon: '⚡',
                title: 'Instant Insights',
                desc: 'Get immediate results with detailed interpretations and recommendations'
              },
              {
                icon: '🔒',
                title: 'Completely Free',
                desc: 'All calculators are 100% free to use without any hidden charges'
              }
            ].map((benefit, idx) => (
              <Card key={idx} className="p-8 text-center border-2 border-purple-100 hover:border-amber-300 transition-colors">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Ready for Deeper Insights?</h2>
            <p className="text-lg text-gray-700 mb-8">
              For personalized astrology consultations and detailed birth chart analysis, book a consultation with Acharyaa Indira Pandey.
            </p>
            <Link to="/quick-guidance">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-6 text-lg font-semibold shadow-2xl">
                Book Quick Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculators;
