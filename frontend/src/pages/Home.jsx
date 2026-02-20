import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Star, Users, Award, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { mockStats, mockServices, mockTestimonials } from '../mockData';
import { useLanguage } from '../contexts/LanguageContext';
import PlanetaryAnimation from '../components/PlanetaryAnimation';

const Home = () => {
  const { t } = useLanguage();

  // Helper function to get translated service data
  const getServiceTranslation = (service) => {
    const serviceMap = {
      'Birth Chart (Kundli) Analysis': { title: 'birthChart', desc: 'birthChartDesc' },
      'Career & Business Guidance': { title: 'career', desc: 'careerDesc' },
      'Marriage & Relationship Compatibility': { title: 'marriage', desc: 'marriageDesc' },
      'Health & Life Path Insights': { title: 'health', desc: 'healthDesc' },
      'Vastu Consultation': { title: 'vastu', desc: 'vastuDesc' },
      'Numerology': { title: 'numerology', desc: 'numerologyDesc' },
      'Gemstone Remedies & Sales': { title: 'gemstone', desc: 'gemstoneDesc' },
      'Auspicious Childbirth Timing (Muhurat)': { title: 'childbirth', desc: 'childbirthDesc' }
    };

    const keys = serviceMap[service.title];
    if (keys) {
      return {
        title: t(`services.${keys.title}`),
        description: t(`services.${keys.desc}`)
      };
    }
    return { title: service.title, description: service.description };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1766473625788-a22578b1e6e2"
            alt="Astrology Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/75 via-purple-800/70 to-amber-900/65" />
        </div>

        {/* Planetary Animation */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <PlanetaryAnimation />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <Sparkles className="absolute top-20 left-10 w-8 h-8 text-amber-300 animate-pulse" style={{ animationDelay: '0s' }} />
          <Sparkles className="absolute top-40 right-20 w-6 h-6 text-purple-300 animate-pulse" style={{ animationDelay: '1s' }} />
          <Sparkles className="absolute bottom-32 left-1/4 w-7 h-7 text-amber-400 animate-pulse" style={{ animationDelay: '2s' }} />
          <Sparkles className="absolute bottom-20 right-1/3 w-5 h-5 text-purple-200 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-300/30 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-top duration-700">
              <Award className="w-4 h-4 text-amber-300" style={{ filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.8))' }} />
              <span className="text-sm font-medium text-amber-100" style={{ textShadow: '0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)' }}>20+ Years of Trusted Guidance</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom duration-700 delay-100" style={{ textShadow: '0 4px 12px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.7)' }}>
              {t('home.hero.title')}
              <span className="block mt-2" style={{
                background: 'linear-gradient(to right, #ffd700, #ffb700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,1)) drop-shadow(0 0 30px rgba(255,215,0,0.5))'
              }}>
                {t('home.hero.subtitle')} ✨
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-bold mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-200" style={{ textShadow: '0 4px 12px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.7)' }}>
              <span className="text-amber-300">{t('home.hero.astrologerName')}</span> <span className="text-purple-200">-</span> <span className="text-white">{t('header.vedicAstrologer')}</span>
            </p>

            <p className="text-lg text-white font-medium mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-300" style={{ textShadow: '0 3px 10px rgba(0,0,0,1), 0 0 25px rgba(0,0,0,0.9)' }}>
              {t('home.hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom duration-700 delay-500">
              <Link to="/booking">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6 text-lg font-semibold shadow-2xl shadow-amber-500/50 transform hover:scale-105 transition-all duration-300 border-0"
                >
                  {t('home.hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 backdrop-blur-sm px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  {t('home.hero.learnMore')}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-in fade-in slide-in-from-bottom duration-700 delay-700">
              {[
                { icon: Award, label: t('home.stats.experience'), value: mockStats.experience },
                { icon: Users, label: t('home.stats.clients'), value: mockStats.clients },
                { icon: Star, label: t('home.stats.satisfaction'), value: mockStats.satisfaction },
                { icon: TrendingUp, label: t('home.stats.consultations'), value: mockStats.consultationsPerWeek }
              ].map((stat, index) => (
                <Card key={index} className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <stat.icon className="w-8 h-8 text-amber-300 mx-auto mb-3" style={{ filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.8))' }} />
                  <p className="text-3xl font-bold text-white mb-1" style={{ textShadow: '0 3px 10px rgba(0,0,0,1), 0 0 25px rgba(0,0,0,0.9)' }}>{stat.value}</p>
                  <p className="text-sm text-purple-200" style={{ textShadow: '0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)' }}>{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
              {t('home.whyChoose.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.whyChoose.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: t('home.whyChoose.card1Title'),
                description: t('home.whyChoose.card1Desc'),
                icon: Award,
                color: 'purple'
              },
              {
                title: t('home.whyChoose.card2Title'),
                description: t('home.whyChoose.card2Desc'),
                icon: Users,
                color: 'amber'
              },
              {
                title: t('home.whyChoose.card3Title'),
                description: t('home.whyChoose.card3Desc'),
                icon: Star,
                color: 'purple'
              },
              {
                title: t('home.whyChoose.card4Title'),
                description: t('home.whyChoose.card4Desc'),
                icon: TrendingUp,
                color: 'amber'
              }
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-purple-100 bg-gradient-to-br from-white to-purple-50"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${
                  feature.color === 'purple' ? 'from-purple-500 to-purple-600' : 'from-amber-500 to-amber-600'
                } flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockServices.slice(0, 6).map((service) => {
              const translatedService = getServiceTranslation(service);

              return (
                <Card
                  key={service.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={translatedService.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-3">{translatedService.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{translatedService.description}</p>
                    <Link to="/services">
                      <Button
                        variant="ghost"
                        className="text-purple-700 hover:text-purple-900 p-0 hover:bg-transparent"
                      >
                        {t('common.learnMore')}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/services">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 shadow-lg shadow-purple-300 transform hover:scale-105 transition-all duration-300"
              >
                {t('home.services.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
              {t('home.testimonials.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {mockTestimonials.slice(0, 2).map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-6 hover:shadow-xl transition-all duration-300 border-purple-100 bg-gradient-to-br from-white to-purple-50"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-purple-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.service}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/testimonials">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white px-8 transform hover:scale-105 transition-all duration-300"
              >
                {t('home.testimonials.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1650365449083-b3113ff48337"
            alt="Cosmic Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 to-amber-900/95" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              {t('home.cta.subtitle')}
            </p>
            <Link to="/booking">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-6 text-lg font-semibold shadow-2xl shadow-amber-500/50 transform hover:scale-105 transition-all duration-300"
              >
                {t('home.cta.button')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
