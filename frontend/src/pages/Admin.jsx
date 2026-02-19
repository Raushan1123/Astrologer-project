import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Calendar, User, Phone, Mail, Search, Filter, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple authentication (In production, use proper auth)
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {  // Change this password!
      setIsAuthenticated(true);
      toast.success('Logged in successfully');
    } else {
      toast.error('Invalid password');
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Use optimized API with stats
      const response = await axios.get(`${API}/bookings`, {
        params: {
          include_stats: true,
          limit: 100
        }
      });
      setBookings(response.data.bookings || response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(`${API}/bookings/${bookingId}/status`, null, {
        params: { status: newStatus }
      });
      toast.success('Status updated successfully');
      fetchBookings();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentBadge = (status) => {
    const colors = {
      pending: 'bg-orange-100 text-orange-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center pt-20">
        <Card className="p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage bookings and consultations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Bookings', value: bookings.length, color: 'purple' },
            { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'yellow' },
            { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'green' },
            { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: 'blue' }
          ].map((stat, index) => (
            <Card key={index} className="p-6">
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-purple-900">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchBookings} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </Card>

        {/* Bookings List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-600">No bookings found</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-purple-900">{booking.name}</h3>
                          <Badge className={getStatusBadge(booking.status)}>
                            {booking.status}
                          </Badge>
                          <Badge className={getPaymentBadge(booking.payment_status)}>
                            {booking.payment_status === 'completed' ? 'Paid' : 'Payment Pending'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {booking.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {booking.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Astrologer: {booking.astrologer}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Service</p>
                        <p className="font-medium text-gray-900">{booking.service}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-medium text-gray-900">{booking.consultation_duration} mins</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Amount</p>
                        <p className="font-medium text-green-600">
                          {booking.amount === 0 ? 'Free' : `₹${booking.amount / 100}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    <Select
                      value={booking.status}
                      onValueChange={(value) => updateBookingStatus(booking.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="text-xs">
                      View Details
                    </Button>
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

export default Admin;
