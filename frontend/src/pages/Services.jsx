import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { mockServices } from '../mockData';
import { ArrowRight, Star, Briefcase, Heart, Activity, Home, Hash, Sparkles, CheckCircle } from 'lucide-react';

const iconMap = {
  Star,
  Briefcase,
  Heart,
  Activity,
  Home,
  Hash
};

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1729335511904-9b8690184935"
            alt="Services Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Comprehensive Astrological Solutions</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Personalized guidance for every aspect of your life through the wisdom of Vedic astrology
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Star;
              
              return (
                <Card
                  key={service.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                >
                  {/* Service Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute bottom-4 left-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-xl">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    <Link to="/booking">
                      <Button
                        variant="ghost"
                        className="text-purple-700 hover:text-purple-900 p-0 hover:bg-transparent group/btn"
                      >
                        Book This Service
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                What's Included in Every Consultation
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive analysis and personalized guidance tailored to your needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Detailed Birth Chart Analysis',
                  description: 'In-depth examination of your complete birth chart with planetary positions and house placements'
                },
                {
                  title: 'Personalized Predictions',
                  description: 'Specific forecasts related to your questions and concerns based on current planetary transits'
                },
                {
                  title: 'Practical Remedies',
                  description: 'Easy-to-follow Vedic remedies including mantras, gemstones, and lifestyle adjustments'
                },
                {
                  title: 'Future Guidance',
                  description: 'Insights into upcoming opportunities and challenges with timing and recommendations'
                },
                {
                  title: 'Question & Answer Session',
                  description: 'Dedicated time to address all your specific questions and concerns'
                },
                {
                  title: 'Follow-up Support',
                  description: 'Email support for clarifications within 7 days of consultation'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-amber-50 border-2 border-purple-200">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-4">
                Consultation Fees
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Consultation fees depend on the client's requirements and type of service. 
                Pricing varies accordingly based on the complexity and depth of analysis needed.
              </p>
              <p className="text-gray-600 mb-8">
                Please contact us for a detailed quotation tailored to your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Book Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white px-8 transform hover:scale-105 transition-all duration-300"
                  >
                    Get Quote
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Consultation Modes */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Flexible Consultation Options
              </h2>
              <p className="text-lg text-purple-100">
                Choose the mode that works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-6 shadow-xl">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Online Consultation</h3>
                <p className="text-purple-100 leading-relaxed mb-4">
                  Connect from anywhere in the world via video call. Perfect for clients who prefer 
                  the convenience of consulting from home. All you need is a stable internet connection.
                </p>
                <ul className="space-y-2 text-purple-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    Video call via Zoom/Google Meet
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    Convenient and time-saving
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    Available worldwide
                  </li>
                </ul>
              </Card>

              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 shadow-xl">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">In-Person Consultation</h3>
                <p className="text-purple-100 leading-relaxed mb-4">
                  Meet face-to-face at our Ghaziabad location for a more personal and immersive 
                  consultation experience. Ideal for detailed sessions and remedy discussions.
                </p>
                <ul className="space-y-2 text-purple-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    Personal interaction
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    Detailed remedy consultation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    Located in Ghaziabad, India
                  </li>
                </ul>
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
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Book your consultation today and take the first step towards clarity and guidance.
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

export default Services;
