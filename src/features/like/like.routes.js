import { Router } from "express";
import {
  getLikesOnMyBlog,
  getMyLikedBlogs,
  likeDislike,
  unlike,
} from "./like.controller.js";
import { isValidBlog } from "../../middlewares/validators/blog/check.js";

const likeRouter = Router();
likeRouter.put("/like/:blogId/:action", likeDislike);
likeRouter.delete("/unlike/:blogId", unlike);
likeRouter.get("/blogs", getMyLikedBlogs);
likeRouter.get("/users/:blogId", isValidBlog, getLikesOnMyBlog);

export default likeRouter;
