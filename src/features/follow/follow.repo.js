import Request from "./request.model.js";

const checkPrevRequest = async ({ requestedBy, requestedTo }) => {
  return await Request.findOne({ requestedBy, requestedTo });
};

const doesAfollowsBRepo = async ({ userA, userB }) => {
  return await Request.exists({
    requestedBy: userA,
    requestedTo: userB,
    status: "accepted",
  });
};
const createRequestRepo = async ({
  requestedBy,
  requestedTo,
  status = "pending",
}) => {
  const newRqst = await Request.findOne({ requestedBy, requestedTo });
  if (newRqst) {
    if (newRqst.status === "pending") {
      throw new Error("The request already exists");
    }
    if (newRqst.status === "accepted") {
      throw new Error("You are already a follower");
    }
  }
  await Request.insertOne({ requestedBy, requestedTo, status });
};

const acceptRequestRepo = async ({ requestedBy, requestedTo }) => {
  const rqst = await Request.findOne({ requestedBy, requestedTo });
  if (!rqst) {
    throw new Error("The request does not exist");
  }
  if (rqst.status === "accepted") {
    throw new Error("This user is already a follower");
  }
  rqst.status = "accepted";

  await rqst.save();
};

const deleteRequestRepo = async ({ requestedBy, requestedTo }) => {
  const rqst = await Request.findOne({ requestedBy, requestedTo });
  if (!rqst.status === "accepted") {
    throw new Error("The request is already accepted");
  }
  await Request.deleteOne({ requestedBy, requestedTo });
};

const unfollowRemoveRepo = async ({ requestedBy, requestedTo, actionType }) => {
  const response = await Request.deleteOne({
    requestedBy,
    requestedTo,
    status: "accepted",
  });
  if (response.deletedCount !== 1) {
    if (actionType === "unfollow") {
      throw new Error("You don't follow this user");
    }
    throw new Error("This user is not your follower");
  }
};

const findFollowInfoRepo = async ({ userId }) => {
  return await Request.find({
    $or: [{ requestedBy: userId }, { requestedTo: userId }],
  }).populate({
    path: ["requestedBy", "requestedTo"],
    select: "fullName _id userName profilePic",
  });
};

const findFollowInfoForOtherRepo = async ({ userId }) => {
  return await Request.find({
    $or: [{ requestedBy: userId }, { requestedTo: userId }],
    status: "accepted",
  }).populate({
    path: ["requestedBy", "requestedTo"],
    select: "fullName _id userName profilePic",
  });
};

const findPendingRequestRepo = async ({ requestedBy }) => {
  return await Request.find({ requestedBy }).populate({
    path: "requestedTo",
    select: "_id fullName profilePic",
  });
};

export {
  doesAfollowsBRepo,
  checkPrevRequest,
  createRequestRepo,
  acceptRequestRepo,
  findPendingRequestRepo,
  deleteRequestRepo,
  unfollowRemoveRepo,
  findFollowInfoRepo,
  findFollowInfoForOtherRepo,
};
