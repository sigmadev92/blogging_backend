import CustomError from "../../middlewares/handleError";
import {
  addViewRepo,
  findProfilesUserVisitedRepo,
  getProfileViewsRepo,
} from "./view.repo.js";

const addnewView = async (req, res, next) => {
  let visitorId = null;
  const { whoseProfile } = req.params;
  if (!whoseProfile) {
    return next(new CustomError(400, "Required profileId in url Paramenter"));
  }
  if (req.USER) visitorId = req.USER._id;
  await addViewRepo({ visitorId, whoseProfile });

  return res.status(204);
};

const getViewCount = async (req, res, next) => {
  const { whoseProfile } = req.params;
  if (!whoseProfile) {
    return next(new CustomError(400, "Required profileId in url Paramenter"));
  }
};

const getMyProfileViews = async (req, res, next) => {
  if (!req.USER.isPremiumAccount) {
    return next(
      new CustomError(
        403,
        "you must have a Premium account to access the feature"
      )
    );
  }

  const docs = await getProfileViewsRepo(req.USER._id);
  return res.status(200).json(docs);
};

const findProfilesIVisited = async (req, res, next) => {
  const profiles = await findProfilesUserVisitedRepo(req.USER._id);

  return res.status(200).json(profiles);
};
export { addnewView, getMyProfileViews, getViewCount, findProfilesIVisited };
