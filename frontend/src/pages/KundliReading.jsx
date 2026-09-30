import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, Calendar, Compass, Heart, Briefcase, Activity, TrendingUp, Clock, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const KundliReading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Kundli Reading Ghaziabad | Acharyaa Indira Pandey"
        description="Accurate Kundli Reading Ghaziabad services by Acharyaa Indira Pandey. Detailed birth chart analysis, planetary insights & astrology guidance for clients across Ghaziabad and India."
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5"
            alt="Kundli Reading Background"
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
              Kundli Reading Ghaziabad – Accurate Birth Chart Insights by Acharyaa Indira Pandey
            </h1>
            <p className="text-xl md:text-2xl text-amber-600 font-semibold mb-8">
              by Acharyaa Indira Pandey
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Every kundli tells a story — one written in the exact position of the planets at the moment you were born.
              If you've been searching for reliable Kundli Reading Ghaziabad residents can trust, Acharyaa Indira Pandey
              offers detailed, personalized readings that go beyond generic predictions, helping you understand your strengths,
              challenges, and the right timing for major life decisions.
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

      {/* Understanding Kundli Reading Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Understanding Kundli Reading and Why It Matters
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45"
                  alt="Kundli Birth Chart"
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  A kundli, or Vedic birth chart, is a map of the sky at your exact time and place of birth.
                  It captures the position of the nine planets (grahas) across the twelve houses, forming the basis for
                  everything from career forecasts to marriage compatibility. A skilled Kundli Reading Ghaziabad clients
                  receive goes far beyond a computer-generated printout — it involves interpreting planetary combinations (yogas),
                  current planetary periods (dashas), and house strengths to give you insights that are actually relevant to your life today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What a Professional Kundli Reading Covers Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8 text-center">
              What a Professional Kundli Reading Covers
            </h2>

            <Card className="p-8 border-2 border-purple-200 shadow-lg bg-white">
              <p className="text-gray-700 leading-relaxed mb-6">
                Under Acharyaa Indira Pandey's guidance, a kundli session typically covers:
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="text-gray-700 leading-relaxed"><strong>Personality and life path</strong> – core traits, natural strengths, and areas for growth.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="text-gray-700 leading-relaxed"><strong>Career and finance indicators</strong> – favorable periods for job changes, business ventures, or investments.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="text-gray-700 leading-relaxed"><strong>Relationship and marriage timing</strong> – compatibility factors and suitable timeframes.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="text-gray-700 leading-relaxed"><strong>Health-related planetary influences</strong> – early indicators worth being mindful of.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="text-gray-700 leading-relaxed"><strong>Remedies where needed</strong> – simple, practical suggestions rather than complicated rituals.</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Clients looking for a deeper dive into any one of these areas can also book a dedicated{' '}
                <Link to="/birth-chart-analysis" className="text-purple-600 hover:underline font-medium">birth chart analysis</Link>,{' '}
                <Link to="/marriage-astrology-consultation" className="text-purple-600 hover:underline font-medium">marriage astrology consultation</Link>, or{' '}
                <Link to="/health-astrology-prediction" className="text-purple-600 hover:underline font-medium">health astrology prediction</Link> session.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Why Choose Acharyaa Indira Pandey for Kundli Reading
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-2 border-purple-200">
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                What sets a genuinely useful kundli reading apart is honesty and clarity — not vague statements designed
                to keep you coming back. Acharyaa Indira Pandey's approach is rooted in classical Vedic methodology,
                explained in plain, everyday language so you leave the session actually understanding your chart,
                not more confused by it. This straightforward style has made her Kundli Reading Ghaziabad consultations
                a trusted choice for both first-time visitors and long-term clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Serving Ghaziabad Section */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Serving Ghaziabad and Clients Across India
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>

            <Card className="p-8 border-2 border-purple-200 shadow-lg bg-white">
              <p className="text-gray-700 leading-relaxed text-lg">
                While based in Ghaziabad, sessions are available both in person and online, allowing clients across
                Delhi NCR and the rest of India to access the same depth of reading without needing to travel.
                Whether you're a student planning your education path, a professional weighing a career move,
                or a family preparing for a wedding, a kundli reading gives you a grounded starting point for the decision ahead.
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
                    Her expertise in Vedic astrology allows her to deliver meaningful and result-oriented Kundli Reading
                    Ghaziabad. She combines traditional knowledge with modern understanding to provide solutions
                    that are both practical and effective.
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
                In addition to Kundli Reading in Ghaziabad, we offer a wide range of astrology services
                designed to support every stage of life
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Birth Chart Analysis', link: '/birth-chart-analysis' },
                { name: 'Health Astrology', link: '/health-astrology-prediction' },
                { name: 'Business Astrology', link: '/business-astrology-consultation' },
                { name: 'Marriage Astrology', link: '/marriage-astrology-consultation' },
                { name: 'Gemstone Recommendations', link: '/gemstones' },
                { name: 'Vastu Consultation', link: '/services' },
                { name: 'Career Astrology Guidance', link: '/services' },
                { name: 'Numerology', link: '/services' }
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

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="q1" className="border-2 border-purple-100 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-purple-900 font-semibold text-left hover:text-amber-600 hover:no-underline">
                  What is a kundli reading, and how is it different from a horoscope?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  A kundli reading is a personalized analysis based on your exact birth date, time, and place,
                  while a horoscope is a general prediction based only on your zodiac sign. Kundli reading offers far more precise, individual guidance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2" className="border-2 border-purple-100 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-purple-900 font-semibold text-left hover:text-amber-600 hover:no-underline">
                  How accurate is Kundli Reading Ghaziabad by Acharyaa Indira Pandey?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Accuracy depends on correct birth details (date, time, and place of birth).
                  With precise information, the reading reflects genuine planetary positions and offers meaningful, chart-based insights.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3" className="border-2 border-purple-100 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-purple-900 font-semibold text-left hover:text-amber-600 hover:no-underline">
                  Can I get a kundli reading online if I don't live in Ghaziabad?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Yes. While the practice is based in Ghaziabad, consultations are available online for clients across India,
                  so location is never a barrier to getting a detailed reading.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4" className="border-2 border-purple-100 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-purple-900 font-semibold text-left hover:text-amber-600 hover:no-underline">
                  What information do I need to provide for an accurate kundli reading?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  You'll need your exact date of birth, time of birth, and place of birth.
                  Accurate birth time is especially important, as it affects house placements and overall chart interpretation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5" className="border-2 border-purple-100 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-purple-900 font-semibold text-left hover:text-amber-600 hover:no-underline">
                  How often should I get my kundli reviewed?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Most people benefit from a review during major life transitions — such as before marriage,
                  a career change, or a significant investment — rather than on a fixed schedule.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Discover Your Life's Path?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Get personalized kundli reading and unlock the secrets of your destiny
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
                Book Your Kundli Reading Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KundliReading;
