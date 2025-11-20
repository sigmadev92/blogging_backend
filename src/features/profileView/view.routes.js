import { Router } from "express";
import {
  authMiddleware,
  isAuthenticated,
} from "../../middlewares/authentication.js";
import {
  addnewView,
  findProfilesIVisited,
  getMyProfileViews,
  getViewCount,
} from "./view.controller.js";
const router = Router();

router.post("/new/:whoseProfile", isAuthenticated, addnewView);

router.get("/number/:whoseProfile", getViewCount);

router.get("/visited", authMiddleware, findProfilesIVisited);

//only accessible if loggedin user has a Premium account
router.get("/views", authMiddleware, getMyProfileViews);

export default router;
