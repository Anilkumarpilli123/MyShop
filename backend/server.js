require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require("./routes/auth");
const profileRoutes = require('./routes/profile');
const contactRoutes = require('./routes/contact'); 
const productRoutes = require("./routes/products");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Middleware first
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://myshop-couj.onrender.com",   // your backend
    "https://myshop-frontend-slb4.onrender.com" // your frontend
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/products', productRoutes);

// ✅ Protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

// ✅ Simple test
app.post('/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    // Start server after DB connects
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Logging middleware (afterwards)
app.use((req, res, next) => {
  console.log(`🛎 ${req.method} ${req.url}`); 
  next();
});
// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error occurred:", err);
  res.status(500).json({ message: "Internal server error" });
});