import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Award, Users, Heart, Shield, Star, Target, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-amber-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1681673819004-695da4fa9328"
            alt="Cosmic Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1554355202-11fbc45c7157"
                  alt="Mrs. Indira Pandey"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <Card className="absolute -bottom-6 -right-6 p-6 bg-white shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-900">20+</p>
                    <p className="text-sm text-gray-600">{t('about.yearsExperience')}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
                {t('about.journeyTitle')}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  {t('about.journeyPara1')}
                </p>
                <p>
                  {t('about.journeyPara2')}
                </p>
                <p>
                  {t('about.journeyPara3')}
                </p>
              </div>

              <div className="mt-8">
                <Link to="/booking">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    {t('about.bookConsultation')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                {t('about.philosophyTitle')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('about.philosophySubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Star,
                  titleKey: 'philosophy1Title',
                  descKey: 'philosophy1Desc'
                },
                {
                  icon: Heart,
                  titleKey: 'philosophy2Title',
                  descKey: 'philosophy2Desc'
                },
                {
                  icon: Target,
                  titleKey: 'philosophy3Title',
                  descKey: 'philosophy3Desc'
                }
              ].map((item, index) => (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-3">{t(`about.${item.titleKey}`)}</h3>
                  <p className="text-gray-600 leading-relaxed">{t(`about.${item.descKey}`)}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                {t('about.trustTitle')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('about.trustSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Award,
                  titleKey: 'trust1Title',
                  descKey: 'trust1Desc',
                  statsKey: 'trust1Stats'
                },
                {
                  icon: Users,
                  titleKey: 'trust2Title',
                  descKey: 'trust2Desc',
                  statsKey: 'trust2Stats'
                },
                {
                  icon: Shield,
                  titleKey: 'trust3Title',
                  descKey: 'trust3Desc',
                  statsKey: 'trust3Stats'
                },
                {
                  icon: Heart,
                  titleKey: 'trust4Title',
                  descKey: 'trust4Desc',
                  statsKey: 'trust4Stats'
                }
              ].map((item, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-purple-600"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">{t(`about.${item.titleKey}`)}</h3>
                      <p className="text-gray-600 leading-relaxed mb-3">{t(`about.${item.descKey}`)}</p>
                      <div className="inline-block px-3 py-1 bg-purple-100 rounded-full">
                        <span className="text-sm font-semibold text-purple-700">{t(`about.${item.statsKey}`)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Celebrity Clients Note */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-amber-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('about.celebrityTitle')}
            </h2>
            <p className="text-lg text-purple-100 leading-relaxed mb-6">
              {t('about.celebrityDesc')}
            </p>
            <p className="text-purple-200 italic">
              {t('about.celebrityQuote')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
              {t('about.ctaTitle')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('about.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {t('about.ctaButton1')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white px-8 transform hover:scale-105 transition-all duration-300"
                >
                  {t('about.ctaButton2')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
