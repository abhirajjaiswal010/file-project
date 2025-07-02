import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import Payment from "../models/payment.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const router = express.Router();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route 1: Create order
router.post("/order", async (req, res) => {
  const { amount } = req.body;
  try {
    const order = await razorpayInstance.orders.create({
      amount: Number(amount * 100),
      currency: "INR",
      receipt: uuidv4(),
    });
    res.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// Route 2: Verify payment
router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name,
    email,
    phone,
    branch,
    year,
    quantity,
  } = req.body;

  try {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment fields" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const payment = new Payment({
      name,
      email,
      phone,
      branch,
      year,
      quantity,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    await payment.save();
    res.json({ success: true, message: "Payment verified and saved" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: "Server error during payment verification" });
  }
});

export default router;
