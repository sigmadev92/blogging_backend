import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import validator from "validator";
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../../config/env.js";
import countries from "i18n-iso-countries";
const countryNames = Object.values(countries.getNames("en"));

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "user email is required"],
      unique: [true, "email already registered"],
      validate: [validator.isEmail, "please enter a valid email"],
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
    isMailVerified: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      unique: [true, "This userName is not available"],
      sparse: true,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    isPremiumAccount: {
      type: Boolean,
      default: false,
    },

    OtherLinks: {
      type: [String],
    },
    genderInfo: {
      gender: {
        type: String,
        default: "NS",
        enum: ["M", "F", "O", "NS"],
      },
      toBeShown: {
        type: Boolean,
        default: false,
      },
    },

    profilePic: {
      publicId: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    thumbnail: {
      publicId: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    dateOfBirth: {
      dob: {
        type: Date,
      },
      toBeShown: {
        type: Boolean,
        default: true,
      },
    },
    aboutMe: {
      type: String,
    },

    countryInfo: {
      country: {
        type: String,
        enum: countryNames, // prevents invalid names
      },

      toBeShown: {
        type: Boolean,
        default: false,
      },
    },
    isPublic: {
      type: Boolean,
      default: false,
    },

    profileViews: {
      type: Number,
      default: 0,
    },
    blogViews: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: "reader",
      enum: ["reader", "author"],
    },

    requestedForDelete: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedOn: {
      type: Date,
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
      userName: this.userName,
      fullName: this.fullName,
      isMailVerified: this.isMailVerified,
      isAccountVerified: this.isAccountVerified,
      isPremiumAccount: this.isPremiumAccount,
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
