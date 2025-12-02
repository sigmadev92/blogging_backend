import sendTheMail from "../../../config/nodemailer.js";
import CustomError from "../../../middlewares/handleError.js";
import emailVerifiedDoneMail from "../../../utility/mails/users/emailVerificationDone.js";
import {
  setUsernameRepo,
  toggleDisplayParamRepo,
  toggleVisibilityRepo,
} from "../repositories/settings.repo.js";
import {
  findUserById,
  findUserByUsername,
  updateProfile,
} from "../repositories/user.repository.js";
import {
  generateTokenRepo,
  verifyEmailTokenRepo,
} from "../repositories/verification.repo.js";
const toggleVisibility = async (req, res, next) => {
  console.log("req came");
  try {
    const newStatus = await toggleVisibilityRepo(req.USER._id);
    return res.status(200).json({ newStatus });
  } catch (error) {
    return next(new CustomError(403, error.message));
  }
};

const toggleDisplayParam = async (req, res, next) => {
  const { param } = req.params;
  const userId = req.USER._id;
  console.log("sas");
  try {
    const newValue = await toggleDisplayParamRepo(userId, param);

    return res.status(200).json({ newValue });
  } catch (error) {
    next(new CustomError(403, error.message));
  }
};

const verifyEmailRequest = async (req, res, next) => {
  const userId = req.USER._id;
  const user = await findUserById(userId);

  if (!user) {
    return next(new CustomError(400, "Invalid User Id"));
  }
  if (user.isMailVerified) {
    return next(new CustomError(403, "Email already verified"));
  }

  const rawToken = await generateTokenRepo({
    userId: user._id,
    tokenType: "emailVerify",
  });
  const verifyLink = `${CLIENT_URL}/verify-email?rawToken=${rawToken}&userId=${user._id}`;

  const htmlContent = registrationHTML({ fullName, verifyLink });
  await sendTheMail({
    receiverMail: user.email,
    htmlContent,
    subject: "Email Verification",
  });

  console.log("mail sent");

  return res.status(200).json({ message: "Email Sent Successfully" });
};

const verifyEmail = async (req, res, next) => {
  const { userId, rawToken } = await req.query;
  if (!userId || !rawToken)
    return next(new CustomError(400, "Invalid Link received"));

  const user = await findUserById(userId);
  if (!user) {
    return next(new CustomError(403, "Invalid User Id"));
  }
  try {
    await verifyEmailTokenRepo({ rawToken, userId });
    const htmlContent = emailVerifiedDoneMail({ fullName: user.fullName });
    await sendTheMail({
      receiverMail: user.email,
      subject: "Email Verification Successful",
      htmlContent,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(new CustomError(403, error.message));
  }
};

const setUsername = async (req, res, next) => {
  const { userName } = req.body;
  if (!userName) {
    return next(new CustomError(400, "UserName is missing"));
  }
  const userId = req.USER._id;

  try {
    const { userNameLastChangedAt } = await setUsernameRepo({
      userId,
      userName,
    });
    return res.status(200).json({ userNameLastChangedAt });
  } catch (error) {
    return next(new CustomError(403, error.message));
  }
};
const changePasswordRequest = async (req, res, next) => {};
const changePassword = async (req, res, next) => {};

const changeEmailRequest = async (req, res, next) => {};
const changeEmail = async (req, res, next) => {};
export {
  toggleVisibility,
  toggleDisplayParam,
  verifyEmail,
  verifyEmailRequest,
  changePasswordRequest,
  changePassword,
  changeEmailRequest,
  changeEmail,
  setUsername,
};
