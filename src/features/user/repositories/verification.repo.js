import Users from "../models/user.model.js";
import VerificationToken from "../models/verification.model.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

const generateTokenRepo = async ({ userId, tokenType }) => {
  // Generate token (raw)
  if (!["passwordReset", "emailVerify"].includes(tokenType)) {
    throw new Error("Invalid tokenType found");
  }
  const rawToken = crypto.randomBytes(32).toString("hex");
  await VerificationToken.deleteMany({
    userId,
    type: tokenType,
  });
  console.log("aaa");
  // Save hashed token in DB
  await VerificationToken.create({
    userId,
    type: tokenType,
    token: crypto.createHash("sha256").update(rawToken).digest("hex"),
    expiresAt: Date.now() + 15 * 60 * 1000, // 15 min
  });

  return rawToken;
};

const verifyEmailTokenRepo = async ({ rawToken, userId }) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const record = await VerificationToken.findOne({
    userId,
    type: "emailVerify",
    token: hashedToken,
    expiresAt: { $gt: Date.now() }, // still valid
  });
  if (!record) {
    throw new Error("Token Invalid or expired");
  }

  await Users.findByIdAndUpdate(userId, { isMailVerified: true });

  await VerificationToken.deleteOne({ _id: record._id });
};

const verifyPasswordTokenRepo = async ({ userId, rawToken, password }) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const record = await VerificationToken.findOne({
    userId,
    type: "passwordReset",
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!record) throw new Error("Token Invalid or Expired");

  const hashedPassword = await bcrypt.hash(password, 10);

  await Users.findByIdAndUpdate(userId, { password: hashedPassword });

  await VerificationToken.deleteOne({ _id: record._id });
};
export { generateTokenRepo, verifyEmailTokenRepo, verifyPasswordTokenRepo };
