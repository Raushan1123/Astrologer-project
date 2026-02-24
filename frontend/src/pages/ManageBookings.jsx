import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, User, Mail, Phone, CreditCard, X, Edit, CheckCircle, AlertCircle, Loader2, Filter, ChevronLeft, ChevronRight, RefreshCw, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getServiceName } from '../utils/serviceMapping';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ITEMS_PER_PAGE = 5;

const ManageBookings = () => {
  const navigate = useNavigate();
  const { user, getToken, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPaymentId, setProcessingPaymentId] = useState(null);
  const [processingCancelId, setProcessingCancelId] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [refundInfo, setRefundInfo] = useState(null);

  // Filter and pagination states
  const [activeFilter, setActiveFilter] = useState('upcoming');
  const [currentPage, setCurrentPage] = useState(1);

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
      console.log('Fetched bookings:', response.data.bookings);
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  // Calculate refund eligibility based on time until booking
  const calculateRefundEligibility = (booking) => {
    if (!booking.preferred_date || !booking.preferred_time) {
      return { eligible: false, percentage: 0, reason: 'No scheduled time' };
    }

    // Free consultations don't have refunds
    if (booking.service === 'free_consultation') {
      return { eligible: false, percentage: 0, reason: 'Free consultation - no refund applicable' };
    }

    // Only paid bookings with completed payment are eligible for refund
    if (booking.payment_status !== 'COMPLETED') {
      return { eligible: false, percentage: 0, reason: 'No payment made' };
    }

    const now = new Date();
    const bookingDateTime = new Date(`${booking.preferred_date}T${booking.preferred_time}`);
    const hoursUntilBooking = (bookingDateTime - now) / (1000 * 60 * 60);

    if (hoursUntilBooking >= 24) {
      return { eligible: true, percentage: 100, reason: 'Full refund (24+ hours before)' };
    } else if (hoursUntilBooking >= 12) {
      return { eligible: true, percentage: 50, reason: 'Partial refund (12-24 hours before)' };
    } else {
      return { eligible: false, percentage: 0, reason: 'No refund (less than 12 hours before)' };
    }
  };

  const handleCancelBooking = async (booking) => {
    // Calculate refund eligibility
    const refundEligibility = calculateRefundEligibility(booking);
    setRefundInfo(refundEligibility);
    setBookingToCancel(booking);
    setShowCancelDialog(true);
  };

  const confirmCancelBooking = async () => {
    if (!bookingToCancel) return;

    try {
      setProcessingCancelId(bookingToCancel.id);
      setShowCancelDialog(false);
      const token = getToken();
      await axios.put(`${API}/bookings/${bookingToCancel.id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (refundInfo?.eligible) {
        toast.success(`Booking cancelled successfully. Refund of ${refundInfo.percentage}% will be processed.`);
      } else {
        toast.success('Booking cancelled successfully');
      }

      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error(error.response?.data?.detail || 'Failed to cancel booking');
    } finally {
      setProcessingCancelId(null);
      setBookingToCancel(null);
      setRefundInfo(null);
    }
  };

  // Fetch refund status for a booking
  const fetchRefundStatus = async (bookingId) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API}/bookings/${bookingId}/refund-status`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching refund status:', error);
      return null;
    }
  };

  const handleCompletePayment = async (bookingId) => {
    try {
      setProcessingPaymentId(bookingId);

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        toast.error('Payment gateway is loading. Please try again in a moment.');
        setProcessingPaymentId(null);
        return;
      }

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
            await axios.post(`${API}/verify-payment`, {
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
          } finally {
            setProcessingPaymentId(null);
          }
        },
        modal: {
          ondismiss: function() {
            // User closed the payment modal without completing payment
            setProcessingPaymentId(null);
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

      // Don't clear processing state here - wait for modal to close or payment to complete
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error(error.response?.data?.detail || 'Failed to initiate payment');
      setProcessingPaymentId(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      CONFIRMED: { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
      COMPLETED: { color: 'bg-blue-100 text-blue-800', label: 'Completed' },
      CANCELLED: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    };
    const normalizedStatus = status?.toUpperCase() || 'PENDING';
    const config = statusConfig[normalizedStatus] || statusConfig.PENDING;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const statusConfig = {
      PENDING: { color: 'bg-orange-100 text-orange-800', label: 'Payment Pending' },
      COMPLETED: { color: 'bg-green-100 text-green-800', label: 'Paid' },
      FAILED: { color: 'bg-red-100 text-red-800', label: 'Failed' }
    };
    const normalizedStatus = paymentStatus?.toUpperCase() || 'PENDING';
    const config = statusConfig[normalizedStatus] || statusConfig.PENDING;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  // Filter bookings based on active filter
  const getFilteredBookings = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of today for accurate comparison

    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());

    return bookings.filter(booking => {
      const bookingDate = booking.preferred_date ? new Date(booking.preferred_date) : new Date(booking.created_at);
      bookingDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

      const status = booking.status?.toLowerCase();

      switch (activeFilter) {
        case 'upcoming':
          // Upcoming: confirmed or pending bookings with future dates (today or later)
          return (status === 'confirmed' || status === 'pending') &&
                 bookingDate >= now;

        case 'cancelled':
          return status === 'cancelled';

        case 'last3months':
          // Last 3 months: Only PAST bookings from last 3 months (exclude today and future)
          return bookingDate >= threeMonthsAgo && bookingDate < now;

        case 'last6months':
          // Last 6 months: Only PAST bookings from last 6 months (exclude today and future)
          return bookingDate >= sixMonthsAgo && bookingDate < now;

        case 'all':
        default:
          return true;
      }
    }).sort((a, b) => {
      // For upcoming bookings, sort by created_at (when booking was made), newest first
      // For other filters, sort by preferred_date (or created_at if no preferred_date), newest first
      if (activeFilter === 'upcoming') {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA; // Newest bookings first
      } else {
        const dateA = a.preferred_date ? new Date(a.preferred_date) : new Date(a.created_at);
        const dateB = b.preferred_date ? new Date(b.preferred_date) : new Date(b.created_at);
        return dateB - dateA;
      }
    });
  };

  // Get paginated bookings
  const getPaginatedBookings = () => {
    const filtered = getFilteredBookings();
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filtered.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const getTotalPages = () => {
    const filtered = getFilteredBookings();
    return Math.ceil(filtered.length / ITEMS_PER_PAGE);
  };

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const filteredBookings = getPaginatedBookings();
  const totalPages = getTotalPages();
  const totalFilteredBookings = getFilteredBookings().length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your consultation bookings</p>
        </div>

        {/* Filter Buttons */}
        {bookings.length > 0 && (
          <Card className="p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Filter Bookings</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilter === 'upcoming' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('upcoming')}
                className={activeFilter === 'upcoming' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                Upcoming
              </Button>
              <Button
                variant={activeFilter === 'cancelled' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('cancelled')}
                className={activeFilter === 'cancelled' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                Cancelled
              </Button>
              <Button
                variant={activeFilter === 'last3months' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('last3months')}
                className={activeFilter === 'last3months' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                Last 3 Months
              </Button>
              <Button
                variant={activeFilter === 'last6months' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('last6months')}
                className={activeFilter === 'last6months' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                Last 6 Months
              </Button>
              <Button
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('all')}
                className={activeFilter === 'all' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                All Bookings
              </Button>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              Showing {totalFilteredBookings} booking{totalFilteredBookings !== 1 ? 's' : ''}
            </div>
          </Card>
        )}

        {bookings.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
            <Button onClick={() => navigate('/booking')} className="bg-purple-600 hover:bg-purple-700">
              Book a Consultation
            </Button>
          </Card>
        ) : filteredBookings.length === 0 ? (
          <Card className="p-12 text-center">
            <AlertCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings found</h3>
            <p className="text-gray-500 mb-6">No bookings match the selected filter.</p>
            <Button onClick={() => setActiveFilter('all')} variant="outline">
              View All Bookings
            </Button>
          </Card>
        ) : (
          <>
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
              <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Booking Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-purple-900 mb-2">
                          {getServiceName(booking.service)}
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

                    {/* Refund Status Display */}
                    {booking.refund_id && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <RefreshCw className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-semibold text-blue-900 mb-1">Refund Status</p>
                            <p className="text-gray-700">
                              <span className="font-medium">Status:</span>{' '}
                              <span className={`capitalize ${
                                booking.refund_status === 'processed' ? 'text-green-600 font-semibold' :
                                booking.refund_status === 'pending' ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {booking.refund_status || 'Processing'}
                              </span>
                            </p>
                            {booking.refund_amount && (
                              <p className="text-gray-700">
                                <span className="font-medium">Amount:</span> ₹{booking.refund_amount / 100}
                              </p>
                            )}
                            {booking.refund_status === 'processed' && (
                              <p className="text-xs text-green-600 mt-1">
                                ✓ Refund completed. Amount will be credited within 5-7 business days.
                              </p>
                            )}
                            {booking.refund_status === 'pending' && (
                              <p className="text-xs text-gray-600 mt-1">
                                Refund is being processed. You'll receive an email once completed.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 lg:min-w-[200px]">
                    {(() => {
                      const status = booking.status?.toUpperCase();
                      const paymentStatus = booking.payment_status?.toUpperCase();

                      // Check if booking date/time is in the past
                      const isPastBooking = booking.preferred_date &&
                        new Date(booking.preferred_date + 'T' + (booking.preferred_time || '00:00')) < new Date();

                      // 1. CANCELLED bookings - show cancelled message
                      if (status === 'CANCELLED') {
                        return (
                          <div className="text-sm text-red-600 font-medium text-center">
                            This booking was cancelled
                          </div>
                        );
                      }

                      // 2. CONFIRMED bookings with past date - show completed
                      if (status === 'CONFIRMED' && isPastBooking) {
                        return (
                          <div className="text-sm text-blue-600 font-medium text-center flex items-center justify-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                          </div>
                        );
                      }

                      // 3. CONFIRMED bookings (future) - show confirmed message
                      if (status === 'CONFIRMED') {
                        return (
                          <div className="text-sm text-green-600 font-medium text-center flex items-center justify-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Confirmed
                          </div>
                        );
                      }

                      // 4. PENDING bookings - show action buttons
                      if (status === 'PENDING') {
                        return (
                          <>
                            {/* Complete Payment Button - Show ONLY if:
                                - Payment is pending
                                - Amount > 0
                                - Booking date has NOT passed
                            */}
                            {paymentStatus === 'PENDING' && booking.amount > 0 && !isPastBooking && (
                              <Button
                                onClick={() => handleCompletePayment(booking.id)}
                                disabled={processingPaymentId === booking.id}
                                className="bg-green-600 hover:bg-green-700 w-full"
                              >
                                {processingPaymentId === booking.id ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Processing Payment...
                                  </>
                                ) : (
                                  <>
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Complete Payment
                                  </>
                                )}
                              </Button>
                            )}

                            {/* Show "Payment Expired" message for past bookings with pending payment */}
                            {paymentStatus === 'PENDING' && booking.amount > 0 && isPastBooking && (
                              <div className="text-sm text-orange-600 font-medium text-center">
                                Payment window expired
                              </div>
                            )}

                            {/* Cancel Button - Show only for future bookings */}
                            {!isPastBooking && (
                              <Button
                                onClick={() => handleCancelBooking(booking)}
                                disabled={processingCancelId === booking.id}
                                variant="destructive"
                                className="w-full"
                              >
                                {processingCancelId === booking.id ? (
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

                            {/* Show "Expired" message for past pending bookings with no payment */}
                            {isPastBooking && paymentStatus === 'COMPLETED' && (
                              <div className="text-sm text-gray-600 font-medium text-center">
                                Booking expired
                              </div>
                            )}
                          </>
                        );
                      }

                      // 5. COMPLETED status - show completed message
                      if (status === 'COMPLETED') {
                        return (
                          <div className="text-sm text-blue-600 font-medium text-center flex items-center justify-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                          </div>
                        );
                      }

                      // Default - no actions
                      return null;
                    })()}
                  </div>
                </div>
              </Card>
            ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Card className="p-4 mt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Cancellation Policy Dialog */}
      {showCancelDialog && bookingToCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Cancel Booking</h2>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Booking Details:</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p><strong>Service:</strong> {getServiceName(bookingToCancel.service)}</p>
                  <p><strong>Date:</strong> {bookingToCancel.preferred_date}</p>
                  <p><strong>Time:</strong> {bookingToCancel.preferred_time}</p>
                  {bookingToCancel.amount && (
                    <p><strong>Amount Paid:</strong> ₹{bookingToCancel.amount / 100}</p>
                  )}
                </div>
              </div>

              {/* Refund Information */}
              {refundInfo && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Refund Information:</h3>

                  {refundInfo.eligible ? (
                    <div className={`p-4 rounded-lg border ${
                      refundInfo.percentage === 100
                        ? 'bg-green-50 border-green-200'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          refundInfo.percentage === 100 ? 'text-green-600' : 'text-yellow-600'
                        }`} />
                        <div>
                          <p className="font-semibold mb-1">
                            {refundInfo.percentage}% Refund Eligible
                          </p>
                          <p className="text-sm text-gray-700 mb-2">{refundInfo.reason}</p>
                          {bookingToCancel.amount && (
                            <p className="text-sm font-medium">
                              Refund Amount: ₹{(bookingToCancel.amount * refundInfo.percentage / 100 / 100).toFixed(2)}
                            </p>
                          )}
                          <p className="text-xs text-gray-600 mt-2">
                            Refund will be processed to your original payment method within 5-7 business days.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg border bg-red-50 border-red-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                        <div>
                          <p className="font-semibold mb-1 text-red-900">No Refund Available</p>
                          <p className="text-sm text-gray-700">{refundInfo.reason}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Cancellation Policy Link */}
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-700 mb-2">
                  By cancelling this booking, you agree to our cancellation policy.
                </p>
                <Link
                  to="/cancellation-policy"
                  target="_blank"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                >
                  View Full Cancellation Policy
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowCancelDialog(false);
                    setBookingToCancel(null);
                    setRefundInfo(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Keep Booking
                </Button>
                <Button
                  onClick={confirmCancelBooking}
                  variant="destructive"
                  className="flex-1"
                >
                  Confirm Cancellation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;

