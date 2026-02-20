import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def get_reset_token():
    client = AsyncIOMotorClient(os.environ.get('MONGODB_URI'))
    db = client.astrology_db
    
    # Get the latest reset token
    reset = await db.password_resets.find_one(
        {'email': 'test2@example.com'},
        sort=[('created_at', -1)]
    )
    
    if reset:
        print(f"Token: {reset['token']}")
        print(f"Expires: {reset['expires_at']}")
        print(f"Used: {reset['used']}")
    else:
        print("No reset token found")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(get_reset_token())

