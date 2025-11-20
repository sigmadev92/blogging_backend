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
        authorId:{
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
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 5;
        },
        message: "searchTags must contain between 1 and 5 items",
      },
    },
    topics: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 10;
        },
        message: "searchTags must contain between 1 and 5 items",
      },
    },
    archived: {
      type: Boolean,
      default: false,
    },
    totalViews:{
        type: Number,
        default: 0,
    }  ,
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
