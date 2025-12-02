import Users from "../user/models/user.model.js";

const searchUserName = async (req, res, next) => {
  const { username } = await req.query;
  console.log("req coming");
  const regex = /^[a-z][a-z0-9_-]{0,29}$/;
  if (!regex.test(username)) {
    return res.json({ valid: false, available: false });
  }

  const exists = await Users.findOne({ userName: username });

  res.json({
    valid: true,
    available: !exists,
  });
};

export { searchUserName };
