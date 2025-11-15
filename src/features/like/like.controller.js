import {
  getBlogIdsRepo,
  getLikesRepo,
  likeDislikeBlogRepo,
  unlikeAllBlogsRepo,
  unlikeBlogRepo,
} from "./like.repository.js";

const likeDislike = async (req, res, next) => {
  const userId = req.USER._id;
  const { blogId, action } = req.params;

  await likeDislikeBlogRepo({ userId, blogId, action });

  return res.status(200).json({ success: true });
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
  const blogIds = await getBlogIdsRepo(userId);

  return res.status(200).json({ success: true, blogIds });
};

export {
  likeDislike,
  unlike,
  unlikeAllBlogs,
  getLikesOnMyBlog,
  getMyLikedBlogs,
};
