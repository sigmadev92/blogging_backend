import { Router } from "express";
import {
  getLikesOnMyBlog,
  getMyLikedBlogs,
  likeDislike,
  unlike,
} from "./like.controller.js";
import { isValidBlog } from "../../middlewares/validators/blog/check.js";
import { authMiddleware } from "../../middlewares/authentication.js";

const likeRouter = Router();
likeRouter.put("/like/:blogId/:action", authMiddleware, likeDislike);
likeRouter.delete("/unlike/:blogId", authMiddleware, unlike);
likeRouter.get("/blogs", authMiddleware, getMyLikedBlogs);
likeRouter.get("/users/:blogId", authMiddleware, isValidBlog, getLikesOnMyBlog);

export default likeRouter;
