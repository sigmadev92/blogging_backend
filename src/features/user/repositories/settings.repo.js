import Users from "../models/user.model.js";
import { findUserById } from "./user.repository.js";

function canChangeUsername(user) {
  if (!user.userNameLastChangedAt) return true;

  const sixMonths = 1000 * 60 * 60 * 24 * 30 * 6;

  return Date.now() - user.userNameLastChangedAt.getTime() > sixMonths;
}

const toggleVisibilityRepo = async (userId) => {
  const user = await Users.findById(userId);
  if (!user) {
    throw new Error("Invalid userID");
  }
  const newStatus = !user.isPublic;
  user.isPublic = !user.isPublic;
  await user.save();

  return newStatus;
};
const toggleDisplayParamRepo = async (userId, param) => {
  // console.log(user[param]);
  try {
    const user = await Users.findByIdAndUpdate(
      userId,
      [
        {
          $set: {
            [param]: { $not: `$${param}` },
          },
        },
      ],
      { new: true }
    );
    console.log(user[param]);
    return user[param];
  } catch (error) {
    throw new Error("Invalid Querry");
  }
};

const setUsernameRepo = async ({ userId, userName }) => {
  const user = await findUserById(userId);

  const canChange = canChangeUsername(user);
  if (!canChange) {
    throw new Error("Cannot change userName for now");
  }

  user.userName = userName;
  user.userNameLastChangedAt = Date.now();

  await user.save();

  return { userNameLastChangedAt: user.userNameLastChangedAt };
};
export { toggleVisibilityRepo, toggleDisplayParamRepo, setUsernameRepo };
