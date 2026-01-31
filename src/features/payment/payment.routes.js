import { Router } from "express";
import { createOrder, verifyPayment } from "./payment.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true });
});
router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
export default router;
