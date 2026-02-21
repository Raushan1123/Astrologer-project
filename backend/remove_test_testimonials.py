"""
Script to remove test testimonials from the database
Run this script to clean up test data before production
"""
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection
MONGODB_URL = os.environ.get('MONGODB_URL')

async def remove_test_testimonials():
    """Remove test testimonials from database"""
    try:
        # Connect to MongoDB
        client = AsyncIOMotorClient(MONGODB_URL)
        db = client.astrology_db
        
        print("Connected to MongoDB")
        
        # List all testimonials first
        print("\n=== Current Testimonials ===")
        testimonials = await db.testimonials.find({}).to_list(100)
        for t in testimonials:
            print(f"- {t.get('name')} ({t.get('email')}) - {t.get('service')}")
        
        print(f"\nTotal testimonials: {len(testimonials)}")
        
        # Remove testimonials with test-related names or emails
        test_patterns = [
            {"name": {"$regex": "test", "$options": "i"}},
            {"name": {"$regex": "raushan", "$options": "i"}},
            {"email": {"$regex": "test", "$options": "i"}},
            {"email": {"$regex": "example", "$options": "i"}},
        ]
        
        deleted_count = 0
        for pattern in test_patterns:
            result = await db.testimonials.delete_many(pattern)
            deleted_count += result.deleted_count
            if result.deleted_count > 0:
                print(f"\nDeleted {result.deleted_count} testimonials matching pattern: {pattern}")
        
        print(f"\n=== Summary ===")
        print(f"Total test testimonials removed: {deleted_count}")
        
        # Show remaining testimonials
        remaining = await db.testimonials.find({}).to_list(100)
        print(f"Remaining testimonials: {len(remaining)}")
        
        if remaining:
            print("\n=== Remaining Testimonials ===")
            for t in remaining:
                print(f"- {t.get('name')} ({t.get('email')}) - {t.get('service')} - Approved: {t.get('approved')}")
        
        client.close()
        print("\nDatabase connection closed")
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    asyncio.run(remove_test_testimonials())

