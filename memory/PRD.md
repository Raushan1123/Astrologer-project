# Astrology Website - Product Requirements Document

## Project Overview
**Project Name:** Mrs. Indira Pandey - Professional Astrology Website  
**Date Created:** December 2024  
**Status:** Frontend Complete with Mock Data

## About
A professional, elegant astrology website for Mrs. Indira Pandey, a Vedic astrologer with 20+ years of experience and 800+ satisfied clients.

## Tech Stack
- **Frontend:** React, TailwindCSS, Shadcn UI
- **Backend:** FastAPI, Python (To be implemented)
- **Database:** MongoDB (To be implemented)
- **Deployment:** Emergent Platform

---

## Core Requirements

### Astrologer Profile
- **Name:** Mrs. Indira Pandey
- **Experience:** 20+ years
- **Clients Served:** 800+
- **Satisfaction Rate:** 95%
- **Location:** Ghaziabad, India
- **Contact:**
  - Email: indirapandey2526@gmail.com
  - Phone: +91 8130420339

### Website Theme
- **Colors:** Deep purple, gold/amber accents, soft beige backgrounds
- **Style:** Spiritual, elegant, trustworthy, premium
- **Design Elements:** Zodiac symbols, cosmic backgrounds, smooth animations

---

## Services Offered

1. **Birth Chart (Kundli) Analysis**
2. **Career & Business Guidance**
3. **Marriage & Relationship Compatibility**
4. **Health & Life Path Insights**
5. **Vastu Consultation**
6. **Numerology**
7. **Gemstone Remedies & Sales** ✨ NEW
   - Personalized gemstone recommendations
   - Direct purchase of authentic, energized gemstones
8. **Auspicious Childbirth Timing (Muhurat)** ✨ NEW
   - Selection of most auspicious time for childbirth

---

## Consultation Pricing

### Time-Based Pricing Structure

| Duration | Price | Description | Features |
|----------|-------|-------------|----------|
| **5-10 Minutes** | **Free** | Initial consultation for first-time customers | Quick guidance, Basic questions, Understanding concerns |
| **10-20 Minutes** | **₹1,500** | Standard consultation session | Birth chart overview, Specific area guidance, Basic remedies |
| **20+ Minutes** | **₹2,100** | Comprehensive consultation session | Detailed birth chart analysis, Multiple area coverage, Personalized remedies, Follow-up support |

### Special Services
- **Gemstone Consultations:** Priced separately based on gemstone type and quality
- **Childbirth Timing (Muhurat):** Customized pricing based on detailed analysis requirements

---

## Website Pages Implemented

### 1. Home Page ✅
- Hero section with compelling tagline
- Stats showcase (20+ years, 800+ clients, 95% satisfaction)
- Why Choose section
- Featured services preview
- Testimonials preview
- CTA sections

### 2. About Page ✅
- Astrologer journey story
- Professional photo section
- Philosophy & Approach
- Why clients trust (accuracy, confidentiality, compassion)
- Celebrity clients note

### 3. Services Page ✅
- All 8 services with detailed descriptions
- Service images and icons
- What's included in consultations
- **Time-based pricing cards** with features
- Special services pricing note
- Consultation modes (Online & In-person)

### 4. Testimonials Page ✅
- Featured testimonials with ratings
- Client success stories
- Stats banner
- Video testimonials placeholder

### 5. Blog Page ✅
- Featured article section
- Blog grid with categories
- Search functionality
- Category filters
- Newsletter subscription section

### 6. Booking Page ✅
- Comprehensive booking form:
  - Personal information
  - Birth details (date, time, place)
  - Service selection
  - Consultation type (online/in-person)
  - Preferred date and time
  - Additional message
- **Consultation fees displayed** at bottom of form
- What happens next section

### 7. Contact Page ✅
- Contact information cards
- Contact form
- Google Maps integration
- FAQ section with accordion
- Social media links
- WhatsApp quick contact

---

## Features Implemented

### Frontend Features ✅
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Toast notifications (Sonner)
- Calendar date picker
- Form validation
- Interactive navigation
- Hover effects
- Image optimization

### Design System ✅
- Shadcn UI components
- Consistent color scheme (purple/amber)
- Typography hierarchy
- Custom scrollbar
- Focus states
- Print styles

---

## What's Been Implemented (December 2024)

### Phase 1: Frontend with Mock Data ✅
- ✅ Created all 7 pages
- ✅ Integrated Shadcn UI components
- ✅ Added mock data (mockData.js)
- ✅ Implemented responsive design
- ✅ Added animations and transitions
- ✅ Created Header and Footer components
- ✅ Updated experience to 20+ years throughout site
- ✅ Added 2 new services (Gemstone & Childbirth Timing)
- ✅ Implemented time-based pricing structure
- ✅ Added pricing display on Services and Booking pages

---

## Next Action Items

### Phase 2: Backend Implementation 🔄
1. **Database Models:**
   - User/Client model
   - Booking model
   - Testimonial model
   - Blog post model
   - Service model
   - Contact inquiry model

2. **API Endpoints:**
   - `POST /api/bookings` - Create booking
   - `GET /api/services` - List services
   - `GET /api/testimonials` - List testimonials
   - `GET /api/blog` - List blog posts
   - `GET /api/blog/:id` - Get single blog post
   - `POST /api/contact` - Submit contact form
   - `POST /api/newsletter` - Newsletter subscription

3. **Email Integration:**
   - Booking confirmation emails
   - Contact form notifications
   - Newsletter service integration

4. **Payment Gateway Integration:**
   - Razorpay integration (preferred for Indian market)
   - Payment capture for consultations
   - Invoice generation

5. **Admin Panel:**
   - Manage bookings
   - Approve/schedule consultations
   - Manage blog posts
   - View inquiries
   - Gemstone inventory management

---

## Priority Backlog

### P0 (Critical)
- [ ] Backend API development
- [ ] Database schema implementation
- [ ] Booking system with calendar integration
- [ ] Email notification system

### P1 (High Priority)
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Blog CMS functionality
- [ ] Gemstone catalog management

### P2 (Medium Priority)
- [ ] User authentication for returning clients
- [ ] Booking history for clients
- [ ] Video testimonials upload
- [ ] Multilingual support
- [ ] WhatsApp integration for direct booking
- [ ] Live chat widget

---

## Technical Notes

### Mock Data Location
`/app/frontend/src/mockData.js` contains:
- Testimonials
- Services (8 services)
- Blog posts
- FAQs
- Stats
- **Consultation pricing structure**

### Environment Variables
- `REACT_APP_BACKEND_URL` - Backend API URL
- `MONGO_URL` - MongoDB connection string (backend)

### Assets
- Images sourced from Unsplash
- Icons from Lucide React
- Fonts: System fonts (Apple, Segoe UI, Roboto)

---

## User Personas

### Primary Users
1. **First-time Seekers (Age 25-45)**
   - Looking for guidance in career/relationships
   - Want to understand astrology
   - Price-conscious (benefit from free 5-10 min consultation)

2. **Established Professionals (Age 30-55)**
   - Seeking business decisions guidance
   - Value confidentiality
   - Willing to pay for comprehensive sessions

3. **Expecting Parents (Age 25-40)**
   - Need childbirth timing guidance
   - Looking for auspicious muhurat
   - Want personalized attention

4. **Gemstone Buyers (Age 30-60)**
   - Interested in remedies
   - Want authentic gemstones
   - Seek expert recommendations

---

## Success Metrics (To Track Post-Launch)

- Booking conversion rate
- Average consultation duration
- Client retention rate
- Gemstone sales
- Email newsletter signups
- Contact form submissions
- Page views and engagement time

---

## Future Enhancements

- Mobile app (iOS/Android)
- Video consultation platform integration
- Automated calendar booking
- Client portal with consultation history
- Gemstone e-commerce with cart
- Kundli generation tool
- Daily/weekly horoscope automation
- Referral program

---

**Last Updated:** December 2024  
**Next Review:** After backend implementation
