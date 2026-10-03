import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Star, Users, Award, TrendingUp, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { mockStats, mockServices, mockTestimonials } from '../mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import PlanetaryAnimation from '../components/PlanetaryAnimation';
import AnimatedCounter from '../components/AnimatedCounter';
import SEO from '../components/SEO';
import QuickGuidanceBooking from '../components/QuickGuidanceBooking';
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
      <SEO
        title="Vedic Indian Astrology Consultation, Astrological Career Guidance, Kundli Reading, Birth Chart Analysis, Marriage, Business & Health Astrology Prediction Ghaziabad UP - Acharyaa Indira Pandey"
        description="Get expert Vedic astrology services in Ghaziabad, including kundli reading, marriage, career & health predictions by Acharyaa Indira Pandey. Contact us and book your astrology consultation today!"
      />

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
        <div className="w-full z-20 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center w-full h-full">
              {/* Left Side - Text Content */}
              <div className="text-center md:text-left px-4 md:px-8 lg:px-10 py-6 md:py-8 order-2 md:order-1">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-300/30 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-top duration-700">
                  <Award className="w-4 h-4 text-amber-300" style={{ filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.8))' }} />
                  <span className="text-sm font-medium text-amber-100" style={{ textShadow: '0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)' }}>20+ Years of Trusted Guidance</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight animate-in fade-in slide-in-from-bottom duration-700 delay-100" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 4px 12px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.7)' }}>
                  {t('home.hero.title')}
                  <span className="block mt-2" style={{
                    fontFamily: "'Playfair Display', serif",
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

                <p className="text-lg md:text-xl font-bold mb-6 leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-200" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 4px 12px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.7)' }}>
                  <span className="text-amber-300">{t('home.hero.astrologerName')}</span> <span className="text-purple-200">-</span> <span className="text-white">{t('header.vedicAstrologer')}</span>
                </p>

                <p className="text-base md:text-lg text-white font-medium mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-300" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 3px 10px rgba(0,0,0,1), 0 0 25px rgba(0,0,0,0.9)' }}>
                  {t('home.hero.description')}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start animate-in fade-in slide-in-from-bottom duration-700 delay-500 mb-8">
                  <Link to="/booking" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold shadow-2xl shadow-amber-500/50 transform hover:scale-105 transition-all duration-300 border-0"
                    >
                      {t('home.hero.cta')}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/services" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 backdrop-blur-sm px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                    >
                      {t('home.hero.learnMore')}
                    </Button>
                  </Link>
                </div>

                {/* Stats - Row Layout */}
                <div className="grid grid-cols-2 gap-2 md:gap-4 animate-in fade-in slide-in-from-bottom duration-700 delay-700">
                  {[
                    { icon: Award, label: t('home.stats.experience'), value: mockStats.experience },
                    { icon: Users, label: t('home.stats.clients'), value: mockStats.clients },
                    { icon: Star, label: t('home.stats.satisfaction'), value: mockStats.satisfaction },
                    { icon: TrendingUp, label: t('home.stats.consultations'), value: mockStats.consultationsPerWeek }
                  ].map((stat, index) => (
                    <Card key={index} className="p-3 md:p-5 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                      <stat.icon className="w-5 md:w-6 h-5 md:h-6 text-amber-300 mx-auto mb-1 md:mb-2" style={{ filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.8))' }} />
                      <p className="text-xl md:text-2xl font-bold text-white mb-1" style={{ textShadow: '0 3px 10px rgba(0,0,0,1), 0 0 25px rgba(0,0,0,0.9)' }}>
                        <AnimatedCounter end={stat.value} duration={1500} />
                      </p>
                      <p className="text-xs text-purple-200" style={{ textShadow: '0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)' }}>{stat.label}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Right Side - Astrologer Image */}
              <div className="w-full md:w-auto animate-in fade-in slide-in-from-right duration-700 delay-300 order-1 md:order-2 px-4 md:px-0">
                <div className="relative max-w-md md:max-w-none mx-auto md:mx-0">
                  {/* Background Soft Glow */}
                  <div className="absolute -inset-8 bg-gradient-to-br from-amber-300/30 via-orange-300/15 to-amber-400/10 rounded-full blur-3xl -z-20 opacity-60"></div>

                  {/* Main image container - Clean aesthetic */}
                  <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-black/30 hover:shadow-3xl hover:shadow-black/40 transition-all duration-500 group">
                    {/* Image wrapper */}
                    <div className="overflow-hidden">
                      <img
                        src="https://pub-72df99f4eae645178daf37d3b0d2d50e.r2.dev/WhatsApp%20Image%202026-03-04%20at%2011.17.42%20PM.jpg"
                        alt="Acharyaa Indira Pandey - Expert Vedic Astrologer"
                        className="w-full h-auto max-h-[600px] object-contain group-hover:scale-110 transition-transform duration-700 brightness-105 contrast-105"
                      />
                    </div>

                    {/* Vignette Effect */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/10 pointer-events-none"></div>

                    {/* Top Lighting */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none"></div>

                    {/* Bottom Fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 via-black/5 to-transparent pointer-events-none"></div>
                  </div>

                  {/* Credential Badge - Top Right - Clean Glass effect */}
                  <div className="absolute top-6 right-6 z-30 bg-white/90 backdrop-blur-md text-gray-900 rounded-full p-5 shadow-xl hover:shadow-2xl hover:shadow-amber-400/40 border border-white/60 transform hover:scale-110 transition-all duration-300 cursor-default group/badge">
                    <div className="text-center">
                      <div className="flex justify-center gap-0.5 mb-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="font-bold text-xs leading-tight bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">5000+</p>
                      <p className="text-xs font-semibold leading-tight text-gray-600">Clients</p>
                    </div>
                  </div>

                  {/* Experience Badge - Bottom Left - Clean Glass effect */}
                  <div className="absolute bottom-6 left-6 z-30 bg-white/90 backdrop-blur-md text-gray-900 rounded-2xl px-6 py-4 shadow-xl hover:shadow-2xl hover:shadow-amber-400/40 border border-white/60 transform hover:scale-110 transition-all duration-300 cursor-default group/badge">
                    <div className="font-bold text-2xl bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">20+</div>
                    <div className="text-xs font-semibold leading-tight text-gray-600">Years</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Free First Consultation Banner - Only show if user can book first time */}
      {/* Quick Guidance Booking Section */}
      <QuickGuidanceBooking />

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
                    <Link to={service.link || "/services"}>
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


      {/* Popular Services - Kundli & Vedic Astrology */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
              Most Popular Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most sought-after astrology services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Kundli Reading Card */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group border-2 border-purple-100">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515942661900-94b3d1972591?w=800&q=80&fm=webp&fit=crop&auto=format"
                  alt="Kundli Reading"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">Kundli Reading</h3>
                  <p className="text-purple-100 text-sm mt-1">Accurate Birth Chart Insights</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Get detailed kundli reading and understand your birth chart with personalized insights into your personality, career, relationships, and life path.
                </p>
                <Link to="/kundli-reading-ghaziabad">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transform hover:scale-105 transition-all duration-300">
                    Explore Kundli Reading
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Vedic Astrology Services Card */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group border-2 border-amber-100">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Vedic Astrology Services"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">Vedic Astrology</h3>
                  <p className="text-purple-100 text-sm mt-1">Complete Astrology Services</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Explore our complete range of Vedic astrology services including birth chart analysis, marriage compatibility, business guidance, and health predictions.
                </p>
                <Link to="/vedic-astrology-services-ghaziabad">
                  <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white transform hover:scale-105 transition-all duration-300">
                    View All Services
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
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

      {/* SEO Content Section */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8 text-center">
                {t('homeSeoSection.heading')}
              </h2>

              {/* Introduction */}
              <div className="text-gray-700 leading-relaxed space-y-6 text-justify">
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: t('homeSeoSection.p1') }} />
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: t('homeSeoSection.p2') }} />
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: t('homeSeoSection.p3') }} />
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: t('homeSeoSection.p4') }} />
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: t('homeSeoSection.p5') }} />
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: t('homeSeoSection.p6') }} />
                <p className="text-lg font-semibold text-purple-900" dangerouslySetInnerHTML={{ __html: t('homeSeoSection.p7') }} />
              </div>

              {/* CTA Button */}
              <div className="text-center mt-10">
                <Link to="/booking">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-10 py-6 text-lg font-semibold shadow-2xl shadow-purple-300 transform hover:scale-105 transition-all duration-300"
                  >
                    {t('homeSeoSection.ctaButton')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
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
