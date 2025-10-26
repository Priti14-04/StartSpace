import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { title, body } = req.body;
  try {
    const post = await Post.create({ title, body, author: req.user._id });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email").sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
