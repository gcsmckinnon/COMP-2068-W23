import app from "./app.js";

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`API listening on http://localhost:${port}`));

export default server;
