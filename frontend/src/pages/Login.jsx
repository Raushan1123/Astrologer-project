import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Mail, Lock, Sparkles, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate(from, { replace: true });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-amber-50 pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Welcome Back</span>
            </div>
            <h1 className="text-4xl font-bold text-purple-900 mb-3">Login to Your Account</h1>
            <p className="text-gray-600">Access your personalized astrological journey</p>
          </div>

          {/* Login Form */}
          <Card className="p-8 shadow-xl border-purple-100">
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-purple-900 font-semibold mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="border-purple-200 focus:border-purple-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white py-6 text-lg font-semibold"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            {/* Signup Link */}
            <div className="text-center">
              <Link to="/signup" state={{ from: location.state?.from }}>
                <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                  Create New Account
                </Button>
              </Link>
            </div>
          </Card>

          {/* Additional Info */}
          <p className="text-center text-sm text-gray-600 mt-6">
            By logging in, you agree to our{' '}
            <Link to="/terms" className="text-purple-600 hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

