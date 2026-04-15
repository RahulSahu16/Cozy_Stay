import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    roomsBooked: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "failed"],
      default: "pending",
    },

    paymentId: {
      type: String,
    },

    orderId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);