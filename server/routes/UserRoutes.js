import multer from "multer";
import crypto from "crypto";
import { Router } from "express";
import { index, show, add, edit, create, update, remove } from "../controllers/UsersController.js";
import { isAuthenticated } from "../controllers/AuthenticationController.js";

// Creates a router
const router = Router();

const tempStorageLocation = "temp";
const storage = multer.diskStorage({
    destination: (_, __, callback) => {
        callback(null, tempStorageLocation);
    },
    filename: (req, file, callback) => {
        const filename = `${generateRandomHexKey()}-${file.originalname}`;
        callback(null, filename);
    },
});

const upload = multer({ storage });

// Deal with issues of methods
const requestCheck = (req, _, next) => {
    if (req.method === "post") {
        if (req.body._method && req.body._method === "put") {
            req.method === "put";
        }
    }

    next();
};

// Defines routes and associates them with controller actions
router.get("/", isAuthenticated, index);
router.get("/new", add);
router.get("/:id", isAuthenticated, show);
router.get("/:id/edit", isAuthenticated, edit);
router.post("/", isAuthenticated, upload.single("avatar"), create);

// Handle issue with multipart forms not having detectable fields unless they've gone through multer
router.post("/:id", (req, res, next) => {
    req.method = "put";
    next();
});

router.put("/:id", isAuthenticated, upload.single("avatar"), update);

router.delete("/:id", isAuthenticated, remove);

export default router;

function generateRandomHexKey() {
    return crypto.randomBytes(8 / 2).toString("hex");
}
