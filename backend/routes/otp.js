import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

let generatedOtp = ""; // In production, store in DB with expiry and user reference

router.post("/send", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  // Generate a 6-digit OTP
  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

  // Setup nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your SVCE shop OTP Code",
    html: `
  <div style="
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
    max-width: 600px; 
    margin: auto; 
    padding: 30px; 
    border-radius: 12px; 
    background: url('https://raw.githubusercontent.com/abhirajjaiswal010/file-project/main/frontend/src/assets/school.jpg') no-repeat center center / cover; 
    color: #374151; /* dark pastel text */
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  ">
    <div style="background: rgba(255, 255, 255, 0.85); padding: 30px; border-radius: 12px;">

      <img src="https://raw.githubusercontent.com/abhirajjaiswal010/file-project/main/frontend/src/assets/stationary.png" alt="Company Logo" style="width: 160px; display: block; margin: 0 auto 30px auto;" />

      <h2 style="color: #2563EB; font-weight: 700; text-align: center; margin-bottom: 20px;">
        Email Verification
      </h2>

      <p>Hello,</p>

      <p>
        Thank you for your request. Please use the following <strong>OTP</strong> to verify your email address:
      </p>

      <p style="
        font-size: 36px; 
        font-weight: 700; 
        background-color: #bfdbfe; /* pastel light blue */
        color: #1e3a8a; /* dark blue text */
        text-align: center; 
        padding: 20px 0; 
        margin: 30px 0;
        border-radius: 10px;
        letter-spacing: 8px;
        user-select: all;
      ">
        ${generatedOtp}
      </p>

      <p>
        <strong>This code will expire in 5 minutes.</strong>
      </p>

      <p>
        If you did not request this, please ignore this email.
      </p>

      <hr style="margin: 30px 0; border-color: #e5e7eb;" />

      <p style="font-size: 12px; color: #6b7280; text-align: center;">
     © 2025 SVCEFile. All rights reserved.
      </p>
    </div>
  </div>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP.", error });
  }
});

router.post("/verify", (req, res) => {
  const { email, otp } = req.body;
  if (otp === generatedOtp) {
    res.json({ message: "OTP verified successfully." });
  } else {
    res.status(400).json({ message: "Invalid OTP." });
  }
});

export default router;
