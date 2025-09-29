import express from "express";
import { signupUser, loginUser } from "../controllers/authController.js";

const router = express.Router();
// POST /api/v1/auth/signup
router.post("/signup", signupUser);

// POST /api/v1/auth/login
router.post("/login", loginUser);

export default router;
