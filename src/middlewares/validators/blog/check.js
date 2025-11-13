import { isValidBlogRepo } from "../../../features/blog/blog.repository.js";

export const isValidBlog = async (req, res, next) => {
  console.log("arrived here on blog validator");
  const authorId = req.USER._id;
  const { blogId } = req.params;

  if (!blogId) {
    return next(new CustomError(400, "Invalid Details"));
  }

  const response = await isValidBlogRepo({ authorId, blogId });

  if (response.code === 200) {
    return next();
  }

  return res.status(response.code).json(response.result);
};
