import express from "express";
import { createBooking, initiatePayment, verifyPayment } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createBooking);
router.post("/initiate-payment", protect, initiatePayment);
router.post("/verify-payment", protect, verifyPayment);

export default router;