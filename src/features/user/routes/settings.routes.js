import { Router } from "express";
import {
  toggleDisplayParam,
  toggleVisibility,
  verifyEmail,
  verifyEmailRequest,
} from "../controllers/settings.controller.js";

const router = Router();

router.get("/verify-email-request", verifyEmailRequest);
router.get("/verify-email", verifyEmail);
router.put("/toggle/visibility", toggleVisibility);
router.put("/toggle/display/:param", toggleDisplayParam);

export default router;
