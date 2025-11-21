import { Router } from "express";
import {
  acceptRequest,
  createRequest,
  deleteRequest,
  getFollowInfo,
  removeFollower,
  unfollow,
} from "./follow.controller.js";

const router = new Router();

router.get("/fetch", getFollowInfo);
router.post("/create/:requestedTo", createRequest);
router.put("/accept/:requestedBy", acceptRequest);
router.delete("/delete/:requestedBy/:requestedTo", deleteRequest);
router.delete("/remove-follower/:requestedBy", removeFollower);
router.delete("/unfollow/:requestedTo", unfollow);
export default router;
