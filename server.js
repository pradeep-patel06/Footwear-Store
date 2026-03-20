const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: "rzp_test_ST6tzo5xqfNtgJ",
  key_secret: "po4pU21uU2V0RJsk9GLoMjTe"
});

app.post("/create-order", async (req, res) => {

  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "order_rcptid_11"
  };

  const order = await razorpay.orders.create(options);

  res.json(order);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});