import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Star, Send } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';

const TestimonialForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    service: '',
    location: '',
    text: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const services = [
    'Birth Chart (Kundli) Analysis',
    'Career & Business Guidance',
    'Marriage & Relationship Compatibility',
    'Health & Life Path Insights',
    'Gemstone Recommendation',
    'Muhurat (Auspicious Timing)',
    'Vastu Consultation',
    'Remedial Solutions'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || formData.name.length < 2) {
      toast.error(t('testimonials.formErrorTitle'), {
        description: 'Name must be at least 2 characters long.'
      });
      return;
    }

    if (!formData.email) {
      toast.error(t('testimonials.formErrorTitle'), {
        description: 'Please provide a valid email address.'
      });
      return;
    }

    if (!formData.service) {
      toast.error(t('testimonials.formErrorTitle'), {
        description: 'Please select a service.'
      });
      return;
    }

    if (formData.text.length < 10) {
      toast.error(t('testimonials.formErrorTitle'), {
        description: 'Testimonial must be at least 10 characters long.'
      });
      return;
    }

    setSubmitting(true);

    try {
      const API_URL = process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
      console.log('Submitting testimonial to:', `${API_URL}/testimonials`);
      console.log('Form data:', formData);

      const response = await axios.post(`${API_URL}/testimonials`, formData);

      console.log('Response:', response.data);

      toast.success(t('testimonials.formSuccessTitle'), {
        description: t('testimonials.formSuccessMessage')
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        rating: 5,
        service: '',
        location: '',
        text: ''
      });
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      console.error('Error response:', error.response?.data);

      const errorMessage = error.response?.data?.detail
        || error.response?.data?.message
        || t('testimonials.formErrorMessage');

      toast.error(t('testimonials.formErrorTitle'), {
        description: errorMessage
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-purple-50 to-white shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-900 mb-3">
          {t('testimonials.formTitle')}
        </h2>
        <p className="text-gray-600">
          {t('testimonials.formSubtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-purple-900 mb-2">
            {t('testimonials.formName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('testimonials.formNamePlaceholder')}
            required
            minLength={2}
            maxLength={100}
            className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-purple-900 mb-2">
            {t('testimonials.formEmail')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('testimonials.formEmailPlaceholder')}
            required
            className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-purple-900 mb-2">
            {t('testimonials.formRating')} <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-3">{t('testimonials.formRatingLabel')}</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= formData.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-semibold text-purple-900 mb-2">
            {t('testimonials.formService')} <span className="text-red-500">*</span>
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          >
            <option value="">{t('testimonials.formServicePlaceholder')}</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Location (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-purple-900 mb-2">
            {t('testimonials.formLocation')}
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder={t('testimonials.formLocationPlaceholder')}
            maxLength={100}
            className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Testimonial Text */}
        <div>
          <label className="block text-sm font-semibold text-purple-900 mb-2">
            {t('testimonials.formTestimonial')} <span className="text-red-500">*</span>
          </label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder={t('testimonials.formTestimonialPlaceholder')}
            required
            minLength={10}
            maxLength={1000}
            rows={5}
            className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.text.length}/1000 characters
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-6 text-lg font-semibold shadow-lg disabled:opacity-50"
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              {t('testimonials.formSubmitting')}
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              {t('testimonials.formSubmit')}
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default TestimonialForm;

