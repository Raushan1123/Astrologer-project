import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, Calendar, Compass, Heart, Briefcase, Activity, TrendingUp, Clock, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const VedicAstrologyServices = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Vedic Astrology Services Ghaziabad | Acharyaa Indira Pandey"
        description="Get expert Vedic Astrology Services Ghaziabad with Acharyaa Indira Pandey. Accurate kundli reading, birth chart analysis & astrology consultation for clients across Ghaziabad and India."
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5"
            alt="Vedic Astrology Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Expert Vedic Astrology</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6 leading-tight">
              Vedic Astrology Services Ghaziabad by Acharyaa Indira Pandey
            </h1>
            <p className="text-xl md:text-2xl text-amber-600 font-semibold mb-8">
              by Acharyaa Indira Pandey
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Life in a fast-growing city like Ghaziabad brings its own share of career pressure, relationship decisions,
              and health worries — and for centuries, Indians have turned to the stars for clarity in exactly these moments.
              Acharyaa Indira Pandey offers trusted Vedic Astrology Services Ghaziabad residents rely on for honest,
              chart-based guidance rooted in traditional Vedic principles rather than guesswork.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/booking">
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6 text-lg font-semibold shadow-lg">
                  Book Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg font-semibold shadow-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Vedic Astrology Different Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                What Makes Vedic Astrology Different
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45"
                  alt="Vedic Astrology Chart"
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Vedic astrology, or Jyotish, is one of the oldest predictive sciences in the world, using the exact position
                  of planets at your birth moment to map out your personality, strengths, and life patterns. Unlike generic horoscope
                  columns, a proper birth chart (kundli) analysis is deeply personal — no two charts are read the same way.
                  This is the foundation of every session offered under our Vedic Astrology Services Ghaziabad practice,
                  ensuring predictions are grounded in your unique planetary positions rather than one-size-fits-all forecasts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Astrology Services Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8 text-center">
              Our Core Astrology Services in Ghaziabad
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: 'Birth Chart Analysis',
                  description: 'A detailed reading of your kundli covering personality, life direction, and key planetary influences.'
                },
                {
                  title: 'Marriage Astrology Consultation',
                  description: 'Compatibility matching, guna milan, and timing guidance for a harmonious married life.'
                },
                {
                  title: 'Business Astrology Consultation',
                  description: 'Insights into favorable periods for investments, partnerships, and career shifts.'
                },
                {
                  title: 'Health Astrology Prediction',
                  description: 'Planetary indicators linked to wellness concerns, helping you plan preventive care.'
                }
              ].map((service, index) => (
                <Card key={index} className="p-6 border-2 border-purple-200 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </Card>
              ))}
            </div>

            <Card className="p-8 border-2 border-purple-200 shadow-lg bg-white">
              <p className="text-gray-700 leading-relaxed">
                Each of these sessions can be booked individually or combined for a more complete life reading,
                and clients are welcome to explore gemstone recommendations as a complementary remedy where planetary strengthening is advised.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted Vedic Astrologer Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Trusted Vedic Astrologer Serving Ghaziabad and Across India
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>

            <Card className="p-8 border-2 border-purple-200 shadow-lg bg-white">
              <p className="text-gray-700 leading-relaxed text-lg">
                While rooted locally, our consultations aren't limited by geography. Clients from Ghaziabad visit in person,
                while many others across Delhi NCR and the rest of India connect through online sessions. This flexibility has made
                Vedic Astrology Services Ghaziabad accessible to working professionals, business owners, and families regardless of location,
                without compromising the depth of a traditional one-on-one reading.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Why Choose Acharyaa Indira Pandey
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>

            <Card className="p-8 border-2 border-purple-200 shadow-lg bg-white">
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Authenticity matters when it comes to something as personal as your life chart. Acharyaa Indira Pandey's
                approach blends classical Vedic methodology with clear, practical explanations — no vague statements,
                no fear-based selling, just an honest read of what your chart indicates and realistic remedies where needed.
                This straightforward style is why so many first-time clients return for ongoing guidance through different life stages,
                from career changes to major family decisions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Can Benefit Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Who Can Benefit from These Consultations
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>

            <Card className="p-8 border-2 border-purple-200 shadow-lg bg-white">
              <p className="text-gray-700 leading-relaxed text-lg">
                These services suit anyone at a decision point: young professionals evaluating a career move, couples preparing for marriage,
                business owners weighing a new venture, or families concerned about a loved one's health. Sessions are explained in simple,
                everyday language, so whether you're new to astrology or have consulted astrologers for years, the guidance remains easy to
                understand and act on.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Expert Astrologer Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
                  Expert Astrologer – Acharyaa Indira Pandey
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Acharyaa Indira Pandey is known for her accurate predictions and compassionate approach.
                    Her expertise in Vedic astrology allows her to deliver meaningful and result-oriented Vedic Astrology Services
                    Ghaziabad. She combines traditional knowledge with modern understanding to provide solutions that are both practical and effective.
                  </p>
                  <p>
                    Clients trust her for her ability to simplify complex astrological concepts and deliver clear guidance.
                    Her approach ensures that every consultation is insightful, empowering, and focused on real-life outcomes.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/about">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
                      Learn More About Us
                    </Button>
                  </Link>
                  <Link to="/testimonials">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg">
                      Read Testimonials
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative">
                  <img
                    src="https://pub-72df99f4eae645178daf37d3b0d2d50e.r2.dev/WhatsApp%20Image%202026-03-04%20at%2011.17.42%20PM.jpg"
                    alt="Acharyaa Indira Pandey - Expert Astrologer"
                    className="rounded-2xl shadow-2xl w-full h-[450px] object-cover object-top"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-xl border-2 border-purple-200">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-purple-900 mt-2">5000+ Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Explore Our Other Astrology Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                In addition to Vedic Astrology Services in Ghaziabad, we offer a wide range of specialized consultations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Birth Chart Analysis', link: '/birth-chart-analysis' },
                { name: 'Health Astrology', link: '/health-astrology-prediction' },
                { name: 'Business Astrology', link: '/business-astrology-consultation' },
                { name: 'Marriage Astrology', link: '/marriage-astrology-consultation' },
                { name: 'Kundli Reading', link: '/kundli-reading-ghaziabad' },
                { name: 'Gemstone Recommendations', link: '/gemstones' },
                { name: 'Vastu Consultation', link: '/services' },
                { name: 'Career Astrology Guidance', link: '/services' }
              ].map((service, index) => (
                <Link key={index} to={service.link}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-purple-100 hover:border-amber-400 hover:scale-105 cursor-pointer h-full bg-white">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-amber-600 fill-amber-600 flex-shrink-0" />
                      <h3 className="font-semibold text-purple-900">{service.name}</h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Clarity and Direction?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Book your personalized Vedic astrology consultation and discover your true potential
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <MapPin className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <p className="text-purple-100">Ghaziabad, Uttar Pradesh</p>
                <p className="text-sm text-purple-200">Serving Throughout India</p>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <Phone className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <a href="tel:+918792967417" className="text-purple-100 hover:text-amber-300 transition-colors">
                  +91 8792967417
                </a>
              </div>
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <Mail className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <Link to="/contact" className="text-purple-100 hover:text-amber-300 transition-colors">
                  Contact Form
                </Link>
              </div>
            </div>

            <Link to="/booking">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-6 text-lg font-semibold shadow-2xl">
                Book Your Vedic Astrology Consultation Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VedicAstrologyServices;
