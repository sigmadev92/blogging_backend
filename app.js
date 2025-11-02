import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./src/docs/swagger/swaggerOptions.js";
import userRouter from "./src/features/user/user.routes.js";
import notFoundRoute from "./src/middlewares/notFoundRoute.js";
import { handleError } from "./src/middlewares/handleError.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    `<div><h1>Blogging Backend</h1> <a href="/api-docs" style="font-size:12px;background-color:lightgreen;padding:5px 5px;border-radius:5px;">Swagger Documentation</a></div>`
  );
});

//generate docs
const swaggerDocs = swaggerJSDoc(swaggerOptions);

//swagger UI-route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/users", userRouter);

app.use(notFoundRoute);
app.use(handleError);

export default app;
