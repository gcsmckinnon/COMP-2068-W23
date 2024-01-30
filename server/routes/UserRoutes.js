import multer from "multer";
import crypto from "crypto";
import { Router } from "express";
import { index, show, add, edit, create, update, remove } from "../controllers/UsersController.js";
import { isAuthenticated, isRole } from "../controllers/AuthenticationController.js";

// Create an instance of the Express Router
const router = Router();

// Configure Multer for file uploads
const tempStorageLocation = "temp";

// Create a storage engine for Multer that defines how and where files should be stored
const storage = multer.diskStorage({
    // Destination function specifies where to store uploaded files
    destination: (_, __, callback) => {
        // In this case, files will be stored in a "temp" directory
        callback(null, tempStorageLocation);
    },
    
    // Filename function defines how uploaded files should be named
    filename: (req, file, callback) => {
        // Generate a unique filename for each uploaded file to prevent conflicts
        // Here, we combine a random hexadecimal key with the original filename
        const filename = `${generateRandomHexKey()}-${file.originalname}`;
        callback(null, filename);
    },
});

// Create a Multer instance with the defined storage engine
const upload = multer({ storage });

// Middleware to handle HTTP method issues
const requestCheck = (req, _, next) => {
    if (req.method === "post") {
        if (req.body._method && req.body._method === "put") {
            // Correct the HTTP method for PUT requests, as they may come as POST with a "_method" field
            req.method === "put";
        }
    }
    next();
};

// Define routes and associate them with controller actions
// These routes are used for user management and access control

// Route to display a list of users (admin access only)
router.get("/", isAuthenticated, isRole("ADMIN"), index);

// Route to display the user registration page
router.get("/new", add);

// Route to display a user's profile page
router.get("/:id", isAuthenticated, show);

// Route to display the user editing page
router.get("/:id/edit", isAuthenticated, edit);

// Route to create a new user
router.post("/", isAuthenticated, upload.single("avatar"), create);

// Handle issue with multipart forms not having detectable fields unless they've gone through multer
router.post("/:id", (req, res, next) => {
    req.method = "put"; // Correct the HTTP method for PUT requests
    next();
});

// Route to update an existing user's information
router.put("/:id", isAuthenticated, upload.single("avatar"), update);

// Route to delete an existing user (admin access only)
router.delete("/:id", isAuthenticated, isRole("ADMIN"), remove);

// Function to generate a random hexadecimal key
function generateRandomHexKey() {
    return crypto.randomBytes(8 / 2).toString("hex");
}

export default router;
