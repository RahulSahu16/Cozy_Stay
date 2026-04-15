import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

console.log("🔧 Razorpay Config - Environment Check:");
console.log("  ✓ RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID ? "✅ SET" : "❌ NOT SET");
console.log("  ✓ RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "✅ SET" : "❌ NOT SET");

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn("⚠️  WARNING: Razorpay keys are not configured!");
  console.warn("   Add these to your .env file:");
  console.warn("   RAZORPAY_KEY_ID=your_key_id");
  console.warn("   RAZORPAY_KEY_SECRET=your_key_secret");
}

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("✅ Razorpay instance initialized");

