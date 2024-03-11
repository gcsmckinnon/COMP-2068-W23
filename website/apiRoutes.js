import { Router } from "express";
import { index as cardIndex, show as cardShow } from "./facade/controllers/CardsController.js";

const router = Router();

router.get("/cards", cardIndex);
router.get("/cards/:id", cardShow);

export default router;