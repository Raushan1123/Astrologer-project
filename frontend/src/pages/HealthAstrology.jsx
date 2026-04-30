import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Star, Heart, Activity, Brain, Pill, TrendingUp, Clock, MapPin, Phone, Mail, ArrowRight, Shield, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

const HealthAstrology = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Health Astrology Prediction Ghaziabad - Wellness Guidance by Acharyaa Indira Pandey"
        description="Get accurate health astrology prediction in Ghaziabad by Acharyaa Indira Pandey. Expert Vedic astrology guidance for physical & emotional well-being. Book consultation now!"
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
            alt="Health Astrology Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Activity className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Holistic Wellness Guidance</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6 leading-tight">
              Accurate Health Astrology Prediction
            </h1>
            <p className="text-xl md:text-2xl text-amber-600 font-semibold mb-8">
              by Acharyaa Indira Pandey
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              When it comes to understanding your physical and emotional well-being through astrology,
              Health Astrology Prediction in Ghaziabad offers a powerful way to gain clarity and direction.
              With years of experience and a strong spiritual foundation, our approach focuses on identifying
              potential health concerns and guiding you toward balance and harmony.
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

      {/* Understanding Health Through Astrology Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Understanding Health Through Astrology
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
                  alt="Health and Wellness"
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Health astrology is an ancient science that studies the influence of planets, zodiac signs,
                  and houses on your physical and mental health. At Acharyaa Indira Pandey, we carefully analyze
                  your birth chart to uncover hidden health tendencies and possible future concerns.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  This detailed evaluation allows us to recommend preventive measures and lifestyle adjustments.
                  Our Health Astrology Prediction in Ghaziabad service goes beyond general predictions—it focuses
                  on personalized insights, ensuring that every individual receives guidance tailored to their
                  unique astrological chart.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  From stress-related conditions to chronic health patterns, astrology can reveal the root causes
                  and offer clarity for a healthier, more balanced life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Health Guidance Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 shadow-2xl bg-white border border-purple-100">
              <div className="text-center mb-8">
                <Shield className="w-16 h-16 mx-auto text-amber-500 mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                  Personalized Astrological Health Guidance
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Every individual's health journey is different, and so is their astrological blueprint.
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  At Acharyaa Indira Pandey, we believe in offering customized consultations that address your
                  specific concerns. Our expert guidance in Health Astrology Prediction in Ghaziabad helps you
                  align your daily habits with favorable planetary energies.
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                  <h3 className="font-semibold text-purple-900 text-xl mb-3">Our Remedies Include:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-amber-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Gemstone recommendations for healing and balance</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-amber-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Mantra chanting for mental and emotional well-being</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-amber-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Lifestyle changes aligned with planetary energies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>




      {/* Key Health Areas Covered */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Health Areas We Cover
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive astrological guidance for all aspects of your physical and mental well-being
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Activity,
                  title: "Physical Health",
                  description: "Planetary influences on your body's strength, immunity, and vitality"
                },
                {
                  icon: Brain,
                  title: "Mental Wellness",
                  description: "Understanding stress patterns and emotional balance through astrology"
                },
                {
                  icon: Heart,
                  title: "Emotional Health",
                  description: "Guidance on managing emotions and building inner peace"
                },
                {
                  icon: Pill,
                  title: "Chronic Conditions",
                  description: "Identifying planetary causes of recurring health issues"
                },
                {
                  icon: TrendingUp,
                  title: "Preventive Care",
                  description: "Proactive measures based on future planetary transits"
                },
                {
                  icon: Sparkles,
                  title: "Holistic Balance",
                  description: "Achieving harmony between body, mind, and spirit"
                }
              ].map((area, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white border border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center mb-4">
                    <area.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{area.description}</p>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 bg-purple-50 border border-purple-200 rounded-lg text-center">
              <p className="text-gray-700 text-lg">
                <strong className="text-purple-900">Note:</strong> Along with health predictions,
                you can also explore our other services like{' '}
                <Link to="/services" className="text-amber-600 hover:text-amber-700 font-semibold">
                  love astrology, career astrology, and gemstone consultation
                </Link>
                , which are designed to support different aspects of your life journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Astrologer Section */}
      <section className="py-16 bg-gradient-to-br from-amber-100 via-purple-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Why Choose Acharyaa Indira Pandey for Health Astrology
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="https://pub-72df99f4eae645178daf37d3b0d2d50e.r2.dev/WhatsApp%20Image%202026-03-04%20at%2011.17.42%20PM.jpg"
                  alt="Acharyaa Indira Pandey"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover object-top"
                />
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-purple-900">5000+ Happy Clients</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Choosing the right astrologer is crucial for accurate predictions and effective remedies.
                  Acharyaa Indira Pandey is known for her precise readings, compassionate approach, and
                  commitment to helping clients achieve a balanced life.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Our Health Astrology Prediction in Ghaziabad service is trusted by individuals seeking
                  clarity and long-term wellness solutions. We combine traditional Vedic astrology principles
                  with a modern understanding of lifestyle challenges.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  This ensures that our guidance is both practical and effective. Serving clients in Ghaziabad,
                  serving throughout India, we aim to empower you with knowledge that supports your health and
                  well-being.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/booking">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-semibold">
                      Book Health Consultation
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 font-semibold">
                      Learn More About Us
                    </Button>
                  </Link>
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
                In addition to Health Astrology in Ghaziabad, we offer a wide range of astrology services
                designed to support every stage of life
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Birth Chart Analysis', link: '/birth-chart-analysis' },
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

      {/* Holistic Approach Section */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 md:p-12 shadow-2xl bg-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                  Holistic Approach to Wellness and Astrology
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto mb-6"></div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  True health is not just the absence of illness but a state of complete physical, mental,
                  and emotional well-being.
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Our Health Astrology Prediction in Ghaziabad focuses on this holistic approach.
                  By understanding planetary influences, we guide you toward achieving inner balance and harmony.
                </p>

                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <Activity className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-bold text-purple-900 mb-2">Physical Balance</h3>
                    <p className="text-gray-600 text-sm">Body strength & vitality</p>
                  </div>
                  <div className="text-center p-6 bg-amber-50 rounded-lg border border-amber-200">
                    <Brain className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                    <h3 className="font-bold text-purple-900 mb-2">Mental Clarity</h3>
                    <p className="text-gray-600 text-sm">Focus & peace of mind</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <Heart className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-bold text-purple-900 mb-2">Emotional Wellness</h3>
                    <p className="text-gray-600 text-sm">Inner harmony & joy</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg">
                  In addition to health astrology, our platform also offers services such as{' '}
                  <Link to="/services" className="text-amber-600 hover:text-amber-700 font-semibold">
                    numerology, vastu consultation, and horoscope reading
                  </Link>
                  . These interconnected services help create a comprehensive path toward personal growth
                  and wellness, making your journey more meaningful and aligned.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Start Your Health Astrology Journey Today
            </h2>
            <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              If you are looking for reliable insights into your health and future, Acharyaa Indira Pandey
              is here to guide you. Our expert Health Astrology Prediction in Ghaziabad services are designed
              to help you make informed decisions and improve your quality of life.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <MapPin className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                <p className="text-purple-100 text-center">Ghaziabad, Uttar Pradesh</p>
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
                <a href="mailto:indirapandey2526@gmail.com" className="text-purple-100 hover:text-amber-300 transition-colors break-all">
                  indirapandey2526@gmail.com
                </a>
              </div>
            </div>

            <p className="text-lg text-purple-100 mb-8">
              Take the first step toward a healthier and more balanced life with our trusted astrological guidance.
              Whether you are in Ghaziabad or any other part of India, our consultations are easily accessible and
              tailored to your needs.
            </p>

            <Link to="/booking">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-6 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300">
                Book Your Health Consultation Now
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>

            <p className="mt-8 text-purple-200">
              Connect with us today and discover how astrology can transform your approach to health and wellness.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthAstrology;
