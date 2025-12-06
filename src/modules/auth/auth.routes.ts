import { Router } from "express";
import { authController } from "./auth.controllers";

const router = Router();

// http://localhost:5000/api/v1/auth/signin
router.post("/signin", authController.signinUser);

// http://localhost:5000/api/v1/auth/signup
router.post("/signup", authController.signUpUser);

export const authRoutes = router;