import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const BookingHelpBanner = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Desktop Version - Bottom Sticky Banner */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40 animate-slide-up">
        <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 text-white shadow-2xl">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {t('helpBanner.title', 'Need Help with Booking?')}
                    </p>
                    <p className="text-xs text-purple-100">
                      {t('helpBanner.subtitle', 'Our team is here to assist you')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a href="tel:+918792967417">
                  <Button className="bg-white text-purple-700 hover:bg-purple-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Phone className="w-4 h-4 mr-2" />
                    Call: +91 8792967417
                  </Button>
                </a>
                <a
                  href="https://wa.me/918792967417?text=Hello,%20I%20need%20help%20with%20booking%20a%20consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version - Full Banner */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 animate-slide-up">
        <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 text-white shadow-2xl">
          <div className="px-4 py-3">
            {/* Title Section */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold leading-tight">
                  {t('helpBanner.title', 'Need Help with Booking?')}
                </p>
                <p className="text-xs text-purple-100 leading-tight">
                  {t('helpBanner.subtitle', 'Call us for assistance')}
                </p>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="flex gap-2">
              <a href="tel:+918792967417" className="flex-1">
                <Button className="w-full bg-white text-purple-700 hover:bg-purple-50 font-bold shadow-lg text-sm py-2.5">
                  <Phone className="w-4 h-4 mr-1.5" />
                  {t('helpBanner.callButton', 'Call Now')}
                </Button>
              </a>
              <a
                href="https://wa.me/918792967417?text=Hello,%20I%20need%20help%20with%20booking%20a%20consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg text-sm py-2.5">
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHelpBanner;

