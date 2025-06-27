import connectToMongo from "./Database/db.js";
import express from 'express';
import cors from 'cors';
import payment from "./routes/payment.js";

// Connect to MongoDB with logs
connectToMongo()
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const app = express();

// Use the correct port for Render deployment
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*", // or "https://your-frontend-domain.com" for stricter security
    methods: ["GET", "POST"]
}));

// Test route
app.get('/', (req, res) => {
    res.send('✅ Backend is live - Abhiraj');
});

// Payment routes
app.use('/api/payment', payment);

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
