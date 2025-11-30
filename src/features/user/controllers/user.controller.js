import cloudinary, { deleteImage } from "../../../config/cloudinary.js";
import { CLIENT_URL, NODE_ENV } from "../../../config/env.js";
import sendTheMail from "../../../config/nodemailer.js";
import CustomError from "../../../middlewares/handleError.js";
import passwordResetDoneMail from "../../../utility/mails/users/passwordResetDone.js";
import recoverPasswordMail from "../../../utility/mails/users/recoverPassword.js";
import registrationHTML from "../../../utility/mails/users/registration.js";
import {
  generatePasswordTokenRepo,
  verifyPasswordToken,
} from "../repositories/passwordToken.repo.js";
import {
  addNewUser,
  findUserById,
  findUserByMail,
  deleteUser,
  updateProfile,
  removeProfilePicRepo,
  findUserByUsername,
  findAuthorsRepo,
} from "../repositories/user.repository.js";
import { createToken } from "../repositories/verification.repo.js";

const signUp = async (req, res, next) => {
  console.log("On sign up controller");
  try {
    const response = await addNewUser(req.body);
    console.log("user created");

    if (response.code === 201) {
      const { email, fullName } = req.body;
      const { newUser } = response.result;
      if (email.split("@")[1] === "test.com") {
        //don't send Email Now
        return res.status(response.code).json(response.result);
      }

      //send mail
      const rawToken = await createToken(newUser._id);
      const verifyLink = `${CLIENT_URL}/verify-email?rawToken=${rawToken}&userId=${newUser._id}`;

      const htmlContent = registrationHTML({ fullName, verifyLink });
      await sendTheMail({
        receiverMail: email,
        htmlContent,
        subject: "Registration Successful. Verify your mail",
      });

      console.log("mail sent");
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

  console.log(userData);

  if (!userData) {
    return next(new CustomError(400, "Please send request in JSON format"));
  }
  const updatedUser = await updateProfile({ userId: _id, userData });
  return res.status(200).json({ success: true, updatedUser });
};

//base64 image
const uploadProfilePic = async (req, res, next) => {
  const userId = req.USER._id;
  const { profilePic } = req.body;
  try {
    const result = await cloudinary.uploader.upload(profilePic, {
      folder: "blog_app/images/profile_pics",
      public_id: userId,
      format: "jpg",
      overwrite: true,
    });

    console.log(result);

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

const editProfilePic = async (req, res, next) => {
  //Guaranteed that a valid picture is saved on cloudinary and link is present in req.file;
  console.log("This path is for formData image");
  console.log(req.file); //single file
  const { filename: publicId, path } = req.file;

  const version = path.slice(8).split("/")[4];
  const userId = req.USER._id;
  try {
    await updateProfile({
      userId,
      userData: {
        "profilePic.publicId": publicId,
        "profilePic.version": version,
      },
    });
    console.log("Profile pic uploaded successfully", version);
    return res.status(200).json({ publicId, version });
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
    const isDeleted = await deleteImage(publicId);
    if (!isDeleted) {
      return next(new CustomError(500, "Problem in deleting image from Hub"));
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};

const removeProfilePicByPublicId = async (req, res, next) => {};

const signOut = async (req, res, next) => {
  res
    .status(200)
    .cookie("blog_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, msg: "logout successful" });
};

const findUserProfile = async (req, res, next) => {
  const { medium, _value } = req.params;
  let author = null;
  if (medium === "username") {
    author = await findUserByUsername(_value);
  } else {
    author = await findUserById(_value);
  }

  if (!author) {
    return next(new CustomError(404, "Invalid User Credentials"));
  }

  return res.status(200).json({ success: true, author });
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

const getAuthors = async (req, res, next) => {
  const authors = await findAuthorsRepo();

  return res.status(200).json({ authors });
};

const generatePasswordToken = async (req, res, next) => {
  const { email } = req.body;
  const user = await findUserByMail(email);
  if (user) {
    return next(new CustomError(403, "This email is not registered with us"));
  }
  const userId = user._id;
  const { fullName } = user;
  const rawToken = await generatePasswordTokenRepo(userId);
  const verifyLink = `${CLIENT_URL}/reset-password?rawToken=${rawToken}&userId=${userId}`;
  const htmlContent = recoverPasswordMail({ fullName, verifyLink });

  await sendTheMail({
    htmlContent,
    receiverMail: email,
    subject: "Recover Password",
  });
  return res.status(200).json({
    message: `Mail Sent successfully to ${email} for further instructions.`,
  });
};
const resetPassword = async (req, res, next) => {
  const { rawToken, userId } = req.query;
  if (!rawToken || !userId) {
    return next(new CustomError(400, "Invalid query"));
  }
  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword || !email) {
    return next(new CustomError(400, "Missing Data"));
  }
  if (password !== confirmPassword) {
    return next(
      new CustomError(
        400,
        "Both password and confirm passwords fields should be same"
      )
    );
  }

  try {
    await verifyPasswordToken({ userId, rawToken, password });
    const user = await findUserById(userId);
    const htmlContent = passwordResetDoneMail({ fullName: user.fullName });
    await sendTheMail({
      subject: "Password reset successfully",
      receiverMail: email,
      htmlContent,
    });
    return res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
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
  findUserProfile,
  getAuthors,
  uploadProfilePic,
  removeProfilePicByPublicId,
  generatePasswordToken,
  resetPassword,
};
