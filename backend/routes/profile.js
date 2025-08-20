const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains userId
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

// === UPDATE PROFILE Route ===
router.post('/updateProfile', verifyToken, async (req, res) => {
  // 1. Validate required fields
  const { firstName, lastName, email, phone, gender } = req.body;
  
  if (!firstName?.trim()) {
    return res.status(400).json({ message: "First name is required" });
  }

  if (!email?.trim()) {
    return res.status(400).json({ message: "Email is required" });
  }

  // 2. Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // 3. Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        firstName: firstName.trim(),
        lastName: lastName?.trim() || '',
        email: email.trim(),
        phone: phone?.trim() || '',
        gender: gender?.trim() || ''
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4. Return success response
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Update error:", error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Email already exists",
        solution: "Please use a different email address"
      });
    }
    
    res.status(500).json({ 
      message: "Server error during update",
      error: error.message 
    });
  }
}); 


module.exports = router;
