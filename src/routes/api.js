import { Router } from "express";
import userRouter from "../features/user/routes/user.routes.js";
import { authMiddleware } from "../middlewares/authentication.js";
import userSettingsRouter from "../features/user/routes/settings.routes.js";
import blogRouter from "../features/blog/blog.routes.js";
import likeRouter from "../features/like/like.routes.js";
import profileViewRouter from "../features/profileView/view.routes.js";
import followRouter from "../features/follow/follow.routes.js";
import blogViewRouter from "../features/blogView/view.routes.js";
import searchRouter from "../features/search/search.routes.js";
import paymentRouter from "../features/payment/payment.routes.js";
import commentRouter from "../features/comment/comment.routes.js";
const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/settings/users", authMiddleware, userSettingsRouter);
apiRouter.use("/blogs", blogRouter);
apiRouter.use("/likes", likeRouter);
apiRouter.use("/views/profile", profileViewRouter);
apiRouter.use("/views/blogs", blogViewRouter);
apiRouter.use("/requests", followRouter);
apiRouter.use("/comment", authMiddleware, commentRouter);
apiRouter.use(
  "/search",
  (req, res, next) => {
    console.log("loo");
    next();
  },
  searchRouter,
);

apiRouter.use("/payment", authMiddleware, paymentRouter);

export default apiRouter;
