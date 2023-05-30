import express from "express";
import {
  createMessage,
  getMessages,
  markReadMessages,
} from "../controllers/messageControllers.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessages);
router.post("/update", markReadMessages);

export default router;
