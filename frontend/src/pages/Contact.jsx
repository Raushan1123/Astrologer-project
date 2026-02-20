import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Youtube } from 'lucide-react';
import {
 Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { mockFAQs } from '../mockData';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1681673819004-695da4fa9328"
            alt="Contact Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Phone,
                titleKey: 'phoneTitle',
                content: '+91 8130420339',
                link: 'tel:+918130420339',
                color: 'purple'
              },
              {
                icon: Mail,
                titleKey: 'emailTitle',
                content: 'indirapandey2526@gmail.com',
                link: 'mailto:indirapandey2526@gmail.com',
                color: 'amber'
              },
              {
                icon: MapPin,
                titleKey: 'locationTitle',
                contentKey: 'location',
                link: '#map',
                color: 'purple'
              },
              {
                icon: Clock,
                titleKey: 'hoursTitle',
                contentKey: 'hoursValue',
                link: null,
                color: 'amber'
              }
            ].map((item, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-purple-50"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${
                  item.color === 'purple' ? 'from-purple-600 to-purple-700' : 'from-amber-500 to-amber-600'
                } flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-purple-900 mb-2">{t(`contact.${item.titleKey}`)}</h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-gray-600 hover:text-purple-700 transition-colors break-all"
                  >
                    {item.contentKey ? t(`contact.${item.contentKey}`) : item.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{item.contentKey ? t(`contact.${item.contentKey}`) : item.content}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8 shadow-2xl bg-gradient-to-br from-white to-purple-50">
              <h2 className="text-3xl font-bold text-purple-900 mb-6">{t('contact.formTitle')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium mb-2">
                    {t('contact.name')} <span className="text-red-500">{t('contact.required')}</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('contact.namePlaceholder')}
                    required
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium mb-2">
                      {t('contact.email')} <span className="text-red-500">{t('contact.required')}</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('contact.emailPlaceholder')}
                      required
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium mb-2">
                      {t('contact.phone')}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t('contact.phonePlaceholder')}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-700 font-medium mb-2">
                    {t('contact.subject')}
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={t('contact.subjectPlaceholder')}
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium mb-2">
                    {t('contact.message')} <span className="text-red-500">{t('contact.required')}</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('contact.messagePlaceholder')}
                    rows={6}
                    required
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-6 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      {t('contact.send')}
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              {/* Map */}
              <Card className="overflow-hidden shadow-xl">
                <div className="h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192563!2d77.06889754941634!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sGhaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ghaziabad Location"
                  />
                </div>
              </Card>

              {/* Social Media */}
              <Card className="p-6 shadow-xl bg-gradient-to-br from-purple-900 to-purple-800 text-white">
                <h3 className="text-2xl font-bold mb-4">{t('contact.socialTitle')}</h3>
                <p className="text-purple-100 mb-6">
                  {t('contact.socialSubtitle')}
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-amber-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-amber-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-amber-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </Card>

              {/* WhatsApp Quick Contact */}
              <Card className="p-6 shadow-xl bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Quick WhatsApp Contact</h3>
                    <p className="text-sm text-gray-600 mb-3">Get instant responses to your queries</p>
                    <a
                      href="https://wa.me/918130420339"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Chat on WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4 text-center">
              {t('contact.faqTitle')}
            </h2>
            <p className="text-center text-gray-600 mb-8">
              {t('contact.faqSubtitle')}
            </p>
            <Card className="p-8 shadow-xl bg-white">
              <Accordion type="single" collapsible className="w-full">
                {mockFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left text-lg font-semibold text-purple-900 hover:text-purple-700">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
