// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");               
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const router = express.Router();

// --- Mail transport (use Gmail App Password) ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   
    pass: process.env.EMAIL_PASS,   
  },
});

// ===== SIGNUP =====
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, phone, gender } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists with this email" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, phone, gender });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", user: { firstName, lastName, email } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ===== LOGIN =====
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ===== FORGOT PASSWORD: send OTP =====
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save(); 

    await transporter.sendMail({
      from: `"My Shop Support" <${process.env.EMAIL_USER}>`, // your Gmail as sender
      to: user.email, // ✅ OTP goes to the user's email from DB
      subject: "Password Reset OTP",
      text: `Hi ${user.firstName},\n\nYour OTP is ${otp}. It will expire in 5 minutes.\n\nIf you didn’t request this, ignore this email.`,
    });

    // await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to process password reset", error: error.message });
  }
});

// (Optional) Separate OTP verification endpoint if your UI needs it
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.resetOtp || !user.resetOtpExpiry) {
      return res.status(400).json({ message: "No OTP found" });
    }

    if (user.resetOtp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (Date.now() > user.resetOtpExpiry) return res.status(400).json({ message: "OTP expired" });

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ===== RESET PASSWORD (validates OTP again) =====
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.resetOtp !== otp || Date.now() > user.resetOtpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Failed to reset password", error: error.message });
  }
});

module.exports = router;
