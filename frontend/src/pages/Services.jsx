import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { mockServices, consultationPricing } from '../mockData';
import { ArrowRight, Star, Briefcase, Heart, Activity, Home, Hand, Sparkles, CheckCircle, Gem, Baby, BadgeCheck, Clock, IndianRupee } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const iconMap = {
  Star,
  Briefcase,
  Heart,
  Activity,
  Home,
  Hand,
  Gem,
  Baby,
  Sparkles
};

const Services = () => {
  const { t } = useLanguage();

  // Helper function to get translated service data
  const getServiceTranslation = (service) => {
    const serviceMap = {
      'Birth Chart (Kundli) Analysis': { title: 'birthChart', desc: 'birthChartDesc' },
      'Career & Business Guidance': { title: 'career', desc: 'careerDesc' },
      'Marriage & Relationship Compatibility': { title: 'marriage', desc: 'marriageDesc' },
      'Health & Life Path Insights': { title: 'health', desc: 'healthDesc' },
      'Vastu Consultation': { title: 'vastu', desc: 'vastuDesc' },
      'Palmistry': { title: 'palmistry', desc: 'palmistryDesc' },
      'Gemstone Remedies & Sales': { title: 'gemstone', desc: 'gemstoneDesc' },
      'Auspicious Childbirth Timing (Muhurat)': { title: 'childbirth', desc: 'childbirthDesc' },
      'Naming Ceremony': { title: 'namingCeremony', desc: 'namingCeremonyDesc' }
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1729335511904-9b8690184935"
            alt="Services Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">{t('servicesPage.subtitle')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              {t('servicesPage.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t('servicesPage.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Star;
              const translatedService = getServiceTranslation(service);

              return (
                <Card
                  key={service.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                >
                  {/* Service Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={translatedService.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent" />

                    {/* Holi Offer Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        🎉 Holi Offer
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-4 left-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-xl">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-3">
                      {translatedService.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {translatedService.description}
                    </p>

                    {/* Duration and Price */}
                    <div className="mb-4 p-4 bg-gradient-to-br from-purple-50 to-amber-50 rounded-lg border border-purple-100">
                      <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span className="font-semibold text-purple-900">Duration:</span>
                        <span className="font-medium">{service.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-5 h-5 text-purple-900" />
                            <span className="text-2xl font-bold text-purple-900">
                              {Math.round(service.actualPrice * (1 - service.discountPercent / 100))}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-500 line-through">
                              {service.actualPrice}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-white bg-gradient-to-r from-green-500 to-green-600 px-3 py-1.5 rounded-full shadow-md">
                          {service.discountPercent}% OFF
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/booking?serviceId=${service.id}&serviceName=${encodeURIComponent(translatedService.title)}&duration=${encodeURIComponent(service.duration)}&price=${service.actualPrice}&discountPercent=${service.discountPercent}`}
                      className="block"
                    >
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                      >
                        {t('common.bookNow')}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                {t('servicesPage.whatsIncluded')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('servicesPage.whatsIncludedSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">
                      {t(`servicesPage.included${num}Title`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(`servicesPage.included${num}Desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                {t('pricing.title')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('pricing.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {consultationPricing.map((plan, index) => {
                const isFirstTime = plan.badge === 'First Time Only';
                const translatedDuration = isFirstTime ? t('pricing.duration1') : t('pricing.duration2');
                const translatedPrice = isFirstTime ? t('pricing.price1') : t('pricing.price2');
                const translatedDesc = isFirstTime ? t('pricing.desc1') : t('pricing.desc2');
                const translatedBadge = isFirstTime ? t('pricing.badge1') : t('pricing.badge2');
                const translatedFeatures = isFirstTime
                  ? [t('pricing.feature1_1'), t('pricing.feature1_2'), t('pricing.feature1_3')]
                  : [t('pricing.feature2_1'), t('pricing.feature2_2'), t('pricing.feature2_3'), t('pricing.feature2_4')];

                return (
                  <Card
                    key={index}
                    className={`p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                      isFirstTime ? 'border-2 border-green-600 relative' : 'border-2 border-purple-600 relative'
                    }`}
                  >
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        isFirstTime ? 'bg-green-600 text-white' : 'bg-purple-600 text-white'
                      }`}>
                        {translatedBadge}
                      </span>
                    </div>

                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Clock className="w-6 h-6 text-purple-600" />
                        <h3 className="text-2xl font-bold text-purple-900">{translatedDuration}</h3>
                      </div>
                      <div className="flex items-center justify-center mb-2">
                        {isFirstTime ? (
                          <span className="text-4xl font-bold text-green-600">{translatedPrice}</span>
                        ) : (
                          <span className="text-2xl md:text-3xl font-bold text-purple-900">
                            {translatedPrice}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{translatedDesc}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {translatedFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link to="/booking" className="block">
                      <Button
                        className={`w-full ${
                          isFirstTime
                            ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                            : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                        }`}
                      >
                        {t('pricing.bookNow')}
                      </Button>
                    </Link>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Card className="p-6 bg-gradient-to-br from-amber-50 to-purple-50 border-amber-200 inline-block">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <p className="text-gray-700 font-medium mb-1">
                      {t('pricing.specialPricingTitle')}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {t('pricing.specialPricingDesc')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Modes */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Flexible Consultation Options
              </h2>
              <p className="text-lg text-purple-100">
                Choose the mode that works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-6 shadow-xl">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Online Consultation</h3>
                <p className="text-purple-100 leading-relaxed mb-4">
                  Connect from anywhere in the world via video call. Perfect for clients who prefer 
                  the convenience of consulting from home. All you need is a stable internet connection.
                </p>
                <ul className="space-y-2 text-purple-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    Video call via Zoom/Google Meet
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    Convenient and time-saving
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    Available worldwide
                  </li>
                </ul>
              </Card>

              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 shadow-xl">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">In-Person Consultation</h3>
                <p className="text-purple-100 leading-relaxed mb-4">
                  Meet face-to-face at our Ghaziabad location for a more personal and immersive 
                  consultation experience. Ideal for detailed sessions and remedy discussions.
                </p>
                <ul className="space-y-2 text-purple-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    Personal interaction
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    Detailed remedy consultation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    Located in Ghaziabad, India
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Book your consultation today and take the first step towards clarity and guidance.
            </p>
            <Link to="/booking">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-6 text-lg font-semibold shadow-2xl shadow-amber-300 transform hover:scale-105 transition-all duration-300"
              >
                Book Your Consultation Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
