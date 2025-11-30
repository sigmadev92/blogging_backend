import PasswordToken from "../models/passWordToken.js";
import crypto from "crypto";
import Users from "../models/user.model.js";
import bcrypt from "bcrypt";
const generatePasswordTokenRepo = async (userId) => {
  // delete old reset tokens
  await PasswordToken.deleteMany({ userId, type: "passwordReset" });

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashed = crypto.createHash("sha256").update(rawToken).digest("hex");

  await Token.create({
    userId: user._id,
    token: hashed,
    type: "passwordReset",
    expiresAt: Date.now() + 15 * 60 * 1000,
  });

  return rawToken;
};

const verifyPasswordToken = async ({ userId, rawToken, password }) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const record = await Token.findOne({
    userId,
    type: "passwordReset",
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!record) throw new Error("Token Invalid or Expired");

  const hashedPassword = await bcrypt.hash(password, 10);

  await Users.findByIdAndUpdate(userId, { password: hashedPassword });

  await PasswordToken.deleteOne({ _id: record._id });
};
export { generatePasswordTokenRepo, verifyPasswordToken };
