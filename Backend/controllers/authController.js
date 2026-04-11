import User from "../models/User.js";
import OTP from "../models/otpModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";


// =======================
// 📩 SEND OTP
// =======================
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = email.toLowerCase();
    console.log("EMAIL FROM FRONTEND:", normalizedEmail);
    console.log("🔥 sendOTP route hit");

    // 1. check if user already exists
    console.log("Checking existing user...");
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. delete old OTP (important)
    console.log("Deleting old OTPs...");
    await OTP.deleteMany({ email: normalizedEmail });

    // 3. generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp);

    // 4. expiry (5 min)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    console.log("Expires at:", expiresAt);

    // 5. save in DB
    console.log("Saving OTP to DB...");
    await OTP.create({
      email: normalizedEmail,
      otp,
      expiresAt,
      isVerified: false,
    });
    console.log("OTP saved");

    // 6. send email
    console.log("Sending email...");
    await sendEmail(
      normalizedEmail,
      "Your OTP Code",
      `Your OTP is: ${otp}`
    );
    console.log("Email sent");

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    console.error("Error in sendOTP:", err);
    res.status(500).json({ error: err.message });
  }
};


// =======================
// ✅ VERIFY OTP
// =======================
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const normalizedEmail = email.toLowerCase();
    console.log("Verifying OTP for:", normalizedEmail, "OTP:", otp);

    const record = await OTP.findOne({ email: normalizedEmail, otp });
    console.log("OTP record found:", !!record);

    if (!record) {
      console.log("Invalid OTP");
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      console.log("OTP expired");
      return res.status(400).json({ message: "OTP expired" });
    }

    // mark verified
    record.isVerified = true;
    await record.save();
    console.log("OTP verified and saved");

    res.json({ message: "OTP verified successfully" });

  } catch (err) {
    console.error("Error in verifyOTP:", err);
    res.status(500).json({ error: err.message });
  }
};


// =======================
// 🧑‍💻 SIGNUP (AFTER OTP)
// =======================
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();
    console.log("Signup attempt for:", normalizedEmail);

    // 1. check OTP verified
    const otpRecord = await OTP.findOne({ email: normalizedEmail, isVerified: true });
    console.log("OTP verified record:", !!otpRecord);

    if (!otpRecord) {
      console.log("OTP not verified");
      return res.status(400).json({ message: "Verify OTP first" });
    }

    // 2. check if already user exists (extra safety)
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. hash password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. create user
    console.log("Creating user...");
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });
    console.log("User created:", user._id);

    // 5. delete OTP after use (clean DB)
    await OTP.deleteMany({ email: normalizedEmail });

    // 6. generate token (auto login 🔥)
    console.log("Generating token...");
    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 7. remove password from response
    const { password: _, ...safeUser } = user._doc;

    console.log("Signup successful");
    res.status(201).json({
      message: "Signup successful",
      token,
      user: safeUser,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// =======================
// 🔐 LOGIN
// =======================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // 2. check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3. token
    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. remove password
    const { password: _, ...safeUser } = user._doc;

    res.json({
      message: "Login successful",
      token,
      user: safeUser,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// =======================
// 🏠 BECOME HOST
// =======================
export const becomeHost = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { roles: "host" } },
      { new: true }
    );

    res.json({
      message: "Now you are a host",
      user,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const testEmail = async (req, res) => {
  try {
    console.log("🔥 Test email route hit");

    await sendEmail(
      "rahulssahu1116@gmail.com", // apna email
      "Test Email 🚀",
      "Bhai agar ye mail aa gaya to system sahi hai"
    );

    res.json({ message: "Test email sent" });

  } catch (error) {
    console.log("Test error:", error);
    res.status(500).json({ error: error.message });
  }
};