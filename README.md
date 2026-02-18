# Mrs. Indira Pandey - Vedic Astrology Consultation Platform

A professional, full-stack astrology booking and consultation platform built with React, FastAPI, and MongoDB.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Payment Integration](#payment-integration)
- [Admin Dashboard](#admin-dashboard)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)

---

## 🌟 Overview

**About the Platform:**
- Professional astrology consultation booking system
- 20+ years of Vedic astrology expertise
- 800+ satisfied clients with 95% satisfaction rate
- Integrated payment gateway (Razorpay)
- Automated email notifications
- Real-time admin dashboard

**Services Offered:**
1. Birth Chart (Kundli) Analysis
2. Career & Business Guidance
3. Marriage & Relationship Compatibility
4. Health & Life Path Insights
5. Vastu Consultation
6. Numerology
7. Gemstone Remedies & Sales
8. Auspicious Childbirth Timing (Muhurat)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18
- **Styling:** TailwindCSS
- **UI Components:** Shadcn UI
- **Icons:** Lucide React
- **Routing:** React Router v6
- **Notifications:** Sonner (Toast)
- **Build Tool:** Create React App with CRACO

### Backend
- **Framework:** FastAPI (Python)
- **Database:** MongoDB (Motor async driver)
- **Payment:** Razorpay
- **Email:** SMTP (Gmail)
- **Server:** Uvicorn

### Database
- **MongoDB Collections:**
  - `bookings` - Customer bookings
  - `astrologer_availability` - Slot management
  - `contact_inquiries` - Contact form submissions
  - `newsletter_subscribers` - Email subscriptions

---

## ✨ Features

### Customer Features
✅ Browse services and pricing
✅ Book consultations with preferred astrologer
✅ Select consultation duration (5-10 min free, 10-20 min ₹1,500, 20+ min ₹2,100)
✅ Integrated payment gateway (Razorpay)
✅ Instant booking confirmation
✅ Email notifications
✅ Contact form
✅ Newsletter subscription
✅ Gemstone catalog
✅ Testimonials and reviews

### Admin Features
✅ View all bookings in real-time
✅ Filter by status (Pending/Confirmed/Completed/Cancelled)
✅ Search by name, email, or phone
✅ Update booking status
✅ View payment status
✅ Real-time statistics dashboard

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- MongoDB (local or MongoDB Atlas)

### Installation

**1. Clone the repository:**
```bash
git clone <repository-url>
cd Astrologer-project
```

**2. Install Frontend Dependencies:**
```bash
cd frontend
npm install
```

**3. Install Backend Dependencies:**
```bash
cd ../backend
pip install -r requirements.txt
```

**4. Configure Environment Variables:**

Create `backend/.env`:
```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=astrology_db
CORS_ORIGINS=http://localhost:3000

# Optional - for payments
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Optional - for emails
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=
SMTP_PASSWORD=
```

Create `frontend/.env`:
```bash
REACT_APP_BACKEND_URL=http://localhost:8000
```

**5. Start the Servers:**

Terminal 1 - Backend:
```bash
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

**6. Access the Application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Dashboard: http://localhost:3000/admin

---

## 🔐 Environment Variables

### Backend Variables (`backend/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGO_URL` | ✅ Yes | MongoDB connection string | `mongodb://localhost:27017` |
| `DB_NAME` | ✅ Yes | Database name | `astrology_db` |
| `CORS_ORIGINS` | ✅ Yes | Allowed origins | `http://localhost:3000` |
| `RAZORPAY_KEY_ID` | ⚠️ Optional | Razorpay API key | `rzp_test_xxxxx` |
| `RAZORPAY_KEY_SECRET` | ⚠️ Optional | Razorpay secret | `xxxxxxxx` |
| `SMTP_EMAIL` | ⚠️ Optional | Email for notifications | `your@email.com` |
| `SMTP_PASSWORD` | ⚠️ Optional | Gmail app password | `16-char-password` |
| `SMTP_SERVER` | ⚠️ Optional | SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | ⚠️ Optional | SMTP port | `587` |

### Frontend Variables (`frontend/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | ✅ Yes | Backend API URL | `http://localhost:8000` |

**Note:**
- ✅ Required = App won't work without it
- ⚠️ Optional = App works, but feature disabled (payments/emails won't work)


---

## 💳 Payment Integration

### Razorpay Setup

**1. Get API Keys:**
- Go to https://dashboard.razorpay.com
- Sign up/Login
- Settings → API Keys
- Generate Test Keys (for development)
- Generate Live Keys (for production after KYC)

**2. Add to Backend `.env`:**
```bash
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
```

**3. Payment Flow:**
```
Customer selects duration →
  Free (5-10 min): No payment, instant confirmation
  Paid (10-20 min or 20+ min): Razorpay popup opens →
    Customer pays → Payment verified → Booking confirmed
```

**4. Test Payment:**
- **Test Card:** 4111 1111 1111 1111
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **Test UPI:** success@razorpay

**Supported Payment Methods:**
- Credit/Debit Cards (Visa, Mastercard, RuPay, Amex)
- UPI (Google Pay, PhonePe, Paytm, BHIM)
- Net Banking (All major Indian banks)
- Wallets (Paytm, Mobikwik, etc.)

---

## 📧 Email Configuration

### Gmail App Password Setup

**1. Enable 2-Step Verification:**
- Go to https://myaccount.google.com/security
- Enable "2-Step Verification"

**2. Generate App Password:**
- Search for "App Passwords"
- Select: Mail → Other (Custom) → "Astrology Website"
- Click Generate
- Copy the 16-character password

**3. Add to Backend `.env`:**
```bash
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=indirapandey2526@gmail.com
SMTP_PASSWORD=your_16_char_app_password
```

**Automated Emails Sent:**
- ✅ Booking confirmation (customer)
- ✅ Payment confirmation (customer)
- ✅ Contact form confirmation (customer)
- ✅ Newsletter welcome (subscriber)

---

## 🔧 Admin Dashboard

**Access:** http://localhost:3000/admin
**Password:** `admin123` (⚠️ CHANGE IN PRODUCTION!)

### Features:
- View all bookings with real-time updates
- Filter by status: Pending, Confirmed, Completed, Cancelled
- Search by customer name, email, or phone
- Update booking status with dropdown
- View payment status for each booking
- Statistics dashboard (total bookings, revenue, etc.)
- Refresh button for latest data

### Admin Workflow:
1. Customer books consultation
2. Booking appears in admin dashboard immediately
3. Admin reviews booking details
4. Admin updates status to "Confirmed" after scheduling
5. After consultation, update to "Completed"
6. Customer receives email notification for status changes

**Security Note:** Change the admin password in production by updating `frontend/src/pages/Admin.jsx`

---

## 🌐 Deployment

### MongoDB Atlas Setup (Recommended for Production)

**1. Create Account:**
- Go to https://www.mongodb.com/cloud/atlas
- Create free account
- Create new cluster

**2. Get Connection String:**
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy connection string
- Replace `<password>` with your database password

**3. Update Environment Variable:**
```bash
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/astrology_db?retryWrites=true&w=majority
```

### Production Deployment Checklist

**Before Deployment:**
- [ ] Get Razorpay live keys (after KYC verification)
- [ ] Get Gmail app password
- [ ] Set up MongoDB Atlas
- [ ] Test all features with test keys
- [ ] Change admin password
- [ ] Update CORS_ORIGINS to production domain

**Environment Variables for Production:**
```bash
# Backend
MONGO_URL=<MongoDB Atlas connection string>
DB_NAME=astrology_db
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=<live_secret>
SMTP_EMAIL=indirapandey2526@gmail.com
SMTP_PASSWORD=<app_password>

# Frontend
REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

**After Deployment:**
- [ ] Test booking with Razorpay test keys
- [ ] Verify email notifications work
- [ ] Test admin dashboard
- [ ] Test all forms and features
- [ ] Switch to Razorpay live keys
- [ ] Monitor first few bookings

---

## 📁 Project Structure

```
Astrologer-project/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Shadcn UI components
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── BookingSuccess.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── Gemstones.jsx
│   │   │   └── Team.jsx
│   │   ├── mockData.js      # Mock data for development
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── craco.config.js
│
├── backend/
│   ├── server.py            # Main FastAPI application
│   ├── models.py            # Pydantic models
│   ├── .env
│   └── requirements.txt
│
└── README.md
```

---

## 🔌 API Documentation

### Base URL
- Development: `http://localhost:8000`
- Production: `https://api.yourdomain.com`

### Endpoints

#### Bookings
```
POST   /api/bookings              Create new booking
GET    /api/bookings              Get all bookings (admin)
GET    /api/bookings/{id}         Get booking by ID
PUT    /api/bookings/{id}/status  Update booking status
```

#### Payments
```
POST   /api/verify-payment        Verify Razorpay payment
GET    /api/razorpay-key          Get Razorpay public key
```

#### Contact & Newsletter
```
POST   /api/contact               Submit contact inquiry
POST   /api/newsletter            Subscribe to newsletter
```

#### Availability
```
GET    /api/available-slots       Get available time slots
       Query params: astrologer, date
```

#### System
```
GET    /api/                      API health check
```

### Example: Create Booking

**Request:**
```bash
POST /api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "astrologer": "Mrs. Indira Pandey",
  "service": "Birth Chart Analysis",
  "consultation_duration": 20,
  "consultation_type": "online",
  "birth_date": "1990-01-15",
  "birth_time": "14:30",
  "birth_place": "Delhi",
  "message": "Looking for career guidance"
}
```

**Response:**
```json
{
  "id": "BK-1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "status": "pending",
  "payment_status": "pending",
  "amount": 210000,
  "razorpay_order_id": "order_xxxxx",
  "created_at": "2024-12-01T10:30:00Z"
}
```

---

## 🔒 Security Best Practices

### DO:
✅ Use different keys for test and production
✅ Keep `.env` files in `.gitignore`
✅ Use Gmail App Password (not regular password)
✅ Regenerate keys if exposed
✅ Use environment variables (never hardcode)
✅ Set appropriate CORS_ORIGINS in production
✅ Change admin password before going live

### DON'T:
❌ Commit `.env` files to Git
❌ Share API keys publicly
❌ Use test keys in production
❌ Use production keys in development
❌ Hardcode secrets in code
❌ Use `CORS_ORIGINS="*"` in production

---

## 🧪 Testing

### Manual Testing Checklist

**Booking Flow:**
- [ ] Book free consultation (5-10 mins)
- [ ] Book paid consultation (10-20 mins) with test payment
- [ ] Book comprehensive consultation (20+ mins) with test payment
- [ ] Verify booking confirmation page
- [ ] Check email notifications

**Admin Dashboard:**
- [ ] Login to admin panel
- [ ] View all bookings
- [ ] Filter by status
- [ ] Search by customer details
- [ ] Update booking status
- [ ] Verify statistics

**Forms:**
- [ ] Submit contact form
- [ ] Subscribe to newsletter
- [ ] Test form validation

**Payment:**
- [ ] Test successful payment
- [ ] Test failed payment
- [ ] Verify payment status updates

---

## 📞 Support & Contact

**Astrologer Contact:**
- Email: indirapandey2526@gmail.com
- Phone: +91 8130420339
- Location: Ghaziabad, India

**Technical Support:**
- Razorpay Dashboard: https://dashboard.razorpay.com
- MongoDB Atlas: https://cloud.mongodb.com
- Razorpay Docs: https://razorpay.com/docs

---

## 📝 License

This project is proprietary software developed for Mrs. Indira Pandey's astrology consultation business.

---

## 🎯 Quick Reference

**Current Setup:**
- Frontend: React + TailwindCSS + Shadcn UI
- Backend: FastAPI + MongoDB
- Payment: Razorpay
- Email: Gmail SMTP

**Key Features:**
- 8 astrology services
- 3-tier pricing (Free, ₹1,500, ₹2,100)
- Integrated payment gateway
- Admin dashboard
- Email notifications
- Gemstone catalog
- Team of 3 astrologers

**Critical Configuration:**
1. MongoDB connection (required)
2. Razorpay keys (for payments)
3. Gmail app password (for emails)
4. Admin password (change in production)

---

**Last Updated:** February 2026
**Version:** 1.0.0
**Status:** Production Ready ✅
