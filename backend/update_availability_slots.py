"""
Script to update astrologer availability time slots in the database.

This script updates the available time slots to:
- Morning: 9:30 AM - 11:00 AM
- Afternoon: 2:00 PM - 6:30 PM (excluding 1:00 PM - 2:00 PM)
- Evening: 6:30 PM - 10:00 PM

Run this script once to update the database with the new time slots.
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime
import uuid

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def update_availability():
    # Connect to MongoDB
    mongo_url = os.environ.get('MONGO_URL')
    mongo_client = AsyncIOMotorClient(mongo_url)
    db = mongo_client[os.environ.get('DB_NAME', 'astrology_db')]
    
    astrologer_name = "Acharyaa Indira Pandey"
    
    print(f"🔄 Updating availability for {astrologer_name}...")
    
    # Delete all existing availability for this astrologer
    delete_result = await db.astrologer_availability.delete_many({
        "astrologer": astrologer_name
    })
    print(f"✅ Deleted {delete_result.deleted_count} old availability records")
    
    # UPDATED: Available time slots (excluding 1:00 PM - 2:00 PM)
    # 9:30 AM - 11:00 AM
    # 2:00 PM - 6:30 PM
    # 6:30 PM - 10:00 PM
    time_ranges = [
        {"start_time": "09:30", "end_time": "11:00"},  # 9:30 AM - 11:00 AM
        {"start_time": "14:00", "end_time": "18:30"},  # 2:00 PM - 6:30 PM
        {"start_time": "18:30", "end_time": "22:00"}   # 6:30 PM - 10:00 PM
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
    
    # Insert new availability records
    result = await db.astrologer_availability.insert_many(availability_data)
    print(f"✅ Created {len(result.inserted_ids)} new availability records")
    
    print("\n📋 New Time Slots:")
    print("   Morning:   9:30 AM - 11:00 AM")
    print("   Afternoon: 2:00 PM - 6:30 PM (1:00 PM - 2:00 PM excluded)")
    print("   Evening:   6:30 PM - 10:00 PM")
    print("\n🎉 Availability updated successfully!")
    
    # Close connection
    mongo_client.close()

if __name__ == "__main__":
    asyncio.run(update_availability())

