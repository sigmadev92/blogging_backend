import Comment from "./comment.model.js";

const addCommentRepo = async ({ blogId, parentCommentId, userId, text }) => {
  let level = 0;
  if (parentCommentId) {
    const parentComment = await Comment.findById(parentCommentId);
    if (!parentComment) {
      return {
        error: true,
        code: 404,
        message: "This comment doesn't exist",
      };
    }
    level = parentComment.level;
  }
  await Comment.insertOne({ blogId, parentCommentId, userId, text, level });
  return {
    success: true,
    message:
      level === 0 ? "Comment Added Successfully" : "Replied Successfully",
  };
};

const editCommentRepo = async ({ commentId, text, userId }) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return {
      error: true,
      code: 404,
      message: "Invalid Comment ID",
    };
  }
  if (comment.userId.toString() !== userId) {
    return {
      error: true,
      code: 400,
      message: "Not authorized to edit this comment",
    };
  }

  comment.text = text;
  await Component.save();

  return {
    success: true,
    code: 200,
    message: "Comment edited",
  };
};

const toggleLikeCommentRepo = async ({ commentId, userId }) => {
  const comment = await Comment.findById(commentId);

  if (!comment)
    return {
      error: true,
      code: 404,
      message: "Invalid comment Id",
    };

  const isLiked = comment.likes.includes(userId);

  await Comment.updateOne(
    { _id: commentId },
    isLiked ? { $pull: { likes: userId } } : { $addToSet: { likes: userId } },
  );
};

const deleteCommentRepo = async ({ userId, commentId }) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return {
      error: true,
      code: 404,
      message: "Invalid Comment ID",
    };
  }
  if (comment.userId.toString() !== userId) {
    return {
      error: true,
      code: 400,
      message: "Not authorized to edit this comment",
    };
  }

  await Comment.deleteOne({ _id: commentId, userId });

  return {
    success: true,
    code: 200,
    message: "Comment Deleted",
  };
};

export {
  addCommentRepo,
  deleteCommentRepo,
  editCommentRepo,
  toggleLikeCommentRepo,
};
