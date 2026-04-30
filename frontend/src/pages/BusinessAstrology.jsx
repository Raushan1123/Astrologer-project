import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Star, TrendingUp, Briefcase, DollarSign, Target, Shield, Clock, MapPin, Phone, Mail, ArrowRight, Users, BarChart3, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO';

const BusinessAstrology = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title="Business Astrology Consultation Ghaziabad - Growth Guidance by Acharyaa Indira Pandey"
        description="Get expert business astrology consultation in Ghaziabad by Acharyaa Indira Pandey. Strategic insights for entrepreneurs, startups & business growth. Book consultation now!"
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
            alt="Business Astrology Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Strategic Business Guidance</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6 leading-tight">
              Business Astrology Consultation
            </h1>
            <p className="text-xl md:text-2xl text-amber-600 font-semibold mb-8">
              by Acharyaa Indira Pandey
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              When it comes to making confident business decisions, the right guidance can make all the difference.
              Business Astrology Consultation in Ghaziabad is designed to help entrepreneurs, startups, and
              established business owners align their strategies with astrological insights for better growth and stability.
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

      {/* Unlock Growth Opportunities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Unlock Growth Opportunities with Business Astrology
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                  alt="Business Growth"
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Astrology is not just about predicting the future—it is a strategic tool that helps you
                  understand timing, opportunities, and challenges. With Business Astrology Consultation in Ghaziabad,
                  you can identify favorable periods for launching new ventures, expanding operations, or making
                  critical investments.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Acharyaa Indira Pandey combines deep astrological knowledge with practical business understanding
                  to provide personalized guidance. Whether you are facing financial instability or looking to scale
                  your business, this consultation helps you make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Business Insights Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 shadow-2xl bg-white border border-purple-100">
              <div className="text-center mb-8">
                <Target className="w-16 h-16 mx-auto text-amber-500 mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                  Personalized Business Insights for Better Decision-Making
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Every business is unique, and so are its challenges.
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Through Business Astrology Consultation in Ghaziabad, your birth chart and business details are
                  carefully analyzed to provide tailored solutions. This helps in identifying strengths, weaknesses,
                  and future opportunities.
                </p>

                <p className="text-gray-700 leading-relaxed text-lg">
                  From selecting the right business name to choosing the ideal partnership timing, astrology plays a
                  crucial role in shaping long-term success. The consultation ensures that your business decisions
                  are aligned with favorable planetary positions.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>




      {/* Services Offered Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Services Offered Under Business Astrology Consultation
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive astrological guidance for all aspects of your business success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Lightbulb,
                  title: "Business Name & Brand Analysis",
                  description: "Astrological evaluation of business names and branding for positive energy"
                },
                {
                  icon: Users,
                  title: "Partnership Compatibility",
                  description: "Evaluate partnership compatibility for harmonious business relationships"
                },
                {
                  icon: DollarSign,
                  title: "Financial Growth Predictions",
                  description: "Insights into financial stability and growth opportunities"
                },
                {
                  icon: TrendingUp,
                  title: "Investment & Expansion Timing",
                  description: "Identify favorable periods for investments and business expansion"
                },
                {
                  icon: Shield,
                  title: "Obstacle Solutions",
                  description: "Astrological remedies for overcoming business-related challenges"
                },
                {
                  icon: BarChart3,
                  title: "Market Opportunity Analysis",
                  description: "Strategic insights on market trends and business opportunities"
                }
              ].map((service, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white border border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
              <p className="text-gray-700 text-lg">
                <strong className="text-purple-900">Our Approach:</strong> These services are designed to provide
                clarity and direction, helping you minimize risks and maximize growth potential through strategic
                astrological guidance.
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
                Serving Ghaziabad and Clients Across India
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
                  Although based in Ghaziabad, Acharyaa Indira Pandey is serving throughout India, offering
                  online consultations for clients in different cities. This ensures that you can access expert
                  astrological guidance no matter where your business operates.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  With years of experience and a strong reputation, we have helped numerous businesses overcome
                  challenges and achieve success through accurate predictions and practical remedies.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Our Business Astrology Consultation in Ghaziabad combines traditional Vedic wisdom with modern
                  business understanding, ensuring practical and effective guidance for entrepreneurs and business owners.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/booking">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-semibold">
                      Book Business Consultation
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
                In addition to Business Astrology in Ghaziabad, we offer a wide range of astrology services
                designed to support every stage of life
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/services">
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Career Astrology</h3>
                  <p className="text-gray-600 text-sm">Professional guidance and career predictions</p>
                </Card>
              </Link>

              <Link to="/services">
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Marriage Astrology</h3>
                  <p className="text-gray-600 text-sm">Compatibility and marriage predictions</p>
                </Card>
              </Link>

              <Link to="/services">
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Vastu Consultation</h3>
                  <p className="text-gray-600 text-sm">Space and energy alignment solutions</p>
                </Card>
              </Link>

              <Link to="/services">
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Kundli Reading</h3>
                  <p className="text-gray-600 text-sm">Detailed birth chart analysis</p>
                </Card>
              </Link>
            </div>

            <div className="text-center mt-10">
              <Link to="/services">
                <Button className="bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white px-8 py-3 font-semibold">
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
              Ready to Transform Your Business Journey?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Get expert Business Astrology Consultation in Ghaziabad and make confident, informed decisions
              for sustainable growth and success.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/booking">
                <Button className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-xl">
                  Book Your Consultation Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg font-semibold shadow-xl border-2 border-white">
                  <Phone className="mr-2 w-5 h-5" />
                  Contact Us
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <Clock className="w-8 h-8 text-amber-300 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Flexible Timings</h3>
                <p className="text-purple-100 text-sm">Schedule at your convenience</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <MapPin className="w-8 h-8 text-amber-300 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Serving Across India</h3>
                <p className="text-purple-100 text-sm">Online & in-person options</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <Shield className="w-8 h-8 text-amber-300 mx-auto mb-3" />
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

export default BusinessAstrology;
