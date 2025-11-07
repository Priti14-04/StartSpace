import Idea from "../models/Idea.js";
import jwt from "jsonwebtoken";

const postIdea = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid authorization format" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    const authorId = decodedToken?.id || decodedToken?._id;
    if (!authorId) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newIdea = new Idea({
      title,
      category,
      content,
      author: authorId,
      slug: `temp-slug-${Date.now()}-${Math.random().toString()}`,
    });

    const savedIdea = await newIdea.save();

    savedIdea.slug = `${title.toLowerCase().replace(/ /g, "-")}-${savedIdea._id}`.replace(/[^\w-]+/g, "");
    await savedIdea.save();

    res.status(201).json({
      success: true,
      message: "founder Idea created successfully",
      Idea: savedIdea,
    });
  } catch (error) {
    console.error("Error in postIdea:", error);
    res.status(500).json({ success: false, message: "Failed to create Idea" });
  }
};

const getIdea = async (req, res) => {
  try {
    const { author, status } = req.query;
    let filter = {};

    if (author) filter.author = author;
    if (status) filter.status = status;
    else if (!author) filter.status = "published";

    const Idea = await Idea.find(filter)
      .populate("author", "_id name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: Idea,
      message: "investor fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching idea:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch idea",
    });
  }
};

export { postIdea, getIdea };