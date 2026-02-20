import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime, timezone, timedelta
import uuid

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def create_test_token():
    client = AsyncIOMotorClient(os.environ.get('MONGO_URL'))
    db = client[os.environ.get('DB_NAME', 'astrology_db')]
    
    # Create a test reset token
    reset_token = str(uuid.uuid4())
    reset_expiry = datetime.now(timezone.utc) + timedelta(hours=1)
    
    await db.password_resets.insert_one({
        "user_id": "13a07292-a08f-4e41-b20d-614815910f6c",
        "email": "test2@example.com",
        "token": reset_token,
        "expires_at": reset_expiry,
        "used": False,
        "created_at": datetime.now(timezone.utc)
    })
    
    print(f"Test token created: {reset_token}")
    print(f"Use this to test reset password endpoint")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(create_test_token())

