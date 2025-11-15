import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createIdea } from "../controllers/ideaController.js";

const router = express.Router();

router.post("/", authMiddleware, createIdea);

export default router;
