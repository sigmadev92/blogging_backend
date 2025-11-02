import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./src/docs/swagger/swaggerOptions.js";
import userRouter from "./src/features/user/user.routes.js";
import notFoundRoute from "./src/middlewares/notFoundRoute.js";
import { handleError } from "./src/middlewares/handleError.js";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Blogging Backend");
});

//generate docs
const swaggerDocs = swaggerJSDoc(swaggerOptions);

//swagger UI-route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/users", userRouter);

app.use(notFoundRoute);
app.use(handleError);

export default app;
