import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
  {
    whoseProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    totalViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ProfileViews = mongoose.model("ProfileView", viewSchema);

export default ProfileViews;
