import CustomError from "../../middlewares/handleError.js";
import {
  acceptRequestRepo,
  createRequestRepo,
  deleteRequestRepo,
  findFollowInfoForOtherRepo,
  findFollowInfoRepo,
  unfollowRemoveRepo,
} from "./follow.repo.js";
import {
  findUserById,
  followUserRepo,
} from "../user/repositories/user.repository.js";
import { onlineUsers } from "../../config/socket.js";
import { CLIENT_SECRET } from "../../config/env.js";
const getFollowInfo = async (req, res, next) => {
  const response = await findFollowInfoRepo({ userId: req.USER._id });
  return res.status(200).json({ profiles: response, myId: req.USER._id });
};

const getFollowInfoForOther = async (req, res, next) => {
  if (req.headers["x-client-secret"] !== CLIENT_SECRET) {
    return next(new CustomError(403, "PRIME_DEVELOPER ROUTE"));
  }
  const { userId } = req.params;
  const response = await findFollowInfoForOtherRepo({ userId });
  return res.status(200).json({ profiles: response });
};
const createRequest = async (req, res, next) => {
  const { requestedTo } = req.params;
  const requestedBy = req.USER._id;
  if (requestedTo === requestedBy) {
    return next(new CustomError(400, "Cannot follow yourself"));
  }
  const user = await findUserById(requestedTo);
  if (!user) {
    return next(new CustomError(400, "Invalid user ID"));
  }

  let status = "pending";
  if (user.isPublic) {
    status = "accepted";
  }

  try {
    await createRequestRepo({ requestedBy, requestedTo, status });
    console.log(" follow request sent");
    const io = req.app.get("io");
    const receiverSocketId = onlineUsers[requestedTo];
    const sender = await followUserRepo(requestedBy);

    sender._id = requestedBy;
    const me = {
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
      profilePicToBeShown: user.profilePicToBeShown,
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
  if (!requestedBy) {
    return next(new CustomError(400, "User Id missing"));
  }
  const user = await followUserRepo(requestedBy);
  if (!user) {
    return next(new CustomError(400, "Invalid follower Id"));
  }
  const requestedTo = req.USER._id;
  if (requestedTo === requestedBy) {
    return next(
      new CustomError(400, "Cannot Accept follow request of your own")
    );
  }

  try {
    await acceptRequestRepo({ requestedBy, requestedTo });
    const io = req.app.get("io");
    const receiverSocketId = onlineUsers[requestedBy];
    const me = await followUserRepo(requestedTo);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user-accepted-my-request", {
        me: user,
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
  const me = await followUserRepo(requestedBy);
  console.log("on delete sent rqst", me);

  if (!requestedTo) {
    return next(new CustomError(400, "Missing User Id"));
  }
  if (requestedBy === requestedTo) {
    return next(new CustomError(400, "Invalid data"));
  }
  try {
    await deleteRequestRepo({ requestedBy, requestedTo });
    const io = req.app.get("io");
    const receiverSocketId = onlineUsers[requestedTo];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user-deleted-their-sent-request", {
        user: { ...me, _id: requestedBy },
      });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    next(new CustomError(403, error.message));
  }
};

const deleteReceivedRqst = async (req, res, next) => {
  const { requestedBy } = req.params;
  const requestedTo = req.USER._id;

  if (!requestedBy || !requestedTo) {
    return next(new CustomError(400, "Missing data"));
  }
  if (requestedBy === requestedTo) {
    return next(new CustomError(400, "Invalid data"));
  }
  try {
    await deleteRequestRepo({ requestedBy, requestedTo });
    const me = await followUserRepo(requestedTo);
    const io = req.app.get("io");
    const receiverSocketId = onlineUsers[requestedBy];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user-deleted-my-request", {
        user: me,
      });
    }
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
    return next(new CustomError(400, "Invalid Account"));
  }
  const requestedBy = req.USER._id;
  try {
    await unfollowRemoveRepo({
      requestedBy,
      requestedTo,
      actionType: "unfollow",
    });
    const me = await followUserRepo(requestedBy);
    const io = req.app.get("io");
    const receiverSocketId = onlineUsers[requestedTo];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("they-unfollowed", {
        user: me,
        premium: user.isPremiumAccount,
        myId: requestedTo,
      });
    }
    return res.status(200).json({ myId: requestedBy, hisId: requestedTo });
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
