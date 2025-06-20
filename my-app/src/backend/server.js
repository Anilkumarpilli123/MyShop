require('dotenv').config();
const express = require('express');
const authRoutes = require("./routes/auth");
const mongoose = require('mongoose');
const cors = require('cors');
const profileRoutes = require('./routes/profile');
// const bodyParser = require("body-parser");

const contactRoutes = require('./routes/contact'); 
// const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api', require('./routes/profile'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

  app.use((req, res, next) => {
  console.log(`🛎 ${req.method} ${req.url}`);
  next();
});

// Auth route

app.use("/api/auth", authRoutes);

// Protected Route Example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

// Test Route
app.post('/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
