import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def list_collections():
    client = AsyncIOMotorClient(os.environ.get('MONGODB_URI'))
    db = client.astrology_db
    
    collections = await db.list_collection_names()
    print("Collections in astrology_db:")
    for coll in collections:
        count = await db[coll].count_documents({})
        print(f"  - {coll}: {count} documents")
    
    # Check password_resets specifically
    print("\nPassword resets:")
    async for doc in db.password_resets.find():
        print(f"  Token: {doc.get('token')}, Email: {doc.get('email')}, Used: {doc.get('used')}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(list_collections())

