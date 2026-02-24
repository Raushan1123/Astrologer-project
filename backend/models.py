from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid
import re


# User Models
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class User(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    created_at: datetime
    first_booking_completed: bool = False


class PasswordResetRequest(BaseModel):
    email: EmailStr


class PasswordReset(BaseModel):
    token: str
    new_password: str


class ConsultationDuration(str, Enum):
    SHORT = "5-10"
    LONG = "10+"


class ConsultationType(str, Enum):
    ONLINE = "online"
    INPERSON = "inperson"


class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class PaymentStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"


class BookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    date_of_birth: Optional[str] = None  # Optional - can be collected during call
    time_of_birth: Optional[str] = None  # Optional - can be collected during call
    place_of_birth: Optional[str] = None  # Optional - can be collected during call
    astrologer: str
    service: str
    consultation_type: ConsultationType
    consultation_duration: ConsultationDuration
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    message: Optional[str] = ""


class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    country: str = "India"  # Default to India
    date_of_birth: Optional[str] = None  # Optional - can be collected during call
    time_of_birth: Optional[str] = None  # Optional - can be collected during call
    place_of_birth: Optional[str] = None  # Optional - can be collected during call
    astrologer: str
    service: str
    consultation_type: ConsultationType
    consultation_duration: ConsultationDuration
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    message: Optional[str] = ""
    status: BookingStatus = BookingStatus.PENDING
    payment_status: PaymentStatus = PaymentStatus.PENDING
    amount: int = 0
    razorpay_order_id: Optional[str] = None
    razorpay_payment_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v):
        """Validate phone number - must be 10 digits (Indian format)"""
        if not v:
            raise ValueError('Phone number is required')
        # Remove spaces, dashes, and parentheses
        cleaned = re.sub(r'[\s\-\(\)\+]', '', v)
        # Check if it's a valid Indian phone number (10 digits)
        if not re.match(r'^[6-9]\d{9}$', cleaned):
            raise ValueError('Phone number must be a valid 10-digit Indian mobile number starting with 6-9')
        return cleaned


class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v):
        """Validate phone number if provided"""
        if v is None or v == "":
            return v
        # Remove spaces, dashes, and parentheses
        cleaned = re.sub(r'[\s\-\(\)\+]', '', v)
        # Check if it's a valid Indian phone number (10 digits)
        if not re.match(r'^[6-9]\d{9}$', cleaned):
            raise ValueError('Phone number must be a valid 10-digit Indian mobile number starting with 6-9')
        return cleaned


class Newsletter(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True


class TestimonialCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    rating: int = Field(..., ge=1, le=5)
    text: str = Field(..., min_length=10, max_length=1000)
    service: str = Field(..., min_length=1)
    location: Optional[str] = Field(None, max_length=100)


class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    rating: int = Field(ge=1, le=5)
    text: str
    service: str
    location: Optional[str] = None
    approved: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class BlogPost(BaseModel):
    id: str
    title: str
    excerpt: str
    content: str
    image: str
    author: str
    date: str
    category: str
    read_time: str
    published: bool = False


class Gemstone(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: int
    benefits: List[str]
    image: str
    in_stock: bool = True
    weight: Optional[str] = None
    quality: Optional[str] = None


class TimeSlot(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    astrologer: str
    date: str  # Format: YYYY-MM-DD
    start_time: str  # Format: HH:MM (24-hour)
    end_time: str  # Format: HH:MM (24-hour)
    is_available: bool = True
    booking_id: Optional[str] = None  # Reference to booking if slot is booked
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class AstrologerAvailability(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    astrologer: str
    day_of_week: int  # 0=Monday, 6=Sunday
    start_time: str  # Format: HH:MM (24-hour)
    end_time: str  # Format: HH:MM (24-hour)
    slot_duration_minutes: int = 30  # Default 30-minute slots
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
