# Comprehensive Slot Locking Test Plan 🧪

## Test Environment Setup
- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- Database: MongoDB (temp_slot_reservations collection)

---

## Test Cases

### 1. Basic Slot Reservation ✅
**Steps:**
1. Login as User A
2. Navigate to Booking page
3. Select astrologer, service, date
4. Select a time slot (e.g., "10:00 AM")
5. Check backend logs for reservation confirmation

**Expected:**
- Slot reserved for 5 minutes
- Backend creates entry in `temp_slot_reservations`
- Timer starts (5 minutes countdown)

**Verify:**
- [ ] Slot reservation API call succeeds
- [ ] `reservedSlot` state updated
- [ ] Timer set for 5 minutes
- [ ] Backend log shows: "✅ Temporarily reserved slot..."

---

### 2. Slot Visibility for Other Users ✅
**Steps:**
1. User A reserves slot "10:00 AM" (from Test 1)
2. Open incognito window
3. Login as User B
4. Navigate to same astrologer, date
5. Check available slots

**Expected:**
- User B should NOT see "10:00 AM" in available slots
- Other slots should be visible

**Verify:**
- [ ] Reserved slot hidden from User B
- [ ] Other slots still available
- [ ] No error messages shown

---

### 3. Changing Slot Selection ✅
**Steps:**
1. User A has "10:00 AM" reserved
2. User A selects "11:00 AM" instead
3. Check backend logs
4. Check User B's available slots

**Expected:**
- "10:00 AM" released
- "11:00 AM" reserved
- User B can now see "10:00 AM"
- User B cannot see "11:00 AM"

**Verify:**
- [ ] Release API called for "10:00 AM"
- [ ] Reserve API called for "11:00 AM"
- [ ] Backend shows both operations
- [ ] User B sees updated availability

---

### 4. Reservation Expiry (5 minutes) ✅
**Steps:**
1. User A reserves slot "10:00 AM"
2. Wait 5 minutes (or modify timer to 10 seconds for testing)
3. Check User A's slot list auto-refresh
4. Check User B's slot list

**Expected:**
- After 5 minutes, reservation expires
- Slot auto-refreshes for User A
- "10:00 AM" becomes available again
- User B can now see "10:00 AM"

**Verify:**
- [ ] Timer triggers after 5 minutes
- [ ] Slots refresh automatically
- [ ] Slot becomes available
- [ ] Backend cleanup removes expired reservation

---

### 5. Navigation Away (Cleanup) ✅
**Steps:**
1. User A reserves slot "10:00 AM"
2. User A navigates to Home page (or any other page)
3. Check backend logs
4. Check User B's available slots

**Expected:**
- Slot reservation released immediately
- Backend receives release API call
- User B can see "10:00 AM" available

**Verify:**
- [ ] Release API called on navigation
- [ ] Backend log shows release
- [ ] Slot becomes available immediately
- [ ] No memory leaks (timer cleared)

---

### 6. Browser Close/Refresh ✅
**Steps:**
1. User A reserves slot "10:00 AM"
2. User A closes browser tab (or refreshes)
3. Wait a moment
4. Check User B's available slots

**Expected:**
- Reservation released on unmount
- Slot becomes available
- Backend cleanup handles orphaned reservations

**Verify:**
- [ ] Component cleanup runs
- [ ] Release API called (if possible)
- [ ] Slot available after refresh
- [ ] No orphaned reservations

---

### 7. Simultaneous Booking Attempt ⚠️ CRITICAL
**Steps:**
1. User A reserves slot "10:00 AM"
2. User A fills form and clicks "Book Now"
3. Simultaneously, User B tries to book same slot via API
4. Check booking results

**Expected:**
- User A's booking succeeds
- User B's booking fails with 409 error
- Only one booking created
- User B sees error message

**Verify:**
- [ ] Only one booking in database
- [ ] User A gets success
- [ ] User B gets 409 Conflict
- [ ] No double booking

---

### 8. Race Condition at Slot Selection ⚠️ CRITICAL
**Steps:**
1. User A and User B both viewing same slots
2. Both try to select "10:00 AM" at exact same time
3. Check who gets the reservation

**Expected:**
- First request wins
- Second request fails or slot disappears
- No double reservation

**Verify:**
- [ ] Only one reservation created
- [ ] Loser sees slot unavailable
- [ ] No conflicts in database

---

### 9. Expired Reservation During Booking ✅
**Steps:**
1. User A reserves slot "10:00 AM"
2. Wait 4 minutes 50 seconds
3. User A clicks "Book Now"
4. Booking takes 15 seconds to process
5. Check if booking succeeds

**Expected:**
- Booking should still succeed (reservation was valid when started)
- OR booking fails gracefully with clear message

**Verify:**
- [ ] Clear behavior (success or failure)
- [ ] No orphaned bookings
- [ ] User gets appropriate feedback

---

### 10. Multiple Slots Reserved by Same User ✅
**Steps:**
1. User A reserves slot "10:00 AM" for Astrologer 1
2. User A opens another tab
3. User A reserves slot "11:00 AM" for Astrologer 2
4. Check both reservations

**Expected:**
- Both reservations should work
- Each reservation independent
- No conflicts

**Verify:**
- [ ] Both slots reserved
- [ ] Both timers running
- [ ] No interference between reservations

---

### 11. Reservation Without Authentication ✅
**Steps:**
1. Logout
2. Try to reserve a slot via API directly
3. Check response

**Expected:**
- API returns 401 Unauthorized
- No reservation created

**Verify:**
- [ ] Authentication required
- [ ] No unauthorized reservations
- [ ] Clear error message

---

### 12. Invalid Slot Reservation ✅
**Steps:**
1. Try to reserve a slot that doesn't exist
2. Try to reserve a past slot
3. Try to reserve with invalid parameters

**Expected:**
- API handles gracefully
- No crashes
- Clear error messages

**Verify:**
- [ ] Validation works
- [ ] No server errors
- [ ] Appropriate responses

---

### 13. Cleanup of Expired Reservations ✅
**Steps:**
1. Create multiple reservations
2. Wait for expiry
3. Check database directly
4. Trigger cleanup function

**Expected:**
- Expired reservations removed from DB
- Active reservations remain
- Cleanup runs periodically

**Verify:**
- [ ] Expired entries deleted
- [ ] Active entries preserved
- [ ] Cleanup function works

---

### 14. Permanent Booking After Reservation ✅
**Steps:**
1. User A reserves slot "10:00 AM"
2. User A completes booking and payment
3. Check reservation status
4. Check User B's available slots

**Expected:**
- Temporary reservation removed
- Permanent booking created
- Slot no longer available to anyone

**Verify:**
- [ ] Temp reservation deleted
- [ ] Booking created
- [ ] Slot permanently blocked
- [ ] User B cannot see slot

---

### 15. Network Failure During Reservation ✅
**Steps:**
1. Disconnect network
2. Try to reserve a slot
3. Reconnect network
4. Check state

**Expected:**
- Graceful failure
- No broken state
- User can retry

**Verify:**
- [ ] Error handled gracefully
- [ ] No console errors
- [ ] State remains consistent
- [ ] Retry works

---

## Performance Tests

### 16. Load Test - Multiple Users ⚡
**Steps:**
1. Simulate 10 users viewing same slots
2. All try to reserve different slots
3. Check performance

**Expected:**
- All reservations succeed
- Response time < 500ms
- No database locks

**Verify:**
- [ ] All succeed
- [ ] Fast response
- [ ] No bottlenecks

---

### 17. Database Query Performance ⚡
**Steps:**
1. Create 100 temporary reservations
2. Query available slots
3. Measure query time

**Expected:**
- Query time < 200ms
- Efficient filtering
- No full table scans

**Verify:**
- [ ] Fast queries
- [ ] Proper indexing
- [ ] Scalable

---

## Edge Cases

### 18. Same User, Same Slot, Multiple Tabs ✅
**Steps:**
1. User A opens 2 tabs
2. Both tabs select same slot "10:00 AM"
3. Check reservation count

**Expected:**
- Only one reservation created
- Both tabs show same state
- No duplicates

**Verify:**
- [ ] Single reservation
- [ ] Consistent state
- [ ] No conflicts

---

### 19. Slot Reserved Then Astrologer Unavailable ✅
**Steps:**
1. User A reserves slot "10:00 AM"
2. Admin marks astrologer unavailable
3. User A tries to book

**Expected:**
- Booking fails gracefully
- Clear error message
- Reservation released

**Verify:**
- [ ] Validation catches this
- [ ] User informed
- [ ] No orphaned data

---

### 20. Time Zone Issues ✅
**Steps:**
1. User in different timezone
2. Reserve slot
3. Check if time stored correctly

**Expected:**
- Times stored in UTC
- Display in user's timezone
- No confusion

**Verify:**
- [ ] UTC storage
- [ ] Correct display
- [ ] No timezone bugs

---

## Automated Test Script

```bash
# Run all tests
npm run test:slot-locking

# Or manually:
# 1. Start backend
# 2. Start frontend
# 3. Run test suite
```

---

## Success Criteria
- ✅ All 20 test cases pass
- ✅ No double bookings possible
- ✅ No race conditions
- ✅ Graceful error handling
- ✅ Performance acceptable
- ✅ No memory leaks
- ✅ Database cleanup works

---

**Test Status:** 🔄 Ready for Testing
**Last Updated:** 2026-02-27

