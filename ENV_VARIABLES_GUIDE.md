# Environment Variables Guide - Deployment Configuration

## 📍 Current Location of Environment Variables

### Backend Environment Variables
**File:** `/app/backend/.env`

**Current Contents:**
```bash
MONGO_URL="mongodb://localhost:27017"
DB_NAME="astrology_db"
CORS_ORIGINS="*"

# Razorpay Configuration (Add your keys here)
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
RAZORPAY_WEBHOOK_SECRET=""

# Email Configuration (Add your SMTP details here)
SMTP_SERVER="smtp.gmail.com"
SMTP_PORT="587"
SMTP_EMAIL=""
SMTP_PASSWORD=""
```

### Frontend Environment Variables
**File:** `/app/frontend/.env`

**Current Contents:**
```bash
REACT_APP_BACKEND_URL=https://celestial-charts-2.preview.emergentagent.com
```

---

## 🚀 What Happens After Deployment?

### On Emergent Platform:

When you deploy to production on Emergent, you need to configure environment variables through the Emergent UI:

1. **Click on your deployed app**
2. **Go to Settings → Environment Variables**
3. **Add the following variables:**

### Required Environment Variables for Production:

#### Backend Variables:

```bash
# Database (Emergent provides managed MongoDB)
MONGO_URL=<Emergent will provide this>
DB_NAME=astrology_db

# CORS (Set to your domain)
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Email Configuration (Gmail)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=indirapandey2526@gmail.com
SMTP_PASSWORD=your_gmail_app_password
```

#### Frontend Variables:

```bash
# Backend API URL (Emergent will provide production URL)
REACT_APP_BACKEND_URL=https://your-app-name.emergentagent.com
```

---

## 🔑 How to Get API Keys

### 1. Razorpay Keys

**Test Keys (for development):**
1. Go to https://dashboard.razorpay.com
2. Sign up/Login
3. Settings → API Keys
4. Click "Generate Test Key"
5. Copy `Key ID` and `Key Secret`

**Live Keys (for production):**
1. Complete KYC verification on Razorpay
2. Submit business documents
3. Once approved, generate Live Keys
4. Use these in production

**Important:** Keep test keys for testing, live keys for production!

### 2. Gmail App Password (for Email)

**Steps:**
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification" (required)
3. Search for "App Passwords"
4. Select: Mail → Other (Custom) → "Astrology Website"
5. Click Generate
6. Copy the 16-character password
7. Use in `SMTP_PASSWORD`

---

## 🗄️ MongoDB Configuration

### Development (Current):
```bash
MONGO_URL="mongodb://localhost:27017"
DB_NAME="astrology_db"
```

### Production on Emergent:

**Emergent provides managed MongoDB!**

When you deploy, Emergent automatically:
- Creates a MongoDB instance for you
- Provides the connection URL
- Sets it as an environment variable
- Handles backups and scaling

**You DON'T need to:**
- Set up your own MongoDB
- Manage database servers
- Handle backups manually

**Emergent will provide:**
```bash
MONGO_URL=mongodb://emergent-managed-db-url:27017
```

---

## 📋 Step-by-Step Deployment Checklist

### Before Deployment:

- [x] Get Razorpay test keys
- [x] Get Gmail app password
- [x] Test booking with test keys (preview environment)
- [x] Test email sending
- [x] Verify all pages work

### During Deployment:

1. **Click "Deploy" in Emergent**
2. **Emergent will ask for environment variables**
3. **Add all required variables:**
   - MONGO_URL (Emergent provides)
   - DB_NAME = `astrology_db`
   - RAZORPAY_KEY_ID (your key)
   - RAZORPAY_KEY_SECRET (your secret)
   - SMTP_EMAIL = `indirapandey2526@gmail.com`
   - SMTP_PASSWORD (your app password)
4. **Confirm deployment**

### After Deployment:

- [ ] Test booking with Razorpay test keys
- [ ] Verify email notifications work
- [ ] Test admin dashboard
- [ ] Test all forms and features
- [ ] Switch to Razorpay live keys
- [ ] Connect custom domain (optional)

---

## 🔒 Security Best Practices

### DO:
✅ Use different keys for test and production
✅ Keep `.env` files in `.gitignore`
✅ Use Gmail App Password (not regular password)
✅ Regenerate keys if exposed
✅ Use environment variables (never hardcode)
✅ Set appropriate CORS_ORIGINS in production

### DON'T:
❌ Commit `.env` files to Git
❌ Share API keys publicly
❌ Use test keys in production
❌ Use production keys in development
❌ Hardcode secrets in code
❌ Use CORS_ORIGINS="*" in production

---

## 📝 Environment Variables Reference

### Backend (.env):

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| MONGO_URL | ✅ Yes | MongoDB connection string | `mongodb://localhost:27017` |
| DB_NAME | ✅ Yes | Database name | `astrology_db` |
| CORS_ORIGINS | ✅ Yes | Allowed origins for API | `https://yourdomain.com` |
| RAZORPAY_KEY_ID | ⚠️ Optional | Payment gateway key | `rzp_test_xxxxx` |
| RAZORPAY_KEY_SECRET | ⚠️ Optional | Payment gateway secret | `xxxxxxxx` |
| SMTP_EMAIL | ⚠️ Optional | Email address for sending | `your@email.com` |
| SMTP_PASSWORD | ⚠️ Optional | Gmail app password | `16-char-password` |
| SMTP_SERVER | ⚠️ Optional | SMTP server | `smtp.gmail.com` |
| SMTP_PORT | ⚠️ Optional | SMTP port | `587` |

**Note:** 
- ✅ Required = App won't work without it
- ⚠️ Optional = App works, but feature disabled (payments/emails won't work)

### Frontend (.env):

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| REACT_APP_BACKEND_URL | ✅ Yes | Backend API URL | `https://your-app.emergentagent.com` |

---

## 🛠️ How to Update Environment Variables

### In Preview (Current):

**Backend:**
```bash
# Edit file
nano /app/backend/.env

# Make changes
# Save: Ctrl+X, Y, Enter

# Restart backend
sudo supervisorctl restart backend
```

**Frontend:**
```bash
# Edit file
nano /app/frontend/.env

# Make changes
# Save: Ctrl+X, Y, Enter

# Restart frontend
sudo supervisorctl restart frontend
```

### In Production (After Deployment):

1. **Go to Emergent Dashboard**
2. **Click your app**
3. **Settings → Environment Variables**
4. **Click "Edit"**
5. **Update values**
6. **Click "Save"**
7. **App automatically restarts**

---

## 🧪 Testing Configuration

### Test Your Setup:

**1. Check if variables are loaded:**
```bash
# Check backend
curl https://your-app.emergentagent.com/api/

# Response should show:
{
  "message": "Astrology Booking API",
  "status": "online",
  "razorpay_enabled": true  # ← Should be true if keys added
}
```

**2. Test booking (Free consultation):**
- Go to /booking
- Fill form with 5-10 mins (free)
- Submit
- Should work without Razorpay keys

**3. Test booking (Paid):**
- Select 10-20 mins or 20+ mins
- Payment popup should open
- Use test card: 4111 1111 1111 1111
- Should complete successfully

**4. Test email:**
- Make a booking
- Check email inbox
- Should receive confirmation

---

## 📞 Support

If environment variables are not working:

1. **Check logs:**
   ```bash
   # Backend logs
   tail -f /var/log/supervisor/backend.err.log
   
   # Look for missing variable errors
   ```

2. **Verify in code:**
   - Backend reads: `os.environ.get('VARIABLE_NAME')`
   - Frontend reads: `process.env.REACT_APP_VARIABLE_NAME`

3. **Contact Emergent Support:**
   - They can help set up MongoDB
   - Verify environment variables
   - Check deployment configuration

---

## 🎯 Quick Reference

**Current Files:**
- Backend env: `/app/backend/.env`
- Frontend env: `/app/frontend/.env`

**After Deployment:**
- Set in Emergent UI under Settings → Environment Variables
- MongoDB URL provided by Emergent
- No file editing needed

**Critical Keys Needed:**
1. ✅ Razorpay Key ID (for payments)
2. ✅ Razorpay Secret (for payments)
3. ✅ Gmail App Password (for emails)

**Website works without these, but:**
- No payment processing
- No automated emails
- Manual customer contact needed

---

**Last Updated:** December 2024
**File Location:** `/app/ENV_VARIABLES_GUIDE.md`
