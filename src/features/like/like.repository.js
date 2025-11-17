import Likes from "./like.model.js";

const likeDislikeBlogRepo = async ({ userId, blogId, action }) => {
  return await Likes.findOneAndUpdate(
    { userId, blogId },
    { action },
    { upsert: true, new: true }
  );
};

const unlikeBlogRepo = async ({ userId, blogId }) => {
  await Likes.deleteOne({ userId, blogId });
};

const unlikeAllBlogsRepo = async (userId) => {
  await Likes.deleteMany({ userId });
};

// Find the likes on a blog
const getLikesRepo = async (blogId) => {
  const likes = await Likes.find({ blogId }).populate({
    path: "userId",
    select: "fullName _id profilePic username",
  });
  return likes;
};

//Find how many blogs a user has liked
const getBlogIdsRepo = async (userId) => {
  const blogs = await Likes.find({ userId });
  return blogs;
};

export {
  likeDislikeBlogRepo,
  unlikeBlogRepo,
  unlikeAllBlogsRepo,
  getLikesRepo,
  getBlogIdsRepo,
};
