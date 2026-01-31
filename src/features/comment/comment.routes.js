import { Router } from "express";
import {
  addComment,
  deleteComment,
  editComment,
  likeComment,
  toggleLikeComment,
} from "./comment.controller.js";

const router = Router();

router.post("/", addComment);
router.put("/commentId", editComment);
router.put("/toggle-like", toggleLikeComment);
router.delete("/", deleteComment);

export default router;
