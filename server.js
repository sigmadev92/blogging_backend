import app from "./app.js";
import http from "http";
import { CLIENT_URL, PORT, SERVER_URL } from "./src/config/env.js";
import connectToDBMongoose from "./src/config/dbMongoose.js";
import { Server } from "socket.io";
import initSocket from "./src/config/socket.js";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: CLIENT_URL, // your React frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

initSocket(io);
//store online users

// Make io accessible in routes/controllers
app.set("io", io);

server.listen(PORT, () => {
  connectToDBMongoose();
  console.log(`SERVER RUNNING ON ${SERVER_URL}`);
});
