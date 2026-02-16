import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { toast } from 'sonner';
import { CalendarIcon, CheckCircle, Clock, Video, MapPin, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { mockServices, astrologers } from '../mockData';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Booking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [razorpayKey, setRazorpayKey] = useState('');
  
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
        name: 'Mrs. Indira Pandey Astrology',
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
        theme: {
          color: '#7c3aed'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment initialization failed');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Mock submission
    toast.success('Booking request submitted successfully! We will contact you shortly.');
    console.log('Booking data:', formData);
    
    // Reset form
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
  };

  return (
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
                  <h3 className="text-2xl font-bold text-purple-900 mb-6">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 1234567890"
                        required
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="placeOfBirth" className="text-gray-700 font-medium mb-2">
                        Place of Birth
                      </Label>
                      <Input
                        id="placeOfBirth"
                        name="placeOfBirth"
                        value={formData.placeOfBirth}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Birth Details */}
                <div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-6">Birth Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium mb-2">
                        Date of Birth
                      </Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        max={new Date().toISOString().split('T')[0]}
                        value={formData.dateOfBirth ? (typeof formData.dateOfBirth === 'string' ? formData.dateOfBirth : formData.dateOfBirth.toISOString().split('T')[0]) : ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        className="border-purple-200 focus:border-purple-500"
                        placeholder="Select your date of birth"
                      />
                      <p className="text-xs text-gray-500 mt-1">Required for accurate chart analysis</p>
                    </div>

                    <div>
                      <Label htmlFor="timeOfBirth" className="text-gray-700 font-medium mb-2">
                        Time of Birth
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
                  <h3 className="text-2xl font-bold text-purple-900 mb-6">Consultation Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="astrologer" className="text-gray-700 font-medium mb-2">
                        Select Astrologer <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.astrologer}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, astrologer: value }))}
                        required
                      >
                        <SelectTrigger className="border-purple-200">
                          <SelectValue placeholder="Choose your astrologer" />
                        </SelectTrigger>
                        <SelectContent>
                          {astrologers.map((astro) => (
                            <SelectItem key={astro.id} value={astro.name}>
                              {astro.name} ({astro.experience} years exp.)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="service" className="text-gray-700 font-medium mb-2">
                        Service Required <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
                        required
                      >
                        <SelectTrigger className="border-purple-200">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockServices.map((service) => (
                            <SelectItem key={service.id} value={service.title}>
                              {service.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="consultationDuration" className="text-gray-700 font-medium mb-2">
                        Consultation Duration <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.consultationDuration}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, consultationDuration: value }))}
                        required
                      >
                        <SelectTrigger className="border-purple-200">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5-10">5-10 Minutes (Free - First Time)</SelectItem>
                          <SelectItem value="10-20">10-20 Minutes (₹1,500)</SelectItem>
                          <SelectItem value="20+">20+ Minutes (₹2,100)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="consultationType" className="text-gray-700 font-medium mb-2">
                        Consultation Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.consultationType}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, consultationType: value }))}
                        required
                      >
                        <SelectTrigger className="border-purple-200">
                          <SelectValue placeholder="Select consultation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online (Video Call)</SelectItem>
                          <SelectItem value="inperson">In-Person (Ghaziabad)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-700 font-medium mb-2">Preferred Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal border-purple-200',
                              !formData.preferredDate && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.preferredDate ? format(formData.preferredDate, 'PPP') : 'Pick a date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.preferredDate}
                            onSelect={(date) => setFormData(prev => ({ ...prev, preferredDate: date }))}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="preferredTime" className="text-gray-700 font-medium mb-2">
                        Preferred Time
                      </Label>
                      <Input
                        id="preferredTime"
                        name="preferredTime"
                        type="time"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium mb-2">
                    Additional Message / Questions
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your concerns or questions..."
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
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 w-5 h-5" />
                        Submit Booking Request
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    We'll review your request and contact you within 24 hours to confirm your consultation.
                  </p>
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-700 text-center">
                      <strong>Consultation Fees:</strong> 5-10 mins (Free for first-time), 10-20 mins (₹1,500), 20+ mins (₹2,100). 
                      Special services like gemstone consultations priced separately.
                    </p>
                  </div>
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
                  title: 'Confirmation',
                  description: 'We review your request and send a confirmation email within 24 hours with available time slots.',
                  icon: CheckCircle
                },
                {
                  step: '2',
                  title: 'Payment',
                  description: 'Once you confirm the time slot, we will send payment details and consultation fee based on your service.',
                  icon: Clock
                },
                {
                  step: '3',
                  title: 'Consultation',
                  description: 'On the scheduled date, we will connect via your chosen mode for your personalized session.',
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
  );
};

export default Booking;
