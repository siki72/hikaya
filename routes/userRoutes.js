import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authControllers.js";
import { findUser, getUsers } from "../controllers/userControllers.js";
const router = express.Router();

// ------------------------------------------
//       Authentification
// ------------------------------------------
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// ------------------------------------------
//       user
// ------------------------------------------

router.get("/find/:userId", findUser);
router.get("/findall/users", getUsers);

export default router;
