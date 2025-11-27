import Users from "./user.model.js";

const findUserById = async (userId) => {
  return await Users.findById(userId);
};

const findUserByUsername = async (userName) => {
  return await Users.findOne({ userName });
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
    console.log(error);
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
  console.log(publicId);
  await Users.updateOne(
    { _id: userId },
    { $set: { "profilePic.publicId": "", "profilePic.version": "" } }
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

const findAuthorsRepo = async () => {
  return await Users.find({ role: "author" });
};
export {
  findUserById,
  addNewUser,
  findUserByMail,
  findUserByUsername,
  updateProfile,
  deleteUser,
  updateProfilePic,
  removeProfilePicRepo,
  findAuthorsRepo,
};
