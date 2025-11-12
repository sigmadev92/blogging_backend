import Blogs from "./blog.model.js";

const findBlogByIdRepo = async (blogId) => {
  return await Blogs.findById(blogId);
};
const addNewBlogRepo = async (blogData) => {
  const newBlog = await Blogs.insertOne({ ...blogData });
  await newBlog.save();
  return newBlog._id;
};

const isValidBlogRepo = async ({ authorId, blogId }) => {
  const blog = await Blogs.findOne({ _id: blogId });
  if (!blog) {
    return {
      code: 400,
      result: {
        success: false,
        message: "Invalid blog Id",
      },
    };
  }
  console.log(blog.authorId.toString(), authorId);
  if (blog.authorId.toString() !== authorId) {
    return {
      code: 403,
      result: {
        success: false,
        message: "You are not authorized to access the feature",
      },
    };
  }

  return {
    code: 200,
    result: {
      success: true,
      blog,
    },
  };
};
//to change title, description, searchTags or topics or thumbnail
const updateBlogRepo = async ({ authorId, blogId, data }) => {
  const blog = await Blogs.findOneAndUpdate({ authorId, _id: blogId }, data, {
    new: true,
  });
  return blog;
};

//publish blog

const publishBlogRepo = async ({ authorId, blogId }) => {
  const blog = await Blogs.findOneAndUpdate(
    { authorId, _id: blogId },
    { isPublished: true },
    { new: true }
  );
  return blog;
};
const deleteBlogRepo = async ({ authorId, blogId }) => {
  const blog = await Blogs.findOneAndDelete({ authorId, _id: blogId });
  return {
    success: true,
    thumbnail: blog.thumbnail,
  };
};

const getMyBlogsRepo = async (authorId) => {
  return await Blogs.find({ authorId });
};

export {
  findBlogByIdRepo,
  addNewBlogRepo,
  updateBlogRepo,
  publishBlogRepo,
  deleteBlogRepo,
  getMyBlogsRepo,
  isValidBlogRepo,
};
