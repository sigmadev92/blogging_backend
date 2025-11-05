import Users from "./user.model.js";

const findUserById = async (userId) => {
  return await Users.findById(userId);
};

const findUserByMail = async (email) => {
  return await Users.findOne({ email }).select("+password");
};
const addNewUser = async (newUserData) => {
  try {
    const newUser = await Users.insertOne(newUserData);
    await newUser.save();
    return {
      code: 201,
      result: {
        success: true,
        newUser,
      },
    };
  } catch (error) {
    return {
      code: 400,
      result: {
        success: false,
        message: error.message,
      },
    };
  }
};

const updateProfile = async ({ userId, userData }) => {
  const updatedUser = await Users.findByIdAndUpdate(userId, userData, {
    new: true,
  });

  return updatedUser;
};

const updateProfilePic = async ({ userId, imageURL }) => {
  await Users.updateOne({ _id: userId }, { $set: { profilePic: imageURL } });
};
const removeProfilePicRepo = async (userId) => {
  const user = await findUserById(userId);
  const publicId = user.profilePic.publicId;
  console.log(user, publicId);
  await Users.updateOne(
    { _id: userId },
    { $set: { "profilePic.secure_url": "", "profilePic.publicId": "" } }
  );

  return publicId;
};

const deleteUser = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    return false;
  }
  await Users.deleteOne({ _id: userId });
  return true;
};
export {
  findUserById,
  addNewUser,
  findUserByMail,
  updateProfile,
  deleteUser,
  updateProfilePic,
  removeProfilePicRepo,
};
