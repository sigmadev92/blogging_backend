import { Router } from "express";
import { authMiddleware } from "../../middlewares/authentication.js";
import {
  addNewBlog,
  addThumbNailToBlog,
  deleteBlog,
  editBlog,
  findAllBlogsOfAuthor,
  findBlogById,
  findBlogsWithIds,
  getAllBlogs,
  getMyBlogs,
  publishBlog,
} from "./blog.controller.js";
import upload from "../../config/multerCloudinary.js";
import { isValidBlog } from "../../middlewares/validators/blog/check.js";
const blogRouter = Router();

blogRouter.post("/new", authMiddleware, addNewBlog);
//get all blogs with IDs for displaying
blogRouter.post("/selected-blogs", findBlogsWithIds);
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

// this is to display all details of blog with some details of the author
blogRouter.get("/public/one/:blogId", findBlogById);
// to get all the blogs of loggedIN user
blogRouter.get("/my-blogs", authMiddleware, getMyBlogs);

//for getting all blogs
blogRouter.get("/all", getAllBlogs);
// for getting all blogs of an author
blogRouter.get("/all/:authorId", findAllBlogsOfAuthor);
blogRouter.put("/publish/:blogId", authMiddleware, isValidBlog, publishBlog);
blogRouter.put("/edit/:blogId", authMiddleware, isValidBlog, editBlog);
blogRouter.delete("/:blogId", authMiddleware, isValidBlog, deleteBlog);
export default blogRouter;
