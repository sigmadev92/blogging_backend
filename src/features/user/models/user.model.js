import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../../../config/env.js";
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
        maxlength: 15,
      },
      middleName: {
        type: String,
        maxlength: 10,
      },
      lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    OtherLinks: {
      type: [String],
    },
    gender: {
      type: String,
      default: "NS",
      enum: ["M", "F", "O", "NS"],
    },

    profilePic: {
      publicId: {
        type: String,
      },
      version: {
        type: String,
      },
    },
    thumbnail: {
      publicId: {
        type: String,
      },
      version: {
        type: String,
      },
    },

    userName: {
      type: String,
      unique: [true, "This userName is not available"],
      sparse: true,
      match: /^[a-z][a-z0-9_-]{0,29}$/,
    },
    userNameLastChangedAt: { type: Date, default: null },
    isMailVerified: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    isPremiumAccount: {
      type: Boolean,
      default: false,
    },
    emailToBeShown: {
      type: Boolean,
      default: false,
    },

    genderToBeShown: {
      type: Boolean,
      default: false,
    },
    profilePicToBeShown: {
      type: Boolean,
      default: true,
    },

    thumbnailToBeShown: {
      type: Boolean,
      default: true,
    },

    dobSet: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: Date,
    },
    dobToBeShown: {
      type: Boolean,
      default: false,
    },

    aboutMe: {
      type: String,
      maxlength: 500,
    },

    countrySet: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
      enum: countryNames, // prevents invalid names
    },

    countryToBeShown: {
      type: Boolean,
      default: true,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    profileViews: {
      type: Number,
      default: 0,
    },
    profileViewsToBeShown: {
      type: Boolean,
      default: true,
    },

    blogViews: {
      type: Number,
      default: 0,
    },
    blogViewsToBeShown: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      //reader means the user has only read the blogs
      //writer means the user has written at least one blog sometime
      default: "reader",
      enum: ["reader", "author"],
    },

    getFund: {
      setup: {
        type: Boolean,
        default: true,
      },
      want: {
        type: Boolean,
        default: true,
      },
      min: {
        type: Number,
        default: 10, //INR
      },
      toBeShown: {
        type: Boolean,
        default: true,
      },
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

const Users = mongoose.model("User", userSchema);

export default Users;
