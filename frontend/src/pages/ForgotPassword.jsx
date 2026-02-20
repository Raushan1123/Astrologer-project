import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Mail, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/auth/forgot-password`, { email });
      setEmailSent(true);
      toast.success('Password reset link sent! Check your email.');
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to send reset link. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-amber-50 pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Password Recovery</span>
            </div>
            <h1 className="text-4xl font-bold text-purple-900 mb-3">Forgot Password?</h1>
            <p className="text-gray-600">No worries! Enter your email and we'll send you reset instructions.</p>
          </div>

          {/* Form or Success Message */}
          <Card className="p-8 shadow-xl border-purple-100">
            {emailSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-purple-900 mb-3">Check Your Email</h2>
                <p className="text-gray-600 mb-6">
                  We've sent password reset instructions to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  The link will expire in 1 hour. If you don't see the email, check your spam folder.
                </p>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white">
                    Back to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-purple-900 font-semibold mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="border-purple-200 focus:border-purple-500"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Enter the email address associated with your account
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white py-6 text-lg font-semibold"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>

                {/* Back to Login */}
                <div className="text-center">
                  <Link to="/login" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </Link>
                </div>
              </form>
            )}
          </Card>

          {/* Additional Help */}
          {!emailSent && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-purple-600 hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

