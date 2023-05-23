import express from "express";
import {
  createChat,
  findChat,
  findUserChats,
  removeChat,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findChat);
router.post("/remove", removeChat);

export default router;
