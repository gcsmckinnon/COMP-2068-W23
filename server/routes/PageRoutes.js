import { Router } from "express";
import { home, insult } from "../controllers/PagesController.js";

const router = Router();

router.get("/", home);
router.get("/insult", insult);

export default router;
