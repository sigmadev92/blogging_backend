import CustomError from "../../middlewares/handleError.js";
import {
  addNewUser,
  findUserById,
  findUserByMail,
  deleteUser,
  updateProfile,
} from "./user.repository.js";

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
      .cookie("blog_token", token, cookieOptions)
      .json({ success: true, user, token });
  } catch (error) {
    return next(error);
  }
};

const editProfile = async (req, res, next) => {
  const { _id } = req.USER;
  const userData = req.body;
  const updatedUser = await updateProfile({ userId: _id, userData });
  return res.status(200).json({ success: true, updatedUser });
};

const signOut = async (req, res, next) => {
  res
    .status(200)
    .cookie("f3Token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, msg: "logout successful" });
};

const getAuth = async (req, res, next) => {
  const userId = req.USER._id;
  const user = await findUserById(userId);
  if (!user) {
    return next(
      new CustomError(
        403,
        "UserId was valid but user not found. May be deleted"
      )
    );
  }
  return res.status(200).json({ success: true, user });
};

const deleteUserAccount = async (req, res, next) => {
  const { _id } = req.USER;
  const result = await deleteUser(_id);
  if (!result) {
    return next(new CustomError(403, "Invalid User Id"));
  }
  res
    .status(200)
    .cookie("f3Token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      msg: "Account and token deleted and loged out successfully",
    });
};

export { signUp, signin, editProfile, signOut, getAuth, deleteUserAccount };
