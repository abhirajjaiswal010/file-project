import connectToMongo from "./Database/db.js";
import express from 'express';
import cors from 'cors';
import payment from "./routes/payment.js";

const app = express();
const port = process.env.PORT || 4000; // allow Vercel to inject PORT

// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('abhiraj');
});

app.use('/api/payment', payment);

// ✅ Ensure DB connection before accepting requests
const startServer = async () => {
  try {
    await connectToMongo();
    app.listen(port, () => {
      console.log(`✅ Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

startServer();
