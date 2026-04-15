# Razorpay Payment Integration Setup Guide

## Issues Fixed:
1. ✅ **"Cannot read properties of undefined (reading 'id')" error** - Fixed by:
   - Adding Authorization header to booking API request in HomeDetails.jsx
   - Applying `protect` middleware to booking routes
   - Adding token validation before API call

2. ✅ **Razorpay Payment System Added** - Includes:
   - Backend payment endpoints for order creation and verification
   - Razorpay signature verification
   - Integration with booking system

## Setup Instructions:

### 1. Get Razorpay API Keys
- Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
- Sign up or log in with your account
- Navigate to Settings → API Keys
- Copy your **Key ID** and **Key Secret**

### 2. Update Backend .env File
Replace the placeholders in `Backend/.env`:

```env
RAZORPAY_KEY_ID=rzp_test_xxxxx  # Your actual Key ID
RAZORPAY_KEY_SECRET=xxxxx        # Your actual Key Secret
```

### 3. Test Cards for Razorpay (Sandbox Mode)
Use these test card details when making test payments:

**Success Cases:**
- Card Number: `4111 1111 1111 1111`
- Expiry: Any future month/year (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

**Failed Transaction:**
- Card Number: `4000 0000 0000 0002`
- Expiry: Any future month/year
- CVV: Any 3 digits

### 4. Payment Flow
1. User clicks "Reserve Now" on property details page
2. System creates a booking record
3. Razorpay order is initiated
4. Razorpay checkout modal opens
5. User enters payment details
6. Payment is verified on backend
7. Booking status changes to "confirmed"
8. Property rooms count decreases

### 5. Verification Steps
- Login to your account
- Navigate to a property details page
- Click "Reserve Now"
- Complete payment with test card
- Check MongoDB Bookings collection for confirmation

## Files Modified:
- ✅ `Frontend/src/pages/HomeDetails.jsx` - Added Razorpay integration
- ✅ `Frontend/index.html` - Added Razorpay script
- ✅ `Frontend/src/components/Auth/Login.jsx` - Save user email to localStorage
- ✅ `Backend/routes/bookingRoutes.js` - Added auth middleware and payment routes
- ✅ `Backend/controllers/bookingController.js` - Added payment endpoints
- ✅ `Backend/config/razorpay.js` - Created Razorpay config
- ✅ `Backend/.env` - Added Razorpay keys

## Troubleshooting:

**Error: "Cannot read properties of undefined"**
- Make sure you're logged in before clicking "Reserve Now"
- Check that authorization token is being sent in API request

**Error: "Razorpay is not defined"**
- Ensure Razorpay script is loaded in index.html
- Clear browser cache and refresh

**Payment fails**
- Use test cards provided above
- Check Razorpay API keys are correct
- Verify Key Secret is not exposed in frontend

**Booking not confirmed**
- Check signature verification logic
- Verify order ID matches
- Check backend logs for errors

## Testing Checklist:
- [ ] Login with valid credentials
- [ ] Navigate to property details
- [ ] Click "Reserve Now"
- [ ] Razorpay modal opens
- [ ] Complete payment with test card
- [ ] Booking shows as "confirmed" in database
- [ ] Property rooms count decreases

---
**For Production:** Replace test keys with live Razorpay keys from your production account.
