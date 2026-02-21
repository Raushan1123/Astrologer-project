import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, Calendar, User, Phone, Mail, Download, ArrowRight, AlertCircle, CreditCard } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BookingSuccess = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryingPayment, setRetryingPayment] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`${API}/bookings/${bookingId}`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center pt-20">
        <Card className="p-8 text-center max-w-md">
          <p className="text-gray-600 mb-4">Booking not found</p>
          <Link to="/booking">
            <Button>Book Again</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getAmount = () => {
    if (booking.amount === 0) return 'Free (First Time)';
    return `₹${booking.amount / 100}`;
  };

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

  // Handle retry payment
  const handleRetryPayment = async () => {
    setRetryingPayment(true);

    const res = await loadRazorpay();
    if (!res) {
      toast.error('Razorpay SDK failed to load');
      setRetryingPayment(false);
      return;
    }

    try {
      // Get Razorpay key from backend
      const keyResponse = await axios.get(`${API}/razorpay-key`);
      const key = keyResponse.data.key;

      const options = {
        key: key,
        amount: booking.amount,
        currency: 'INR',
        name: 'Acharyaa Indira Pandey Astrology',
        description: `${booking.service} - ${booking.consultation_duration} mins`,
        order_id: booking.razorpay_order_id,
        handler: async function (response) {
          try {
            // Verify payment
            await axios.post(`${API}/verify-payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: booking.id
            });

            toast.success('Payment successful! Booking confirmed.');
            // Refresh booking data
            const updatedBooking = await axios.get(`${API}/bookings/${bookingId}`);
            setBooking(updatedBooking.data);
          } catch (error) {
            toast.error('Payment verification failed');
          } finally {
            setRetryingPayment(false);
          }
        },
        prefill: {
          name: booking.name,
          email: booking.email,
          contact: booking.phone
        },
        modal: {
          ondismiss: function() {
            toast.info('Payment cancelled.');
            setRetryingPayment(false);
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
      toast.error('Payment initialization failed. Please try again.');
      setRetryingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-amber-50 pt-20">
      {/* Success Banner */}
      <section className="py-12 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-6 backdrop-blur-sm">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-green-50">
              Thank you for booking your consultation. We'll contact you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-2xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-purple-900 mb-2">Booking Details</h2>
                  <p className="text-gray-600">Booking ID: <span className="font-mono text-purple-700">{booking.id}</span></p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  booking.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
                  booking.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {booking.payment_status === 'completed' ? 'Paid' : booking.payment_status === 'pending' ? 'Payment Pending' : booking.payment_status}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{booking.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{booking.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{booking.phone}</p>
                    </div>
                    {booking.place_of_birth && (
                      <div>
                        <p className="text-sm text-gray-500">Place of Birth</p>
                        <p className="font-medium text-gray-900">{booking.place_of_birth}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Consultation Details */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Consultation Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Astrologer</p>
                      <p className="font-medium text-gray-900">{booking.astrologer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-medium text-gray-900">{booking.service}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium text-gray-900">{booking.consultation_duration} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium text-gray-900 capitalize">{booking.consultation_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium text-green-600 text-lg">{getAmount()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {booking.message && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Your Message</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{booking.message}</p>
                </div>
              )}

              {/* Payment Info */}
              {booking.razorpay_payment_id && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Payment Information</h3>
                  <p className="text-sm text-gray-600">Payment ID: <span className="font-mono text-gray-900">{booking.razorpay_payment_id}</span></p>
                </div>
              )}
            </Card>

            {/* Payment Pending Alert */}
            {booking.payment_status === 'pending' && booking.amount > 0 && (
              <Card className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <AlertCircle className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-yellow-900 mb-2">Payment Pending</h3>
                    <p className="text-yellow-800 mb-4">
                      Your booking has been saved, but payment is still pending. Please complete the payment to confirm your consultation.
                    </p>
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={handleRetryPayment}
                        disabled={retryingPayment}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        {retryingPayment ? 'Processing...' : `Complete Payment (${getAmount()})`}
                      </Button>
                      <p className="text-sm text-yellow-700">
                        Secure payment via Razorpay
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Next Steps */}
            <Card className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-amber-50">
              <h3 className="text-xl font-bold text-purple-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <p className="font-medium text-gray-900">Confirmation Email Sent</p>
                    <p className="text-sm text-gray-600">Check your email ({booking.email}) for booking confirmation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <p className="font-medium text-gray-900">We'll Contact You</p>
                    <p className="text-sm text-gray-600">Our team will reach out within 24 hours to schedule your consultation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <p className="font-medium text-gray-900">Consultation Day</p>
                    <p className="text-sm text-gray-600">You'll receive consultation details and meeting link (for online) or address (for in-person)</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-700 hover:bg-purple-50">
                  Back to Home
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                  Explore More Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 bg-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
            <p className="text-purple-100 mb-6">
              If you have any questions or concerns about your booking, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:indirapandey2526@gmail.com" className="inline-flex items-center gap-2">
                <Mail className="w-5 h-5" />
                indirapandey2526@gmail.com
              </a>
              <a href="tel:+918130420339" className="inline-flex items-center gap-2">
                <Phone className="w-5 h-5" />
                +91 8130420339
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingSuccess;
