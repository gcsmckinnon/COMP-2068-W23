import { Router } from "express";
import { home, insult } from "../controllers/PagesController.js";

// Creates a router
const router = Router();

// Defines routes and associates them with controller actions
router.get("/", home);
router.get("/insult", insult);

export default router;
