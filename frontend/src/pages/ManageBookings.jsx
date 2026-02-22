import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, User, Mail, Phone, CreditCard, X, Edit, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ManageBookings = () => {
  const navigate = useNavigate();
  const { user, getToken, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingBookingId, setProcessingBookingId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to view your bookings');
      navigate('/login');
      return;
    }
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await axios.get(`${API}/user/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      setProcessingBookingId(bookingId);
      const token = getToken();
      await axios.put(`${API}/bookings/${bookingId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Booking cancelled successfully');
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error(error.response?.data?.detail || 'Failed to cancel booking');
    } finally {
      setProcessingBookingId(null);
    }
  };

  const handleCompletePayment = async (bookingId) => {
    try {
      setProcessingBookingId(bookingId);
      const token = getToken();
      
      // Create new payment order
      const response = await axios.post(
        `${API}/bookings/${bookingId}/retry-payment`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { razorpay_order_id, amount, razorpay_key_id } = response.data;

      // Initialize Razorpay
      const options = {
        key: razorpay_key_id,
        amount: amount,
        currency: 'INR',
        name: 'Acharyaa Indira Pandey',
        description: 'Astrology Consultation',
        order_id: razorpay_order_id,
        handler: async function (response) {
          try {
            // Verify payment
            await axios.post(`${API}/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: bookingId
            });
            toast.success('Payment completed successfully!');
            fetchBookings(); // Refresh the list
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        theme: {
          color: '#7c3aed'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setProcessingBookingId(null);
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error(error.response?.data?.detail || 'Failed to initiate payment');
      setProcessingBookingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      CONFIRMED: { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
      COMPLETED: { color: 'bg-blue-100 text-blue-800', label: 'Completed' },
      CANCELLED: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    };
    const config = statusConfig[status] || statusConfig.PENDING;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const statusConfig = {
      PENDING: { color: 'bg-orange-100 text-orange-800', label: 'Payment Pending' },
      COMPLETED: { color: 'bg-green-100 text-green-800', label: 'Paid' },
      FAILED: { color: 'bg-red-100 text-red-800', label: 'Failed' }
    };
    const config = statusConfig[paymentStatus] || statusConfig.PENDING;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your consultation bookings</p>
        </div>

        {bookings.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
            <Button onClick={() => navigate('/booking')} className="bg-purple-600 hover:bg-purple-700">
              Book a Consultation
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Booking Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-purple-900 mb-2">
                          {booking.service}
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                          {getStatusBadge(booking.status)}
                          {getPaymentStatusBadge(booking.payment_status)}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-700">
                          <User className="w-4 h-4" />
                          <span className="font-medium">Astrologer:</span>
                          <span>{booking.astrologer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">Date:</span>
                          <span>{booking.preferred_date || 'To be scheduled'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">Time:</span>
                          <span>{booking.preferred_time || 'To be scheduled'}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-700">
                          <CreditCard className="w-4 h-4" />
                          <span className="font-medium">Amount:</span>
                          <span className="font-bold text-purple-600">
                            {booking.amount === 0 ? 'Free' : `₹${booking.amount / 100}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <span className="font-medium">Duration:</span>
                          <span>{booking.consultation_duration} minutes</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <span className="font-medium">Type:</span>
                          <span className="capitalize">{booking.consultation_type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Booking ID:</span> {booking.id}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 lg:min-w-[200px]">
                    {booking.status === 'PENDING' && booking.payment_status === 'PENDING' && booking.amount > 0 && (
                      <Button
                        onClick={() => handleCompletePayment(booking.id)}
                        disabled={processingBookingId === booking.id}
                        className="bg-green-600 hover:bg-green-700 w-full"
                      >
                        {processingBookingId === booking.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4 mr-2" />
                            Complete Payment
                          </>
                        )}
                      </Button>
                    )}

                    {booking.status === 'PENDING' && (
                      <Button
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={processingBookingId === booking.id}
                        variant="destructive"
                        className="w-full"
                      >
                        {processingBookingId === booking.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 mr-2" />
                            Cancel Booking
                          </>
                        )}
                      </Button>
                    )}

                    {booking.status === 'CANCELLED' && (
                      <div className="text-sm text-red-600 font-medium text-center">
                        This booking was cancelled
                      </div>
                    )}

                    {booking.status === 'CONFIRMED' && (
                      <div className="text-sm text-green-600 font-medium text-center flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Confirmed
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;

