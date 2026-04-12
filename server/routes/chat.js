import express from "express";
import { chatWithModel } from "../controllers/chatControllers.js";

const router = express.Router();

router.post("/chat", chatWithModel);

export default router;