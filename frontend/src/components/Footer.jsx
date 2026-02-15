import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-amber-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Mrs. Indira Pandey</h3>
                <p className="text-xs text-purple-300">Vedic Astrologer</p>
              </div>
            </div>
            <p className="text-sm text-purple-200 leading-relaxed">
              Guiding lives with 9+ years of Vedic astrology expertise. Trusted by 800+ clients for accurate predictions and personalized remedies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-300">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/services', label: 'Services' },
                { path: '/testimonials', label: 'Testimonials' },
                { path: '/blog', label: 'Blog' },
                { path: '/booking', label: 'Book Consultation' }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-purple-200 hover:text-amber-300 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-300">Services</h4>
            <ul className="space-y-2">
              {[
                'Birth Chart Analysis',
                'Career Guidance',
                'Marriage Compatibility',
                'Health Insights',
                'Vastu Consultation',
                'Numerology'
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-purple-200 hover:text-amber-300 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-300">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-amber-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <a
                  href="mailto:indirapandey2526@gmail.com"
                  className="text-sm text-purple-200 hover:text-amber-300 transition-colors break-all"
                >
                  indirapandey2526@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-amber-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <a
                  href="tel:+918130420339"
                  className="text-sm text-purple-200 hover:text-amber-300 transition-colors"
                >
                  +91 8130420339
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-purple-200">
                  Ghaziabad, India
                </span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-amber-300">Follow Us</h5>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-purple-800 hover:bg-amber-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-purple-800 hover:bg-amber-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-purple-800 hover:bg-amber-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-purple-300">
              © {currentYear} Mrs. Indira Pandey. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-purple-300 hover:text-amber-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-purple-300 hover:text-amber-300 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
