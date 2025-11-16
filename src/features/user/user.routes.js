import { Router } from "express";
import validateRegData from "../../middlewares/validators/user/signup.js";
import {
  deleteUserAccount,
  editProfile,
  editProfilePic,
  findUserProfile,
  getAuth,
  removeProfilePic,
  signin,
  signOut,
  signUp,
} from "./user.controller.js";
import validateLoginData from "../../middlewares/validators/user/login.js";
import {
  authMiddleware,
  protectExposed,
} from "../../middlewares/authentication.js";
import upload from "../../config/multerCloudinary.js";

const userRouter = Router();

userRouter.post("/signup", protectExposed, validateRegData, signUp);
userRouter.post("/signin", protectExposed, validateLoginData, signin);
userRouter.get("/signout", authMiddleware, signOut);
userRouter.get("/auth", authMiddleware, getAuth);
userRouter.put(
  "/update/profile-pic",
  (req, res, next) => {
    req.imgType = "profilePic";
    next();
  },
  authMiddleware,
  upload.single("profilePic"),
  editProfilePic
);
userRouter.get("/profile/:medium/:_value", findUserProfile);
userRouter.put("/remove/profile-pic", authMiddleware, removeProfilePic);
userRouter.put("/update/profile", authMiddleware, editProfile);
userRouter.delete("/account", authMiddleware, deleteUserAccount);

export default userRouter;
