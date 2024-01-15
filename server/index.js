import app from "./app.js";

const port = process.env.PORT || 3000;

// Starts the Express server
const server = app.listen(port, () => console.log(`API listening on http://localhost:${port}`));

export default server;
