import React, { useState, useEffect, useCallback } from 'react';
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
import { useAuth } from '../contexts/AuthContext';
import DisclaimerModal from '../components/DisclaimerModal';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Booking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();
  const { user } = useAuth();
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

  // State for detected country
  const [detectedCountry, setDetectedCountry] = useState('India');
  const [loadingCountry, setLoadingCountry] = useState(true);

  // State for slot reservation (prevent double bookings)
  const [reservedSlot, setReservedSlot] = useState(null);
  const [reservationTimer, setReservationTimer] = useState(null);

  // Detect country from IP on component mount
  useEffect(() => {
    let isMounted = true;

    const detectCountry = async () => {
      try {
        setLoadingCountry(true);

        // Check if there's a country parameter passed from Services page
        const urlParams = new URLSearchParams(window.location.search);
        const countryFromUrl = urlParams.get('country');
        const testCountry = urlParams.get('test_country');

        // Priority: country from URL > test_country > detect from IP
        if (countryFromUrl) {
          if (isMounted) {
            setDetectedCountry(countryFromUrl);
            setLoadingCountry(false);
          }
          return;
        }

        // Otherwise, detect from IP or use test_country
        let url = `${API}/detect-country`;
        if (testCountry) {
          url += `?test_country=${encodeURIComponent(testCountry)}`;
        }

        const response = await axios.get(url, {
          timeout: 5000 // 5 second timeout
        });

        const country = response.data.country || 'India';
        if (isMounted) {
          setDetectedCountry(country);
          setLoadingCountry(false);
        }
      } catch (error) {
        console.error('Error detecting country:', error.message);
        if (isMounted) {
          setDetectedCountry('India');
          setLoadingCountry(false);
        }
      }
    };

    detectCountry();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-populate user data from logged-in user
  useEffect(() => {
    if (user && typeof user === 'object') {
      try {
        setFormData(prev => ({
          ...prev,
          name: user.name || prev.name || '',
          email: user.email || prev.email || '',
          phone: user.phone || prev.phone || ''
        }));
      } catch (error) {
        console.error('Error auto-populating user data:', error);
      }
    }
  }, [user]);

  // Get translated astrologer data with error handling
  const getTranslatedAstrologers = () => {
    try {
      return [
        {
          id: "1",
          name: t('team.astrologer1Name') || 'Astrologer 1',
          experience: "20"
        },
        {
          id: "3",
          name: t('team.astrologer3Name') || 'Astrologer 2',
          experience: "2"
        }
      ];
    } catch (error) {
      console.error('Error getting translated astrologers:', error);
      return [];
    }
  };

  // Get translated services with error handling
  const getTranslatedServices = () => {
    try {
      return [
        { id: "1", title: t('services.birthChart') || 'Birth Chart Analysis' },
        { id: "2", title: t('services.career') || 'Career Guidance' },
        { id: "3", title: t('services.marriage') || 'Marriage Compatibility' },
        { id: "4", title: t('services.health') || 'Health Insights' },
        { id: "5", title: t('services.vastu') || 'Vastu Consultation' },
        { id: "6", title: t('services.palmistry') || 'Palmistry' },
        { id: "7", title: t('services.gemstone') || 'Gemstone Remedies' },
        { id: "8", title: t('services.childbirth') || 'Childbirth Timing' },
        { id: "9", title: t('services.namingCeremony') || 'Naming Ceremony' }
      ];
    } catch (error) {
      console.error('Error getting translated services:', error);
      return [];
    }
  };

  const translatedAstrologers = getTranslatedAstrologers() || [];
  const translatedServices = getTranslatedServices() || [];

  // Handle disclaimer acceptance
  const handleDisclaimerAccept = () => {
    setDisclaimerAccepted(true);
    setShowDisclaimer(false);
    toast.success('Thank you for accepting the terms. You may now proceed with booking.');
  };

  // Handle disclaimer decline
  const handleDisclaimerDecline = () => {
    toast.error(t('booking.disclaimerError'));
    navigate('/');
  };

  // Handle URL parameters for pre-selected service
  useEffect(() => {
    try {
      const serviceId = searchParams.get('serviceId');
      const serviceName = searchParams.get('serviceName');
      const duration = searchParams.get('duration');
      const price = searchParams.get('price');
      const discountPercent = searchParams.get('discountPercent');

      if (serviceId && serviceName) {
        const parsedPrice = price ? parseFloat(price) : 0;
        const parsedDiscount = discountPercent ? parseFloat(discountPercent) : 0;

        // Validate parsed values
        if (!isNaN(parsedPrice) && !isNaN(parsedDiscount)) {
          setPreSelectedService({
            id: serviceId,
            name: serviceName,
            duration: duration || '',
            price: parsedPrice,
            discountPercent: parsedDiscount
          });

          // Auto-populate the service field
          setFormData(prev => ({ ...prev, service: serviceId }));
        }
      }
    } catch (error) {
      console.error('Error parsing URL parameters:', error);
    }
  }, [searchParams]);

  // Check if user can book first-time consultation
  useEffect(() => {
    let isMounted = true;

    const checkFirstBookingStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          if (isMounted) setCheckingFirstBooking(false);
          return;
        }

        const response = await axios.get(`${API}/auth/first-booking-status`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000
        });

        if (isMounted) {
          setCanBookFirstTime(response.data?.can_book_first_time || false);
          setCheckingFirstBooking(false);
        }
      } catch (error) {
        console.error('Error checking first booking status:', error.message);
        if (isMounted) {
          setCanBookFirstTime(false);
          setCheckingFirstBooking(false);
        }
      }
    };

    checkFirstBookingStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  // PPP (Purchasing Power Parity) multipliers for different countries/regions
  const getPPPMultiplier = (country) => {
    const countryLower = country.toLowerCase();

    // High-income countries (Higher PPP multiplier)
    const highIncomeCountries = {
      'united states': 3.5,
      'usa': 3.5,
      'canada': 3.2,
      'united kingdom': 3.0,
      'uk': 3.0,
      'australia': 3.2,
      'new zealand': 3.0,
      'switzerland': 4.0,
      'norway': 3.8,
      'denmark': 3.5,
      'sweden': 3.3,
      'germany': 2.8,
      'france': 2.8,
      'netherlands': 2.9,
      'belgium': 2.8,
      'austria': 2.8,
      'ireland': 3.0,
      'singapore': 2.5,
      'hong kong': 2.5,
      'japan': 2.3,
      'south korea': 2.0,
    };

    // Upper-middle-income countries (Medium-high PPP multiplier)
    const upperMiddleIncomeCountries = {
      'united arab emirates': 2.8,
      'uae': 2.8,
      'dubai': 2.8,
      'saudi arabia': 2.5,
      'qatar': 3.0,
      'kuwait': 2.7,
      'bahrain': 2.5,
      'oman': 2.3,
      'israel': 2.5,
      'italy': 2.5,
      'spain': 2.3,
      'portugal': 2.0,
      'greece': 1.8,
      'poland': 1.7,
      'czech republic': 1.8,
      'malaysia': 1.5,
      'china': 1.8,
      'russia': 1.5,
      'brazil': 1.6,
      'mexico': 1.7,
      'argentina': 1.5,
      'chile': 1.8,
      'turkey': 1.4,
      'south africa': 1.6,
    };

    // Lower-middle-income countries (Medium PPP multiplier)
    const lowerMiddleIncomeCountries = {
      'thailand': 1.3,
      'indonesia': 1.2,
      'philippines': 1.2,
      'vietnam': 1.1,
      'egypt': 1.2,
      'morocco': 1.2,
      'ukraine': 1.1,
      'colombia': 1.3,
      'peru': 1.3,
      'ecuador': 1.2,
    };

    // Check which category the country falls into
    if (highIncomeCountries[countryLower]) {
      return highIncomeCountries[countryLower];
    } else if (upperMiddleIncomeCountries[countryLower]) {
      return upperMiddleIncomeCountries[countryLower];
    } else if (lowerMiddleIncomeCountries[countryLower]) {
      return lowerMiddleIncomeCountries[countryLower];
    } else if (countryLower === 'india') {
      return 1.0; // Base price for India
    } else {
      // Default for unlisted countries (assume medium-high income)
      return 2.0;
    }
  };

  // Fetch available time slots when astrologer and date are selected
  const fetchAvailableSlots = useCallback(async (astrologer, date, service) => {
    if (!astrologer || !date) {
      setAvailableSlots([]);
      return;
    }

    setLoadingSlots(true);
    try {
      // Build params - only include service if it's selected
      const params = { astrologer, date };
      if (service) {
        params.service = service;
      }

      const response = await axios.get(`${API}/available-slots`, {
        params: params,
        timeout: 10000 // 10 second timeout
      });
      setAvailableSlots(response.data.slots || []);
    } catch (error) {
      console.error('Error fetching slots:', error.message);
      toast.error('Failed to load available time slots');
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []); // Empty dependency array since it doesn't depend on any props or state

  // Reserve a slot temporarily (5 minutes) to prevent double bookings
  const reserveSlot = useCallback(async (astrologer, date, startTime, service) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await axios.post(
        `${API}/reserve-slot`,
        null,
        {
          params: { astrologer, date, start_time: startTime },
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000
        }
      );

      if (response.data.success) {
        setReservedSlot({ astrologer, date, startTime });

        // Set timer to refresh slots when reservation expires (5 minutes)
        if (reservationTimer) clearTimeout(reservationTimer);
        const timer = setTimeout(() => {
          fetchAvailableSlots(astrologer, date, service);
          setReservedSlot(null);
        }, 5 * 60 * 1000); // 5 minutes

        setReservationTimer(timer);
      } else {
        toast.error(response.data.message || 'Slot no longer available');
        // Refresh slots to show updated availability
        fetchAvailableSlots(astrologer, date, service);
      }
    } catch (error) {
      console.error('Error reserving slot:', error.message);
      // Don't show error to user - slot might already be taken
    }
  }, [reservationTimer, fetchAvailableSlots]);

  // Release slot reservation
  const releaseSlot = useCallback(async (astrologer, date, startTime) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      await axios.delete(`${API}/release-slot`, {
        params: { astrologer, date, start_time: startTime },
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000
      });

      setReservedSlot(null);
      if (reservationTimer) {
        clearTimeout(reservationTimer);
        setReservationTimer(null);
      }
    } catch (error) {
      console.error('Error releasing slot:', error.message);
    }
  }, [reservationTimer]);

  // Cleanup: Release slot reservation when component unmounts or user navigates away
  useEffect(() => {
    return () => {
      if (reservedSlot) {
        releaseSlot(reservedSlot.astrologer, reservedSlot.date, reservedSlot.startTime);
      }
      if (reservationTimer) {
        clearTimeout(reservationTimer);
      }
    };
  }, [reservedSlot, reservationTimer, releaseSlot]);

  // Calculate price based on service, duration, and detected country with PPP
  useEffect(() => {
    if (formData.service && formData.consultationDuration && !loadingCountry) {
      // If duration is 5-10 mins, it's free
      if (formData.consultationDuration === '5-10') {
        setCalculatedPrice(0);
      } else if (formData.consultationDuration === '10+') {
        // Find the selected service from mockServices
        const selectedService = mockServices?.find(s => s.id === formData.service);

        if (selectedService && selectedService.actualPrice && selectedService.discountPercent !== undefined) {
          // Step 1: Calculate base discounted price
          const basePrice = selectedService.actualPrice * (1 - selectedService.discountPercent / 100);

          // Step 2: Get PPP multiplier for the country
          const pppMultiplier = getPPPMultiplier(detectedCountry);

          // Step 3: Apply PPP multiplier
          let finalPrice = basePrice * pppMultiplier;

          // Step 4: For Marriage Compatibility service, apply additional 1.5x multiplier
          if (formData.service === '3') {
            finalPrice = finalPrice * 1.5;
          }

          const roundedPrice = Math.round(finalPrice);
          setCalculatedPrice(roundedPrice);
        } else {
          // Service not found or missing price data
          console.error('Service not found or missing price data:', formData.service);
          setCalculatedPrice(0);
        }
      }
    } else {
      setCalculatedPrice(0);
    }
  }, [formData.service, formData.consultationDuration, detectedCountry, loadingCountry]);

  // Fetch slots when astrologer, date, or service changes
  useEffect(() => {
    if (formData.astrologer && formData.preferredDate) {
      // Pass service if selected, otherwise backend will use default 30-min slots
      fetchAvailableSlots(formData.astrologer, formData.preferredDate, formData.service);
    } else {
      setAvailableSlots([]);
    }
  }, [formData.astrologer, formData.preferredDate, formData.service, fetchAvailableSlots]);

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

    // Birth details are now optional - can be collected during the call

    // Validate date and time slot selection
    if (!formData.preferredDate || !formData.preferredTime) {
      toast.error('Please select a date and time slot for your consultation');
      return;
    }

    setLoading(true);

    try {
      // Prepare data for backend (convert camelCase to snake_case)
      // Country is detected automatically on backend from IP address
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

      // Check if country or test_country parameter is in URL
      const urlParams = new URLSearchParams(window.location.search);
      const countryFromUrl = urlParams.get('country');
      const testCountry = urlParams.get('test_country');

      // Build API URL with country parameter if present
      // Priority: test_country > country from Services page
      let apiUrl = `${API}/bookings`;
      if (testCountry) {
        apiUrl += `?test_country=${encodeURIComponent(testCountry)}`;
        console.log('🧪 Using test country for booking:', testCountry);
      } else if (countryFromUrl) {
        apiUrl += `?test_country=${encodeURIComponent(countryFromUrl)}`;
        console.log('🌍 Using country from Services page for booking:', countryFromUrl);
      }

      const response = await axios.post(apiUrl, bookingPayload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const bookingData = response.data;

      // Verify price calculation matches between frontend and backend
      const backendPriceInRupees = bookingData.amount / 100;
      console.log('💰 Price Verification:');
      console.log('  Frontend calculated:', calculatedPrice);
      console.log('  Backend calculated:', backendPriceInRupees);
      console.log('  Match:', calculatedPrice === Math.round(backendPriceInRupees));

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
              {t('booking.pageTitle')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('booking.pageSubtitle')}
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
                      🎉 {t('booking.holiOffer')}! 🎊
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 font-semibold mb-2">
                      {t('booking.holiDescription')}
                    </p>
                    <p className="text-md text-orange-600 font-bold animate-pulse">
                      ⏰ {t('home.freeConsultation.limitedSlots')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-400 to-pink-500 text-white px-8 py-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                    <p className="text-sm font-semibold mb-1">{t('booking.holiOffer')}</p>
                    <p className="text-4xl font-bold mb-2">{t('booking.holiDiscount')}</p>
                    <p className="text-xs opacity-90">{t('booking.holiDescription')}</p>
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
            <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">{t('booking.consultationModeTitle')}</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">{t('booking.onlineTitle')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('booking.onlineDesc')}
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
                    <h3 className="text-xl font-bold text-purple-900 mb-2">{t('booking.inPersonTitle')}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('booking.inPersonDesc')}
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
                        {t('booking.placeOfBirth')} <span className="text-gray-500 text-sm">(Optional)</span>
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
                  <p className="text-sm text-gray-600 mb-4">
                    {t('booking.birthDetailsNote')} <span className="text-purple-600 font-medium">(These details can be provided during the consultation call)</span>
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium mb-2">
                        {t('booking.dateOfBirth')} <span className="text-gray-500 text-sm">(Optional)</span>
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
                        {t('booking.timeOfBirth')} <span className="text-gray-500 text-sm">(Optional)</span>
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
                      <p className="text-xs text-gray-500 mt-1">Can be provided during the call if not available now</p>
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
                          {Array.isArray(translatedAstrologers) && translatedAstrologers.length > 0 ? (
                            translatedAstrologers.map((astro) => (
                              <SelectItem key={astro.id} value={astro.name}>
                                {astro.name} ({astro.experience}+ {t('team.years')})
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="loading" disabled>Loading astrologers...</SelectItem>
                          )}
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
                          {Array.isArray(translatedServices) && translatedServices.length > 0 ? (
                            translatedServices.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.title}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="loading" disabled>Loading services...</SelectItem>
                          )}
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
                          onValueChange={(value) => {
                            // Release previous slot if any
                            if (reservedSlot) {
                              releaseSlot(reservedSlot.astrologer, reservedSlot.date, reservedSlot.startTime);
                            }

                            // Update form data
                            setFormData(prev => ({ ...prev, preferredTime: value }));

                            // Reserve the new slot
                            if (formData.astrologer && formData.preferredDate) {
                              reserveSlot(formData.astrologer, formData.preferredDate, value, formData.service);
                            }
                          }}
                          required
                        >
                          <SelectTrigger className="border-purple-200">
                            <SelectValue placeholder={t('booking.selectTime')} />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.isArray(availableSlots) && availableSlots.length > 0 ? (
                              availableSlots.map((slot, index) => (
                                <SelectItem key={index} value={slot.start_time}>
                                  {slot.display}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-slots" disabled>No slots available</SelectItem>
                            )}
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
