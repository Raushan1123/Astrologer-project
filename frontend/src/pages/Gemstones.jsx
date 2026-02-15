import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Sparkles, ShoppingCart, CheckCircle, Star } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Mock gemstones data (will be replaced with backend data)
const mockGemstones = [
  {
    id: '1',
    name: 'Ruby (Manik)',
    description: 'Powerful gemstone for Sun. Enhances leadership, confidence, and vitality.',
    price: 500000,  // ₹5,000 in paise (hidden from display)
    benefits: ['Boosts confidence', 'Enhances leadership', 'Improves vitality', 'Brings success'],
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    in_stock: true,
    weight: '3-5 carats',
    quality: 'AAA Grade Natural'
  },
  {
    id: '2',
    name: 'Pearl (Moti)',
    description: 'Gem for Moon. Brings emotional balance, peace, and mental clarity.',
    price: 300000,  // ₹3,000 (hidden from display)
    benefits: ['Emotional balance', 'Mental peace', 'Enhances intuition', 'Reduces stress'],
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    in_stock: true,
    weight: '5-7 carats',
    quality: 'Natural South Sea Pearl'
  },
  {
    id: '3',
    name: 'Red Coral (Moonga)',
    description: 'Mars gemstone. Provides courage, energy, and protection.',
    price: 250000,  // ₹2,500 (hidden from display)
    benefits: ['Increases courage', 'Boosts energy', 'Protection from enemies', 'Physical strength'],
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    in_stock: true,
    weight: '6-8 carats',
    quality: 'Natural Italian Coral'
  },
  {
    id: '4',
    name: 'Emerald (Panna)',
    description: 'Mercury stone. Enhances communication, intelligence, and business success.',
    price: 800000,  // ₹8,000 (hidden from display)
    benefits: ['Improves communication', 'Enhances intelligence', 'Business success', 'Memory boost'],
    image: 'https://images.unsplash.com/photo-1583937443566-f3e9f77d86ba?w=800',
    in_stock: true,
    weight: '3-5 carats',
    quality: 'Colombian Emerald AAA'
  },
  {
    id: '5',
    name: 'Yellow Sapphire (Pukhraj)',
    description: 'Jupiter gemstone. Brings wisdom, prosperity, and good fortune.',
    price: 1000000,  // ₹10,000 (hidden from display)
    benefits: ['Brings prosperity', 'Enhances wisdom', 'Good fortune', 'Marital happiness'],
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    in_stock: true,
    weight: '4-6 carats',
    quality: 'Ceylon Yellow Sapphire'
  },
  {
    id: '6',
    name: 'Blue Sapphire (Neelam)',
    description: 'Saturn stone. Powerful for career, discipline, and removing obstacles.',
    price: 1500000,  // ₹15,000 (hidden from display)
    benefits: ['Career advancement', 'Removes obstacles', 'Financial stability', 'Focus & discipline'],
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
    in_stock: true,
    weight: '4-6 carats',
    quality: 'Kashmir Blue Sapphire'
  }
];

const Gemstones = () => {
  const [gemstones, setGemstones] = useState(mockGemstones);
  const [loading, setLoading] = useState(false);

  // Uncomment when backend is ready
  // useEffect(() => {
  //   fetchGemstones();
  // }, []);

  // const fetchGemstones = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${API}/gemstones`);
  //     setGemstones(response.data);
  //   } catch (error) {
  //     console.error('Error fetching gemstones:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleInquiry = (gemstone) => {
    toast.success(`Inquiry sent for ${gemstone.name}! We'll contact you shortly.`);
    // In production, send inquiry to backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515942661900-94b3d1972591"
            alt="Gemstones Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 mb-6">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">Authentic Vedic Gemstones</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              Gemstone Catalog
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Authentic, energized gemstones personally selected and blessed by our astrologers
            </p>
          </div>
        </div>
      </section>

      {/* Gemstones Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gemstones.map((gemstone) => (
              <Card
                key={gemstone.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={gemstone.image}
                    alt={gemstone.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
                  
                  {/* Stock Badge */}
                  <div className="absolute top-4 right-4">
                    {gemstone.in_stock ? (
                      <Badge className="bg-green-500">In Stock</Badge>
                    ) : (
                      <Badge className="bg-red-500">Out of Stock</Badge>
                    )}
                  </div>

                  {/* Quality Badge */}
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-amber-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      {gemstone.quality}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-purple-900 mb-2">
                    {gemstone.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {gemstone.description}
                  </p>

                  {/* Specs */}
                  <div className="mb-4 text-sm">
                    <span className="text-gray-600">Weight: {gemstone.weight}</span>
                  </div>

                  {/* Benefits */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-purple-900 mb-2">Benefits:</p>
                    <div className="flex flex-wrap gap-2">
                      {gemstone.benefits.slice(0, 3).map((benefit, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleInquiry(gemstone)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                      disabled={!gemstone.in_stock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Inquire Now
                    </Button>
                    <Link to="/booking" className="flex-1">
                      <Button variant="outline" className="w-full border-purple-600 text-purple-700 hover:bg-purple-50">
                        Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Gemstones */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-12 text-center">
              Why Choose Our Gemstones?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: CheckCircle,
                  title: '100% Authentic',
                  description: 'All gemstones are certified and sourced from trusted suppliers'
                },
                {
                  icon: Sparkles,
                  title: 'Energized & Blessed',
                  description: 'Each gemstone is energized with Vedic mantras by our astrologers'
                },
                {
                  icon: Star,
                  title: 'Personalized Selection',
                  description: 'Gemstones recommended based on your birth chart analysis'
                }
              ].map((feature, index) => (
                <Card key={index} className="p-6 text-center bg-white hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-amber-50 text-center">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">
              Not Sure Which Gemstone is Right for You?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Book a consultation with our expert astrologers to get personalized gemstone recommendations based on your birth chart.
            </p>
            <Link to="/booking">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-6 text-lg font-semibold shadow-xl"
              >
                Book Consultation for Gemstone Guidance
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Gemstones;
