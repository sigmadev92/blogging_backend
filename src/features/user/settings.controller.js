import CustomError from "../../middlewares/handleError.js";
import {
  toggleDisplayParamRepo,
  toggleVisibilityRepo,
} from "./settings.repo.js";

const toggleVisibility = async (req, res, next) => {
  console.log("req came");
  try {
    const newStatus = await toggleVisibilityRepo(req.USER._id);
    return res.status(200).json({ newStatus });
  } catch (error) {
    return next(new CustomError(403, error.message));
  }
};

const toggleDisplayParam = async (req, res, next) => {
  const { param } = req.params;
  const userId = req.USER._id;
  console.log("sas");
  try {
    const newValue = await toggleDisplayParamRepo(userId, param);

    return res.status(200).json({ newValue });
  } catch (error) {
    next(new CustomError(403, error.message));
  }
};

export { toggleVisibility, toggleDisplayParam };
