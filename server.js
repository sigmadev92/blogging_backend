import app from "./app.js";
import http from "http";
import { PORT } from "./src/config/env.js";
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
});
