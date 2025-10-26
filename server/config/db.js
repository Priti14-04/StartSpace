import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // URI from .env
    console.log(`MongoDB connected: ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;
