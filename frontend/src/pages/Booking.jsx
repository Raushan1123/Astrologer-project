import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { CheckCircle, Clock, Video, MapPin, Sparkles } from 'lucide-react';
import { mockServices, astrologers } from '../mockData';
import { useLanguage } from '../contexts/LanguageContext';
import DisclaimerModal from '../components/DisclaimerModal';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Booking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [canBookFirstTime, setCanBookFirstTime] = useState(false);
  const [checkingFirstBooking, setCheckingFirstBooking] = useState(true);
  const [preSelectedService, setPreSelectedService] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    timeOfBirth: '',
    placeOfBirth: '',
    astrologer: '',
    service: '',
    consultationType: '',
    consultationDuration: '',
    preferredDate: null,
    preferredTime: '',
    message: ''
  });

  // Get translated astrologer data
  const getTranslatedAstrologers = () => {
    return [
      {
        id: "1",
        name: t('team.astrologer1Name'),
        experience: "20"
      },
      {
        id: "2",
        name: t('team.astrologer2Name'),
        experience: "40"
      },
      {
        id: "3",
        name: t('team.astrologer3Name'),
        experience: "2"
      }
    ];
  };

  // Get translated services
  const getTranslatedServices = () => {
    return [
      { id: "1", title: t('services.birthChart') },
      { id: "2", title: t('services.career') },
      { id: "3", title: t('services.marriage') },
      { id: "4", title: t('services.health') },
      { id: "5", title: t('services.vastu') },
      { id: "6", title: t('services.palmistry') },
      { id: "7", title: t('services.gemstone') },
      { id: "8", title: t('services.childbirth') },
      { id: "9", title: t('services.namingCeremony') }
    ];
  };

  const translatedAstrologers = getTranslatedAstrologers();
  const translatedServices = getTranslatedServices();

  // Handle disclaimer acceptance
  const handleDisclaimerAccept = () => {
    setDisclaimerAccepted(true);
    setShowDisclaimer(false);
    toast.success('Thank you for accepting the terms. You may now proceed with booking.');
  };

  // Handle disclaimer decline
  const handleDisclaimerDecline = () => {
    toast.error('You must accept the disclaimer to book a consultation.');
    navigate('/');
  };

  // Handle URL parameters for pre-selected service
  useEffect(() => {
    const serviceId = searchParams.get('serviceId');
    const serviceName = searchParams.get('serviceName');
    const duration = searchParams.get('duration');
    const price = searchParams.get('price');
    const discountPercent = searchParams.get('discountPercent');

    if (serviceId && serviceName) {
      setPreSelectedService({
        id: serviceId,
        name: serviceName,
        duration: duration,
        price: parseFloat(price),
        discountPercent: parseFloat(discountPercent)
      });

      // Auto-populate the service field
      setFormData(prev => ({ ...prev, service: serviceId }));
    }
  }, [searchParams]);

  // Check if user can book first-time consultation
  useEffect(() => {
    const checkFirstBookingStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setCheckingFirstBooking(false);
          return;
        }

        const response = await axios.get(`${API}/auth/first-booking-status`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setCanBookFirstTime(response.data.can_book_first_time);
        setCheckingFirstBooking(false);
      } catch (error) {
        console.error('Error checking first booking status:', error);
        setCheckingFirstBooking(false);
      }
    };

    checkFirstBookingStatus();
  }, []);

  // Calculate price based on service and duration
  useEffect(() => {
    if (formData.service && formData.consultationDuration) {
      // If duration is 5-10 mins, it's free
      if (formData.consultationDuration === '5-10') {
        setCalculatedPrice(0);
      } else if (formData.consultationDuration === '10+') {
        // Find the selected service from mockServices
        const selectedService = mockServices.find(s => s.id === formData.service);
        if (selectedService) {
          // Calculate discounted price
          const discountedPrice = Math.round(selectedService.actualPrice * (1 - selectedService.discountPercent / 100));
          setCalculatedPrice(discountedPrice);
        }
      }
    } else {
      setCalculatedPrice(0);
    }
  }, [formData.service, formData.consultationDuration]);

  // Fetch slots when astrologer or date changes
  useEffect(() => {
    if (formData.astrologer && formData.preferredDate) {
      fetchAvailableSlots(formData.astrologer, formData.preferredDate);
    } else {
      setAvailableSlots([]);
    }
  }, [formData.astrologer, formData.preferredDate]);

  // Load Razorpay script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle Razorpay payment
  const handlePayment = async (bookingData) => {
    const res = await loadRazorpay();
    if (!res) {
      toast.error('Razorpay SDK failed to load');
      return;
    }

    // Get Razorpay key from backend
    try {
      const keyResponse = await axios.get(`${API}/razorpay-key`);
      const key = keyResponse.data.key;

      const options = {
        key: key,
        amount: bookingData.amount,
        currency: 'INR',
        name: 'Acharyaa Indira Pandey Astrology',
        description: `${bookingData.service} - ${bookingData.consultation_duration} mins`,
        order_id: bookingData.razorpay_order_id,
        handler: async function (response) {
          try {
            // Verify payment
            await axios.post(`${API}/verify-payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: bookingData.id
            });

            toast.success('Payment successful! Booking confirmed.');
            navigate(`/booking-success/${bookingData.id}`);
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        modal: {
          ondismiss: function() {
            toast.warning('Payment cancelled. Your booking is saved - you can complete payment later.');
            // Navigate to booking success page so user can see their booking and retry payment
            navigate(`/booking-success/${bookingData.id}`);
          }
        },
        theme: {
          color: '#7c3aed'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      // If Razorpay is not configured, inform user and save booking anyway
      if (error.response?.status === 400) {
        toast.info('Payment gateway not configured yet. Your booking has been saved - our team will contact you for payment.');
        navigate(`/booking-success/${bookingData.id}`);
      } else {
        toast.error('Payment initialization failed. Please try again.');
      }
    }
  };

  // Fetch available time slots when astrologer and date are selected
  const fetchAvailableSlots = async (astrologer, date) => {
    if (!astrologer || !date) {
      setAvailableSlots([]);
      return;
    }

    setLoadingSlots(true);
    try {
      const response = await axios.get(`${API}/available-slots`, {
        params: { astrologer, date }
      });
      setAvailableSlots(response.data.slots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      toast.error('Failed to load available time slots');
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.astrologer || !formData.consultationType || !formData.consultationDuration) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate date and time slot selection
    if (!formData.preferredDate || !formData.preferredTime) {
      toast.error('Please select a date and time slot for your consultation');
      return;
    }

    setLoading(true);

    try {
      // Prepare data for backend (convert camelCase to snake_case)
      const bookingPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth || null,
        time_of_birth: formData.timeOfBirth || null,
        place_of_birth: formData.placeOfBirth || null,
        astrologer: formData.astrologer,
        service: formData.service,
        consultation_type: formData.consultationType,
        consultation_duration: formData.consultationDuration,
        preferred_date: formData.preferredDate || null,
        preferred_time: formData.preferredTime || null,
        message: formData.message || ''
      };

      console.log('Booking payload:', bookingPayload);

      // Create booking via backend API
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${API}/bookings`, bookingPayload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const bookingData = response.data;

      // Check if payment is required (duration > 10 mins means paid consultation)
      if (bookingData.amount > 0 && bookingData.razorpay_order_id) {
        // Trigger Razorpay payment
        await handlePayment(bookingData);
      } else {
        // Free consultation (5-10 mins) - no payment needed
        toast.success('Booking submitted successfully! We will contact you within 24 hours.');
        navigate(`/booking-success/${bookingData.id}`);
      }

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: null,
        timeOfBirth: '',
        placeOfBirth: '',
        astrologer: '',
        service: '',
        consultationType: '',
        consultationDuration: '',
        preferredDate: null,
        preferredTime: '',
        message: ''
      });

    } catch (error) {
      console.error('Booking error:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);

      // Handle different error response formats
      let errorMessage = 'Failed to submit booking. Please try again.';

      if (error.response?.data) {
        const errorData = error.response.data;
        console.log('Error data type:', typeof errorData);
        console.log('Error data detail:', errorData.detail);

        // Handle FastAPI validation errors
        if (errorData.detail && Array.isArray(errorData.detail)) {
          // Extract validation error messages
          errorMessage = errorData.detail.map(err => {
            const field = err.loc ? err.loc[err.loc.length - 1] : 'field';
            const message = err.msg || 'Invalid value';
            return `${field}: ${message}`;
          }).join(', ');
        } else if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
        } else if (typeof errorData.detail === 'object' && errorData.detail !== null) {
          // Handle object detail
          errorMessage = JSON.stringify(errorData.detail);
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      }

      console.log('Final error message:', errorMessage);
      toast.error(String(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Disclaimer Modal */}
      <DisclaimerModal
        isOpen={showDisclaimer}
        onAccept={handleDisclaimerAccept}
        onDecline={handleDisclaimerDecline}
      />

      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-amber-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1650365449083-b3113ff48337"
            alt="Booking Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Book Your Personalized Session</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              Book a Consultation
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Take the first step towards clarity and guidance. Fill out the form below to schedule your session.
            </p>
          </div>
        </div>
      </section>

      {/* Holi Offer Banner */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 p-1 shadow-2xl">
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1 text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-3">
                      🎉 Holi Special Offer! 🎊
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 font-semibold mb-2">
                      Get Expert Astrology Consultation at Special Prices
                    </p>
                    <p className="text-md text-orange-600 font-bold animate-pulse">
                      ⏰ Limited Time Offer - Grab the Deal Now!
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-400 to-pink-500 text-white px-8 py-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                    <p className="text-sm font-semibold mb-1">Special Discount</p>
                    <p className="text-4xl font-bold mb-2">UP TO 25% OFF</p>
                    <p className="text-xs opacity-90">On All Consultations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">Choose Your Consultation Mode</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Online Consultation</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Connect via video call from anywhere. Convenient, comfortable, and just as effective as in-person sessions.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">In-Person Consultation</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Visit our Ghaziabad location for a personal, face-to-face consultation experience.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 shadow-2xl bg-gradient-to-br from-white to-purple-50">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-6">{t('booking.personalInfo')}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium mb-2">
                        {t('booking.name')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t('booking.namePlaceholder')}
                        required
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium mb-2">
                        {t('booking.email')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t('booking.emailPlaceholder')}
                        required
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium mb-2">
                        {t('booking.phone')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t('booking.phonePlaceholder')}
                        required
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="placeOfBirth" className="text-gray-700 font-medium mb-2">
                        {t('booking.placeOfBirth')}
                      </Label>
                      <Input
                        id="placeOfBirth"
                        name="placeOfBirth"
                        value={formData.placeOfBirth}
                        onChange={handleInputChange}
                        placeholder={t('booking.placeOfBirthPlaceholder')}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Birth Details */}
                <div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-6">{t('booking.birthDetails')}</h3>
                  <p className="text-sm text-gray-600 mb-4">{t('booking.birthDetailsNote')}</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium mb-2">
                        {t('booking.dateOfBirth')}
                      </Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        max={new Date().toISOString().split('T')[0]}
                        value={formData.dateOfBirth ? (typeof formData.dateOfBirth === 'string' ? formData.dateOfBirth : formData.dateOfBirth.toISOString().split('T')[0]) : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="timeOfBirth" className="text-gray-700 font-medium mb-2">
                        {t('booking.timeOfBirth')}
                      </Label>
                      <Input
                        id="timeOfBirth"
                        name="timeOfBirth"
                        type="time"
                        value={formData.timeOfBirth}
                        onChange={handleInputChange}
                        className="border-purple-200 focus:border-purple-500"
                        placeholder="HH:MM"
                      />
                      <p className="text-xs text-gray-500 mt-1">If known (improves accuracy)</p>
                    </div>
                  </div>
                </div>

                {/* Consultation Details */}
                <div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-6">{t('booking.consultationDetails')}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="astrologer" className="text-gray-700 font-medium mb-2">
                        {t('booking.selectAstrologer')} <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.astrologer}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, astrologer: value }))}
                        required
                      >
                        <SelectTrigger className="border-purple-200">
                          <SelectValue placeholder={t('booking.selectAstrologer')} />
                        </SelectTrigger>
                        <SelectContent>
                          {translatedAstrologers.map((astro) => (
                            <SelectItem key={astro.id} value={astro.name}>
                              {astro.name} ({astro.experience}+ {t('team.years')})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="service" className="text-gray-700 font-medium mb-2">
                        {t('booking.selectService')} <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
                        required
                        disabled={preSelectedService !== null}
                      >
                        <SelectTrigger className="border-purple-200">
                          <SelectValue placeholder={preSelectedService ? preSelectedService.name : t('booking.selectService')} />
                        </SelectTrigger>
                        <SelectContent>
                          {translatedServices.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {preSelectedService && (
                        <p className="text-xs text-purple-600 mt-1">
                          ✓ Service pre-selected from Services page
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="consultationDuration" className="text-gray-700 font-medium mb-2">
                        {t('booking.duration')} <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.consultationDuration}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, consultationDuration: value }))}
                        required
                        disabled={checkingFirstBooking}
                      >
                        <SelectTrigger className="border-purple-200">
                          <SelectValue placeholder={checkingFirstBooking ? "Loading..." : t('booking.duration')} />
                        </SelectTrigger>
                        <SelectContent>
                          {canBookFirstTime && (
                            <SelectItem value="5-10">
                              5-10 mins (Free for first-time users)
                            </SelectItem>
                          )}
                          <SelectItem value="10+">
                            10+ mins {formData.service && calculatedPrice > 0 ? `(₹${calculatedPrice})` : ''}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {!canBookFirstTime && !checkingFirstBooking && (
                        <p className="text-sm text-amber-600 mt-2">
                          ℹ️ First-time free consultation (5-10 mins) is only available for your first booking.
                        </p>
                      )}
                      {calculatedPrice > 0 && formData.consultationDuration === '10+' && (
                        <div className="mt-3 p-3 bg-gradient-to-br from-purple-50 to-amber-50 rounded-lg border border-purple-200">
                          <p className="text-sm font-semibold text-purple-900">
                            💰 Consultation Fee: <span className="text-xl">₹{calculatedPrice}</span>
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            🎉 Holi Offer: 25% discount already applied!
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="consultationType" className="text-gray-700 font-medium mb-2">
                        {t('booking.consultationType')} <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.consultationType}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, consultationType: value }))}
                        required
                      >
                        <SelectTrigger className="border-purple-200">
                          <SelectValue placeholder={t('booking.consultationType')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">{t('booking.online')}</SelectItem>
                          <SelectItem value="inperson">{t('booking.inPerson')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="preferredDate" className="text-gray-700 font-medium mb-2">
                        {t('booking.preferredDate')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.preferredDate ? (typeof formData.preferredDate === 'string' ? formData.preferredDate : formData.preferredDate.toISOString().split('T')[0]) : ''}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, preferredDate: e.target.value, preferredTime: '' }));
                        }}
                        className="border-purple-200 focus:border-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="preferredTime" className="text-gray-700 font-medium mb-2">
                        {t('booking.preferredTime')} <span className="text-red-500">*</span>
                      </Label>
                      {!formData.astrologer || !formData.preferredDate ? (
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-center text-sm text-gray-500">
                          {t('booking.selectTime')}
                        </div>
                      ) : loadingSlots ? (
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-md text-center">
                          <Clock className="w-5 h-5 animate-spin mx-auto mb-2 text-purple-600" />
                          <p className="text-sm text-purple-700">{t('booking.loadingSlots')}</p>
                        </div>
                      ) : availableSlots.length === 0 ? (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-center text-sm text-amber-700">
                          {t('booking.noSlots')}
                        </div>
                      ) : (
                        <Select
                          value={formData.preferredTime}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTime: value }))}
                          required
                        >
                          <SelectTrigger className="border-purple-200">
                            <SelectValue placeholder={t('booking.selectTime')} />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSlots.map((slot, index) => (
                              <SelectItem key={index} value={slot.start_time}>
                                {slot.display}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {availableSlots.length > 0 && (
                        <p className="text-xs text-green-600 mt-1">
                          {availableSlots.length} slot{availableSlots.length !== 1 ? 's' : ''} available
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium mb-2">
                    {t('booking.message')}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('booking.messagePlaceholder')}
                    rows={5}
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-6 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Clock className="mr-2 w-5 h-5 animate-spin" />
                        {t('booking.submitting')}
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 w-5 h-5" />
                        {t('booking.submit')}
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Your selected time slot will be reserved. We'll send you a confirmation email shortly.
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">What Happens Next?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: 'Select Time Slot',
                  description: 'Choose your preferred astrologer, date, and available time slot from real-time availability.',
                  icon: Clock
                },
                {
                  step: '2',
                  title: 'Payment',
                  description: 'Complete the payment securely through Razorpay. Your time slot will be confirmed immediately.',
                  icon: CheckCircle
                },
                {
                  step: '3',
                  title: 'Consultation',
                  description: 'On the scheduled date and time, connect via your chosen mode for your personalized session.',
                  icon: Sparkles
                }
              ].map((item, index) => (
                <Card key={index} className="p-6 text-center bg-white hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-900 mb-2">Step {item.step}</div>
                  <h3 className="text-xl font-bold text-purple-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Booking;
