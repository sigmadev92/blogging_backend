import { Router } from "express";
import {
  changeEmail,
  changeEmailRequest,
  changePassword,
  changePasswordRequest,
  setUsername,
  toggleDisplayParam,
  toggleVisibility,
  verifyEmail,
  verifyEmailRequest,
} from "../controllers/settings.controller.js";
import { signOut } from "../controllers/user.controller.js";
const router = Router();

router.put("/toggle/visibility", toggleVisibility);
router.put("/toggle/display/:param", toggleDisplayParam);
router.post("/email/verify-request", verifyEmailRequest);
router.get("/email/verify", verifyEmail);
router.put("/set/username", setUsername);
//these routes will lead to logout;
router.put("/email/change-request", changeEmailRequest);
router.put("/email/change", changeEmail);
router.put("/password/change-request", changePasswordRequest);
router.put("/password/change", changePassword);

router.use(signOut);

export default router;
