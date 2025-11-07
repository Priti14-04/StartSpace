import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { postLogin, postSignup } from "./controllers/user.js";
import { postIdea, getIdea } from "./controllers/Idea.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// app.get("/api/request-count",(req,res)=>{
//     res.json({requestCount});
// })


// app.use((req,res,next)=>{
//     requestCount++;
//     next();
// })

app.get("/", (req, res) => {
  res.json({ success: true, message: "server is up...." });
});


// const checkHeaderKey = (req, res, next) => {
//   const { api_token } = req.headers;
//   console.log("Checking API Key:", api_token);

//   if (api_token === "admin") {
//     console.log("API key valid");
//     next();
//   } else {
//     console.log("Key invalid");
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };

// app.use(checkHeaderKey);

app.post("/signup" , postSignup);
app.post("/login" , postLogin);
app.get("/idea",  getIdea);
app.post("/idea" ,postIdea);



const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
