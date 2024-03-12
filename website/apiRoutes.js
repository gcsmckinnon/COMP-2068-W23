import { Router } from "express";
import * as Card from "./facade/controllers/CardsController.js";

const router = Router();

router.get("/cards", Card.index);
router.get("/cards/:id", Card.show);

export default router;