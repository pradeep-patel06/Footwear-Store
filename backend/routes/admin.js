const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Order = require("../models/order");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


router.get("/users", auth, admin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});


router.get("/orders", auth, admin, async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });
  res.json(orders);
});

router.post("/order/status", auth, admin, async (req, res) => {
  const { orderId, status } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: "Not found" });
  }

  order.status = status;
  await order.save();

  res.json({ message: "Updated " });
});

module.exports = router;