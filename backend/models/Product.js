const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },   // store image URL
  category: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
