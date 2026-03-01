import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const AuthContext = createContext(null);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
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
          const response = await axios.get(`${API}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000 // 5 second timeout
          });

          if (isMounted) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          }
        } catch (error) {
          // Only logout if it's a 401 (unauthorized), not on network errors
          if (error.response?.status === 401) {
            console.error('Token expired or invalid');
            localStorage.removeItem('authToken');
            if (isMounted) {
              setUser(null);
              setIsAuthenticated(false);
            }
          } else {
            // Network error - keep user logged in
            console.error('Auth verification network error:', error.message);
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
      const response = await axios.post(`${API}/auth/login`, { email, password });
      const { token, user } = response.data;

      localStorage.setItem('authToken', token);
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      console.log('Login error response:', error.response?.data);
      const message = error.response?.data?.detail || error.response?.data?.message || 'Login failed. Please try again.';
      console.log('Extracted message:', message);

      // Show error with appropriate styling
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

  // Signup function
  const signup = async (userData) => {
    try {
      const response = await axios.post(`${API}/auth/signup`, userData);
      const { token, user } = response.data;

      localStorage.setItem('authToken', token);
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.detail || error.response?.data?.message || 'Signup failed. Please try again.';

      // Show error with appropriate styling
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

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  // Get auth token
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

