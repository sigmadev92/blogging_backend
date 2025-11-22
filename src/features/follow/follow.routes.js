import { Router } from "express";
import {
  acceptRequest,
  createRequest,
  deleteReceivedRqst,
  deleteSentRequest,
  getFollowInfo,
  getFollowInfoForOther,
  removeFollower,
  unfollow,
} from "./follow.controller.js";

import { authMiddleware } from "../../middlewares/authentication.js";
const router = new Router();

router.use(authMiddleware);
router.get("/fetch-other/:userId", getFollowInfoForOther);
router.get("/fetch", getFollowInfo);
router.post("/create/:requestedTo", createRequest);
router.put("/accept/:requestedBy", acceptRequest);
router.delete("/delete/my/:requestedTo", deleteSentRequest);
router.delete("/delete/other/:requestedBy", deleteReceivedRqst);
router.delete("/remove-follower/:requestedBy", removeFollower);
router.delete("/unfollow/:requestedTo", unfollow);
export default router;
