import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);        // public: list posts
router.post("/", protect, createPost); // create post only for logged-in users

export default router;
