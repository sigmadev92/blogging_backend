import CustomError from "../../../middlewares/handleError.js";
import {
  toggleDisplayParamRepo,
  toggleVisibilityRepo,
} from "../repositories/settings.repo.js";
import { findUserById } from "../repositories/user.repository.js";
import {
  createToken,
  verifyTokenRepo,
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

  const rawToken = await createToken(userId);
  const verifyLink = `${CLIENT_URL}/verify-email?rawToken=${rawToken}&userId=${newUser._id}`;

  const htmlContent = registrationHTML({ fullName, verifyLink });
  await sendTheMail({
    receiverMail: email,
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

  try {
    await verifyTokenRepo({ rawToken, userId });
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(new CustomError(403, error.message));
  }
};

export {
  toggleVisibility,
  toggleDisplayParam,
  verifyEmail,
  verifyEmailRequest,
};
