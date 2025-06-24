import { connect } from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Async function to connect to MongoDB Atlas
const connectToMongo = async () => {
  try {
    await connect(process.env.MONGO_URI, {
      dbName: "paymentGateway",        // Optional, but recommended
      useNewUrlParser: true,           // Needed for new URL parser
      useUnifiedTopology: true,        // Required for stable connection
    });
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};

export default connectToMongo;
