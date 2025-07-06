// routes/notifyOwner.js
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    name,
    email,
    phone,
    branch,
    year,
    quantity,
    paymentMode,
    totalAmount,
    razorpay_order_id,
    razorpay_payment_id,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_PASS, // owner's email
    subject: `New Order Received: ${paymentMode}`,
  html: `
  <div style="
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
    max-width: 600px; 
    margin: auto; 
    padding: 20px; 
    border: 1px solid #ddd; 
    border-radius: 8px; 
    background: #f9f9f9; 
    color: #333;
    box-shadow: 0 0 8px rgba(0,0,0,0.05);
  ">
    <h3 style="
      text-align: center; 
      color: #004aad; 
      margin-bottom: 20px; 
      border-bottom: 2px solid #004aad; 
      padding-bottom: 10px;
      font-weight: 700;
    ">
      New Order Alert (${paymentMode})
    </h3>

    <table style="width: 100%; border-collapse: collapse;">
      <tbody>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Branch:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${branch}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Year:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${year}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Files:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${quantity}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Total Amount:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹${totalAmount}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Order ID:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${razorpay_order_id}</td>
        </tr>
        ${
          razorpay_payment_id
            ? `<tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Payment ID:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${razorpay_payment_id}</td>
              </tr>`
            : ""
        }
      </tbody>
    </table>

    <p style="margin-top: 30px; font-style: italic; text-align: center; color: #555;">
      Check the admin panel for more details.
    </p>
  </div>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Owner notified successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to notify owner.", error });
  }
});

export default router;
