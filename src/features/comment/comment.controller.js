import {
  addCommentRepo,
  deleteCommentRepo,
  editCommentRepo,
  toggleLikeCommentRepo,
} from "./comment.repo.js";
import CustomError from "../../middlewares/handleError.js";
const addComment = async (req, res, next) => {
  try {
    const response = await addCommentRepo({
      userId,
      blogId,
      parentCommentId,
      text,
    });

    if (response.error) {
      return next(new CustomError(response.code, response.message));
    }
    return res.status(201).json({ message: response.message });
  } catch (error) {
    next(new CustomError(503, "System Error"));
  }
};

const editComment = async (req, res, next) => {
  const userId = req.USER._id;
  const { commentId } = req.params;
  const { text } = req.body;
  try {
    const response = await editCommentRepo({ commentId, userId, text });
    res.status(response.code).json(response);
  } catch (error) {
    next(new CustomError(503, "System Error"));
  }
};

const deleteComment = async (req, res, next) => {
  const userId = req.USER._id;
  const { commentId } = req.params;
  const response = await deleteCommentRepo({ userId, commentId });
  return res.status(response.code).json(response);
};

const toggleLikeComment = async (req, res, next) => {
  const userId = req.USER._id;
  const { commentId } = req.params;
  const response = await toggleLikeCommentRepo({ commentId, userId });
  res.status(response.code).json({ response });
};
export { addComment, editComment, deleteComment, toggleLikeComment };
