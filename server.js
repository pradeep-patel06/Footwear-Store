require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/footwearDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));


const Order = mongoose.model("Order", {
  payment_id: String,
  razorpay_order_id: String,
  amount: Number
});


const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});


app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount,
      currency: "INR"
    };

    const order = await razorpay.orders.create(options);
    res.json(order);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating order");
  }
});


app.post("/save-order", async (req, res) => {
  try {
    const { payment_id, order_id, amount } = req.body;

    const newOrder = new Order({
      payment_id,
      razorpay_order_id: order_id,
      amount
    });

    await newOrder.save();

    res.send("Order Saved ✅");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving order");
  }
});


app.get("/", (req, res) => {
  res.send("Server Working ✅");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});