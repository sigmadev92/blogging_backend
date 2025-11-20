import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    viewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    totalViews: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const BlogViews = mongoose.model("BlogView", viewSchema);

export default BlogViews;
