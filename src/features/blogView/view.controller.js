import {
  addViewRepo,
  findViewedBlogsRepo,
  getViewersRepo,
} from "./view.repo.js";
import { increaseViewsCountRepo } from "../blog/blog.repository.js";
import CustomError from "../../middlewares/handleError.js";

const addView = async (req, res, next) => {
  const { blogId } = req.params;
  let viewerId = null;
  if (req.USER) {
    viewerId = req.USER._id;
  }

  await addViewRepo({ viewerId, blogId });
  await increaseViewsCountRepo(blogId);
  return res.status(201).json({ success: true });
};

const getViewersDetails = async (req, res, next) => {
  const { blogId } = req.params;
  if (!req.USER.isAccountVerified) {
    return next(
      new CustomError(403, "This feature is only for a Premium account")
    );
  }
  if (!blogId) {
    return new CustomError(400, "Please provide a blogId");
  }
  const profiles = await getViewersRepo(blogId);
  return res.status(200).json(profiles);
};

const getMyViewedBlogs = async (req, res, next) => {
  const blogs = await findViewedBlogsRepo(req.USER._id);
  return res.status(200).json({ blogs });
};

export { addView, getViewersDetails, getMyViewedBlogs };
