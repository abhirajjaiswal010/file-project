import connectToMongo from "./Database/db.js";
import express from 'express';
import cors from 'cors';
import payment from "./routes/payment.js";
import otpRoutes from "./routes/otp.js";
import notifyOwner from "./routes/notifyOwner.js";
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB with logs
connectToMongo()
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));

// Test route
app.get('/', (req, res) => {
    res.send('✅ Backend is live - Abhiraj');
});

// Routes
app.use('/api/payment', payment);
app.use('/api/otp', otpRoutes); // ⬅️ Added OTP route

app.use("/api/notify-owner", notifyOwner);

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
