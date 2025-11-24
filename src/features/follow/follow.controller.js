import CustomError from "../../middlewares/handleError.js";
import {
  acceptRequestRepo,
  createRequestRepo,
  deleteRequestRepo,
  findFollowInfoForOtherRepo,
  findFollowInfoRepo,
  unfollowRemoveRepo,
} from "./follow.repo.js";
import { findUserById } from "../user/user.repository.js";
import { onlineUsers } from "../../config/socket.js";
const getFollowInfo = async (req, res, next) => {
  const response = await findFollowInfoRepo({ userId: req.USER._id });
  return res.status(200).json({ profiles: response, myId: req.USER._id });
};

const getFollowInfoForOther = async (req, res, next) => {
  const { userId } = req.params;
  const response = await findFollowInfoForOtherRepo({ userId });
  return res.status(200).json({ profiles: response });
};
const createRequest = async (req, res, next) => {
  const { requestedTo } = req.params;
  const requestedBy = req.USER._id;
  if (requestedTo === requestedBy) {
    return next(new CustomError(403, "Cannot follow yourself"));
  }
  const user = await findUserById(requestedTo);
  if (!user) {
    return next(new CustomError(403, "Invalid user ID"));
  }

  let status = "pending";
  if (user.isPublic) {
    status = "accepted";
  }

  try {
    await createRequestRepo({ requestedBy, requestedTo, status });
    const io = req.app.get("io");
    const receiverSocketId = onlineUsers[requestedTo];
    console.log(requestedBy, requestedTo, receiverSocketId);
    const sender = {
      userName: req.USER.userName,
      _id: requestedBy,
      fullName: req.USER.fullName,
    };
    const me = {
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
    };
    // if the receiver is online - send a real time message too.
    if (receiverSocketId) {
      if (status === "accepted") {
        io.to(receiverSocketId).emit("new-follower", {
          sender,
          me,
        });
      } else {
        io.to(receiverSocketId).emit("new-follow-request", { sender, me });
      }
    }
    console.log("created");
    return res.status(201).json({ isPublic: status === "accepted", sender });
  } catch (err) {
    next(new CustomError(400, err.message));
  }
};
const acceptRequest = async (req, res, next) => {
  const { requestedBy } = req.params;
  const user = await findUserById(requestedBy);
  if (!user) {
    return next(new CustomError(403, "Invalid follower Id"));
  }
  const requestedTo = req.USER._id;
  if (requestedTo === requestedBy) {
    return next(
      new CustomError(403, "Cannot Accept follow request of your own")
    );
  }
  const me = {
    _id: requestedTo,
    fullName: req.USER._id,
    userName: req.USER.userName,
  };
  try {
    await acceptRequestRepo({ requestedBy, requestedTo });
    const io = req.app.get("io");
    const receiverSocketId = onlineUsers[requestedBy];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user-accepted-my-request", {
        me: { _id: user._id, fullName: user.fullName, userName: user.userName },
        user: me,
      });
    }
    return res.status(200).json({ me });
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
      actionType: "remove",
    });
    const io = req.app.get("io");
    const receiverSocketId = onlineUsers[requestedBy];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user-removed-me", {
        myId: requestedBy,
        hisId: requestedTo,
      });
    }
    return res.status(200).json({ myId: requestedTo });
  } catch (err) {
    next(new CustomError(403, err.message));
  }
};
const unfollow = async (req, res, next) => {
  const { requestedTo } = req.params;
  const user = await findUserById(requestedTo);
  if (!user) {
    return next(new CustomError(403, "Invalid Account"));
  }
  const requestedBy = req.USER._id;
  try {
    await unfollowRemoveRepo({
      requestedBy,
      requestedTo,
      actionType: "unfollow",
    });
    const io = req.app.get("io");
    const receiverSocketId = onlineUsers[requestedTo];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("they-unfollowed", {
        user: {
          _id: requestedBy,
          fullName: req.USER.fullName,
          userName: req.USER.userName,
        },
        premium: user.isPremiumAccount,
      });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    next(new CustomError(403, err.message));
  }
};
export {
  getFollowInfo,
  getFollowInfoForOther,
  createRequest,
  acceptRequest,
  deleteSentRequest,
  deleteReceivedRqst,
  removeFollower,
  unfollow,
};
