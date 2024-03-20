import { Router } from "express";
import * as Card from "./facade/controllers/CardsController.js";
import * as User from "./facade/controllers/UsersController.js";

const router = Router();

router.get("/cards", Card.index);
router.get("/cards/:id", Card.show);

router.get("/users/:id", User.show);
router.post("/users", User.create);
router.put("/users/:id", User.update);
router.post("/users/authenticate", User.authenticate);
router.post("/users/logout", User.logout);


export default router;