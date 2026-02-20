import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Lock, Sparkles, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API}/auth/reset-password`, {
        token,
        new_password: formData.password
      });
      
      setSuccess(true);
      toast.success('Password reset successful!');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to reset password. The link may have expired.';
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
              <span className="text-sm font-medium text-purple-700">Reset Password</span>
            </div>
            <h1 className="text-4xl font-bold text-purple-900 mb-3">Create New Password</h1>
            <p className="text-gray-600">Enter your new password below</p>
          </div>

          {/* Form or Success Message */}
          <Card className="p-8 shadow-xl border-purple-100">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-purple-900 mb-3">Password Reset Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Your password has been successfully reset.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Redirecting to login page...
                </p>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white">
                    Go to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div>
                  <Label htmlFor="password" className="text-purple-900 font-semibold mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      required
                      className={`border-purple-200 focus:border-purple-500 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Must be at least 6 characters
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword" className="text-purple-900 font-semibold mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      required
                      minLength={6}
                      className="border-purple-200 focus:border-purple-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white py-6 text-lg font-semibold"
                >
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </Button>
              </form>
            )}
          </Card>

          {/* Back to Login */}
          {!success && (
            <div className="mt-6 text-center">
              <Link to="/login" className="text-purple-600 hover:underline font-medium">
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
