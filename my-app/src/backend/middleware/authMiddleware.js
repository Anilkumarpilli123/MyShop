// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
   // 1. Check multiple possible auth header locations
  const authHeader = req.headers["authorization"] || req.headers['Authorization'];
  if (!authHeader) return res.status(401).json({ message: "Authorization header missing", solution: "Include 'Authorization: Bearer <token>' header" });

    // 2. Extract token safely
   const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ 
      message: "Invalid authorization format",
      correctFormat: "Bearer <token>" 
    });
  }

  const token = parts[1];
   
    // 3. Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid or expired token",
        action: "Please login again"
      });
    }
     
      
     // 4. Attach user to request
     req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    next();
  });
};

module.exports = verifyToken;
