const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      productId: Number,
      title: String,
      price: Number,
      img: String,
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);