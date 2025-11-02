import express from "express";
import { PORT } from "./src/config/env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Blogging Backend");
});

export default app;
