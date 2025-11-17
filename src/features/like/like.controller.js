import {
  getBlogIdsRepo,
  getLikesRepo,
  likeDislikeBlogRepo,
  unlikeAllBlogsRepo,
  unlikeBlogRepo,
} from "./like.repository.js";

import CustomError from "../../middlewares/handleError.js";
const likeDislike = async (req, res, next) => {
  const userId = req.USER._id;
  const { blogId, action } = req.params;
  console.log(action);
  if (Math.abs(action) !== 1) {
    return next(new CustomError(400, "Invalid action"));
  }

  const like = await likeDislikeBlogRepo({ userId, blogId, action });
  if (!like) {
    return next(new CustomError(400, "Invalid credentials"));
  }

  return res.status(200).json({ success: true, like });
};

const unlike = async (req, res, next) => {
  const userId = req.USER._id;
  const { blogId } = req.params;

  await unlikeBlogRepo({ userId, blogId });

  return res.status(200).json({ success: true });
};

const unlikeAllBlogs = async (req, res, next) => {
  await unlikeAllBlogsRepo(req.USER._id);
  return res.status(200).json({ success: true });
};

const getLikesOnMyBlog = async (req, res, next) => {
  const { blogId } = req.params;
  const profiles = await getLikesRepo(blogId);
  return res.status(200).json({ success: true, profiles });
};

const getMyLikedBlogs = async (req, res, next) => {
  const userId = req.USER._id;
  const likes = await getBlogIdsRepo(userId);

  return res.status(200).json({ success: true, likes });
};

export {
  likeDislike,
  unlike,
  unlikeAllBlogs,
  getLikesOnMyBlog,
  getMyLikedBlogs,
};
