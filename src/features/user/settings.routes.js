import { Router } from "express";
import { toggleVisibility } from "./settings.controller.js";

const router = Router();

router.put("/toggle/visibility", toggleVisibility);

export default router;
