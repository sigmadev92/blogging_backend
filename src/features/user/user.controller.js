import { deleteImage } from "../../config/cloudinary.js";
import { NODE_ENV } from "../../config/env.js";
import CustomError from "../../middlewares/handleError.js";
import {
  addNewUser,
  findUserById,
  findUserByMail,
  deleteUser,
  updateProfile,
  removeProfilePicRepo,
} from "./user.repository.js";

const signUp = async (req, res, next) => {
  console.log("here also");
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
      httpOnly: true,
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      secure: NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
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

  if (!userData) {
    return next(new CustomError(400, "Please send request in JSON format"));
  }
  const updatedUser = await updateProfile({ userId: _id, userData });
  return res.status(200).json({ success: true, updatedUser });
};

const editProfilePic = async (req, res, next) => {
  //Guaranteed that a valid picture is saved on cloudinary and link is present in req.file;
  console.log(req.file); //single file
  const { path: secure_url, filename: publicId } = req.file;
  const userId = req.USER._id;
  try {
    await updateProfile({
      userId,
      userData: {
        "profilePic.secure_url": secure_url,
        "profilePic.publicId": publicId,
      },
    });
    return res.status(200).json({ success: true, secure_url, publicId });
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};

const removeProfilePic = async (req, res, next) => {
  const userId = req.USER._id;
  try {
    console.log(userId);
    const publicId = await removeProfilePicRepo(userId);
    console.log(publicId);
    if (!publicId) {
      return next(new CustomError(400, "No profile Picture found"));
    }
    console.log("sas");
    const isDeleted = await deleteImage(publicId);
    if (!isDeleted) {
      return next(new CustomError(500, "Problem in deleting image from Hub"));
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};

const signOut = async (req, res, next) => {
  res
    .status(200)
    .cookie("blog_token", null, {
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
    .cookie("blog_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      msg: "Account and token deleted and loged out successfully",
    });
};

export {
  signUp,
  signin,
  editProfile,
  signOut,
  getAuth,
  deleteUserAccount,
  editProfilePic,
  removeProfilePic,
};
