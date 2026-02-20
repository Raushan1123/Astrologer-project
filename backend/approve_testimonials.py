#!/usr/bin/env python3
"""
Script to approve all pending testimonials
Usage: python approve_testimonials.py
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def approve_all_testimonials():
    """Approve all pending testimonials"""
    
    # Connect to MongoDB
    mongo_url = os.environ.get('MONGO_URL')
    mongo_client = AsyncIOMotorClient(mongo_url)
    db = mongo_client[os.environ.get('DB_NAME', 'astrology_db')]
    
    try:
        # Get all pending testimonials
        pending = await db.testimonials.find({"approved": False}).to_list(1000)
        
        if not pending:
            print("✅ No pending testimonials found!")
            return
        
        print(f"\n📋 Found {len(pending)} pending testimonials:\n")
        
        for i, testimonial in enumerate(pending, 1):
            print(f"{i}. {testimonial['name']} - {testimonial['service']}")
            print(f"   Rating: {'⭐' * testimonial['rating']}")
            print(f"   Text: {testimonial['text'][:100]}...")
            print()
        
        # Ask for confirmation
        response = input(f"\nApprove all {len(pending)} testimonials? (yes/no): ").strip().lower()
        
        if response in ['yes', 'y']:
            # Approve all
            result = await db.testimonials.update_many(
                {"approved": False},
                {"$set": {"approved": True, "updated_at": datetime.utcnow()}}
            )
            
            print(f"\n✅ Successfully approved {result.modified_count} testimonials!")
        else:
            print("\n❌ Operation cancelled.")
    
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
    
    finally:
        mongo_client.close()

if __name__ == "__main__":
    asyncio.run(approve_all_testimonials())

