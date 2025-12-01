import { deleteImage } from "../../config/cloudinary.js";
import CustomError from "../../middlewares/handleError.js";
import {
  addNewBlogRepo,
  deleteBlogRepo,
  findAllRepo,
  findBlogByIdRepo,
  findBlogsOfAuthorRepo,
  findBlogsWithIdsRepo,
  getMyBlogsRepo,
  publishBlogRepo,
  toggleVisibilityRepo,
  updateBlogRepo,
} from "./blog.repository.js";
import { updateProfile } from "../user/repositories/user.repository.js";
const findBlogById = async (req, res, next) => {
  const blog = await findBlogByIdRepo(req.params.blogId);
  if (!blog) {
    return next(new CustomError(404, "Blog Not found"));
  }
  res.status(200).json({ blog });
};

const getAllBlogs = async (req, res, next) => {
  const blogs = await findAllRepo();
  return res.status(200).json({ blogs });
};
const addNewBlog = async (req, res, next) => {
  const authorId = req.USER._id;
  try {
    const { title, description, searchTags, topics } = req.body;

    const blogId = await addNewBlogRepo({
      authorId,
      title,
      description,
      searchTags,
      topics,
    });

    return res.status(201).json({ success: true, blogId });
  } catch (error) {
    return next(error);
  }
};

const addThumbNailToBlog = async (req, res, next) => {
  // thumbnail is saved
  const authorId = req.USER._id;
  const { blogId } = req.params;
  try {
    const { path: secure_url, filename: publicId } = req.file;
    console.log("on add-thumbnail", secure_url, publicId);
    await updateBlogRepo({
      authorId,
      blogId,
      data: {
        "thumbnail.secure_url": secure_url,
        "thumbnail.publicId": publicId,
      },
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
};

const publishBlog = async (req, res, next) => {
  const authorId = req.USER._id;
  const { blogId } = req.params;

  if (!blogId) {
    return next(new CustomError(400, "BlogId missing"));
  }
  try {
    const blog = await publishBlogRepo({
      authorId,
      blogId,
      data: { isPublished: true, isPublic: true },
    });
    await updateProfile({ userId: authorId, userDate: { role: "author" } });
    return res.status(200).json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

const toggleVisibility = async (req, res, next) => {
  console.log("arrived on toggle visibility controller");
  await toggleVisibilityRepo({
    authorId: req.USER._id,
    blogId: req.params.blogId,
  });

  return res.status(200).json({ success: true });
};

//no thumbnail
const editBlog = async (req, res, next) => {
  const authorId = req.USER._id;
  const { blogId } = req.params;

  if (!blogId) {
    return next(new CustomError(400, "Invalid details"));
  }

  const blog = await updateBlogRepo({ authorId, blogId, data: req.body });
  return res.status(200).json({ success: true, blog });
};

const deleteBlog = async (req, res, next) => {
  const authorId = req.USER._id;
  const { blogId } = req.params;
  const respone = await deleteBlogRepo({ authorId, blogId });
  if (respone.thumbnail.publicId) {
    await deleteImage(respone.thumbnail.publicId);
  }
  return res.status(200).json({ success: true });
};

const getMyBlogs = async (req, res, next) => {
  const blogs = await getMyBlogsRepo(req.USER._id);

  return res.status(200).json({ success: true, blogs });
};

const findAllBlogsOfAuthor = async (req, res, next) => {
  const { authorId } = req.params;
  console.log(authorId);
  if (!authorId || authorId.length != 24) {
    return res
      .status(400)
      .json({ success: false, message: "Missing or Invalid Credentials" });
  }
  const blogs = await findBlogsOfAuthorRepo(authorId);
  if (blogs.length === 0) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  return res.status(200).json({ success: true, blogs });
};

const findBlogsWithIds = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "body missing" });
  }
  const { blogIds } = req.body;

  const blogs = await findBlogsWithIdsRepo(blogIds);
  // console.log(blogs);

  return res.status(200).json({ blogs });
};
export {
  getAllBlogs,
  addNewBlog,
  addThumbNailToBlog,
  publishBlog,
  editBlog,
  deleteBlog,
  getMyBlogs,
  findBlogById,
  findAllBlogsOfAuthor,
  findBlogsWithIds,
  toggleVisibility,
};
