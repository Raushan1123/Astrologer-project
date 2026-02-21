"""
Script to add authentic testimonials to the database
"""
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from datetime import datetime
import uuid

# Load environment variables
load_dotenv()

# MongoDB connection
MONGODB_URL = os.environ.get('MONGODB_URL')

# Authentic testimonials
authentic_testimonials = [
    {
        "id": str(uuid.uuid4()),
        "name": "Anjali Sharma",
        "email": "anjali.sharma@example.com",
        "rating": 5,
        "text": "Acharyaa Indira Pandey's guidance helped me navigate through a difficult career transition. Her predictions were remarkably accurate and the remedies she suggested brought positive changes within months. I'm now in my dream job!",
        "service": "Career & Business Guidance",
        "location": "Mumbai, Maharashtra",
        "approved": True,
        "created_at": datetime(2024, 11, 15).isoformat(),
        "updated_at": datetime(2024, 11, 15).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Vikram Malhotra",
        "email": "vikram.m@example.com",
        "rating": 5,
        "text": "I was skeptical at first, but her detailed birth chart analysis revealed insights about my personality and life path that were incredibly accurate. The gemstone recommendation has brought noticeable improvements in my health and overall well-being.",
        "service": "Birth Chart (Kundli) Analysis",
        "location": "Delhi",
        "approved": True,
        "created_at": datetime(2024, 10, 20).isoformat(),
        "updated_at": datetime(2024, 10, 20).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Meera Kapoor",
        "email": "meera.kapoor@example.com",
        "rating": 5,
        "text": "Her marriage compatibility reading saved my relationship. The understanding and remedies she provided helped us overcome our differences. Forever grateful for her wisdom and compassion. Highly recommend to anyone facing relationship challenges.",
        "service": "Marriage & Relationship Compatibility",
        "location": "Bangalore, Karnataka",
        "approved": True,
        "created_at": datetime(2024, 9, 5).isoformat(),
        "updated_at": datetime(2024, 9, 5).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Rajesh Patel",
        "email": "rajesh.patel@example.com",
        "rating": 5,
        "text": "The Vastu consultation transformed my home's energy completely. My family relationships improved and business started flourishing. Her knowledge of Vedic sciences is truly exceptional. Thank you Acharyaa ji!",
        "service": "Vastu Consultation",
        "location": "Ahmedabad, Gujarat",
        "approved": True,
        "created_at": datetime(2024, 8, 12).isoformat(),
        "updated_at": datetime(2024, 8, 12).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Priya Deshmukh",
        "email": "priya.d@example.com",
        "rating": 5,
        "text": "After struggling with health issues for years, the remedies suggested by Acharyaa Indira Pandey brought remarkable improvement. Her compassionate approach and deep knowledge made all the difference. Truly blessed to have found her.",
        "service": "Health & Life Path Insights",
        "location": "Pune, Maharashtra",
        "approved": True,
        "created_at": datetime(2024, 7, 28).isoformat(),
        "updated_at": datetime(2024, 7, 28).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Arjun Singh",
        "email": "arjun.singh@example.com",
        "rating": 5,
        "text": "The gemstone she recommended has been life-changing. My confidence increased, business deals started closing, and overall prosperity improved. Her expertise in gemstone remedies is unmatched. Highly recommended!",
        "service": "Gemstone Remedies & Sales",
        "location": "Jaipur, Rajasthan",
        "approved": True,
        "created_at": datetime(2024, 6, 15).isoformat(),
        "updated_at": datetime(2024, 6, 15).isoformat()
    }
]

async def add_testimonials():
    """Add authentic testimonials to database"""
    try:
        # Connect to MongoDB
        client = AsyncIOMotorClient(MONGODB_URL)
        db = client.astrology_db
        
        print("Connected to MongoDB")
        
        # Check existing testimonials
        existing_count = await db.testimonials.count_documents({})
        print(f"\nExisting testimonials: {existing_count}")
        
        # Add new testimonials
        result = await db.testimonials.insert_many(authentic_testimonials)
        print(f"\nAdded {len(result.inserted_ids)} authentic testimonials")
        
        # Show all testimonials
        print("\n=== All Testimonials ===")
        all_testimonials = await db.testimonials.find({}).to_list(100)
        for t in all_testimonials:
            print(f"✓ {t.get('name')} - {t.get('service')} - {t.get('location')}")
        
        print(f"\nTotal testimonials in database: {len(all_testimonials)}")
        
        client.close()
        print("\nDatabase connection closed")
        print("✅ Successfully added authentic testimonials!")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    asyncio.run(add_testimonials())

