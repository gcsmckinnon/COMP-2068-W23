import { login, authenticate, logout, isAuthenticated } from "../controllers/AuthenticationController.js";
import { add } from "../controllers/UsersController.js";
import { Router } from "express";

const router = Router();

router.get("/login", login);
router.post("/authenticate", authenticate)
router.get("/logout", isAuthenticated, logout);
router.get("/register", add)

export default router;