import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { mockTestimonials } from '../mockData';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TestimonialForm from '../components/TestimonialForm';
import axios from 'axios';

const Testimonials = () => {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [loading, setLoading] = useState(false);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
        const response = await axios.get(`${API_URL}/testimonials?limit=20`);

        if (response.data && response.data.length > 0) {
          // Format testimonials to match the expected structure
          const formattedTestimonials = response.data.map(t => ({
            id: t.id,
            name: t.name,
            rating: t.rating,
            text: t.text,
            service: t.service,
            location: t.location || '',
            date: new Date(t.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }));
          setTestimonials(formattedTestimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Keep using mock data if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-amber-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521174460966-0a8fc92ae2d5"
            alt="Testimonials Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              {t('testimonials.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('testimonials.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 bg-gradient-to-r from-purple-900 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { numberKey: 'stat1Number', labelKey: 'stat1Label' },
              { numberKey: 'stat2Number', labelKey: 'stat2Label' },
              { numberKey: 'stat3Number', labelKey: 'stat3Label' },
              { numberKey: 'stat4Number', labelKey: 'stat4Label' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">{t(`testimonials.${stat.numberKey}`)}</p>
                <p className="text-sm md:text-base text-purple-200">{t(`testimonials.${stat.labelKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-purple-50 border-purple-100 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center opacity-20">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex justify-between items-center pt-4 border-t border-purple-100">
                  <div>
                    <p className="font-semibold text-purple-900 text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.service}</p>
                    {testimonial.location && (
                      <p className="text-xs text-gray-400 mt-1">📍 {testimonial.location}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {typeof testimonial.date === 'string' && testimonial.date.includes(',')
                        ? testimonial.date
                        : new Date(testimonial.date).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric'
                          })
                      }
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* More Testimonials Placeholder */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8 text-center">
              {t('testimonials.moreStoriesTitle')}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Anita R.',
                  text: 'The career guidance I received was incredibly accurate. Got my dream job within 3 months!',
                  service: 'Career Guidance'
                },
                {
                  name: 'Vikram S.',
                  text: 'Her Vastu recommendations brought positive energy to my home. Family relationships improved significantly.',
                  service: 'Vastu Consultation'
                },
                {
                  name: 'Pooja K.',
                  text: 'The remedies suggested were simple yet powerful. My health issues resolved gradually.',
                  service: 'Health Insights'
                },
                {
                  name: 'Rajesh M.',
                  text: 'Business was struggling for years. Her predictions and remedies turned everything around.',
                  service: 'Business Guidance'
                },
                {
                  name: 'Meera D.',
                  text: 'Found my life partner through her matchmaking analysis. We are happily married now!',
                  service: 'Marriage Compatibility'
                },
                {
                  name: 'Suresh P.',
                  text: 'Very professional and compassionate. Her numerology insights gave me new perspective on life.',
                  service: 'Numerology'
                }
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-purple-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.service}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Submission Form */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <TestimonialForm />
          </div>
        </div>
      </section>

      {/* Video Testimonials Coming Soon */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-purple-50 to-amber-50">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-purple-900 mb-4">
              {t('testimonials.videoTitle')}
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              {t('testimonials.videoSubtitle')}
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1729335312247-5b0a9369bba7"
            alt="CTA Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 to-purple-800/95" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('testimonials.ctaTitle')}
            </h2>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              {t('testimonials.ctaSubtitle')}
            </p>
            <Link to="/booking">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-6 text-lg font-semibold shadow-2xl shadow-amber-500/50 transform hover:scale-105 transition-all duration-300"
              >
                {t('testimonials.ctaButton')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
