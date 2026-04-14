import express from "express";
import { chatWithModel, getModels } from "../controllers/chatControllers.js";

const router = express.Router();

router.post("/chat", chatWithModel);

router.get("/models", getModels);

export default router;