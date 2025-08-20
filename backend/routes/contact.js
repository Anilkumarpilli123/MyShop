const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.get('/test', (req, res) => {
  res.send("Contact route is working ✅");
});

router.post('/', async (req, res) => {
    console.log("Incoming contact data:", req.body);
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Message received. We'll get back to you!" });
  } catch (err) {
    console.error("❌ Failed to save contact:", err);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

module.exports = router;
