import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./src/docs/swagger/swaggerOptions.js";
import userRouter from "./src/features/user/user.routes.js";
import notFoundRoute from "./src/middlewares/notFoundRoute.js";
import { handleError } from "./src/middlewares/handleError.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CLIENT_URL } from "./src/config/env.js";
import blogRouter from "./src/features/blog/blog.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import { authMiddleware } from "./src/middlewares/authentication.js";
import profileViewRouter from "./src/features/profileView/view.routes.js";
import blogViewRouter from "./src/features/blogView/view.routes.js";
import followRouter from "./src/features/follow/follow.routes.js";
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
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/likes", authMiddleware, likeRouter);
app.use("/api/views/profile", profileViewRouter);
app.use("/api/views/blogs", blogViewRouter);
app.use("/api/requests",authMiddleware,followRouter)
app.use(notFoundRoute);
app.use(handleError);

export default app;
