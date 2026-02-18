import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { astrologers } from '../mockData';
import { Award, Star, ArrowRight, Sparkles, User } from 'lucide-react';

const Team = () => {
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
              <span className="text-sm font-medium text-purple-700">Expert Astrologers Team</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              Our Team of Astrologers
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Three generations of Vedic astrology expertise - combining ancient wisdom with modern understanding
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {astrologers.map((astrologer, index) => {
                // Define gradient colors for each astrologer
                const gradients = [
                  'from-purple-600 to-purple-800',  // Mrs. Indira Pandey
                  'from-amber-500 to-orange-600',   // Mr. Rajesh Pandey
                  'from-pink-500 to-purple-600'     // Ms. Ankita Pandey
                ];

                return (
                  <Card
                    key={astrologer.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-100"
                  >
                    {/* Header with Gradient Background */}
                    <div className={`relative bg-gradient-to-br ${gradients[index]} p-8 text-center`}>
                      {/* Avatar Circle */}
                      <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-white/30">
                        <User className="w-12 h-12 text-white" />
                      </div>

                      {/* Experience Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold shadow-lg border border-white/30">
                          {astrologer.experience} Years
                        </div>
                      </div>

                      {/* Name and Role */}
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {astrologer.name}
                      </h3>
                      <p className="text-white/90 font-medium text-sm">{astrologer.role}</p>
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
                          Specializations
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
                          Book Consultation
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
              Three Generations of Excellence
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">Master Guidance</h3>
                <p className="text-gray-600 leading-relaxed">
                  40+ years of ancient wisdom from our founding master astrologer
                </p>
              </Card>

              <Card className="p-6 text-center bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">Proven Track Record</h3>
                <p className="text-gray-600 leading-relaxed">
                  800+ satisfied clients with 95% satisfaction rate over 20+ years
                </p>
              </Card>

              <Card className="p-6 text-center bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">Modern Approach</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fresh perspectives combined with traditional knowledge for all ages
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
              Choose Your Astrologer
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Select the astrologer best suited for your needs and schedule your consultation today
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

export default Team;
