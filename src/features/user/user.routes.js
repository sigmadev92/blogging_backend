import { Router } from "express";
import validateRegData from "../../middlewares/validators/user/signup.js";
import { signUp } from "./user.controller.js";

const userRouter = Router();

userRouter.post("/signup", validateRegData, signUp);

export default userRouter;
