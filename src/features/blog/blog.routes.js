import { Router } from "express";
import { authMiddleware } from "../../middlewares/authentication.js";
import {
  addNewBlog,
  addThumbNailToBlog,
  deleteBlog,
  editBlog,
  findAllBlogsOfAuthor,
  findBlogById,
  getAllBlogs,
  getMyBlogs,
  publishBlog,
} from "./blog.controller.js";
import upload from "../../config/multerCloudinary.js";
import { isValidBlog } from "../../middlewares/validators/blog/check.js";
const blogRouter = Router();

blogRouter.post("/new", authMiddleware, addNewBlog);
blogRouter.put(
  "/thumbnail/:blogId",

  authMiddleware,
  isValidBlog,
  (req, res, next) => {
    req.imgType = "blog_thumbnail";
    console.log("before," + req.body);
    req.blogId = req.params.blogId;
    next();
  },
  upload.single("thumbnail"),
  addThumbNailToBlog
);
blogRouter.get("/one/:blogId", authMiddleware, findBlogById);
blogRouter.get("/public/one/:blogId", findBlogById);
blogRouter.get("/my-blogs", authMiddleware, getMyBlogs);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/all/:authorId", findAllBlogsOfAuthor);
blogRouter.put("/publish/:blogId", authMiddleware, isValidBlog, publishBlog);
blogRouter.put("/edit/:blogId", authMiddleware, isValidBlog, editBlog);
blogRouter.delete("/:blogId", authMiddleware, isValidBlog, deleteBlog);
export default blogRouter;
