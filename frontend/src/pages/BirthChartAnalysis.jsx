import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, Calendar, Compass, Heart, Briefcase, Activity, TrendingUp, Clock, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const BirthChartAnalysis = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Birth Chart Analysis Ghaziabad - Kundli Analysis by Acharyaa Indira Pandey"
        description="Get accurate birth chart analysis in Ghaziabad by Acharyaa Indira Pandey. Expert Vedic astrology guidance for career, relationships, health & finances. Book consultation now!"
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5"
            alt="Birth Chart Background"
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
              Accurate Astrology Guidance on Birth Chart Analysis
            </h1>
            <p className="text-xl md:text-2xl text-amber-600 font-semibold mb-8">
              by Acharyaa Indira Pandey
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Understanding your life's path becomes clearer when guided by the wisdom of astrology.
              We offer detailed and personalized Birth Chart Analysis in Ghaziabad, helping individuals
              uncover hidden patterns, strengths, and opportunities in life.
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

      {/* What is Birth Chart Analysis Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                What is Birth Chart Analysis and Why It Matters
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45"
                  alt="Birth Chart Kundli"
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  A birth chart, also known as a <strong>Kundli</strong>, is a cosmic blueprint created based on your 
                  date, time, and place of birth. Through our expert <strong>Birth Chart Analysis in Ghaziabad</strong>, 
                  we interpret planetary positions and their influence on various aspects of your life, such as career, 
                  relationships, health, and finances.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This analysis helps you make informed decisions and align your actions with favorable planetary energies. 
                  Whether you are facing challenges or seeking growth, understanding your birth chart can be a transformative step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Consultation Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8 text-center">
              Personalized Astrology Consultation in Ghaziabad
            </h2>

            <Card className="p-8 border-2 border-purple-200 shadow-lg bg-white">
              <p className="text-gray-700 leading-relaxed mb-6">
                At Acharyaa Indira Pandey, every individual receives a customized approach. Our <strong>Birth Chart
                Analysis in Ghaziabad</strong> is not based on generic predictions but on deep astrological calculations
                and insights. We analyze planetary combinations, doshas, and yogas to provide accurate guidance tailored
                to your life situation.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Whether you are planning your career, marriage, or financial investments, our consultation offers
                practical solutions rooted in astrology.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-purple-900 font-semibold">
                  Our services are not limited to one region; while we specialize in Ghaziabad, we are also serving
                  throughout India, making expert astrology accessible to everyone regardless of location.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Areas Covered Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Key Areas Covered in Birth Chart Analysis
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our comprehensive analysis covers multiple life dimensions to ensure holistic guidance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Briefcase,
                  title: 'Career Growth',
                  description: 'Identify your professional strengths and find the right career path aligned with planetary energies.'
                },
                {
                  icon: Heart,
                  title: 'Relationship Compatibility',
                  description: 'Understand relationship dynamics and compatibility for lasting partnerships and marriage.'
                },
                {
                  icon: Activity,
                  title: 'Health Concerns',
                  description: 'Get insights into health vulnerabilities and preventive measures based on your chart.'
                },
                {
                  icon: TrendingUp,
                  title: 'Financial Stability',
                  description: 'Discover favorable periods for investments and wealth accumulation strategies.'
                },
                {
                  icon: Star,
                  title: 'Spiritual Development',
                  description: 'Explore your spiritual journey and find paths for inner growth and enlightenment.'
                },
                {
                  icon: Clock,
                  title: 'Auspicious Timings',
                  description: 'Learn the best muhurat for important life decisions and major events.'
                }
              ].map((area, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-purple-100 hover:border-purple-300 bg-white">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center mb-4">
                    <area.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{area.description}</p>
                </Card>
              ))}
            </div>

            <div className="mt-12 bg-purple-50 p-8 rounded-xl border-2 border-purple-200">
              <p className="text-gray-700 leading-relaxed">
                Additionally, we guide you on auspicious timings (muhurat), planetary transits, and long-term life planning.
                This ensures that you are always aligned with the right time and energy for important decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Astrologer Section */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
                  Expert Astrologer – Acharyaa Indira Pandey
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Acharyaa Indira Pandey is known for her accurate predictions and compassionate approach. Her expertise
                    in Vedic astrology allows her to deliver meaningful and result-oriented <strong>Birth Chart Analysis
                    in Ghaziabad</strong>. She combines traditional knowledge with modern understanding to provide solutions
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
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
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
                In addition to Birth Chart Analysis in Ghaziabad, we offer a wide range of astrology services
                designed to support every stage of life
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Health Astrology', link: '/health-astrology-prediction' },
                { name: 'Business Astrology', link: '/services' },
                { name: 'Love & Relationship Guidance', link: '/services' },
                { name: 'Gemstone Recommendations', link: '/gemstones' },
                { name: 'Vastu Consultation', link: '/services' },
                { name: 'Career Astrology Guidance', link: '/services' },
                { name: 'Horoscope Matching', link: '/services' },
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

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Why Choose Us for Birth Chart Analysis in Ghaziabad
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-2 border-purple-200">
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Choosing the right astrologer makes all the difference. At Acharyaa Indira Pandey, we focus on
                <strong> accuracy, personalization, and client satisfaction</strong>. Our Birth Chart Analysis in
                Ghaziabad is designed to empower you with knowledge and clarity, helping you navigate life with confidence.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                With a strong presence in Ghaziabad and serving throughout India, we ensure accessibility, reliability,
                and trusted guidance for every client. If you are seeking clarity, direction, and positive transformation,
                our astrology services are here to guide you every step of the way.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/booking">
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 text-lg font-semibold shadow-lg">
                    Book Your Birth Chart Analysis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
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
                  What is Birth Chart Analysis in astrology?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Birth Chart Analysis is a Vedic astrology practice that studies the planetary positions at the exact time and place of a person's birth. Happy Kismat utilizes this approach to offer guidance on personality, career, relationships, health, and life opportunities.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2" className="border-2 border-purple-100 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-purple-900 font-semibold text-left hover:text-amber-600 hover:no-underline">
                  Where can I get a birth chart analysis in Ghaziabad?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Happy Kismat offers professional services in Ghaziabad to help individuals understand their horoscopes and planetary influences through Vedic astrology.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3" className="border-2 border-purple-100 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-purple-900 font-semibold text-left hover:text-amber-600 hover:no-underline">
                  How does Birth Chart Analysis work?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Birth Chart Analysis works by examining the positions of planets, zodiac signs, and houses at the time of birth, interpreted using Vedic methods for personalized insights.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4" className="border-2 border-purple-100 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-purple-900 font-semibold text-left hover:text-amber-600 hover:no-underline">
                  What information is required for Birth Chart Analysis?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  For accurate Birth Chart Analysis, astrologers generally require your date of birth, exact time of birth, and place of birth.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5" className="border-2 border-purple-100 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-purple-900 font-semibold text-left hover:text-amber-600 hover:no-underline">
                  Can I get an online Birth Chart Analysis from Happy Kismat?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Yes, Happy Kismat provides remote consultations across India, allowing clients to receive personalized guidance using their birth details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q6" className="border-2 border-purple-100 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-purple-900 font-semibold text-left hover:text-amber-600 hover:no-underline">
                  Why should I choose Happy Kismat for Birth Chart Analysis?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Happy Kismat offers guidance related to career, marriage, health, and personal growth using Vedic astrology methods, with a personalized and compassionate approach for each client.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q7" className="border-2 border-purple-100 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-purple-900 font-semibold text-left hover:text-amber-600 hover:no-underline">
                  Does Happy Kismat provide Birth Chart Analysis outside Ghaziabad?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Yes, Happy Kismat provides Birth Chart Analysis services for clients in Ghaziabad and across India.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q8" className="border-2 border-purple-100 rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-purple-900 font-semibold text-left hover:text-amber-600 hover:no-underline">
                  How can I book a Birth Chart Analysis with Happy Kismat?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Contact Happy Kismat to schedule a consultation by sharing your birth details for personalized Vedic astrology guidance.
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
              Get personalized birth chart analysis and unlock the secrets of your destiny
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
                Schedule Consultation Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BirthChartAnalysis;

