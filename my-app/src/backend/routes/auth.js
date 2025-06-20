const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require('nodemailer');
const router = express.Router();
const rateLimit = require('express-rate-limit');


// const JWT_SECRET = 'your_jwt_secret';
// const CLIENT_ID = 'your_google_client_id';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: { 
    user: process.env.EMAIL_USER || 'anilkumarpilli333@gmail.com',
    pass: process.env.EMAIL_PASS || 'Anil@123'
  },
});

// const forgotPasswordLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   // max: 3, // limit each IP to 3 requests per windowMs
//   message: 'Too many password reset requests from this IP, please try again later'
// });

// === SIGNUP Route ===
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, phone, gender } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, phone, gender });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", user: { firstName, lastName, email } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// === LOGIN Route ===
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, gender: user.gender },
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

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send email logic here...
    
    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Failed to process password reset', error: error.message });
  }
});


// Add this as a new route or replace existing
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Failed to reset password', error: error.message });
  }
});
module.exports = router;
