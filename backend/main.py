from fastapi import FastAPI, APIRouter, HTTPException, Request, BackgroundTasks, Depends, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime, timezone, timedelta
from typing import Optional
import uuid
import razorpay
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import pytz
import bcrypt
import jwt

from models import (
    BookingCreate, Booking, ContactInquiry, Newsletter,
    BookingStatus, PaymentStatus, AstrologerAvailability,
    TestimonialCreate, Testimonial, UserCreate, UserLogin, User,
    PasswordResetRequest, PasswordReset
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection with optimized settings
mongo_url = os.environ.get('MONGO_URL')
mongo_client = AsyncIOMotorClient(
    mongo_url,
    maxPoolSize=10,  # Connection pool size
    minPoolSize=1,   # Keep at least 1 connection alive
    serverSelectionTimeoutMS=10000,  # Increased timeout
    connectTimeoutMS=10000,
    socketTimeoutMS=10000,
    retryWrites=True,
    retryReads=True
)
db = mongo_client[os.environ.get('DB_NAME', 'astrology_db')]

# Razorpay client - only initialize if keys are present
razorpay_client = None
RAZORPAY_ENABLED = False
razorpay_key_id = os.environ.get('RAZORPAY_KEY_ID')
razorpay_key_secret = os.environ.get('RAZORPAY_KEY_SECRET')
if razorpay_key_id and razorpay_key_secret:
    try:
        razorpay_client = razorpay.Client(
            auth=(razorpay_key_id, razorpay_key_secret)
        )
        RAZORPAY_ENABLED = True
    except Exception as e:
        logging.warning(f"Failed to initialize Razorpay client: {e}")
        RAZORPAY_ENABLED = False

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 24 * 7  # 7 days

# Security
security = HTTPBearer()

# Helper functions for authentication
def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(password: str, hashed: str) -> bool:
    """Verify a password against a hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))


def create_access_token(user_id: str, email: str) -> str:
    """Create a JWT access token"""
    payload = {
        'user_id': user_id,
        'email': email,
        'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict:
    """Decode and verify a JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get the current authenticated user"""
    token = credentials.credentials
    payload = decode_access_token(token)
    user = await db.users.find_one({"id": payload['user_id']})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Startup event to initialize database with default data
@app.on_event("startup")
async def startup_event():
    """Initialize database with default data if empty"""
    import asyncio

    async def init_db():
        try:
            # Create indexes for better query performance
            logger.info("Creating database indexes...")

            # Bookings collection indexes
            await db.bookings.create_index("id", unique=True)
            await db.bookings.create_index("status")
            await db.bookings.create_index("payment_status")
            await db.bookings.create_index([("created_at", -1)])  # Descending for sorting
            await db.bookings.create_index([("astrologer", 1), ("preferred_date", 1)])

            # Availability collection indexes
            await db.astrologer_availability.create_index([("astrologer", 1), ("day_of_week", 1)])

            # Time slots collection indexes
            await db.time_slots.create_index([("astrologer", 1), ("date", 1), ("time", 1)])

            # Testimonials collection indexes
            await db.testimonials.create_index("id", unique=True)
            await db.testimonials.create_index("approved")
            await db.testimonials.create_index([("created_at", -1)])  # Descending for sorting
            await db.testimonials.create_index("email")

            # Users collection indexes
            await db.users.create_index("id", unique=True)
            await db.users.create_index("email", unique=True)
            await db.users.create_index([("created_at", -1)])

            # Password resets collection indexes
            await db.password_resets.create_index("token", unique=True)
            await db.password_resets.create_index("email")
            await db.password_resets.create_index([("expires_at", 1)])

            logger.info("✅ Database indexes created successfully")

            # Check if astrologer_availability collection has data
            count = await db.astrologer_availability.count_documents({})

            if count == 0:
                logger.info("Initializing database with default data...")

                # Create default availability for Acharyaa Indira Pandey
                astrologer_name = "Acharyaa Indira Pandey"
                availability_data = []

                # New time slots:
                # 9:30 AM - 10:30 AM
                # 1:00 PM - 3:00 PM
                # 6:30 PM - 10:00 PM
                time_ranges = [
                    {"start_time": "09:30", "end_time": "10:30"},
                    {"start_time": "13:00", "end_time": "15:00"},
                    {"start_time": "18:30", "end_time": "22:00"}
                ]

                # Add availability for all 7 days (Monday to Sunday)
                # Using 30-minute slots (standard consultation duration)
                for day in range(7):
                    for time_range in time_ranges:
                        availability_data.append({
                            "astrologer": astrologer_name,
                            "day_of_week": day,
                            "start_time": time_range["start_time"],
                            "end_time": time_range["end_time"],
                            "slot_duration_minutes": 30,  # 30-min slots as standard
                            "is_active": True
                        })

                result = await db.astrologer_availability.insert_many(
                    availability_data
                )
                logger.info(
                    f"✅ Initialized {len(availability_data)} "
                    f"availability records for {astrologer_name}"
                )
            else:
                logger.info(
                    f"Database already initialized "
                    f"({count} availability records found)"
                )
        except Exception as e:
            logger.error(f"Error during database initialization: {str(e)}")

    # Run initialization in background to not block startup
    asyncio.create_task(init_db())

    # Schedule auto-cancel of expired bookings (runs every hour)
    async def periodic_auto_cancel():
        while True:
            try:
                await asyncio.sleep(3600)  # Wait 1 hour
                logger.info("Running periodic auto-cancel of expired bookings...")
                cancelled_count = await auto_cancel_expired_bookings()
                if cancelled_count > 0:
                    logger.info(f"Periodic auto-cancel: {cancelled_count} booking(s) cancelled")
            except Exception as e:
                logger.error(f"Error in periodic auto-cancel: {str(e)}")

    asyncio.create_task(periodic_auto_cancel())

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Helper function to send emails using SendGrid
async def send_email(to_email: str, subject: str, body: str):
    """
    Send email using SendGrid API (works on Railway, unlike SMTP)

    Required environment variables:
    - SENDGRID_API_KEY: Your SendGrid API key
    - SENDGRID_FROM_EMAIL: Sender email (e.g., noreply@yourdomain.com)
    - SENDGRID_FROM_NAME: Sender name (e.g., Acharyaa Indira Pandey Astrology)

    Falls back to SMTP if SendGrid is not configured (for local development)
    """
    # Try SendGrid first (recommended for production/Railway)
    sendgrid_api_key = os.environ.get('SENDGRID_API_KEY', '')

    if sendgrid_api_key:
        try:
            import requests
            from_email = os.environ.get('SENDGRID_FROM_EMAIL', 'noreply@astrology.com')
            from_name = os.environ.get('SENDGRID_FROM_NAME', 'Acharyaa Indira Pandey Astrology')

            # Use requests directly to avoid SSL issues on macOS
            url = "https://api.sendgrid.com/v3/mail/send"
            headers = {
                "Authorization": f"Bearer {sendgrid_api_key}",
                "Content-Type": "application/json"
            }
            data = {
                "personalizations": [{
                    "to": [{"email": to_email}],
                    "subject": subject
                }],
                "from": {
                    "email": from_email,
                    "name": from_name
                },
                "content": [{
                    "type": "text/html",
                    "value": body
                }]
            }

            # Send request (verify=False for local dev SSL issues)
            response = requests.post(url, headers=headers, json=data, verify=False, timeout=10)

            if response.status_code in [200, 202]:
                logger.info(f"✅ Email sent to {to_email} via SendGrid (Status: {response.status_code})")
                return True
            else:
                logger.error(f"❌ SendGrid error: {response.status_code} - {response.text}")
                logger.warning("⚠️ Falling back to SMTP...")

        except Exception as e:
            logger.error(f"❌ SendGrid error: {str(e)}")
            logger.warning("⚠️ Falling back to SMTP...")
            # Don't return False yet, let it fall through to SMTP fallback

    # Fallback to SMTP (for local development only - won't work on Railway)
    else:
        try:
            smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
            smtp_port = int(os.environ.get('SMTP_PORT', 587))
            sender_email = os.environ.get('SMTP_EMAIL', '')
            sender_password = os.environ.get('SMTP_PASSWORD', '')

            if not sender_email or not sender_password:
                logger.warning("⚠️ Email credentials not configured - skipping email")
                return False

            msg = MIMEMultipart()
            msg['From'] = sender_email
            msg['To'] = to_email
            msg['Subject'] = subject

            msg.attach(MIMEText(body, 'html'))

            # Add timeout to prevent hanging on Railway (SMTP ports may be blocked)
            server = smtplib.SMTP(smtp_server, smtp_port, timeout=5)
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
            server.quit()

            logger.info(f"✅ Email sent to {to_email} via SMTP")
            return True

        except smtplib.SMTPException as e:
            logger.error(f"❌ SMTP error: {str(e)}")
            return False
        except TimeoutError as e:
            logger.error(f"❌ SMTP timeout (Railway blocks SMTP ports): {str(e)}")
            return False
        except Exception as e:
            logger.error(f"❌ Failed to send email: {str(e)}")
            return False


# Service ID to Name mapping
SERVICE_NAMES = {
    "1": "Birth Chart (Kundli) Analysis",
    "2": "Career & Business Guidance",
    "3": "Marriage & Relationship Compatibility",
    "4": "Health & Life Path Insights",
    "5": "Vastu Consultation",
    "6": "Palmistry",
    "7": "Gemstone Remedies & Sales",
    "8": "Auspicious Childbirth Timing (Muhurat)",
    "9": "Naming Ceremony",
}

def get_service_name(service_id_or_name: str) -> str:
    """Convert service ID to human-readable name, or return as-is if already a name"""
    if not service_id_or_name:
        return "General Consultation"
    # If it's a service ID, return the mapped name
    if service_id_or_name in SERVICE_NAMES:
        return SERVICE_NAMES[service_id_or_name]
    # Otherwise, return as-is (might already be a service name)
    return service_id_or_name

# Service pricing mapping (service ID to price details)
SERVICE_PRICING = {
    "1": {"actualPrice": 4100, "discountPercent": 25},  # Birth Chart
    "2": {"actualPrice": 3500, "discountPercent": 25},  # Career
    "3": {"actualPrice": 5100, "discountPercent": 25},  # Marriage
    "4": {"actualPrice": 3500, "discountPercent": 25},  # Health
    "5": {"actualPrice": 3000, "discountPercent": 25},  # Vastu
    "6": {"actualPrice": 2000, "discountPercent": 25},  # Palmistry
    "7": {"actualPrice": 3500, "discountPercent": 25},  # Gemstone
    "8": {"actualPrice": 3500, "discountPercent": 25},  # Childbirth
    "9": {"actualPrice": 1100, "discountPercent": 25},  # Naming Ceremony
}

# Service duration mapping (service ID to duration in minutes)
SERVICE_DURATION = {
    "1": 30,  # Birth Chart (Kundli) Analysis - 30 mins
    "2": 30,  # Career & Business Guidance - 30 mins
    "3": 45,  # Marriage & Relationship Compatibility - 45 mins
    "4": 30,  # Health & Life Path Insights - 30 mins
    "5": 30,  # Vastu Consultation - 20-30 mins (using 30 as max)
    "6": 15,  # Palmistry - 15 mins
    "7": 20,  # Gemstone Remedies & Sales - 20 mins
    "8": 30,  # Auspicious Childbirth Timing - 30 mins
    "9": 10,  # Naming Ceremony - 10 mins
}

# Calculate consultation price based on duration and service
def calculate_price(duration: str, service: str = None) -> int:
    # If duration is 5-10 mins, it's always free
    if duration == "5-10":
        return 0

    # For 10+ mins, calculate based on service
    if duration == "10+" and service:
        # Try to extract service ID from service string
        # Service could be either ID or name
        service_id = service

        # If service is in our pricing map, use it
        if service_id in SERVICE_PRICING:
            pricing = SERVICE_PRICING[service_id]
            # Calculate discounted price and convert to paise
            discounted_price = round(pricing["actualPrice"] * (1 - pricing["discountPercent"] / 100))
            return discounted_price * 100  # Convert to paise

    # Default fallback
    return 0


# Root endpoint
@api_router.get("/")
async def root():
    return {
        "message": "Astrology Booking API",
        "status": "online",
        "razorpay_enabled": RAZORPAY_ENABLED
    }


# Authentication endpoints
@api_router.post("/auth/signup")
async def signup(user_data: UserCreate):
    """Register a new user"""
    try:
        # Check if user already exists
        existing_user = await db.users.find_one({"email": user_data.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        # Hash password
        hashed_password = hash_password(user_data.password)

        # Create user
        user_id = str(uuid.uuid4())
        user = {
            "id": user_id,
            "name": user_data.name,
            "email": user_data.email,
            "phone": user_data.phone,
            "password": hashed_password,
            "created_at": datetime.now(timezone.utc),
            "first_booking_completed": False
        }

        await db.users.insert_one(user)

        # Create access token
        token = create_access_token(user_id, user_data.email)

        # Return user data without password
        user_response = User(
            id=user_id,
            name=user_data.name,
            email=user_data.email,
            phone=user_data.phone,
            created_at=user["created_at"]
        )

        return {
            "token": token,
            "user": user_response.model_dump()
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Signup error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create account")


@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    """Login user"""
    try:
        # Find user
        user = await db.users.find_one({"email": credentials.email})
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        # Verify password
        if not verify_password(credentials.password, user["password"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        # Create access token
        token = create_access_token(user["id"], user["email"])

        # Return user data without password
        user_response = User(
            id=user["id"],
            name=user["name"],
            email=user["email"],
            phone=user.get("phone"),
            created_at=user["created_at"]
        )

        return {
            "token": token,
            "user": user_response.model_dump()
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Login failed")


@api_router.get("/auth/verify")
async def verify_token(current_user: dict = Depends(get_current_user)):
    """Verify JWT token and return user data"""
    user_response = User(
        id=current_user["id"],
        name=current_user["name"],
        email=current_user["email"],
        phone=current_user.get("phone"),
        created_at=current_user["created_at"],
        first_booking_completed=current_user.get("first_booking_completed", False)
    )
    return {"user": user_response.model_dump()}


@api_router.get("/auth/first-booking-status")
async def get_first_booking_status(current_user: dict = Depends(get_current_user)):
    """Check if user can access first-time booking discount (5-10 mins option)"""
    first_booking_completed = current_user.get("first_booking_completed", False)
    return {
        "can_book_first_time": not first_booking_completed,
        "first_booking_completed": first_booking_completed
    }


@api_router.post("/auth/forgot-password")
async def forgot_password(request: PasswordResetRequest, background_tasks: BackgroundTasks):
    """Send password reset email"""
    try:
        # Find user by email
        user = await db.users.find_one({"email": request.email})
        if not user:
            # Don't reveal if email exists or not for security
            return {"message": "If the email exists, a password reset link has been sent"}

        # Generate reset token (valid for 1 hour)
        reset_token = str(uuid.uuid4())
        reset_expiry = datetime.now(timezone.utc) + timedelta(hours=1)

        # Store reset token in database
        await db.password_resets.insert_one({
            "user_id": user["id"],
            "email": user["email"],
            "token": reset_token,
            "expires_at": reset_expiry,
            "used": False,
            "created_at": datetime.now(timezone.utc)
        })

        # Send reset email
        frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:3000')
        logger.info(f"🔗 Using FRONTEND_URL: {frontend_url}")
        reset_link = f"{frontend_url}/reset-password/{reset_token}"
        logger.info(f"🔗 Generated reset link: {reset_link}")

        email_body = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #7c3aed; font-size: 24px;">Password Reset Request</h2>
                            <p style="margin: 0 0 15px 0; color: #333333; font-size: 16px; line-height: 1.6;">Hello {user['name']},</p>
                            <p style="margin: 0 0 15px 0; color: #333333; font-size: 16px; line-height: 1.6;">We received a request to reset your password for your Acharyaa Indira Pandey Astrology account.</p>
                            <p style="margin: 0 0 30px 0; color: #333333; font-size: 16px; line-height: 1.6;">Click the link below to reset your password:</p>
                        </td>
                    </tr>

                    <!-- Button -->
                    <tr>
                        <td align="center" style="padding: 0 40px 30px 40px;">
                            <a href="{reset_link}" style="display: inline-block; padding: 16px 48px; background-color: #7c3aed; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px;">Reset Password</a>
                        </td>
                    </tr>

                    <!-- Alternative Link -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">Or copy and paste this link:</p>
                            <p style="margin: 0; padding: 15px; background-color: #f3f4f6; word-break: break-all; font-size: 13px;">
                                <a href="{reset_link}" style="color: #7c3aed;">{reset_link}</a>
                            </p>
                        </td>
                    </tr>

                    <!-- Warning -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px;">
                            <p style="margin: 0 0 15px 0; color: #333333; font-size: 14px;"><strong>⏰ This link will expire in 1 hour.</strong></p>
                            <p style="margin: 0; color: #666666; font-size: 14px;">If you didn't request this password reset, please ignore this email.</p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; color: #6b7280; font-size: 14px;">
                                Best regards,<br>
                                <strong>Acharyaa Indira Pandey Astrology Team</strong>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>"""

        background_tasks.add_task(
            send_email,
            user["email"],
            "Password Reset Request - Acharyaa Indira Pandey Astrology",
            email_body
        )

        logger.info(f"Password reset email sent to {user['email']}")
        return {"message": "If the email exists, a password reset link has been sent"}

    except Exception as e:
        logger.error(f"Forgot password error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process password reset request")


@api_router.post("/auth/reset-password")
async def reset_password(reset_data: PasswordReset):
    """Reset password using token"""
    try:
        # Find reset token
        reset_record = await db.password_resets.find_one({
            "token": reset_data.token,
            "used": False
        })

        if not reset_record:
            raise HTTPException(status_code=400, detail="Invalid or expired reset token")

        # Check if token has expired
        expires_at = reset_record["expires_at"]
        if not expires_at.tzinfo:
            expires_at = expires_at.replace(tzinfo=timezone.utc)

        if expires_at < datetime.now(timezone.utc):
            raise HTTPException(status_code=400, detail="Reset token has expired")

        # Validate new password
        if len(reset_data.new_password) < 6:
            raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

        # Hash new password
        hashed_password = hash_password(reset_data.new_password)

        # Update user password
        await db.users.update_one(
            {"id": reset_record["user_id"]},
            {"$set": {"password": hashed_password}}
        )

        # Mark token as used
        await db.password_resets.update_one(
            {"token": reset_data.token},
            {"$set": {"used": True, "used_at": datetime.now(timezone.utc)}}
        )

        logger.info(f"Password reset successful for user {reset_record['user_id']}")
        return {"message": "Password reset successful"}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Reset password error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to reset password")


# Auto-cancel expired bookings function
async def auto_cancel_expired_bookings():
    """
    Auto-cancel bookings that:
    1. Have a preferred_date in the past
    2. Status is still PENDING
    3. Payment status is PENDING

    This prevents users from paying for expired bookings.
    """
    try:
        now = datetime.now(timezone.utc)

        # Find all pending bookings with past dates and pending payment
        expired_bookings = await db.bookings.find({
            "status": BookingStatus.PENDING,
            "payment_status": PaymentStatus.PENDING,
            "preferred_date": {"$exists": True, "$ne": None}
        }).to_list(length=None)

        cancelled_count = 0

        for booking in expired_bookings:
            try:
                # Parse the booking date
                booking_date_str = booking.get('preferred_date')
                booking_time_str = booking.get('preferred_time', '00:00')

                # Combine date and time
                booking_datetime_str = f"{booking_date_str}T{booking_time_str}"
                booking_datetime = datetime.fromisoformat(booking_datetime_str.replace('Z', '+00:00'))

                # Make timezone-aware if not already
                if booking_datetime.tzinfo is None:
                    booking_datetime = booking_datetime.replace(tzinfo=timezone.utc)

                # Check if booking is in the past
                if booking_datetime < now:
                    # Cancel the booking
                    await db.bookings.update_one(
                        {"id": booking['id']},
                        {
                            "$set": {
                                "status": BookingStatus.CANCELLED,
                                "updated_at": now,
                                "cancellation_reason": "Auto-cancelled: Booking date passed with pending payment"
                            }
                        }
                    )

                    cancelled_count += 1
                    logger.info(
                        f"Auto-cancelled expired booking {booking['id']} "
                        f"(Date: {booking_date_str}, Customer: {booking.get('email')})"
                    )

                    # Send cancellation email to customer
                    try:
                        customer_email_body = f"""
                        <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                                <h2 style="color: #ef4444;">Booking Auto-Cancelled</h2>
                                <p>Dear {booking.get('name')},</p>
                                <p>Your booking has been automatically cancelled because the scheduled date has passed and payment was not completed.</p>

                                <h3 style="color: #7c3aed;">Booking Details:</h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr><td style="padding: 8px 0;"><strong>Booking ID:</strong></td><td>{booking['id']}</td></tr>
                                    <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>{get_service_name(booking.get('service'))}</td></tr>
                                    <tr><td style="padding: 8px 0;"><strong>Scheduled Date:</strong></td><td>{booking_date_str}</td></tr>
                                    <tr><td style="padding: 8px 0;"><strong>Scheduled Time:</strong></td><td>{booking_time_str}</td></tr>
                                </table>

                                <p style="margin-top: 20px;">If you would like to book a new consultation, please visit our website.</p>
                                <p style="margin-top: 30px;">Best regards,<br><strong>Acharyaa Indira Pandey Team</strong></p>
                            </div>
                        </body>
                        </html>
                        """
                        await send_email(
                            booking.get('email'),
                            "Booking Auto-Cancelled - Payment Not Completed",
                            customer_email_body
                        )
                    except Exception as email_error:
                        logger.error(f"Failed to send cancellation email: {str(email_error)}")

            except Exception as booking_error:
                logger.error(f"Error processing booking {booking.get('id')}: {str(booking_error)}")
                continue

        if cancelled_count > 0:
            logger.info(f"✅ Auto-cancelled {cancelled_count} expired booking(s)")

        return cancelled_count

    except Exception as e:
        logger.error(f"Error in auto_cancel_expired_bookings: {str(e)}")
        return 0


@api_router.post("/admin/cancel-expired-bookings")
async def trigger_cancel_expired_bookings():
    """
    Admin endpoint to manually trigger auto-cancellation of expired bookings.
    Can also be called by a cron job.
    """
    try:
        cancelled_count = await auto_cancel_expired_bookings()
        return {
            "success": True,
            "message": f"Auto-cancelled {cancelled_count} expired booking(s)",
            "cancelled_count": cancelled_count
        }
    except Exception as e:
        logger.error(f"Error triggering auto-cancel: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Booking endpoints
@api_router.post("/bookings")
async def create_booking(
    booking_data: BookingCreate,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user)
):
    try:
        # Check if this is user's first booking
        user_bookings_count = await db.bookings.count_documents({"email": current_user["email"]})
        is_first_booking = user_bookings_count == 0

        # Calculate price based on duration and service
        amount = calculate_price(booking_data.consultation_duration, booking_data.service)

        # Create Razorpay order if amount > 0 and Razorpay is enabled
        razorpay_order_id = None
        if amount > 0 and RAZORPAY_ENABLED and razorpay_client is not None:
            order_data = {
                "amount": amount,
                "currency": "INR",
                "payment_capture": 1
            }
            razorpay_order = razorpay_client.order.create(data=order_data)
            razorpay_order_id = razorpay_order['id']

        # Create booking
        booking_dict = booking_data.model_dump()

        # For free bookings (5-10 mins), payment is completed and booking is confirmed
        # For paid bookings, payment is pending and booking is pending
        if amount > 0:
            payment_status = PaymentStatus.PENDING
            booking_status = BookingStatus.PENDING
            logger.info(f"Creating PAID booking: amount=₹{amount/100}, status=PENDING, payment=PENDING")
        else:
            payment_status = PaymentStatus.COMPLETED
            booking_status = BookingStatus.CONFIRMED  # Free bookings are auto-confirmed
            logger.info(f"Creating FREE booking: amount=₹0, status=CONFIRMED, payment=COMPLETED")

        booking = Booking(
            **booking_dict,
            amount=amount,
            razorpay_order_id=razorpay_order_id,
            status=booking_status,
            payment_status=payment_status
        )

        # Save to database
        booking_doc = booking.model_dump()
        booking_doc['created_at'] = booking_doc['created_at'].isoformat()
        booking_doc['updated_at'] = booking_doc['updated_at'].isoformat()

        await db.bookings.insert_one(booking_doc)

        # Reserve the time slot if date and time are provided
        if booking_data.preferred_date and booking_data.preferred_time:
            # Check if slot is already booked
            existing_booking = await db.bookings.find_one({
                "astrologer": booking_data.astrologer,
                "preferred_date": booking_data.preferred_date,
                "preferred_time": booking_data.preferred_time,
                "status": {"$in": [BookingStatus.PENDING.value, BookingStatus.CONFIRMED.value]},
                "id": {"$ne": booking.id}
            })

            if not existing_booking:
                # Reserve the slot
                slot_doc = {
                    "id": str(uuid.uuid4()),
                    "astrologer": booking_data.astrologer,
                    "date": booking_data.preferred_date,
                    "start_time": booking_data.preferred_time,
                    "end_time": booking_data.preferred_time,  # Will be calculated based on duration
                    "is_available": False,
                    "booking_id": booking.id,
                    "created_at": datetime.now(timezone.utc).isoformat(),
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }
                await db.time_slots.insert_one(slot_doc)
                logger.info(f"Reserved time slot: {booking_data.preferred_date} at {booking_data.preferred_time} for booking {booking.id}")

        # Mark first booking as completed ONLY if user used the free 5-10 mins option
        if booking_data.consultation_duration == "5-10":
            await db.users.update_one(
                {"email": current_user["email"]},
                {"$set": {"first_booking_completed": True}}
            )
            logger.info(f"Marked first free booking (5-10 mins) completed for user: {current_user['email']}")

        # Send confirmation email in background (non-blocking)
        amount_display = (
            '₹' + str(amount/100) if amount > 0
            else 'Free (First Time)'
        )
        consultation_type = booking.consultation_type.value.title()
        duration_display = f"{booking.consultation_duration.value} minutes"
        service_name = get_service_name(booking.service)

        email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #7c3aed;">Booking Confirmation</h2>
                <p>Dear {booking.name},</p>
                <p>Thank you for booking a consultation with us!</p>
                <h3 style="color: #7c3aed;">Booking Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Booking ID:</strong>
                    </td><td>{booking.id}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Astrologer:</strong>
                    </td><td>{booking.astrologer}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong>
                    </td><td>{service_name}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Duration:</strong>
                    </td><td>{duration_display}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Amount:</strong>
                    </td><td>{amount_display}</td></tr>
                    <tr><td style="padding: 8px 0;">
                    <strong>Consultation Type:</strong>
                    </td><td>{consultation_type}</td></tr>
                </table>
                <p style="margin-top: 20px;">
                We will review your request and contact you within 24 hours.
                </p>
                <p style="margin-top: 30px;">Best regards,<br>
                <strong>Acharyaa Indira Pandey Team</strong></p>
            </div>
        </body>
        </html>
        """
        # Different email subject and content based on payment status
        if payment_status == PaymentStatus.PENDING:
            email_subject = "Booking Request Received - Please Complete Payment"
            payment_notice = f"""
                <div style="margin: 20px 0; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                    <strong>⚠️ Payment Pending:</strong> Your booking request has been received.
                    Please complete the payment of <strong>₹{amount/100}</strong> to confirm your booking.
                </div>
            """
        else:
            email_subject = "Booking Confirmation - Free Consultation"
            payment_notice = f"""
                <div style="margin: 20px 0; padding: 15px; background-color: #d1fae5; border-left: 4px solid #10b981;">
                    <strong>✅ Confirmed:</strong> Your first-time free consultation has been confirmed!
                </div>
            """

        # Update email body to include payment notice
        email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #7c3aed;">Booking Request Received</h2>
                <p>Dear {booking.name},</p>
                <p>Thank you for your interest in booking a consultation with us!</p>
                {payment_notice}
                <h3 style="color: #7c3aed;">Booking Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Booking ID:</strong>
                    </td><td>{booking.id}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Astrologer:</strong>
                    </td><td>{booking.astrologer}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong>
                    </td><td>{service_name}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Duration:</strong>
                    </td><td>{duration_display}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Preferred Date:</strong>
                    </td><td>{booking.preferred_date}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Preferred Time:</strong>
                    </td><td>{booking.preferred_time}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Amount:</strong>
                    </td><td>{amount_display}</td></tr>
                    <tr><td style="padding: 8px 0;">
                    <strong>Consultation Type:</strong>
                    </td><td>{consultation_type}</td></tr>
                </table>
                <p style="margin-top: 20px;">
                We will review your request and contact you within 24 hours to confirm your preferred time slot.
                </p>
                <p style="margin-top: 30px;">Best regards,<br>
                <strong>Acharyaa Indira Pandey Team</strong></p>
            </div>
        </body>
        </html>
        """

        # Send email to customer immediately (not background task)
        try:
            customer_email_sent = await send_email(booking.email, email_subject, email_body)
            if customer_email_sent:
                logger.info(f"📧 Customer email sent to {booking.email}")
            else:
                logger.warning(f"⚠️ Failed to send customer email to {booking.email}")
        except Exception as e:
            logger.error(f"❌ Error sending customer email: {str(e)}")

        # Send notification email to admin/astrologer
        admin_email = os.environ.get('SENDGRID_FROM_EMAIL', 'indirapandey2526@gmail.com')

        # Different admin notification based on payment status
        if payment_status == PaymentStatus.PENDING:
            admin_subject = f"⚠️ New Booking - Payment Pending - {booking.name}"
            admin_payment_notice = f"""
                <div style="margin: 20px 0; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                    <strong>⚠️ Payment Status: PENDING</strong><br>
                    Amount: ₹{amount/100}<br>
                    Customer needs to complete payment to confirm this booking.
                </div>
            """
            admin_action = "Wait for payment confirmation before scheduling the appointment."
        else:
            admin_subject = f"✅ New Booking - Confirmed - {booking.name}"
            admin_payment_notice = f"""
                <div style="margin: 20px 0; padding: 15px; background-color: #d1fae5; border-left: 4px solid #10b981;">
                    <strong>✅ Payment Status: CONFIRMED</strong><br>
                    This is a free first-time consultation.
                </div>
            """
            admin_action = "Please contact the customer within 24 hours to schedule the appointment."

        admin_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #7c3aed;">New Booking Request Received</h2>
                <p>You have received a new booking request:</p>
                {admin_payment_notice}
                <h3 style="color: #7c3aed;">Customer Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Name:</strong>
                    </td><td>{booking.name}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Email:</strong>
                    </td><td>{booking.email}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Phone:</strong>
                    </td><td>{booking.phone}</td></tr>
                </table>

                <h3 style="color: #7c3aed; margin-top: 20px;">Birth Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Date of Birth:</strong>
                    </td><td>{booking.date_of_birth or '<em style="color: #999;">To be collected during call</em>'}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Time of Birth:</strong>
                    </td><td>{booking.time_of_birth or '<em style="color: #999;">To be collected during call</em>'}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Place of Birth:</strong>
                    </td><td>{booking.place_of_birth or '<em style="color: #999;">To be collected during call</em>'}</td></tr>
                </table>

                <h3 style="color: #7c3aed; margin-top: 20px;">Consultation Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Chosen Astrologer:</strong>
                    </td><td>{booking.astrologer}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong>
                    </td><td>{booking.service}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Duration:</strong>
                    </td><td>{duration_display}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Preferred Date:</strong>
                    </td><td>{booking.preferred_date}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Preferred Time:</strong>
                    </td><td>{booking.preferred_time}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Consultation Type:</strong>
                    </td><td>{consultation_type}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Amount:</strong>
                    </td><td>{amount_display}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Booking ID:</strong>
                    </td><td>{booking.id}</td></tr>
                </table>
                {f'<p style="margin-top: 20px;"><strong>Message:</strong><br>{booking.message}</p>' if booking.message else ''}
                <p style="margin-top: 30px; padding: 15px; background-color: #f3f4f6; border-left: 4px solid #7c3aed;">
                    <strong>Action Required:</strong> {admin_action}
                </p>
            </div>
        </body>
        </html>
        """

        try:
            admin_email_sent = await send_email(admin_email, admin_subject, admin_body)
            if admin_email_sent:
                logger.info(f"📧 Admin notification sent to {admin_email}")
            else:
                logger.warning(f"⚠️ Failed to send admin notification to {admin_email}")
        except Exception as e:
            logger.error(f"❌ Error sending admin notification: {str(e)}")

        return booking
    except Exception as e:
        logger.error(f"Error creating booking: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/bookings")
async def get_bookings(
    status: str = None,
    page: int = 1,
    limit: int = 50,
    include_stats: bool = False
):
    """
    Get bookings with pagination and optional stats.

    Args:
        status: Filter by booking status (pending, confirmed, completed, cancelled)
        page: Page number (default: 1)
        limit: Items per page (default: 50, max: 100)
        include_stats: Include statistics in response (default: False)
    """
    try:
        # Validate and limit page size
        limit = min(limit, 100)
        skip = (page - 1) * limit

        # Build query
        query = {}
        if status:
            query["status"] = status

        # Optimized projection - only fields needed by frontend
        projection = {
            "_id": 0,
            "id": 1,
            "name": 1,
            "email": 1,
            "phone": 1,
            "astrologer": 1,
            "service": 1,
            "consultation_duration": 1,
            "consultation_type": 1,
            "preferred_date": 1,
            "preferred_time": 1,
            "status": 1,
            "payment_status": 1,
            "amount": 1,
            "created_at": 1,
            "updated_at": 1
        }

        # Execute query with pagination
        bookings_cursor = db.bookings.find(query, projection).sort("created_at", -1).skip(skip).limit(limit)
        bookings = await bookings_cursor.to_list(length=limit)

        # Prepare response
        response = {
            "bookings": bookings,
            "page": page,
            "limit": limit,
            "total": await db.bookings.count_documents(query)
        }

        # Add stats if requested (for admin dashboard)
        if include_stats:
            stats_pipeline = [
                {
                    "$group": {
                        "_id": "$status",
                        "count": {"$sum": 1}
                    }
                }
            ]
            stats_result = await db.bookings.aggregate(stats_pipeline).to_list(None)
            stats = {item["_id"]: item["count"] for item in stats_result}

            response["stats"] = {
                "total": await db.bookings.count_documents({}),
                "pending": stats.get("pending", 0),
                "confirmed": stats.get("confirmed", 0),
                "completed": stats.get("completed", 0),
                "cancelled": stats.get("cancelled", 0)
            }

        return response
    except Exception as e:
        logger.error(f"Error fetching bookings: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/bookings/{booking_id}")
async def get_booking(booking_id: str):
    try:
        booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")

        # Convert ISO strings back to datetime
        if isinstance(booking.get('created_at'), str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
        if isinstance(booking.get('updated_at'), str):
            booking['updated_at'] = datetime.fromisoformat(booking['updated_at'])

        return booking
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching booking: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/user/bookings")
async def get_user_bookings(current_user: dict = Depends(get_current_user)):
    """Get all bookings for the current user"""
    try:
        bookings = await db.bookings.find(
            {"email": current_user["email"]},
            {"_id": 0}
        ).sort("created_at", -1).to_list(length=100)

        # Convert datetime objects to ISO strings for JSON serialization
        for booking in bookings:
            if isinstance(booking.get('created_at'), datetime):
                booking['created_at'] = booking['created_at'].isoformat()
            if isinstance(booking.get('updated_at'), datetime):
                booking['updated_at'] = booking['updated_at'].isoformat()

        return {"bookings": bookings}
    except Exception as e:
        logger.error(f"Error fetching user bookings: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.put("/bookings/{booking_id}/cancel")
async def cancel_booking(
    booking_id: str,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user)
):
    """Cancel a booking"""
    try:
        # Find the booking
        booking = await db.bookings.find_one({"id": booking_id})
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")

        # Verify the booking belongs to the current user
        if booking["email"] != current_user["email"]:
            raise HTTPException(status_code=403, detail="Not authorized to cancel this booking")

        # Check if booking is already cancelled
        if booking["status"] == BookingStatus.CANCELLED:
            raise HTTPException(status_code=400, detail="Booking is already cancelled")

        # Process refund if payment was completed
        refund_status = None
        refund_id = None

        if booking.get("payment_status") == PaymentStatus.COMPLETED and booking.get("razorpay_payment_id"):
            if RAZORPAY_ENABLED and razorpay_client:
                try:
                    payment_id = booking["razorpay_payment_id"]
                    amount = booking.get("amount", 0)

                    # Create refund in Razorpay
                    # Razorpay refund API: https://razorpay.com/docs/api/refunds/
                    refund = razorpay_client.payment.refund(payment_id, {
                        "amount": amount,  # Full refund
                        "speed": "normal",  # normal (5-7 days) or optimum (instant if available)
                        "notes": {
                            "booking_id": booking_id,
                            "reason": "Booking cancelled by customer"
                        }
                    })

                    refund_id = refund.get("id")
                    refund_status = refund.get("status")  # "processed" or "pending"

                    # Update booking with refund information
                    await db.bookings.update_one(
                        {"id": booking_id},
                        {
                            "$set": {
                                "refund_id": refund_id,
                                "refund_status": refund_status,
                                "refund_amount": amount,
                                "refund_initiated_at": datetime.now(timezone.utc)
                            }
                        }
                    )

                    logger.info(
                        f"✅ Refund initiated for booking {booking_id}: "
                        f"₹{amount/100} (Refund ID: {refund_id}, Status: {refund_status})"
                    )

                except Exception as refund_error:
                    logger.error(f"❌ Refund failed for booking {booking_id}: {str(refund_error)}")
                    # Continue with cancellation even if refund fails
                    # Admin will need to process refund manually
                    refund_status = "failed"
            else:
                logger.warning(f"Razorpay not enabled - manual refund required for booking {booking_id}")
                refund_status = "manual_required"

        # Release the time slot if it was booked
        if booking.get("preferred_date") and booking.get("preferred_time"):
            # Remove the slot from time_slots collection if it exists
            await db.time_slots.delete_many({
                "astrologer": booking["astrologer"],
                "date": booking["preferred_date"],
                "start_time": booking["preferred_time"],
                "booking_id": booking_id
            })
            logger.info(f"Released time slot for {booking['astrologer']} on {booking['preferred_date']} at {booking['preferred_time']}")

        # Update booking status
        await db.bookings.update_one(
            {"id": booking_id},
            {
                "$set": {
                    "status": BookingStatus.CANCELLED,
                    "updated_at": datetime.now(timezone.utc),
                    "cancelled_by": current_user["email"],
                    "cancelled_at": datetime.now(timezone.utc)
                }
            }
        )

        # Generate refund notice HTML
        refund_notice_html = ""
        if booking.get('payment_status') == PaymentStatus.COMPLETED:
            if refund_status == "processed" or refund_status == "pending":
                refund_notice_html = f'''
                <div style="margin-top: 20px; padding: 15px; background-color: #d1fae5; border-left: 4px solid #10b981;">
                    <strong>✅ Refund Initiated:</strong><br>
                    A full refund of ₹{booking.get('amount', 0)/100} has been initiated to your original payment method.<br>
                    <strong>Refund ID:</strong> {refund_id}<br>
                    <strong>Status:</strong> {refund_status.title()}<br>
                    <em>The refund will be credited to your account within 5-7 business days.</em>
                </div>
                '''
            elif refund_status == "failed":
                refund_notice_html = '''
                <div style="margin-top: 20px; padding: 15px; background-color: #fee2e2; border-left: 4px solid #ef4444;">
                    <strong>⚠️ Refund Processing Issue:</strong><br>
                    We encountered an issue processing your refund automatically. Our team has been notified and will process your refund manually within 24 hours.
                </div>
                '''
            elif refund_status == "manual_required":
                refund_notice_html = '''
                <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                    <strong>💳 Refund Processing:</strong><br>
                    Your refund will be processed manually by our team within 24 hours.
                </div>
                '''
            else:
                refund_notice_html = '''
                <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                    <strong>Refund Information:</strong><br>
                    A refund will be processed within 5-7 business days.
                </div>
                '''

        # Send cancellation email to customer
        customer_email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #7c3aed;">Booking Cancelled</h2>
                <p>Dear {booking['name']},</p>
                <p>Your booking has been cancelled as requested.</p>

                <h3 style="color: #7c3aed;">Cancelled Booking Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Booking ID:</strong></td><td>{booking['id']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Astrologer:</strong></td><td>{booking['astrologer']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>{get_service_name(booking['service'])}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Preferred Date:</strong></td><td>{booking.get('preferred_date', 'N/A')}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Preferred Time:</strong></td><td>{booking.get('preferred_time', 'N/A')}</td></tr>
                </table>

                {refund_notice_html}

                <p style="margin-top: 20px;">If you have any questions, please contact us.</p>
                <p style="margin-top: 30px;">Best regards,<br><strong>Acharyaa Indira Pandey Team</strong></p>
            </div>
        </body>
        </html>
        """

        background_tasks.add_task(
            send_email,
            booking['email'],
            "Booking Cancelled",
            customer_email_body
        )

        # Send notification to admin
        admin_email = os.environ.get('SENDGRID_FROM_EMAIL', 'indirapandey2526@gmail.com')
        admin_email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #ef4444;">Booking Cancelled by Customer</h2>
                <p>A booking has been cancelled:</p>

                <h3 style="color: #7c3aed;">Customer Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Name:</strong></td><td>{booking['name']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>{booking['email']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>{booking['phone']}</td></tr>
                </table>

                <h3 style="color: #7c3aed; margin-top: 20px;">Booking Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Booking ID:</strong></td><td>{booking['id']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Astrologer:</strong></td><td>{booking['astrologer']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>{get_service_name(booking['service'])}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Amount:</strong></td><td>₹{booking.get('amount', 0)/100}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Payment Status:</strong></td><td>{booking.get('payment_status', 'N/A')}</td></tr>
                </table>

                {f'<p style="margin-top: 20px; padding: 15px; background-color: #fee2e2; border-left: 4px solid #ef4444;"><strong>Action Required:</strong> Process refund for ₹{booking.get("amount", 0)/100} if payment was completed.</p>' if booking.get('payment_status') == PaymentStatus.COMPLETED else ''}
            </div>
        </body>
        </html>
        """

        background_tasks.add_task(
            send_email,
            admin_email,
            f"Booking Cancelled - {booking['name']}",
            admin_email_body
        )

        logger.info(f"Booking {booking_id} cancelled by user {current_user['email']}")
        return {"message": "Booking cancelled successfully"}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error cancelling booking: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.put("/bookings/{booking_id}")
async def update_booking(
    booking_id: str,
    booking_data: BookingCreate,
    current_user: dict = Depends(get_current_user)
):
    """Update a booking (only if status is PENDING)"""
    try:
        # Find the booking
        booking = await db.bookings.find_one({"id": booking_id})
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")

        # Verify the booking belongs to the current user
        if booking["email"] != current_user["email"]:
            raise HTTPException(status_code=403, detail="Not authorized to update this booking")

        # Check if booking can be updated (only PENDING bookings)
        if booking["status"] != BookingStatus.PENDING:
            raise HTTPException(
                status_code=400,
                detail=f"Cannot update booking with status: {booking['status']}"
            )

        # Check if date/time is being changed
        old_date = booking.get("preferred_date")
        old_time = booking.get("preferred_time")
        new_date = booking_data.preferred_date
        new_time = booking_data.preferred_time

        # If date or time changed, release old slot and check new slot availability
        if (old_date != new_date or old_time != new_time):
            # Release old slot if it exists
            if old_date and old_time:
                await db.time_slots.delete_many({
                    "astrologer": booking["astrologer"],
                    "date": old_date,
                    "start_time": old_time,
                    "booking_id": booking_id
                })
                logger.info(f"Released old time slot: {old_date} at {old_time}")

            # Check if new slot is available
            if new_date and new_time:
                # Check if slot is already booked by another booking
                existing_booking = await db.bookings.find_one({
                    "astrologer": booking_data.astrologer,
                    "preferred_date": new_date,
                    "preferred_time": new_time,
                    "status": {"$in": [BookingStatus.PENDING.value, BookingStatus.CONFIRMED.value]},
                    "id": {"$ne": booking_id}  # Exclude current booking
                })

                if existing_booking:
                    raise HTTPException(
                        status_code=400,
                        detail="This time slot is no longer available. Please choose another slot."
                    )

                # Reserve the new slot
                slot_doc = {
                    "id": str(uuid.uuid4()),
                    "astrologer": booking_data.astrologer,
                    "date": new_date,
                    "start_time": new_time,
                    "end_time": new_time,  # Will be calculated based on duration
                    "is_available": False,
                    "booking_id": booking_id,
                    "created_at": datetime.now(timezone.utc).isoformat(),
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }
                await db.time_slots.insert_one(slot_doc)
                logger.info(f"Reserved new time slot: {new_date} at {new_time}")

        # Update booking
        update_data = booking_data.model_dump()
        update_data["updated_at"] = datetime.now(timezone.utc)

        await db.bookings.update_one(
            {"id": booking_id},
            {"$set": update_data}
        )

        logger.info(f"Booking {booking_id} updated by user {current_user['email']}")
        return {"message": "Booking updated successfully"}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating booking: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/bookings/{booking_id}/retry-payment")
async def retry_payment(
    booking_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Create a new Razorpay order for a pending payment"""
    try:
        logger.info(f"Retry payment requested for booking {booking_id} by user {current_user['email']}")

        # Find the booking
        booking = await db.bookings.find_one({"id": booking_id})
        if not booking:
            logger.error(f"Booking {booking_id} not found")
            raise HTTPException(status_code=404, detail="Booking not found")

        logger.info(f"Booking found: status={booking.get('status')}, payment_status={booking.get('payment_status')}, amount={booking.get('amount')}")

        # Verify the booking belongs to the current user
        if booking["email"] != current_user["email"]:
            logger.error(f"User {current_user['email']} not authorized for booking {booking_id}")
            raise HTTPException(status_code=403, detail="Not authorized to access this booking")

        # Check if payment is pending (compare with string value)
        payment_status = booking.get("payment_status", "").lower()
        if payment_status != PaymentStatus.PENDING.value and payment_status != "pending":
            raise HTTPException(
                status_code=400,
                detail=f"Payment is not pending. Current status: {booking.get('payment_status')}"
            )

        # Get the amount
        amount = booking.get("amount", 0)
        logger.info(f"Booking amount: {amount}")
        if amount <= 0:
            logger.error(f"No payment required for booking {booking_id}, amount={amount}")
            raise HTTPException(status_code=400, detail="No payment required for this booking")

        # Create new Razorpay order
        logger.info(f"RAZORPAY_ENABLED={RAZORPAY_ENABLED}, razorpay_client={razorpay_client is not None}")
        if not RAZORPAY_ENABLED or razorpay_client is None:
            logger.error("Razorpay is not enabled or client is None")
            raise HTTPException(status_code=503, detail="Payment service is not available")

        order_data = {
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1
        }
        razorpay_order = razorpay_client.order.create(data=order_data)
        razorpay_order_id = razorpay_order['id']

        # Update booking with new order ID
        await db.bookings.update_one(
            {"id": booking_id},
            {
                "$set": {
                    "razorpay_order_id": razorpay_order_id,
                    "updated_at": datetime.now(timezone.utc)
                }
            }
        )

        logger.info(f"New payment order created for booking {booking_id}")
        return {
            "razorpay_order_id": razorpay_order_id,
            "amount": amount,
            "currency": "INR",
            "razorpay_key_id": os.environ.get('RAZORPAY_KEY_ID')
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating payment order: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: str):
    """
    Update booking status with automatic payment_status synchronization.

    Rules:
    - If status is CONFIRMED, payment_status must be COMPLETED
    - If status is PENDING and payment_status is COMPLETED, reject the update
    - If status is CANCELLED or COMPLETED, keep payment_status as is
    """
    try:
        # Normalize status to lowercase
        status = status.lower()

        # Validate status
        valid_statuses = ['pending', 'confirmed', 'completed', 'cancelled']
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}")

        # Get current booking to check payment status
        booking = await db.bookings.find_one({"id": booking_id})
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")

        current_payment_status = booking.get('payment_status', '').lower()

        # Enforce consistency rules
        update_fields = {
            "status": status,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }

        # Rule 1: If setting status to CONFIRMED, payment must be COMPLETED
        if status == 'confirmed':
            if current_payment_status != 'completed':
                raise HTTPException(
                    status_code=400,
                    detail="Cannot set status to CONFIRMED when payment is not COMPLETED. Please complete payment first."
                )

        # Rule 2: If setting status to PENDING but payment is COMPLETED, this is inconsistent
        if status == 'pending' and current_payment_status == 'completed':
            raise HTTPException(
                status_code=400,
                detail="Cannot set status to PENDING when payment is already COMPLETED. This would create an inconsistent state."
            )

        # Update the booking
        result = await db.bookings.update_one(
            {"id": booking_id},
            {"$set": update_fields}
        )

        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Booking not found or no changes made")

        logger.info(f"Booking {booking_id} status updated to {status} (payment_status: {current_payment_status})")
        return {"message": "Status updated successfully", "status": status, "payment_status": current_payment_status}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating booking status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Payment verification
@api_router.post("/verify-payment")
async def verify_payment(request: Request):
    try:
        if not RAZORPAY_ENABLED or razorpay_client is None:
            raise HTTPException(status_code=400, detail="Razorpay not configured")

        data = await request.json()
        razorpay_payment_id = data.get('razorpay_payment_id')
        razorpay_order_id = data.get('razorpay_order_id')
        razorpay_signature = data.get('razorpay_signature')
        booking_id = data.get('booking_id')

        # Verify signature
        params_dict = {
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': razorpay_signature
        }

        razorpay_client.utility.verify_payment_signature(params_dict)
        
        # Update booking
        await db.bookings.update_one(
            {"id": booking_id},
            {
                "$set": {
                    "payment_status": PaymentStatus.COMPLETED.value,
                    "razorpay_payment_id": razorpay_payment_id,
                    "status": BookingStatus.CONFIRMED.value,
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        
        # Get booking details
        booking = await db.bookings.find_one({"id": booking_id})
        
        # Send payment confirmation email to customer
        duration_display_payment = f"{booking['consultation_duration']} minutes"
        customer_email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #10b981;">✅ Payment Confirmed!</h2>
                <p>Dear {booking['name']},</p>
                <p>Your payment has been received successfully! Your consultation is now confirmed.</p>
                <h3 style="color: #7c3aed;">Payment Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Payment ID:</strong></td><td>{razorpay_payment_id}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Amount Paid:</strong></td><td>₹{booking['amount']/100}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Booking Status:</strong></td><td style="color: #10b981;">Confirmed</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>{get_service_name(booking['service'])}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Duration:</strong></td><td>{duration_display_payment}</td></tr>
                </table>
                <p style="margin-top: 20px;">We will contact you shortly to schedule your consultation.</p>
                <p style="margin-top: 30px;">Best regards,<br><strong>Acharyaa Indira Pandey Team</strong></p>
            </div>
        </body>
        </html>
        """
        await send_email(booking['email'], "✅ Payment Confirmed - Consultation Booked", customer_email_body)

        # Send admin notification about payment success
        admin_email = os.environ.get('SENDGRID_FROM_EMAIL', 'indirapandey2526@gmail.com')
        admin_email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #10b981;">✅ Payment Received - Booking Confirmed</h2>
                <div style="margin: 20px 0; padding: 15px; background-color: #d1fae5; border-left: 4px solid #10b981;">
                    <strong>✅ Payment Status: COMPLETED</strong><br>
                    Amount: ₹{booking['amount']/100}<br>
                    Payment ID: {razorpay_payment_id}
                </div>
                <h3 style="color: #7c3aed;">Customer Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Name:</strong></td><td>{booking['name']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>{booking['email']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>{booking['phone']}</td></tr>
                </table>

                <h3 style="color: #7c3aed; margin-top: 20px;">Birth Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Date of Birth:</strong></td><td>{booking['date_of_birth'] or '<em style="color: #999;">To be collected during call</em>'}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Time of Birth:</strong></td><td>{booking['time_of_birth'] or '<em style="color: #999;">To be collected during call</em>'}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Place of Birth:</strong></td><td>{booking['place_of_birth'] or '<em style="color: #999;">To be collected during call</em>'}</td></tr>
                </table>

                <h3 style="color: #7c3aed; margin-top: 20px;">Consultation Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Chosen Astrologer:</strong></td><td>{booking['astrologer']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>{get_service_name(booking['service'])}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Duration:</strong></td><td>{duration_display_payment}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Preferred Date:</strong></td><td>{booking['preferred_date']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Preferred Time:</strong></td><td>{booking['preferred_time']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Booking ID:</strong></td><td>{booking['id']}</td></tr>
                </table>
                <p style="margin-top: 30px; padding: 15px; background-color: #d1fae5; border-left: 4px solid #10b981;">
                    <strong>✅ Action Required:</strong> Payment confirmed! Please contact the customer within 24 hours to schedule the appointment.
                </p>
            </div>
        </body>
        </html>
        """
        await send_email(admin_email, f"✅ Payment Confirmed - {booking['name']}", admin_email_body)

        logger.info(f"✅ Payment confirmed for booking {booking_id}, emails sent to customer and admin")

        return {"status": "success", "message": "Payment verified successfully"}
    except Exception as e:
        logger.error(f"Payment verification failed: {str(e)}")
        raise HTTPException(status_code=400, detail="Payment verification failed")

# Payment failure notification
@api_router.post("/payment-failed")
async def payment_failed(request: Request):
    try:
        data = await request.json()
        booking_id = data.get('booking_id')
        error_description = data.get('error_description', 'Payment was not completed')

        # Get booking details
        booking = await db.bookings.find_one({"id": booking_id})
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")

        # Update booking status to failed
        await db.bookings.update_one(
            {"id": booking_id},
            {
                "$set": {
                    "payment_status": PaymentStatus.FAILED.value,
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }
            }
        )

        # Send payment failure email to customer
        duration_display_failed = f"{booking['consultation_duration']} minutes"
        customer_email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #ef4444;">❌ Payment Failed</h2>
                <p>Dear {booking['name']},</p>
                <p>Unfortunately, your payment could not be processed.</p>
                <div style="margin: 20px 0; padding: 15px; background-color: #fee2e2; border-left: 4px solid #ef4444;">
                    <strong>Reason:</strong> {error_description}
                </div>
                <h3 style="color: #7c3aed;">Booking Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Booking ID:</strong></td><td>{booking['id']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>{get_service_name(booking['service'])}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Amount:</strong></td><td>₹{booking['amount']/100}</td></tr>
                </table>
                <div style="margin-top: 30px; padding: 15px; background-color: #dbeafe; border-left: 4px solid #3b82f6;">
                    <strong>What's Next?</strong><br>
                    • You can try booking again from our website<br>
                    • Or contact us directly at {os.environ.get('SENDGRID_FROM_EMAIL', 'indirapandey2526@gmail.com')}<br>
                    • We're here to help!
                </div>
                <p style="margin-top: 30px;">Best regards,<br><strong>Acharyaa Indira Pandey Team</strong></p>
            </div>
        </body>
        </html>
        """
        await send_email(booking['email'], "❌ Payment Failed - Booking Not Confirmed", customer_email_body)

        # Send admin notification about payment failure
        admin_email = os.environ.get('SENDGRID_FROM_EMAIL', 'indirapandey2526@gmail.com')
        admin_email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #ef4444;">❌ Payment Failed</h2>
                <div style="margin: 20px 0; padding: 15px; background-color: #fee2e2; border-left: 4px solid #ef4444;">
                    <strong>❌ Payment Status: FAILED</strong><br>
                    Amount: ₹{booking['amount']/100}<br>
                    Reason: {error_description}
                </div>
                <h3 style="color: #7c3aed;">Customer Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;"><strong>Name:</strong></td><td>{booking['name']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>{booking['email']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>{booking['phone']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>{get_service_name(booking['service'])}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Duration:</strong></td><td>{duration_display_failed}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Booking ID:</strong></td><td>{booking['id']}</td></tr>
                </table>
                <p style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                    <strong>⚠️ Note:</strong> Customer's payment failed. You may want to follow up if they contact you directly.
                </p>
            </div>
        </body>
        </html>
        """
        await send_email(admin_email, f"❌ Payment Failed - {booking['name']}", admin_email_body)

        logger.info(f"❌ Payment failed for booking {booking_id}, emails sent to customer and admin")

        return {"status": "failed", "message": "Payment failure recorded and notifications sent"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error handling payment failure: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Razorpay Webhook for Refund Status Updates
@api_router.post("/razorpay-webhook")
async def razorpay_webhook(request: Request):
    """
    Webhook endpoint to receive refund status updates from Razorpay.

    Razorpay sends webhooks for events like:
    - refund.processed: Refund successfully processed
    - refund.failed: Refund failed
    - refund.speed_changed: Refund speed changed

    Setup: Add this URL in Razorpay Dashboard > Settings > Webhooks
    URL: https://your-domain.com/api/razorpay-webhook
    """
    try:
        # Get webhook payload
        payload = await request.body()
        webhook_signature = request.headers.get('X-Razorpay-Signature', '')

        if not RAZORPAY_ENABLED or razorpay_client is None:
            logger.warning("Razorpay webhook received but Razorpay not configured")
            return {"status": "ignored"}

        # Verify webhook signature (important for security)
        webhook_secret = os.environ.get('RAZORPAY_WEBHOOK_SECRET', '')
        if webhook_secret:
            try:
                razorpay_client.utility.verify_webhook_signature(
                    payload.decode('utf-8'),
                    webhook_signature,
                    webhook_secret
                )
            except Exception as verify_error:
                logger.error(f"Webhook signature verification failed: {str(verify_error)}")
                raise HTTPException(status_code=400, detail="Invalid webhook signature")

        # Parse webhook data
        import json
        data = json.loads(payload)
        event = data.get('event')
        payload_data = data.get('payload', {})
        refund_entity = payload_data.get('refund', {}).get('entity', {})

        logger.info(f"Received Razorpay webhook: {event}")

        # Handle refund events
        if event in ['refund.processed', 'refund.failed', 'refund.speed_changed']:
            refund_id = refund_entity.get('id')
            refund_status = refund_entity.get('status')  # processed, failed, pending
            payment_id = refund_entity.get('payment_id')
            amount = refund_entity.get('amount')

            # Find booking by refund_id or payment_id
            booking = await db.bookings.find_one({
                "$or": [
                    {"refund_id": refund_id},
                    {"razorpay_payment_id": payment_id}
                ]
            })

            if booking:
                # Update refund status in database
                update_data = {
                    "refund_status": refund_status,
                    "refund_updated_at": datetime.now(timezone.utc)
                }

                if event == 'refund.processed':
                    update_data["refund_completed_at"] = datetime.now(timezone.utc)

                await db.bookings.update_one(
                    {"id": booking['id']},
                    {"$set": update_data}
                )

                logger.info(
                    f"✅ Updated refund status for booking {booking['id']}: "
                    f"{refund_status} (Refund ID: {refund_id})"
                )

                # Send email notification to customer if refund is processed
                if event == 'refund.processed':
                    refund_email_body = f"""
                    <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h2 style="color: #10b981;">✅ Refund Processed Successfully</h2>
                            <p>Dear {booking.get('name')},</p>
                            <p>Your refund has been successfully processed!</p>

                            <div style="margin: 20px 0; padding: 15px; background-color: #d1fae5; border-left: 4px solid #10b981;">
                                <strong>Refund Details:</strong><br>
                                <strong>Amount:</strong> ₹{amount/100}<br>
                                <strong>Refund ID:</strong> {refund_id}<br>
                                <strong>Booking ID:</strong> {booking['id']}<br>
                                <strong>Status:</strong> Processed
                            </div>

                            <p>The refund amount will be credited to your original payment method within 5-7 business days.</p>
                            <p style="margin-top: 30px;">Best regards,<br><strong>Acharyaa Indira Pandey Team</strong></p>
                        </div>
                    </body>
                    </html>
                    """
                    await send_email(
                        booking.get('email'),
                        "✅ Refund Processed Successfully",
                        refund_email_body
                    )

                elif event == 'refund.failed':
                    # Notify admin about failed refund
                    admin_email = os.environ.get('SENDGRID_FROM_EMAIL', 'indirapandey2526@gmail.com')
                    admin_email_body = f"""
                    <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h2 style="color: #ef4444;">❌ Refund Failed - Action Required</h2>
                            <p>A refund has failed and requires manual processing:</p>

                            <table style="width: 100%; border-collapse: collapse;">
                                <tr><td style="padding: 8px 0;"><strong>Booking ID:</strong></td><td>{booking['id']}</td></tr>
                                <tr><td style="padding: 8px 0;"><strong>Customer:</strong></td><td>{booking.get('name')}</td></tr>
                                <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>{booking.get('email')}</td></tr>
                                <tr><td style="padding: 8px 0;"><strong>Amount:</strong></td><td>₹{amount/100}</td></tr>
                                <tr><td style="padding: 8px 0;"><strong>Refund ID:</strong></td><td>{refund_id}</td></tr>
                                <tr><td style="padding: 8px 0;"><strong>Payment ID:</strong></td><td>{payment_id}</td></tr>
                            </table>

                            <p style="margin-top: 20px; padding: 15px; background-color: #fee2e2; border-left: 4px solid #ef4444;">
                                <strong>Action Required:</strong> Please process this refund manually through Razorpay dashboard or contact Razorpay support.
                            </p>
                        </div>
                    </body>
                    </html>
                    """
                    await send_email(admin_email, "❌ Refund Failed - Manual Action Required", admin_email_body)
            else:
                logger.warning(f"Booking not found for refund_id: {refund_id}, payment_id: {payment_id}")

        return {"status": "success"}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing Razorpay webhook: {str(e)}")
        # Return 200 to prevent Razorpay from retrying
        return {"status": "error", "message": str(e)}


# Get refund status for a booking
@api_router.get("/bookings/{booking_id}/refund-status")
async def get_refund_status(
    booking_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get the current refund status for a booking.
    Also syncs with Razorpay to get the latest status.
    """
    try:
        booking = await db.bookings.find_one({"id": booking_id})
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")

        # Verify the booking belongs to the current user
        if booking["email"] != current_user["email"]:
            raise HTTPException(status_code=403, detail="Not authorized")

        refund_info = {
            "booking_id": booking_id,
            "has_refund": booking.get("refund_id") is not None,
            "refund_id": booking.get("refund_id"),
            "refund_status": booking.get("refund_status"),
            "refund_amount": booking.get("refund_amount"),
            "refund_initiated_at": booking.get("refund_initiated_at"),
            "refund_completed_at": booking.get("refund_completed_at"),
            "refund_updated_at": booking.get("refund_updated_at")
        }

        # If refund exists and Razorpay is enabled, fetch latest status
        if refund_info["has_refund"] and RAZORPAY_ENABLED and razorpay_client:
            try:
                refund_id = booking.get("refund_id")
                payment_id = booking.get("razorpay_payment_id")

                # Fetch refund details from Razorpay
                refund = razorpay_client.payment.refund(payment_id, refund_id)

                latest_status = refund.get("status")

                # Update database if status changed
                if latest_status != booking.get("refund_status"):
                    await db.bookings.update_one(
                        {"id": booking_id},
                        {
                            "$set": {
                                "refund_status": latest_status,
                                "refund_updated_at": datetime.now(timezone.utc)
                            }
                        }
                    )
                    refund_info["refund_status"] = latest_status
                    logger.info(f"Updated refund status for booking {booking_id}: {latest_status}")

            except Exception as sync_error:
                logger.error(f"Error syncing refund status from Razorpay: {str(sync_error)}")
                # Return database status if sync fails

        return refund_info

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting refund status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Contact inquiry
@api_router.post("/contact")
async def create_contact_inquiry(inquiry: ContactInquiry):
    try:
        inquiry_doc = inquiry.model_dump()
        inquiry_doc['created_at'] = inquiry_doc['created_at'].isoformat()
        
        result = await db.contact_inquiries.insert_one(inquiry_doc)
        
        # Send confirmation to customer
        email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #7c3aed;">Thank You for Contacting Us</h2>
                <p>Dear {inquiry.name},</p>
                <p>We have received your message and will get back to you shortly.</p>
                <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #7c3aed; margin: 20px 0;">
                    <strong>Your Message:</strong><br>{inquiry.message}
                </div>
                <p style="margin-top: 30px;">Best regards,<br><strong>Acharyaa Indira Pandey Team</strong></p>
            </div>
        </body>
        </html>
        """
        await send_email(inquiry.email, "Contact Confirmation", email_body)
        
        return {"message": "Inquiry submitted successfully", "id": inquiry.id}
    except Exception as e:
        logger.error(f"Error creating contact inquiry: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Newsletter subscription
@api_router.post("/newsletter")
async def subscribe_newsletter(newsletter: Newsletter):
    try:
        # Check if already subscribed
        existing = await db.newsletters.find_one({"email": newsletter.email})
        if existing:
            return {"message": "Already subscribed"}
        
        newsletter_doc = newsletter.model_dump()
        newsletter_doc['subscribed_at'] = newsletter_doc['subscribed_at'].isoformat()
        
        result = await db.newsletters.insert_one(newsletter_doc)
        
        # Send welcome email
        email_body = """
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #7c3aed;">Welcome to Our Newsletter!</h2>
                <p>Thank you for subscribing to our astrology newsletter.</p>
                <p>You will receive:</p>
                <ul>
                    <li>Weekly horoscopes</li>
                    <li>Astrological insights</li>
                    <li>Special offers and updates</li>
                </ul>
                <p style="margin-top: 30px;">Best regards,<br><strong>Acharyaa Indira Pandey Team</strong></p>
            </div>
        </body>
        </html>
        """
        await send_email(newsletter.email, "Newsletter Subscription Confirmed", email_body)
        
        return {"message": "Subscribed successfully"}
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Gemstone Inquiry
@api_router.post("/gemstone-inquiry")
async def gemstone_inquiry(
    inquiry_data: dict,
    current_user: dict = Depends(get_current_user)
):
    """Handle gemstone price inquiry and send notification to Indira Pandey"""
    try:
        gemstone = inquiry_data.get('gemstone', {})
        customer = inquiry_data.get('customer', {})

        # Get admin email (Indira Pandey's email)
        admin_email = os.environ.get('SENDGRID_FROM_EMAIL', 'indirapandey2526@gmail.com')

        # Send notification email to Indira Pandey
        admin_email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #7c3aed;">💎 New Gemstone Price Inquiry</h2>
                <p>A customer has inquired about gemstone pricing.</p>

                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #7c3aed; margin-top: 0;">Gemstone Details:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0;"><strong>Gemstone:</strong></td><td>{gemstone.get('name', 'N/A')}</td></tr>
                        <tr><td style="padding: 8px 0;"><strong>Weight:</strong></td><td>{gemstone.get('weight', 'N/A')}</td></tr>
                        <tr><td style="padding: 8px 0;"><strong>Quality:</strong></td><td>{gemstone.get('quality', 'N/A')}</td></tr>
                    </table>
                </div>

                <div style="background-color: #ede9fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #7c3aed; margin-top: 0;">Customer Details:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0;"><strong>Name:</strong></td><td>{customer.get('name', 'N/A')}</td></tr>
                        <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>{customer.get('email', 'N/A')}</td></tr>
                        <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>{customer.get('phone', 'N/A')}</td></tr>
                    </table>
                </div>

                <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
                    <h3 style="color: #7c3aed; margin-top: 0;">Customer Message:</h3>
                    <p style="white-space: pre-wrap; color: #374151;">{customer.get('message', 'No message provided')}</p>
                </div>

                <div style="margin: 30px 0; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                    <strong>Action Required:</strong> Please contact the customer to provide pricing and availability information.
                </div>

                <p style="margin-top: 30px;">
                    Best regards,<br>
                    <strong>Astrology Website System</strong>
                </p>
            </div>
        </body>
        </html>
        """

        # Send email to admin
        await send_email(
            admin_email,
            f"💎 Gemstone Inquiry - {gemstone.get('name', 'Gemstone')} - {customer.get('name', 'Customer')}",
            admin_email_body
        )

        # Send confirmation email to customer
        customer_email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #7c3aed;">Thank You for Your Inquiry</h2>
                <p>Dear {customer.get('name', 'Customer')},</p>

                <p>Thank you for your interest in our <strong>{gemstone.get('name', 'gemstone')}</strong>.</p>

                <div style="background-color: #d1fae5; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                    <strong>✅ Your inquiry has been received!</strong><br>
                    Our team will contact you shortly with pricing and availability details.
                </div>

                <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Gemstone Details:</strong></p>
                    <ul style="margin: 10px 0;">
                        <li>Name: {gemstone.get('name', 'N/A')}</li>
                        <li>Weight: {gemstone.get('weight', 'N/A')}</li>
                        <li>Quality: {gemstone.get('quality', 'N/A')}</li>
                    </ul>
                </div>

                <p>If you have any questions in the meantime, feel free to contact us.</p>

                <p style="margin-top: 30px;">
                    Best regards,<br>
                    <strong>Acharyaa Indira Pandey Team</strong>
                </p>
            </div>
        </body>
        </html>
        """

        # Send confirmation to customer
        await send_email(
            customer.get('email', ''),
            f"Gemstone Inquiry Confirmation - {gemstone.get('name', 'Gemstone')}",
            customer_email_body
        )

        logger.info(f"Gemstone inquiry sent for {gemstone.get('name')} by {customer.get('email')}")

        return {
            "message": "Inquiry sent successfully. We'll contact you shortly.",
            "gemstone": gemstone.get('name')
        }

    except Exception as e:
        logger.error(f"Error processing gemstone inquiry: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process inquiry")

# Testimonials
@api_router.get("/testimonials")
async def get_testimonials(limit: int = 50, approved_only: bool = True):
    try:
        # Build query
        query = {"approved": True} if approved_only else {}

        # Optimized query with projection
        projection = {
            "_id": 0,
            "id": 1,
            "name": 1,
            "rating": 1,
            "text": 1,
            "service": 1,
            "location": 1,
            "created_at": 1,
            "approved": 1
        }

        # Fetch testimonials sorted by creation date (most recent first)
        testimonials = await db.testimonials.find(query, projection).sort("created_at", -1).limit(limit).to_list(limit)

        # Convert datetime to ISO string for JSON serialization
        for testimonial in testimonials:
            if isinstance(testimonial.get('created_at'), datetime):
                testimonial['created_at'] = testimonial['created_at'].isoformat()

        return testimonials
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/testimonials")
async def create_testimonial(testimonial_data: TestimonialCreate, background_tasks: BackgroundTasks):
    try:
        # Create testimonial object
        testimonial = Testimonial(
            **testimonial_data.model_dump(),
            approved=False  # Requires admin approval
        )

        # Save to database
        testimonial_doc = testimonial.model_dump()
        testimonial_doc['created_at'] = testimonial_doc['created_at'].isoformat()
        testimonial_doc['updated_at'] = testimonial_doc['updated_at'].isoformat()

        await db.testimonials.insert_one(testimonial_doc)

        # Send notification email to admin
        admin_email = os.environ.get('ADMIN_EMAIL', 'raushankumar.rk.rk@gmail.com')
        admin_email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #7c3aed;">New Testimonial Submitted</h2>
                <p>A new testimonial has been submitted and is awaiting approval.</p>

                <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Name:</strong> {testimonial.name}</p>
                    <p><strong>Email:</strong> {testimonial.email}</p>
                    <p><strong>Rating:</strong> {'⭐' * testimonial.rating}</p>
                    <p><strong>Service:</strong> {testimonial.service}</p>
                    {f'<p><strong>Location:</strong> {testimonial.location}</p>' if testimonial.location else ''}
                    <p><strong>Testimonial:</strong></p>
                    <p style="font-style: italic;">"{testimonial.text}"</p>
                </div>

                <p style="margin-top: 30px;">Please review and approve this testimonial in the admin panel.</p>
            </div>
        </body>
        </html>
        """

        # Send email in background
        background_tasks.add_task(send_email, admin_email, "New Testimonial Awaiting Approval", admin_email_body)

        # Send confirmation email to user
        user_email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #7c3aed;">Thank You for Your Testimonial!</h2>
                <p>Dear {testimonial.name},</p>
                <p>Thank you for taking the time to share your experience with us. Your feedback is invaluable and helps us serve our clients better.</p>

                <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Your Testimonial:</strong></p>
                    <p style="font-style: italic;">"{testimonial.text}"</p>
                    <p><strong>Rating:</strong> {'⭐' * testimonial.rating}</p>
                </div>

                <p>Your testimonial is currently under review and will be published on our website once approved.</p>

                <p style="margin-top: 30px;">Best regards,<br><strong>Acharyaa Indira Pandey Team</strong></p>
            </div>
        </body>
        </html>
        """

        background_tasks.add_task(send_email, testimonial.email, "Thank You for Your Testimonial", user_email_body)

        logger.info(f"New testimonial submitted by {testimonial.name} ({testimonial.email})")

        return {
            "message": "Testimonial submitted successfully. It will be published after review.",
            "id": testimonial.id
        }
    except Exception as e:
        logger.error(f"Error creating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.patch("/testimonials/{testimonial_id}/approve")
async def approve_testimonial(testimonial_id: str):
    """
    Approve a testimonial by ID (admin only)
    """
    try:
        result = await db.testimonials.update_one(
            {"id": testimonial_id},
            {"$set": {"approved": True, "updated_at": datetime.utcnow().isoformat()}}
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")

        logger.info(f"Testimonial {testimonial_id} approved")
        return {"message": "Testimonial approved successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error approving testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/testimonials/pending")
async def get_pending_testimonials():
    """
    Get all pending (unapproved) testimonials for admin review
    """
    try:
        testimonials = await db.testimonials.find(
            {"approved": False},
            {"_id": 0}
        ).sort("created_at", -1).to_list(100)

        # Convert datetime to ISO string
        for testimonial in testimonials:
            if isinstance(testimonial.get('created_at'), datetime):
                testimonial['created_at'] = testimonial['created_at'].isoformat()
            if isinstance(testimonial.get('updated_at'), datetime):
                testimonial['updated_at'] = testimonial['updated_at'].isoformat()

        return testimonials
    except Exception as e:
        logger.error(f"Error fetching pending testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str):
    """
    Delete a testimonial by ID (admin only)
    """
    try:
        result = await db.testimonials.delete_one({"id": testimonial_id})

        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")

        logger.info(f"Testimonial {testimonial_id} deleted")
        return {"message": "Testimonial deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# Blog posts
@api_router.get("/blog")
async def get_blog_posts(category: str = None):
    try:
        query = {"published": True}
        if category and category != "All":
            query["category"] = category
        
        # Optimized query - exclude content field for list view
        projection = {
            "_id": 0,
            "id": 1,
            "title": 1,
            "excerpt": 1,
            "image": 1,
            "author": 1,
            "date": 1,
            "category": 1,
            "read_time": 1,
            "published": 1
        }
        
        posts = await db.blog_posts.find(query, projection).sort("date", -1).to_list(50)
        return posts
    except Exception as e:
        logger.error(f"Error fetching blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/blog/{post_id}")
async def get_blog_post(post_id: str):
    try:
        post = await db.blog_posts.find_one({"id": post_id, "published": True}, {"_id": 0})
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        return post
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching blog post: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Gemstones
@api_router.get("/gemstones")
async def get_gemstones():
    try:
        # Optimized query with projection
        projection = {
            "_id": 0,
            "id": 1,
            "name": 1,
            "description": 1,
            "price": 1,
            "benefits": 1,
            "image": 1,
            "in_stock": 1,
            "weight": 1,
            "quality": 1
        }
        gemstones = await db.gemstones.find({"in_stock": True}, projection).sort("price", 1).to_list(50)
        return gemstones
    except Exception as e:
        logger.error(f"Error fetching gemstones: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Time Slot Management
@api_router.get("/available-slots")
async def get_available_slots(astrologer: str, date: str, service: Optional[str] = None):
    """
    Get available time slots for a specific astrologer on a given date based on service duration.

    Args:
        astrologer: Name of the astrologer
        date: Date in YYYY-MM-DD format
        service: Service ID to determine slot duration (optional, defaults to 30 mins)

    Returns:
        List of available time slots
    """
    try:
        # Parse the date
        slot_date = datetime.strptime(date, "%Y-%m-%d")
        day_of_week = slot_date.weekday()  # 0=Monday, 6=Sunday

        # Get ALL astrologer's availability ranges for this day of week
        availability_ranges = await db.astrologer_availability.find({
            "astrologer": astrologer,
            "day_of_week": day_of_week,
            "is_active": True
        }).to_list(10)

        # If no availability defined, use default time ranges
        if not availability_ranges:
            availability_ranges = [
                {"start_time": "09:30", "end_time": "10:30", "slot_duration_minutes": 30},
                {"start_time": "13:00", "end_time": "15:00", "slot_duration_minutes": 30},
                {"start_time": "18:30", "end_time": "22:00", "slot_duration_minutes": 30}
            ]

        # Get current time in IST
        ist = pytz.timezone('Asia/Kolkata')
        now_ist = datetime.now(ist)

        # Determine slot duration based on service
        slot_duration = 30  # Default duration
        if service and service in SERVICE_DURATION:
            slot_duration = SERVICE_DURATION[service]

        # Generate time slots from all availability ranges
        all_slots = []

        for availability in availability_ranges:
            start_time = availability["start_time"]
            end_time = availability["end_time"]

            current_time = datetime.strptime(f"{date} {start_time}", "%Y-%m-%d %H:%M")
            end_datetime = datetime.strptime(f"{date} {end_time}", "%Y-%m-%d %H:%M")

            # Make current_time and end_datetime timezone-aware (IST)
            current_time = ist.localize(current_time)
            end_datetime = ist.localize(end_datetime)

            while current_time < end_datetime:
                # Calculate slot end time based on service duration
                slot_end = current_time + timedelta(minutes=slot_duration)

                # Check if slot fits within availability window
                if slot_end > end_datetime:
                    break

                slot_start_str = current_time.strftime("%H:%M")
                slot_end_str = slot_end.strftime("%H:%M")

                # Check if this slot is already booked
                # We need to check if ANY booking overlaps with this time
                existing_booking = await db.bookings.find_one({
                    "astrologer": astrologer,
                    "preferred_date": date,
                    "preferred_time": slot_start_str,
                    "status": {"$in": [BookingStatus.PENDING.value, BookingStatus.CONFIRMED.value]}
                })

                # Check if slot exists in time_slots collection
                existing_slot = await db.time_slots.find_one({
                    "astrologer": astrologer,
                    "date": date,
                    "start_time": slot_start_str,
                    "is_available": False
                })

                is_available = existing_booking is None and existing_slot is None

                # Don't show past slots (compare with IST time)
                if current_time > now_ist and is_available:
                    # Format time in 12-hour format with AM/PM
                    start_12hr = current_time.strftime("%I:%M %p")
                    end_12hr = slot_end.strftime("%I:%M %p")

                    all_slots.append({
                        "start_time": slot_start_str,
                        "end_time": slot_end_str,
                        "is_available": True,
                        "display": f"{start_12hr} - {end_12hr}",
                        "duration": slot_duration
                    })

                # Move to next slot based on service duration
                current_time = current_time + timedelta(minutes=slot_duration)

        # Sort slots by start time
        all_slots.sort(key=lambda x: x["start_time"])

        return {"slots": all_slots, "date": date, "astrologer": astrologer}

    except ValueError as e:
        logger.error(f"Invalid date format: {str(e)}")
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    except Exception as e:
        logger.error(f"Error fetching available slots: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/astrologer-availability")
async def create_astrologer_availability(availability: AstrologerAvailability):
    """
    Create or update astrologer availability schedule.
    This is typically used by admin to set working hours.
    """
    try:
        availability_doc = availability.model_dump()
        availability_doc['created_at'] = availability_doc['created_at'].isoformat()
        availability_doc['updated_at'] = availability_doc['updated_at'].isoformat()

        # Check if availability already exists for this astrologer and day
        existing = await db.astrologer_availability.find_one({
            "astrologer": availability.astrologer,
            "day_of_week": availability.day_of_week
        })

        if existing:
            # Update existing
            await db.astrologer_availability.update_one(
                {"id": existing["id"]},
                {"$set": availability_doc}
            )
            return {"message": "Availability updated successfully", "id": existing["id"]}
        else:
            # Create new
            await db.astrologer_availability.insert_one(availability_doc)
            return {"message": "Availability created successfully", "id": availability.id}

    except Exception as e:
        logger.error(f"Error creating astrologer availability: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/astrologer-availability/{astrologer}")
async def get_astrologer_availability(astrologer: str):
    """
    Get all availability schedules for a specific astrologer.
    """
    try:
        availability = await db.astrologer_availability.find(
            {"astrologer": astrologer, "is_active": True},
            {"_id": 0}
        ).to_list(100)

        return {"astrologer": astrologer, "availability": availability}
    except Exception as e:
        logger.error(f"Error fetching astrologer availability: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/admin/reset-availability")
async def reset_availability():
    """
    Admin endpoint to reset availability to new time slots.
    This will delete all existing availability and create new ones.
    """
    try:
        astrologer_name = "Acharyaa Indira Pandey"

        # Delete all existing availability for this astrologer
        delete_result = await db.astrologer_availability.delete_many({
            "astrologer": astrologer_name
        })
        logger.info(f"Deleted {delete_result.deleted_count} old availability records")

        # New time slots:
        # 9:30 AM - 10:30 AM
        # 1:00 PM - 3:00 PM
        # 6:30 PM - 10:00 PM
        time_ranges = [
            {"start_time": "09:30", "end_time": "10:30"},
            {"start_time": "13:00", "end_time": "15:00"},
            {"start_time": "18:30", "end_time": "22:00"}
        ]

        availability_data = []
        # Add availability for all 7 days (Monday to Sunday)
        # Using 30-minute slots as standard
        for day in range(7):
            for time_range in time_ranges:
                availability_data.append({
                    "id": str(uuid.uuid4()),
                    "astrologer": astrologer_name,
                    "day_of_week": day,
                    "start_time": time_range["start_time"],
                    "end_time": time_range["end_time"],
                    "slot_duration_minutes": 30,
                    "is_active": True,
                    "created_at": datetime.utcnow().isoformat(),
                    "updated_at": datetime.utcnow().isoformat()
                })

        result = await db.astrologer_availability.insert_many(availability_data)
        logger.info(f"✅ Created {len(availability_data)} new availability records")

        return {
            "message": "Availability reset successfully",
            "deleted": delete_result.deleted_count,
            "created": len(availability_data),
            "time_ranges": time_ranges
        }
    except Exception as e:
        logger.error(f"Error resetting availability: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Get Razorpay key for frontend
@api_router.get("/razorpay-key")
async def get_razorpay_key():
    if not RAZORPAY_ENABLED:
        raise HTTPException(status_code=400, detail="Razorpay not configured")
    return {"key": os.environ.get('RAZORPAY_KEY_ID')}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    mongo_client.close()
