import Blogs from "./blog.model.js";

const addNewBlogRepo = async (blogData) => {
  const newBlog = await Blogs.insertOne({ ...blogData });
  await newBlog.save();
  return newBlog._id;
};

const updateBlogRepo = async ({ authorId, blogId, data }) => {
  const blog = await Blogs.findOne({ authorId, _id: blogId });

  if (!blog) {
    return {
      code: 403,
      result: {
        success: false,
        message: "You don't have access to edit the blog",
      },
    };
  }
  if (!blog.thumbnail.publicId && data.isPublished) {
    return {
      code: 400,
      result: {
        success: false,
        message: "Error. Please add thumbnail before publishing",
      },
    };
  }
  if (blog.isPublished && data.isPublished) {
    return {
      code: 400,
      result: {
        success: false,
        message: "Error. The blog is already published and live",
      },
    };
  }
  await Blogs.updateOne({ authorId, _id: blogId }, data);
  return {
    code: 200,
    result: {
      success: true,
    },
  };
};

const deleteBlogRepo = async ({ authorId, blogId }) => {
  const blog = await Blogs.findOne({ authorId, _id: blogId });
  if (!blog) {
    return {
      success: false,
    };
  }

  await Blogs.deleteOne({ authorId, _id: blogId });
  return {
    success: true,
    publicId: blog.thumbnail.publicId,
  };
};

export { addNewBlogRepo, updateBlogRepo, deleteBlogRepo };
