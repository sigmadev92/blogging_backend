import { Router } from "express";
import { authMiddleware } from "../../middlewares/authentication.js";
import {
  addNewBlog,
  addThumbNailToBlog,
  deleteBlog,
  editBlog,
  publishBlog,
} from "./blog.controller.js";
import upload from "../../config/multerCloudinary.js";
import { updateBlogRepo } from "./blog.repository.js";
const blogRouter = Router();

blogRouter.post("/new", authMiddleware, addNewBlog);
blogRouter.put(
  "/thumbnail/:blogId",
  authMiddleware,
  (req, res, next) => {
    req.imgType = "blog_thumbnail";
    console.log("before," + req.body);
    req.blogId = req.params.blogId;
    next();
  },
  upload.single("thumbnail"),
  addThumbNailToBlog
);

blogRouter.put("/publish", authMiddleware, publishBlog);
blogRouter.put("/edit", authMiddleware, editBlog);
blogRouter.delete("/", authMiddleware, deleteBlog);
export default blogRouter;
