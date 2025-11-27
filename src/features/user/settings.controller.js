import { toggleVisibilityRepo } from "./settings.repo.js";

const toggleVisibility = async (req, res, next) => {
  await toggleVisibilityRepo(req.USER._id);
  return res.status(200).json({ success: true });
};

export { toggleVisibility };
