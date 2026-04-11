import express from "express";
import { signup, login, becomeHost, sendOTP, verifyOTP } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { testEmail } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/test-mail", testEmail);
router.patch("/become-host", protect, becomeHost);

export default router;