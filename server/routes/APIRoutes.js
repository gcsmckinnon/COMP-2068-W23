import { Router } from "express";
import { index as cardIndex, show as cardShow } from "../controllers/CardsController.js";
import { show as userShow, create as userCreate, update as userUpdate } from "../controllers/UsersController.js";
import { authenticate as userAuthenticate, logout as userLogout } from "../controllers/AuthenticationController.js";
import { requestToken, authenticate as applicationAuthenticate } from "../controllers/ApplicationController.js";
import { upload } from "./UserRoutes.js";

const router = Router();

router.use((req, res, next) => {
    if (req.headers["accept"] !== "application/json") {
        req.headers["accept"] = "application/json";
        res.status(406);
        const error = new Error("NOT ACCEPTABLE");
        error.status = 406;
        next(error);
    }

    next();
});
router.post("/authenticate", requestToken);

router.get("/cards", applicationAuthenticate, cardIndex);
router.get("/cards/:id", applicationAuthenticate, cardShow);

router.get("/users/:id", applicationAuthenticate, userShow);
router.post("/users", applicationAuthenticate, upload.single("avatar"), userCreate);
router.put("/users/:id", applicationAuthenticate, upload.single("avatar"), userUpdate);
router.post("/users/authenticate", applicationAuthenticate, userAuthenticate);
router.post("/users/logout", applicationAuthenticate, userLogout);


export default router;