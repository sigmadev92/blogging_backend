import { deleteImage } from "../../config/cloudinary.js";
import CustomError from "../../middlewares/handleError.js";
import {
  addNewBlogRepo,
  deleteBlogRepo,
  updateBlogRepo,
} from "./blog.repository.js";

const addNewBlog = async (req, res, next) => {
  const authorId = req.USER._id;

  try {
    const { title, description } = req.body;

    const blogId = await addNewBlogRepo({ authorId, title, description });

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
  const { blogId } = req.body;

  if (!blogId) {
    return next(new CustomError(400, "BlogId missing"));
  }
  try {
    const response = await updateBlogRepo({
      authorId,
      blogId,
      data: { isPublished: true },
    });
    return res.status(response.code).json(response.result);
  } catch (error) {
    next(error);
  }
};

//no thumbnail
const editBlog = async (req, res, next) => {
  const authorId = req.USER._id;
  const { blogId } = req.body;

  if (!blogId) {
    return next(new CustomError(400, "Invalid details"));
  }

  const response = await updateBlogRepo({ authorId, blogId, data: req.body });
  return res.status(response.code).json(response.result);
};

const deleteBlog = async (req, res, next) => {
  const authorId = req.USER._id;
  const { blogId } = req.body;

  if (!blogId) {
    return next(new CustomError(400, "Invalid Details"));
  }

  const response = await deleteBlogRepo({ authorId, blogId });
  if (!response.success) {
    return next(new CustomError(400, "Invalid Details"));
  }

  await deleteImage(response.publicId);

  return res.status(200).json({ success: true });
};
export { addNewBlog, addThumbNailToBlog, publishBlog, editBlog, deleteBlog };
