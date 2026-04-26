import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { astrologers } from '../mockData';
import { Award, Star, ArrowRight, Sparkles, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Team = () => {
  const { t } = useLanguage();

  // Get translated astrologer data
  const getTranslatedAstrologers = () => {
    return [
      {
        id: "1",
        name: t('team.astrologer1Name'),
        role: t('team.astrologer1Role'),
        experience: "20",
        specialization: [
          t('team.astrologer1Spec1'),
          t('team.astrologer1Spec2'),
          t('team.astrologer1Spec3'),
          t('team.astrologer1Spec4')
        ],
        bio: t('team.astrologer1Bio'),
        available: true
      },
      {
        id: "2",
        name: t('team.astrologer2Name'),
        role: t('team.astrologer2Role'),
        experience: "40",
        specialization: [
          t('team.astrologer2Spec1'),
          t('team.astrologer2Spec2'),
          t('team.astrologer2Spec3'),
          t('team.astrologer2Spec4')
        ],
        bio: t('team.astrologer2Bio'),
        available: true
      },
      {
        id: "3",
        name: t('team.astrologer3Name'),
        role: t('team.astrologer3Role'),
        experience: "7",
        specialization: [
          t('team.astrologer3Spec1'),
          t('team.astrologer3Spec2'),
          t('team.astrologer3Spec3'),
          t('team.astrologer3Spec4')
        ],
        bio: t('team.astrologer3Bio'),
        available: true
      }
    ];
  };

  const translatedAstrologers = getTranslatedAstrologers();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-amber-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1650365449083-b3113ff48337"
            alt="Team Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">{t('team.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              {t('team.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('team.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {translatedAstrologers.map((astrologer, index) => {
                // Define gradient colors for each astrologer
                const gradients = [
                  'from-purple-600 to-purple-800',  // Acharyaa Indira Pandey
                  'from-amber-500 to-orange-600',   // Acharya Ram Nath Tiwari
                  'from-pink-500 to-purple-600'     // Acharyaa Ankita Pandey
                ];

                // Define images for each astrologer
                const images = [
                  'https://pub-72df99f4eae645178daf37d3b0d2d50e.r2.dev/WhatsApp%20Image%202026-03-04%20at%2011.17.42%20PM.jpg',  // Acharyaa Indira Pandey
                  'https://pub-72df99f4eae645178daf37d3b0d2d50e.r2.dev/WhatsApp%20Image%202026-03-04%20at%2011.18.19%20PM.jpeg',   // Acharya Ram Nath Tiwari
                  'https://pub-72df99f4eae645178daf37d3b0d2d50e.r2.dev/WhatsApp%20Image%202026-03-04%20at%2011.18.07%20PM.jpeg'     // Acharyaa Ankita Pandey
                ];

                return (
                  <Card
                    key={astrologer.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-100"
                  >
                    {/* Header with Image Background */}
                    <div className="relative h-80 overflow-hidden">
                      {/* Background Image */}
                      <img
                        src={images[index]}
                        alt={astrologer.name}
                        className={`absolute inset-0 w-full h-full object-cover ${index === 0 ? 'object-top' : 'object-center'}`}
                      />

                      {/* Gradient Overlay - lighter for better image visibility */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`}></div>

                      {/* Content Overlay */}
                      <div className="relative h-full flex flex-col justify-end p-8 text-center">
                        {/* Experience Badge */}
                        <div className="absolute top-4 right-4">
                          <div className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold shadow-lg border-2 border-white/60">
                            {astrologer.experience}+ {t('team.years')}
                          </div>
                        </div>

                        {/* Name and Role */}
                        <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                          {astrologer.name}
                        </h3>
                        <p className="text-white font-semibold text-base drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] mb-4">{astrologer.role}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-white">
                      <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                        {astrologer.bio}
                      </p>

                      {/* Specializations */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-purple-900 mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          {t('team.specialization')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {astrologer.specialization.map((spec, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200 hover:bg-purple-100 transition-colors"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Book Button */}
                      <Link to="/booking">
                        <Button className={`w-full bg-gradient-to-r ${gradients[index]} hover:opacity-90 text-white shadow-lg`}>
                          <Star className="mr-2 w-4 h-4" />
                          {t('team.bookConsultation')}
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Team */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-12 text-center">
              {t('team.excellenceTitle')}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">{t('team.excellence1Title')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('team.excellence1Desc')}
                </p>
              </Card>

              <Card className="p-6 text-center bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">{t('team.excellence2Title')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('team.excellence2Desc')}
                </p>
              </Card>

              <Card className="p-6 text-center bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">{t('team.excellence3Title')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('team.excellence3Desc')}
                </p>
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
              {t('team.ctaTitle')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('team.ctaSubtitle')}
            </p>
            <Link to="/booking">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-6 text-lg font-semibold shadow-2xl shadow-amber-300 transform hover:scale-105 transition-all duration-300"
              >
                {t('team.ctaButton')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
