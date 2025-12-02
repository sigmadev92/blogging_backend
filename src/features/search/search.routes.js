import { Router } from "express";
import { searchUserName } from "./search.controller.js";

const router = Router();

router.get("/", (req, res) => {
  console.log("pooo");
  return res.status(200).json({});
});
router.get("/check-username", searchUserName);

export default router;
