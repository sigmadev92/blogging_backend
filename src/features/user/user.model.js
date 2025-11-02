import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import validator from "validator";
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../../config/env.js";
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "user email is required"],
      unique: [true, "email already registered"],
      validate: [validator.isEmail, "please enter a valid email"],
    },
    userName: {
      type: String,
    },

    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: 2,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
        minlength: 2,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    gender: {
      type: String,
      default: "NS",
      enum: ["M", "F", "O", "NS"],
    },
    role: {
      type: String,
      default: "reader",
      enum: ["reader", "author", "admin", "moderator", "creator"],
    },
    profilePic: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  //  hash user password before saving using bcrypt
  if (!this.isModified("password"))
    // only hash if not changed;
    return next();
  let hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};
// user password compare
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generatePasswordResetToken
userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and updating user resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Users = mongoose.model("User", userSchema);

export default Users;
