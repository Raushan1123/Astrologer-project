import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Award, Users, Heart, Shield, Star, Target, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-amber-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1681673819004-695da4fa9328"
            alt="Cosmic Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              About Mrs. Indira Pandey
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              A journey of 9+ years in guiding souls through the ancient wisdom of Vedic astrology
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1554355202-11fbc45c7157"
                  alt="Mrs. Indira Pandey"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <Card className="absolute -bottom-6 -right-6 p-6 bg-white shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-purple-900">20+</p>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
                My Journey Into Astrology
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  My journey into the mystical world of Vedic astrology began over two decades ago, 
                  driven by a deep fascination with the cosmic patterns that shape our lives. What 
                  started as a personal quest for understanding has blossomed into a profound calling 
                  to guide others.
                </p>
                <p>
                  Through 20+ years of dedicated study under renowned Vedic scholars and countless hours 
                  of chart analysis, I have developed a unique approach that combines traditional 
                  wisdom with practical, modern-day applications. My practice is rooted in authenticity, 
                  compassion, and a genuine desire to help people find clarity in their life's journey.
                </p>
                <p>
                  Having guided over 800 individuals from diverse backgrounds—including professionals, 
                  entrepreneurs, and even well-known personalities—I have witnessed firsthand the 
                  transformative power of astrological guidance when delivered with care and precision.
                </p>
              </div>

              <div className="mt-8">
                <Link to="/booking">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Book Your Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                My Philosophy & Approach
              </h2>
              <p className="text-lg text-gray-600">
                Blending ancient wisdom with modern understanding for practical life guidance
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Star,
                  title: 'Personalized Charts',
                  description: 'Every birth chart is unique. I provide detailed, individualized analysis tailored to your specific planetary positions and life circumstances.'
                },
                {
                  icon: Heart,
                  title: 'Practical Remedies',
                  description: 'Ancient wisdom meets modern life. I offer remedies that are practical, easy to follow, and seamlessly integrate into your daily routine.'
                },
                {
                  icon: Target,
                  title: 'Traditional + Modern',
                  description: 'Combining time-tested Vedic techniques with contemporary understanding to provide relevant and actionable guidance.'
                }
              ].map((item, index) => (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                Why Clients Trust Me
              </h2>
              <p className="text-lg text-gray-600">
                Building lasting relationships through accuracy, integrity, and compassion
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Award,
                  title: 'Proven Accuracy',
                  description: 'With a 95%+ client satisfaction rate and 20+ years of experience, my predictions are known for their precision and relevance. Decades of experience have honed my ability to read charts with remarkable accuracy.',
                  stats: '95% Satisfaction'
                },
                {
                  icon: Users,
                  title: 'Trusted by Many',
                  description: 'From working professionals to business leaders and even celebrities, my client base reflects the trust and credibility I have built over the years.',
                  stats: '800+ Clients'
                },
                {
                  icon: Shield,
                  title: 'Complete Confidentiality',
                  description: 'Your privacy is my priority. All consultations are conducted with utmost discretion. Many high-profile clients trust me because they know their information is safe.',
                  stats: '100% Private'
                },
                {
                  icon: Heart,
                  title: 'Compassionate Guidance',
                  description: 'Beyond charts and predictions, I genuinely care about helping you navigate life\'s challenges. My approach is empathetic, non-judgmental, and focused on your wellbeing.',
                  stats: '90-100 Weekly Consultations'
                }
              ].map((item, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-purple-600"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-3">{item.description}</p>
                      <div className="inline-block px-3 py-1 bg-purple-100 rounded-full">
                        <span className="text-sm font-semibold text-purple-700">{item.stats}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Celebrity Clients Note */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-amber-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Professionals & Celebrities
            </h2>
            <p className="text-lg text-purple-100 leading-relaxed mb-6">
              My client list includes well-known personalities and celebrities who value discretion 
              and accuracy. Names remain confidential to respect their privacy, but their continued 
              trust speaks volumes about the quality of guidance provided.
            </p>
            <p className="text-purple-200 italic">
              "Your privacy is sacred. Your trust is my responsibility."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Experience personalized astrological guidance that brings clarity, direction, and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Book Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white px-8 transform hover:scale-105 transition-all duration-300"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
