require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const cors = require("cors");
const path = require("path");

const app = express();


app.use(express.json());
app.use(cors());


app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});


app.use(express.static(path.join(__dirname, "public")));




const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


const cartRoutes = require("./routes/cart");
app.use("/api/cart", cartRoutes);


const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);


const auth = require("./middleware/auth");


const Order = require("./models/order");
const Cart = require("./models/Cart");


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected "))
  .catch(err => console.log(err));


const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});


app.post("/create-order", auth, async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: req.body.amount,
      currency: "INR"
    });

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating order");
  }
});


app.post("/save-order", auth, async (req, res) => {
  try {
    const { payment_id, order_id, amount, products } = req.body;

    let finalProducts = [];

    if (products && products.length > 0) {
      finalProducts = products;
    } else {
      const cart = await Cart.findOne({ userId: req.user.id });

      if (cart && cart.products.length > 0) {
        finalProducts = cart.products;

        cart.products = [];
        await cart.save();
      }
    }

    const newOrder = new Order({
      userId: req.user.id,
      products: finalProducts,
      payment_id,
      razorpay_order_id: order_id,
      amount,
      status: "Delivered"
    });

    await newOrder.save();

    res.json({ message: "Order Saved " });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving order");
  }
});


app.get("/api/orders", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({ date: -1 });
  res.json(orders);
});


app.post("/api/orders/cancel", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.body.orderId,
      userId: req.user.id
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({ message: "Order Cancelled " });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error cancelling order" });
  }
});


app.post("/api/orders/refund", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.body.orderId,
      userId: req.user.id
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await razorpay.payments.refund(order.payment_id, {
      amount: order.amount
    });

    order.status = "Refunded";
    await order.save();

    res.json({ message: "Refund Successful 💰" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Refund failed " });
  }
});


app.get("/", (req, res) => {
  res.send("Server Working ");
});


app.listen(5000, () => {
  console.log("Server running on port 5000 ");
});