import React, { useState, useEffect, useCallback } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Search, User, Phone, Mail, Calendar, Clock, Copy, CheckCircle, XCircle, CreditCard, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { mockServices } from '../mockData';
import { getServiceName } from '../utils/serviceMapping';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminAssistedBooking = () => {
  const [step, setStep] = useState(1); // 1: Customer Lookup, 2: Booking Form, 3: Payment Link
  const [lookupIdentifier, setLookupIdentifier] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [canUseFreeBooking, setCanUseFreeBooking] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([]);

  // Booking form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    astrologer: '',
    service: '',
    consultationType: 'online',
    consultationDuration: '10+',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  // Payment link data
  const [bookingResult, setBookingResult] = useState(null);

  // Step 1: Customer Lookup
  const handleCustomerLookup = async () => {
    if (!lookupIdentifier.trim()) {
      toast.error('Please enter email or phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API}/admin/customer-lookup`, {
        params: { identifier: lookupIdentifier }
      });

      // Store booking history
      setBookingHistory(response.data.booking_history || []);

      // Check eligibility for free booking
      const canUseFree = response.data.can_use_free_booking || false;
      setCanUseFreeBooking(canUseFree);

      // If not eligible for free booking, default to "10+"
      const defaultDuration = canUseFree ? '5-10' : '10+';

      if (response.data.found) {
        if (response.data.customer) {
          // Existing customer with account
          setCustomerData(response.data.customer);
          setIsNewCustomer(false);
          setFormData({
            ...formData,
            name: response.data.customer.name,
            email: response.data.customer.email,
            phone: response.data.customer.phone || '',
            consultationDuration: defaultDuration
          });

          if (canUseFree) {
            toast.success(`✅ Customer found: ${response.data.customer.name} - Eligible for FREE consultation!`);
          } else {
            toast.success(`Customer found: ${response.data.customer.name} - ${response.data.total_bookings} previous booking(s)`);
          }
        } else {
          // Has bookings but no account
          setIsNewCustomer(false);
          setCustomerData(null);
          if (lookupIdentifier.includes('@')) {
            setFormData({ ...formData, email: lookupIdentifier, consultationDuration: defaultDuration });
          } else {
            setFormData({ ...formData, phone: lookupIdentifier, consultationDuration: defaultDuration });
          }
          toast.warning(response.data.message || 'Customer has previous bookings');
        }
      } else {
        // New customer
        setIsNewCustomer(true);
        setCustomerData(null);
        // Pre-fill email or phone
        if (lookupIdentifier.includes('@')) {
          setFormData({ ...formData, email: lookupIdentifier, consultationDuration: defaultDuration });
        } else {
          setFormData({ ...formData, phone: lookupIdentifier, consultationDuration: defaultDuration });
        }
        toast.success('✅ New customer - Eligible for FREE first consultation!');
      }
      setStep(2);
    } catch (error) {
      console.error('Lookup error:', error);
      toast.error(error.response?.data?.detail || 'Failed to lookup customer');
    } finally {
      setLoading(false);
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
      const params = { astrologer, date };
      if (service) {
        params.service = service;
      }

      const response = await axios.get(`${API}/available-slots`, {
        params: params,
        timeout: 10000
      });
      setAvailableSlots(response.data.slots || []);
    } catch (error) {
      console.error('Error fetching slots:', error.message);
      toast.error('Failed to load available time slots');
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  // Fetch slots when astrologer, date, or service changes
  useEffect(() => {
    if (formData.astrologer && formData.preferredDate) {
      fetchAvailableSlots(formData.astrologer, formData.preferredDate, formData.service);
    } else {
      setAvailableSlots([]);
    }
  }, [formData.astrologer, formData.preferredDate, formData.service, fetchAvailableSlots]);

  // Step 2: Create Booking
  const handleCreateBooking = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.astrologer || !formData.service) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate date and time slot selection
    if (!formData.preferredDate || !formData.preferredTime) {
      toast.error('Please select a date and time slot for the consultation');
      return;
    }

    setLoading(true);
    try {
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

      const response = await axios.post(`${API}/admin/create-booking`, bookingPayload);

      setBookingResult(response.data);
      setStep(3);
      toast.success('Booking created successfully!');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.detail || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Confirm Payment
  const handleConfirmPayment = async () => {
    if (!bookingResult?.booking_id) {
      toast.error('No booking ID found');
      return;
    }

    const paymentDetails = {
      payment_method: 'admin_confirmed',
      transaction_id: prompt('Enter transaction ID (optional):') || '',
      notes: 'Payment confirmed by admin via phone call'
    };

    setLoading(true);
    try {
      await axios.post(`${API}/admin/confirm-payment/${bookingResult.booking_id}`, paymentDetails);
      toast.success('Payment confirmed! Booking is now complete.');

      // Reset form
      setTimeout(() => {
        handleReset();
      }, 2000);
    } catch (error) {
      console.error('Payment confirmation error:', error);
      toast.error('Failed to confirm payment');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setLookupIdentifier('');
    setCustomerData(null);
    setIsNewCustomer(false);
    setBookingResult(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      timeOfBirth: '',
      placeOfBirth: '',
      astrologer: '',
      service: '',
      consultationType: 'online',
      consultationDuration: '10+',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>
            1
          </div>
          <span className="font-medium">Customer Lookup</span>
        </div>
        <div className="w-16 h-1 bg-gray-300"></div>
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>
            2
          </div>
          <span className="font-medium">Booking Details</span>
        </div>
        <div className="w-16 h-1 bg-gray-300"></div>
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>
            3
          </div>
          <span className="font-medium">Payment Link</span>
        </div>
      </div>

      {/* Step 1: Customer Lookup */}
      {step === 1 && (
        <Card className="p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Find Customer</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="identifier">Email or Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  id="identifier"
                  placeholder="Enter email or 10-digit phone number"
                  value={lookupIdentifier}
                  onChange={(e) => setLookupIdentifier(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCustomerLookup()}
                />
                <Button onClick={handleCustomerLookup} disabled={loading}>
                  <Search className="w-4 h-4 mr-2" />
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Step 2: Booking Form */}
      {step === 2 && (
        <Card className="p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-purple-900">Create Booking</h2>
              {customerData && (
                <Badge className="mt-2 bg-green-100 text-green-800">
                  Existing Customer
                </Badge>
              )}
              {isNewCustomer && (
                <Badge className="mt-2 bg-blue-100 text-blue-800">
                  New Customer
                </Badge>
              )}
            </div>
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          </div>

          {/* Booking History - Show if exists */}
          {bookingHistory.length > 0 && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Previous Bookings ({bookingHistory.length})
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {bookingHistory.map((booking, index) => (
                  <div key={booking.id || index} className="text-sm p-3 bg-white rounded border border-blue-100 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">{getServiceName(booking.service)}</div>
                        <div className="text-gray-600 text-xs space-y-0.5">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {booking.astrologer}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.consultation_duration} • {booking.preferred_date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant={booking.status === 'confirmed' ? 'success' : 'secondary'} className="text-xs">
                          {booking.status}
                        </Badge>
                        <div className="text-xs font-medium">
                          {booking.amount === 0 ? (
                            <span className="text-green-600 flex items-center gap-1 justify-end">
                              <CheckCircle className="w-3 h-3" />
                              FREE
                            </span>
                          ) : (
                            <span className="text-gray-900">₹{booking.amount / 100}</span>
                          )}
                        </div>
                        {/* Payment Status */}
                        {booking.amount > 0 && (
                          <div className="text-xs">
                            {booking.payment_status === 'completed' ? (
                              <span className="text-green-600 flex items-center gap-1 justify-end">
                                <CheckCircle className="w-3 h-3" />
                                Paid ✓
                              </span>
                            ) : (
                              <span className="text-orange-600 flex items-center gap-1 justify-end">
                                <AlertCircle className="w-3 h-3" />
                                Pending
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Summary */}
              {(() => {
                const totalBookings = bookingHistory.length;
                const paidBookings = bookingHistory.filter(b => b.payment_status === 'completed' || b.amount === 0).length;
                const pendingPayments = bookingHistory.filter(b => b.payment_status === 'pending' && b.amount > 0).length;
                const totalPaid = bookingHistory
                  .filter(b => b.payment_status === 'completed')
                  .reduce((sum, b) => sum + (b.amount || 0), 0);
                const totalPending = bookingHistory
                  .filter(b => b.payment_status === 'pending' && b.amount > 0)
                  .reduce((sum, b) => sum + (b.amount || 0), 0);

                return (
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-green-50 p-2 rounded">
                        <div className="text-gray-600 mb-1">Completed Bookings</div>
                        <div className="font-semibold text-green-700 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {paidBookings} / {totalBookings}
                        </div>
                        {totalPaid > 0 && (
                          <div className="text-gray-600 mt-1">₹{totalPaid / 100} paid</div>
                        )}
                      </div>
                      <div className="bg-orange-50 p-2 rounded">
                        <div className="text-gray-600 mb-1">Pending Payments</div>
                        <div className="font-semibold text-orange-700 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {pendingPayments} booking{pendingPayments !== 1 ? 's' : ''}
                        </div>
                        {totalPending > 0 && (
                          <div className="text-gray-600 mt-1">₹{totalPending / 100} pending</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          <form onSubmit={handleCreateBooking} className="space-y-6">
            {/* Customer Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth (Optional)</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timeOfBirth">Time of Birth (Optional)</Label>
                <Input
                  id="timeOfBirth"
                  type="time"
                  value={formData.timeOfBirth}
                  onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="placeOfBirth">Place of Birth (Optional)</Label>
                <Input
                  id="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                  placeholder="City, State, Country"
                />
              </div>
            </div>

            {/* Service Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Service Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="service">Service *</Label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockServices.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="astrologer">Astrologer *</Label>
                  <Select value={formData.astrologer} onValueChange={(value) => setFormData({ ...formData, astrologer: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select astrologer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Acharyaa Indira Pandey">Acharyaa Indira Pandey</SelectItem>
                      <SelectItem value="Acharyaa Ankita Pandey">Acharyaa Ankita Pandey</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="consultationType">Consultation Type *</Label>
                  <Select value={formData.consultationType} onValueChange={(value) => setFormData({ ...formData, consultationType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="inperson">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="consultationDuration">Duration *</Label>
                  <Select
                    value={formData.consultationDuration}
                    onValueChange={(value) => setFormData({ ...formData, consultationDuration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-10" disabled={!canUseFreeBooking}>
                        5-10 mins {canUseFreeBooking ? '(FREE - First-time only) ✨' : '(Not eligible - already used)'}
                      </SelectItem>
                      <SelectItem value="10+">10+ mins (Full service)</SelectItem>
                    </SelectContent>
                  </Select>
                  {!canUseFreeBooking && (
                    <p className="text-xs text-amber-600 mt-1">
                      ⚠️ Customer has previous booking(s) - not eligible for free consultation
                    </p>
                  )}
                  {canUseFreeBooking && (
                    <p className="text-xs text-green-600 mt-1">
                      ✨ Eligible for FREE 5-10 mins first-time consultation!
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="preferredDate">Preferred Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value, preferredTime: '' })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="preferredTime">Available Time Slots *</Label>
                  {!formData.astrologer || !formData.preferredDate ? (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md text-center text-sm text-gray-500">
                      Please select astrologer and date first
                    </div>
                  ) : loadingSlots ? (
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-md text-center">
                      <Clock className="w-4 h-4 animate-spin mx-auto mb-1 text-purple-600" />
                      <p className="text-xs text-purple-700">Loading slots...</p>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-center text-sm text-amber-700">
                      No slots available for this date
                    </div>
                  ) : (
                    <Select
                      value={formData.preferredTime}
                      onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
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

              <div className="mt-4">
                <Label htmlFor="message">Additional Notes</Label>
                <textarea
                  id="message"
                  className="w-full p-2 border rounded-md"
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any specific requirements or questions..."
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1 bg-purple-600 hover:bg-purple-700">
                {loading ? 'Creating Booking...' : 'Create Booking'}
              </Button>
            </div>
          </form>
        </Card>
      )}
      {/* Step 3: Payment Link */}
      {step === 3 && bookingResult && (
        <Card className="p-8 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-purple-900 mb-2">Booking Created Successfully!</h2>
            <p className="text-gray-600">Booking ID: <span className="font-mono font-semibold">{bookingResult.booking_id}</span></p>
          </div>

          <div className="space-y-6">
            {/* Amount */}
            <div className={`p-4 rounded-lg ${bookingResult.amount > 0 ? 'bg-purple-50' : 'bg-green-50'}`}>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Amount:</span>
                <span className={`text-2xl font-bold ${bookingResult.amount > 0 ? 'text-purple-900' : 'text-green-700'}`}>
                  {bookingResult.amount_display}
                  {bookingResult.amount === 0 && bookingResult.is_first_booking && (
                    <span className="text-sm ml-2 text-green-600">(First-time FREE!)</span>
                  )}
                </span>
              </div>
            </div>

            {/* Free Booking Confirmation */}
            {bookingResult.amount === 0 && (
              <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">✅ Booking Confirmed!</p>
                    <p className="text-sm text-green-700">This is a complimentary first-time consultation. No payment required.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Link */}
            {bookingResult.payment_link && bookingResult.amount > 0 && (
              <div className="space-y-3">
                <Label>Payment Link (Send to Customer)</Label>
                <div className="flex gap-2">
                  <Input
                    value={bookingResult.payment_link}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button onClick={() => copyToClipboard(bookingResult.payment_link)} variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  📱 Send this link to customer via WhatsApp, SMS, or Email
                </p>
              </div>
            )}

            {/* Alternative Payment Methods - Only show if amount > 0 */}
            {bookingResult.amount > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-semibold text-purple-900 mb-2">Alternative Payment Methods:</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">UPI:</span>
                    <span className="font-mono">myastroguru@paytm</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard('myastroguru@paytm')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Phone Pay / Google Pay / Paytm</span>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions - Only for paid bookings */}
            {bookingResult.amount > 0 && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important Instructions:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-800">
                  <li>Share the payment link with the customer</li>
                  <li>Wait for customer to complete payment</li>
                  <li>Once payment is received, click "Confirm Payment" below</li>
                  <li>Customer will receive confirmation email & booking will be finalized</li>
                </ol>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {/* Show confirm payment button only if amount > 0 and payment pending */}
              {bookingResult.amount > 0 && bookingResult.payment_status === 'pending' && (
                <Button
                  onClick={handleConfirmPayment}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {loading ? 'Confirming...' : 'Confirm Payment Received'}
                </Button>
              )}
              <Button
                onClick={handleReset}
                variant="outline"
                className={bookingResult.amount === 0 || bookingResult.payment_status === 'completed' ? 'w-full' : 'flex-1'}
              >
                Create Another Booking
              </Button>
            </div>

            {/* Booking Details Summary */}
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold text-purple-900 mb-3">Booking Summary:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Customer:</div>
                <div className="font-medium">{formData.name}</div>

                <div className="text-gray-600">Email:</div>
                <div className="font-medium">{formData.email}</div>

                <div className="text-gray-600">Phone:</div>
                <div className="font-medium">{formData.phone}</div>

                <div className="text-gray-600">Service:</div>
                <div className="font-medium">{getServiceName(formData.service)}</div>

                <div className="text-gray-600">Astrologer:</div>
                <div className="font-medium">{formData.astrologer}</div>

                {formData.preferredDate && (
                  <>
                    <div className="text-gray-600">Date:</div>
                    <div className="font-medium">{formData.preferredDate}</div>
                  </>
                )}

                {formData.preferredTime && (
                  <>
                    <div className="text-gray-600">Time:</div>
                    <div className="font-medium">{formData.preferredTime}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminAssistedBooking;



