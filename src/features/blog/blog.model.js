import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 10,
      maxLength: 200,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    thumbnail: {
      publicId: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    searchTags: {
      type: [String],
    },
    topics: {
      type: [String],
    },
    archived: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Blogs = mongoose.model("Blog", blogSchema);

export default Blogs;
