from fastapi import FastAPI, APIRouter, HTTPException, Request, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime, timezone, timedelta
from typing import Optional
import razorpay
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import pytz

from models import (
    BookingCreate, Booking, ContactInquiry, Newsletter,
    BookingStatus, PaymentStatus, AstrologerAvailability,
    TestimonialCreate, Testimonial
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

            logger.info("✅ Database indexes created successfully")

            # Check if astrologer_availability collection has data
            count = await db.astrologer_availability.count_documents({})

            if count == 0:
                logger.info("Initializing database with default data...")

                # Create default availability for Acharyaa Indira Pandey
                astrologer_name = "Acharyaa Indira Pandey"
                availability_data = []

                # Add availability for all 7 days (Monday to Sunday)
                # Time: 11 AM to 11 PM IST
                for day in range(7):
                    availability_data.append({
                        "astrologer": astrologer_name,
                        "day_of_week": day,
                        "start_time": "11:00",
                        "end_time": "23:00",
                        "slot_duration_minutes": 30,
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

                # Update existing availability to 11:00-23:00 if needed
                update_result = await db.astrologer_availability.update_many(
                    {"start_time": "09:00", "end_time": "21:00"},
                    {"$set": {"start_time": "11:00", "end_time": "23:00"}}
                )
                if update_result.modified_count > 0:
                    logger.info(f"✅ Updated {update_result.modified_count} availability records to 11:00-23:00")
        except Exception as e:
            logger.error(f"Error during database initialization: {str(e)}")

    # Run initialization in background to not block startup
    asyncio.create_task(init_db())

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
    - SENDGRID_FROM_NAME: Sender name (e.g., Mrs. Indira Pandey Astrology)

    Falls back to SMTP if SendGrid is not configured (for local development)
    """
    # Try SendGrid first (recommended for production/Railway)
    sendgrid_api_key = os.environ.get('SENDGRID_API_KEY', '')

    if sendgrid_api_key:
        try:
            import requests
            from_email = os.environ.get('SENDGRID_FROM_EMAIL', 'noreply@astrology.com')
            from_name = os.environ.get('SENDGRID_FROM_NAME', 'Mrs. Indira Pandey Astrology')

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


# Calculate consultation price
def calculate_price(duration: str) -> int:
    prices = {
        "5-10": 0,  # Free for first time
        "10-20": 150000,  # ₹1,500 in paise
        "20+": 210000  # ₹2,100 in paise
    }
    return prices.get(duration, 0)


# Root endpoint
@api_router.get("/")
async def root():
    return {
        "message": "Astrology Booking API",
        "status": "online",
        "razorpay_enabled": RAZORPAY_ENABLED
    }


# Booking endpoints
@api_router.post("/bookings")
async def create_booking(booking_data: BookingCreate, background_tasks: BackgroundTasks):
    try:
        # Calculate price
        amount = calculate_price(booking_data.consultation_duration)

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
        payment_status = (
            PaymentStatus.PENDING if amount > 0
            else PaymentStatus.COMPLETED
        )
        booking = Booking(
            **booking_dict,
            amount=amount,
            razorpay_order_id=razorpay_order_id,
            status=BookingStatus.PENDING,
            payment_status=payment_status
        )

        # Save to database
        booking_doc = booking.model_dump()
        booking_doc['created_at'] = booking_doc['created_at'].isoformat()
        booking_doc['updated_at'] = booking_doc['updated_at'].isoformat()

        await db.bookings.insert_one(booking_doc)

        # Send confirmation email in background (non-blocking)
        amount_display = (
            '₹' + str(amount/100) if amount > 0
            else 'Free (First Time)'
        )
        consultation_type = booking.consultation_type.value.title()
        duration_display = f"{booking.consultation_duration.value} minutes"

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
                    </td><td>{booking.service}</td></tr>
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
                <strong>Mrs. Indira Pandey Team</strong></p>
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
                    </td><td>{booking.service}</td></tr>
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
                <strong>Mrs. Indira Pandey Team</strong></p>
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

@api_router.put("/bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: str):
    try:
        result = await db.bookings.update_one(
            {"id": booking_id},
            {"$set": {"status": status, "updated_at": datetime.now(timezone.utc).isoformat()}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Booking not found")
        return {"message": "Status updated successfully"}
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
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>{booking['service']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Duration:</strong></td><td>{duration_display_payment}</td></tr>
                </table>
                <p style="margin-top: 20px;">We will contact you shortly to schedule your consultation.</p>
                <p style="margin-top: 30px;">Best regards,<br><strong>Mrs. Indira Pandey Team</strong></p>
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
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>{booking['service']}</td></tr>
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
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>{booking['service']}</td></tr>
                    <tr><td style="padding: 8px 0;"><strong>Amount:</strong></td><td>₹{booking['amount']/100}</td></tr>
                </table>
                <div style="margin-top: 30px; padding: 15px; background-color: #dbeafe; border-left: 4px solid #3b82f6;">
                    <strong>What's Next?</strong><br>
                    • You can try booking again from our website<br>
                    • Or contact us directly at {os.environ.get('SENDGRID_FROM_EMAIL', 'indirapandey2526@gmail.com')}<br>
                    • We're here to help!
                </div>
                <p style="margin-top: 30px;">Best regards,<br><strong>Mrs. Indira Pandey Team</strong></p>
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
                    <tr><td style="padding: 8px 0;"><strong>Service:</strong></td><td>{booking['service']}</td></tr>
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
                <p style="margin-top: 30px;">Best regards,<br><strong>Mrs. Indira Pandey Team</strong></p>
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
                <p style="margin-top: 30px;">Best regards,<br><strong>Mrs. Indira Pandey Team</strong></p>
            </div>
        </body>
        </html>
        """
        await send_email(newsletter.email, "Newsletter Subscription Confirmed", email_body)
        
        return {"message": "Subscribed successfully"}
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

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

                <p style="margin-top: 30px;">Best regards,<br><strong>Mrs. Indira Pandey Team</strong></p>
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
async def get_available_slots(astrologer: str, date: str, duration: Optional[str] = "30"):
    """
    Get available time slots for a specific astrologer on a given date.

    Args:
        astrologer: Name of the astrologer
        date: Date in YYYY-MM-DD format
        duration: Consultation duration in minutes (default: 30)

    Returns:
        List of available time slots
    """
    try:
        # Parse the date
        slot_date = datetime.strptime(date, "%Y-%m-%d")
        day_of_week = slot_date.weekday()  # 0=Monday, 6=Sunday

        # Get astrologer's availability for this day of week
        availability = await db.astrologer_availability.find_one({
            "astrologer": astrologer,
            "day_of_week": day_of_week,
            "is_active": True
        })

        # If no availability defined, use default working hours (11 AM - 11 PM IST)
        if not availability:
            start_time = "11:00"
            end_time = "23:00"
            slot_duration = 30
        else:
            start_time = availability["start_time"]
            end_time = availability["end_time"]
            slot_duration = availability.get("slot_duration_minutes", 30)

        # Get current time in IST
        ist = pytz.timezone('Asia/Kolkata')
        now_ist = datetime.now(ist)

        # Generate time slots
        slots = []
        current_time = datetime.strptime(f"{date} {start_time}", "%Y-%m-%d %H:%M")
        end_datetime = datetime.strptime(f"{date} {end_time}", "%Y-%m-%d %H:%M")

        # Make current_time and end_datetime timezone-aware (IST)
        current_time = ist.localize(current_time)
        end_datetime = ist.localize(end_datetime)

        while current_time < end_datetime:
            slot_end = current_time + timedelta(minutes=slot_duration)
            if slot_end > end_datetime:
                break

            slot_start_str = current_time.strftime("%H:%M")
            slot_end_str = slot_end.strftime("%H:%M")

            # Check if this slot is already booked
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
                slots.append({
                    "start_time": slot_start_str,
                    "end_time": slot_end_str,
                    "is_available": True,
                    "display": f"{slot_start_str} - {slot_end_str}"
                })

            current_time = slot_end

        return {"slots": slots, "date": date, "astrologer": astrologer}

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
        ).to_list(10)

        return {"astrologer": astrologer, "availability": availability}
    except Exception as e:
        logger.error(f"Error fetching astrologer availability: {str(e)}")
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
