import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    res.json(req.user); // thanks to protect middleware
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
