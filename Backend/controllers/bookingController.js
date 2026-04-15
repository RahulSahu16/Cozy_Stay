import Booking from "../models/Booking.js";
import Property from "../models/Property.js";
import { razorpayInstance } from "../config/razorpay.js";
import crypto from "crypto";

export const createBooking = async (req, res) => {
  try {
    const { propertyId, roomsBooked } = req.body;

    // 1. Property fetch karo
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // 2. Check rooms available
    if (property.totalRooms < roomsBooked) {
      return res.status(400).json({
        message: "Not enough rooms available",
      });
    }

    // 3. Price calculate karo
    const totalPrice = property.price * roomsBooked;

    // 4. Booking create (pending)
    const booking = await Booking.create({
      userId: req.user.id, // auth middleware se aayega
      propertyId,
      roomsBooked,
      totalPrice,
    });

    res.status(201).json({
      message: "Booking created",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Initiate Razorpay Payment
export const initiatePayment = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;

    console.log("📥 Initiate Payment Request:", { bookingId, amount });
    console.log("🔑 Razorpay Keys Check:", {
      hasKeyId: !!process.env.RAZORPAY_KEY_ID,
      hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET,
    });

    if (!bookingId || !amount) {
      return res.status(400).json({ message: "Missing bookingId or amount" });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("❌ Razorpay keys not configured in .env");
      return res.status(500).json({ 
        message: "Payment service not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env" 
      });
    }

    // Check if booking exists and belongs to user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Create Razorpay Order
    const options = {
      amount: Math.round(amount * 100), // Amount in paise
      currency: "INR",
      receipt: `booking_${bookingId}`,
      payment_capture: 1, // Auto capture
    };

    console.log("📦 Creating Razorpay order with options:", options);

    let order;
    try {
      order = await razorpayInstance.orders.create(options);
      console.log("✅ Razorpay order created:", order);
    } catch (razorpayError) {
      console.error("❌ Razorpay API Error:", razorpayError);
      return res.status(500).json({ 
        message: `Failed to create payment order: ${razorpayError.message}`,
        error: razorpayError.toString()
      });
    }

    // Save order ID in booking
    booking.orderId = order.id;
    await booking.save();

    res.status(201).json({
      message: "Order created successfully",
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error("❌ Razorpay Error:", error);
    res.status(500).json({ 
      message: error.message,
      details: error.toString()
    });
  }
};

// Verify Razorpay Payment
export const verifyPayment = async (req, res) => {
  try {
    const { bookingId, orderId, paymentId, signature } = req.body;

    if (!bookingId || !orderId || !paymentId || !signature) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    // Check if booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Verify signature
    const body = orderId + "|" + paymentId;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Update booking status and payment details
    booking.status = "confirmed";
    booking.paymentId = paymentId;
    booking.orderId = orderId;
    await booking.save();

    // Update property rooms
    const property = await Property.findById(booking.propertyId);
    property.totalRooms -= booking.roomsBooked;
    await property.save();

    res.status(200).json({
      message: "Payment verified successfully",
      booking,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: error.message });
  }
};