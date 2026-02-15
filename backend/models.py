from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class ConsultationDuration(str, Enum):
    SHORT = "5-10"
    MEDIUM = "10-20"
    LONG = "20+"

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
    date_of_birth: Optional[str] = None
    time_of_birth: Optional[str] = None
    place_of_birth: Optional[str] = None
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
    date_of_birth: Optional[str] = None
    time_of_birth: Optional[str] = None
    place_of_birth: Optional[str] = None
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

class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Newsletter(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class Testimonial(BaseModel):
    id: str
    name: str
    rating: int = Field(ge=1, le=5)
    text: str
    service: str
    date: str
    approved: bool = False

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

import uuid
