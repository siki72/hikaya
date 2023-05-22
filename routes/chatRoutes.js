import express from "express";
import {
  createChat,
  findChat,
  findUserChats,
} from "../controllers/chatControllers.js";

const router = express.Router();

// ------------------------------------------
//       Authentification
// ------------------------------------------

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findChat);

export default router;
