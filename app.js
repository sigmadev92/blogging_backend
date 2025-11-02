import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./src/docs/swagger/swaggerOptions.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Blogging Backend");
});

//generate docs
const swaggerDocs = swaggerJSDoc(swaggerOptions);

//swagger UI-route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
