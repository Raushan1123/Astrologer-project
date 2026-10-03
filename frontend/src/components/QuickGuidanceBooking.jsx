import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Clock, MapPin, Phone, User, Calendar } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY;

console.log('Environment Variables:', {
  BACKEND_URL,
  RAZORPAY_KEY,
  allEnv: Object.keys(process.env).filter(k => k.includes('RAZORPAY')),
});

// Generate available time slots (10AM-12PM and 2PM-8PM in 30-min intervals)
const generateTimeSlots = () => {
  const slots = [];
  // Morning: 10:00 AM to 12:00 PM
  for (let h = 10; h < 12; h++) {
    for (let m of [0, 30]) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      slots.push(time);
    }
  }
  // Afternoon/Evening: 2:00 PM to 8:00 PM
  for (let h = 14; h < 20; h++) {
    for (let m of [0, 30]) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const QuickGuidanceBooking = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
  });
  const [errors, setErrors] = useState({});

  const validateBirthDetails = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob >= today) newErrors.dateOfBirth = 'Date of birth must be in the past';
    }

    if (!formData.timeOfBirth) newErrors.timeOfBirth = 'Time of birth is required';
    if (!formData.placeOfBirth.trim()) newErrors.placeOfBirth = 'Place of birth is required';

    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    else {
      const prefDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (prefDate < today) newErrors.preferredDate = 'Preferred date must be in the future';
    }

    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!validateBirthDetails()) return;

    setLoading(true);
    console.log('handleBooking called. RAZORPAY_KEY:', RAZORPAY_KEY);
    console.log('window.Razorpay exists:', typeof window.Razorpay);

    try {
      // Check if Razorpay script is loaded
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay script not loaded. Please refresh the page and try again.');
      }

      if (!RAZORPAY_KEY) {
        console.error('RAZORPAY_KEY is empty/undefined:', RAZORPAY_KEY);
        throw new Error('Razorpay key not configured. Please contact support.');
      }

      console.log('Razorpay key and script verified. Proceeding with payment...');

      // Create Razorpay order
      const orderResponse = await axios.post(`${API}/payments/create-order`, {
        amount: 10 * 100, // Amount in paise - TEST: ₹10
        description: 'Quick Guidance Consultation - 10-15 mins',
        customer_details: {
          name: formData.name,
          phone: formData.phone,
        },
      });

      const { orderId } = orderResponse.data;

      if (!orderId) {
        throw new Error('Failed to create payment order. Please try again.');
      }

      // Initialize Razorpay
      const options = {
        key: RAZORPAY_KEY,
        amount: 299 * 100,
        currency: 'INR',
        name: 'Acharyaa Indira Pandey',
        description: 'Quick Guidance Consultation',
        order_id: orderId,
        handler: async (response) => {
          try {
            // Verify payment and create booking
            const bookingResponse = await axios.post(`${API}/bookings/quick-guidance`, {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              dateOfBirth: formData.dateOfBirth,
              timeOfBirth: formData.timeOfBirth,
              placeOfBirth: formData.placeOfBirth,
              service: formData.service || 'General Consultation',
              preferredDate: formData.preferredDate,
              preferredTime: formData.preferredTime,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              duration: '10-15 mins',
            });

            // Generate WhatsApp message
            const whatsappMessage = `✨ *Booking Confirmation - Happy Kismat* ✨

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📞 *Phone:* ${formData.phone}

📅 *Consultation Date:* ${formData.preferredDate}
⏰ *Consultation Time:* ${formData.preferredTime}
⏱️ *Duration:* 10-15 minutes
💰 *Amount:* ₹10

🌟 *Your Details:*
🎂 *Date of Birth:* ${formData.dateOfBirth}
🕐 *Time of Birth:* ${formData.timeOfBirth}
📍 *Place of Birth:* ${formData.placeOfBirth}
${formData.service ? `❓ *Query:* ${formData.service}` : ''}

📱 *Contact Us:* +91 8792967417
🌐 *Website:* Happy Kismat - Vedic Astrology

Thank you for booking with us! 🙏`;

            const whatsappLink = `https://wa.me/918792967417?text=${encodeURIComponent(whatsappMessage)}`;

            alert('✅ Booking confirmed! Your consultation is scheduled for ' + formData.preferredDate + ' at ' + formData.preferredTime + '\n\nA WhatsApp link will be copied to your clipboard. You can share your booking details with us.');

            // Copy WhatsApp message to clipboard
            navigator.clipboard.writeText(whatsappMessage).catch(err => console.error('Failed to copy:', err));
            setShowForm(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              dateOfBirth: '',
              timeOfBirth: '',
              placeOfBirth: '',
              service: '',
              preferredDate: '',
              preferredTime: '',
            });
          } catch (error) {
            console.error('Booking creation error:', error);
            alert(`Booking failed: ${error.response?.data?.detail || error.message}`);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: '#F97316',
        },
      };

      try {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (razorpayError) {
        console.error('Razorpay initialization error:', razorpayError);
        throw new Error(`Failed to open payment modal: ${razorpayError.message}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Error: ${error.message || 'Failed to initiate payment. Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-3 md:px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {!showForm ? (
            <Card className="bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-3xl md:rounded-4xl shadow-2xl overflow-hidden border-0 backdrop-blur-sm">
              <div className="relative p-8 md:p-12 lg:p-20">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>

                <div className="relative z-10 text-center">
                  <div className="inline-block mb-8 transform hover:scale-110 transition-transform duration-300">
                    <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white text-xs md:text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-amber-500/50 animate-pulse inline-flex items-center gap-2 backdrop-blur-sm">
                      <span className="text-lg">⚡</span>
                      Quick Consultation
                    </span>
                  </div>

                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 drop-shadow-lg">
                      Need Quick Guidance?
                    </span>
                  </h2>

                  <div className="inline-block bg-white/80 backdrop-blur rounded-2xl px-6 md:px-8 py-5 md:py-6 shadow-xl border border-amber-200/50 mb-10">
                    <p className="text-lg md:text-2xl text-gray-800 font-semibold">
                      Book for just <span className="text-3xl md:text-4xl text-amber-600 font-black">₹10</span>
                      <br className="hidden sm:block" />
                      for <span className="text-orange-600 font-bold">10-15 minutes</span>
                    </p>
                  </div>

                  <p className="text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
                    Get quick, personalized Vedic guidance on immediate life questions. Perfect for those seeking clarity without a full consultation.
                  </p>

                  <ul className="grid md:grid-cols-3 gap-4 md:gap-6 mb-10">
                    <li className="flex flex-col items-center justify-center gap-3 bg-white/70 backdrop-blur rounded-xl p-4 md:p-5 border border-amber-200/50 hover:shadow-md transition-shadow">
                      <Clock className="w-7 h-7 text-amber-600" />
                      <span className="font-semibold text-gray-700 text-sm md:text-base">10-15 mins</span>
                    </li>
                    <li className="flex flex-col items-center justify-center gap-3 bg-white/70 backdrop-blur rounded-xl p-4 md:p-5 border border-amber-200/50 hover:shadow-md transition-shadow">
                      <User className="w-7 h-7 text-amber-600" />
                      <span className="font-semibold text-gray-700 text-sm md:text-base">Personal Reading</span>
                    </li>
                    <li className="flex flex-col items-center justify-center gap-3 bg-white/70 backdrop-blur rounded-xl p-4 md:p-5 border border-amber-200/50 hover:shadow-md transition-shadow">
                      <MapPin className="w-7 h-7 text-amber-600" />
                      <span className="font-semibold text-gray-700 text-sm md:text-base">Birth-Based Analysis</span>
                    </li>
                  </ul>

                  {/* Astrology Benefits Section */}
                  <div className="mb-10">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">What You'll Discover</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200/50 hover:shadow-lg transition-all">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">🌟</span>
                          <div>
                            <p className="font-bold text-amber-700 text-sm md:text-base">Planetary Insights</p>
                            <p className="text-gray-600 text-xs md:text-sm">Understand how planets influence your life</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200/50 hover:shadow-lg transition-all">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">💫</span>
                          <div>
                            <p className="font-bold text-amber-700 text-sm md:text-base">Cosmic Patterns</p>
                            <p className="text-gray-600 text-xs md:text-sm">Decode your birth chart mysteries</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-5 border border-amber-200/50 hover:shadow-lg transition-all">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">🎯</span>
                          <div>
                            <p className="font-bold text-amber-700 text-sm md:text-base">Life Direction</p>
                            <p className="text-gray-600 text-xs md:text-sm">Get clarity on your path forward</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-5 border border-amber-200/50 hover:shadow-lg transition-all">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">✨</span>
                          <div>
                            <p className="font-bold text-amber-700 text-sm md:text-base">Vedic Wisdom</p>
                            <p className="text-gray-600 text-xs md:text-sm">Ancient knowledge for modern questions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Perfect For Section */}
                  <div className="mb-10">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">Perfect For</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white/80 backdrop-blur rounded-lg p-3 md:p-4 border border-amber-200/50 text-center hover:bg-amber-50 transition-colors">
                        <p className="text-sm md:text-base font-semibold text-gray-700">💼 Career</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur rounded-lg p-3 md:p-4 border border-amber-200/50 text-center hover:bg-amber-50 transition-colors">
                        <p className="text-sm md:text-base font-semibold text-gray-700">❤️ Relationships</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur rounded-lg p-3 md:p-4 border border-amber-200/50 text-center hover:bg-amber-50 transition-colors">
                        <p className="text-sm md:text-base font-semibold text-gray-700">🏥 Health</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur rounded-lg p-3 md:p-4 border border-amber-200/50 text-center hover:bg-amber-50 transition-colors">
                        <p className="text-sm md:text-base font-semibold text-gray-700">💰 Finances</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowForm(true)}
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 hover:from-amber-700 hover:via-orange-700 hover:to-amber-700 text-white px-8 md:px-16 py-4 md:py-5 text-base md:text-lg font-bold shadow-2xl shadow-amber-500/60 transform hover:scale-110 hover:shadow-3xl hover:shadow-amber-500/80 transition-all duration-300 rounded-2xl active:scale-95 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      🎯 Book Now for ₹10
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-2 md:border-4 border-amber-400">
              <div className="p-6 md:p-10 lg:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                  Quick Booking Details
                </h3>

                <form onSubmit={handleBooking} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-amber-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-amber-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone (10 digits) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit phone number"
                      maxLength="10"
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-amber-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-amber-500 ${
                        errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  {/* Time of Birth */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Time of Birth (HH:MM) *
                    </label>
                    <input
                      type="time"
                      name="timeOfBirth"
                      value={formData.timeOfBirth}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-amber-500 ${
                        errors.timeOfBirth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.timeOfBirth && <p className="text-red-500 text-sm mt-1">{errors.timeOfBirth}</p>}
                  </div>

                  {/* Place of Birth */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Place of Birth *
                    </label>
                    <input
                      type="text"
                      name="placeOfBirth"
                      value={formData.placeOfBirth}
                      onChange={handleInputChange}
                      placeholder="City/Town, State, Country"
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-amber-500 ${
                        errors.placeOfBirth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.placeOfBirth && <p className="text-red-500 text-sm mt-1">{errors.placeOfBirth}</p>}
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Consultation Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-amber-500 ${
                        errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>}
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Consultation Time * (10AM-12PM, 2PM-8PM)
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-amber-500 ${
                        errors.preferredTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a time slot</option>
                      {timeSlots.map((time) => {
                        const hours = parseInt(time.substring(0, 2));
                        const ampm = hours < 12 ? 'AM' : 'PM';
                        const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
                        return (
                          <option key={time} value={time}>
                            {displayHours}:{time.substring(3, 5)} {ampm}
                          </option>
                        );
                      })}
                    </select>
                    {errors.preferredTime && <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>}
                  </div>

                  {/* Service (Optional) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Specific Service/Question (Optional)
                    </label>
                    <textarea
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      placeholder="e.g., Career guidance, relationship advice, health concerns..."
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-amber-500"
                    />
                    <p className="text-gray-500 text-xs mt-1">Leave blank for general guidance</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      onClick={() => setShowForm(false)}
                      variant="outline"
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 font-semibold rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Proceed to Payment (₹10)'}
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuickGuidanceBooking;
