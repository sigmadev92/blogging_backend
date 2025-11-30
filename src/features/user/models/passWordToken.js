import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  type: {
    type: String,
    enum: ["emailVerify", "passwordReset"],
    required: true,
  },
  expiresAt: { type: Date, required: true },
});

const PasswordToken = mongoose.model("PasswordToken", tokenSchema);

export default PasswordToken;
