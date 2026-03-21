require("dotenv").config();

const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});

app.post("/create-order", async (req, res) => {

  try {

    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: "order_rcptid_11"
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating order");
  }

});

app.get("/", (req, res) => {
  res.send("Server Working ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});