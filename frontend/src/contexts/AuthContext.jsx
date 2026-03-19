import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import api, { BACKEND_URL } from '../utils/api';

const AuthContext = createContext(null);

const API = `${BACKEND_URL}/api`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await api.get('/auth/verify');

          if (isMounted) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          }
        } catch (error) {
          // Only logout if it's a 401 (unauthorized), not on network errors
          if (error.response?.status === 401 && !error.isNetworkError) {
            console.error('Token expired or invalid');
            localStorage.removeItem('authToken');
            if (isMounted) {
              setUser(null);
              setIsAuthenticated(false);
            }
          } else if (error.isNetworkError) {
            // Network error - keep user logged in
            console.warn('⚠️ Auth verification failed due to network issue - keeping user logged in');
          } else {
            console.error('Auth verification error:', error.message);
          }
        }
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('authToken', token);
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      console.log('Login error response:', error.response?.data);

      if (error.isNetworkError) {
        const message = 'Network connection issue. If you\'re on Jio network, try switching to WiFi or another network.';
        toast.error(message, { duration: 6000 });
        return { success: false, error: message };
      }

      const message = error.response?.data?.detail || error.response?.data?.message || 'Login failed. Please try again.';
      console.log('Extracted message:', message);

      if (message.includes('does not exist')) {
        console.log('Showing toast with Sign Up button');
        toast.error(message, {
          duration: 5000,
          action: {
            label: 'Sign Up',
            onClick: () => window.location.href = '/signup'
          }
        });
      } else {
        console.log('Showing regular toast');
        toast.error(message);
      }

      return { success: false, error: message };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      const { token, user } = response.data;

      localStorage.setItem('authToken', token);
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      if (error.isNetworkError) {
        const message = 'Network connection issue. If you\'re on Jio network, try switching to WiFi or another network.';
        toast.error(message, { duration: 6000 });
        return { success: false, error: message };
      }

      const message = error.response?.data?.detail || error.response?.data?.message || 'Signup failed. Please try again.';

      if (message.includes('already registered') || message.includes('already exists')) {
        toast.error(message, {
          duration: 5000,
          action: {
            label: 'Login',
            onClick: () => window.location.href = '/login'
          }
        });
      } else {
        toast.error(message);
      }

      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    getToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

