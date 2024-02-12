import { Router } from "express";
import {
    index,
    show,
    add,
    edit,
    create,
    update,
    remove
} from "../controllers/CardsController.js";
import { isAuthenticated } from "../controllers/AuthenticationController.js";
import cors from "cors";

// Creates a router
const router = Router();

const corsOptions = {
    origin: process.env.HOST || "http://localhost",
    optionsSuccessStatus: 200
};

// Defines routes and associates them with controller actions
router.use(isAuthenticated);
router.get("/", index);
router.get("/new", cors(corsOptions), add);
router.get("/:id", show);
router.get("/:id/edit", cors(corsOptions), edit);
router.post("/", cors(corsOptions), create);
router.put("/:id", cors(corsOptions), update);
router.delete("/:id", cors(corsOptions), remove);

export default router;
