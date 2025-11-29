import { Router } from "express";
import { toggleDisplayParam, toggleVisibility } from "./settings.controller.js";

const router = Router();

router.put("/toggle/visibility", toggleVisibility);
router.put("/toggle/display/:param", toggleDisplayParam);

export default router;
