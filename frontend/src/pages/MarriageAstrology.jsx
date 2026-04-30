import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Heart, Star, Users, Shield, Clock, MapPin, Phone, Mail, ArrowRight, Target, CheckCircle2, BookHeart, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';

const MarriageAstrology = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 pt-20">
      <SEO
        title="Marriage Astrology Prediction Ghaziabad - Expert Consultation by Acharyaa Indira Pandey"
        description="Get accurate marriage astrology predictions in Ghaziabad by Acharyaa Indira Pandey. Kundli matching, compatibility analysis & marriage timing. Book now!"
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552"
            alt="Marriage Astrology Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 border border-pink-200 mb-6">
              <Heart className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-medium text-pink-700">Expert Marriage Guidance</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6 leading-tight">
              Marriage Astrology Prediction
            </h1>
            <p className="text-xl md:text-2xl text-pink-600 font-semibold mb-8">
              by Acharyaa Indira Pandey
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              When it comes to finding the right life partner, clarity and confidence matter the most.
              We offer expert-guided Marriage Astrology Prediction in Ghaziabad services designed to help
              individuals understand their marital prospects through precise astrological insights.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/booking">
                <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold shadow-lg">
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

      {/* Understanding Marriage Through Astrology Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Understanding Marriage Through Astrology
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1606800052052-a08af7148866"
                  alt="Marriage Astrology"
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Marriage astrology plays a crucial role in identifying compatibility, timing, and potential
                  challenges in a relationship. Through our Marriage Astrology Prediction in Ghaziabad, we analyze
                  Kundli matching, doshas, and planetary influences that impact marital life.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Our consultation covers aspects like love marriage vs arranged marriage possibilities, timing
                  of marriage, and remedies for obstacles. By understanding these factors, you can move forward
                  with confidence and clarity in your relationship decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Consultation Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 shadow-2xl bg-white border border-pink-100">
              <div className="text-center mb-8">
                <Target className="w-16 h-16 mx-auto text-pink-500 mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                  Personalized Marriage Astrology Consultation
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Every individual has a unique astrological blueprint
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  At Acharyaa Indira Pandey, every consultation is personalized. We believe that no two individuals
                  have the same astrological blueprint, which is why our Marriage Astrology Prediction in Ghaziabad
                  services are tailored based on your birth details.
                </p>

                <p className="text-gray-700 leading-relaxed text-lg">
                  We carefully study your horoscope to provide accurate predictions about your married life, including
                  emotional compatibility, financial stability, and long-term harmony. This personalized approach ensures
                  that you receive guidance that is relevant, practical, and actionable for your specific situation.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>




      {/* Resolving Marriage Delays Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Resolving Marriage Delays and Obstacles
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Many individuals face delays or unexpected challenges in their marriage journey. Through our
                  Marriage Astrology Prediction in Ghaziabad, we identify the root causes such as Mangal Dosha,
                  planetary imbalances, or unfavorable dasha periods.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Once identified, we provide effective remedies and solutions that align with Vedic principles.
                  These remedies are simple, practical, and designed to bring positive changes in your life. Our
                  goal is not just prediction but also resolution, helping you move closer to a successful and
                  fulfilling marriage.
                </p>

                <div className="space-y-3">
                  {[
                    "Mangal Dosha analysis and remedies",
                    "Planetary balance corrections",
                    "Dasha period evaluation",
                    "Practical Vedic solutions"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <img
                  src="https://images.unsplash.com/photo-1529636798458-92182e662485"
                  alt="Resolving Marriage Obstacles"
                  className="rounded-2xl shadow-xl w-full h-[450px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility and Kundli Matching Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Compatibility and Kundli Matching
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Ensure harmonious marital life through detailed compatibility analysis
              </p>
            </div>

            <Card className="p-8 md:p-10 bg-white shadow-xl border border-pink-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">
                    The Foundation of Successful Marriage
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    Compatibility is one of the most important factors for a successful marriage. Our consultation
                    includes detailed Kundli matching to evaluate emotional, physical, and spiritual compatibility
                    between partners.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Through Marriage Astrology Prediction in Ghaziabad, we assess key factors such as Guna Milan,
                    dosha compatibility, and planetary harmony. This ensures that you make informed decisions before
                    committing to a lifelong relationship, reducing the chances of future conflicts.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Guna Milan Analysis",
                      description: "36-point compatibility scoring system"
                    },
                    {
                      title: "Dosha Compatibility",
                      description: "Identification and remedies for doshas"
                    },
                    {
                      title: "Planetary Harmony",
                      description: "Assessment of planetary positions"
                    },
                    {
                      title: "Long-term Compatibility",
                      description: "Emotional, physical & spiritual alignment"
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
                      <h4 className="font-semibold text-purple-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>


      {/* Serving Across India Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Serving Ghaziabad and Across India
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="https://pub-72df99f4eae645178daf37d3b0d2d50e.r2.dev/WhatsApp%20Image%202026-03-04%20at%2011.17.42%20PM.jpg"
                  alt="Acharyaa Indira Pandey"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover object-top"
                />
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-pink-200">
                  <div className="flex items-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-pink-500 text-pink-500" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-purple-900">5000+ Happy Clients</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  While based in Ghaziabad, Acharyaa Indira Pandey proudly serves clients throughout India with
                  reliable and accurate astrology consultations. Our Marriage Astrology Prediction in Ghaziabad
                  services are accessible to anyone seeking guidance, regardless of location.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  We ensure that every consultation maintains the same level of accuracy, professionalism, and
                  confidentiality. Whether you are in Ghaziabad or anywhere in India, you can benefit from our
                  expert astrological insights through online and in-person consultation options.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Our approach combines traditional Vedic astrology with practical guidance, ensuring that every
                  prediction aligns with real-life situations and helps you make confident decisions about your
                  marital future.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
                    <div className="text-3xl font-bold text-purple-900 mb-1">15+</div>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                  <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
                    <div className="text-3xl font-bold text-purple-900 mb-1">5000+</div>
                    <p className="text-sm text-gray-600">Happy Clients</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/booking">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-semibold">
                      Book Marriage Consultation
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 font-semibold">
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
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Explore Our Other Astrology Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                In addition to Marriage Astrology, we offer a wide range of services to guide different aspects of life
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/services">
                <Card className="p-6 bg-white border border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Career Astrology</h3>
                  <p className="text-gray-600 text-sm">Professional guidance and career predictions</p>
                </Card>
              </Link>

              <Link to="/services">
                <Card className="p-6 bg-white border border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Love Relationship</h3>
                  <p className="text-gray-600 text-sm">Relationship guidance and compatibility</p>
                </Card>
              </Link>

              <Link to="/services">
                <Card className="p-6 bg-white border border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Vastu Consultation</h3>
                  <p className="text-gray-600 text-sm">Space and energy alignment solutions</p>
                </Card>
              </Link>

              <Link to="/services">
                <Card className="p-6 bg-white border border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookHeart className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Kundli Analysis</h3>
                  <p className="text-gray-600 text-sm">Detailed birth chart readings</p>
                </Card>
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link to="/services">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 font-semibold">
                  View All Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Take the First Step Towards a Happy Marriage
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Get expert Marriage Astrology Prediction in Ghaziabad and make confident, informed decisions
              about your life partner and marital future.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/booking">
                <Button className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-xl">
                  Book Your Consultation Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg font-semibold shadow-xl border-2 border-white">
                  <Phone className="mr-2 w-5 h-5" />
                  Contact Us
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <Clock className="w-8 h-8 text-pink-300 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Flexible Timings</h3>
                <p className="text-purple-100 text-sm">Schedule at your convenience</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <MapPin className="w-8 h-8 text-pink-300 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Serving Across India</h3>
                <p className="text-purple-100 text-sm">Online & in-person options</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <Shield className="w-8 h-8 text-pink-300 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">100% Confidential</h3>
                <p className="text-purple-100 text-sm">Your privacy guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarriageAstrology;