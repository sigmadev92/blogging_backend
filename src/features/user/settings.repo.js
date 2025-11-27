import Users from "./user.model.js";

const toggleVisibilityRepo = async (userId) => {
  const user = await Users.findById(userId);
  user.isPublic = !user.isPublic;
  await user.save();

  return user.isPublic;
};

export { toggleVisibilityRepo };
