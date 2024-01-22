import { Router } from "express";
import { home } from "../controllers/PagesController.js";

// Creates a router
const router = Router();

// Defines routes and associates them with controller actions
router.get("/", home);

export default router;
