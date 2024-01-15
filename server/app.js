import express from "express";
import dotenv from "dotenv";
import PageRoutes from "./routes/PageRoutes.js";

// This loads our .env and adds the variables to the environment
dotenv.config();

// This creates our application
const app = express();

// This sets our view engine (HTML renderer)
app.set("view engine", "ejs");

// This sets the public assets folder
app.use(express.static("public"));

// Middleware to handle JSON
app.use(express.json());

// Middleware for parsing url-encoded requests
app.use(express.urlencoded({ extended: true }));

// Registering our PageRoutes as middleware
app.use("/", PageRoutes);

// Our error handler
app.use((error, _, res, __) => {
    // Converts string errors to proper errors
    if (typeof error === "string") {
        const error = new Error(error);
    }

    // Adds a generic status
    if (!error.status) error.status = 404;

    // Outputs our error and stack trace to our console
    console.error(error);

    // Outputs the error to the user
    res.status(error.status).send(error.message);
});

/**
 * We are exporting our application so we are able to use it in
 * our tests
 */
export default app;
