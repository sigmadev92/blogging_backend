import { Router } from "express";
import validateRegData from "../../middlewares/validators/user/signup.js";
import { signin, signUp } from "./user.controller.js";
import validateLoginData from "../../middlewares/validators/user/login.js";

const userRouter = Router();

userRouter.post("/signup", validateRegData, signUp);
userRouter.post("/signin", validateLoginData, signin);

export default userRouter;
