import { Router } from "express";
import { index as cardIndex, show as cardShow } from "../controllers/CardsController.js";
import { show as userShow, create as userCreate, update as userUpdate } from "../controllers/UsersController.js";
import { authenticate as userAuthenticate, logout as userLogout } from "../controllers/AuthenticationController.js";
import { requestToken, authenticate as applicationAuthenticate } from "../controllers/ApplicationsController.js";
import { upload } from "./UserRoutes.js";

// Creates a router
const router = Router();

// Defines routes and associates them with controller actions
router.post("/authenticate", requestToken);
router.get("/cards", applicationAuthenticate, cardIndex);
router.get("/cards/:id", applicationAuthenticate, cardShow);
router.get("/users/:id", applicationAuthenticate, userShow);
router.post("/users", applicationAuthenticate, upload.single("avatar"),  userCreate);
router.put("/users/:id", applicationAuthenticate, upload.single("avatar"), userUpdate);
router.post("/users/authenticate", applicationAuthenticate, userAuthenticate);
router.post("/users/logout", applicationAuthenticate, userLogout);

export default router;
