import React from 'react';
import { Card } from '../components/ui/card';
import { AlertCircle, CheckCircle, XCircle, Clock, CreditCard } from 'lucide-react';

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">Cancellation & Refund Policy</h1>
          <p className="text-gray-600">Please read our cancellation and refund policy carefully</p>
        </div>

        {/* Overview */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-purple-900 mb-2">Policy Overview</h2>
              <p className="text-gray-700">
                We understand that plans can change. This policy outlines the terms for cancelling bookings 
                and requesting refunds for our astrology consultation services.
              </p>
            </div>
          </div>
        </Card>

        {/* Free Consultations */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-purple-900 mb-3">Free Consultations (5-10 Minutes)</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Can be cancelled anytime before the scheduled date and time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>No refund applicable as these are complimentary services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Available only once per customer</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Paid Consultations */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-3">
            <CreditCard className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-purple-900 mb-3">Paid Consultations</h2>
              
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">✅ Full Refund (100%)</h3>
                  <p className="text-gray-700">
                    Cancellations made <strong>24 hours or more</strong> before the scheduled consultation time 
                    will receive a full refund.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Partial Refund (50%)</h3>
                  <p className="text-gray-700">
                    Cancellations made <strong>between 12-24 hours</strong> before the scheduled consultation 
                    will receive a 50% refund.
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-900 mb-2">❌ No Refund</h3>
                  <p className="text-gray-700 mb-2">
                    No refund will be provided for:
                  </p>
                  <ul className="space-y-1 text-gray-700 ml-4">
                    <li>• Cancellations made <strong>less than 12 hours</strong> before the consultation</li>
                    <li>• No-shows (customer doesn't attend the scheduled consultation)</li>
                    <li>• Consultations already completed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Refund Process */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-purple-900 mb-3">Refund Processing</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Refunds are processed automatically when you cancel a booking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Refund amount will be credited to your original payment method</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Processing time: <strong>5-7 business days</strong> from cancellation date</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>You will receive an email confirmation once the refund is processed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Refund status can be tracked in your "Manage Bookings" page</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Rescheduling */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-purple-900 mb-3">Rescheduling</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>You can reschedule your consultation up to <strong>12 hours</strong> before the scheduled time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Rescheduling is free of charge (subject to availability)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Contact us via email or phone to reschedule</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
          <h2 className="text-xl font-bold text-purple-900 mb-3">Questions?</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about our cancellation and refund policy, please contact us:
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>Email:</strong> indirapandey2526@gmail.com</p>
            <p><strong>Phone:</strong> +91 XXX XXX XXXX</p>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          Last updated: February 2026
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;

