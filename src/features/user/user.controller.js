import CustomError from "../../middlewares/handleError.js";
import { addNewUser, findUserByMail } from "./user.repository.js";

const signUp = async (req, res, next) => {
  try {
    const response = await addNewUser(req.body);
    if (response.code === 201) {
      const { email } = req.body;
      if (email.split("@")[1] === "test.com") {
        //don't send Email Now
        return res.status(response.code).json(response.result);
      }
    }
    //will setup mail when authentication is done
    return res.status(response.code).json(response.result);
  } catch (error) {
    return next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByMail(email);
    if (!user) {
      return next(new CustomError(403, "Invalid Email"));
    }
    const result = await user.comparePassword(password);
    if (!result) {
      return next(new CustomError(403, "Invalid Password"));
    }
    const token = user.getJWTToken();
    const cookieOptions = {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };
    return res
      .status(200)
      .cookie("blog_token", cookieOptions)
      .json({ success: true, user, token });
  } catch (error) {
    return next(error);
  }
};

export { signUp, signin };
