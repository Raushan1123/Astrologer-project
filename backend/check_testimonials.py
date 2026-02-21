#!/usr/bin/env python3
"""
Script to check current testimonials in the database
"""
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

MONGODB_URL = os.environ.get('MONGODB_URL', 'mongodb://localhost:27017')
DATABASE_NAME = os.environ.get('DATABASE_NAME', 'astrology_db')

async def check_testimonials():
    """Check all testimonials in the database"""
    try:
        # Connect to MongoDB
        client = AsyncIOMotorClient(MONGODB_URL)
        db = client[DATABASE_NAME]
        
        print("🔍 Checking testimonials in database...\n")
        
        # Get all testimonials
        testimonials = await db.testimonials.find({}).to_list(length=100)
        
        if not testimonials:
            print("✅ No testimonials found in database.")
            print("📝 The testimonials page will show mock data until real testimonials are submitted.")
        else:
            print(f"📋 Found {len(testimonials)} testimonial(s):\n")
            for i, testimonial in enumerate(testimonials, 1):
                print(f"{i}. Name: {testimonial.get('name')}")
                print(f"   Email: {testimonial.get('email')}")
                print(f"   Service: {testimonial.get('service')}")
                print(f"   Rating: {testimonial.get('rating')} stars")
                print(f"   Approved: {testimonial.get('approved', False)}")
                print(f"   Text: {testimonial.get('text')[:100]}...")
                print()
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    asyncio.run(check_testimonials())

