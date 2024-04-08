import app from "./app.js";
import { Server } from "socket.io";
import { createServer } from "http";
import socket from "./gameServer.js";

const httpServer = createServer(app);
const io = new Server(httpServer);

socket(io);

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
