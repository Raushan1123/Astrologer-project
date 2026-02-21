#!/usr/bin/env python3
"""
Test script to verify password reset functionality
"""
import asyncio
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone, timedelta
import uuid

# MongoDB connection
MONGODB_URL = "mongodb+srv://raushan00567_db_user:Ed58htpHn2zjwQhF@cluster0.mkpmvbt.mongodb.net/astrology_db?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true"

async def test_password_reset():
    """Test password reset token creation and retrieval"""
    try:
        # Connect to MongoDB
        client = AsyncIOMotorClient(MONGODB_URL)
        db = client.astrology_db
        
        print("✅ Connected to MongoDB")
        
        # Find a test user
        user = await db.users.find_one({"email": "raushan00999kr@gmail.com"})
        if not user:
            print("❌ Test user not found. Please create a user first.")
            return
        
        print(f"✅ Found user: {user['name']} ({user['email']})")
        
        # Create a test reset token
        reset_token = str(uuid.uuid4())
        reset_expiry = datetime.now(timezone.utc) + timedelta(hours=1)
        
        await db.password_resets.insert_one({
            "user_id": user["id"],
            "email": user["email"],
            "token": reset_token,
            "expires_at": reset_expiry,
            "used": False,
            "created_at": datetime.now(timezone.utc)
        })
        
        print(f"✅ Created reset token: {reset_token}")
        print(f"   Expires at: {reset_expiry}")
        
        # Verify token can be retrieved
        reset_record = await db.password_resets.find_one({
            "token": reset_token,
            "used": False
        })
        
        if reset_record:
            print("✅ Token successfully retrieved from database")
            print(f"   User ID: {reset_record['user_id']}")
            print(f"   Email: {reset_record['email']}")
            print(f"   Used: {reset_record['used']}")
        else:
            print("❌ Failed to retrieve token")
        
        # Test reset link
        frontend_url = "https://astrologer-project-frontend.up.railway.app"
        reset_link = f"{frontend_url}/reset-password/{reset_token}"
        print(f"\n🔗 Reset link: {reset_link}")
        
        # Clean up test token
        await db.password_resets.delete_one({"token": reset_token})
        print("\n✅ Test token cleaned up")
        
        client.close()
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_password_reset())

