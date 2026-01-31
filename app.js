import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./src/docs/swagger/swaggerOptions.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CLIENT_URL } from "./src/config/env.js";
import router from "./src/routes/index.js";
const app = express();
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(
    `<div><h1>Blogging Backend</h1> <a href="/api-docs" style="font-size:12px;background-color:lightgreen;padding:5px 5px;border-radius:5px;">Swagger Documentation</a></div>`
  );
});

//generate docs
const swaggerDocs = swaggerJSDoc(swaggerOptions);

//swagger UI-route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);

export default app;
