import CustomError from "../../middlewares/handleError.js";
import {
  acceptRequestRepo,
  createRequestRepo,
  deleteRequestRepo,
  findFollowInfoRepo,
  unfollowRemoveRepo,
} from "./follow.repo.js";

const getFollowInfo = async (req, res, next) => {
  const response = await findFollowInfoRepo({ userId: req.USER._id });
  return res.status(200).json({ profiles: response, myId: req.USER._id });
};
const createRequest = async (req, res, next) => {
  const { requestedTo } = req.params;

  const requestedBy = req.USER._id;
  if (requestedTo === requestedBy) {
    return next(new CustomError(403, "Cannot follow yourself"));
  }

  try {
    await createRequestRepo({ requestedBy, requestedTo });
    console.log("created");
    return res.status(201).json({ success: true });
  } catch (err) {
    next(new CustomError(400, err.message));
  }
};
const acceptRequest = async (req, res, next) => {
  const { requestedBy } = req.params;
  const requestedTo = req.USER._id;
  if (requestedTo === requestedBy) {
    return next(
      new CustomError(403, "Cannot Accept follow request of your own")
    );
  }
  try {
    await acceptRequestRepo({ requestedBy, requestedTo });
    return res.status(202);
  } catch (err) {
    next(new CustomError(400, err.message));
  }
};

const deleteSentRequest = async (req, res, next) => {
  const { requestedTo } = req.params;
  const requestedBy = req.USER._id;
  if (!requestedBy || !requestedTo) {
    return next(new CustomError(400, "Missing data"));
  }
  if (requestedBy === requestedTo) {
    return next(new CustomError(403, "Invalid data"));
  }
  try {
    await deleteRequestRepo({ requestedBy, requestedTo });
    res.status(200).json({ success: true });
  } catch (error) {
    next(new CustomError(400, error.message));
  }
};

const deleteReceivedRqst = async (req, res, next) => {
  const { requestedBy } = req.params;
  const requestedTo = req.USER._id;
  if (!requestedBy || !requestedTo) {
    return next(new CustomError(400, "Missing data"));
  }
  if (requestedBy === requestedTo) {
    return next(new CustomError(403, "Invalid data"));
  }
  try {
    await deleteRequestRepo({ requestedBy, requestedTo });
    res.status(200).json({ success: true });
  } catch (error) {
    next(new CustomError(400, error.message));
  }
};
const removeFollower = async (req, res, next) => {
  const { requestedBy } = req.params;
  const requestedTo = req.USER._id;
  try {
    await unfollowRemoveRepo({
      requestedBy,
      requestedTo,
      actionType: "unfollow",
    });
    return res.status(202);
  } catch (err) {
    next(new CustomError(403, err.message));
  }
};
const unfollow = async (req, res, next) => {
  const { requestedTo } = req.params;
  const requestedBy = req.USER._id;
  try {
    await unfollowRemoveRepo({
      requestedBy,
      requestedTo,
      actionType: "remove",
    });
  } catch (err) {
    next(new CustomError(403, err.message));
  }
};
export {
  getFollowInfo,
  createRequest,
  acceptRequest,
  deleteSentRequest,
  deleteReceivedRqst,
  removeFollower,
  unfollow,
};
