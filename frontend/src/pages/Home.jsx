import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Star, Users, Award, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { mockStats, mockServices, mockTestimonials } from '../mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import PlanetaryAnimation from '../components/PlanetaryAnimation';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [canBookFirstTime, setCanBookFirstTime] = useState(false);
  const [checkingFirstBooking, setCheckingFirstBooking] = useState(true);

  // Check if user can book first-time consultation
  useEffect(() => {
    const checkFirstBookingStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          // If not logged in, show the banner to encourage sign-up
          setCanBookFirstTime(true);
          setCheckingFirstBooking(false);
          return;
        }

        const response = await axios.get(`${API}/auth/first-booking-status`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setCanBookFirstTime(response.data.can_book_first_time);
        setCheckingFirstBooking(false);
      } catch (error) {
        console.error('Error checking first booking status:', error);
        // On error, show the banner (fail-safe)
        setCanBookFirstTime(true);
        setCheckingFirstBooking(false);
      }
    };

    checkFirstBookingStatus();
  }, [isAuthenticated]);

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
        {/* Background Image with Overlay - Optimized */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1766473625788-a22578b1e6e2?w=1920&q=75&fm=webp&fit=crop&auto=format"
            alt="Astrology Background"
            className="w-full h-full object-cover"
            loading="eager"
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

      {/* Free First Consultation Banner - Only show if user can book first time */}
      {!checkingFirstBooking && canBookFirstTime && (
      <section className="py-8 md:py-16 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-3 md:px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-2 md:border-4 border-green-400">
              <div className="relative">
                {/* Ribbon */}
                <div className="absolute top-4 md:top-6 -left-1 md:-left-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 md:px-8 py-1.5 md:py-2 shadow-lg transform -rotate-3 z-20">
                  <span className="font-bold text-xs md:text-sm tracking-wide">🎁 {t('home.freeConsultation.specialOffer')}</span>
                </div>

                <div className="p-4 md:p-8 lg:p-12 pt-12 md:pt-8">
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    {/* Left Side - Text Content */}
                    <div className="flex-1 text-center md:text-left w-full">
                      <div className="inline-block mb-3 md:mb-4">
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-md animate-pulse">
                          ✨ {t('home.freeConsultation.firstTimeOnly')}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                          {t('home.freeConsultation.title')}
                        </span>
                      </h2>

                      <div className="mb-4 md:mb-6">
                        <div className="inline-flex items-baseline gap-2 md:gap-3">
                          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-green-600">{t('home.freeConsultation.free')}</span>
                          <div className="text-left">
                            <p className="text-xs sm:text-sm text-gray-600 font-semibold">{t('home.freeConsultation.duration')}</p>
                            <p className="text-xs text-purple-600 font-bold">{t('home.freeConsultation.worth')}</p>
                            <p className="text-xs text-gray-500">{t('home.freeConsultation.expertGuidance')}</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed px-2 md:px-0">
                        {t('home.freeConsultation.description')}
                      </p>

                      <ul className="text-left space-y-1.5 md:space-y-2 mb-6 md:mb-8 max-w-md mx-auto md:mx-0 text-sm md:text-base">
                        {[
                          t('home.freeConsultation.feature1'),
                          t('home.freeConsultation.feature2'),
                          t('home.freeConsultation.feature3'),
                          t('home.freeConsultation.feature4')
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-700">
                            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                              <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <span className="font-medium text-sm md:text-base">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <Link to="/booking" className="block">
                        <Button
                          size="lg"
                          className="w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 md:px-10 py-5 md:py-7 text-base md:text-xl font-bold shadow-2xl shadow-green-500/50 transform hover:scale-105 transition-all duration-300 rounded-xl"
                        >
                          🎯 {t('home.freeConsultation.ctaButton')}
                          <ArrowRight className="ml-2 w-4 h-4 md:w-6 md:h-6" />
                        </Button>
                      </Link>

                      <p className="text-xs text-gray-500 mt-3 md:mt-4 italic px-2 md:px-0">
                        ⏰ {t('home.freeConsultation.limitedSlots')}
                      </p>
                    </div>

                    {/* Right Side - Visual Element */}
                    <div className="flex-shrink-0 relative hidden md:block">
                      <div className="relative w-64 h-64 md:w-80 md:h-80">
                        {/* Glowing Circle Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse opacity-20"></div>

                        {/* Main Circle */}
                        <div className="absolute inset-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                          <div className="text-center text-white p-6">
                            <Sparkles className="w-16 h-16 mx-auto mb-4 animate-spin-slow" />
                            <p className="text-6xl font-black mb-2">{t('home.freeConsultation.badge100')}</p>
                            <p className="text-xl font-bold">{t('home.freeConsultation.badgeFree')}</p>
                            <p className="text-sm opacity-90 mt-2">{t('home.freeConsultation.badgeFirstTime')}</p>
                            <p className="text-sm opacity-90">{t('home.freeConsultation.badgeConsultation')}</p>
                          </div>
                        </div>

                        {/* Floating Icons */}
                        <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg animate-bounce">
                          <Star className="w-8 h-8 text-yellow-900" fill="currentColor" />
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-purple-400 rounded-full p-3 shadow-lg animate-bounce animation-delay-1000">
                          <Award className="w-8 h-8 text-purple-900" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Bar */}
                <div className="h-2 md:h-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-8 text-center px-2">
              <div className="flex items-center gap-1.5 md:gap-2 text-gray-700">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                <span className="font-semibold text-xs md:text-base">5,000+ {t('home.freeConsultation.trustClients')}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-gray-700">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 flex-shrink-0" fill="currentColor" />
                <span className="font-semibold text-xs md:text-base">4.9/5 {t('home.freeConsultation.trustRating')}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-gray-700">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-purple-600 flex-shrink-0" />
                <span className="font-semibold text-xs md:text-base">20+ {t('home.freeConsultation.trustExperience')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

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
            src="https://images.unsplash.com/photo-1650365449083-b3113ff48337?w=1920&q=75&fm=webp&fit=crop&auto=format"
            alt="Cosmic Background"
            className="w-full h-full object-cover"
            loading="lazy"
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
