import express from "express";
import dotenv from "dotenv";
import PageRoutes from "./routes/PageRoutes.js";
import CardRoutes from "./routes/CardRoutes.js";
import mongoose from "mongoose";

// This loads our .env and adds the variables to the environment
dotenv.config();

/**
 * Setting up Mongoose
 */
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE}.l6f1eyq.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.info("MongoDB Connected"))
    .catch(error => console.error(error));

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

// Method overriding to deal with unsupported HTTP methods in certain platforms
app.use((req, _, next) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {        
        const method = req.body._method;

        delete req.body._method;

        req.method = method;
    }

    next();
});


// Registering our PageRoutes as middleware
app.use("/", PageRoutes);

// Our Card routes
app.use("/cards", CardRoutes);

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
