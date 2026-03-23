const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  amount: Number,
  razorpay_order_id: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);