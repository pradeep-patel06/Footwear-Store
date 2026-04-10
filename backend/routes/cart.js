const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const verify = require("../middleware/verifyToken");


router.post("/add", verify, async (req, res) => {
  const { product } = req.body;

  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({
      userId: req.user.id,
      products: [product]
    });
  } else {
    const existing = cart.products.find(
      p => p.productId === product.productId
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push(product);
    }
  }

  await cart.save();
  res.json(cart);
});


router.get("/", verify, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.json(cart || { products: [] });
});


router.post("/remove", verify, async (req, res) => {
  const { productId } = req.body;

  let cart = await Cart.findOne({ userId: req.user.id });

  cart.products = cart.products.filter(
    p => p.productId !== productId
  );

  await cart.save();
  res.json(cart);
});

module.exports = router;