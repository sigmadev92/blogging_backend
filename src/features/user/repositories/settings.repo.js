import Users from "../models/user.model.js";

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
export { toggleVisibilityRepo, toggleDisplayParamRepo };
