import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import Payment from "../models/payment.js";

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
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ data: order });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Something went wrong while creating order" });
  }
});

// Route 2: Verify payment
router.post("/verify", async (req, res) => {
  console.log("Verify request body:", req.body);  // Log incoming data

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

  // Basic validation of required fields
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Missing required Razorpay payment fields",
    });
  }

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;
    console.log("Signature verified:", isAuthentic);

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
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
    return res.status(200).json({
      success: true,
      message: "Payment verified and saved",
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,   // Include error message for better debugging
    });
  }
});

export default router;
