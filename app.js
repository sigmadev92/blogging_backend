import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Blogging Backend");
});

export default app;
