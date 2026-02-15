# Admin Dashboard & Payment Flow Guide

## 📍 Admin Dashboard Location

**URL:** `https://celestial-charts-2.preview.emergentagent.com/admin`

**Access:**
- Password: `admin123` (CHANGE THIS IN PRODUCTION!)
- No username required, just password
- Browser will remember login for the session

**Features Available:**
1. View all bookings in real-time
2. Filter by status (Pending/Confirmed/Completed/Cancelled)
3. Search by customer name, email, or phone
4. Update booking status with dropdown
5. See payment status for each booking
6. Real-time statistics dashboard
7. Refresh button to get latest bookings

---

## 💳 Payment Flow - How It Works

### Current Setup:

**Payment Gateway:** Razorpay (Leading Indian payment gateway)

### Complete Customer Journey:

```
1. Customer visits Booking Page
   ↓
2. Fills booking form (selects astrologer, service, duration)
   ↓
3. Selects consultation duration:
   - 5-10 mins → FREE (for first-time customers)
   - 10-20 mins → ₹1,500
   - 20+ mins → ₹2,100
   ↓
4. Clicks "Submit Booking Request"
   ↓
5. Backend creates booking in MongoDB
   ↓
6. IF amount = 0 (Free consultation):
   → Skip payment
   → Mark as "Payment Completed"
   → Show success page immediately
   → Send confirmation email
   
   IF amount > 0 (Paid consultation):
   → Backend creates Razorpay order
   → Razorpay payment popup opens
   → Customer enters card/UPI/netbanking details
   → Payment processed by Razorpay
   ↓
7. After successful payment:
   → Razorpay sends payment details to backend
   → Backend verifies payment signature (security)
   → Updates booking status to "Confirmed"
   → Updates payment_status to "Completed"
   → Stores razorpay_payment_id
   ↓
8. Customer sees:
   → Success page with booking ID
   → Payment confirmation
   → Receives email with details
   ↓
9. Admin Dashboard:
   → Booking appears instantly
   → Shows payment status
   → Team can update booking status
   → Contact customer within 24 hours
```

---

## 🔐 Required Configuration (Currently Missing)

### To Enable Real Payments:

**File:** `/app/backend/.env`

Add these lines:
```bash
# Razorpay Keys (Get from https://dashboard.razorpay.com)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx

# Email Configuration (For Gmail)
SMTP_EMAIL=indirapandey2526@gmail.com
SMTP_PASSWORD=your_gmail_app_password
```

### How to Get Razorpay Keys:

1. Go to https://dashboard.razorpay.com
2. Sign up / Login
3. Go to Settings → API Keys
4. Generate Test Keys (for testing)
5. Generate Live Keys (for production)
6. Copy Key ID and Secret

### How to Get Gmail App Password:

1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Search for "App Passwords"
4. Generate password for "Mail"
5. Copy the 16-character password
6. Use this in SMTP_PASSWORD

---

## 💰 Payment Methods Supported by Razorpay:

- **Credit/Debit Cards** (Visa, Mastercard, RuPay, Amex)
- **UPI** (Google Pay, PhonePe, Paytm, BHIM)
- **Net Banking** (All major Indian banks)
- **Wallets** (Paytm, Mobikwik, etc.)
- **EMI** (No-cost EMI available)

---

## 📊 Current Status:

**✅ Fully Implemented:**
- Booking form with all fields
- Razorpay integration code
- Payment verification
- Email notifications (template ready)
- Success/failure handling
- Admin dashboard

**⚠️ Requires Configuration:**
- Razorpay API keys (for payments to work)
- SMTP credentials (for emails to send)

**🔄 How It Works RIGHT NOW:**

**WITHOUT Razorpay Keys:**
- Free consultations: ✅ Work perfectly
- Paid consultations: ❌ Payment popup won't open
- Booking gets created but shows "Payment Pending"

**WITH Razorpay Keys:**
- Free consultations: ✅ Work perfectly  
- Paid consultations: ✅ Full payment flow works
- Razorpay popup opens → Payment processed → Confirmation

---

## 🧪 Testing Payment Flow:

### Test Mode (Razorpay Test Keys):

Use these test card details:
- **Card Number:** 4111 1111 1111 1111
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **Result:** Payment succeeds

For failed payment test:
- **Card Number:** 4000 0000 0000 0002
- **Result:** Payment fails

### Test UPI:
- **UPI ID:** success@razorpay
- **Result:** Payment succeeds

---

## 📧 Email Notifications:

**Automated emails sent for:**

1. **Booking Confirmation** (Customer)
   - Booking ID
   - Astrologer details
   - Service & duration
   - Amount (Free or paid)
   - Next steps

2. **Payment Confirmation** (Customer)
   - Payment ID
   - Amount paid
   - Booking confirmed status

3. **Contact Form** (Customer)
   - Thank you message
   - Copy of their message

4. **Newsletter** (Subscriber)
   - Welcome message
   - What to expect

---

## 🔄 Admin Workflow:

1. Customer books consultation
2. Booking appears in admin dashboard immediately
3. Admin sees:
   - Customer details
   - Selected astrologer
   - Service requested
   - Payment status
4. Admin can:
   - Update status to "Confirmed" (after scheduling)
   - Update to "Completed" (after consultation)
   - Update to "Cancelled" (if needed)
5. Customer gets email notification for status changes

---

## 📱 Customer Receives:

**Immediate:**
- On-screen confirmation with booking ID
- Success page with all details
- What happens next section

**Within 1 minute:**
- Email confirmation (if SMTP configured)
- Payment receipt (if paid)

**Within 24 hours:**
- Phone call from team
- Consultation scheduled
- Meeting link/address shared

---

## 🚀 Next Steps to Go Live:

1. ✅ Add Razorpay keys to `.env`
2. ✅ Add SMTP credentials to `.env`
3. ✅ Restart backend: `sudo supervisorctl restart backend`
4. ✅ Test with Razorpay test keys
5. ✅ Verify emails are sending
6. ✅ Test full booking flow
7. ✅ Switch to Razorpay live keys
8. ✅ Change admin password in code
9. ✅ Website is live!

---

## 🔒 Security Features:

- Payment signature verification
- Secure payment gateway (PCI DSS compliant)
- No card details stored on server
- All payments processed by Razorpay
- HTTPS encryption
- Admin password protection
- MongoDB database security

---

## 💡 Tips:

- Start with test keys to verify everything works
- Monitor first few bookings closely
- Keep admin dashboard open during business hours
- Respond to bookings within 24 hours
- Update booking status regularly
- Check email deliverability

---

**Support:**
- Razorpay Dashboard: https://dashboard.razorpay.com
- Razorpay Docs: https://razorpay.com/docs
- Admin Dashboard: /admin
- Backend API: https://celestial-charts-2.preview.emergentagent.com/api/
