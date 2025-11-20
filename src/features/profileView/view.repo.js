import ProfileViews from "./view.model.js";
const addViewRepo = async ({ visitorId, whoseProfile }) => {
  await ProfileViews.findOneAndUpdate(
    { visitorId, whoseProfile }, // filter
    {
      $inc: { totalViews: 1 }, // increment if the doc exists
      $setOnInsert: { totalViews: 1 }, // if doc doesn't exist → set counter = 1
    },
    { upsert: true, new: true }
  );
};

const getProfileViewsNumberRepo = async (whoseProfile) => {
  const result = await Model.aggregate([
    { $match: { whoseProfile } },
    { $group: { _id: null, total: { $sum: "$totalViews" } } }, // sum X
  ]);

  return result[0]?.total || 0;
};

const getProfileViewsRepo = async (whoseProfile) => {
  return await ProfileViews.find({ whoseProfile });
};

const findProfilesUserVisitedRepo = async (visitorId) => {
  return await ProfileViews.find({ visitorId })
    .populate({
      path: "whoseProfile",
      select: "thumbnail profilePic fullName userName _id",
    })
    .limit(10);
};
export {
  addViewRepo,
  getProfileViewsNumberRepo,
  getProfileViewsRepo,
  findProfilesUserVisitedRepo,
};
