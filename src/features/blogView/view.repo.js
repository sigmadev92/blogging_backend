import BlogViews from "./view.model.js";

const addViewRepo = async ({ blogId, viewerId }) => {
  await BlogViews.findOneAndUpdate(
    { viewerId, blogId }, // filter
    {
      $inc: { totalViews: 1 }, // increment if the doc exists
      $setOnInsert: { totalViews: 1 }, // if doc doesn't exist → set counter = 1
    },
    { upsert: true, new: true }
  );
};

const getTotalViewsRepo = async (blogId) => {
  const result = await BlogViews.aggregate([
    { $match: { blogId } },
    { $group: { _id: null, total: { $sum: "$totalViews" } } }, // sum X
  ]);

  return result[0]?.total || 0;
};

const getViewersRepo = async (blogId) => {
  return await BlogViews.find({ blogId }).populate({
    path: "viewerId",
    select: "_id fullName ",
  });
};

const findNoOfViewedBlogsRepo = async (viewerId) => {
  return await BlogViews.countDocuments({ viewerId });
};

export {
  addViewRepo,
  getTotalViewsRepo,
  findNoOfViewedBlogsRepo,
  getViewersRepo,
};
