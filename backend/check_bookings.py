"""
Quick script to check existing bookings in database
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

mongo_url = os.environ.get('MONGO_URL')
mongo_client = AsyncIOMotorClient(mongo_url)
db = mongo_client.astrologer_db


async def check_all_bookings():
    """Check all bookings and their statuses"""
    
    print("\n" + "="*80)
    print("ALL BOOKINGS IN DATABASE")
    print("="*80)
    
    bookings = await db.bookings.find({}).sort("created_at", -1).to_list(100)
    
    print(f"\nTotal bookings: {len(bookings)}\n")
    
    for i, booking in enumerate(bookings, 1):
        print(f"{i}. Booking ID: {booking['id']}")
        print(f"   Name: {booking.get('name')}")
        print(f"   Email: {booking.get('email')}")
        print(f"   Duration: {booking.get('consultation_duration')}")
        print(f"   Amount: ₹{booking.get('amount', 0)/100}")
        print(f"   Status: {booking.get('status')}")
        print(f"   Payment Status: {booking.get('payment_status')}")
        print(f"   Date: {booking.get('preferred_date')} at {booking.get('preferred_time')}")
        print(f"   Created: {booking.get('created_at')}")
        print()
    
    # Check for issues
    print("="*80)
    print("CHECKING FOR ISSUES")
    print("="*80)
    
    issues = []
    
    for booking in bookings:
        duration = booking.get('consultation_duration')
        amount = booking.get('amount', 0)
        status = booking.get('status')
        payment_status = booking.get('payment_status')
        
        # Issue 1: Free booking (5-10 mins) with wrong status
        if duration == '5-10':
            if amount != 0:
                issues.append(f"❌ Booking {booking['id'][:8]}... is 5-10 mins but amount is ₹{amount/100} (should be 0)")
            if payment_status != 'COMPLETED':
                issues.append(f"❌ Booking {booking['id'][:8]}... is 5-10 mins but payment_status is {payment_status} (should be COMPLETED)")
            if status != 'CONFIRMED':
                issues.append(f"❌ Booking {booking['id'][:8]}... is 5-10 mins but status is {status} (should be CONFIRMED)")
        
        # Issue 2: Paid booking (10+) with amount = 0
        if duration == '10+':
            if amount == 0:
                issues.append(f"❌ Booking {booking['id'][:8]}... is 10+ mins but amount is 0 (should be > 0)")
    
    if issues:
        print("\n⚠️  FOUND ISSUES:\n")
        for issue in issues:
            print(f"   {issue}")
        print(f"\n   Total issues: {len(issues)}")
    else:
        print("\n✅ No issues found!")
    
    print("\n" + "="*80)
    
    return bookings, issues


async def fix_existing_bookings():
    """Fix existing bookings with wrong statuses"""
    
    print("\n" + "="*80)
    print("FIXING EXISTING BOOKINGS")
    print("="*80)
    
    # Find all 5-10 mins bookings that are not CONFIRMED
    free_bookings = await db.bookings.find({
        "consultation_duration": "5-10"
    }).to_list(100)
    
    fixed_count = 0
    
    for booking in free_bookings:
        needs_fix = False
        update_fields = {}
        
        if booking.get('amount', 0) != 0:
            update_fields['amount'] = 0
            needs_fix = True
        
        if booking.get('payment_status') != 'COMPLETED':
            update_fields['payment_status'] = 'COMPLETED'
            needs_fix = True
        
        if booking.get('status') != 'CONFIRMED':
            update_fields['status'] = 'CONFIRMED'
            needs_fix = True
        
        if needs_fix:
            await db.bookings.update_one(
                {"id": booking['id']},
                {"$set": update_fields}
            )
            fixed_count += 1
            print(f"   ✅ Fixed booking {booking['id'][:8]}... - Set to CONFIRMED with amount 0")
    
    print(f"\n   Fixed {fixed_count} bookings")
    print("="*80)
    
    return fixed_count


if __name__ == "__main__":
    print("\nBooking Database Check Script\n")
    
    # Check all bookings
    bookings, issues = asyncio.run(check_all_bookings())
    
    # If issues found, ask to fix
    if issues:
        response = input("\nDo you want to fix these issues? (yes/no): ")
        if response.lower() in ['yes', 'y']:
            fixed = asyncio.run(fix_existing_bookings())
            print(f"\n✅ Fixed {fixed} bookings!")
            print("\nRe-checking bookings...")
            asyncio.run(check_all_bookings())
    
    print("\nDone!")

