import {Router} from "express";
import {authMiddleware, isAuthenticated} from "../../middlewares/authentication.js";
import {addView, getMyViewedBlogs, getViewersDetails} from "./view.controller.js";

const router = Router();

router.post("/new/:blogId",isAuthenticated,addView);
router.get("/",authMiddleware,getMyViewedBlogs);
// only accessible in Premium account
router.get("/users/:blogId",authMiddleware,getViewersDetails);

export default router;