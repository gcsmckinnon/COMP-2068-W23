import { requestToken } from "../controllers/ApplicationController.js";
import { login, authenticate, logout, isAuthenticated } from "../controllers/AuthenticationController.js";
import { add } from "../controllers/UsersController.js";
import { Router } from "express";

// Create an instance of the Express Router
const router = Router();

// Define routes and their associated controller functions
// These routes are used for authentication and user management

// Route to display the login page
router.get("/login", login);

// Route to handle user authentication (login)
router.post("/authenticate", authenticate);

// Route to handle user logout (requires authentication)
router.get("/logout", isAuthenticated, logout);

// Route to display the user registration page
router.get("/register", add);

// Route for application api authentication
router.post("/request-token", requestToken);

// Export the router for use in other parts of the application
export default router;
