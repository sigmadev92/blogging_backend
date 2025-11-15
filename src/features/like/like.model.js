import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: Number,
      enum: [1, -1],
      required: true,
    },
  },
  { timestamps: true }
);

const Likes = mongoose.model("Like", likeSchema);

export default Likes;
