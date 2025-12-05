import express from "express";
import { postIdea, getIdea } from "../controllers/Idea.js";

const router = express.Router();

// GET all ideas
router.get("/", getIdea);

// CREATE idea
router.post("/", postIdea);

export default router;
