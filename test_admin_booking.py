"""
Quick test script for Admin-Assisted Booking APIs
"""
import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_customer_lookup():
    """Test customer lookup API"""
    print("\n" + "="*60)
    print("TEST 1: Customer Lookup")
    print("="*60)
    
    # Test with non-existent customer
    response = requests.get(f"{BASE_URL}/admin/customer-lookup", params={"identifier": "test@example.com"})
    print(f"\nStatus: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    return response.status_code == 200

def test_create_booking():
    """Test create admin booking API"""
    print("\n" + "="*60)
    print("TEST 2: Create Admin Booking")
    print("="*60)
    
    booking_data = {
        "name": "Test Customer",
        "email": "testcustomer@example.com",
        "phone": "9876543210",
        "date_of_birth": "1990-01-01",
        "time_of_birth": "10:30 AM",
        "place_of_birth": "Delhi, India",
        "astrologer": "Acharyaa Indira Pandey",
        "service": "birth-chart-analysis",
        "consultation_type": "online",
        "consultation_duration": "10+",
        "preferred_date": "2026-05-15",
        "preferred_time": "14:00",
        "message": "Test booking via admin"
    }
    
    response = requests.post(f"{BASE_URL}/admin/create-booking", json=booking_data)
    print(f"\nStatus: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"Booking ID: {result.get('booking_id')}")
        print(f"Amount: {result.get('amount_display')}")
        print(f"Payment Link: {result.get('payment_link')}")
        print(f"Status: {result.get('booking_status')}")
        return result.get('booking_id')
    else:
        print(f"Error: {response.text}")
        return None

def test_confirm_payment(booking_id):
    """Test manual payment confirmation API"""
    print("\n" + "="*60)
    print("TEST 3: Manual Payment Confirmation")
    print("="*60)
    
    if not booking_id:
        print("Skipping - no booking ID available")
        return False
    
    payment_details = {
        "payment_method": "upi",
        "transaction_id": "TEST123456789",
        "notes": "Test payment confirmation"
    }
    
    response = requests.post(
        f"{BASE_URL}/admin/confirm-payment/{booking_id}",
        json=payment_details
    )
    print(f"\nStatus: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    return response.status_code == 200

def main():
    """Run all tests"""
    print("\n🚀 Testing Admin-Assisted Booking APIs")
    print("Backend URL:", BASE_URL)
    
    try:
        # Test 1: Customer Lookup
        test1_passed = test_customer_lookup()
        
        # Test 2: Create Booking
        booking_id = test_create_booking()
        test2_passed = booking_id is not None
        
        # Test 3: Confirm Payment
        test3_passed = test_confirm_payment(booking_id)
        
        # Summary
        print("\n" + "="*60)
        print("TEST SUMMARY")
        print("="*60)
        print(f"✅ Customer Lookup: {'PASSED' if test1_passed else 'FAILED'}")
        print(f"✅ Create Booking: {'PASSED' if test2_passed else 'FAILED'}")
        print(f"✅ Confirm Payment: {'PASSED' if test3_passed else 'FAILED'}")
        
        if test1_passed and test2_passed and test3_passed:
            print("\n🎉 All tests passed!")
        else:
            print("\n⚠️  Some tests failed")
            
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")

if __name__ == "__main__":
    main()

