import express from "express"; // Importing Express framework
import path from "path"; // Path module for handling file paths
import { fileURLToPath } from "url"; // Utility function to convert file URLs to paths
import apiRoutes from "./apiRoutes.js";

// Getting the current filename and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Creating an Express application

app.use(express.json()); // Middleware for parsing JSON

// Serving static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Provide an API route set
app.use("/api", apiRoutes);

// Handling any requests by serving the React app's main HTML file
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

export default app; // Exporting the Express app for use in other files
