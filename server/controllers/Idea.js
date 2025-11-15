import Idea from "../models/Idea.js";
import jwt from "jsonwebtoken";

const postIdea = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ success: false, message: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Invalid authorization format" });

    let decoded;
    try { decoded = jwt.verify(token, process.env.JWT_SECRET); } 
    catch { return res.status(401).json({ success: false, message: "Invalid or expired token" }); }

    const authorId = decoded?.id;
    if (!authorId) return res.status(401).json({ success: false, message: "Invalid token payload" });

    if (!title || !category || !content) return res.status(400).json({ success: false, message: "All fields are required" });

    const newIdea = new Idea({ title, category, content, author: authorId });
    const savedIdea = await newIdea.save();

    res.status(201).json({ success: true, message: "Idea created successfully", idea: savedIdea });
  } catch (error) {
    console.error("postIdea error:", error);
    res.status(500).json({ success: false, message: "Failed to create idea" });
  }
};

const getIdea = async (req, res) => {
  try {
    const { author, status } = req.query;
    let filter = {};
    if (author) filter.author = author;
    if (status) filter.status = status;
    else if (!author) filter.status = "published";

    const ideas = await Idea.find(filter)
      .populate("author", "_id name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: ideas, message: "Ideas fetched successfully" });
  } catch (error) {
    console.error("getIdea error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch ideas" });
  }
};

export { postIdea, getIdea };
