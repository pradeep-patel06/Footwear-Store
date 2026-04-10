const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },

  products: [
    {
      productId: Number,
      title: String,
      price: Number,
      quantity: Number,
      img: String
    }
  ],

  payment_id: String,
  razorpay_order_id: String,
  amount: Number,

  status: {
  type: String,
  enum: ["Processing", "Shipped", "Delivered", "Cancelled", "Refunded",],
  default: "Processing"
},

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);