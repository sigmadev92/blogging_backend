import Blogs from "./blog.model.js";

const makeBlogPrivateRepo = async (authorId, blogId) => {
  await Blogs.updateMany({ authorId, _id: blogId }, { isPublic: false });
};
const makeBlogPublicRepo = async (authorId, blogId) => {
  await Blogs.updateMany({ authorId, _id: blogId }, { isPublic: true });
};
export { makeBlogPrivateRepo, makeBlogPublicRepo };
