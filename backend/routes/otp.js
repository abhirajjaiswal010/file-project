import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Temporary in-memory store for OTPs
const otpStore = new Map();

// Reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 20,
});

// Send OTP
router.post("/send", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 1 * 60 * 1000; // 5 minutes expiry

  otpStore.set(email, { otp: generatedOtp, expiresAt });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your SVCE Shop OTP Code",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2 style="text-align: center;">Email Verification</h2>
        <p>Hello,</p>
        <p>Please use the following <strong>OTP</strong> to verify your email:</p>
        <p style="font-size: 24px; text-align: center; font-weight: bold;">${generatedOtp}</p>
        <p>This OTP will expire in 5 minutes.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${generatedOtp}`);
    res.json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP." });
  }
});

// Verify OTP
router.post("/verify", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ success: false, message: "Email and OTP are required." });

  const record = otpStore.get(email);
  if (!record)
    return res.status(400).json({ success: false, message: "No OTP found for this email." });

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one." });
  }

  if (otp !== record.otp)
    return res.status(400).json({ success: false, message: "Invalid OTP." });

  otpStore.delete(email);
  res.json({ success: true, message: "OTP verified successfully." });
});

export default router;
