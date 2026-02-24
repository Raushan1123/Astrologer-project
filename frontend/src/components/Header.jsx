import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, Languages, User, LogOut, UserCircle, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: t('header.home') },
    { path: '/about', label: t('header.about') },
    { path: '/team', label: t('header.team') },
    { path: '/services', label: t('header.services') },
    { path: '/gemstones', label: t('header.gemstones') },
    { path: '/testimonials', label: t('header.testimonials') },
    { path: '/blog', label: t('header.blog') },
    { path: '/contact', label: t('header.contact') }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-purple-900">Acharyaa Indira Pandey</h1>
              <p className="text-xs text-purple-600">{t('header.vedicAstrologer')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-300 relative group ${
                  isActive(link.path) ? 'text-purple-700' : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-amber-500 transform origin-left transition-transform duration-300 ${
                    isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors duration-300 group"
              title={language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में बदलें'}
            >
              <Languages className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-purple-700">
                {language === 'en' ? 'हिंदी' : 'English'}
              </span>
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/booking">
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 shadow-lg shadow-purple-200 transform hover:scale-105 transition-all duration-300">
                    {t('header.bookConsultation')}
                  </Button>
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors duration-300"
                  >
                    <UserCircle className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">{user?.name?.split(' ')[0]}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-purple-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-purple-100">
                        <p className="text-sm font-semibold text-purple-900">{user?.name}</p>
                        <p className="text-xs text-gray-600">{user?.email}</p>
                      </div>
                      <Link
                        to="/manage-bookings"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 transition-colors"
                      >
                        <Calendar className="w-4 h-4" />
                        My Bookings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 shadow-lg shadow-purple-200 transform hover:scale-105 transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100 animate-in slide-in-from-top duration-300 max-h-[calc(100vh-5rem)] overflow-y-auto bg-white">
            <nav className="flex flex-col gap-2 pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-purple-200 bg-purple-50 text-purple-700 font-medium transition-colors hover:bg-purple-100"
              >
                <Languages className="w-4 h-4" />
                <span>{language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}</span>
              </button>

              {isAuthenticated ? (
                <>
                  <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="mt-2">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                      {t('header.bookConsultation')}
                    </Button>
                  </Link>
                  <div className="px-4 py-3 bg-purple-50 rounded-lg mt-2">
                    <p className="text-sm font-semibold text-purple-900">{user?.name}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>
                  <Link
                    to="/manage-bookings"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-purple-50 text-purple-600 font-medium transition-colors hover:bg-purple-100"
                  >
                    <Calendar className="w-4 h-4" />
                    My Bookings
                  </Link>
                  <div className="border-t border-purple-100 my-2"></div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-50 text-red-600 font-medium transition-colors hover:bg-red-100 mb-4"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mt-2">
                    <Button variant="outline" className="w-full border-purple-300 text-purple-700">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
