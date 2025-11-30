import Users from "./user.model.js";
import VerificationToken from "../models/verification.model.js";
import crypto from "crypto";
const createToken = async (userId) => {
  // Generate token (raw)
  const rawToken = crypto.randomBytes(32).toString("hex");

  // Save hashed token in DB
  await VerificationToken.create({
    userId,
    token: crypto.createHash("sha256").update(rawToken).digest("hex"),
    expiresAt: Date.now() + 15 * 60 * 1000, // 15 min
  });

  return rawToken;
};

const verifyTokenRepo = async ({ rawToken, userId }) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const record = await VerificationToken.findOne({
    userId,
    token: hashedToken,
    expiresAt: { $gt: Date.now() }, // still valid
  });
  if (!record) {
    throw new Error("Token Invalid or expired");
  }

  await Users.findByIdAndUpdate(userId, { isMailVerified: true });

  await VerificationToken.deleteOne({ _id: record._id });
};

export { createToken, verifyTokenRepo };
