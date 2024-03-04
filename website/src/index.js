import React from "react"; // Importing React library
import ReactDOM from "react-dom/client"; // Importing ReactDOM for rendering
import App from "./App.jsx"; // Importing the root component of the application

// Creating a root instance using ReactDOM.createRoot and attaching it to the DOM element with the id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the root component (App) wrapped in <React.StrictMode>
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
