import app from "./app.js";
import http from "http";
import { PORT } from "./src/config/env.js";
import connectToDBMongoose from "./src/config/dbMongoose.js";
const server = http.createServer(app);

server.listen(PORT, () => {
  connectToDBMongoose();
  console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
});
